import { useState } from 'react';
import { ArrowLeft, Palette, Thermometer, Check } from 'lucide-react';
import { AppSettings } from '../types';

interface DesktopSettingsProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onBack: () => void;
}

export function DesktopSettings({
  settings,
  onUpdateSettings,
  onBack,
}: DesktopSettingsProps) {
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <header className="w-full max-w-7xl mx-auto px-8 pt-8 pb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-xl font-bold text-[#0055b3] dark:text-[#38bdf8] hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </header>

      <main className="w-full max-w-7xl mx-auto px-8 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 items-start">
        <div className="md:col-span-4 space-y-4">
          <div className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 pl-3">
            PREFERENCES
          </div>
          <div className="space-y-1.5">
            <div className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#0077e6] text-white shadow-sm">
              <Palette className="w-5 h-5" />
              <span>Appearance</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200/70 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Appearance</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-base font-bold text-slate-800 dark:text-white">Theme</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Switch between Light and Dark mode.
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => onUpdateSettings({ darkMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-13 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0077e6]"></div>
                </label>
              </div>

              <hr className="border-slate-100 dark:border-slate-700" />

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-base font-bold text-slate-800 dark:text-white">Temperature Unit</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose between Celsius (°C) and Fahrenheit (°F)
                  </div>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                  <button
                    onClick={() => onUpdateSettings({ temperatureUnit: 'celsius' })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      settings.temperatureUnit === 'celsius'
                        ? 'bg-[#0077e6] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => onUpdateSettings({ temperatureUnit: 'fahrenheit' })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      settings.temperatureUnit === 'fahrenheit'
                        ? 'bg-[#0077e6] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-700" />

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-base font-bold text-slate-800 dark:text-white">Wind Speed Unit</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Format for displaying atmospheric wind speed
                  </div>
                </div>
                <select
                  value={settings.windSpeedUnit}
                  onChange={(e) => onUpdateSettings({ windSpeedUnit: e.target.value as AppSettings['windSpeedUnit'] })}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="km/h">km/h</option>
                  <option value="m/s">m/s</option>
                  <option value="mph">mph</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center gap-3">
            {showSavedToast && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferensi tersimpan!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#0055b3] hover:bg-[#004494] text-white text-sm font-semibold rounded-xl transition shadow-sm"
            >
              Save Preferences
            </button>
          </div>
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
