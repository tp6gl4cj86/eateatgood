import { ArrowRight, TrainFront } from 'lucide-react';
import { RAIL_DESTINATIONS, RailDestination } from '../data/itineraryData';

interface KyushuRailMapProps {
  selectedRegion: RailDestination['id'];
  onSelectRegion: (id: RailDestination['id']) => void;
  onJumpToDay: (dayNumber: number) => void;
}

const ROUTES: Array<{
  id: RailDestination['id'];
  d: string;
  label: string;
  labelX: number;
  labelY: number;
  strokeDash?: string;
}> = [
  {
    id: 'kitakyushu',
    d: 'M 248 182 Q 305 128 378 92',
    label: '特急 Sonic · 45–50分',
    labelX: 300,
    labelY: 118,
  },
  {
    id: 'yufuin',
    d: 'M 248 182 Q 332 214 416 242',
    label: '由布院之森 · 全車指定席',
    labelX: 344,
    labelY: 200,
  },
  {
    id: 'kumamoto',
    d: 'M 248 182 Q 245 268 242 356',
    label: '九州新幹線 · 35–40分',
    labelX: 184,
    labelY: 296,
  },
];

export function KyushuRailMap({
  selectedRegion,
  onSelectRegion,
  onJumpToDay,
}: KyushuRailMapProps) {
  const activeDest =
    RAIL_DESTINATIONS.find((dest) => dest.id === selectedRegion) ?? RAIL_DESTINATIONS[0];

  return (
    <section
      id="rail-map"
      aria-labelledby="rail-map-heading"
      className="py-12 md:py-16"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-[0.14em] text-[#57534E] mb-3">
              01. 鐵道輻射動線 · JR 北九州 5 日券
            </p>
            <h2
              id="rail-map-heading"
              className="font-serif text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight headline-balance"
            >
              以博多為圓心的北九州五日放射網
            </h2>
          </div>
          <p className="text-sm text-[#57534E] max-w-md leading-relaxed">
            全期五晚連住博多站筑紫口步行 8 分鐘的 Minn 博多，免換飯店搬行李。點選地圖各站點，檢視車程、劃位建議並快速跳轉該日行程。
          </p>
        </div>

        {/* Interactive Station Selector Bar */}
        <div
          role="tablist"
          aria-label="九州鐵道站點選擇"
          className="flex items-center gap-1 p-1 bg-[#F3EFE8] rounded-md mb-8 overflow-x-auto"
        >
          {RAIL_DESTINATIONS.map((dest) => {
            const isSelected = dest.id === activeDest.id;
            return (
              <button
                key={dest.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectRegion(dest.id)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {dest.name}
                <span className="ml-2 font-mono text-xs text-[#78716C] tabular-nums">
                  Day {dest.days.join('/')}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Bespoke Architectural Northern Kyushu Rail Schematic */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D8] p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#78716C] pb-4 border-b border-[#EFECE6]">
              <span className="font-mono tracking-wider">NORTHERN KYUSHU RAIL SCHEMATIC</span>
              <span className="tabular-nums">基準樞紐：JR 博多駅</span>
            </div>

            <div className="relative my-4 w-full">
              <svg
                viewBox="0 0 540 420"
                className="w-full h-auto select-none"
                role="img"
                aria-label="北九州鐵道路線互動示意圖：從博多出發至小倉門司港、由布院與熊本"
              >
                {/* Subtle Paper Grid Lines */}
                <defs>
                  <pattern
                    id="editorial-grid"
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
                </defs>
                <rect width="540" height="420" fill="url(#editorial-grid)" />

                {/* Abstract Northern Kyushu Landmass Silhouette */}
                <path
                  d="M 102 184 C 138 148, 206 130, 266 112 C 316 96, 362 52, 412 64 C 452 74, 464 134, 456 184 C 450 228, 468 278, 434 322 C 392 374, 314 398, 232 394 C 176 392, 134 352, 118 308 C 98 256, 76 212, 102 184 Z"
                  fill="#F7F4EE"
                  stroke="#DDD5C8"
                  strokeWidth="1.25"
                />

                {/* Sea Labels */}
                <text
                  x="136"
                  y="92"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.22em"
                  fontFamily="Noto Serif TC, serif"
                >
                  玄界灘
                </text>
                <text
                  x="432"
                  y="62"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.2em"
                  fontFamily="Noto Serif TC, serif"
                >
                  關門海峽
                </text>
                <text
                  x="114"
                  y="366"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.22em"
                  fontFamily="Noto Serif TC, serif"
                >
                  有明海
                </text>

                {/* Compass Mark */}
                <g transform="translate(490, 364)" opacity="0.55">
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#78716C" strokeWidth="1" />
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#78716C" strokeWidth="1" />
                  <text
                    x="0"
                    y="-22"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#57534E"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    N
                  </text>
                </g>

                {/* Railway Lines from Hakata */}
                {ROUTES.map((route) => {
                  const isActive =
                    activeDest.id === route.id || activeDest.id === 'hakata';
                  const isFocused = activeDest.id === route.id;
                  return (
                    <g
                      key={route.id}
                      onClick={() => onSelectRegion(route.id)}
                      className="cursor-pointer"
                    >
                      <path
                        d={route.d}
                        fill="none"
                        stroke={isFocused ? '#1E3A5F' : isActive ? '#64748B' : '#CBC3B6'}
                        strokeWidth={isFocused ? 3 : 1.75}
                        strokeDasharray={route.id === 'yufuin' ? '6 4' : undefined}
                        className="transition-all duration-200"
                      />
                      <text
                        x={route.labelX}
                        y={route.labelY}
                        textAnchor="middle"
                        fontSize="10"
                        fill={isFocused ? '#1E3A5F' : '#78716C'}
                        fontWeight={isFocused ? 600 : 400}
                        fontFamily="Noto Sans TC, sans-serif"
                      >
                        {route.label}
                      </text>
                    </g>
                  );
                })}

                {/* Interactive Station Nodes */}
                {RAIL_DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === activeDest.id;
                  const isHub = dest.id === 'hakata';
                  const labelOffsetY = dest.id === 'kitakyushu' ? -18 : dest.id === 'kumamoto' ? 28 : 26;
                  return (
                    <g
                      key={dest.id}
                      transform={`translate(${dest.x}, ${dest.y})`}
                      onClick={() => onSelectRegion(dest.id)}
                      className="cursor-pointer group"
                      role="button"
                      tabIndex={0}
                      aria-label={`查看 ${dest.name} 路線資訊`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectRegion(dest.id);
                        }
                      }}
                    >
                      {/* Outer Selection Ring */}
                      {isSelected && (
                        <circle
                          r={isHub ? 17 : 14}
                          fill="none"
                          stroke="#1E3A5F"
                          strokeWidth="1.25"
                          strokeDasharray="3 3"
                        />
                      )}
                      {/* Main Station Node */}
                      <circle
                        r={isHub ? 10 : 7.5}
                        fill={isSelected ? '#1E3A5F' : isHub ? '#1C1917' : '#FFFFFF'}
                        stroke={isSelected ? '#1E3A5F' : '#1C1917'}
                        strokeWidth={isHub ? 2.5 : 2}
                        className="transition-colors duration-150"
                      />
                      {isHub && (
                        <circle r={3} fill="#FFFFFF" />
                      )}

                      {/* Station Name */}
                      <text
                        x={dest.id === 'hakata' ? -16 : 0}
                        y={dest.id === 'hakata' ? -16 : labelOffsetY}
                        textAnchor={dest.id === 'hakata' ? 'end' : 'middle'}
                        fontSize={isHub ? '13' : '12'}
                        fontWeight="600"
                        fill={isSelected ? '#1E3A5F' : '#1C1917'}
                        fontFamily="Noto Serif TC, serif"
                      >
                        {dest.name}
                      </text>
                      <text
                        x={dest.id === 'hakata' ? -16 : 0}
                        y={dest.id === 'hakata' ? -2 : labelOffsetY + 14}
                        textAnchor={dest.id === 'hakata' ? 'end' : 'middle'}
                        fontSize="9.5"
                        fill="#78716C"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        Day {dest.days.join(' · ')}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EFECE6] text-xs text-[#78716C]">
              <span>實線：JR 特急 / 九州新幹線</span>
              <span>虛線：全車指定席觀光特急（由布院之森）</span>
            </div>
          </div>

          {/* Right: Editorial Station Dossier */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#78716C] pb-4 border-b border-[#EFECE6]">
                <span className="font-mono tabular-nums">
                  DAY {activeDest.days.join(' / ')}
                </span>
                <span>{activeDest.jpName}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1C1917] mt-6">
                {activeDest.name}
              </h3>
              <p className="text-sm text-[#57534E] mt-2 leading-relaxed">
                {activeDest.subtitle}
              </p>

              <dl className="mt-6 divide-y divide-[#EFECE6] border-t border-b border-[#EFECE6] text-sm">
                <div className="py-3.5 flex items-start justify-between gap-4">
                  <dt className="text-[#78716C] shrink-0">搭乘列車</dt>
                  <dd className="text-[#1C1917] font-medium text-right">
                    {activeDest.trainName}
                  </dd>
                </div>
                <div className="py-3.5 flex items-start justify-between gap-4">
                  <dt className="text-[#78716C] shrink-0">單程車程</dt>
                  <dd className="text-[#1C1917] font-mono tabular-nums text-right">
                    {activeDest.duration}
                  </dd>
                </div>
                <div className="py-3.5 flex items-start justify-between gap-4">
                  <dt className="text-[#78716C] shrink-0">座席策略</dt>
                  <dd
                    className={`text-right leading-relaxed ${
                      activeDest.id === 'yufuin'
                        ? 'text-[#B43E2B] font-medium'
                        : 'text-[#1C1917]'
                    }`}
                  >
                    {activeDest.seatRecommendation}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="text-xs font-mono tracking-wider text-[#78716C] mb-3">
                  主要停靠與造訪點（點擊開啟 Google Maps）
                </p>
                <ul className="space-y-2 text-sm text-[#292524]">
                  {activeDest.keyStops.map((stop) => (
                    <li key={stop} className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2.5 min-w-0">
                        <span className="text-[#A8A29E] select-none">—</span>
                        <span className="truncate">{stop}</span>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stop} ${activeDest.jpName}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#1E3A5F] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                      >
                        Google Maps ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFECE6] flex flex-wrap items-center gap-3">
              {activeDest.days.map((dayNum) => (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => onJumpToDay(dayNum)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-medium rounded-sm hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <TrainFront className="w-4 h-4" />
                  <span>前往 Day {dayNum} 詳細動線</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ))}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activeDest.jpName} 日本`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#D6CEBE] hover:border-[#1E3A5F] text-sm font-medium text-[#1C1917] hover:text-[#1E3A5F] rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>在 Google Maps 查看區域 ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
