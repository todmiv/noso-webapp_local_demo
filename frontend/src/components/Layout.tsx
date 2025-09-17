import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', exact: true },
    { path: '/documents', label: 'Документы' },
    { path: '/chat', label: 'ИИ-Консультант' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Navigation - Like HomePage Style */}
      <header className="header">
        <div className="header-content">
          <div className="flex items-center gap-4">
            <div className="nav-header">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g id="logo_sronoso">
                  <polygon fill="#bd2337" points="100 0 100 100 0 100 0 0 100 0 100 0"/>
                  <path fill="#fff" d="M30.11,79.29a7.34,7.34,0,1,1,7.34-7.34,7.35,7.35,0,0,1-7.34,7.34Zm0-17.05a9.71,9.71,0,1,0,9.71,9.71,9.72,9.72,0,0,0-9.71-9.71Z"/>
                  <path fill="#fff" d="M43.78,71.95a7.33,7.33,0,0,1,12.51-5.18l.84.84,1.67-1.68L58,65.09A9.69,9.69,0,1,0,58,78.8L58.8,78l-1.67-1.67-.84.84a7.33,7.33,0,0,1-12.51-5.18Z"/>
                  <path fill="#fff" d="M79.6,71.95a9.71,9.71,0,1,0-9.71,9.71,9.72,9.72,0,0,0,9.71-9.71Zm-2.37,0a7.34,7.34,0,1,1-7.34-7.34,7.35,7.35,0,0,1,7.34,7.34Z"/>
                  <path fill="#fff" d="M20.4,28.07a9.46,9.46,0,0,0,2.94,6.85,10.31,10.31,0,0,0,14.2,0l.87-.84-1.73-1.67-.87.84a7.8,7.8,0,0,1-10.73,0,7.15,7.15,0,0,1,0-10.37,7.79,7.79,0,0,1,10.73,0l.87.84L38.41,22l-.87-.83a10.3,10.3,0,0,0-14.2,0,9.47,9.47,0,0,0-2.94,6.86Z"/>
                  <path fill="#fff" d="M49.72,31.1H43.46v-10h6.25c5.48,0,6.81,2.58,6.81,5,0,2.75-2.48,5-6.81,5Zm0-12.34H41.1V37.45h2.36v-4h6.25c6.51,0,9.18-4.28,9.18-7.34s-2.24-7.36-9.18-7.36Z"/>
                  <path fill="#fff" d="M69.89,35.41a7.34,7.34,0,1,1,7.34-7.34,7.35,7.35,0,0,1-7.34,7.34Zm0-17.05a9.71,9.71,0,1,0,9.71,9.71,9.72,9.72,0,0,0-9.71-9.71Z"/>
                  <polygon fill="#fff" points="21.47 42.38 21.57 58.05 27.6 58.05 27.6 52.65 42.13 52.65 42.13 58.05 48.36 58.05 48.36 42.05 41.72 42.05 41.72 47.13 27.5 47.13 27.48 42.37 21.47 42.38"/>
                  <polygon fill="#fff" points="51.8 42.38 51.9 58.05 57.94 58.05 57.94 52.65 72.46 52.65 72.46 58.05 78.7 58.05 78.7 42.05 72.05 42.05 72.05 47.13 57.83 47.13 57.81 42.37 51.8 42.38"/>
                </g>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">СРО НОСО</p>
              <p className="text-xs text-gray-300">Локальная платформа</p>
            </div>
          </div>
          <nav className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path, item.exact || false) ? 'nav-active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Саморегулируемая организация</h3>
              <p className="mb-4">Ассоциация «Нижегородское объединение строительных организаций» (СРО Ассоциация «НСО»)</p>
            </div>

            <div className="footer-section">
              <h3>О системе</h3>
              <p className="mb-4">Web-платформа разработана для локального использования</p>
              <p>Все данные хранятся локально в системе без передачи в интернет</p>
            </div>

            <div className="footer-section">
              <h3>Техническая информация</h3>
              <p className="mb-4">Локальная веб-платформа с ИИ-консультантом на базе Haystack</p>
              <p>Полностью автономная работа без интернет зависимостей</p>
            </div>

            <div className="footer-section">
              <h3>Контакты</h3>
              <p>г. Нижний Новгород</p>
              <p>ул. Большая Покровская, д. 15, пом. 7</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 СРО Ассоциация «НОСО». Все права защищены.</p>
            <p className="mt-2">Локальная демонстрационная платформа</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
