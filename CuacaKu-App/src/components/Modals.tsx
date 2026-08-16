import { X, ShieldCheck, HelpCircle, CloudSun } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Kebijakan Privasi</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Terakhir diperbarui: 2024</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>CuacaKu</strong> berkomitmen untuk melindungi data dan privasi Anda. Kami menjamin:
          </p>
          <div className="bg-sky-50/60 dark:bg-sky-900/20 p-3.5 rounded-xl border border-sky-100 dark:border-sky-800/50">
            <p className="font-semibold text-sky-900 dark:text-sky-200 mb-1">Penggunaan Lokasi GPS</p>
            <p className="text-xs text-sky-800/80 dark:text-sky-300">
              Koordinat lokasi hanya digunakan secara real-time pada peramban Anda untuk mengambil informasi cuaca terkini dan tidak disimpan atau dilacak di server eksternal mana pun.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">1. Penyimpanan Lokal</h4>
            <p className="text-xs">
              Riwayat pencarian kota dan preferensi pengaturan disimpan secara eksklusif di perangkat Anda menggunakan penyimpanan lokal browser (localStorage).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">2. Keamanan &amp; Transparansi</h4>
            <p className="text-xs">
              Tidak ada pelacak pihak ketiga atau iklan invasif. CuacaKu dirancang bersih, cepat, dan terpercaya.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl transition shadow-sm"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}

export function HelpModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Pusat Bantuan CuacaKu</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Panduan penggunaan &amp; FAQ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
              Bagaimana cara mencari cuaca kota lain?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ketik nama kota (misal: &quot;Bandung&quot;, &quot;Surabaya&quot;, &quot;Tokyo&quot;) di kotak pencarian lalu tekan tombol <strong>Cari</strong> atau tekan tombol Enter.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
              Bagaimana membaca Indeks Kualitas Udara (AQI)?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Skor 0-50 menandakan kualitas <strong>Baik</strong> (hijau), 51-100 <strong>Sedang</strong> (kuning), dan 100+ memerlukan perhatian ekstra bagi yang memiliki alergi/pernapasan sensitif.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
              Mengubah Satuan Suhu &amp; Kecepatan Angin?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Anda bisa klik tombol pill <strong>°C / °F</strong> langsung di kartu cuaca utama atau masuk ke menu <strong>Settings (Pengaturan)</strong>.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl transition shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export function AboutModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-700 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 shadow-sm">
          <CloudSun className="w-9 h-9" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">CuacaKu</h3>
        <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mt-0.5">Aman &amp; Terpercaya &bull; Versi 1.0.0</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
          CuacaKu adalah aplikasi informasi cuaca modern dengan data dari Open-Meteo yang cepat dan ringan.
        </p>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
          &copy; 2024 CuacaKu. Hak cipta dilindungi.
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl transition"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
