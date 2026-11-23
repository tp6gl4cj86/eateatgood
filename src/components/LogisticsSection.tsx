import { Check, Luggage, Plus, RotateCcw, Ticket, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import {
  ChecklistItem,
  JR_SEAT_SLOTS,
  PackingCategory,
  PackingItem,
} from '../data/itineraryData';

interface LogisticsSectionProps {
  bookedSeats: Record<string, boolean>;
  onToggleSeat: (seatId: string) => void;
  checkedItems: Record<string, boolean>;
  onToggleChecklist: (itemId: string) => void;
  customItems: ChecklistItem[];
  onAddCustomItem: (title: string, detail: string) => void;
  onRemoveCustomItem: (itemId: string) => void;
  checkedPacking: Record<string, boolean>;
  onTogglePacking: (packingId: string) => void;
  customPacking: PackingItem[];
  onAddCustomPacking: (category: PackingCategory, title: string, note: string) => void;
  onRemoveCustomPacking: (packingId: string) => void;
  onResetProgress: () => void;
  initialChecklist: ChecklistItem[];
  initialPacking: PackingItem[];
}

const PACKING_CATEGORIES: Array<PackingCategory | '全部'> = [
  '全部',
  '證件票券',
  '保暖穿搭',
  '3C與日用',
];

export function LogisticsSection({
  bookedSeats,
  onToggleSeat,
  checkedItems,
  onToggleChecklist,
  customItems,
  onAddCustomItem,
  onRemoveCustomItem,
  checkedPacking,
  onTogglePacking,
  customPacking,
  onAddCustomPacking,
  onRemoveCustomPacking,
  onResetProgress,
  initialChecklist,
  initialPacking,
}: LogisticsSectionProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDetail, setNewTaskDetail] = useState('');

  const [packingFilter, setPackingFilter] = useState<PackingCategory | '全部'>('全部');
  const [newPackCategory, setNewPackCategory] = useState<PackingCategory>('3C與日用');
  const [newPackTitle, setNewPackTitle] = useState('');
  const [newPackNote, setNewPackNote] = useState('');

  const bookedCount = JR_SEAT_SLOTS.filter((slot) => bookedSeats[slot.id]).length;
  const remainingCount = JR_SEAT_SLOTS.length - bookedCount;

  const allChecklistItems = [...initialChecklist, ...customItems];
  const checkedCount = allChecklistItems.filter((item) => checkedItems[item.id]).length;

  const allPackingItems = [...initialPacking, ...customPacking];
  const packedCount = allPackingItems.filter((item) => checkedPacking[item.id]).length;
  const packingProgressPct =
    allPackingItems.length > 0 ? Math.round((packedCount / allPackingItems.length) * 100) : 0;

  const visiblePackingItems =
    packingFilter === '全部'
      ? allPackingItems
      : allPackingItems.filter((item) => item.category === packingFilter);

  const handleTaskSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) return;
    onAddCustomItem(trimmedTitle, newTaskDetail.trim() || '團員自訂備忘項目');
    setNewTaskTitle('');
    setNewTaskDetail('');
  };

  const handlePackingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newPackTitle.trim();
    if (!trimmedTitle) return;
    onAddCustomPacking(
      newPackCategory,
      trimmedTitle,
      newPackNote.trim() || '個人自訂行李項目'
    );
    setNewPackTitle('');
    setNewPackNote('');
  };

  return (
    <section
      id="logistics"
      aria-labelledby="logistics-heading"
      className="py-8 md:py-16"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 space-y-10 md:space-y-14">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-[0.14em] text-[#57534E] mb-2">
              FAKER TRAVEL 貼心叮嚀與行前實戰
            </p>
            <h1
              id="logistics-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight headline-balance"
            >
              行李備忘、JR 劃位與行前攻略
            </h1>
          </div>

          <button
            type="button"
            onClick={onResetProgress}
            className="inline-flex items-center justify-center gap-2 px-3.5 min-h-[44px] md:min-h-0 md:py-2 text-xs font-medium text-[#57534E] border border-[#E5E0D8] bg-white hover:border-[#1C1917] hover:text-[#1C1917] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重設所有勾選紀錄</span>
          </button>
        </div>

        {/* Part 1: Packing Summary Checklist (Luggage) */}
        <div
          id="packing-list"
          className="bg-white border border-[#E5E0D8] p-5 sm:p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#EFECE6]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#1E3A5F] mb-1.5">
                <Luggage className="w-4 h-4" />
                <span>PACKING CHECKLIST · 2 月底九州冬末 6 天 5 夜</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
                行李備忘概要清單
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
                依福岡／門司港海風、由布院近 0°C 低溫與小倉競馬場戶外觀賽需求整理；勾選紀錄自動保存於本機裝置。
              </p>
            </div>

            <div className="shrink-0 font-mono tabular-nums">
              <p className="text-[11px] text-[#78716C]">打包進度</p>
              <p className="text-xl sm:text-2xl font-semibold text-[#1E3A5F]">
                {packedCount} / {allPackingItems.length}{' '}
                <span className="text-xs font-normal text-[#78716C]">
                  ({packingProgressPct}%)
                </span>
              </p>
            </div>
          </div>

          {/* Packing Progress Bar */}
          <div className="mt-4">
            <div
              role="progressbar"
              aria-label="行李打包進度"
              aria-valuenow={packingProgressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 w-full bg-[#EFECE6] overflow-hidden"
            >
              <div
                className="h-full bg-[#1E3A5F] transition-all duration-200"
                style={{ width: `${packingProgressPct}%` }}
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="行李分類篩選"
            className="mt-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1"
          >
            {PACKING_CATEGORIES.map((cat) => {
              const isActive = packingFilter === cat;
              const catItems =
                cat === '全部'
                  ? allPackingItems
                  : allPackingItems.filter((item) => item.category === cat);
              const catDone = catItems.filter((item) => checkedPacking[item.id]).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setPackingFilter(cat)}
                  className={`px-3.5 min-h-[40px] text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                    isActive
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                      : 'bg-[#FBF9F5] text-[#57534E] border-[#E5E0D8] hover:border-[#1E3A5F]'
                  }`}
                >
                  {cat}{' '}
                  <span className={isActive ? 'text-white/75' : 'text-[#A8A29E]'}>
                    {catDone}/{catItems.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Thumb-Friendly Packing Items List */}
          <ul className="mt-4 divide-y divide-[#EFECE6]">
            {visiblePackingItems.map((item) => {
              const isPacked = Boolean(checkedPacking[item.id]);
              const isCustom = item.id.startsWith('custom-pack-');
              return (
                <li
                  key={item.id}
                  className="flex items-stretch justify-between gap-2"
                >
                  <button
                    type="button"
                    onClick={() => onTogglePacking(item.id)}
                    className="flex items-start gap-3.5 text-left flex-1 py-3.5 min-h-[52px] cursor-pointer group"
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                        isPacked
                          ? 'bg-[#1E3A5F] border-[#1E3A5F] text-white'
                          : 'bg-white border-[#CBC3B6] group-hover:border-[#1E3A5F]'
                      }`}
                    >
                      {isPacked && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span
                          className={`text-sm font-medium ${
                            isPacked ? 'text-[#A8A29E] line-through' : 'text-[#1C1917]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#78716C]">
                          · {item.category}
                        </span>
                        {item.essential && !isPacked && (
                          <span className="text-[11px] font-semibold text-[#B43E2B]">
                            · 必帶
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </button>

                  {isCustom && (
                    <button
                      type="button"
                      onClick={() => onRemoveCustomPacking(item.id)}
                      aria-label={`刪除行李項目 ${item.title}`}
                      className="min-w-[44px] flex items-center justify-center text-[#A8A29E] hover:text-[#B43E2B] transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Add Custom Packing Item Form */}
          <form
            onSubmit={handlePackingSubmit}
            className="mt-5 pt-5 border-t border-[#EFECE6] grid grid-cols-1 sm:grid-cols-12 gap-2.5"
          >
            <select
              value={newPackCategory}
              onChange={(e) => setNewPackCategory(e.target.value as PackingCategory)}
              aria-label="選擇行李分類"
              className="sm:col-span-3 px-3 min-h-[44px] text-base md:text-sm bg-[#FBF9F5] border border-[#E5E0D8] rounded-sm text-[#1C1917] focus:outline-none focus:border-[#1E3A5F]"
            >
              <option value="證件票券">證件票券</option>
              <option value="保暖穿搭">保暖穿搭</option>
              <option value="3C與日用">3C與日用</option>
            </select>
            <input
              type="text"
              value={newPackTitle}
              onChange={(e) => setNewPackTitle(e.target.value)}
              placeholder="新增行李項目（例如：隱形眼鏡、拍立得）"
              className="sm:col-span-4 px-3.5 min-h-[44px] text-base md:text-sm bg-[#FBF9F5] border border-[#E5E0D8] rounded-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A5F]"
            />
            <input
              type="text"
              value={newPackNote}
              onChange={(e) => setNewPackNote(e.target.value)}
              placeholder="備註（選填）"
              className="sm:col-span-3 px-3.5 min-h-[44px] text-base md:text-sm bg-[#FBF9F5] border border-[#E5E0D8] rounded-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A5F]"
            />
            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 px-4 min-h-[44px] bg-[#1C1917] text-white text-sm font-medium rounded-sm hover:bg-[#292524] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>新增</span>
            </button>
          </form>
        </div>

        {/* Part 2: JR North Kyushu 5-Day Pass 6-Seat Allocation */}
        <div className="bg-white border border-[#E5E0D8] p-5 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#EFECE6]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#1E3A5F] mb-1.5">
                <Ticket className="w-4 h-4" />
                <span>JR 北九州 5 日券 · 6 次免費指定席規劃表</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
                指定席配額與搶票時程
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1.5 leading-relaxed max-w-2xl">
                北九州 5 日券內含 6 次免費指定席。建議優先鎖定{' '}
                <strong className="text-[#B43E2B]">
                  Day 3 由布院之森來回（2027/01/25 台灣時間 09:00 開搶）
                </strong>{' '}
                與 Day 4 熊本九州新幹線來回；其餘小倉、門司港路線搭自由席即可。
              </p>
            </div>

            <div className="flex items-baseline gap-6 shrink-0 font-mono tabular-nums pt-1 md:pt-0">
              <div>
                <p className="text-[11px] text-[#78716C]">已劃位</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1E3A5F]">
                  {bookedCount} / 6
                </p>
              </div>
              <div className="h-8 w-px bg-[#E5E0D8]" aria-hidden="true" />
              <div>
                <p className="text-[11px] text-[#78716C]">剩餘額度</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1C1917]">
                  {remainingCount}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Stacked Cards for JR 6-Seat Tracker */}
          <div className="md:hidden divide-y divide-[#EFECE6] mt-2">
            {JR_SEAT_SLOTS.map((slot) => {
              const isBooked = Boolean(bookedSeats[slot.id]);
              return (
                <div key={slot.id} className="py-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
                        <span className="text-[#78716C]">#{slot.slotNumber}</span>
                        <span className="font-semibold text-[#1C1917]">
                          Day {slot.dayNumber}
                        </span>
                        <span
                          className={`font-sans font-medium ${
                            slot.priority === '必搶指定席'
                              ? 'text-[#B43E2B]'
                              : slot.priority === '建議預劃'
                                ? 'text-[#1E3A5F]'
                                : 'text-[#78716C]'
                          }`}
                        >
                          · {slot.priority}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917] mt-1">
                        {slot.route}
                      </p>
                      <p className="text-xs text-[#78716C] mt-0.5">{slot.train}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleSeat(slot.id)}
                      aria-pressed={isBooked}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 min-h-[40px] text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isBooked
                          ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                          : 'bg-white text-[#1C1917] border-[#D6CEBE]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isBooked ? '已劃位' : '未劃位'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed tabular-nums">
                    {slot.bookingNote}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Desktop Table for JR 6-Seat Tracker */}
          <div className="hidden md:block overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-xs text-[#78716C]">
                  <th className="py-3 pr-4 font-medium whitespace-nowrap">額度</th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap">日期</th>
                  <th className="py-3 px-4 font-medium">區間與列車</th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap">優先度</th>
                  <th className="py-3 px-4 font-medium">劃位備註</th>
                  <th className="py-3 pl-4 font-medium text-right whitespace-nowrap">狀態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {JR_SEAT_SLOTS.map((slot) => {
                  const isBooked = Boolean(bookedSeats[slot.id]);
                  return (
                    <tr
                      key={slot.id}
                      className={isBooked ? 'bg-[#FBF9F5]' : 'bg-white'}
                    >
                      <td className="py-4 pr-4 font-mono text-xs text-[#78716C] tabular-nums whitespace-nowrap">
                        #{slot.slotNumber}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs font-medium text-[#1C1917] tabular-nums whitespace-nowrap">
                        Day {slot.dayNumber}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-[#1C1917]">{slot.route}</p>
                        <p className="text-xs text-[#78716C] mt-0.5">{slot.train}</p>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-medium ${
                            slot.priority === '必搶指定席'
                              ? 'text-[#B43E2B]'
                              : slot.priority === '建議預劃'
                                ? 'text-[#1E3A5F]'
                                : 'text-[#78716C]'
                          }`}
                        >
                          {slot.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-[#57534E] leading-relaxed min-w-[220px] tabular-nums">
                        {slot.bookingNote}
                      </td>
                      <td className="py-4 pl-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onToggleSeat(slot.id)}
                          aria-pressed={isBooked}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors cursor-pointer ${
                            isBooked
                              ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                              : 'bg-white text-[#1C1917] border-[#D6CEBE] hover:border-[#1E3A5F]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isBooked ? '已劃位' : '未劃位'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part 3: 2-Column Split — Airport Transfer Comparison & Pre-Departure Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left 5 cols: Airport Transfer Strategy */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8] p-5 sm:p-6 md:p-8">
            <p className="text-xs font-mono tracking-wider text-[#78716C] mb-1.5">
              AIRPORT TRANSFER · 4 人含大行李
            </p>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
              福岡機場 ↔ Minn 博多接送方案
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
              福岡機場距離博多市區極近。四人同行且每人攜帶大型行李時，建議依現場排隊人潮在兩方案之間彈性選擇：
            </p>

            <div className="mt-5 space-y-4">
              {/* Option 1 */}
              <div className="p-4 sm:p-5 bg-[#FBF9F5] border border-[#1E3A5F]/35">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#1C1917]">
                    方案 A：分搭 2 台一般計程車
                  </h3>
                  <span className="text-xs font-medium text-[#1E3A5F]">推薦省時</span>
                </div>
                <dl className="mt-3 space-y-2 text-xs tabular-nums">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#78716C] shrink-0">乘車位置</dt>
                    <dd className="text-[#1C1917] text-right">國際線航廈 1F 計程車招呼站</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#78716C] shrink-0">預估車程</dt>
                    <dd className="text-[#1C1917] font-mono text-right">約 10–15 分鐘直達門口</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#78716C] shrink-0">預估費用</dt>
                    <dd className="text-[#1C1917] font-mono text-right">
                      單台 ¥1,500–¥1,700（約 ¥750–¥850/人）
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Option 2 */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E0D8]">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#1C1917]">
                    方案 B：博多站直達接駁巴士
                  </h3>
                  <span className="text-xs text-[#78716C]">平價備案</span>
                </div>
                <dl className="mt-3 space-y-2 text-xs tabular-nums">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#78716C] shrink-0">乘車位置</dt>
                    <dd className="text-[#1C1917] text-right">國際線 1F 2 號公車站牌</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#78716C] shrink-0">票價資訊</dt>
                    <dd className="text-[#1C1917] font-mono text-right">
                      ¥310 / 人（4 人合計 ¥1,240）
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#78716C] shrink-0">抵達後動線</dt>
                    <dd className="text-[#57534E] text-right">抵博多站後步行約 8 分鐘至飯店</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Interactive Pre-Trip Checklist */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D8] p-5 sm:p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-[#EFECE6]">
              <div>
                <p className="text-xs font-mono tracking-wider text-[#78716C] mb-1.5">
                  PRE-DEPARTURE CHECKLIST
                </p>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
                  行前準備與搶票檢核
                </h2>
              </div>
              <span className="font-mono text-sm text-[#1E3A5F] font-semibold tabular-nums shrink-0">
                {checkedCount} / {allChecklistItems.length}
              </span>
            </div>

            <ul className="divide-y divide-[#EFECE6] mt-1">
              {allChecklistItems.map((item) => {
                const isChecked = Boolean(checkedItems[item.id]);
                const isCustom = item.id.startsWith('custom-');
                return (
                  <li
                    key={item.id}
                    className="flex items-stretch justify-between gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => onToggleChecklist(item.id)}
                      className="flex items-start gap-3.5 text-left flex-1 py-3.5 min-h-[52px] cursor-pointer group"
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-[#1E3A5F] border-[#1E3A5F] text-white'
                            : 'bg-white border-[#CBC3B6] group-hover:border-[#1E3A5F]'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isChecked
                                ? 'text-[#A8A29E] line-through'
                                : 'text-[#1C1917]'
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.deadline && (
                            <span className="font-mono text-[11px] text-[#B43E2B] tabular-nums">
                              · {item.deadline}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => onRemoveCustomItem(item.id)}
                        aria-label={`刪除 ${item.title}`}
                        className="min-w-[44px] flex items-center justify-center text-[#A8A29E] hover:text-[#B43E2B] transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Add Custom Note Form */}
            <form
              onSubmit={handleTaskSubmit}
              className="mt-5 pt-5 border-t border-[#EFECE6] grid grid-cols-1 sm:grid-cols-12 gap-2.5"
            >
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="新增行前待辦（例如：預訂餐廳、買旅遊險）"
                className="sm:col-span-5 px-3.5 min-h-[44px] text-base md:text-sm bg-[#FBF9F5] border border-[#E5E0D8] rounded-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A5F]"
              />
              <input
                type="text"
                value={newTaskDetail}
                onChange={(e) => setNewTaskDetail(e.target.value)}
                placeholder="補充備註（選填）"
                className="sm:col-span-4 px-3.5 min-h-[44px] text-base md:text-sm bg-[#FBF9F5] border border-[#E5E0D8] rounded-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A5F]"
              />
              <button
                type="submit"
                className="sm:col-span-3 inline-flex items-center justify-center gap-1.5 px-4 min-h-[44px] bg-[#1C1917] text-white text-sm font-medium rounded-sm hover:bg-[#292524] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>新增待辦</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
