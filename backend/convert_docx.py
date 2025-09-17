import os
from docx import Document
import json

def convert_docx_to_txt(docx_path, txt_path):
    """Convert docx file to txt file"""
    try:
        doc = Document(docx_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Converted {docx_path} to {txt_path}")
    except Exception as e:
        print(f"Error converting {docx_path}: {e}")

def main():
    doc_dir = "../doc"  # Путь к папке с docx файлами
    output_dir = "app/documents"  # Путь к выходной папке

    # Создать выходную папку, если не существует
    os.makedirs(output_dir, exist_ok=True)

    # Mapping реальных файлов к метаданным
    file_mapping = {
        "Pol_o_chelenstve_24042024_NOSO.docx": "membership_policy.txt",
        "Pol_o_reestre_noso_26092023_.docx": "members_registry_policy.txt",
        "kontrol_noso_16102023.docx": "control_policy.txt",
        "Pol_ob_analize_26092023_noso.docx": "activity_analysis_policy.txt",
        "pol_kf_vv_noso_26092023.docx": "compensation_fund_policy.txt",
        "pol_kf_odo_noso_26092023.docx": "contract_obligations_fund_policy.txt",
        "strah_odo_noso_19052020.docx": "insurance_policy.txt",
        "Pol_mery_disc_vozd_19042022_noso.docx": "disciplinary_proceedings_policy.txt",
        "Pol_o_jalobakh_19042022_NOSO.docx": "complaints_procedure_policy.txt",
        "kk_noso_2019.docx": "qualification_standards.txt",
        "Pol_o_DK_NOSO_26042019.docx": "standards_compliance_policy.txt",
        "noso_vv_05062025.docx": "current_control_policy.txt",
        "02_Standart_NOSO_26042019z.docx": "risk_oriented_approach_policy.txt",
        "02 Pol_o_raskritii_informacii_noso_16102023zz.docx": "information_access_requirements.txt",
        "qs_rso_noso_20230711.docx": "work_process_standards.txt",
        "qs_sos_noso_20230711.docx": "government_decree_338.txt"  # Временный маппинг
    }

    # Конвертировать все документы
    for docx_filename, txt_filename in file_mapping.items():
        docx_path = f"{doc_dir}/{docx_filename}"
        txt_path = f"{output_dir}/{txt_filename}"

        if os.path.exists(docx_path):
            convert_docx_to_txt(docx_path, txt_path)
        else:
            print(f"Warning: {docx_path} not found")

    # Копировать metadata_docs.json в правильную папку
    import shutil
    shutil.copy("../metadata_docs.json", "app/documents/metadata.json")
    print("Metadata file updated")

if __name__ == "__main__":
    main()
