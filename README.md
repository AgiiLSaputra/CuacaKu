# CuacaKu - Aplikasi Prakiraan Cuaca

Aplikasi web cuaca modern berbasis React + TypeScript yang menampilkan data cuaca real-time dari [Open-Meteo API](https://open-meteo.com/).

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Vite** (bundler)
- **Lucide React** (ikon)
- **Open-Meteo API** (data cuaca gratis, tanpa API key)

## Fitur

| Fitur                                           | Status |
| ----------------------------------------------- | ------ |
| Pencarian kota                                  | ✅     |
| Tampilan suhu, kelembapan, angin, kondisi cuaca | ✅     |
| Toggle Celsius / Fahrenheit                     | ✅     |
| Loading & error handling                        | ✅     |
| Prakiraan cuaca 5 hari                          | ✅     |
| Riwayat pencarian (localStorage, max 5)         | ✅     |
| Deteksi lokasi otomatis (geolocation)           | ✅     |
| Dark / Light mode                               | ✅     |
| Responsive (desktop & mobile)                   | ✅     |

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk produksi
npm run build

# Preview hasil build
npm run preview
```

Development server berjalan di `http://localhost`.

## Struktur Project

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root component & state management
├── index.css                   # Tailwind CSS import
├── types.ts                    # TypeScript type definitions
├── services/
│   └── weatherService.ts       # Open-Meteo API integration
└── components/
    ├── WeatherIcon.tsx         # Ikon cuaca berdasarkan kode WMO
    ├── DesktopDashboard.tsx    # Dashboard tampilan desktop
    ├── MobileDashboard.tsx     # Dashboard tampilan mobile
    ├── DesktopSettings.tsx     # Settings tampilan desktop
    ├── MobileSettings.tsx      # Settings tampilan mobile
    └── Modals.tsx              # Modal privasi, bantuan, tentang
```

## API yang Digunakan

| Endpoint                                        | Kegunaan                                         |
| ----------------------------------------------- | ------------------------------------------------ |
| `geocoding-api.open-meteo.com/v1/search`        | Geocoding nama kota → koordinat                  |
| `api.open-meteo.com/v1/forecast`                | Data cuaca (suhu, angin, kelembapan, kode cuaca) |
| `air-quality-api.open-meteo.com/v1/air-quality` | Indeks kualitas udara (AQI)                      |
| `nominatim.openstreetmap.org/reverse`           | Reverse geocoding (koordinat → nama kota)        |

## Browser Support

Mendukung browser 2-3 tahun ke belakang (bukan hanya versi evergreen terbaru).

## Lisensi

Project latihan belajar React + API fetching.
