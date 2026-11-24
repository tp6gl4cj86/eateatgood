import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Wind,
} from 'lucide-react';
import { useState } from 'react';
import {
  DailyForecastItem,
  TemperatureUnit,
  WeatherIconKind,
  formatTemperature,
} from '../hooks/useKyushuWeather';

export function WeatherGlyph({
  icon,
  className,
}: {
  icon: WeatherIconKind;
  className?: string;
}) {
  switch (icon) {
    case 'sun':
      return <Sun className={className} />;
    case 'partly_cloudy':
      return <CloudSun className={className} />;
    case 'windy':
      return <Wind className={className} />;
    case 'rain':
      return <CloudRain className={className} />;
    case 'cloudy':
    default:
      return <Cloud className={className} />;
  }
}

interface HeroWeatherWidgetProps {
  forecast: DailyForecastItem[];
  dataSource: 'baseline' | 'open-meteo';
  unit: TemperatureUnit;
  onChangeUnit: (unit: TemperatureUnit) => void;
  onJumpToDay: (dayNumber: number) => void;
}

export function HeroWeatherWidget({
  forecast,
  dataSource,
  unit,
  onChangeUnit,
  onJumpToDay,
}: HeroWeatherWidgetProps) {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const activeDay = forecast.find((d) => d.dayNumber === selectedDayNum) ?? forecast[0];

  return (
    <div
      aria-label="福岡・九州 2027 年 2 月下旬氣象預估"
      className="mt-7 bg-white border border-[#E5E0D8] rounded-[28px] overflow-hidden"
    >
      {/* Compact Header Row */}
      <div className="px-5 md:px-6 py-4 border-b border-[#EFECE6] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[17px] md:text-xs leading-relaxed">
          <span className="font-mono text-sm md:text-xs font-semibold tracking-wider text-[#1E3A5F]">
            KYUSHU WEATHER OUTLOOK
          </span>
          <span aria-hidden="true" className="text-[#CBC3B6]">
            ·
          </span>
          <span className="text-[#57534E]">
            {dataSource === 'open-meteo'
              ? '2027 年 2 月下旬氣溫預估（對照 Open-Meteo 福岡同期實測與各區溫差）'
              : '2027 年 2 月下旬氣溫預估（福岡與北九州歷年同期氣候基準）'}
          </span>
        </div>

        {/* Interactive °C / °F Unit Switch */}
        <div
          role="group"
          aria-label="溫度單位切換"
          className="inline-flex items-center p-1 bg-[#F3EFE8] rounded-2xl shrink-0"
        >
          <button
            type="button"
            onClick={() => onChangeUnit('C')}
            aria-pressed={unit === 'C'}
            className={`px-3 py-1.5 text-sm md:text-xs font-mono font-medium rounded-xl transition-colors cursor-pointer ${
              unit === 'C'
                ? 'bg-white text-[#1E3A5F] shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => onChangeUnit('F')}
            aria-pressed={unit === 'F'}
            className={`px-3 py-1.5 text-sm md:text-xs font-mono font-medium rounded-xl transition-colors cursor-pointer ${
              unit === 'F'
                ? 'bg-white text-[#1E3A5F] shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* 6-Day Mini Forecast Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EFECE6]">
        {forecast.map((day) => {
          const isSelected = day.dayNumber === activeDay.dayNumber;
          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => setSelectedDayNum(day.dayNumber)}
              aria-pressed={isSelected}
              className={`text-left px-4 py-4 transition-colors cursor-pointer ${
                isSelected ? 'bg-[#F7F4EE]' : 'bg-white hover:bg-[#FBF9F5]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-sm md:text-xs font-mono tabular-nums">
                <span className={isSelected ? 'text-[#1E3A5F] font-semibold' : 'text-[#78716C]'}>
                  D{day.dayNumber} · {day.dateLabel}
                </span>
                <WeatherGlyph
                  icon={day.icon}
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-[#1E3A5F]' : 'text-[#78716C]'
                  }`}
                />
              </div>

              <p className="text-[17px] md:text-sm font-medium text-[#1C1917] mt-1.5 truncate">
                {day.city}
              </p>

              <div className="mt-1.5 flex items-baseline justify-between gap-2 tabular-nums">
                <p className="font-mono text-[18px] md:text-sm">
                  <span className="font-semibold text-[#1C1917]">
                    {formatTemperature(day.highC, unit)}
                  </span>
                  <span className="text-[#A8A29E] mx-0.5">/</span>
                  <span className="text-[#57534E]">
                    {formatTemperature(day.lowC, unit)}
                  </span>
                </p>
                <span className="text-sm md:text-xs text-[#78716C]">{day.condition}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Layering Tip & Direct Jump */}
      <div className="px-5 md:px-6 py-4.5 border-t border-[#EFECE6] bg-[#FBF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[17px] md:text-xs">
        <p className="text-[#44403C] leading-[1.75]">
          <span className="font-mono font-semibold text-[#1E3A5F] mr-2 tabular-nums">
            Day {activeDay.dayNumber}（{activeDay.dateLabel} {activeDay.city} · 降雨機率約{' '}
            {activeDay.rainChance}%）
          </span>
          {activeDay.layeringTip}
        </p>

        <button
          type="button"
          onClick={() => onJumpToDay(activeDay.dayNumber)}
          className="text-[#1E3A5F] font-semibold hover:underline underline-offset-4 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer min-h-[44px] md:min-h-0 inline-flex items-center"
        >
          查看 Day {activeDay.dayNumber} 行程 →
        </button>
      </div>
    </div>
  );
}
