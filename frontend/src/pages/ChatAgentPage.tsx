// Simplified local AI agent page for SRO documents
// This version works without external services or authentication

import Layout from '../components/Layout';

const ChatAgentPage = () => {
  const handleExampleQuestion = (question: string) => {
    alert(`Пример вопроса: "${question}"\n\nДля работы с реальной RAG системой требуется запустить backend с Haystack.`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg className="icon-xl text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">ИИ-Консультант документов СРО</h1>
            <p className="text-gray-600 mb-8">
              Локальный интеллект-консультант на базе Haystack для ответов на вопросы по документам СРО
            </p>
          </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🌟 Возможности</h2>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>✨ Контекстные ответы на русском языке</li>
            <li>📚 База знаний из локальных документальных файлов</li>
            <li>🤖 RAG система на базе Haystack</li>
          </ul>


        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleExampleQuestion('Какие требования к членству в СРО?')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex flex-col items-center text-center transition-colors"
          >
            <h3 className="font-semibold text-xs mb-1">Требования к членству</h3>
            <p className="text-xs opacity-90">Что нужно для вступления в СРО?</p>
          </button>

          <button
            onClick={() => handleExampleQuestion('Что такое компенсационный фонд?')}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex flex-col items-center text-center transition-colors"
          >
            <h3 className="font-semibold text-xs mb-1">Компенсационный фонд</h3>
            <p className="text-xs opacity-90">Что это такое и зачем нужен?</p>
          </button>

          <button
            onClick={() => handleExampleQuestion('Какие квалификационные требования к руководителю?')}
            className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg flex flex-col items-center text-center transition-colors"
          >
            <h3 className="text-xs mb-1">Квалификация руководителя</h3>
            <p className="text-xs opacity-90">Требования к специалистам</p>
          </button>
        </div>




        </div>
      </div>
    </Layout>
  );
};

export default ChatAgentPage;
