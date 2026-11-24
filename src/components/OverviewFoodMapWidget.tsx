import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Utensils,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { FoodSpot, KYUSHU_FOOD_SPOTS } from '../data/foodMapData';

interface OverviewFoodMapWidgetProps {
  jpyToTwdRate: number;
  onJumpToDay: (dayNumber: number) => void;
}

const DAY_FILTER_OPTIONS: Array<{ value: number | 'all'; label: string }> = [
  { value: 'all', label: '全部推薦' },
  { value: 1, label: 'Day 1 博多' },
  { value: 2, label: 'Day 2 門司港・小倉' },
  { value: 3, label: 'Day 3 由布院・博多' },
  { value: 4, label: 'Day 4 熊本' },
  { value: 5, label: 'Day 5 小倉' },
  { value: 6, label: 'Day 6 博多站' },
];

function buildGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function formatYenRange(min: number, max: number): string {
  return `¥${min.toLocaleString('en-US')}–¥${max.toLocaleString('en-US')}`;
}

function formatTwdRange(min: number, max: number, rate: number): string {
  const twdMin = Math.round((min * rate) / 10) * 10;
  const twdMax = Math.round((max * rate) / 10) * 10;
  return `約 NT$${twdMin.toLocaleString('en-US')}–$${twdMax.toLocaleString('en-US')}`;
}

