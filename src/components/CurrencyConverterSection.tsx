import { ArrowLeftRight, RefreshCw, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CurrencyConverterSectionProps {
  jpyToTwdRate: number;
  onChangeRate: (rate: number) => void;
}

type Direction = 'JPY_TO_TWD' | 'TWD_TO_JPY';

const QUICK_KYUSHU_AMOUNTS: Array<{ label: string; yen: number }> = [
  { label: '¥310 機場接駁巴士', yen: 310 },
  { label: '¥1,600 機場計程車', yen: 1600 },
  { label: '¥2,500 勝烈亭豬排', yen: 2500 },
  { label: '¥5,500 日本免稅門檻', yen: 5500 },
  { label: '¥10,000 大東園和牛', yen: 10000 },
  { label: '¥20,000 伴手禮採買', yen: 20000 },
];

const REFERENCE_YEN_LIST = [100, 310, 500, 1000, 1500, 3000, 5000, 5500, 10000, 30000, 50000, 100000];

export function CurrencyConverterSection({
  jpyToTwdRate,
  onChangeRate,
}: CurrencyConverterSectionProps) {
  const [direction, setDirection] = useState<Direction>('JPY_TO_TWD');
  const [amountInput, setAmountInput] = useState<string>('10000');
  const [rateInput, setRateInput] = useState<string>(jpyToTwdRate.toFixed(4));
  const [splitCount, setSplitCount] = useState<number>(1);
  const [applyTaxFree, setApplyTaxFree] = useState<boolean>(false);
  const [applyCardFee, setApplyCardFee] = useState<boolean>(false);
  const [rateStatus, setRateStatus] = useState<'default' | 'loading' | 'live' | 'custom'>('default');
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState<string>('預設參考匯率');

  useEffect(() => {
    setRateInput(jpyToTwdRate.toFixed(4));
  }, [jpyToTwdRate]);

  const fetchLiveRate = () => {
    setRateStatus('loading');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);

    fetch('https://open.er-api.com/v6/latest/JPY', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Rate fetch failed'))))
      .then((data: { rates?: { TWD?: number }; time_last_update_utc?: string }) => {
        const liveTwd = data.rates?.TWD;
        if (typeof liveTwd === 'number' && liveTwd > 0.05 && liveTwd < 1) {
          onChangeRate(liveTwd);
          setRateInput(liveTwd.toFixed(4));
          setRateStatus('live');
          setLastUpdatedLabel('已套用即時參考匯率');
        } else {
          setRateStatus('default');
        }
      })
      .catch(() => {
        setRateStatus('default');
        setLastUpdatedLabel('目前使用預設參考匯率（可手動調整）');
      })
      .finally(() => {
        window.clearTimeout(timer);
      });
  };

  useEffect(() => {
    fetchLiveRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rawAmount = parseFloat(amountInput.replace(/,/g, '')) || 0;

  // Tax-free removes 10% consumption tax (price / 1.1) on JPY shopping; card fee adds 1.5%
  const adjustedBaseAmount = (() => {
    let val = rawAmount;
    if (applyTaxFree) {
      val = val / 1.1;
    }
    if (applyCardFee) {
      val = val * 1.015;
    }
    return val;
  })();

  const convertedTotal =
    direction === 'JPY_TO_TWD'
      ? adjustedBaseAmount * jpyToTwdRate
      : jpyToTwdRate > 0
        ? adjustedBaseAmount / jpyToTwdRate
        : 0;

  const perPersonSource = splitCount > 1 ? adjustedBaseAmount / splitCount : adjustedBaseAmount;
  const perPersonTarget = splitCount > 1 ? convertedTotal / splitCount : convertedTotal;

  const handleSwapDirection = () => {
    setDirection((prev) => (prev === 'JPY_TO_TWD' ? 'TWD_TO_JPY' : 'JPY_TO_TWD'));
  };

  const handleRateInputChange = (val: string) => {
    setRateInput(val);
    const parsed = parseFloat(val);
    if (!Number.isNaN(parsed) && parsed > 0.01 && parsed < 5) {
      onChangeRate(parsed);
      setRateStatus('custom');
      setLastUpdatedLabel('已套用自訂匯率（同步套用於預算統計）');
    }
  };

  const handleQuickPreset = (yen: number) => {
    setDirection('JPY_TO_TWD');
    setAmountInput(String(yen));
  };

  const handleReset = () => {
    setDirection('JPY_TO_TWD');
    setAmountInput('10000');
    setSplitCount(1);
    setApplyTaxFree(false);
    setApplyCardFee(false);
    onChangeRate(0.21);
    setRateInput('0.2100');
    setRateStatus('default');
    setLastUpdatedLabel('已重設為預設匯率 0.2100');
  };

  return (
    <section
      id="currency-converter"
      aria-labelledby="currency-heading"
      className="py-7 md:py-14"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 space-y-7 md:space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm md:text-xs font-mono tracking-[0.12em] text-[#57534E] mb-2">
              CURRENCY CONVERTER · 日圓 JPY ⇄ 新台幣 TWD
            </p>
            <h1
              id="currency-heading"
              className="font-serif text-[1.75rem] sm:text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight headline-balance"
            >
              九州旅遊即時幣值轉換與分帳計算機
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={fetchLiveRate}
              disabled={rateStatus === 'loading'}
              className="inline-flex items-center gap-1.5 px-4 min-h-[46px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium bg-white border border-[#D6CEBE] hover:border-[#1E3A5F] text-[#1C1917] hover:text-[#1E3A5F] rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 md:w-3.5 md:h-3.5 ${rateStatus === 'loading' ? 'animate-spin' : ''}`} />
              <span>更新參考匯率</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 min-h-[46px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium bg-white border border-[#E5E0D8] hover:border-[#1C1917] text-[#57534E] hover:text-[#1C1917] rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 md:w-3.5 md:h-3.5" />
              <span>重設</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Layout: Calculator (7 cols) + Quick Reference Table (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left: Interactive Converter Sheet */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 md:p-8 space-y-6">
            {/* Rate Control Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#EFECE6]">
              <div>
                <p className="text-sm md:text-xs font-mono text-[#78716C]">{lastUpdatedLabel}</p>
                <p className="text-[18px] md:text-sm font-mono text-[#1C1917] mt-1 tabular-nums">
                  1 JPY ={' '}
                  <strong className="text-[#1E3A5F] font-semibold">
                    {jpyToTwdRate.toFixed(4)}
                  </strong>{' '}
                  TWD
                </p>
              </div>

              <label className="flex items-center gap-2.5 text-[17px] md:text-xs text-[#57534E]">
                <span className="whitespace-nowrap">自訂匯率</span>
                <input
                  type="number"
                  step="0.0005"
                  min="0.05"
                  max="1"
                  value={rateInput}
                  onChange={(e) => handleRateInputChange(e.target.value)}
                  aria-label="自訂日圓對台幣匯率"
                  className="w-28 px-3 min-h-[46px] md:min-h-0 md:py-1.5 font-mono text-[17px] md:text-xs tabular-nums text-[#1C1917] bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1E3A5F] focus:outline-none rounded-2xl"
                />
              </label>
            </div>

            {/* Bidirectional Input & Output */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div className="p-5 bg-[#FBF9F5] border border-[#E5E0D8] rounded-[28px]">
                <label
                  htmlFor="currency-source-input"
                  className="block text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-1.5"
                >
                  {direction === 'JPY_TO_TWD' ? '輸入日圓金額（JPY）' : '輸入台幣金額（TWD）'}
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl text-[#78716C]">
                    {direction === 'JPY_TO_TWD' ? '¥' : 'NT$'}
                  </span>
                  <input
                    id="currency-source-input"
                    type="text"
                    inputMode="decimal"
                    value={amountInput}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/[^\d.]/g, '');
                      setAmountInput(clean);
                    }}
                    placeholder="0"
                    className="w-full font-mono text-3xl font-semibold text-[#1C1917] bg-transparent focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSwapDirection}
                aria-label="對調換算幣別"
                className="mx-auto min-h-[50px] min-w-[50px] flex items-center justify-center bg-white border border-[#D6CEBE] hover:border-[#1E3A5F] text-[#1E3A5F] rounded-2xl active:scale-[0.96] transition-all cursor-pointer"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              <div className="p-5 bg-[#F7F4EE] border border-[#1E3A5F]/35 rounded-[28px]">
                <p className="text-sm md:text-xs font-mono tracking-wider text-[#1E3A5F] mb-1.5">
                  {direction === 'JPY_TO_TWD' ? '換算新台幣（TWD）' : '換算日圓（JPY）'}
                </p>
                <p className="font-mono text-3xl font-semibold text-[#1E3A5F] tabular-nums truncate">
                  {direction === 'JPY_TO_TWD'
                    ? `NT$${Math.round(convertedTotal).toLocaleString('en-US')}`
                    : `¥${Math.round(convertedTotal).toLocaleString('en-US')}`}
                </p>
              </div>
            </div>

            {/* Shopping & Split Modifiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Tax-Free & Credit Card Fee Toggles */}
              <div className="space-y-2.5">
                <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C]">
                  購物退稅與刷卡調整
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={applyTaxFree}
                    onClick={() => setApplyTaxFree((prev) => !prev)}
                    className={`px-4 min-h-[46px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer ${
                      applyTaxFree
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                        : 'bg-white text-[#57534E] border-[#E5E0D8] hover:border-[#1E3A5F]'
                    }`}
                  >
                    扣除 10% 免稅（÷1.1）
                  </button>
                  <button
                    type="button"
                    aria-pressed={applyCardFee}
                    onClick={() => setApplyCardFee((prev) => !prev)}
                    className={`px-4 min-h-[46px] md:min-h-0 md:py-2 text-[16px] md:text-xs font-medium rounded-2xl border transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer ${
                      applyCardFee
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                        : 'bg-white text-[#57534E] border-[#E5E0D8] hover:border-[#1E3A5F]'
                    }`}
                  >
                    加計 1.5% 海外刷卡費
                  </button>
                </div>
              </div>

              {/* Group Split Selector */}
              <div className="space-y-2.5">
                <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C]">
                  同行分帳人數（4 人全團 / 3 人晚餐 / 2 人搭車）
                </p>
                <div className="grid grid-cols-4 sm:inline-flex items-center p-1.5 bg-[#F3EFE8] rounded-[28px] gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={splitCount === n}
                      onClick={() => setSplitCount(n)}
                      className={`px-2.5 sm:px-3.5 min-h-[44px] md:min-h-0 md:py-2 text-[15px] md:text-xs font-mono font-medium rounded-[20px] transition-colors whitespace-nowrap cursor-pointer ${
                        splitCount === n
                          ? 'bg-white text-[#1E3A5F] shadow-xs'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {n === 1 ? '不分帳' : `${n} 人均分`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Split Breakdown Readout when splitCount > 1 or modifiers active */}
            {(splitCount > 1 || applyTaxFree || applyCardFee) && (
              <div className="p-5 bg-[#FBF9F5] border border-[#E5E0D8] rounded-[28px] flex flex-wrap items-center justify-between gap-4 text-[17px] md:text-xs tabular-nums">
                <div className="text-[#57534E]">
                  {splitCount > 1 ? `每人平均分攤（共 ${splitCount} 人）` : '調整後實際金額'}
                  {applyTaxFree ? ' · 已計免稅' : ''}
                  {applyCardFee ? ' · 含 1.5% 手續費' : ''}
                </div>
                <div className="font-mono font-semibold text-[#1C1917]">
                  {direction === 'JPY_TO_TWD' ? (
                    <>
                      <span>¥{Math.round(perPersonSource).toLocaleString('en-US')}</span>
                      <span className="mx-2 text-[#A8A29E]">≈</span>
                      <span className="text-[#1E3A5F]">
                        NT${Math.round(perPersonTarget).toLocaleString('en-US')} / 人
                      </span>
                    </>
                  ) : (
                    <>
                      <span>NT${Math.round(perPersonSource).toLocaleString('en-US')}</span>
                      <span className="mx-2 text-[#A8A29E]">≈</span>
                      <span className="text-[#1E3A5F]">
                        ¥{Math.round(perPersonTarget).toLocaleString('en-US')} / 人
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Quick Kyushu Trip Presets */}
            <div className="pt-4 border-t border-[#EFECE6]">
              <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-3">
                本趟九州行程常見金額快選
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_KYUSHU_AMOUNTS.map((preset) => (
                  <button
                    key={preset.yen}
                    type="button"
                    onClick={() => handleQuickPreset(preset.yen)}
                    className="px-4 min-h-[44px] md:min-h-0 md:py-2 text-[16px] md:text-xs text-[#292524] bg-[#FBF9F5] hover:bg-[#F3EFE8] border border-[#E5E0D8] rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer tabular-nums"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Crisp Pocket Reference Table */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 md:p-8">
            <div className="pb-4 border-b border-[#EFECE6]">
              <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C] mb-1">
                POCKET CHEAT SHEET
              </p>
              <h2 className="font-serif text-2xl sm:text-xl font-semibold text-[#1C1917]">
                常見日圓面額快速對照表
              </h2>
            </div>

            <div className="mt-2">
              <table className="w-full text-left border-collapse text-[17px] md:text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-[#E5E0D8] text-[15px] md:text-xs text-[#78716C]">
                    <th className="py-3 font-medium">日圓（JPY）</th>
                    <th className="py-3 font-medium text-right">約合台幣（TWD）</th>
                    <th className="py-3 font-medium text-right">4 人均分</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6] font-mono text-[17px] md:text-xs">
                  {REFERENCE_YEN_LIST.map((yen) => {
                    const twd = Math.round(yen * jpyToTwdRate);
                    const twdPer4 = Math.round(twd / 4);
                    return (
                      <tr
                        key={yen}
                        onClick={() => handleQuickPreset(yen)}
                        className="hover:bg-[#FBF9F5] cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 font-semibold text-[#1C1917]">
                          ¥{yen.toLocaleString('en-US')}
                        </td>
                        <td className="py-3.5 text-right text-[#1E3A5F] font-medium">
                          NT${twd.toLocaleString('en-US')}
                        </td>
                        <td className="py-3.5 text-right text-[#78716C]">
                          NT${twdPer4.toLocaleString('en-US')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 pt-3.5 border-t border-[#EFECE6] text-[17px] md:text-xs text-[#78716C] leading-[1.75]">
              點擊任一列可直接帶入左側計算機；自訂匯率後也會自動同步套用於「行程總覽」的費用統計台幣換算。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
