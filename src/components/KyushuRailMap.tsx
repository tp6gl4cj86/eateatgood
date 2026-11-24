import { ArrowRight, Clock, Navigation, TrainFront } from 'lucide-react';
import { RAIL_DESTINATIONS, RailDestination } from '../data/itineraryData';

interface KyushuRailMapProps {
  selectedRegion: RailDestination['id'];
  onSelectRegion: (id: RailDestination['id']) => void;
  onJumpToDay: (dayNumber: number) => void;
}

interface RouteConnectionConfig {
  id: RailDestination['id'];
  originLabel: string;
  destinationLabel: string;
  d: string;
  shortTrainLabel: string;
  expressTrainName: string;
  approxDuration: string;
  seatTag: string;
  accentColor: string;
  isDashed?: boolean;
  labelX: number;
  labelY: number;
  /** Midpoint along the quadratic curve for anchoring the floating callout */
  anchorX: number;
  anchorY: number;
  /** Floating callout box center & width directly above the highlighted route */
  calloutX: number;
  calloutY: number;
  calloutWidth: number;
}

const FUKUOKA_AIRPORT_NODE = { x: 126, y: 214 };

const ROUTES: RouteConnectionConfig[] = [
  {
    id: 'kitakyushu',
    originLabel: '博多',
    destinationLabel: '小倉・門司港',
    d: 'M 248 182 Q 305 128 378 92',
    shortTrainLabel: '特急 Sonic · 45–50分',
    expressTrainName: 'JR 特急 Sonic（音速號）',
    approxDuration: '約 45–50 分鐘',
    seatTag: '自由席即可',
    accentColor: '#1E3A5F',
    labelX: 300,
    labelY: 118,
    anchorX: 309,
    anchorY: 132,
    calloutX: 246,
    calloutY: 66,
    calloutWidth: 224,
  },
  {
    id: 'yufuin',
    originLabel: '博多',
    destinationLabel: '由布院',
    d: 'M 248 182 Q 332 214 416 242',
    shortTrainLabel: '由布院之森 · 約 2 小時 15 分',
    expressTrainName: '觀光特急「由布院之森」',
    approxDuration: '約 2 小時 15 分',
    seatTag: '全車指定席',
    accentColor: '#B43E2B',
    isDashed: true,
    labelX: 344,
    labelY: 200,
    anchorX: 332,
    anchorY: 213,
    calloutX: 382,
    calloutY: 150,
    calloutWidth: 228,
  },
  {
    id: 'kumamoto',
    originLabel: '博多',
    destinationLabel: '熊本',
    d: 'M 248 182 Q 230 270 242 356',
    shortTrainLabel: '九州新幹線 · 35–40分',
    expressTrainName: '九州新幹線 Sakura / Tsubame',
    approxDuration: '約 35–40 分鐘',
    seatTag: '建議預劃指定席',
    accentColor: '#1E3A5F',
    labelX: 168,
    labelY: 296,
    anchorX: 237,
    anchorY: 270,
    calloutX: 250,
    calloutY: 278,
    calloutWidth: 236,
  },
];

const HAKATA_AIRPORT_ROUTE: RouteConnectionConfig = {
  id: 'hakata',
  originLabel: '福岡空港',
  destinationLabel: '博多・Minn 飯店',
  d: `M ${FUKUOKA_AIRPORT_NODE.x} ${FUKUOKA_AIRPORT_NODE.y} Q 184 192 248 182`,
  shortTrainLabel: '計程車 / 巴士 · 10–15分',
  expressTrainName: '機場計程車 / 直達巴士',
  approxDuration: '約 10–15 分鐘',
  seatTag: '博多出發樞紐',
  accentColor: '#1E3A5F',
  labelX: 180,
  labelY: 208,
  anchorX: 186,
  anchorY: 195,
  calloutX: 162,
  calloutY: 114,
  calloutWidth: 216,
};

