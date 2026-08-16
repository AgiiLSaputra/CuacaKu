import { WeatherData, DayForecast, WeatherConditionCode } from '../types';

const WMO_CODE_MAP: Record<number, { code: WeatherConditionCode; text: string }> = {
  0: { code: 'clear-day', text: 'Cerah' },
  1: { code: 'clear-day', text: 'Cerah Sebagian' },
  2: { code: 'partly-cloudy', text: 'Cerah Berawan' },
  3: { code: 'cloudy', text: 'Berawan Tebal' },
  45: { code: 'fog', text: 'Berkabut' },
  48: { code: 'fog', text: 'Kabut Tebal' },
  51: { code: 'rain', text: 'Gerimis Ringan' },
  53: { code: 'rain', text: 'Gerimis Sedang' },
  55: { code: 'rain', text: 'Gerimis Lebat' },
  61: { code: 'rain', text: 'Hujan Ringan' },
  63: { code: 'rain', text: 'Hujan Sedang' },
  65: { code: 'heavy-rain', text: 'Hujan Lebat' },
  71: { code: 'snow', text: 'Salju Ringan' },
  73: { code: 'snow', text: 'Salju' },
  75: { code: 'snow', text: 'Salju Lebat' },
  80: { code: 'rain', text: 'Hujan Lokal' },
  81: { code: 'heavy-rain', text: 'Hujan Deras' },
  82: { code: 'heavy-rain', text: 'Hujan Badai' },
  95: { code: 'thunderstorm', text: 'Hujan Petir' },
  96: { code: 'thunderstorm', text: 'Petir & Hujan Es' },
  99: { code: 'thunderstorm', text: 'Badai Petir Kuat' },
};

export const INDONESIAN_DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
export const INDONESIAN_DAYS_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function formatIndonesianDate(date: Date = new Date()): string {
  const dayName = INDONESIAN_DAYS_FULL[date.getDay()];
  const dayNum = date.getDate();
  const monthName = INDONESIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

export function getAqiStatus(aqi: number): {
  status: WeatherData['aqiStatus'];
  description: string;
} {
  if (aqi <= 50) {
    return {
      status: 'Baik',
      description: 'Kualitas udara memuaskan, dan polusi udara menimbulkan sedikit atau tidak ada risiko.',
    };
  } else if (aqi <= 100) {
    return {
      status: 'Sedang',
      description: 'Kualitas udara dapat diterima; namun mungkin ada kekhawatiran untuk sejumlah kecil orang.',
    };
  } else if (aqi <= 150) {
    return {
      status: 'Tidak Sehat Bagi Sensitif',
      description: 'Anggota kelompok sensitif dapat mengalami efek kesehatan. Masyarakat umum cenderung tidak terpengaruh.',
    };
  } else {
    return {
      status: 'Tidak Sehat',
      description: 'Semua orang mungkin mulai mengalami efek kesehatan; kelompok sensitif mungkin mengalami efek lebih serius.',
    };
  }
}

export async function fetchWeatherByCity(cityName: string): Promise<WeatherData> {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=id&format=json`
  );

  if (!geoRes.ok) throw new Error('Gagal menghubungi server geocoding');

  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('Kota Tidak Ditemukan');
  }

  const loc = geoData.results[0];
  const { latitude, longitude, name, admin1, country } = loc;

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
  );

  if (!weatherRes.ok) throw new Error('Gagal mengambil data cuaca');

  const weatherData = await weatherRes.json();
  const cur = weatherData.current;
  const daily = weatherData.daily;
  const weatherInfo = WMO_CODE_MAP[cur.weather_code] || { code: 'partly-cloudy' as WeatherConditionCode, text: 'Cerah Berawan' };

  let rawAqi = 45;
  try {
    const aqiRes = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi&timezone=auto`
    );
    if (aqiRes.ok) {
      const aqiData = await aqiRes.json();
      if (aqiData?.current?.us_aqi) {
        rawAqi = Math.round(aqiData.current.us_aqi);
      }
    }
  } catch {
    rawAqi = 45;
  }

  const aqiInfo = getAqiStatus(rawAqi);

  const forecastList: DayForecast[] = [];
  if (daily && daily.time) {
    const count = Math.min(daily.time.length, 7);
    for (let i = 0; i < count; i++) {
      const d = new Date(daily.time[i]);
      const dayCode = daily.weather_code[i];
      const info = WMO_CODE_MAP[dayCode] || { code: 'partly-cloudy' as WeatherConditionCode, text: 'Cerah Berawan' };
      forecastList.push({
        dayName: i === 0 ? 'Hari ini' : i === 1 ? 'Besok' : INDONESIAN_DAYS[d.getDay()],
        fullDate: `${d.getDate()} ${INDONESIAN_MONTHS[d.getMonth()].slice(0, 3)}`,
        conditionCode: info.code,
        conditionText: info.text,
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        rainChance: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 20,
      });
    }
  }

  const now = new Date();
  return {
    city: name || cityName,
    region: admin1 || '',
    country: country || 'Indonesia',
    dateStr: formatIndonesianDate(now),
    timeStr: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    temperature: Math.round(cur.temperature_2m),
    feelsLike: Math.round(cur.apparent_temperature),
    conditionText: weatherInfo.text,
    conditionCode: weatherInfo.code,
    humidity: Math.round(cur.relative_humidity_2m),
    windSpeed: Math.round(cur.wind_speed_10m),
    aqi: rawAqi,
    aqiStatus: aqiInfo.status,
    aqiDescription: aqiInfo.description,
    forecast: forecastList,
  };
}

