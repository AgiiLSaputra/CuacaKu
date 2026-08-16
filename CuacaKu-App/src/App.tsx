import { useState, useEffect } from 'react';
import { WeatherData, AppSettings, TemperatureUnit } from './types';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from './services/weatherService';
import { DesktopDashboard } from './components/DesktopDashboard';
import { MobileDashboard } from './components/MobileDashboard';
import { DesktopSettings } from './components/DesktopSettings';
import { MobileSettings } from './components/MobileSettings';
import { PrivacyModal, HelpModal, AboutModal } from './components/Modals';

const DEFAULT_WEATHER: WeatherData = {
  city: 'Jakarta',
  region: 'DKI Jakarta',
  country: 'Indonesia',
  dateStr: '',
  timeStr: '',
  temperature: 30,
  feelsLike: 33,
  conditionText: 'Cerah Berawan',
  conditionCode: 'partly-cloudy',
  humidity: 65,
  windSpeed: 12,
  aqi: 45,
  aqiStatus: 'Baik',
  aqiDescription: 'Kualitas udara memuaskan.',
  forecast: [],
};

export default function App() {
  const [weather, setWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('cuacaku_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('cuacaku_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      darkMode: false,
      temperatureUnit: 'celsius',
      windSpeedUnit: 'km/h',
      autoLocation: true,
    };
  });

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cuacaku_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('cuacaku_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    const loadInitialWeather = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWeatherByCity('Jakarta');
        setWeather(data);
        setErrorMessage(null);
      } catch {
        setErrorMessage('Kota Tidak Ditemukan');
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialWeather();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      setErrorMessage(null);
      setSearchHistory((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== data.city.toLowerCase());
        return [data.city, ...filtered].slice(0, 5);
      });
      showToast(`Cuaca untuk ${data.city} berhasil diperbarui`);
    } catch {
      setErrorMessage('Kota Tidak Ditemukan');
      showToast(`Gagal memuat cuaca untuk kota "${city}"`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveHistory = (cityToRemove: string) => {
    setSearchHistory((prev) => prev.filter((c) => c !== cityToRemove));
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation tidak didukung oleh browser Anda');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    showToast('Mendeteksi lokasi GPS Anda...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeatherByCoordinates(pos.coords.latitude, pos.coords.longitude);
          setWeather(data);
          setErrorMessage(null);
          setSearchHistory((prev) => {
            const filtered = prev.filter((item) => item.toLowerCase() !== data.city.toLowerCase());
            return [data.city, ...filtered].slice(0, 5);
          });
          showToast(`Lokasi terdeteksi: ${data.city}`);
        } catch {
          setErrorMessage('Kota Tidak Ditemukan');
          showToast('Gagal memuat data cuaca untuk lokasi Anda');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        if (err.code === 1) {
          showToast('Izin akses lokasi ditolak.');
        } else {
          showToast('Gagal mendeteksi lokasi GPS');
        }
      },
      { timeout: 8000 }
    );
  };

  const handleUpdateSettings = (newPartial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  };

  const handleToggleTempUnit = (unit: TemperatureUnit) => {
    setSettings((prev) => ({ ...prev, temperatureUnit: unit }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {isMobileScreen ? (
        <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 shadow-2xl border-x border-slate-100 dark:border-slate-800 relative">
          {currentView === 'dashboard' ? (
            <MobileDashboard
              weather={weather}
              tempUnit={settings.temperatureUnit}
              windUnit={settings.windSpeedUnit}
              searchHistory={searchHistory}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onSearch={handleSearch}
              onRemoveHistory={handleRemoveHistory}
              onDetectLocation={handleDetectLocation}
              onOpenSettings={() => setCurrentView('settings')}
            />
          ) : (
            <MobileSettings
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          )}
        </div>
      ) : (
        <div>
          {currentView === 'dashboard' ? (
            <DesktopDashboard
              weather={weather}
              tempUnit={settings.temperatureUnit}
              windUnit={settings.windSpeedUnit}
              searchHistory={searchHistory}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onSearch={handleSearch}
              onRemoveHistory={handleRemoveHistory}
              onDetectLocation={handleDetectLocation}
              onToggleTempUnit={handleToggleTempUnit}
              onOpenSettings={() => setCurrentView('settings')}
            />
          ) : (
            <DesktopSettings
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onBack={() => setCurrentView('dashboard')}
            />
          )}
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md border border-slate-700 animate-bounce">
          {toastMessage}
        </div>
      )}

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
