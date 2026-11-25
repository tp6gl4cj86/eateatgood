import {
  ArrowDownRight,
  Building2,
  CarTaxiFront,
  Check,
  Copy,
  ExternalLink,
  Luggage,
  MapPin,
  Plane,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  CurrencyTabIcon,
  ItineraryTabIcon,
  LogisticsTabIcon,
  OverviewTabIcon,
  RailMapTabIcon,
} from './components/TabNavIcons';
import { CurrencyConverterSection } from './components/CurrencyConverterSection';
import { HeroWeatherWidget } from './components/HeroWeatherWidget';
import { ItinerarySection } from './components/ItinerarySection';
import { KyushuRailMap } from './components/KyushuRailMap';
import { LogisticsSection } from './components/LogisticsSection';
import {
  DEFAULT_DAILY_BUDGETS,
  DailyBudgetEntry,
  OverviewBudgetWidget,
} from './components/OverviewBudgetWidget';
import { OverviewFoodMapWidget } from './components/OverviewFoodMapWidget';
import { TripCountdownBar } from './components/TripCountdownBar';
import { TripOverviewVisualStrip } from './components/TripOverviewVisualStrip';
import { TaxiCardModal } from './components/UtilityModals';
import {
  ChecklistItem,
  DAYS_ITINERARY,
  INITIAL_CHECKLIST,
  INITIAL_PACKING_ITEMS,
  ORIGINAL_PDF_PATH,
  PackingCategory,
  PackingItem,
  RailDestination,
  TRIP_OVERVIEW,
} from './data/itineraryData';
import { TemperatureUnit, useKyushuWeather } from './hooks/useKyushuWeather';

const STORAGE_KEY = 'faker-travel-kyushu-2027-state-v1';

type ActiveTab =
  | { type: 'overview' }
  | { type: 'rail-map' }
  | { type: 'logistics' }
  | { type: 'currency' }
  | { type: 'day'; day: number | 'all' };

interface PersistedState {
  completedBlocks: Record<string, boolean>;
  bookedSeats: Record<string, boolean>;
  checkedItems: Record<string, boolean>;
  customItems: ChecklistItem[];
  checkedPacking: Record<string, boolean>;
  customPacking: PackingItem[];
  budgetEntries: DailyBudgetEntry[];
}

