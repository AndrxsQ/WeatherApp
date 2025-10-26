import React, { useState, useEffect, useCallback } from 'react';
//import { Search } from 'lucide-react';

// Importing mock data and icons
import { mockWeatherData } from './data/MockData.js'; 
//import { Sun, Thermometer, Wind, Droplet, Activity } from './utils/Icons';

// Importing components
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import DetailCard from './components/DetailCard';

// Main App Component
function App() {
  // State for search location
  const [location, setLocation] = useState('Madrid');
  // State for weather data
  const [weatherData, setWeatherData] = useState(null);
  // State for loading (to simulate API call)
  const [isLoading, setIsLoading] = useState(false);
  // State for errors
  const [error, setError] = useState(null);

  // Local mapping of icons needed for detail cards
  /*const detailIconMap = {
    Thermometer: Thermometer,
    Wind: Wind,
    Droplet: Droplet,
    Sun: Sun,
    Activity: Activity,
  };*/

  // Function to fetch weather data (Placeholder for API call)
  const fetchWeather = useCallback((city) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    // Simulation of an API call with a timeout
    setTimeout(() => {
      if (city.toLowerCase() === 'madrid') {
        setWeatherData(mockWeatherData);
        setIsLoading(false);
      } else if (city.toLowerCase() === 'tokyo') {
        // Simulate different data for another city
        setWeatherData({ 
          ...mockWeatherData, 
          city: "Tokio", 
          country: "Japón", 
          current: { ...mockWeatherData.current, temp: 25, condition: "Soleado", icon: "Sun" },
          details: [ // Update details to use imported components
            { name: "Thermic Sensation", value: "24°C", icon: Thermometer },
            { name: "Wind", value: "8 km/h", icon: Wind },
            { name: "Humidity", value: "70%", icon: Droplet },
            { name: "UV Index", value: "7 (High)", icon: Sun },
            { name: "Pressure", value: "1008 hPa", icon: Activity },
          ],
        });
        setIsLoading(false);
      }
      else {
        setError("Location not found. Try 'Madrid' or 'Tokyo'.");
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  // Effect to load initial data on mount
  useEffect(() => {
    fetchWeather(location);
  }, [fetchWeather, location]);

  // Search form handler
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  // Helper function to get the detail icon component
  const getDetailIcon = (name) => {
      // Use the icon name from the mock data to find the component
      return detailIconMap[name];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-6 text-center">
            Pronóstico del Clima <span className="hidden sm:inline">Profesional</span>
        </h1>

        {/* Search Bar 
        <form /*onSubmit={handleSearch} className="mb-8 flex shadow-2xl rounded-xl overflow-hidden">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Introduce la ubicación (Ej: Madrid)"
            className="grow p-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              {/*<Search className="w-5 h-5" />
            )}
          </button>
        </form>
*/}
        {/* Manejo de estados (Carga / Error) */}
        {isLoading && (
          <div className="text-center p-12 bg-gray-800 rounded-xl">
            <p className="text-xl text-indigo-400">Cargando datos del clima...</p>
          </div>
        )}

        {error && (
          <div className="text-center p-8 bg-red-900 border border-red-700 rounded-xl">
            <p className="text-lg font-semibold text-red-300">{error}</p>
          </div>
        )}

        {/* Contenido Principal (Si hay datos) */}
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda: Clima Actual y Pronóstico Diario/Horario */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. Clima Actual */}
              <CurrentWeather 
                current={weatherData.current} 
                city={weatherData.city} 
                country={weatherData.country} 
              />
              
              {/* 2. Pronóstico Horario */}
              <HourlyForecast hourlyData={weatherData.hourly} />

              {/* 3. Pronóstico Diario / Semanal */}
              <DailyForecast dailyData={weatherData.daily} />

            </div>

            {/* Columna Derecha: Detalles Adicionales (Grid de 2x2) */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4 text-indigo-400">Detalles del Clima</h2>
              <div className="grid grid-cols-2 gap-4">
                {weatherData.details.map((detail, index) => (
                  <DetailCard 
                    key={index} 
                    name={detail.name} 
                    value={detail.value} 
                    // El componente DetailCard espera un componente React (Icon)
                    // Usamos la función getDetailIcon para mapear el nombre a la referencia del componente Lucide
                    Icon={detail.icon} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App
