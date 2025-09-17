# Test FastAPI app
print("Starting FastAPI app...")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from haystack import Document
from haystack.components.retrievers.in_memory import InMemoryBM25Retriever
from haystack.document_stores.in_memory import InMemoryDocumentStore


# Initialize FastAPI app with specific configuration
def create_app():
    app = FastAPI(
        title="СРО НОСО API",
        description="API для платформы СРО НОСО с ИИ-консультантом",
        version="1.0.0",
    )

    # Configure CORS for local development
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],  # React frontend
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Initialize RAG system
    document_store = InMemoryDocumentStore()
    retriever = InMemoryBM25Retriever(document_store)

    class ChatRequest(BaseModel):
        message: str

    def load_documents():
        """Load and index all documents"""
        documents = []

        # Load metadata
        try:
            metadata_path = os.path.join(os.path.dirname(__file__), "app", "documents", "metadata.json")
            if not os.path.exists(metadata_path):
                print(f"Metadata file not found: {metadata_path}")
                return
            with open(metadata_path, "r", encoding="utf-8") as f:
                metadata = json.load(f)
        except Exception as e:
            print(f"Error loading metadata: {e}")
            return

        # Load all txt files and create Haystack documents
        for meta in metadata:
            filename = meta["filename"]
            filepath = os.path.join(os.path.dirname(__file__), "app", "documents", filename)

            if os.path.exists(filepath):
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()

                    doc = Document(
                        content=content,
                        meta={
                            "title": meta["title"],
                            "category": meta["category"],
                            "filename": filename,
                            "description": meta["description"]
                        }
                    )
                    documents.append(doc)
                    print(f"Loaded document: {meta['title']}")
                except Exception as e:
                    print(f"Error loading {filename}: {e}")

        # Index documents
        if documents:
            document_store.write_documents(documents)
            print(f"Indexed {len(documents)} documents")

    # Load documents on startup
    load_documents()

    @app.get("/")
    async def root():
        return {"message": "Добро пожаловать в платформу СРО НОСО"}

    @app.get("/api/documents")
    async def get_documents():
        try:
            metadata_path = os.path.join(os.path.dirname(__file__), "app", "documents", "metadata.json")
            with open(metadata_path, "r", encoding="utf-8") as f:
                documents = json.load(f)
            return {"documents": documents}
        except Exception as e:
            return {"error": str(e)}

    @app.get("/api/documents/{doc_id}")
    async def get_document_content(doc_id: int):
        try:
            metadata_path = os.path.join(os.path.dirname(__file__), "app", "documents", "metadata.json")
            with open(metadata_path, "r", encoding="utf-8") as f:
                documents = json.load(f)

            doc_info = next((doc for doc in documents if doc["id"] == doc_id), None)
            if not doc_info:
                raise HTTPException(status_code=404, detail="Document not found")

            doc_path = os.path.join(os.path.dirname(__file__), "app", "documents", doc_info['filename'])
            if not os.path.exists(doc_path):
                raise HTTPException(status_code=404, detail="Document file not found")

            with open(doc_path, "r", encoding="utf-8") as f:
                content = f.read()

            return {"content": content, "metadata": doc_info}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def simple_chat_response(message: str) -> str:
        msg_lower = message.lower()
        if "устав" in msg_lower:
            return "Устав СРО НОСО - это основной документ организации. Он определяет цели, структуры и правила деятельности СРО. Согласно уставу, организация обеспечивает качество работ, защиту прав членов и развитие отрасли."
        elif "членство" in msg_lower or "члена" in msg_lower:
            return "Для вступления в СРО НОСО необходимо соответствовать требованиям: быть субъектом предпринимательской деятельности, иметь лицензию. Процедура включает подачу заявления, рассмотрение правлением и внесение взноса."
        elif "документы" in msg_lower:
            return "Платформа содержит нормативные документы СРО НОСО, включая устав и правила членства. Вы можете просмотреть их в разделе 'Документы'."
        else:
            return "Я ИИ-консультант платформы СРО НОСО. Задайте вопрос о уставе, членстве или документах организации."

    @app.post("/api/chat")
    async def chat_endpoint(request: ChatRequest):
        try:
            # Search for relevant documents using BM25
            results = retriever.run(query=request.message, top_k=5)

            if not results["documents"]:
                return {"answer": "Извините, я не нашел достаточно информации по вашему запросу. Пожалуйста, переформулируйте вопрос или ознакомьтесь со списком доступных документов."}

            # Collect information about found documents
            relevant_docs = [doc.meta["title"] for doc in results["documents"][:3]]

            # Simple response generation based on keywords and found documents
            msg_lower = request.message.lower()

            if any(keyword in msg_lower for keyword in ["членство", "вступить", "член", "члены"]):
                answer = f"Вопрос о членстве в СРО НОСО освещен в документах: {', '.join(relevant_docs)}. Рекомендую ознакомиться с Положением о членстве и другими нормативными документами для получения подробной информации."
            elif any(keyword in msg_lower for keyword in ["контрол", "проверка", "проверки", "мониторинг"]):
                answer = f"Информация о контроле деятельности членов СРО содержится в следующих документах: {', '.join(relevant_docs)}. Пожалуйста, изучите соответствующие положения в разделе 'Документы'."
            elif any(keyword in msg_lower for keyword in ["компенсационный", "фонд", "возмещение", "обязательства"]):
                answer = f"Вопросы компенсационных фондов СРО освещены в: {', '.join(relevant_docs)}. Ознакомьтесь с положениями о компенсационных фондах из раздела финансовые документы."
            elif any(keyword in msg_lower for keyword in ["квалификация", "стандарт", "требования", "нормы"]):
                answer = f"Требования к квалификации и стандарты СРО НОСО изложены в следующих документах: {', '.join(relevant_docs)}. Пожалуйста, изучите раздел 'Правила и стандарты'."
            elif any(keyword in msg_lower for keyword in ["жалоб", "consider complaints", "разбирательство"]):
                answer = f"Процедура рассмотрения жалоб СРО освещена в: {', '.join(relevant_docs)}. Ознакомьтесь с положением о процедуре рассмотрения жалоб."
            elif any(keyword in msg_lower for keyword in ["страхование", "риск", "страховой"]):
                answer = f"Информация о страховании рисков СРО НОСО содержится в: {', '.join(relevant_docs)}. Изучите положение о страховании рисков ответственности."
            elif any(keyword in msg_lower for keyword in ["дисциплина", "нарушение", "санкции"]):
                answer = f"Вопросы дисциплинарного производства СРО освещены в: {', '.join(relevant_docs)}. Ознакомьтесь с положением о дисциплинарном производстве."
            else:
                answer = f"Найдена релевантная информация по вашему запросу в документах: {', '.join(relevant_docs)}. Для более подробного ответа рекомендую ознакомиться с этими документами в разделе 'Документы'. Вы также можете переформулировать ваш вопрос для получения более точной информации."

            return {"answer": answer}

        except Exception as e:
            print(f"Error in chat endpoint: {e}")
            # Fallback на простой ответ
            return {"answer": "Извините, произошла ошибка при обработке вашего запроса. Попробуйте задать вопрос в другой форме или ознакомьтесь с документами в разделе 'Документы'."}

    return app

# Create the app instance
app = create_app()