export function KyushuRailMap({
  selectedRegion,
  onSelectRegion,
  onJumpToDay,
}: KyushuRailMapProps) {
  const activeDest =
    RAIL_DESTINATIONS.find((dest) => dest.id === selectedRegion) ?? RAIL_DESTINATIONS[0];

  const activeConnection: RouteConnectionConfig =
    ROUTES.find((route) => route.id === activeDest.id) ?? HAKATA_AIRPORT_ROUTE;

  const isRadialDestinationSelected = activeDest.id !== 'hakata';

  return (
    <section
      id="rail-map"
      aria-labelledby="rail-map-heading"
      className="py-7 md:py-14"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm md:text-xs font-mono tracking-[0.12em] text-[#57534E] mb-2.5">
              01. 鐵道輻射動線 · JR 北九州 5 日券
            </p>
            <h2
              id="rail-map-heading"
              className="font-serif text-[1.75rem] sm:text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight headline-balance"
            >
              以博多為圓心的北九州五日放射網
            </h2>
          </div>
          <p className="text-[18px] md:text-sm text-[#57534E] max-w-md leading-[1.8]">
            點選地圖任一車站或上方站點列，即可高亮顯示從博多出發的建議乘車路徑、特急列車名稱與大約行駛時間。
          </p>
        </div>

        {/* Interactive Station Selector Bar */}
        <div
          role="tablist"
          aria-label="九州鐵道站點選擇"
          className="flex items-center gap-1.5 p-1.5 bg-[#F3EFE8] rounded-[28px] mb-7 overflow-x-auto no-scrollbar"
        >
          {RAIL_DESTINATIONS.map((dest) => {
            const isSelected = dest.id === activeDest.id;
            return (
              <button
                key={dest.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectRegion(dest.id)}
                className={`px-4 min-h-[46px] text-[17px] md:text-sm font-medium rounded-[22px] transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {dest.name}
                <span className="ml-2 font-mono text-sm md:text-xs text-[#78716C] tabular-nums">
                  Day {dest.days.join('/')}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Bespoke Architectural Northern Kyushu Rail Schematic */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm md:text-xs text-[#78716C] pb-4 border-b border-[#EFECE6]">
              <span className="font-mono tracking-wider">NORTHERN KYUSHU RAIL SCHEMATIC</span>
              <span className="tabular-nums">基準樞紐：JR 博多駅</span>
            </div>

            {/* Active Highlighted Connection Readout Strip (Mobile-Friendly 17px/18px) */}
            <div
              aria-live="polite"
              className={`mt-4 px-4 sm:px-5 py-3.5 rounded-[22px] border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors ${
                activeConnection.id === 'yufuin'
                  ? 'bg-[#FDF4F2] border-[#E5B8B0]'
                  : 'bg-[#F7F4EE] border-[#D6CEBE]'
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm md:text-xs font-mono text-[#78716C]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#1C1917]">
                    <Navigation
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: activeConnection.accentColor }}
                    />
                    {activeConnection.originLabel} ➔ {activeConnection.destinationLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeConnection.seatTag}</span>
                </div>
                <p
                  className="text-[18px] md:text-sm font-semibold mt-1 leading-snug"
                  style={{ color: activeConnection.accentColor }}
                >
                  {activeConnection.expressTrainName}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 tabular-nums">
                <span className="inline-flex items-center gap-1.5 font-mono text-[17px] md:text-sm font-semibold text-[#1C1917] whitespace-nowrap">
                  <Clock className="w-4 h-4 text-[#57534E]" />
                  {activeConnection.approxDuration}
                </span>
                {isRadialDestinationSelected && (
                  <button
                    type="button"
                    onClick={() => onSelectRegion('hakata')}
                    className="text-[15px] md:text-xs font-medium text-[#57534E] hover:text-[#1C1917] underline underline-offset-4 whitespace-nowrap cursor-pointer"
                  >
                    返回博多總覽
                  </button>
                )}
              </div>
            </div>

            <div className="relative my-4 w-full">
              <svg
                viewBox="0 0 540 420"
                className="w-full h-auto select-none"
                role="img"
                aria-label="北九州鐵道路線互動示意圖：點擊車站高亮顯示從博多出發的建議乘車路徑、特急列車名稱與行駛時間"
              >
                <defs>
                  {/* Subtle Paper Grid Lines */}
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

                  {/* Soft Callout Shadow */}
                  <filter id="callout-shadow" x="-15%" y="-20%" width="130%" height="150%">
                    <feDropShadow
                      dx="0"
                      dy="3"
                      stdDeviation="4"
                      floodColor="#1C1917"
                      floodOpacity="0.1"
                    />
                  </filter>

                  {/* Directional Arrowheads positioned cleanly outside destination node ring */}
                  <marker
                    id="arrow-indigo"
                    viewBox="0 0 10 10"
                    refX="14.5"
                    refY="5"
                    markerWidth="5.5"
                    markerHeight="5.5"
                    orient="auto"
                  >
                    <path d="M 0 1.2 L 8.5 5 L 0 8.8 z" fill="#1E3A5F" />
                  </marker>
                  <marker
                    id="arrow-vermilion"
                    viewBox="0 0 10 10"
                    refX="14.5"
                    refY="5"
                    markerWidth="5.5"
                    markerHeight="5.5"
                    orient="auto"
                  >
                    <path d="M 0 1.2 L 8.5 5 L 0 8.8 z" fill="#B43E2B" />
                  </marker>
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
                  x="72"
                  y="68"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.22em"
                  fontFamily="Noto Serif TC, serif"
                >
                  玄界灘
                </text>
                <text
                  x="442"
                  y="54"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.2em"
                  fontFamily="Noto Serif TC, serif"
                >
                  關門海峽
                </text>
                <text
                  x="104"
                  y="368"
                  fill="#A8A29E"
                  fontSize="10"
                  letterSpacing="0.22em"
                  fontFamily="Noto Serif TC, serif"
                >
                  有明海
                </text>

                {/* Compass Mark */}
                <g transform="translate(496, 368)" opacity="0.55">
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

                {/* Airport -> Hakata Connector (Highlighted when Hakata is selected) */}
                <g
                  onClick={() => onSelectRegion('hakata')}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="顯示福岡機場至博多交通動線"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectRegion('hakata');
                    }
                  }}
                >
                  <path
                    d={HAKATA_AIRPORT_ROUTE.d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="22"
                  />
                  {!isRadialDestinationSelected && (
                    <path
                      d={HAKATA_AIRPORT_ROUTE.d}
                      fill="none"
                      stroke="#1E3A5F"
                      strokeWidth="10"
                      strokeLinecap="round"
                      opacity="0.14"
                    />
                  )}
                  <path
                    d={HAKATA_AIRPORT_ROUTE.d}
                    fill="none"
                    stroke={!isRadialDestinationSelected ? '#1E3A5F' : '#D6CEBE'}
                    strokeWidth={!isRadialDestinationSelected ? 3.25 : 1.4}
                    strokeDasharray={!isRadialDestinationSelected ? undefined : '4 4'}
                    strokeLinecap="round"
                    opacity={!isRadialDestinationSelected ? 1 : 0.45}
                    className="transition-all duration-200"
                  />
                  {!isRadialDestinationSelected && (
                    <path
                      d={HAKATA_AIRPORT_ROUTE.d}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeDasharray="5 12"
                      strokeLinecap="round"
                      className="rail-flow-path"
                    />
                  )}
                  {/* Fukuoka Airport Sub-Node */}
                  <circle
                    cx={FUKUOKA_AIRPORT_NODE.x}
                    cy={FUKUOKA_AIRPORT_NODE.y}
                    r={!isRadialDestinationSelected ? 5.5 : 4.5}
                    fill={!isRadialDestinationSelected ? '#1E3A5F' : '#FBF9F5'}
                    stroke={!isRadialDestinationSelected ? '#1E3A5F' : '#A8A29E'}
                    strokeWidth="1.75"
                  />
                  <text
                    x={FUKUOKA_AIRPORT_NODE.x}
                    y={FUKUOKA_AIRPORT_NODE.y + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={!isRadialDestinationSelected ? '600' : '400'}
                    fill={!isRadialDestinationSelected ? '#1E3A5F' : '#A8A29E'}
                    fontFamily="Noto Sans TC, sans-serif"
                  >
                    福岡空港 FUK
                  </text>
                </g>

                {/* Radial Railway Lines from Hakata to Destinations */}
                {ROUTES.map((route) => {
                  const isFocused = activeDest.id === route.id;
                  const isOverview = !isRadialDestinationSelected;
                  const markerId =
                    route.accentColor === '#B43E2B'
                      ? 'url(#arrow-vermilion)'
                      : 'url(#arrow-indigo)';

                  return (
                    <g
                      key={route.id}
                      onClick={() => onSelectRegion(route.id)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`高亮博多至${route.destinationLabel}路徑：${route.expressTrainName}，${route.approxDuration}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectRegion(route.id);
                        }
                      }}
                    >
                      {/* Wide invisible touch target along the route */}
                      <path
                        d={route.d}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="24"
                      />

                      {/* Soft outer glow halo when highlighted */}
                      {isFocused && (
                        <path
                          d={route.d}
                          fill="none"
                          stroke={route.accentColor}
                          strokeWidth="11"
                          strokeLinecap="round"
                          opacity="0.16"
                        />
                      )}

                      {/* Primary Track Line */}
                      <path
                        d={route.d}
                        fill="none"
                        stroke={
                          isFocused
                            ? route.accentColor
                            : isOverview
                              ? '#64748B'
                              : '#D6CEBE'
                        }
                        strokeWidth={isFocused ? 4 : isOverview ? 2 : 1.5}
                        strokeDasharray={
                          !isFocused && route.isDashed ? '6 4' : undefined
                        }
                        strokeLinecap="round"
                        opacity={isFocused ? 1 : isOverview ? 0.72 : 0.4}
                        markerEnd={isFocused ? markerId : undefined}
                        className="transition-all duration-200"
                      />

                      {/* Animated Directional Travel Flow Dashes (Hakata -> Destination) */}
                      {isFocused && (
                        <path
                          d={route.d}
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="1.75"
                          strokeDasharray="6 14"
                          strokeLinecap="round"
                          className="rail-flow-path"
                        />
                      )}

                      {/* Quiet Inline Route Label (shown when not occluded by active callout) */}
                      {!isFocused && (
                        <text
                          x={route.labelX}
                          y={route.labelY}
                          textAnchor="middle"
                          fontSize="10"
                          fill={isOverview ? '#57534E' : '#A8A29E'}
                          fontWeight="500"
                          opacity={isOverview ? 0.95 : 0.55}
                          fontFamily="Noto Sans TC, sans-serif"
                        >
                          {route.shortTrainLabel}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Interactive Station Nodes */}
                {RAIL_DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === activeDest.id;
                  const isHub = dest.id === 'hakata';
                  const isActiveOrigin = isHub && isRadialDestinationSelected;

                  const labelConfig =
                    dest.id === 'hakata'
                      ? { x: -16, y: -14, anchor: 'end' as const, dayY: 0 }
                      : dest.id === 'kitakyushu'
                        ? { x: 16, y: -4, anchor: 'start' as const, dayY: 11 }
                        : { x: 0, y: 27, anchor: 'middle' as const, dayY: 41 };

                  const activeRingColor =
                    activeConnection.id === 'yufuin' && (isSelected || isActiveOrigin)
                      ? '#B43E2B'
                      : '#1E3A5F';

                  return (
                    <g
                      key={dest.id}
                      transform={`translate(${dest.x}, ${dest.y})`}
                      onClick={() => onSelectRegion(dest.id)}
                      className="cursor-pointer group"
                      role="button"
                      tabIndex={0}
                      aria-label={`點擊選擇 ${dest.name}，顯示從博多出發建議乘車路徑`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectRegion(dest.id);
                        }
                      }}
                    >
                      {/* Generous invisible touch hitbox */}
                      <circle r={26} fill="transparent" />

                      {/* Outer Selection / Departure Ring */}
                      {(isSelected || isActiveOrigin) && (
                        <circle
                          r={isHub ? 17 : 15}
                          fill="none"
                          stroke={activeRingColor}
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Main Station Node */}
                      <circle
                        r={isHub ? 10 : isSelected ? 9 : 7.5}
                        fill={
                          isSelected
                            ? activeRingColor
                            : isActiveOrigin
                              ? activeRingColor
                              : isHub
                                ? '#1C1917'
                                : '#FFFFFF'
                        }
                        stroke={
                          isSelected || isActiveOrigin ? activeRingColor : '#1C1917'
                        }
                        strokeWidth={isHub ? 2.5 : 2}
                        className="transition-all duration-150"
                      />
                      {(isHub || isSelected) && (
                        <circle r={isHub ? 3.2 : 2.8} fill="#FFFFFF" />
                      )}

                      {/* Station Name */}
                      <text
                        x={labelConfig.x}
                        y={labelConfig.y}
                        textAnchor={labelConfig.anchor}
                        fontSize={isHub ? '13' : '12'}
                        fontWeight="600"
                        fill={
                          isSelected || isActiveOrigin ? activeRingColor : '#1C1917'
                        }
                        fontFamily="Noto Serif TC, serif"
                      >
                        {dest.name}
                      </text>
                      <text
                        x={labelConfig.x}
                        y={labelConfig.dayY}
                        textAnchor={labelConfig.anchor}
                        fontSize="9.5"
                        fill={isActiveOrigin ? activeRingColor : '#78716C'}
                        fontWeight={isActiveOrigin ? '600' : '400'}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {isActiveOrigin
                          ? '起點 · 博多出發'
                          : `Day ${dest.days.join(' · ')}`}
                      </text>
                    </g>
                  );
                })}

                {/* Floating Route Callout Card Directly Above the Active Connection */}
                {(() => {
                  const boxH = 52;
                  const boxX = activeConnection.calloutX - activeConnection.calloutWidth / 2;
                  const boxY = activeConnection.calloutY - boxH / 2;
                  const showStem = activeConnection.id !== 'kumamoto';

                  return (
                    <g
                      className="pointer-events-none"
                      aria-hidden="true"
                    >
                      {/* Connector Stem from Callout to Active Route Midpoint */}
                      {showStem && (
                        <>
                          <line
                            x1={activeConnection.calloutX}
                            y1={boxY + boxH}
                            x2={activeConnection.anchorX}
                            y2={activeConnection.anchorY}
                            stroke={activeConnection.accentColor}
                            strokeWidth="1.25"
                            strokeDasharray="2.5 2.5"
                          />
                          <circle
                            cx={activeConnection.anchorX}
                            cy={activeConnection.anchorY}
                            r="4"
                            fill="#FFFFFF"
                            stroke={activeConnection.accentColor}
                            strokeWidth="2"
                          />
                        </>
                      )}

                      {/* Callout Surface */}
                      <rect
                        x={boxX}
                        y={boxY}
                        width={activeConnection.calloutWidth}
                        height={boxH}
                        rx="14"
                        fill="#FFFFFF"
                        stroke={activeConnection.accentColor}
                        strokeWidth="1.5"
                        filter="url(#callout-shadow)"
                      />

                      {/* Express Train Name (Line 1) */}
                      <text
                        x={activeConnection.calloutX}
                        y={boxY + 21}
                        textAnchor="middle"
                        fontSize="11.5"
                        fontWeight="700"
                        fill={activeConnection.accentColor}
                        fontFamily="Noto Sans TC, sans-serif"
                      >
                        {activeConnection.expressTrainName}
                      </text>

                      {/* Origin -> Destination & Approx Travel Time (Line 2) */}
                      <text
                        x={activeConnection.calloutX}
                        y={boxY + 39}
                        textAnchor="middle"
                        fontSize="10.5"
                        fontWeight="500"
                        fill="#44403C"
                        fontFamily="JetBrains Mono, Noto Sans TC, sans-serif"
                      >
                        {activeConnection.originLabel} ➔ {activeConnection.destinationLabel} ·{' '}
                        {activeConnection.approxDuration}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EFECE6] text-[15px] md:text-xs text-[#78716C]">
              <span>點擊地圖站點或路線即可切換博多出發高亮路徑</span>
              <span>
                <span className="text-[#1E3A5F] font-medium">深藍線</span>：特急 / 新幹線 ·{' '}
                <span className="text-[#B43E2B] font-medium">朱紅線</span>：由布院之森指定席
              </span>
            </div>
          </div>

          {/* Right: Editorial Station Dossier */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-sm md:text-xs font-mono text-[#78716C] pb-4 border-b border-[#EFECE6]">
                <span className="tabular-nums">
                  DAY {activeDest.days.join(' / ')}
                </span>
                <span>{activeDest.jpName}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1C1917] mt-5">
                {activeDest.name}
              </h3>
              <p className="text-[18px] md:text-sm text-[#57534E] mt-2 leading-[1.8]">
                {activeDest.subtitle}
              </p>

              <dl className="mt-6 divide-y divide-[#EFECE6] border-t border-b border-[#EFECE6] text-[17px] md:text-sm">
                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="text-[#78716C] shrink-0">搭乘列車</dt>
                  <dd className="text-[#1C1917] font-medium text-right">
                    {activeDest.trainName}
                  </dd>
                </div>
                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="text-[#78716C] shrink-0">單程車程</dt>
                  <dd className="text-[#1C1917] font-mono tabular-nums text-right">
                    {activeDest.duration}
                  </dd>
                </div>
                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="text-[#78716C] shrink-0">座席策略</dt>
                  <dd
                    className={`text-right leading-[1.7] ${
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
                <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-3.5">
                  主要停靠與造訪點（點擊開啟 Google Maps）
                </p>
                <ul className="space-y-3 text-[18px] md:text-sm text-[#292524]">
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
                        className="text-[16px] md:text-xs text-[#1E3A5F] font-medium hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                      >
                        地圖 ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFECE6] flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              {activeDest.days.map((dayNum) => (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => onJumpToDay(dayNum)}
                  className="inline-flex items-center justify-center gap-2 px-5 min-h-[52px] bg-[#1E3A5F] text-white text-[17px] md:text-sm font-medium rounded-2xl hover:bg-[#162C49] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
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
                className="inline-flex items-center justify-center gap-1.5 px-5 min-h-[52px] bg-white border border-[#D6CEBE] hover:border-[#1E3A5F] text-[17px] md:text-sm font-medium text-[#1C1917] hover:text-[#1E3A5F] rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
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