export async function fetchWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
  );

  if (!res.ok) throw new Error('Gagal mengambil data cuaca');

  const data = await res.json();
  const cur = data.current;
  const daily = data.daily;
  const weatherInfo = WMO_CODE_MAP[cur?.weather_code || 2] || { code: 'partly-cloudy' as WeatherConditionCode, text: 'Cerah Berawan' };

  let cityName = 'Lokasi Terdeteksi';
  let region = 'Indonesia';
  try {
    const revGeo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const revData = await revGeo.json();
    if (revData.address) {
      cityName = revData.address.city || revData.address.town || revData.address.county || revData.address.state || 'Lokasi Saya';
      region = revData.address.state || revData.address.country || 'Indonesia';
    }
  } catch {
    // fallback
  }

  let rawAqi = 45;
  try {
    const aqiRes = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto`
    );
    if (aqiRes.ok) {
      const aqiData = await aqiRes.json();
      if (aqiData?.current?.us_aqi) {
        rawAqi = Math.round(aqiData.current.us_aqi);
      }
    }
  } catch {
    rawAqi = 45;
  }
  const aqiInfo = getAqiStatus(rawAqi);

  const forecastList: DayForecast[] = [];
  if (daily && daily.time) {
    for (let i = 0; i < Math.min(daily.time.length, 7); i++) {
      const d = new Date(daily.time[i]);
      const dayCode = daily.weather_code[i];
      const info = WMO_CODE_MAP[dayCode] || { code: 'partly-cloudy' as WeatherConditionCode, text: 'Cerah Berawan' };
      forecastList.push({
        dayName: i === 0 ? 'Hari ini' : i === 1 ? 'Besok' : INDONESIAN_DAYS[d.getDay()],
        fullDate: `${d.getDate()} ${INDONESIAN_MONTHS[d.getMonth()].slice(0, 3)}`,
        conditionCode: info.code,
        conditionText: info.text,
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        rainChance: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 20,
      });
    }
  }

  const now = new Date();
  return {
    city: cityName,
    region: region,
    country: 'Indonesia',
    dateStr: formatIndonesianDate(now),
    timeStr: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    temperature: Math.round(cur.temperature_2m),
    feelsLike: Math.round(cur.apparent_temperature),
    conditionText: weatherInfo.text,
    conditionCode: weatherInfo.code,
    humidity: Math.round(cur.relative_humidity_2m),
    windSpeed: Math.round(cur.wind_speed_10m),
    aqi: rawAqi,
    aqiStatus: aqiInfo.status,
    aqiDescription: aqiInfo.description,
    forecast: forecastList,
  };
}

export function convertTemperature(tempInC: number, unit: 'celsius' | 'fahrenheit'): number {
  if (unit === 'fahrenheit') {
    return Math.round((tempInC * 9) / 5 + 32);
  }
  return Math.round(tempInC);
}

export function convertWindSpeed(speedInKmh: number, unit: 'km/h' | 'm/s' | 'mph'): { value: number; label: string } {
  if (unit === 'm/s') {
    return { value: Math.round((speedInKmh / 3.6) * 10) / 10, label: 'm/s' };
  } else if (unit === 'mph') {
    return { value: Math.round((speedInKmh * 0.621371) * 10) / 10, label: 'mph' };
  }
  return { value: speedInKmh, label: 'km/h' };
}
