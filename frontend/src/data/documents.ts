// Данные документов для локальной работы
export interface Document {
  id: number;
  title: string;
  category: string;
  publishedDate: string;
  available: boolean;
  fileUrl: string;
  originalFileUrl?: string;
}

// Категории документов
export const documentCategories = [
  'Все категории',
  'Внутренние документы СРО',
  'Финансовые документы',
  'Страховые документы',
  'Нормативные документы',
  'Правила и стандарты',
  'Методические документы',
  'Нормативные правовые акты',
  'Технические требования'
];

// Список документов
export const documents: Document[] = [
  {
    id: 1,
    title: "Положение о членстве в саморегулируемой организации",
    category: "Внутренние документы СРО",
    publishedDate: "15.03.2024",
    available: true,
    fileUrl: "/backend/app/documents/membership_policy.txt",
    originalFileUrl: "/doc/Pol_o_chelenstve_24042024_NOSO.docx"
  },
  {
    id: 2,
    title: "Положение о реестре членов СРО",
    category: "Внутренние документы СРО",
    publishedDate: "10.02.2024",
    available: true,
    fileUrl: "/backend/app/documents/members_registry_policy.txt",
    originalFileUrl: "/doc/Pol_o_reestre_noso_26092023_.docx"
  },
  {
    id: 3,
    title: "Положение о контроле деятельности членов",
    category: "Внутренние документы СРО",
    publishedDate: "05.01.2024",
    available: true,
    fileUrl: "/backend/app/documents/control_policy.txt",
    originalFileUrl: "/doc/Pol_o_DK_NOSO_26042019.docx"
  },
  {
    id: 4,
    title: "Положение о компенсационном фонде",
    category: "Финансовые документы",
    publishedDate: "20.12.2023",
    available: true,
    fileUrl: "/backend/app/documents/compensation_fund_policy.txt"
  },
  {
    id: 5,
    title: "Положение о страховании риска ответственности",
    category: "Страховые документы",
    publishedDate: "15.11.2023",
    available: true,
    fileUrl: "/backend/app/documents/insurance_policy.txt"
  },
  {
    id: 6,
    title: "Положение о дисциплинарном производстве",
    category: "Нормативные документы",
    publishedDate: "10.10.2023",
    available: true,
    fileUrl: "/backend/app/documents/disciplinary_proceedings_policy.txt"
  },
  {
    id: 7,
    title: "Квалификационные стандарты Ассоциации",
    category: "Правила и стандарты",
    publishedDate: "05.09.2023",
    available: true,
    fileUrl: "/backend/app/documents/qualification_standards.txt"
  },
  {
    id: 8,
    title: "Требования к обеспечению доступа к информации",
    category: "Технические требования",
    publishedDate: "01.08.2023",
    available: true,
    fileUrl: "/backend/app/documents/information_access_requirements.txt"
  },
  {
    id: 9,
    title: "Положение о проведении анализа деятельности членов",
    category: "Внутренние документы СРО",
    publishedDate: "10.01.2024",
    available: true,
    fileUrl: "/backend/app/documents/activity_analysis_policy.txt"
  },
  {
    id: 10,
    title: "Положение о компенсационном фонде обеспечения договорных обязательств",
    category: "Финансовые документы",
    publishedDate: "15.12.2023",
    available: true,
    fileUrl: "/backend/app/documents/contract_obligations_fund_policy.txt"
  },
  {
    id: 11,
    title: "Положение о процедуре рассмотрения жалоб",
    category: "Внутренние документы СРО",
    publishedDate: "15.01.2024",
    available: true,
    fileUrl: "/backend/app/documents/complaints_procedure_policy.txt"
  },
  {
    id: 12,
    title: "Положение о порядке контроля за соблюдением стандартов",
    category: "Нормативные документы",
    publishedDate: "15.09.2023",
    available: true,
    fileUrl: "/backend/app/documents/standards_compliance_policy.txt"
  },
  {
    id: 13,
    title: "Положение об организации текущего контроля",
    category: "Внутренние документы СРО",
    publishedDate: "10.01.2024",
    available: true,
    fileUrl: "/backend/app/documents/current_control_policy.txt"
  },
  {
    id: 14,
    title: "Положение о применении риск-ориентированного подхода",
    category: "Методические документы",
    publishedDate: "01.09.2023",
    available: true,
    fileUrl: "/backend/app/documents/risk_oriented_approach_policy.txt"
  },
  {
    id: 15,
    title: "Постановление Правительства РФ № 338",
    category: "Нормативные правовые акты",
    publishedDate: "20.03.2024",
    available: true,
    fileUrl: "/backend/app/documents/government_decree_338.txt"
  },
  {
    id: 16,
    title: "Стандарты на процессы выполнения работ",
    category: "Правила и стандарты",
    publishedDate: "15.09.2023",
    available: true,
    fileUrl: "/backend/app/documents/work_process_standards.txt"
  }
];

// Функция поиска документов
export const searchDocuments = (searchTerm: string, category: string): Document[] => {
  return documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'Все категории' || doc.category === category;
    return matchesSearch && matchesCategory;
  });
};

// Статистика документов
export const getDocumentsStats = () => {
  const total = documents.length;
  const categories = [...new Set(documents.map(doc => doc.category))];
  const available = documents.filter(doc => doc.available).length;

  return {
    total,
    categories: categories.length,
    available,
    unavailable: total - available
  };
};
