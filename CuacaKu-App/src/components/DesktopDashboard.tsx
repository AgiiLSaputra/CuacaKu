import { useState } from 'react';
import { Search, Compass, Settings, Droplets, Wind, X, Cloud } from 'lucide-react';
import { WeatherData, TemperatureUnit, WindSpeedUnit } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { convertTemperature, convertWindSpeed } from '../services/weatherService';

interface DesktopDashboardProps {
  weather: WeatherData;
  tempUnit: TemperatureUnit;
  windUnit: WindSpeedUnit;
  searchHistory: string[];
  isLoading: boolean;
  errorMessage: string | null;
  onSearch: (city: string) => void;
  onRemoveHistory: (city: string) => void;
  onDetectLocation: () => void;
  onToggleTempUnit: (unit: TemperatureUnit) => void;
  onOpenSettings: () => void;
}

export function DesktopDashboard({
  weather,
  tempUnit,
  windUnit,
  searchHistory,
  isLoading,
  errorMessage,
  onSearch,
  onRemoveHistory,
  onDetectLocation,
  onToggleTempUnit,
  onOpenSettings,
}: DesktopDashboardProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  const currentTemp = convertTemperature(weather.temperature, tempUnit);
  const windInfo = convertWindSpeed(weather.windSpeed, windUnit);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <header className="w-full max-w-7xl mx-auto px-8 pt-8 pb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-[#0055b3] dark:text-[#38bdf8] tracking-tight">
          CuacaKu
        </h1>
        <button
          onClick={onOpenSettings}
          className="p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          title="Pengaturan"
        >
          <Settings className="w-6 h-6" />
        </button>
      </header>

      <main className="w-full max-w-7xl mx-auto px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/70 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Cari Lokasi</h2>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Masukkan nama kota..."
                  className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0055b3] text-slate-800 dark:text-white placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 bg-[#0055b3] hover:bg-[#004494] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition shadow-sm disabled:opacity-50"
              >
                {isLoading ? '...' : 'CARI'}
              </button>
            </form>

            <button
              onClick={onDetectLocation}
              disabled={isLoading}
              type="button"
              className="w-full py-2.5 border border-[#0055b3] dark:border-[#38bdf8] text-[#0055b3] dark:text-[#38bdf8] hover:bg-[#eef5fc] dark:hover:bg-slate-700/40 rounded-xl text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              DETEKSI LOKASI SAYA
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/70 dark:border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              RIWAYAT PENCARIAN
            </h3>

            {searchHistory.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">Belum ada riwayat pencarian.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#dbe8f6] dark:bg-slate-700 text-[#1e3a5f] dark:text-sky-300 text-xs font-semibold rounded-full hover:bg-[#d0e1f3] dark:hover:bg-slate-600 transition group cursor-pointer"
                    onClick={() => onSearch(item)}
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveHistory(item);
                      }}
                      className="text-slate-400 hover:text-red-500 transition"
                      title="Hapus"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {errorMessage ? (
            <div className="bg-[#e1f0fc] dark:bg-slate-800/90 rounded-2xl p-8 shadow-sm border border-[#d2e7fa] dark:border-slate-700 text-center">
              <div className="text-6xl mb-4">
                <Cloud size={64} className="mx-auto text-slate-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Kota Tidak Ditemukan
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Silakan coba masukkan nama kota yang valid.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-[#e1f0fc] dark:bg-slate-800/90 rounded-2xl p-8 shadow-sm border border-[#d2e7fa] dark:border-slate-700 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {weather.city} , {weather.region || weather.country}
                    </h2>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                      {weather.dateStr}
                    </p>
                  </div>

                  <div className="flex items-center bg-[#d2e7fa] dark:bg-slate-700 rounded-xl p-1 shadow-inner">
                    <button
                      type="button"
                      onClick={() => onToggleTempUnit('celsius')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        tempUnit === 'celsius'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleTempUnit('fahrenheit')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        tempUnit === 'fahrenheit'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="text-[#0077e6] dark:text-[#38bdf8]">
                      <WeatherIcon code={weather.conditionCode} size={72} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {currentTemp}°
                      </div>
                      <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        {weather.conditionText}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 md:gap-10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#cce5fb] dark:bg-slate-700 flex items-center justify-center text-[#0077e6] dark:text-[#38bdf8]">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          KELEMBAPAN
                        </div>
                        <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                          {weather.humidity}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#cce5fb] dark:bg-slate-700 flex items-center justify-center text-[#0077e6] dark:text-[#38bdf8]">
                        <Wind className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          ANGIN
                        </div>
                        <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                          {windInfo.value} {windInfo.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Prakiraan 5 Hari
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {weather.forecast.slice(0, 5).map((day, idx) => {
                    const max = convertTemperature(day.tempMax, tempUnit);
                    const min = convertTemperature(day.tempMin, tempUnit);
                    return (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-700 shadow-sm flex flex-col items-center text-center hover:translate-y-[-2px] transition-transform"
                      >
                        <span className="text-base font-bold text-slate-900 dark:text-white mb-3">
                          {day.dayName}
                        </span>
                        <div className="my-2 text-[#0077e6] dark:text-[#38bdf8] flex items-center justify-center h-12">
                          <WeatherIcon code={day.conditionCode} size={36} />
                        </div>
                        <div className="mt-3 text-sm flex items-center gap-1.5 font-bold">
                          <span className="text-slate-900 dark:text-white">{max}°</span>
                          <span className="text-slate-400 font-normal">{min}°</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <p>&copy; 2024 CuacaKu. Aman &amp; Terpercaya.</p>
          <p>Data dari Open-Meteo</p>
        </div>
      </footer>
    </div>
  );
}
