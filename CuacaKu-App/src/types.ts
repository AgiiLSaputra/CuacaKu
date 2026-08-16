export interface WeatherData {
  city: string;
  region: string;
  country: string;
  dateStr: string;
  timeStr: string;
  temperature: number;
  feelsLike: number;
  conditionText: string;
  conditionCode: WeatherConditionCode;
  humidity: number;
  windSpeed: number;
  windDirection?: string;
  aqi: number;
  aqiStatus: 'Baik' | 'Sedang' | 'Tidak Sehat Bagi Sensitif' | 'Tidak Sehat' | 'Sangat Tidak Sehat' | 'Berbahaya';
  aqiDescription: string;
  uvIndex?: number;
  pressure?: number;
  visibility?: number;
  forecast: DayForecast[];
}

export type WeatherConditionCode =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'heavy-rain'
  | 'thunderstorm'
  | 'snow'
  | 'fog';

export interface DayForecast {
  dayName: string;
  fullDate: string;
  conditionCode: WeatherConditionCode;
  conditionText: string;
  tempMax: number;
  tempMin: number;
  rainChance?: number;
  humidity?: number;
  windSpeed?: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'km/h' | 'm/s' | 'mph';

export interface AppSettings {
  darkMode: boolean;
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  autoLocation: boolean;
}
