import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Copy,
  Droplets,
  ExternalLink,
  MapPin,
  TrainFront,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { CATEGORY_COLORS } from '../data/dayVisuals';
import {
  ActivityCategory,
  DAYS_ITINERARY,
  DayItinerary,
  TRIP_OVERVIEW,
} from '../data/itineraryData';
import {
  DailyForecastItem,
  TemperatureUnit,
  formatTemperature,
} from '../hooks/useKyushuWeather';
import { DayVisualDashboard } from './DayVisualDashboard';
import { WeatherGlyph } from './HeroWeatherWidget';
import { TripOverviewVisualStrip } from './TripOverviewVisualStrip';

interface ItinerarySectionProps {
  selectedDay: number | 'all';
  onSelectDay: (day: number | 'all') => void;
  completedBlocks: Record<string, boolean>;
  onToggleBlock: (blockId: string) => void;
  forecast: DailyForecastItem[];
  unit: TemperatureUnit;
  onChangeUnit: (unit: TemperatureUnit) => void;
}

const CATEGORY_FILTERS: Array<{ id: ActivityCategory | 'all'; label: string }> = [
  { id: 'all', label: '全部類型' },
  { id: 'transport', label: '鐵道交通' },
  { id: 'sightseeing', label: '景點散策' },
  { id: 'dining', label: '九州美食' },
  { id: 'sports_entertainment', label: '賽事與娛樂' },
];

const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  transport: '交通',
  sightseeing: '景點',
  dining: '美食',
  sports_entertainment: '賽事娛樂',
};

function buildGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function ItinerarySection({
  selectedDay,
  onSelectDay,
  completedBlocks,
  onToggleBlock,
  forecast,
  unit,
  onChangeUnit,
}: ItinerarySectionProps) {
  const [categoryFilter, setCategoryFilter] = useState<ActivityCategory | 'all'>('all');
  const [highlight1900, setHighlight1900] = useState(false);
  const [copiedSpot, setCopiedSpot] = useState<string | null>(null);

  const visibleDays: DayItinerary[] =
    selectedDay === 'all'
      ? DAYS_ITINERARY
      : DAYS_ITINERARY.filter((day) => day.dayNumber === selectedDay);

  const currentDayIndex =
    typeof selectedDay === 'number'
      ? DAYS_ITINERARY.findIndex((d) => d.dayNumber === selectedDay)
      : -1;
  const currentDayObj =
    currentDayIndex >= 0 ? DAYS_ITINERARY[currentDayIndex] : undefined;
  const prevDayObj = currentDayIndex > 0 ? DAYS_ITINERARY[currentDayIndex - 1] : undefined;
  const nextDayObj =
    currentDayIndex >= 0 && currentDayIndex < DAYS_ITINERARY.length - 1
      ? DAYS_ITINERARY[currentDayIndex + 1]
      : undefined;

  const activeBlockList = visibleDays.flatMap((d) => d.blocks);
  const activeCompletedCount = activeBlockList.filter((b) => completedBlocks[b.id]).length;

  const handleCopySpot = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedSpot(text);
    window.setTimeout(() => {
      setCopiedSpot((prev) => (prev === text ? null : prev));
    }, 1800);
  };

  const handleJumpToBlock = (blockId: string) => {
    setCategoryFilter('all');
    window.requestAnimationFrame(() => {
      const target = document.getElementById(`block-${blockId}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  return (
    <section
      id="itinerary"
      aria-labelledby="itinerary-heading"
      className="py-7 md:py-14 overflow-x-clip"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="max-w-2xl">
            <p className="text-sm md:text-xs font-mono tracking-[0.12em] text-[#57534E] mb-2 tabular-nums">
              {currentDayObj
                ? `DAY 0${currentDayObj.dayNumber} · ${currentDayObj.date}（${currentDayObj.weekday}）· ${currentDayObj.regionLabel}`
                : '完整行程總表 · Day 0 – Day 6（2027/02/22 – 02/28）'}
            </p>
            <h1
              id="itinerary-heading"
              className="font-serif text-[1.75rem] sm:text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight headline-balance leading-snug"
            >
              {currentDayObj
                ? currentDayObj.shortTitle
                : '六天五夜逐時手冊與隊友分流指南'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[17px] md:text-sm text-[#57534E] tabular-nums">
            <span>
              {currentDayObj ? '本日進度：' : '全團進度：'}
              <strong className="text-[#1C1917] font-mono">
                {activeCompletedCount}/{activeBlockList.length}
              </strong>{' '}
              時段已打卡（儲存在本機瀏覽器）
            </span>
          </div>
        </div>

        {/* Sub-Toolbar: Category Filter & 19:00 Teammate Focus Mode */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-[#E5E0D8] min-w-0">
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 w-full md:w-auto min-w-0"
            role="group"
            aria-label="行程類型篩選"
          >
            {CATEGORY_FILTERS.map((cat) => {
              const active = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-4 min-h-[46px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-white text-[#57534E] border-[#E5E0D8] hover:border-[#A8A29E] hover:text-[#1C1917]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setHighlight1900((prev) => !prev)}
            aria-pressed={highlight1900}
            className={`inline-flex items-center justify-center gap-2 px-4 min-h-[48px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
              highlight1900
                ? 'bg-[#B43E2B] text-white border-[#B43E2B]'
                : 'bg-white text-[#1C1917] border-[#D6CEBE] hover:border-[#B43E2B]'
            }`}
          >
            <Users className="w-4 h-4 md:w-3.5 md:h-3.5" />
            <span>
              {highlight1900 ? '已強調 19:00 隊友返程動線' : '標示 19:00 隊友每日分流時間'}
            </span>
          </button>
        </div>

        {/* All-Days Visual Filmstrip & 7-Day Steps/Transit Comparison Chart */}
        {selectedDay === 'all' && (
          <div className="pt-7">
            <TripOverviewVisualStrip
              onSelectDay={(dayNumber) => onSelectDay(dayNumber)}
              showComparisonChart
            />
          </div>
        )}

        {/* Day Chapters */}
        <div className="divide-y divide-[#E5E0D8]">
          {visibleDays.map((day) => {
            const filteredBlocks =
              categoryFilter === 'all'
                ? day.blocks
                : day.blocks.filter((b) => b.categories.includes(categoryFilter));
            const dayWeather = forecast.find((w) => w.dayNumber === day.dayNumber);
            const dayCompletedCount = day.blocks.filter((b) => completedBlocks[b.id]).length;

            return (
              <article
                key={day.dayNumber}
                id={`day-${day.dayNumber}`}
                className="py-8 md:py-12"
              >
                {/* Rich Visual Dashboard: Bespoke Day Photo, Timeline Gantt, Temp Curve, Pace & Route Diagram */}
                <DayVisualDashboard
                  day={day}
                  completedCount={dayCompletedCount}
                  totalBlocks={day.blocks.length}
                  dayWeather={dayWeather}
                  unit={unit}
                  highlight1900={highlight1900}
                  onJumpToBlock={handleJumpToBlock}
                />

                {/* Day Header Grid (Asymmetric 4 / 8 split) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-w-0">
                  {/* Left Chapter Index Column */}
                  <div className="lg:col-span-4 space-y-5 min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
                        <span>DAY 0{day.dayNumber}</span>
                        <span aria-hidden="true">/</span>
                        <span>
                          {day.date}（{day.weekday}）
                        </span>
                        {day.jrPassDay && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#1E3A5F] font-medium">
                              JR 券第 {day.jrPassDay} 日
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl md:text-[1.75rem] font-semibold text-[#1C1917] mt-2.5 leading-snug headline-balance">
                        {day.shortTitle}
                      </h2>

                      <p className="text-[18px] md:text-sm text-[#57534E] mt-2.5 leading-[1.8]">
                        {day.routeSummary}
                      </p>
                    </div>

                    {/* Daily Weather Forecast Card */}
                    {dayWeather && (
                      <div className="bg-white border border-[#E5E0D8] rounded-[28px] p-5 space-y-3.5">
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EFECE6]">
                          <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono text-[#1E3A5F] font-semibold">
                            <WeatherGlyph icon={dayWeather.icon} className="w-4 h-4 shrink-0" />
                            <span>本日天氣預估 · {dayWeather.city}</span>
                          </div>

                          <div
                            role="group"
                            aria-label="溫度單位切換"
                            className="inline-flex items-center p-0.5 bg-[#F3EFE8] rounded-xl shrink-0"
                          >
                            <button
                              type="button"
                              onClick={() => onChangeUnit('C')}
                              aria-pressed={unit === 'C'}
                              className={`px-2.5 py-1 text-sm md:text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
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
                              className={`px-2.5 py-1 text-sm md:text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                                unit === 'F'
                                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                                  : 'text-[#78716C] hover:text-[#1C1917]'
                              }`}
                            >
                              °F
                            </button>
                          </div>
                        </div>

                        <div className="flex items-baseline justify-between gap-3 tabular-nums">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-2xl font-semibold text-[#1C1917]">
                              {formatTemperature(dayWeather.highC, unit)}
                            </span>
                            <span className="font-mono text-[17px] md:text-sm text-[#78716C]">
                              / {formatTemperature(dayWeather.lowC, unit)}
                            </span>
                            <span className="text-[17px] md:text-xs font-medium text-[#44403C] ml-1">
                              {dayWeather.condition}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-1 text-[16px] md:text-xs font-mono text-[#57534E] shrink-0">
                            <Droplets className="w-4 h-4 text-[#1E3A5F]" />
                            {dayWeather.rainChance}%
                          </span>
                        </div>

                        <p className="text-[17px] md:text-xs text-[#57534E] leading-[1.75] pt-2.5 border-t border-[#F3EFE8]">
                          {dayWeather.layeringTip}
                        </p>
                      </div>
                    )}

                    {/* Day 0 Crew Attendance Card */}
                    {day.dayNumber === 0 && (
                      <div className="bg-white border border-[#E5E0D8] rounded-[28px] p-5 space-y-3.5">
                        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#EFECE6]">
                          <div className="flex items-center gap-2 text-[15px] md:text-xs font-mono text-[#1E3A5F] font-semibold">
                            <Users className="w-4 h-4 shrink-0" />
                            <span>開趴出席成員 · 4 人</span>
                          </div>
                          <span className="text-sm md:text-xs font-mono text-[#78716C]">ALL HANDS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          {TRIP_OVERVIEW.members.map((member, index) => (
                            <div
                              key={member}
                              className="px-4 py-3 bg-[#FBF9F5] border border-[#EFECE6] rounded-[28px] flex items-center justify-between gap-2"
                            >
                              <span className="font-mono text-sm md:text-xs text-[#A8A29E] tabular-nums">
                                0{index + 1}
                              </span>
                              <span className="text-[18px] md:text-sm font-semibold text-[#1C1917] truncate">
                                {member}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clean Unboxed Metadata Ledger */}
                    <dl className="pt-4 border-t border-[#E5E0D8] space-y-3.5 text-[17px] md:text-xs leading-[1.7]">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-[#78716C] shrink-0">當晚住宿</dt>
                        <dd className="text-[#1C1917] font-medium text-right">{day.stay}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-[#78716C] shrink-0">交通重點</dt>
                        <dd className="text-[#57534E] text-right leading-[1.7]">
                          {day.jrTicketAdvice}
                        </dd>
                      </div>
                    </dl>

                    {/* Dedicated 19:00 Teammate Summary Notice */}
                    {day.teammate1900Cutoff && (
                      <div
                        className={`p-5 border rounded-[28px] transition-colors ${
                          highlight1900
                            ? 'bg-[#FDF4F2] border-[#B43E2B]'
                            : 'bg-[#F7F4EE] border-[#E5E0D8]'
                        }`}
                      >
                        <p className="text-[17px] md:text-xs font-semibold text-[#B43E2B] mb-1.5">
                          19:00 隊友返程提醒
                        </p>
                        <p className="text-[17px] md:text-xs text-[#292524] leading-[1.75] tabular-nums">
                          {day.teammate1900Cutoff}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Timeline Column */}
                  <div className="lg:col-span-8 space-y-5 sm:space-y-6 min-w-0">
                    {filteredBlocks.length === 0 ? (
                      <div className="bg-white border border-[#E5E0D8] rounded-[28px] p-8 text-center">
                        <p className="text-[18px] md:text-sm text-[#57534E]">
                          Day {day.dayNumber} 沒有符合「
                          {CATEGORY_FILTERS.find((c) => c.id === categoryFilter)?.label}
                          」的時段。
                        </p>
                        <button
                          type="button"
                          onClick={() => setCategoryFilter('all')}
                          className="mt-3 min-h-[44px] px-4 text-[17px] md:text-sm font-medium text-[#1E3A5F] underline underline-offset-4 cursor-pointer"
                        >
                          顯示本日全部時段
                        </button>
                      </div>
                    ) : (
                      filteredBlocks.map((block, blockIdx) => {
                        const isDone = Boolean(completedBlocks[block.id]);
                        const primaryCat = block.categories[0] ?? 'sightseeing';
                        const catAccent = CATEGORY_COLORS[primaryCat].fill;
                        return (
                          <div
                            key={block.id}
                            id={`block-${block.id}`}
                            className={`scroll-mt-24 bg-white border rounded-[28px] transition-colors p-5 sm:p-6 md:p-7 min-w-0 ${
                              isDone ? 'border-[#D6CEBE] bg-[#FAF8F4]' : 'border-[#E5E0D8]'
                            }`}
                          >
                            {/* Top Row: Sequence Index + Time + Unboxed Metadata + Check Button */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFECE6]">
                              <div className="flex flex-wrap items-center gap-2 text-[16px] md:text-xs">
                                <span
                                  style={{ backgroundColor: isDone ? '#78716C' : catAccent }}
                                  className="inline-flex items-center justify-center w-6 h-6 rounded-lg font-mono text-[11px] font-semibold text-white tabular-nums shrink-0"
                                >
                                  0{blockIdx + 1}
                                </span>
                                <span className="inline-flex items-center gap-1.5 font-mono text-[17px] md:text-sm font-semibold text-[#1E3A5F] tabular-nums">
                                  <Clock className="w-4 h-4" />
                                  {block.timeRange}
                                </span>
                                <span aria-hidden="true" className="text-[#CBC3B6]">
                                  ·
                                </span>
                                <span className="text-[#78716C]">
                                  {block.categories.map((c) => CATEGORY_LABELS[c]).join(' / ')}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => onToggleBlock(block.id)}
                                aria-pressed={isDone}
                                className={`inline-flex items-center gap-1.5 px-4 min-h-[44px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                                  isDone
                                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                                    : 'bg-white text-[#57534E] border-[#E5E0D8] hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
                                }`}
                              >
                                <Check className="w-4 h-4 md:w-3.5 md:h-3.5" />
                                <span>{isDone ? '已完成' : '標記完成'}</span>
                              </button>
                            </div>

                            {/* Title & Editorial Narrative */}
                            <h3
                              className={`font-serif text-[1.45rem] sm:text-xl font-semibold mt-4 leading-snug ${
                                isDone ? 'text-[#78716C] line-through' : 'text-[#1C1917]'
                              }`}
                            >
                              {block.title}
                            </h3>

                            <p className="text-[18px] md:text-[15px] text-[#292524] leading-[1.85] mt-3 max-w-[68ch]">
                              {block.description}
                            </p>

                            {/* Transport Line Summary */}
                            {block.transportSummary && (
                              <div className="mt-4 pt-4 border-t border-[#F3EFE8] flex items-start gap-2.5 text-[17px] md:text-xs text-[#57534E]">
                                <TrainFront className="w-5 h-5 md:w-4 md:h-4 text-[#1E3A5F] shrink-0 mt-1 md:mt-0.5" />
                                <span className="leading-[1.75] tabular-nums">
                                  {block.transportSummary}
                                </span>
                              </div>
                            )}

                            {/* Inline 19:00 Teammate Alert */}
                            {block.teammate1900Note && (
                              <div
                                className={`mt-4 px-5 py-4 border rounded-[28px] text-[17px] md:text-xs leading-[1.75] tabular-nums ${
                                  highlight1900
                                    ? 'bg-[#FDF4F2] border-[#B43E2B] text-[#7F1D1D]'
                                    : 'bg-[#FAF7F2] border-[#E5E0D8] text-[#57534E]'
                                }`}
                              >
                                <span className="font-semibold text-[#B43E2B] mr-2">
                                  分流提醒：
                                </span>
                                {block.teammate1900Note}
                              </div>
                            )}

                            {/* Key Stops List with Google Maps Shortcut & One-Click Copy */}
                            {block.spots.length > 0 && (
                              <div className="mt-5 pt-4 border-t border-[#EFECE6]">
                                <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-3">
                                  關鍵地標（開啟 Google Maps 導航或複製名稱）
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {block.spots.map((spot) => {
                                    const copyText = spot.jpName || spot.name;
                                    const isCopied = copiedSpot === copyText;
                                    const mapsUrl =
                                      spot.mapUrl ??
                                      buildGoogleMapsSearchUrl(`${copyText} 九州 日本`);
                                    return (
                                      <div
                                        key={`${block.id}-${spot.name}`}
                                        className="px-4 py-4 border border-[#EFECE6] bg-[#FBF9F5] rounded-[28px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0"
                                      >
                                        <div className="min-w-0 flex-1">
                                          <p className="text-[18px] md:text-xs font-semibold text-[#1C1917] leading-snug sm:truncate">
                                            {spot.name}
                                          </p>
                                          <p className="text-[15px] md:text-[11px] text-[#78716C] mt-1 leading-snug sm:truncate">
                                            {spot.jpName}
                                            {spot.note ? ` · ${spot.note}` : ''}
                                          </p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                          <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`在 Google Maps 開啟 ${spot.name}`}
                                            className="inline-flex items-center justify-center gap-1.5 px-3.5 min-h-[42px] md:min-h-[36px] text-[15px] md:text-xs font-medium text-[#1E3A5F] bg-white border border-[#D6CEBE] hover:border-[#1E3A5F] rounded-2xl transition-colors whitespace-nowrap"
                                          >
                                            <MapPin className="w-4 h-4 md:w-3.5 md:h-3.5" />
                                            <span>地圖</span>
                                            <ExternalLink className="w-3.5 h-3.5 md:w-3 md:h-3 opacity-70" />
                                          </a>

                                          <button
                                            type="button"
                                            onClick={() => handleCopySpot(copyText)}
                                            aria-label={`複製 ${spot.name} 名稱`}
                                            className="inline-flex items-center justify-center gap-1 px-3 min-h-[42px] min-w-[42px] md:min-h-[36px] md:min-w-[36px] text-[15px] md:text-xs font-mono text-[#57534E] hover:text-[#1C1917] bg-white border border-[#EFECE6] hover:border-[#CBC3B6] rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
                                          >
                                            {isCopied ? (
                                              <>
                                                <Check className="w-4 h-4 md:w-3.5 md:h-3.5 text-[#1E3A5F]" />
                                                <span className="text-[#1E3A5F]">已複製</span>
                                              </>
                                            ) : (
                                              <Copy className="w-4 h-4 md:w-3.5 md:h-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Previous / Next Day Quick Navigation for Single-Day Tab */}
        {currentDayObj && (
          <div className="pt-6 border-t border-[#E5E0D8] grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between sm:gap-4 w-full min-w-0">
            {prevDayObj ? (
              <button
                type="button"
                onClick={() => onSelectDay(prevDayObj.dayNumber)}
                className="w-full sm:w-auto min-w-0 inline-flex items-center justify-center sm:justify-start gap-1.5 px-4 min-h-[52px] bg-white border border-[#E5E0D8] hover:border-[#1E3A5F] text-[17px] md:text-sm font-medium text-[#1C1917] hover:text-[#1E3A5F] rounded-[28px] active:scale-[0.98] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="truncate">
                  <span className="sm:hidden font-mono tabular-nums">
                    上一天 D{prevDayObj.dayNumber}
                  </span>
                  <span className="hidden sm:inline">
                    上一天 · Day {prevDayObj.dayNumber}
                  </span>
                  <span className="hidden md:inline">
                    （{prevDayObj.regionLabel}）
                  </span>
                </span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextDayObj ? (
              <button
                type="button"
                onClick={() => onSelectDay(nextDayObj.dayNumber)}
                className={`${
                  !prevDayObj ? 'col-span-2 sm:col-span-1' : ''
                } w-full sm:w-auto min-w-0 inline-flex items-center justify-center sm:justify-end gap-1.5 px-4 min-h-[52px] bg-[#1E3A5F] text-white text-[17px] md:text-sm font-medium rounded-[28px] hover:bg-[#162C49] active:scale-[0.98] transition-all cursor-pointer`}
              >
                <span className="truncate">
                  <span className="sm:hidden font-mono tabular-nums">
                    下一天 D{nextDayObj.dayNumber}
                  </span>
                  <span className="hidden sm:inline">
                    下一天 · Day {nextDayObj.dayNumber}
                  </span>
                  <span className="hidden md:inline">
                    （{nextDayObj.regionLabel}）
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectDay('all')}
                className="w-full sm:w-auto min-w-0 inline-flex items-center justify-center sm:justify-end gap-1.5 px-4 min-h-[52px] bg-white border border-[#E5E0D8] hover:border-[#1E3A5F] text-[17px] md:text-sm font-medium text-[#1C1917] hover:text-[#1E3A5F] rounded-[28px] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="truncate">完整總表</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
