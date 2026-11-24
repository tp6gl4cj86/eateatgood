import {
  Camera,
  Clock,
  Footprints,
  MapPin,
  Thermometer,
  TrainFront,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import {
  CATEGORY_COLORS,
  DAY_VISUAL_PROFILES,
} from '../data/dayVisuals';
import { ActivityCategory, DayItinerary } from '../data/itineraryData';
import {
  DailyForecastItem,
  TemperatureUnit,
  formatTemperature,
} from '../hooks/useKyushuWeather';

interface DayVisualDashboardProps {
  day: DayItinerary;
  completedCount: number;
  totalBlocks: number;
  dayWeather?: DailyForecastItem;
  unit: TemperatureUnit;
  highlight1900: boolean;
  onJumpToBlock: (blockId: string) => void;
}

function formatHourTick(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function DayVisualDashboard({
  day,
  completedCount,
  totalBlocks,
  dayWeather,
  unit,
  highlight1900,
  onJumpToBlock,
}: DayVisualDashboardProps) {
  const [imgError, setImgError] = useState(false);
  const profile = DAY_VISUAL_PROFILES[day.dayNumber];

  if (!profile) return null;

  const progressRatio = totalBlocks > 0 ? completedCount / totalBlocks : 0;
  const progressPercent = Math.round(progressRatio * 100);
  const ringRadius = 24;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - progressRatio);

  // Schedule Gantt axis range
  const minHour = day.dayNumber === 0 ? 18 : 8;
  const maxHour = 23.5;
  const hourSpan = maxHour - minHour;
  const ticks =
    day.dayNumber === 0
      ? [18, 19, 20, 21, 22, 23]
      : [8, 11, 14, 17, 20, 23];

  const totalBreakdownHours = profile.activityBreakdown.reduce(
    (acc, item) => acc + item.hours,
    0
  );

  // Hourly temperature curve data points derived from dayWeather
  const tempPoints = dayWeather
    ? [
        { label: '08:00', tempC: Math.round(dayWeather.lowC + (dayWeather.highC - dayWeather.lowC) * 0.2) },
        { label: '12:00', tempC: dayWeather.highC },
        { label: '16:00', tempC: Math.round(dayWeather.lowC + (dayWeather.highC - dayWeather.lowC) * 0.72) },
        { label: '20:00', tempC: Math.round(dayWeather.lowC + (dayWeather.highC - dayWeather.lowC) * 0.3) },
        { label: '23:00', tempC: dayWeather.lowC },
      ]
    : null;

  // Build SVG sparkline curve for temperature
  const buildTempCurve = () => {
    if (!tempPoints) return null;
    const w = 320;
    const h = 104;
    const padX = 28;
    const padTop = 26;
    const padBottom = 24;
    const plotW = w - padX * 2;
    const plotH = h - padTop - padBottom;
    const temps = tempPoints.map((p) => p.tempC);
    const minT = Math.min(...temps) - 2;
    const maxT = Math.max(...temps) + 2;
    const rangeT = Math.max(1, maxT - minT);

    const coords = tempPoints.map((pt, idx) => {
      const x = padX + (plotW * idx) / (tempPoints.length - 1);
      const y = padTop + plotH - ((pt.tempC - minT) / rangeT) * plotH;
      return { ...pt, x, y };
    });

    const linePath = coords
      .map((pt, i) => {
        if (i === 0) return `M ${pt.x} ${pt.y}`;
        const prev = coords[i - 1];
        const cx = (prev.x + pt.x) / 2;
        return `C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
      })
      .join(' ');

    const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${h - padBottom} L ${coords[0].x} ${h - padBottom} Z`;

    return { w, h, padBottom, coords, linePath, areaPath };
  };

  const tempCurve = buildTempCurve();

  // Steps bar fill (normalized against 16,000 steps max reference)
  const stepsBarPercent = Math.min(100, Math.round((profile.estimatedSteps / 16000) * 100));
  // Transit bar fill (normalized against 270 min max reference)
  const transitBarPercent = Math.min(100, Math.round((profile.localTransitMinutes / 270) * 100));

  return (
    <div className="mb-7 md:mb-9 space-y-5">
      {/* 1. Editorial Bespoke Day Cover Photograph with Completion Ring */}
      <figure className="relative overflow-hidden rounded-[28px] border border-[#E5E0D8] bg-[#292524] group">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          {!imgError ? (
            <img
              src={profile.photo}
              alt={profile.photoAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1E3A5F] via-[#2B496E] to-[#3A2C27] flex flex-col items-center justify-center text-white/80 p-6">
              <Camera className="w-8 h-8 mb-2 opacity-75" />
              <p className="font-serif text-lg">{day.shortTitle}</p>
            </div>
          )}

          {/* Measured Contrast Scrim for WCAG AA Legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/38 to-[#141210]/15"
          />

          {/* Top Editorial Stamp Row */}
          <div className="absolute top-4 inset-x-4 sm:top-5 sm:inset-x-6 flex items-center justify-between gap-3 text-white/90 text-xs sm:text-xs font-mono tracking-wider">
            <span className="truncate drop-shadow-xs">
              DAY 0{day.dayNumber} · {profile.locationStamp} · {day.date}（{day.weekday}）
            </span>
            <span className="hidden sm:inline shrink-0 text-white/80 drop-shadow-xs">
              {profile.paceLabel}
            </span>
          </div>

          {/* Bottom Content Overlay + Circular Progress Ring */}
          <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-xs font-mono text-white/80 mb-1 truncate">
                {profile.figureCaption}
              </p>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-snug headline-balance drop-shadow-xs">
                {day.shortTitle}
              </h2>
              <p className="hidden sm:block text-sm text-white/85 mt-1.5 line-clamp-1 max-w-2xl">
                {day.routeSummary}
              </p>
            </div>

            {/* Live Circular SVG Completion Gauge */}
            <div
              className="shrink-0 flex items-center gap-2.5 bg-[#1C1917]/65 backdrop-blur-md border border-white/15 rounded-2xl px-3 py-2 text-white"
              aria-label={`本日打卡進度 ${completedCount} / ${totalBlocks}`}
            >
              <svg width="56" height="56" viewBox="0 0 60 60" className="w-11 h-11 sm:w-12 sm:h-12 -rotate-90">
                <circle
                  cx="30"
                  cy="30"
                  r={ringRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="4.5"
                />
                <circle
                  cx="30"
                  cy="30"
                  r={ringRadius}
                  fill="none"
                  stroke={progressPercent === 100 ? '#7DD3A8' : '#F8FAFC'}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  className="transition-all duration-300"
                />
                <text
                  x="30"
                  y="30"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="JetBrains Mono, monospace"
                  transform="rotate(90 30 30)"
                >
                  {completedCount}/{totalBlocks}
                </text>
              </svg>
              <div className="hidden sm:block pr-1 tabular-nums">
                <p className="text-[11px] font-mono text-white/75 leading-tight">本日完成</p>
                <p className="font-mono text-sm font-semibold leading-tight mt-0.5">
                  {progressPercent}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </figure>

      {/* 2. Interactive Visual Analytics & Infographics Row (2-Column Desktop / Stacked Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Visual Card: Schedule Gantt Timeline + Activity Hours Stacked Bar */}
        <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between gap-5 min-w-0">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#EFECE6]">
              <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono font-semibold text-[#1E3A5F]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>當日時間軸節奏圖（點擊跳至該時段）</span>
              </div>
              <span className="text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
                {formatHourTick(minHour)} – {formatHourTick(maxHour)}
              </span>
            </div>

            {/* Interactive Gantt Timeline Bars */}
            <div className="mt-4 relative">
              {/* Vertical Hour Gridlines */}
              <div className="relative pt-1 pb-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 bottom-6 pointer-events-none"
                >
                  {ticks.map((tick) => {
                    const leftPct = ((tick - minHour) / hourSpan) * 100;
                    return (
                      <div
                        key={tick}
                        style={{ left: `${leftPct}%` }}
                        className="absolute top-0 bottom-0 border-l border-dashed border-[#ECE7DE]"
                      />
                    );
                  })}

                  {/* Optional 19:00 Teammate Cutoff Marker Line */}
                  {profile.cutoffHour !== undefined && (
                    <div
                      style={{
                        left: `${Math.min(98, Math.max(2, ((profile.cutoffHour - minHour) / hourSpan) * 100))}%`,
                      }}
                      className={`absolute top-0 bottom-0 border-l-2 border-dashed transition-colors ${
                        highlight1900 ? 'border-[#B43E2B]' : 'border-[#B43E2B]/55'
                      }`}
                    />
                  )}
                </div>

                {/* Clickable Activity Schedule Bars */}
                <div className="relative space-y-2.5 z-10">
                  {profile.timelineSlots.map((slot) => {
                    const leftPct = Math.max(0, ((slot.startHour - minHour) / hourSpan) * 100);
                    const widthPct = Math.max(
                      12,
                      Math.min(100 - leftPct, ((slot.endHour - slot.startHour) / hourSpan) * 100)
                    );
                    const style = CATEGORY_COLORS[slot.primaryCategory];
                    return (
                      <button
                        key={slot.blockId}
                        type="button"
                        onClick={() => onJumpToBlock(slot.blockId)}
                        className="group w-full text-left block focus-visible:outline-2 focus-visible:outline-[#1E3A5F] rounded-xl cursor-pointer"
                        title={`跳至 ${slot.shortLabel}`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[15px] md:text-xs mb-1">
                          <span className="font-medium text-[#1C1917] group-hover:text-[#1E3A5F] truncate transition-colors">
                            {slot.shortLabel}
                          </span>
                          <span className="font-mono text-[#78716C] shrink-0 tabular-nums">
                            {formatHourTick(slot.startHour)}–{formatHourTick(slot.endHour)}
                          </span>
                        </div>
                        <div className="h-3.5 w-full bg-[#F5F1EA] rounded-full overflow-hidden relative">
                          <div
                            style={{
                              left: `${leftPct}%`,
                              width: `${widthPct}%`,
                              backgroundColor: style.fill,
                            }}
                            className="absolute top-0 bottom-0 rounded-full transition-opacity group-hover:opacity-85"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* X-Axis Hour Labels */}
                <div className="relative mt-2.5 h-4 text-[11px] font-mono text-[#78716C] tabular-nums select-none">
                  {ticks.map((tick, idx) => {
                    const leftPct = ((tick - minHour) / hourSpan) * 100;
                    const translateClass =
                      idx === 0
                        ? 'translate-x-0'
                        : idx === ticks.length - 1
                          ? '-translate-x-full'
                          : '-translate-x-1/2';
                    return (
                      <span
                        key={tick}
                        style={{ left: `${leftPct}%` }}
                        className={`absolute top-0 ${translateClass}`}
                      >
                        {String(tick).padStart(2, '0')}:00
                      </span>
                    );
                  })}
                </div>
              </div>

              {profile.cutoffLabel && (
                <p
                  className={`text-sm md:text-xs font-mono tabular-nums mt-1 ${
                    highlight1900 ? 'text-[#B43E2B] font-semibold' : 'text-[#991B1B]'
                  }`}
                >
                  紅虛線標記：{profile.cutoffLabel}
                </p>
              )}
            </div>
          </div>

          {/* Activity Composition Stacked Bar Chart */}
          <div className="pt-4 border-t border-[#EFECE6]">
            <div className="flex items-center justify-between gap-2 text-sm md:text-xs font-mono text-[#78716C] mb-2 tabular-nums">
              <span>當日活動時間配置</span>
              <span>合計約 {totalBreakdownHours.toFixed(1)} 小時</span>
            </div>

            <div
              className="h-3 w-full rounded-full overflow-hidden flex gap-0.5 bg-[#EFECE6]"
              role="img"
              aria-label="當日各類活動時間佔比條"
            >
              {profile.activityBreakdown.map((item) => {
                const pct = (item.hours / totalBreakdownHours) * 100;
                return (
                  <div
                    key={`${item.category}-${item.label}`}
                    style={{
                      width: `${pct}%`,
                      backgroundColor: CATEGORY_COLORS[item.category].fill,
                    }}
                    title={`${item.label}：約 ${item.hours} 小時`}
                  />
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[15px] md:text-xs tabular-nums">
              {profile.activityBreakdown.map((item) => (
                <div
                  key={`${item.category}-${item.label}`}
                  className="flex items-center gap-2 min-w-0"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[item.category].fill }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-[#1C1917] font-medium truncate leading-tight">
                      {item.label}
                    </p>
                    <p className="text-xs md:text-[11px] font-mono text-[#78716C]">
                      {item.hours}h · {Math.round((item.hours / totalBreakdownHours) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Visual Card: Hourly Temperature Curve + Pace Gauges + Crew Split */}
        <div className="lg:col-span-5 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between gap-5 min-w-0">
          {/* Hourly Temperature Area Curve SVG */}
          {tempCurve && dayWeather ? (
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EFECE6]">
                <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono font-semibold text-[#1E3A5F]">
                  <Thermometer className="w-4 h-4 shrink-0" />
                  <span>當日時段氣溫曲線</span>
                </div>
                <span className="text-sm md:text-xs font-mono text-[#57534E] tabular-nums">
                  {formatTemperature(dayWeather.lowC, unit)} – {formatTemperature(dayWeather.highC, unit)}
                </span>
              </div>

              <svg
                viewBox={`0 0 ${tempCurve.w} ${tempCurve.h}`}
                className="w-full h-auto mt-2 select-none"
                role="img"
                aria-label={`Day ${day.dayNumber} 時段氣溫變化曲線圖`}
              >
                <defs>
                  <linearGradient id={`temp-grad-${day.dayNumber}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Baseline */}
                <line
                  x1="20"
                  y1={tempCurve.h - tempCurve.padBottom}
                  x2={tempCurve.w - 20}
                  y2={tempCurve.h - tempCurve.padBottom}
                  stroke="#EFECE6"
                  strokeWidth="1"
                />

                {/* Area Fill */}
                <path d={tempCurve.areaPath} fill={`url(#temp-grad-${day.dayNumber})`} />

                {/* Smooth Temp Line */}
                <path
                  d={tempCurve.linePath}
                  fill="none"
                  stroke="#1E3A5F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points & Labels */}
                {tempCurve.coords.map((pt) => (
                  <g key={pt.label}>
                    <circle cx={pt.x} cy={pt.y} r="3.8" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="2.2" />
                    <text
                      x={pt.x}
                      y={pt.y - 9}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="600"
                      fill="#1C1917"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {formatTemperature(pt.tempC, unit)}
                    </text>
                    <text
                      x={pt.x}
                      y={tempCurve.h - 6}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="#78716C"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          ) : (
            <div className="pb-3 border-b border-[#EFECE6]">
              <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono font-semibold text-[#1E3A5F]">
                <Users className="w-4 h-4 shrink-0" />
                <span>行前開趴全員狀態</span>
              </div>
              <p className="text-[17px] md:text-xs text-[#57534E] mt-2 leading-relaxed">
                四位成員出發前最後合體熱身，輕鬆整理護照、eSIM 與日幣現金，養足體力隔日搭星宇 JX842 直飛福岡！
              </p>
            </div>
          )}

          {/* Physical Pace & Transit Visual Gauges */}
          <div className="space-y-3.5 tabular-nums">
            <div>
              <div className="flex items-center justify-between text-[15px] md:text-xs mb-1.5">
                <span className="inline-flex items-center gap-1.5 text-[#57534E]">
                  <Footprints className="w-4 h-4 text-[#2F6B4F]" />
                  預估步行量
                </span>
                <span className="font-mono font-semibold text-[#1C1917]">
                  {profile.estimatedSteps.toLocaleString('en-US')} 步 · {profile.walkingKm} km
                </span>
              </div>
              <div className="h-2 w-full bg-[#EFECE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2F6B4F] rounded-full"
                  style={{ width: `${stepsBarPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[15px] md:text-xs mb-1.5">
                <span className="inline-flex items-center gap-1.5 text-[#57534E]">
                  <TrainFront className="w-4 h-4 text-[#1E3A5F]" />
                  當日在地交通時間
                </span>
                <span className="font-mono font-semibold text-[#1C1917]">
                  約 {profile.localTransitMinutes} 分鐘
                </span>
              </div>
              <div className="h-2 w-full bg-[#EFECE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1E3A5F] rounded-full"
                  style={{ width: `${Math.max(8, transitBarPercent)}%` }}
                />
              </div>
            </div>

            {/* Pace Meter (5-Segment Bar) */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-[15px] md:text-xs text-[#57534E]">
                體力節奏 · <strong className="text-[#1C1917] font-semibold">{profile.paceLabel}</strong>
              </span>
              <div className="flex items-center gap-1.5" aria-label={`行程強度 ${profile.paceLevel} / 5`}>
                {[1, 2, 3, 4, 5].map((lv) => (
                  <span
                    key={lv}
                    className={`h-2 w-5 rounded-full ${
                      lv <= profile.paceLevel
                        ? profile.paceLevel >= 4
                          ? 'bg-[#B43E2B]'
                          : 'bg-[#1E3A5F]'
                        : 'bg-[#E5E0D8]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Crew Attendance Visual Strip */}
          <div className="pt-3.5 border-t border-[#EFECE6]">
            <div className="flex items-center justify-between gap-2 text-sm md:text-xs text-[#57534E] mb-2">
              <span className="font-medium text-[#1C1917]">{profile.crewPlan.headline}</span>
              <span className="font-mono text-[#78716C] tabular-nums">
                {profile.crewPlan.specialMembers
                  ? `分流 ${profile.crewPlan.specialMembers.length} 人`
                  : `${profile.crewPlan.fullCrew.length} 人`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[16px] md:text-xs text-[#292524]">
              {profile.crewPlan.fullCrew.map((member, idx) => {
                const isSpecial = profile.crewPlan.specialMembers?.includes(member);
                return (
                  <span key={member} className="inline-flex items-center gap-2">
                    <span className={isSpecial ? 'font-semibold text-[#B43E2B]' : 'text-[#44403C]'}>
                      {member}
                      {isSpecial ? '（看籃球）' : ''}
                    </span>
                    {idx < profile.crewPlan.fullCrew.length - 1 && (
                      <span aria-hidden="true" className="text-[#CBC3B6]">
                        ·
                      </span>
                    )}
                  </span>
                );
              })}
            </div>

            {profile.crewPlan.specialNote && (
              <p className="text-sm md:text-[11px] text-[#78716C] mt-2 leading-relaxed">
                {profile.crewPlan.specialNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Visual Stop-by-Stop Transit Flow Diagram */}
      <div className="bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono font-semibold text-[#1E3A5F]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>當日站點移動動線圖</span>
          </div>
          <span className="text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
            共 {profile.routeNodes.length} 個主要節點
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar pb-1">
          <ol
            className={`flex items-stretch min-w-max md:min-w-0 md:grid ${
              profile.routeNodes.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
            } gap-3`}
          >
            {profile.routeNodes.map((node, index) => {
              const isLast = index === profile.routeNodes.length - 1;
              return (
                <li
                  key={`${day.dayNumber}-node-${index}`}
                  className="relative flex items-center gap-2.5 w-[210px] md:w-auto shrink-0"
                >
                  <div className="flex-1 bg-[#FBF9F5] border border-[#EFECE6] rounded-2xl p-3.5 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-semibold text-[#1E3A5F] tabular-nums">
                        0{index + 1}
                      </span>
                      {node.durationToNext && (
                        <span className="font-mono text-[11px] text-[#78716C] tabular-nums">
                          ➔ {node.modeToNext} {node.durationToNext}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[16px] md:text-sm text-[#1C1917] leading-snug">
                        {node.name}
                      </p>
                      <p className="text-sm md:text-xs text-[#57534E] mt-0.5 leading-snug">
                        {node.detail}
                      </p>
                    </div>
                  </div>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="hidden md:inline text-[#CBC3B6] font-mono text-sm shrink-0 -mr-1.5"
                    >
                      ➔
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