export function OverviewFoodMapWidget({
  jpyToTwdRate,
  onJumpToDay,
}: OverviewFoodMapWidgetProps) {
  const [dayFilter, setDayFilter] = useState<number | 'all'>('all');
  const [selectedSpotId, setSelectedSpotId] = useState<string>(KYUSHU_FOOD_SPOTS[0].id);
  const [copiedJpName, setCopiedJpName] = useState(false);

  const visibleSpots =
    dayFilter === 'all'
      ? KYUSHU_FOOD_SPOTS
      : KYUSHU_FOOD_SPOTS.filter((spot) => spot.dayNumber === dayFilter);

  const activeSpot: FoodSpot =
    visibleSpots.find((spot) => spot.id === selectedSpotId) ??
    visibleSpots[0] ??
    KYUSHU_FOOD_SPOTS[0];

  const handleSelectDayFilter = (nextDay: number | 'all') => {
    setDayFilter(nextDay);
    if (nextDay !== 'all') {
      const firstMatch = KYUSHU_FOOD_SPOTS.find((spot) => spot.dayNumber === nextDay);
      if (firstMatch) {
        setSelectedSpotId(firstMatch.id);
      }
    }
  };

  const handleSelectSpot = (spot: FoodSpot) => {
    setSelectedSpotId(spot.id);
    if (dayFilter !== 'all' && spot.dayNumber !== dayFilter) {
      setDayFilter('all');
    }
  };

  const handleCopyJpName = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedJpName(true);
    window.setTimeout(() => setCopiedJpName(false), 1800);
  };

  // Clamp floating SVG callout position cleanly within the 560 x 430 viewBox
  const calloutW = 188;
  const calloutH = 44;
  const calloutCenterX = Math.min(560 - calloutW / 2 - 14, Math.max(calloutW / 2 + 14, activeSpot.x));
  const placeCalloutBelow = activeSpot.y < 105;
  const calloutTopY = placeCalloutBelow ? activeSpot.y + 20 : activeSpot.y - calloutH - 20;

  return (
    <section
      id="food-map"
      aria-labelledby="food-map-heading"
      className="mt-7 bg-white border border-[#E5E0D8] rounded-[28px] overflow-hidden"
    >
      {/* Header Bar */}
      <div className="px-5 sm:px-6 md:px-8 py-5 sm:py-6 border-b border-[#EFECE6] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm md:text-xs font-mono tracking-wider text-[#B43E2B] mb-1.5">
            <Utensils className="w-4 h-4 shrink-0" />
            <span>KYUSHU GOURMET MAP · 每日行程周邊美食指南</span>
          </div>
          <h2
            id="food-map-heading"
            className="font-serif text-2xl sm:text-[1.75rem] font-semibold text-[#1C1917] leading-snug headline-balance"
          >
            北九州互動式在地美食推薦地圖
          </h2>
          <p className="mt-1.5 text-[17px] md:text-sm text-[#57534E] leading-[1.75]">
            點擊地圖上的餐廳標記或依天數篩選，立即查看每日行程周邊必吃名店的特色簡介、必點招牌與人均預算。
          </p>
        </div>

        <div className="text-sm md:text-xs font-mono text-[#78716C] shrink-0 tabular-nums">
          收錄 {KYUSHU_FOOD_SPOTS.length} 間行程順路名店 · 涵蓋 Day 1 – Day 6
        </div>
      </div>

      {/* Day Filter Segmented Bar */}
      <div className="px-5 sm:px-6 md:px-8 py-3.5 bg-[#FBF9F5] border-b border-[#EFECE6]">
        <div
          role="tablist"
          aria-label="依行程天數篩選推薦餐廳"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5"
        >
          {DAY_FILTER_OPTIONS.map((opt) => {
            const isActive = dayFilter === opt.value;
            const count =
              opt.value === 'all'
                ? KYUSHU_FOOD_SPOTS.length
                : KYUSHU_FOOD_SPOTS.filter((s) => s.dayNumber === opt.value).length;
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectDayFilter(opt.value)}
                className={`inline-flex items-center gap-1.5 px-4 min-h-[44px] md:min-h-[38px] text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                  isActive
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-[#57534E] border-[#E5E0D8] hover:border-[#1E3A5F] hover:text-[#1C1917]'
                }`}
              >
                <span>{opt.label}</span>
                <span className={isActive ? 'text-white/75 font-mono' : 'text-[#A8A29E] font-mono'}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Workspace: Interactive SVG Map (Left) + Restaurant Detail Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EFECE6]">
        {/* Left: Interactive Northern Kyushu Gourmet Map */}
        <div className="lg:col-span-7 p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm md:text-xs text-[#78716C] pb-3.5 border-b border-[#EFECE6]">
              <span className="font-mono tracking-wider">INTERACTIVE CULINARY SCHEMATIC</span>
              <div className="flex items-center gap-3.5 text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B43E2B] inline-block" aria-hidden="true" />
                  燒肉・鍋物
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4692B] inline-block" aria-hidden="true" />
                  拉麵・豬排・咖哩
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F] inline-block" aria-hidden="true" />
                  市場・釜飯
                </span>
              </div>
            </div>

            {/* Interactive SVG Map */}
            <div className="relative my-3 w-full">
              <svg
                viewBox="0 0 560 430"
                className="w-full h-auto select-none"
                role="img"
                aria-label="北九州互動式美食推薦地圖：點擊餐廳標記查看簡介"
              >
                <defs>
                  <pattern
                    id="food-map-grid"
                    width="36"
                    height="36"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 36 0 L 0 0 0 36"
                      fill="none"
                      stroke="#F0ECE4"
                      strokeWidth="0.75"
                    />
                  </pattern>
                  <filter id="food-callout-shadow" x="-15%" y="-20%" width="130%" height="150%">
                    <feDropShadow
                      dx="0"
                      dy="3"
                      stdDeviation="4"
                      floodColor="#1C1917"
                      floodOpacity="0.12"
                    />
                  </filter>
                </defs>

                <rect width="560" height="430" fill="url(#food-map-grid)" rx="16" />

                {/* Northern Kyushu Landmass Silhouette */}
                <path
                  d="M 104 188 C 142 150, 210 132, 272 114 C 324 98, 372 50, 424 62 C 466 72, 478 136, 470 188 C 464 234, 482 286, 446 332 C 402 386, 322 410, 238 406 C 180 404, 136 362, 120 316 C 100 262, 78 216, 104 188 Z"
                  fill="#F7F4EE"
                  stroke="#DDD5C8"
                  strokeWidth="1.25"
                />

                {/* Subtle Geography & Sea Labels */}
                <text
                  x="68"
                  y="68"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.22em"
                  fontFamily="Noto Serif TC, serif"
                >
                  玄界灘
                </text>
                <text
                  x="456"
                  y="54"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.2em"
                  fontFamily="Noto Serif TC, serif"
                >
                  關門海峽
                </text>
                <text
                  x="92"
                  y="374"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.22em"
                  fontFamily="Noto Serif TC, serif"
                >
                  有明海
                </text>

                {/* Faint Rail Reference Lines Connecting Major Hubs */}
                <g opacity="0.32" stroke="#9C9589" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
                  <path d="M 222 198 Q 304 142 406 96" />
                  <path d="M 222 198 Q 332 224 440 256" />
                  <path d="M 222 198 Q 228 282 248 358" />
                </g>

                {/* Restaurant Interactive Markers */}
                {KYUSHU_FOOD_SPOTS.map((spot) => {
                  const isSelected = spot.id === activeSpot.id;
                  const isFilteredIn = dayFilter === 'all' || spot.dayNumber === dayFilter;

                  // Position short label cleanly based on non-overlapping placement
                  let labelX = spot.x;
                  let labelY = spot.y - 16;
                  let textAnchor: 'start' | 'middle' | 'end' = 'middle';

                  if (spot.labelPlacement === 'bottom') {
                    labelY = spot.y + 24;
                  } else if (spot.labelPlacement === 'left') {
                    labelX = spot.x - 16;
                    labelY = spot.y + 4;
                    textAnchor = 'end';
                  } else if (spot.labelPlacement === 'right') {
                    labelX = spot.x + 16;
                    labelY = spot.y + 4;
                    textAnchor = 'start';
                  }

                  return (
                    <g
                      key={spot.id}
                      onClick={() => handleSelectSpot(spot)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectSpot(spot);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Day ${spot.dayNumber} ${spot.name}（${spot.regionLabel}）`}
                      aria-pressed={isSelected}
                      className="cursor-pointer focus:outline-none"
                      opacity={isFilteredIn || isSelected ? 1 : 0.25}
                    >
                      {/* Generous Invisible Touch Hitbox (r=24) */}
                      <circle cx={spot.x} cy={spot.y} r="24" fill="transparent" />

                      {/* Active Outer Halo */}
                      {isSelected && (
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r="17"
                          fill={spot.accentColor}
                          fillOpacity="0.16"
                          stroke={spot.accentColor}
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      )}

                      {/* Marker Circle */}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={isSelected ? 11.5 : 9.5}
                        fill={isSelected ? spot.accentColor : '#FFFFFF'}
                        stroke={spot.accentColor}
                        strokeWidth={isSelected ? 2.5 : 2.2}
                      />

                      {/* Day Number Inside Pin */}
                      <text
                        x={spot.x}
                        y={spot.y + 3.5}
                        textAnchor="middle"
                        fontSize={isSelected ? '9.5' : '8.5'}
                        fontWeight="700"
                        fill={isSelected ? '#FFFFFF' : spot.accentColor}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        D{spot.dayNumber}
                      </text>

                      {/* Static Compact Label (hidden on selected node to keep floating callout crisp) */}
                      {!isSelected && (
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor={textAnchor}
                          fontSize="10.5"
                          fontWeight="600"
                          fill="#292524"
                          stroke="#FBF9F5"
                          strokeWidth="3"
                          paintOrder="stroke"
                        >
                          {spot.shortMapLabel}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Floating Active Callout Card Directly Above / Below Selected Pin */}
                <g
                  filter="url(#food-callout-shadow)"
                  className="pointer-events-none"
                >
                  <line
                    x1={activeSpot.x}
                    y1={placeCalloutBelow ? activeSpot.y + 13 : activeSpot.y - 13}
                    x2={activeSpot.x}
                    y2={placeCalloutBelow ? calloutTopY : calloutTopY + calloutH}
                    stroke={activeSpot.accentColor}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <rect
                    x={calloutCenterX - calloutW / 2}
                    y={calloutTopY}
                    width={calloutW}
                    height={calloutH}
                    rx="12"
                    fill="#FFFFFF"
                    stroke={activeSpot.accentColor}
                    strokeWidth="1.5"
                  />
                  <text
                    x={calloutCenterX}
                    y={calloutTopY + 18}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight="700"
                    fill="#1C1917"
                  >
                    {activeSpot.shortMapLabel}
                  </text>
                  <text
                    x={calloutCenterX}
                    y={calloutTopY + 34}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="600"
                    fill={activeSpot.accentColor}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    Day {activeSpot.dayNumber} · {activeSpot.regionLabel}
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Mobile-Friendly Quick Spot Selector Strip */}
          <div className="pt-3.5 border-t border-[#EFECE6]">
            <p className="text-sm md:text-xs font-mono text-[#78716C] mb-2.5">
              快速切換餐廳標記（共 {visibleSpots.length} 間）：
            </p>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {visibleSpots.map((spot) => {
                const isSelected = spot.id === activeSpot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleSelectSpot(spot)}
                    aria-pressed={isSelected}
                    className={`inline-flex items-center gap-2 px-3.5 min-h-[42px] md:min-h-[34px] text-[15px] md:text-xs font-medium rounded-2xl border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-[#FBF9F5] text-[#44403C] border-[#E5E0D8] hover:border-[#1E3A5F]'
                    }`}
                  >
                    <span
                      className="font-mono text-xs font-semibold tabular-nums"
                      style={{ color: isSelected ? '#FDE68A' : spot.accentColor }}
                    >
                      D{spot.dayNumber}
                    </span>
                    <span>{spot.shortMapLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Restaurant Featured Dossier Card */}
        <div
          aria-live="polite"
          className="lg:col-span-5 p-5 sm:p-6 md:p-8 bg-[#FBF9F5] flex flex-col justify-between gap-6"
        >
          <div>
            {/* Quiet Unboxed Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
              <span
                className="font-semibold"
                style={{ color: activeSpot.accentColor }}
              >
                DAY 0{activeSpot.dayNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeSpot.regionLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeSpot.cuisine}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-[1.6rem] font-semibold text-[#1C1917] mt-2 leading-snug">
              {activeSpot.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[15px] md:text-xs text-[#57534E]">
                {activeSpot.jpName}
              </span>
              <button
                type="button"
                onClick={() => handleCopyJpName(activeSpot.jpName)}
                className="inline-flex items-center gap-1 text-sm md:text-xs font-medium text-[#1E3A5F] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer"
              >
                {copiedJpName ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>已複製店名</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製日文店名</span>
                  </>
                )}
              </button>
            </div>

            {/* Restaurant Specialty Introduction */}
            <p className="mt-4 text-[18px] md:text-[15px] text-[#292524] leading-[1.85]">
              {activeSpot.description}
            </p>

            {/* Signature Dishes */}
            <div className="mt-5 pt-4 border-t border-[#E5E0D8]">
              <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-2.5">
                MUST-ORDER · 推薦必點招牌
              </p>
              <ul className="space-y-1.5 text-[17px] md:text-sm text-[#1C1917]">
                {activeSpot.signatureDishes.map((dish, idx) => (
                  <li key={dish} className="flex items-baseline gap-2.5 leading-relaxed">
                    <span className="font-mono text-xs text-[#A8A29E] tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clean Unboxed Practical Metadata Ledger */}
            <dl className="mt-5 pt-4 border-t border-[#E5E0D8] space-y-3 text-[17px] md:text-xs leading-[1.7] tabular-nums">
              <div className="flex items-start justify-between gap-4">
                <dt className="inline-flex items-center gap-1.5 text-[#78716C] shrink-0">
                  <MapPin className="w-4 h-4 md:w-3.5 md:h-3.5" />
                  <span>順路行程</span>
                </dt>
                <dd className="text-[#1C1917] font-medium text-right">
                  {activeSpot.nearestStop}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4">
                <dt className="inline-flex items-center gap-1.5 text-[#78716C] shrink-0">
                  <Wallet className="w-4 h-4 md:w-3.5 md:h-3.5" />
                  <span>預估人均</span>
                </dt>
                <dd className="text-right">
                  <span className="font-mono font-semibold text-[#1C1917]">
                    {formatYenRange(activeSpot.budgetYenMin, activeSpot.budgetYenMax)}
                  </span>
                  <span className="block text-sm md:text-[11px] font-mono text-[#78716C]">
                    {formatTwdRange(activeSpot.budgetYenMin, activeSpot.budgetYenMax, jpyToTwdRate)}
                  </span>
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4">
                <dt className="inline-flex items-center gap-1.5 text-[#78716C] shrink-0">
                  <Clock className="w-4 h-4 md:w-3.5 md:h-3.5" />
                  <span>營業時間</span>
                </dt>
                <dd className="text-[#57534E] text-right">{activeSpot.hours}</dd>
              </div>
            </dl>

            {/* Local Insider Tip */}
            <div className="mt-4 px-4 py-3.5 bg-white border border-[#E5E0D8] rounded-[22px] text-[16px] md:text-xs text-[#44403C] leading-[1.75]">
              <span className="font-semibold text-[#1E3A5F] mr-1.5">用餐建議：</span>
              {activeSpot.tip}
            </div>
          </div>

          {/* Action Footer: Google Maps Navigation + Jump to Day Itinerary */}
          <div className="pt-4 border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={buildGoogleMapsUrl(activeSpot.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 min-h-[48px] bg-[#1E3A5F] text-white text-[16px] md:text-xs font-medium rounded-2xl hover:bg-[#162C49] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Google Maps 導航</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75 shrink-0" />
            </a>

            <button
              type="button"
              onClick={() => onJumpToDay(activeSpot.dayNumber)}
              className="inline-flex items-center justify-center gap-2 px-4 min-h-[48px] bg-white text-[#1C1917] border border-[#D6CEBE] hover:border-[#1E3A5F] hover:text-[#1E3A5F] text-[16px] md:text-xs font-medium rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              <span>查看 Day {activeSpot.dayNumber} 行程</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