function loadPersistedState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        completedBlocks: {},
        bookedSeats: {},
        checkedItems: {},
        customItems: [],
        checkedPacking: {},
        customPacking: [],
        budgetEntries: DEFAULT_DAILY_BUDGETS,
      };
    }
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      completedBlocks: parsed.completedBlocks ?? {},
      bookedSeats: parsed.bookedSeats ?? {},
      checkedItems: parsed.checkedItems ?? {},
      customItems: Array.isArray(parsed.customItems) ? parsed.customItems : [],
      checkedPacking: parsed.checkedPacking ?? {},
      customPacking: Array.isArray(parsed.customPacking) ? parsed.customPacking : [],
      budgetEntries:
        Array.isArray(parsed.budgetEntries) && parsed.budgetEntries.length > 0
          ? parsed.budgetEntries
          : DEFAULT_DAILY_BUDGETS,
    };
  } catch {
    return {
      completedBlocks: {},
      bookedSeats: {},
      checkedItems: {},
      customItems: [],
      checkedPacking: {},
      customPacking: [],
      budgetEntries: DEFAULT_DAILY_BUDGETS,
    };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>({ type: 'overview' });
  const [lastViewedDay, setLastViewedDay] = useState<number | 'all'>(1);
  const [selectedRegion, setSelectedRegion] = useState<RailDestination['id']>('hakata');
  const [taxiCardOpen, setTaxiCardOpen] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>('C');
  const [jpyToTwdRate, setJpyToTwdRate] = useState<number>(0.21);

  const { forecast, dataSource } = useKyushuWeather();
  const [state, setState] = useState<PersistedState>(() => loadPersistedState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }, [state]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTab = (tab: ActiveTab) => {
    if (tab.type === 'day') {
      setLastViewedDay(tab.day);
    }
    setActiveTab(tab);
    scrollToTop();
  };

  const handleJumpToDay = (day: number | 'all') => {
    setLastViewedDay(day);
    setActiveTab({ type: 'day', day });
    scrollToTop();
  };

  const handleCopyHotelAddress = () => {
    navigator.clipboard?.writeText(TRIP_OVERVIEW.hotel.addressJp).catch(() => {});
    setAddressCopied(true);
    window.setTimeout(() => setAddressCopied(false), 1800);
  };

  const handleToggleBlock = (blockId: string) => {
    setState((prev) => ({
      ...prev,
      completedBlocks: {
        ...prev.completedBlocks,
        [blockId]: !prev.completedBlocks[blockId],
      },
    }));
  };

  const handleToggleSeat = (seatId: string) => {
    setState((prev) => ({
      ...prev,
      bookedSeats: {
        ...prev.bookedSeats,
        [seatId]: !prev.bookedSeats[seatId],
      },
    }));
  };

  const handleToggleChecklist = (itemId: string) => {
    setState((prev) => ({
      ...prev,
      checkedItems: {
        ...prev.checkedItems,
        [itemId]: !prev.checkedItems[itemId],
      },
    }));
  };

  const handleAddCustomItem = (title: string, detail: string) => {
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      group: '行前票券',
      title,
      detail,
    };
    setState((prev) => ({
      ...prev,
      customItems: [...prev.customItems, newItem],
    }));
  };

  const handleRemoveCustomItem = (itemId: string) => {
    setState((prev) => {
      const nextChecked = { ...prev.checkedItems };
      delete nextChecked[itemId];
      return {
        ...prev,
        checkedItems: nextChecked,
        customItems: prev.customItems.filter((item) => item.id !== itemId),
      };
    });
  };

  const handleTogglePacking = (packingId: string) => {
    setState((prev) => ({
      ...prev,
      checkedPacking: {
        ...prev.checkedPacking,
        [packingId]: !prev.checkedPacking[packingId],
      },
    }));
  };

  const handleAddCustomPacking = (
    category: PackingCategory,
    title: string,
    note: string
  ) => {
    const newItem: PackingItem = {
      id: `custom-pack-${Date.now()}`,
      category,
      title,
      note,
    };
    setState((prev) => ({
      ...prev,
      customPacking: [...prev.customPacking, newItem],
    }));
  };

  const handleRemoveCustomPacking = (packingId: string) => {
    setState((prev) => {
      const nextChecked = { ...prev.checkedPacking };
      delete nextChecked[packingId];
      return {
        ...prev,
        checkedPacking: nextChecked,
        customPacking: prev.customPacking.filter((item) => item.id !== packingId),
      };
    });
  };

  const handleUpdateBudgetEntry = (
    dayNumber: number,
    field: 'budget' | 'actual',
    value: number
  ) => {
    setState((prev) => {
      const exists = prev.budgetEntries.some((entry) => entry.dayNumber === dayNumber);
      const nextEntries = exists
        ? prev.budgetEntries.map((entry) =>
            entry.dayNumber === dayNumber ? { ...entry, [field]: value } : entry
          )
        : [
            ...prev.budgetEntries,
            {
              dayNumber,
              budget: field === 'budget' ? value : 0,
              actual: field === 'actual' ? value : 0,
            },
          ];
      return {
        ...prev,
        budgetEntries: nextEntries,
      };
    });
  };

  const handleResetBudgets = () => {
    setState((prev) => ({
      ...prev,
      budgetEntries: DEFAULT_DAILY_BUDGETS,
    }));
  };

  const handleResetProgress = () => {
    setState((prev) => ({
      completedBlocks: {},
      bookedSeats: {},
      checkedItems: {},
      customItems: [],
      checkedPacking: {},
      customPacking: [],
      budgetEntries: prev.budgetEntries,
    }));
  };

  const currentDayValue = activeTab.type === 'day' ? activeTab.day : null;
  const hotelMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${TRIP_OVERVIEW.hotel.name} ${TRIP_OVERVIEW.hotel.addressJp}`
  )}`;

  const totalPackingCount = INITIAL_PACKING_ITEMS.length + state.customPacking.length;
  const packedCount = [...INITIAL_PACKING_ITEMS, ...state.customPacking].filter(
    (item) => state.checkedPacking[item.id]
  ).length;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col overflow-x-clip">
      {/* Strict 3-Zone Top Navigation Bar (scrolls naturally on mobile to preserve 15% sticky budget) */}
      <header className="md:sticky md:top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-[#E5E0D8]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 h-14 md:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleOpenTab({ type: 'overview' })}
            className="font-serif text-xl font-bold tracking-[0.12em] text-[#1E3A5F] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {TRIP_OVERVIEW.brand}
          </button>

          {/* Zone 2: 5 Clean Single-Line Section Tabs with Outline-to-Fill Active Icons (Desktop) */}
          <nav
            aria-label="主分頁導覽"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]"
          >
            <button
              type="button"
              onClick={() => handleOpenTab({ type: 'overview' })}
              aria-current={activeTab.type === 'overview' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab.type === 'overview'
                  ? 'text-[#1E3A5F] font-semibold underline underline-offset-8 decoration-2'
                  : 'hover:text-[#1C1917] hover:underline underline-offset-8'
              }`}
            >
              <OverviewTabIcon
                filled={activeTab.type === 'overview'}
                className="w-[17px] h-[17px] shrink-0"
              />
              <span>行程總覽</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenTab({ type: 'rail-map' })}
              aria-current={activeTab.type === 'rail-map' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab.type === 'rail-map'
                  ? 'text-[#1E3A5F] font-semibold underline underline-offset-8 decoration-2'
                  : 'hover:text-[#1C1917] hover:underline underline-offset-8'
              }`}
            >
              <RailMapTabIcon
                filled={activeTab.type === 'rail-map'}
                className="w-[17px] h-[17px] shrink-0"
              />
              <span>鐵道路線</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenTab({ type: 'day', day: lastViewedDay })}
              aria-current={activeTab.type === 'day' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab.type === 'day'
                  ? 'text-[#1E3A5F] font-semibold underline underline-offset-8 decoration-2'
                  : 'hover:text-[#1C1917] hover:underline underline-offset-8'
              }`}
            >
              <ItineraryTabIcon
                filled={activeTab.type === 'day'}
                className="w-[17px] h-[17px] shrink-0"
              />
              <span>每日行程</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenTab({ type: 'logistics' })}
              aria-current={activeTab.type === 'logistics' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab.type === 'logistics'
                  ? 'text-[#1E3A5F] font-semibold underline underline-offset-8 decoration-2'
                  : 'hover:text-[#1C1917] hover:underline underline-offset-8'
              }`}
            >
              <LogisticsTabIcon
                filled={activeTab.type === 'logistics'}
                className="w-[17px] h-[17px] shrink-0"
              />
              <span>攻略行李</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenTab({ type: 'currency' })}
              aria-current={activeTab.type === 'currency' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab.type === 'currency'
                  ? 'text-[#1E3A5F] font-semibold underline underline-offset-8 decoration-2'
                  : 'hover:text-[#1C1917] hover:underline underline-offset-8'
              }`}
            >
              <CurrencyTabIcon
                filled={activeTab.type === 'currency'}
                className="w-[17px] h-[17px] shrink-0"
              />
              <span>幣值轉換</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Taxi Show Card) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setTaxiCardOpen(true)}
              className="inline-flex items-center gap-2 px-4 min-h-[42px] md:min-h-0 md:py-2 bg-[#1E3A5F] text-white text-sm md:text-xs font-medium rounded-xl hover:bg-[#162C49] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CarTaxiFront className="w-4 h-4 md:w-3.5 md:h-3.5" />
              <span>司機溝通卡</span>
            </button>
          </div>
        </div>
      </header>

      {/* Concise Departure Countdown Strip */}
      <TripCountdownBar />

      {/* Sticky Floating Quick Day Switcher Rail (top-0 on mobile, top-16 on desktop) */}
      <div
        role="tablist"
        aria-label="每日行程置頂快速切換"
        className="sticky top-0 md:top-16 z-30 w-full min-w-0 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E5E0D8]"
      >
        <div className="max-w-[1180px] mx-auto px-3 sm:px-6 md:px-10 h-13 md:h-12 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Dedicated Day 0 – Day 6 Tabs */}
          {DAYS_ITINERARY.map((day) => {
            const isActive = currentDayValue === day.dayNumber;
            const shortDate = day.date.slice(5);
            return (
              <button
                key={day.dayNumber}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleJumpToDay(day.dayNumber)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[40px] md:min-h-[36px] text-[15px] md:text-xs font-medium rounded-2xl transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A5F] text-white shadow-xs'
                    : 'text-[#44403C] bg-white/80 hover:bg-white hover:text-[#1C1917]'
                }`}
              >
                <span className="font-mono tabular-nums font-semibold">Day {day.dayNumber}</span>
                <span className={isActive ? 'text-white/90' : 'text-[#57534E]'}>
                  {day.regionLabel}
                </span>
                <span
                  className={`hidden lg:inline font-mono text-xs tabular-nums ${
                    isActive ? 'text-white/70' : 'text-[#A8A29E]'
                  }`}
                >
                  {shortDate}
                </span>
              </button>
            );
          })}

          <span className="h-5 w-px bg-[#D6CEBE] mx-1 shrink-0" aria-hidden="true" />

          <button
            type="button"
            role="tab"
            aria-selected={currentDayValue === 'all'}
            onClick={() => handleJumpToDay('all')}
            className={`px-3.5 py-1.5 min-h-[40px] md:min-h-[36px] text-[15px] md:text-xs font-medium rounded-2xl transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
              currentDayValue === 'all'
                ? 'bg-[#1E3A5F] text-white shadow-xs'
                : 'text-[#44403C] bg-white/80 hover:bg-white hover:text-[#1C1917]'
            }`}
          >
            完整總表
          </button>
        </div>
      </div>

      {/* Dedicated Tab Content Area */}
      <main className="flex-1 min-w-0 w-full">
        {/* TAB 1: Overview (Hero + Flight/Hotel Dossier + Ribbon + Weather + Budget) */}
        {activeTab.type === 'overview' && (
          <section id="overview" className="py-7 md:py-14">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
              {/* Asymmetric 2-Column Editorial Hero */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-stretch">
                {/* Left Column: Title, Deck & Primary Controls */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <p className="text-sm md:text-xs font-mono tracking-[0.12em] text-[#57534E] mb-3">
                      {TRIP_OVERVIEW.edition} · 2027 九州鐵道自由行
                    </p>

                    <h1 className="font-serif text-[clamp(2.1rem,6.5vw,3.75rem)] font-semibold text-[#1C1917] leading-[1.16] tracking-tight headline-balance">
                      {TRIP_OVERVIEW.title}
                    </h1>

                    <p className="mt-4 md:mt-5 text-[18px] md:text-[16px] text-[#44403C] leading-[1.8] max-w-[54ch]">
                      以博多為圓心連住五晚，持 JR 北九州 5 日券放射暢遊門司港、小倉、由布院與熊本。
                    </p>

                    {/* 4-Member Travel Crew Roster */}
                    <div className="mt-6 pt-5 border-t border-[#E5E0D8]">
                      <p className="text-sm md:text-xs font-mono tracking-[0.12em] text-[#78716C] mb-3">
                        TRAVEL CREW · 同行成員（{TRIP_OVERVIEW.members.length} 人）
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TRIP_OVERVIEW.members.map((member, index) => (
                          <div
                            key={member}
                            className="px-4 py-3.5 bg-white border border-[#E5E0D8] rounded-[28px] flex items-center justify-between gap-2"
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

                    <div className="mt-6 md:mt-7 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleJumpToDay(0)}
                        className="inline-flex items-center justify-center gap-2 px-5 min-h-[52px] bg-[#1C1917] text-white text-[17px] md:text-sm font-medium rounded-2xl hover:bg-[#292524] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Day 0 樂house 披薩夜</span>
                        <ArrowDownRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleJumpToDay(1)}
                        className="inline-flex items-center justify-center gap-2 px-5 min-h-[52px] bg-white text-[#1C1917] text-[17px] md:text-sm font-medium border border-[#D6CEBE] hover:border-[#1E3A5F] hover:text-[#1E3A5F] rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>進入 Day 1 九州出發</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenTab({ type: 'logistics' })}
                        className="inline-flex items-center justify-center gap-2 px-5 min-h-[52px] bg-white text-[#1C1917] text-[17px] md:text-sm font-medium border border-[#D6CEBE] hover:border-[#1E3A5F] hover:text-[#1E3A5F] rounded-2xl active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
                      >
                        <Luggage className="w-4 h-4" />
                        <span>
                          行李清單（{packedCount}/{totalPackingCount}）
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Tab Links */}
                  <div className="mt-7 pt-5 border-t border-[#E5E0D8] flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[17px] md:text-xs text-[#57534E]">
                    <span className="font-mono text-sm md:text-xs text-[#78716C]">快速入口：</span>
                    <button
                      type="button"
                      onClick={() => handleOpenTab({ type: 'rail-map' })}
                      className="hover:text-[#1E3A5F] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      北九州鐵道路線圖
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenTab({ type: 'logistics' })}
                      className="hover:text-[#1E3A5F] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      JR 6 次指定席＆行李清單
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenTab({ type: 'currency' })}
                      className="hover:text-[#1E3A5F] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      日圓台幣幣值轉換
                    </button>
                  </div>
                </div>

                {/* Right Column: Flight & Base Hotel Archival Slip */}
                <div className="lg:col-span-5 bg-white border border-[#E5E0D8] rounded-[28px] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-sm md:text-xs font-mono text-[#78716C] pb-3.5 border-b border-[#EFECE6]">
                      <span>FLIGHT &amp; BASE STAY</span>
                      <span className="tabular-nums">STARLUX · HAKATA</span>
                    </div>

                    {/* Flights Block */}
                    <div className="py-4 md:py-5 border-b border-[#EFECE6] space-y-3.5">
                      <div className="flex items-center justify-between gap-2 text-[17px] md:text-xs font-medium text-[#1E3A5F]">
                        <span className="inline-flex items-center gap-2">
                          <Plane className="w-4 h-4 md:w-3.5 md:h-3.5" />
                          <span>星宇航空直飛航班</span>
                        </span>
                        <span className="font-mono text-xs text-[#78716C] font-normal">
                          皆為當地時間
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
                              去程 · 02/23（二）
                            </p>
                            <p className="font-mono text-[18px] md:text-sm font-semibold text-[#1E3A5F] tabular-nums">
                              {TRIP_OVERVIEW.flights.outbound.code}
                            </p>
                          </div>
                          <p className="font-mono text-2xl md:text-xl font-semibold text-[#1C1917] tabular-nums tracking-tight">
                            {TRIP_OVERVIEW.flights.outbound.departTime}{' '}
                            <span className="text-[#A8A29E] font-normal text-lg md:text-base">
                              ➔
                            </span>{' '}
                            {TRIP_OVERVIEW.flights.outbound.arriveTime}
                          </p>
                          <p className="text-[17px] md:text-xs text-[#44403C]">
                            {TRIP_OVERVIEW.flights.outbound.from} ➔{' '}
                            {TRIP_OVERVIEW.flights.outbound.to}
                          </p>
                          <p className="text-sm md:text-[11px] font-mono text-[#78716C] tabular-nums">
                            飛行{TRIP_OVERVIEW.flights.outbound.duration}
                          </p>
                        </div>

                        <div className="pt-4 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-[#EFECE6] space-y-1.5">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="text-sm md:text-xs font-mono text-[#78716C] tabular-nums">
                              回程 · 02/28（日）
                            </p>
                            <p className="font-mono text-[18px] md:text-sm font-semibold text-[#1E3A5F] tabular-nums">
                              {TRIP_OVERVIEW.flights.inbound.code}
                            </p>
                          </div>
                          <p className="font-mono text-2xl md:text-xl font-semibold text-[#1C1917] tabular-nums tracking-tight">
                            {TRIP_OVERVIEW.flights.inbound.departTime}{' '}
                            <span className="text-[#A8A29E] font-normal text-lg md:text-base">
                              ➔
                            </span>{' '}
                            {TRIP_OVERVIEW.flights.inbound.arriveTime}
                          </p>
                          <p className="text-[17px] md:text-xs text-[#44403C]">
                            {TRIP_OVERVIEW.flights.inbound.from} ➔{' '}
                            {TRIP_OVERVIEW.flights.inbound.to}
                          </p>
                          <p className="text-sm md:text-[11px] font-mono text-[#78716C] tabular-nums">
                            飛行{TRIP_OVERVIEW.flights.inbound.duration}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm md:text-[11px] text-[#78716C]">
                        ＊冬季參考時刻，以實際電子機票為準。
                      </p>
                    </div>

                    {/* Base Hotel Block */}
                    <div className="pt-4 md:pt-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[17px] md:text-xs font-medium text-[#1E3A5F]">
                        <Building2 className="w-4 h-4 md:w-3.5 md:h-3.5" />
                        <span>全期五晚連住據點</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-xl font-semibold text-[#1C1917]">
                        {TRIP_OVERVIEW.hotel.name}
                      </h2>
                      <p className="text-[17px] md:text-xs text-[#57534E] leading-relaxed">
                        {TRIP_OVERVIEW.hotel.access} · {TRIP_OVERVIEW.hotel.nights}
                      </p>
                      <p className="font-mono text-[16px] md:text-xs text-[#292524] bg-[#FBF9F5] border border-[#EFECE6] rounded-[28px] px-4 py-3 leading-relaxed">
                        {TRIP_OVERVIEW.hotel.postal} {TRIP_OVERVIEW.hotel.addressJp}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleCopyHotelAddress}
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-[17px] md:text-xs font-medium text-[#1E3A5F] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer"
                    >
                      {addressCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{addressCopied ? '已複製飯店地址' : '複製地址'}</span>
                    </button>

                    <div className="flex items-center gap-4">
                      <a
                        href={hotelMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 min-h-[44px] text-[17px] md:text-xs font-medium text-[#1E3A5F] hover:underline underline-offset-4 whitespace-nowrap"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setTaxiCardOpen(true)}
                        className="min-h-[44px] text-[17px] md:text-xs font-medium text-[#57534E] hover:text-[#1C1917] underline underline-offset-4 whitespace-nowrap cursor-pointer"
                      >
                        給司機看
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-Width 4-Column Operational Ribbon Below Hero Split */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E0D8] bg-white rounded-[28px] overflow-hidden divide-y lg:divide-y-0 sm:divide-x divide-[#E5E0D8]">
                <div className="p-5 md:p-6">
                  <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C]">
                    旅遊日期
                  </p>
                  <p className="mt-1.5 font-mono text-[18px] md:text-base font-semibold text-[#1C1917] tabular-nums">
                    2027/02/23–02/28
                  </p>
                  <p className="mt-1 text-[17px] md:text-sm text-[#57534E]">
                    Day 0 開趴 + 6 天 5 夜
                  </p>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C]">
                    主要鐵道票券
                  </p>
                  <p className="mt-1.5 text-[18px] md:text-base font-semibold text-[#1C1917]">
                    JR 北九州 5 日券
                  </p>
                  <p className="mt-1 text-[17px] md:text-sm text-[#57534E] tabular-nums">
                    含 6 次免費指定席
                  </p>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C]">
                    關鍵搶票時間
                  </p>
                  <p className="mt-1.5 font-mono text-[18px] md:text-base font-semibold text-[#B43E2B] tabular-nums">
                    2027/01/25 09:00
                  </p>
                  <p className="mt-1 text-[17px] md:text-sm text-[#57534E]">
                    由布院之森來回開搶
                  </p>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-sm md:text-xs font-mono tracking-wider text-[#78716C]">
                    機場接送建議
                  </p>
                  <p className="mt-1.5 text-[18px] md:text-base font-semibold text-[#1C1917]">
                    2 台計程車直達
                  </p>
                  <p className="mt-1 text-[17px] md:text-sm text-[#57534E] tabular-nums">
                    約 10–15 分 · 約 ¥1,600/台
                  </p>
                </div>
              </div>

              {/* 7-Day Editorial Photo Filmstrip Quick-Jump */}
              <div className="mt-7">
                <TripOverviewVisualStrip
                  onSelectDay={(dayNumber) => handleJumpToDay(dayNumber)}
                  showComparisonChart={false}
                />
              </div>

              {/* Mini Weather Forecast Widget for Late February 2027 */}
              <HeroWeatherWidget
                forecast={forecast}
                dataSource={dataSource}
                unit={tempUnit}
                onChangeUnit={setTempUnit}
                onJumpToDay={handleJumpToDay}
              />

              {/* Trip Budget & Actual Spending Visualization Widget */}
              <OverviewBudgetWidget
                entries={state.budgetEntries}
                jpyToTwdRate={jpyToTwdRate}
                onUpdateEntry={handleUpdateBudgetEntry}
                onResetBudgets={handleResetBudgets}
              />

              {/* Interactive Kyushu Local Gourmet Recommendation Map */}
              <OverviewFoodMapWidget
                jpyToTwdRate={jpyToTwdRate}
                onJumpToDay={handleJumpToDay}
              />
            </div>
          </section>
        )}

        {/* TAB 2: Dedicated Rail Map View */}
        {activeTab.type === 'rail-map' && (
          <KyushuRailMap
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            onJumpToDay={handleJumpToDay}
          />
        )}

        {/* TAB 3: Dedicated Single-Day (or All-6-Days) Itinerary View */}
        {activeTab.type === 'day' && (
          <ItinerarySection
            selectedDay={activeTab.day}
            onSelectDay={handleJumpToDay}
            completedBlocks={state.completedBlocks}
            onToggleBlock={handleToggleBlock}
            forecast={forecast}
            unit={tempUnit}
            onChangeUnit={setTempUnit}
          />
        )}

        {/* TAB 4: Dedicated Logistics, Packing & Pre-Trip Playbook View */}
        {activeTab.type === 'logistics' && (
          <LogisticsSection
            bookedSeats={state.bookedSeats}
            onToggleSeat={handleToggleSeat}
            checkedItems={state.checkedItems}
            onToggleChecklist={handleToggleChecklist}
            customItems={state.customItems}
            onAddCustomItem={handleAddCustomItem}
            onRemoveCustomItem={handleRemoveCustomItem}
            checkedPacking={state.checkedPacking}
            onTogglePacking={handleTogglePacking}
            customPacking={state.customPacking}
            onAddCustomPacking={handleAddCustomPacking}
            onRemoveCustomPacking={handleRemoveCustomPacking}
            onResetProgress={handleResetProgress}
            initialChecklist={INITIAL_CHECKLIST}
            initialPacking={INITIAL_PACKING_ITEMS}
          />
        )}

        {/* TAB 5: Dedicated Currency Converter View */}
        {activeTab.type === 'currency' && (
          <CurrencyConverterSection
            jpyToTwdRate={jpyToTwdRate}
            onChangeRate={setJpyToTwdRate}
          />
        )}
      </main>

      {/* Quiet Editorial Footer (extra bottom padding on mobile for fixed thumb tab bar) */}
      <footer className="border-t border-[#E5E0D8] bg-white pb-24 md:pb-0">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-[17px] md:text-xs text-[#78716C]">
          <div>
            <p className="font-serif text-[18px] md:text-sm font-semibold text-[#1C1917] tracking-wider">
              {TRIP_OVERVIEW.brand} — 2027 日本九州 6 天 5 夜自由行行程手冊
            </p>
            <p className="mt-1.5 leading-relaxed">
              打卡、行李與預算紀錄皆自動儲存於本機瀏覽器。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={ORIGINAL_PDF_PATH}
              download="FAKER_TRAVEL_2027日本九州6天5夜自由行.pdf"
              className="text-[#1E3A5F] hover:underline underline-offset-4 font-medium whitespace-nowrap"
            >
              下載原始 PDF
            </a>
            <button
              type="button"
              onClick={() => setTaxiCardOpen(true)}
              className="hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              司機溝通卡
            </button>
            <button
              type="button"
              onClick={() => handleOpenTab({ type: 'overview' })}
              className="hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              回到總覽
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile-First Fixed Bottom Tab Bar (Thumb Reach Zone, Solid-Fill Active Icons) */}
      <nav
        aria-label="手機底部主導覽"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E0D8] rounded-t-[28px] shadow-[0_-4px_20px_rgba(28,25,23,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 h-[68px] px-1.5">
          {(
            [
              {
                key: 'overview',
                label: '總覽',
                active: activeTab.type === 'overview',
                onClick: () => handleOpenTab({ type: 'overview' }),
                Icon: OverviewTabIcon,
              },
              {
                key: 'day',
                label: '行程',
                active: activeTab.type === 'day',
                onClick: () => handleOpenTab({ type: 'day', day: lastViewedDay }),
                Icon: ItineraryTabIcon,
              },
              {
                key: 'rail-map',
                label: '路線',
                active: activeTab.type === 'rail-map',
                onClick: () => handleOpenTab({ type: 'rail-map' }),
                Icon: RailMapTabIcon,
              },
              {
                key: 'logistics',
                label: '行李攻略',
                active: activeTab.type === 'logistics',
                onClick: () => handleOpenTab({ type: 'logistics' }),
                Icon: LogisticsTabIcon,
              },
              {
                key: 'currency',
                label: '匯率',
                active: activeTab.type === 'currency',
                onClick: () => handleOpenTab({ type: 'currency' }),
                Icon: CurrencyTabIcon,
              },
            ] as const
          ).map(({ key, label, active, onClick, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={onClick}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl cursor-pointer transition-colors active:scale-[0.96] ${
                active ? 'text-[#1E3A5F]' : 'text-[#78716C] hover:text-[#44403C]'
              }`}
            >
              <span
                className={`inline-flex items-center justify-center px-3.5 py-1 rounded-full transition-colors duration-150 ${
                  active ? 'bg-[#1E3A5F]/[0.11]' : 'bg-transparent'
                }`}
              >
                <Icon
                  filled={active}
                  className={`w-[22px] h-[22px] transition-transform duration-150 ${
                    active ? 'scale-[1.06]' : 'scale-100'
                  }`}
                />
              </span>
              <span
                className={`text-[11px] whitespace-nowrap leading-tight ${
                  active ? 'font-bold text-[#1E3A5F]' : 'font-medium'
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Taxi Card Modal */}
      <TaxiCardModal open={taxiCardOpen} onClose={() => setTaxiCardOpen(false)} />
    </div>
  );
}
