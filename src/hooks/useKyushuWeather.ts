import { useEffect, useState } from 'react';

export type WeatherIconKind = 'sun' | 'partly_cloudy' | 'cloudy' | 'windy' | 'rain';
export type TemperatureUnit = 'C' | 'F';

export interface DailyForecastItem {
  dayNumber: number;
  dateLabel: string;
  weekday: string;
  city: string;
  highC: number;
  lowC: number;
  rainChance: number;
  condition: string;
  icon: WeatherIconKind;
  layeringTip: string;
  tempOffsetC: number;
}

export const BASELINE_KYUSHU_FEB_FORECAST: DailyForecastItem[] = [
  {
    dayNumber: 1,
    dateLabel: '02/23',
    weekday: '二',
    city: '福岡・佐賀',
    highC: 12,
    lowC: 5,
    rainChance: 20,
    condition: '晴時多雲',
    icon: 'partly_cloudy',
    layeringTip: '冬末微涼乾爽，洋蔥式薄發熱衣加防風大衣即可應付博多與佐賀行程。',
    tempOffsetC: 0,
  },
  {
    dayNumber: 2,
    dateLabel: '02/24',
    weekday: '三',
    city: '門司港・小倉',
    highC: 11,
    lowC: 4,
    rainChance: 25,
    condition: '海風微涼',
    icon: 'windy',
    layeringTip: '關門海峽與藍翼吊橋風勢偏強，建議攜帶圍巾；晚間體育館室內較暖和。',
    tempOffsetC: -1,
  },
  {
    dayNumber: 3,
    dateLabel: '02/25',
    weekday: '四',
    city: '大分・由布院',
    highC: 8,
    lowC: 0,
    rainChance: 30,
    condition: '山區清冷',
    icon: 'cloudy',
    layeringTip: '由布院盆地海拔較高，早晚氣溫接近 0°C，務必穿著羽絨外套或毛衣保暖。',
    tempOffsetC: -4,
  },
  {
    dayNumber: 4,
    dateLabel: '02/26',
    weekday: '五',
    city: '熊本市區',
    highC: 14,
    lowC: 4,
    rainChance: 15,
    condition: '晴朗舒適',
    icon: 'sun',
    layeringTip: '熊本白天陽光充足、體感較福岡略暖，但入夜溫差大，建議好穿脫外套。',
    tempOffsetC: 1,
  },
  {
    dayNumber: 5,
    dateLabel: '02/27',
    weekday: '六',
    city: '北九州・小倉',
    highC: 13,
    lowC: 5,
    rainChance: 20,
    condition: '多雲時晴',
    icon: 'partly_cloudy',
    layeringTip: '小倉競馬場戶外看台久待較涼，建議備妥防風外套與暖暖包。',
    tempOffsetC: 0,
  },
  {
    dayNumber: 6,
    dateLabel: '02/28',
    weekday: '日',
    city: '博多・福岡',
    highC: 14,
    lowC: 6,
    rainChance: 15,
    condition: '晴時多雲',
    icon: 'sun',
    layeringTip: '返台日主要於博多站室內商場採買，輕便保暖穿搭最利於搭機。',
    tempOffsetC: 0,
  },
];

function mapWmoToCondition(code: number): {
  condition: string;
  icon: WeatherIconKind;
  rainBase: number;
} {
  if (code <= 1) return { condition: '晴朗舒適', icon: 'sun', rainBase: 10 };
  if (code <= 3) return { condition: '晴時多雲', icon: 'partly_cloudy', rainBase: 20 };
  if (code >= 51 && code <= 82) return { condition: '局部陣雨', icon: 'rain', rainBase: 55 };
  return { condition: '多雲微涼', icon: 'cloudy', rainBase: 30 };
}

export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  if (unit === 'F') {
    return `${Math.round((celsius * 9) / 5 + 32)}°`;
  }
  return `${Math.round(celsius)}°`;
}

export function useKyushuWeather() {
  const [forecast, setForecast] = useState<DailyForecastItem[]>(BASELINE_KYUSHU_FEB_FORECAST);
  const [dataSource, setDataSource] = useState<'baseline' | 'open-meteo'>('baseline');

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4500);

    const url =
      'https://archive-api.open-meteo.com/v1/archive?latitude=33.5902&longitude=130.4017&start_date=2026-02-23&end_date=2026-02-28&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo';

    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Weather API unavailable'))))
      .then(
        (data: {
          daily?: {
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
            weather_code?: number[];
            precipitation_sum?: number[];
          };
        }) => {
          const maxArr = data.daily?.temperature_2m_max;
          const minArr = data.daily?.temperature_2m_min;
          const codeArr = data.daily?.weather_code;
          const precipArr = data.daily?.precipitation_sum;
          if (!maxArr || !minArr || maxArr.length < 6 || minArr.length < 6) return;

          setForecast(
            BASELINE_KYUSHU_FEB_FORECAST.map((item, idx) => {
              const rawMax = maxArr[idx];
              const rawMin = minArr[idx];
              if (typeof rawMax !== 'number' || typeof rawMin !== 'number') return item;

              const mapped =
                typeof codeArr?.[idx] === 'number'
                  ? mapWmoToCondition(codeArr[idx])
                  : { condition: item.condition, icon: item.icon, rainBase: item.rainChance };
              const precip = precipArr?.[idx] ?? 0;
              const rainChance =
                precip > 1
                  ? Math.min(80, Math.max(45, Math.round(precip * 12)))
                  : mapped.rainBase;

              return {
                ...item,
                highC: Math.round(rawMax + item.tempOffsetC),
                lowC: Math.round(rawMin + item.tempOffsetC),
                condition:
                  item.dayNumber === 2 && mapped.icon !== 'rain' ? '海風微涼' : mapped.condition,
                icon: item.dayNumber === 2 && mapped.icon !== 'rain' ? 'windy' : mapped.icon,
                rainChance,
              };
            })
          );
          setDataSource('open-meteo');
        }
      )
      .catch(() => {
        // Keep curated late-February Kyushu climatological baseline silently
      })
      .finally(() => {
        window.clearTimeout(timer);
      });

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { forecast, dataSource };
}
