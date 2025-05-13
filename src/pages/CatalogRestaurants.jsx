import { useState, useEffect } from 'react';
import { Search, Star, Clock, ShoppingBag, Loader } from 'lucide-react';
import '../styles/catalogRestaurants.css';
import Navbar from '../components/navbar/navbar';

export default function RestaurantCatalog() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchAllRestaurants = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/restaurants/all');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (!data || !data.restaurants) {
        const mock = generateMockRestaurants();
        setRestaurants(mock.restaurants);
        setTotalCount(mock.totalCount);
      } else {
        setRestaurants(data.restaurants);
        setTotalCount(data.totalCount);
      }
    } catch (e) {
      console.error(e);
      setError("Error al cargar los restaurantes. Intenta de nuevo.");
      const mock = generateMockRestaurants();
      setRestaurants(mock.restaurants);
      setTotalCount(mock.totalCount);
    } finally {
      setLoading(false);
    }
  };

  const generateMockRestaurants = () => {
    const totalCount = 100;
    const names = ['El Corral - Vaqueros', 'McDonald\'s', 'El Corral - Hamburguesa', 'Arepas y Patacos', 'Domino\'s - Pizza', 'Pa Saborear - Mazorcada'];
    const promotions = ['Envío Gratis: Ver TyC', 'Hasta 30% Off', 'Hasta 20% Off'];
    const categories = ['Hamburguesas', 'Comida Rápida', 'Pizza', 'Pollo'];
    const restaurants = [];
    
    for (let i = 0; i < totalCount; i++) {
      restaurants.push({
        id: i + 1,
        name: names[i % names.length],
        image: '/api/placeholder/320/200',
        rating: (Math.random() * 3 + 2).toFixed(1),
        deliveryTime: Math.floor(Math.random() * 40) + 10,
        minOrder: (Math.floor(Math.random() * 5) + 2) * 1000,
        promotion: promotions[i % promotions.length],
        category: categories[i % categories.length]
      });
    }
    return { restaurants, totalCount };
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const getRestaurantLogo = (name) => {
    if (name.includes('McDonald')) return <div className="logo-circle bg-red-500"><span>M</span></div>;
    if (name.includes('Corral')) return <div className="logo-circle bg-yellow-500"><ShoppingBag size={16} className="text-white" /></div>;
    if (name.includes('Domino')) return <div className="logo-circle bg-blue-500"><span>D</span></div>;
    if (name.includes('Arepas')) return <div className="logo-circle bg-yellow-600"><span>A</span></div>;
    if (name.includes('Brasas')) return <div className="logo-circle bg-gray-200"><span className="text-gray-700">B</span></div>;
    return <div className="logo-circle bg-gray-200"><span className="text-gray-700">{name.charAt(0)}</span></div>;
  };

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* Background image overlay */}
      <div className="background-overlay" style={{ backgroundImage: `url('/7218665f-f72d-4c97-9e41-5bfe95b4644d.png')` }}></div>

      {/* Header */}
      <Navbar />

      {/* Page content */}
      <div className="container mx-auto px-4 pt-20 pb-6">
        <div className="relative mb-6">
          <input type="text" placeholder="Buscar restaurantes o comidas..." className="search-input" />
          <Search className="search-icon" size={20} />
        </div>

        <h2 className="restaurant-heading">
        Restaurantes cerca de mi ubicación <span>({totalCount})</span>
        </h2>


        {error && (
          <div className="error-alert">
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={() => {
              setError(null);
              setRestaurants([]);
              fetchAllRestaurants();
            }}>Intentar de nuevo</button>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <Loader size={36} className="loading-spinner" />
            <span className="text-lg">Cargando restaurantes...</span>
          </div>
        ) : (
          <>
            <div className="restaurants-grid">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="restaurant-card"
                >
                  <div className="image-container">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="promotion-tag">
                      {restaurant.promotion}
                    </div>
                  </div>
                  <div className="restaurant-card-content">
                    <div className="flex items-center justify-between mb-1">
                      {getRestaurantLogo(restaurant.name)}
                      <div className="rating">
                        <Star size={16} className="rating-star" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <div className="restaurant-meta">
                      <div className="restaurant-meta-item">
                        <Clock size={14} className="mr-1" />
                        <span>{restaurant.deliveryTime} min</span>
                      </div>
                      <div className="restaurant-meta-divider"></div>
                      <div className="restaurant-meta-item">
                        <span className="font-medium mr-1">$</span>
                        {restaurant.minOrder.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {restaurants.length === 0 && !loading && (
              <div className="empty-state">
                <ShoppingBag size={48} className="empty-state-icon mx-auto" />
                <h3 className="empty-state-title">No se encontraron restaurantes</h3>
                <p className="empty-state-message">No hay restaurantes disponibles en este momento.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}