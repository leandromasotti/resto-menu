import { Suspense } from 'react';
import { fetchMenuData } from '@/lib/menu-data';
import { getRestaurantConfig } from '@/lib/restaurant-config';
import MenuCategoryComponent from '@/components/MenuCategoryComponent';
import MenuLoader from '@/components/MenuLoader';

// Configurar ISR con revalidación cada 5 minutos
export const revalidate = 300;

export default async function MenuPage() {
  const restaurantConfig = getRestaurantConfig();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        {/* Header */}
        <header className="header-gastronomico shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="titulo-restaurante text-4xl md:text-5xl font-bold mb-3">
                {restaurantConfig.name}
              </h1>
              <p className="subtitulo-restaurante">
                {restaurantConfig.subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* Contenido del menú */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Suspense fallback={<MenuLoader />}>
            <MenuContent />
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="footer-gastronomico text-center p-6 w-full mt-12">
          <div className="max-w-4xl mx-auto">
            <p className="footer-texto mb-4 text-sm">
              {restaurantConfig.name} - Los precios pueden variar sin previo aviso
            </p>
            <p className="footer-texto mb-4 text-lg font-bold">
              Sitio web desarrollado por <span className="text-amber-900">4x - Desarrollo de software</span>
            </p>
            <div className="mt-4">
              <a 
                className="footer-link inline-flex items-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                href="https://api.whatsapp.com/send?phone=5492245502711&text=Hola, tengo la siguiente consulta:"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg 
                  className="mb-1 mr-3" 
                  fill="currentColor" 
                  viewBox="0 0 448 512" 
                  width="20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                </svg>
                <span className="text-lg">Contáctanos</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

async function MenuContent() {
  const menuCategories = await fetchMenuData();

  if (menuCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No se pudo cargar el menú en este momento.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Por favor, inténtelo nuevamente más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="menu-container rounded-xl p-8">
      {menuCategories.map((category, index) => (
        <MenuCategoryComponent 
          key={`${category.name}-${index}`} 
          category={category} 
        />
      ))}
    </div>
  );
}
