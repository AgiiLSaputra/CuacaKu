import { WeatherConditionCode } from '../types';
import { Cloud, CloudRain, CloudLightning, CloudFog, Snowflake, CloudSun } from 'lucide-react';

interface WeatherIconProps {
  code: WeatherConditionCode;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function WeatherIcon({
  code,
  size = 40,
  strokeWidth = 2,
  className = 'w-10 h-10 text-sky-500',
}: WeatherIconProps) {
  switch (code) {
    case 'clear-day':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );

    case 'clear-night':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );

    case 'partly-cloudy':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M12 2v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="M20 12h2" />
          <path d="m19.07 4.93-1.41 1.41" />
          <path d="M15.95 9A6 6 0 0 0 7.5 12" />
          <path d="M17.5 19H9a5 5 0 0 1-4.9-6 4.5 4.5 0 0 1 7.4-4.5A5.5 5.5 0 0 1 17.5 19Z" />
        </svg>
      );

    case 'cloudy':
      return <Cloud size={size} strokeWidth={strokeWidth} className={className} />;

    case 'rain':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M16 14v6" />
          <path d="M8 14v6" />
          <path d="M12 16v6" />
        </svg>
      );

    case 'heavy-rain':
      return <CloudRain size={size} strokeWidth={strokeWidth} className={className} />;

    case 'thunderstorm':
      return <CloudLightning size={size} strokeWidth={strokeWidth} className={className} />;

    case 'fog':
      return <CloudFog size={size} strokeWidth={strokeWidth} className={className} />;

    case 'snow':
      return <Snowflake size={size} strokeWidth={strokeWidth} className={className} />;

    default:
      return <CloudSun size={size} strokeWidth={strokeWidth} className={className} />;
  }
}
