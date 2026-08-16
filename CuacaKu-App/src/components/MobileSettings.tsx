import { Moon, Thermometer, Wind, LayoutGrid, Settings as SettingsIcon } from 'lucide-react';
import { AppSettings } from '../types';

interface MobileSettingsProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onBackToDashboard: () => void;
}

export function MobileSettings({
  settings,
  onUpdateSettings,
  onBackToDashboard,
}: MobileSettingsProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 pb-24">
      <header className="px-5 pt-5 pb-2 flex items-center justify-between">
        <h1
          onClick={onBackToDashboard}
          className="text-2xl font-extrabold text-[#0055b3] dark:text-[#38bdf8] tracking-tight cursor-pointer"
        >
          CuacaKu
        </h1>
        <button
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl"
          title="Pengaturan"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </header>

      <main className="px-5 space-y-5 flex-1 pt-2">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0055b3] dark:text-[#38bdf8] tracking-tight">
            Pengaturan
          </h2>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Sesuaikan pengalaman aplikasi Anda.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-700 shadow-sm">
          <div className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-4">
            TAMPILAN
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#0055b3] dark:text-[#38bdf8]" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                Mode Gelap
              </span>
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
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-700 shadow-sm space-y-4">
          <div className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            SATUAN
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-[#0055b3] dark:text-[#38bdf8]" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                Suhu
              </span>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => onUpdateSettings({ temperatureUnit: 'celsius' })}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  settings.temperatureUnit === 'celsius'
                    ? 'bg-[#0077e6] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ temperatureUnit: 'fahrenheit' })}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  settings.temperatureUnit === 'fahrenheit'
                    ? 'bg-[#0077e6] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700/60" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 text-[#0055b3] dark:text-[#38bdf8]" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                Kecepatan Angin
              </span>
            </div>

            <select
              value={settings.windSpeedUnit}
              onChange={(e) => onUpdateSettings({ windSpeedUnit: e.target.value as AppSettings['windSpeedUnit'] })}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
            >
              <option value="km/h">km/h</option>
              <option value="m/s">m/s</option>
              <option value="mph">mph</option>
            </select>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-2.5 px-6 flex items-center justify-around z-40">
        <button
          onClick={onBackToDashboard}
          className="flex flex-col items-center gap-1 group text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
        >
          <div className="w-12 h-8 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">
            Dashboard
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-8 rounded-full bg-[#0077e6] text-white flex items-center justify-center shadow-sm">
            <SettingsIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-[#0077e6] dark:text-[#38bdf8]">
            Settings
          </span>
        </button>
      </nav>
    </div>
  );
}
