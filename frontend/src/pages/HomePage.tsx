import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section - Clean */}
      <section className="hero-bg rounded-2xl p-8 md:p-12 mb-10 text-center overflow-hidden">
        <div className="hero-content max-w-3xl mx-auto relative z-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            СРО Ассоциация «Нижегородское объединение строительных организаций»
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Локальная веб-платформа для ознакомления с документами саморегулируемой организации НОСО
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Добро пожаловать в СРО НОСО
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Исполняя требования действующего законодательства, наша саморегулируемая организация
            предоставляет каждому потенциальному члену возможность ознакомиться с учредительными
            и внутренними документами.
          </p>
          <div className="bg-blue-50 p-6 rounded-xl">
            <p className="text-blue-800 font-medium">
              Для СРО открытость информации является одним из важнейших принципов функционирования в строительной отрасли
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
