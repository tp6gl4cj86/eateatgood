import { AlertTriangle, RotateCcw, Wallet } from 'lucide-react';
import { useState } from 'react';
import { DAYS_ITINERARY } from '../data/itineraryData';

export interface DailyBudgetEntry {
  dayNumber: number;
  budget: number;
  actual: number;
}

export const DEFAULT_DAILY_BUDGETS: DailyBudgetEntry[] = [
  { dayNumber: 0, budget: 0, actual: 0 },
  { dayNumber: 1, budget: 25000, actual: 0 },
  { dayNumber: 2, budget: 15000, actual: 0 },
  { dayNumber: 3, budget: 16000, actual: 0 },
  { dayNumber: 4, budget: 15000, actual: 0 },
  { dayNumber: 5, budget: 22000, actual: 0 },
  { dayNumber: 6, budget: 20000, actual: 0 },
];

interface OverviewBudgetWidgetProps {
  entries: DailyBudgetEntry[];
  jpyToTwdRate: number;
  onUpdateEntry: (dayNumber: number, field: 'budget' | 'actual', value: number) => void;
  onResetBudgets: () => void;
}

function formatYen(amount: number): string {
  return `¥${Math.round(amount).toLocaleString('en-US')}`;
}

function formatTwd(yenAmount: number, rate: number): string {
  return `NT$${Math.round(yenAmount * rate).toLocaleString('en-US')}`;
}

function formatAxisYen(amount: number): string {
  if (amount === 0) return '¥0';
  if (amount >= 10000) {
    const man = amount / 10000;
    return `¥${Number.isInteger(man) ? man : man.toFixed(1)}萬`;
  }
  return `¥${(amount / 1000).toFixed(0)}k`;
}

