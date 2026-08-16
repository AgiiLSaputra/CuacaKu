import { useState } from 'react';
import { Search, Compass, Droplets, Wind, Thermometer, X, LayoutGrid, Settings, Cloud } from 'lucide-react';
import { WeatherData, TemperatureUnit, WindSpeedUnit } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { convertTemperature, convertWindSpeed } from '../services/weatherService';

interface MobileDashboardProps {
  weather: WeatherData;
  tempUnit: TemperatureUnit;
  windUnit: WindSpeedUnit;
  searchHistory: string[];
  isLoading: boolean;
  errorMessage: string | null;
  onSearch: (city: string) => void;
  onRemoveHistory: (city: string) => void;
  onDetectLocation: () => void;
  onOpenSettings: () => void;
}

export function MobileDashboard({
  weather,
  tempUnit,
  windUnit,
  searchHistory,
  isLoading,
  errorMessage,
  onSearch,
  onRemoveHistory,
  onDetectLocation,
  onOpenSettings,
}: MobileDashboardProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  const currentTemp = convertTemperature(weather.temperature, tempUnit);
  const feelsLikeTemp = convertTemperature(weather.feelsLike, tempUnit);
  const windInfo = convertWindSpeed(weather.windSpeed, windUnit);
  const aqiPercentage = Math.min(100, Math.max(5, (weather.aqi / 300) * 100));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 pb-24">
      <header className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#0055b3] dark:text-[#38bdf8] tracking-tight">
          CuacaKu
        </h1>
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-200/60 transition"
        >
          <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </header>

      <main className="px-5 space-y-4 flex-1">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari kota..."
            className="w-full pl-11 pr-11 py-3 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0055b3] text-slate-800 dark:text-white shadow-sm placeholder-slate-400"
          />
          <button
            type="button"
            onClick={onDetectLocation}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#0055b3] hover:text-[#004494] dark:text-sky-400 transition"
            title="Deteksi Lokasi Saya"
          >
            <Compass className="w-5 h-5" />
          </button>
        </form>

        {searchHistory.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {searchHistory.map((item) => (
              <div
                key={item}
                onClick={() => onSearch(item)}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-[#dbe8f6] dark:bg-slate-800 text-[#1e3a5f] dark:text-sky-300 text-xs font-semibold rounded-full cursor-pointer hover:bg-[#cfdff1] transition"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveHistory(item);
                  }}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {errorMessage ? (
          <div className="bg-[#dcf0fd] dark:bg-slate-800/95 rounded-[24px] p-6 shadow-sm border border-[#cbe3f7] dark:border-slate-700 text-center">
            <div className="text-5xl mb-3">
              <Cloud size={56} className="mx-auto text-slate-400" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
              Kota Tidak Ditemukan
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Silakan coba masukkan nama kota yang valid.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-[#dcf0fd] dark:bg-slate-800/95 rounded-[24px] p-6 shadow-sm border border-[#cbe3f7] dark:border-slate-700 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {weather.city} {weather.region ? `• ${weather.region}` : ''}
                  </h2>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    {weather.dateStr.split(',')[0]}, {weather.forecast[0]?.fullDate || ''} • {weather.timeStr}
                  </p>
                </div>

                <div className="px-3 py-1 bg-[#c5e4fa] dark:bg-slate-700 text-[#0055b3] dark:text-sky-300 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                  <span>AQI {weather.aqi}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      weather.aqi <= 50 ? 'bg-emerald-500' : weather.aqi <= 100 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {currentTemp}°
                  </div>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {weather.conditionText}
                  </div>
                </div>

                <div className="text-[#0077e6] dark:text-[#38bdf8] pr-2">
                  <WeatherIcon code={weather.conditionCode} size={72} strokeWidth={2} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2.5">
                <div className="bg-[#ebf5fe] dark:bg-slate-700/80 rounded-2xl p-3 text-center border border-[#d6ebfa] dark:border-slate-600 flex flex-col items-center">
                  <Droplets className="w-4 h-4 text-[#0077e6] dark:text-[#38bdf8] mb-1" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {weather.humidity}%
                  </span>
                </div>

                <div className="bg-[#ebf5fe] dark:bg-slate-700/80 rounded-2xl p-3 text-center border border-[#d6ebfa] dark:border-slate-600 flex flex-col items-center">
                  <Wind className="w-4 h-4 text-[#0077e6] dark:text-[#38bdf8] mb-1" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {windInfo.value} {windInfo.label}
                  </span>
                </div>

                <div className="bg-[#ebf5fe] dark:bg-slate-700/80 rounded-2xl p-3 text-center border border-[#d6ebfa] dark:border-slate-600 flex flex-col items-center">
                  <Thermometer className="w-4 h-4 text-[#0077e6] dark:text-[#38bdf8] mb-1" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    Terasa {feelsLikeTemp}°
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Prakiraan 5 Hari
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {weather.forecast.slice(1, 5).map((day, idx) => {
                  const max = convertTemperature(day.tempMax, tempUnit);
                  const min = convertTemperature(day.tempMin, tempUnit);
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200/70 dark:border-slate-700 shadow-sm flex flex-col items-center text-center"
                    >
                      <span className="text-xs font-bold text-slate-800 dark:text-white mb-2">
                        {idx === 0 ? 'Besok' : day.dayName}
                      </span>
                      <div className="my-1.5 text-[#0077e6] dark:text-[#38bdf8]">
                        <WeatherIcon code={day.conditionCode} size={28} strokeWidth={2} />
                      </div>
                      <div className="mt-1 text-xs font-bold flex items-center gap-1">
                        <span className="text-slate-900 dark:text-white">{max}°</span>
                        <span className="text-slate-400 font-normal">{min}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm mb-3">
                <Wind className="w-4 h-4 text-slate-500" />
                <span>Kualitas Udara</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {weather.aqi}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      weather.aqi <= 50
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : weather.aqi <= 100
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                    }`}
                  >
                    {weather.aqiStatus}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 text-right max-w-[190px] leading-snug">
                  {weather.aqiDescription}
                </p>
              </div>

              <div className="mt-4 w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    weather.aqi <= 50
                      ? 'bg-emerald-500'
                      : weather.aqi <= 100
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${aqiPercentage}%` }}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-2.5 px-6 flex items-center justify-around z-40">
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-8 rounded-full bg-[#0077e6] text-white flex items-center justify-center shadow-sm">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-[#0077e6] dark:text-[#38bdf8]">
            Dashboard
          </span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center gap-1 group text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
        >
          <div className="w-12 h-8 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">
            Settings
          </span>
        </button>
      </nav>
    </div>
  );
}
