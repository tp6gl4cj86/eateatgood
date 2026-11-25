import { ArrowUpRight, BarChart3, Camera } from 'lucide-react';
import { useState } from 'react';
import { DAY_VISUAL_PROFILES } from '../data/dayVisuals';
import { DAYS_ITINERARY } from '../data/itineraryData';

interface TripOverviewVisualStripProps {
  onSelectDay: (dayNumber: number) => void;
  showComparisonChart?: boolean;
}

export function TripOverviewVisualStrip({
  onSelectDay,
  showComparisonChart = true,
}: TripOverviewVisualStripProps) {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [chartMetric, setChartMetric] = useState<'steps' | 'transit'>('steps');

  const daysData = DAYS_ITINERARY.map((day) => {
    const visual = DAY_VISUAL_PROFILES[day.dayNumber];
    return {
      day,
      visual,
    };
  });

  const maxSteps = Math.max(...daysData.map((d) => d.visual.estimatedSteps), 16000);
  const maxTransit = Math.max(...daysData.map((d) => d.visual.localTransitMinutes), 270);

  const svgWidth = 640;
  const svgHeight = 200;
  const padLeft = 52;
  const padRight = 20;
  const padTop = 24;
  const padBottom = 36;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;
  const colW = plotW / daysData.length;
  const barW = Math.min(36, colW * 0.44);

  const yMax = chartMetric === 'steps' ? maxSteps : maxTransit;
  const yTicks =
    chartMetric === 'steps'
      ? [0, 4000, 8000, 12000, 16000]
      : [0, 90, 180, 270];

  return (
    <div className="space-y-6 mb-8">
      {/* 7-Day Photo Filmstrip Quick Visual Jump */}
      <div className="bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono font-semibold text-[#1E3A5F]">
            <Camera className="w-4 h-4 shrink-0" />
            <span>每日行程速覽</span>
          </div>
          <span className="text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
            Day 0 – Day 6 · 共 7 天
          </span>
        </div>

        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-1">
          {daysData.map(({ day, visual }) => {
            const hasFailed = failedImages[day.dayNumber];
            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => onSelectDay(day.dayNumber)}
                className="group relative w-[224px] sm:w-[236px] shrink-0 text-left rounded-[22px] overflow-hidden border border-[#E5E0D8] hover:border-[#1E3A5F] transition-all active:scale-[0.99] cursor-pointer bg-[#1C1917]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {!hasFailed ? (
                    <img
                      src={visual.photo}
                      alt={visual.photoAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [day.dayNumber]: true }))
                      }
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1E3A5F] to-[#292524] flex items-center justify-center text-white/70">
                      <Camera className="w-6 h-6" />
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/30 to-transparent"
                  />

                  <div className="absolute top-2.5 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 tabular-nums">
                    <span>DAY 0{day.dayNumber} · {day.date.slice(5)}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div className="absolute bottom-2.5 inset-x-3 text-white">
                    <p className="text-[11px] text-white/80 font-mono truncate">
                      {day.regionLabel} · {visual.paceLabel}
                    </p>
                    <p className="font-serif text-[15px] font-semibold leading-snug line-clamp-1 mt-0.5">
                      {day.shortTitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7-Day Steps vs Local Transit Comparison Bar Chart (shown in All-Days View) */}
      {showComparisonChart && (
        <div className="bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFECE6]">
            <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono font-semibold text-[#1E3A5F]">
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>七日步數與車程對比</span>
            </div>

            <div
              role="group"
              aria-label="切換對比指標"
              className="inline-flex items-center p-1 bg-[#F3EFE8] rounded-2xl shrink-0 self-start sm:self-auto"
            >
              <button
                type="button"
                onClick={() => setChartMetric('steps')}
                aria-pressed={chartMetric === 'steps'}
                className={`px-3.5 py-1.5 text-sm md:text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  chartMetric === 'steps'
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                預估步數
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('transit')}
                aria-pressed={chartMetric === 'transit'}
                className={`px-3.5 py-1.5 text-sm md:text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  chartMetric === 'transit'
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                在地車程（分）
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto no-scrollbar">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full min-w-[480px] h-auto select-none"
              role="img"
              aria-label="七天預估步行量與交通時間比較圖"
            >
              {yTicks.map((tick) => {
                const y = padTop + plotH - (tick / yMax) * plotH;
                return (
                  <g key={tick}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={svgWidth - padRight}
                      y2={y}
                      stroke={tick === 0 ? '#CBC3B6' : '#EFECE6'}
                      strokeWidth={tick === 0 ? 1 : 0.75}
                      strokeDasharray={tick === 0 ? undefined : '3 3'}
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 3.5}
                      textAnchor="end"
                      fontSize="10"
                      fill="#78716C"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {chartMetric === 'steps'
                        ? tick === 0
                          ? '0'
                          : `${tick / 1000}k`
                        : `${tick}m`}
                    </text>
                  </g>
                );
              })}

              {daysData.map(({ day, visual }, idx) => {
                const value =
                  chartMetric === 'steps'
                    ? visual.estimatedSteps
                    : visual.localTransitMinutes;
                const barH = Math.max(4, (value / yMax) * plotH);
                const centerX = padLeft + colW * idx + colW / 2;
                const x = centerX - barW / 2;
                const y = padTop + plotH - barH;
                const isPeak =
                  (chartMetric === 'steps' && value >= 14000) ||
                  (chartMetric === 'transit' && value >= 140);
                const fillColor = isPeak
                  ? '#B43E2B'
                  : chartMetric === 'steps'
                    ? '#2F6B4F'
                    : '#1E3A5F';

                return (
                  <g
                    key={day.dayNumber}
                    onClick={() => onSelectDay(day.dayNumber)}
                    className="cursor-pointer group"
                  >
                    <rect
                      x={padLeft + colW * idx + 4}
                      y={padTop - 4}
                      width={colW - 8}
                      height={plotH + 34}
                      fill="transparent"
                    />
                    <rect
                      x={x}
                      y={y}
                      width={barW}
                      height={barH}
                      rx="6"
                      fill={fillColor}
                      opacity="0.9"
                    />
                    <text
                      x={centerX}
                      y={y - 6}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill={fillColor}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {chartMetric === 'steps'
                        ? `${(value / 1000).toFixed(1)}k`
                        : `${value}分`}
                    </text>
                    <text
                      x={centerX}
                      y={svgHeight - 16}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#1C1917"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Day {day.dayNumber}
                    </text>
                    <text
                      x={centerX}
                      y={svgHeight - 3}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="#78716C"
                    >
                      {day.regionLabel.split('・')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