export function OverviewBudgetWidget({
  entries,
  jpyToTwdRate,
  onUpdateEntry,
  onResetBudgets,
}: OverviewBudgetWidgetProps) {
  const [focusedDay, setFocusedDay] = useState<number>(1);
  const [showTwd, setShowTwd] = useState<boolean>(true);

  const normalizedEntries = DAYS_ITINERARY.map((day) => {
    const found = entries.find((e) => e.dayNumber === day.dayNumber);
    const fallback =
      DEFAULT_DAILY_BUDGETS.find((e) => e.dayNumber === day.dayNumber) ?? {
        dayNumber: day.dayNumber,
        budget: 15000,
        actual: 0,
      };
    return {
      dayNumber: day.dayNumber,
      dateShort: day.date.slice(5),
      regionLabel: day.regionLabel,
      budget: found ? found.budget : fallback.budget,
      actual: found ? found.actual : fallback.actual,
    };
  });

  const totalBudget = normalizedEntries.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = normalizedEntries.reduce((sum, item) => sum + item.actual, 0);
  const remaining = totalBudget - totalActual;
  const usagePercent =
    totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : totalActual > 0 ? 100 : 0;
  const isOverallOver = totalActual > totalBudget;
  const clampedBarPercent = Math.min(100, Math.max(0, usagePercent));

  // Identify any day where actual spending exceeds daily budget
  const overBudgetDays = normalizedEntries.filter(
    (item) => item.actual > item.budget && item.actual > 0
  );
  const hasAnyOverBudget = overBudgetDays.length > 0 || isOverallOver;
  const totalDayOverage = overBudgetDays.reduce(
    (sum, item) => sum + (item.actual - item.budget),
    0
  );

  // Compute clean chart Y-axis ceiling
  const maxRawValue = Math.max(
    10000,
    ...normalizedEntries.map((item) => Math.max(item.budget, item.actual))
  );
  const yStep = maxRawValue <= 20000 ? 5000 : maxRawValue <= 50000 ? 10000 : 20000;
  const chartMaxY = Math.ceil(maxRawValue / yStep) * yStep;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round(chartMaxY * ratio));

  const handleNumberInput = (
    dayNumber: number,
    field: 'budget' | 'actual',
    rawValue: string
  ) => {
    const cleaned = rawValue.replace(/[^\d]/g, '');
    const numeric = cleaned === '' ? 0 : Math.min(9999999, parseInt(cleaned, 10));
    onUpdateEntry(dayNumber, field, numeric);
  };

  const activeEntry =
    normalizedEntries.find((item) => item.dayNumber === focusedDay) ?? normalizedEntries[0];

  // SVG chart layout constants
  const svgWidth = 540;
  const svgHeight = 248;
  const padLeft = 56;
  const padRight = 18;
  const padTop = 22;
  const padBottom = 42;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;
  const groupWidth = plotWidth / normalizedEntries.length;
  const barWidth = Math.min(22, groupWidth * 0.28);
  const barGap = 5;

  return (
    <div
      aria-labelledby="budget-widget-heading"
      className="mt-7 bg-white border border-[#E5E0D8] rounded-[28px] overflow-hidden"
    >
      {/* Header Bar */}
      <div className="px-5 sm:px-6 md:px-8 py-5 border-b border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm md:text-xs font-mono tracking-wider text-[#1E3A5F] mb-1.5">
            <Wallet className="w-4 h-4" />
            <span>TRIP BUDGET TRACKER · 單人日圓估算</span>
          </div>
          <h2
            id="budget-widget-heading"
            className="font-serif text-2xl font-semibold text-[#1C1917]"
          >
            每日預算與實際支出統計
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowTwd((prev) => !prev)}
            aria-pressed={showTwd}
            className={`px-4 min-h-[44px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer tabular-nums ${
              showTwd
                ? 'bg-[#F7F4EE] text-[#1E3A5F] border-[#1E3A5F]/40'
                : 'bg-white text-[#57534E] border-[#E5E0D8] hover:text-[#1C1917]'
            }`}
          >
            {showTwd ? `顯示台幣換算（×${jpyToTwdRate.toFixed(3)}）` : '隱藏台幣換算'}
          </button>

          <button
            type="button"
            onClick={onResetBudgets}
            className="inline-flex items-center gap-1.5 px-4 min-h-[44px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium text-[#57534E] bg-white border border-[#E5E0D8] hover:border-[#1C1917] hover:text-[#1C1917] rounded-2xl transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 md:w-3.5 md:h-3.5" />
            <span>重設預算</span>
          </button>
        </div>
      </div>

      {/* Over-Budget Warning Line Above Overall Summary KPIs */}
      {hasAnyOverBudget && (
        <div
          role="alert"
          className="px-5 sm:px-6 md:px-8 py-4 bg-[#FDF4F2] border-b border-[#E5B8B0] flex flex-wrap items-center justify-between gap-3 text-[17px] md:text-xs text-[#991B1B]"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 md:w-4 md:h-4 text-[#B43E2B] shrink-0 mt-0.5" />
            <p className="leading-[1.75] tabular-nums">
              <strong className="font-semibold text-[#B43E2B] mr-1.5">超出預期支出</strong>
              {overBudgetDays.length > 0 && (
                <span>
                  {overBudgetDays.map((d) => `Day ${d.dayNumber}（${d.regionLabel}）`).join('、')}
                  實際支出已高於當日預算，單日累計超支{' '}
                  <strong className="font-mono font-semibold">{formatYen(totalDayOverage)}</strong>
                  {showTwd ? `（約 ${formatTwd(totalDayOverage, jpyToTwdRate)}）` : ''}。
                </span>
              )}
              {isOverallOver && (
                <span className="ml-1">
                  整趟旅程總支出已超出總預算{' '}
                  <strong className="font-mono font-semibold">
                    {formatYen(Math.abs(remaining))}
                  </strong>
                  。
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Overall Summary KPIs + Progress Gauge */}
      <div className="px-5 sm:px-6 md:px-8 py-6 border-b border-[#EFECE6] bg-[#FBF9F5]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 tabular-nums">
          <div>
            <p className="text-sm md:text-[11px] font-mono tracking-wider text-[#78716C]">旅程總預算</p>
            <p className="mt-1 font-mono text-2xl md:text-xl font-semibold text-[#1C1917]">
              {formatYen(totalBudget)}
            </p>
            {showTwd && (
              <p className="text-sm md:text-[11px] font-mono text-[#78716C] mt-0.5">
                約 {formatTwd(totalBudget, jpyToTwdRate)}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm md:text-[11px] font-mono tracking-wider text-[#78716C]">累積實際支出</p>
            <p
              className={`mt-1 font-mono text-2xl md:text-xl font-semibold ${
                isOverallOver ? 'text-[#B43E2B]' : 'text-[#1E3A5F]'
              }`}
            >
              {formatYen(totalActual)}
            </p>
            {showTwd && (
              <p className="text-sm md:text-[11px] font-mono text-[#78716C] mt-0.5">
                約 {formatTwd(totalActual, jpyToTwdRate)}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm md:text-[11px] font-mono tracking-wider text-[#78716C]">
              {isOverallOver ? '預算超支金額' : '剩餘可用預算'}
            </p>
            <p
              className={`mt-1 font-mono text-2xl md:text-xl font-semibold ${
                isOverallOver ? 'text-[#B43E2B]' : 'text-[#1C1917]'
              }`}
            >
              {isOverallOver ? `-${formatYen(Math.abs(remaining))}` : formatYen(remaining)}
            </p>
            {showTwd && (
              <p className="text-sm md:text-[11px] font-mono text-[#78716C] mt-0.5">
                約 {formatTwd(Math.abs(remaining), jpyToTwdRate)}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm md:text-[11px] font-mono tracking-wider text-[#78716C]">總預算使用進度</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span
                className={`font-mono text-2xl md:text-xl font-semibold ${
                  isOverallOver ? 'text-[#B43E2B]' : 'text-[#1E3A5F]'
                }`}
              >
                {usagePercent}%
              </span>
              <span
                className={`text-sm md:text-xs font-medium ${
                  hasAnyOverBudget ? 'text-[#B43E2B]' : 'text-[#57534E]'
                }`}
              >
                {isOverallOver
                  ? '超出總預算'
                  : overBudgetDays.length > 0
                    ? `${overBudgetDays.length} 天超支`
                    : totalActual === 0
                      ? '尚未記帳'
                      : '預算控管中'}
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width Budget Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm md:text-[11px] font-mono text-[#78716C] mb-1.5 tabular-nums">
            <span>整趟旅程累積進度</span>
            <span>
              {formatYen(totalActual)} / {formatYen(totalBudget)}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="整趟旅程預算使用進度"
            aria-valuenow={usagePercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-3 w-full bg-[#E8E2D8] rounded-full overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all duration-200 ${
                isOverallOver ? 'bg-[#B43E2B]' : 'bg-[#1E3A5F]'
              }`}
              style={{ width: `${clampedBarPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Workspace: Chart (Left) + Daily Input Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EFECE6]">
        {/* Left: Interactive 6-Day Grouped Bar Chart */}
        <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-xs font-mono tracking-wider text-[#78716C]">
                DAILY COMPARISON · 每日預算與實際支出圖表
              </p>

              <div className="flex items-center gap-4 text-[11px] text-[#57534E]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#D6CEBE] inline-block" aria-hidden="true" />
                  預算
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#1E3A5F] inline-block" aria-hidden="true" />
                  實際支出
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#B43E2B] inline-block" aria-hidden="true" />
                  超支警示
                </span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none"
              role="img"
              aria-label="每日預算與實際支出長條對比圖"
            >
              {/* Horizontal Gridlines & Y-Axis Labels */}
              {yTicks.map((tick) => {
                const y = padTop + plotHeight - (tick / chartMaxY) * plotHeight;
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
                      {formatAxisYen(tick)}
                    </text>
                  </g>
                );
              })}

              {/* Grouped Bars for Day 1 – Day 6 */}
              {normalizedEntries.map((item, idx) => {
                const centerX = padLeft + groupWidth * idx + groupWidth / 2;
                const budgetH = Math.max(0, (item.budget / chartMaxY) * plotHeight);
                const actualH = Math.max(0, (item.actual / chartMaxY) * plotHeight);
                const budgetX = centerX - barWidth - barGap / 2;
                const actualX = centerX + barGap / 2;
                const isDayOver = item.actual > item.budget && item.actual > 0;
                const isFocused = item.dayNumber === activeEntry.dayNumber;
                const dayRatio =
                  item.budget > 0 ? Math.round((item.actual / item.budget) * 100) : 0;

                return (
                  <g
                    key={item.dayNumber}
                    onClick={() => setFocusedDay(item.dayNumber)}
                    onMouseEnter={() => setFocusedDay(item.dayNumber)}
                    className="cursor-pointer"
                  >
                    {/* Subtle Highlight Backdrop (Red tint if over budget, neutral if focused) */}
                    {(isDayOver || isFocused) && (
                      <rect
                        x={padLeft + groupWidth * idx + 4}
                        y={padTop - 6}
                        width={groupWidth - 8}
                        height={plotHeight + 10}
                        fill={isDayOver ? '#FDF4F2' : '#F7F4EE'}
                      />
                    )}

                    {/* Budget Bar */}
                    <rect
                      x={budgetX}
                      y={padTop + plotHeight - budgetH}
                      width={barWidth}
                      height={budgetH}
                      fill="#D6CEBE"
                    />

                    {/* Actual Spending Bar */}
                    <rect
                      x={actualX}
                      y={padTop + plotHeight - actualH}
                      width={barWidth}
                      height={actualH}
                      fill={isDayOver ? '#B43E2B' : '#1E3A5F'}
                    />

                    {/* Percentage Label Above Actual Bar when > 0 */}
                    {item.actual > 0 && (
                      <text
                        x={actualX + barWidth / 2}
                        y={Math.max(12, padTop + plotHeight - actualH - 5)}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="600"
                        fill={isDayOver ? '#B43E2B' : '#1E3A5F'}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {dayRatio}%
                      </text>
                    )}

                    {/* X-Axis Day Label */}
                    <text
                      x={centerX}
                      y={svgHeight - 20}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight={isDayOver || isFocused ? '600' : '500'}
                      fill={isDayOver ? '#B43E2B' : isFocused ? '#1E3A5F' : '#1C1917'}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Day {item.dayNumber}
                    </text>
                    <text
                      x={centerX}
                      y={svgHeight - 6}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill={isDayOver ? '#B43E2B' : '#78716C'}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {item.dateShort}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Focused Day Readout Footer */}
          <div className="mt-4 pt-4 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-3 text-[17px] md:text-xs tabular-nums">
            <span
              className={`font-medium ${
                activeEntry.actual > activeEntry.budget ? 'text-[#B43E2B]' : 'text-[#1C1917]'
              }`}
            >
              Day {activeEntry.dayNumber}（{activeEntry.regionLabel}）
            </span>
            <span className="font-mono text-[#57534E]">
              預算 {formatYen(activeEntry.budget)} · 實支{' '}
              <strong
                className={
                  activeEntry.actual > activeEntry.budget ? 'text-[#B43E2B]' : 'text-[#1E3A5F]'
                }
              >
                {formatYen(activeEntry.actual)}
              </strong>
            </span>
          </div>
        </div>

        {/* Right: Editable Daily Budget & Actual Spending Ledger */}
        <div className="lg:col-span-6 p-5 sm:p-6 md:p-8">
          <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-4">
            INPUT LEDGER · 直接輸入金額即時更新圖表（自動儲存）
          </p>

          {/* Mobile Touch Cards (zero sideways table scroll, text-[17px] prevents iOS auto-zoom) */}
          <div className="md:hidden space-y-4">
            {normalizedEntries.map((item) => {
              const diff = item.budget - item.actual;
              const isOver = item.actual > item.budget && item.actual > 0;
              return (
                <div
                  key={item.dayNumber}
                  onClick={() => setFocusedDay(item.dayNumber)}
                  className={`p-5 border rounded-[28px] transition-colors ${
                    isOver
                      ? 'bg-[#FDF4F2] border-[#E5B8B0]'
                      : 'bg-[#FBF9F5] border-[#EFECE6]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-3.5 tabular-nums">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-mono text-[18px] font-semibold ${
                          isOver ? 'text-[#B43E2B]' : 'text-[#1C1917]'
                        }`}
                      >
                        Day {item.dayNumber}
                      </span>
                      <span
                        className={`text-[17px] ${isOver ? 'text-[#991B1B]' : 'text-[#57534E]'}`}
                      >
                        {item.regionLabel}
                      </span>
                    </div>

                    <span className="font-mono text-[16px]">
                      {item.actual === 0 ? (
                        <span className="text-[#A8A29E]">尚無支出</span>
                      ) : isOver ? (
                        <span className="text-[#B43E2B] font-semibold">
                          超支 {formatYen(Math.abs(diff))}
                        </span>
                      ) : (
                        <span className="text-[#1E3A5F]">餘 {formatYen(diff)}</span>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="block text-[15px] text-[#57534E] mb-1.5">每日預算 (¥)</span>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[17px] text-[#78716C]">
                          ¥
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          aria-label={`Day ${item.dayNumber} 每日預算（日圓）`}
                          value={item.budget === 0 ? '' : String(item.budget)}
                          placeholder="0"
                          onFocus={() => setFocusedDay(item.dayNumber)}
                          onChange={(e) =>
                            handleNumberInput(item.dayNumber, 'budget', e.target.value)
                          }
                          className={`w-full min-h-[48px] pl-8 pr-3 font-mono text-[18px] tabular-nums text-[#1C1917] bg-white border focus:outline-none rounded-2xl ${
                            isOver
                              ? 'border-[#E5B8B0] focus:border-[#B43E2B]'
                              : 'border-[#E5E0D8] focus:border-[#1E3A5F]'
                          }`}
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span
                        className={`block text-[15px] mb-1.5 ${
                          isOver ? 'text-[#B43E2B] font-medium' : 'text-[#57534E]'
                        }`}
                      >
                        實際支出 (¥)
                      </span>
                      <div className="relative">
                        <span
                          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[17px] ${
                            isOver ? 'text-[#B43E2B]' : 'text-[#78716C]'
                          }`}
                        >
                          ¥
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          aria-label={`Day ${item.dayNumber} 實際支出（日圓）`}
                          value={item.actual === 0 ? '' : String(item.actual)}
                          placeholder="0"
                          onFocus={() => setFocusedDay(item.dayNumber)}
                          onChange={(e) =>
                            handleNumberInput(item.dayNumber, 'actual', e.target.value)
                          }
                          className={`w-full min-h-[48px] pl-8 pr-3 font-mono text-[18px] tabular-nums bg-white border focus:outline-none rounded-2xl ${
                            isOver
                              ? 'text-[#B43E2B] font-semibold border-[#B43E2B] focus:border-[#991B1B]'
                              : 'text-[#1C1917] border-[#E5E0D8] focus:border-[#1E3A5F]'
                          }`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Tabular Ledger */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#78716C]">
                  <th className="py-2.5 pr-3 font-medium whitespace-nowrap">天數</th>
                  <th className="py-2.5 px-2 font-medium whitespace-nowrap">每日預算 (¥)</th>
                  <th className="py-2.5 px-2 font-medium whitespace-nowrap">實際支出 (¥)</th>
                  <th className="py-2.5 pl-2 font-medium text-right whitespace-nowrap">差額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {normalizedEntries.map((item) => {
                  const diff = item.budget - item.actual;
                  const isOver = item.actual > item.budget && item.actual > 0;
                  const isFocused = item.dayNumber === activeEntry.dayNumber;
                  return (
                    <tr
                      key={item.dayNumber}
                      onMouseEnter={() => setFocusedDay(item.dayNumber)}
                      onFocus={() => setFocusedDay(item.dayNumber)}
                      className={
                        isOver
                          ? 'bg-[#FDF4F2]'
                          : isFocused
                            ? 'bg-[#FBF9F5]'
                            : 'bg-white'
                      }
                    >
                      <td className="py-2.5 pr-3 pl-2 whitespace-nowrap">
                        <p
                          className={`font-mono font-semibold tabular-nums ${
                            isOver ? 'text-[#B43E2B]' : 'text-[#1C1917]'
                          }`}
                        >
                          Day {item.dayNumber}
                        </p>
                        <p className={`text-[11px] ${isOver ? 'text-[#991B1B]' : 'text-[#78716C]'}`}>
                          {item.regionLabel}
                        </p>
                      </td>

                      <td className="py-2.5 px-2">
                        <div className="relative">
                          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-[#78716C]">
                            ¥
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            aria-label={`Day ${item.dayNumber} 每日預算（日圓）`}
                            value={item.budget === 0 ? '' : String(item.budget)}
                            placeholder="0"
                            onChange={(e) =>
                              handleNumberInput(item.dayNumber, 'budget', e.target.value)
                            }
                            className={`w-28 pl-6 pr-2 py-1.5 font-mono tabular-nums text-[#1C1917] bg-white border focus:outline-none rounded-xl ${
                              isOver
                                ? 'border-[#E5B8B0] focus:border-[#B43E2B]'
                                : 'border-[#E5E0D8] focus:border-[#1E3A5F]'
                            }`}
                          />
                        </div>
                      </td>

                      <td className="py-2.5 px-2">
                        <div className="relative">
                          <span
                            className={`pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono ${
                              isOver ? 'text-[#B43E2B]' : 'text-[#78716C]'
                            }`}
                          >
                            ¥
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            aria-label={`Day ${item.dayNumber} 實際支出（日圓）`}
                            value={item.actual === 0 ? '' : String(item.actual)}
                            placeholder="0"
                            onChange={(e) =>
                              handleNumberInput(item.dayNumber, 'actual', e.target.value)
                            }
                            className={`w-28 pl-6 pr-2 py-1.5 font-mono tabular-nums bg-white border focus:outline-none rounded-xl ${
                              isOver
                                ? 'text-[#B43E2B] font-semibold border-[#B43E2B] focus:border-[#991B1B]'
                                : 'text-[#1C1917] border-[#E5E0D8] focus:border-[#1E3A5F]'
                            }`}
                          />
                        </div>
                      </td>

                      <td className="py-2.5 pl-2 pr-2 text-right font-mono tabular-nums whitespace-nowrap">
                        {item.actual === 0 ? (
                          <span className="text-[#A8A29E]">尚無支出</span>
                        ) : isOver ? (
                          <span className="text-[#B43E2B] font-semibold">
                            超支 {formatYen(Math.abs(diff))}
                          </span>
                        ) : (
                          <span className="text-[#1E3A5F]">餘 {formatYen(diff)}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
