import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

const TRIP_START = { year: 2027, month: 2, day: 23 };
const TRIP_END = { year: 2027, month: 2, day: 28 };
const YUFUIN_BOOKING = { year: 2027, month: 1, day: 25 };

function getDaysDiffFromToday(target: { year: number; month: number; day: number }): number {
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const targetUtc = Date.UTC(target.year, target.month - 1, target.day);
  return Math.round((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

export function TripCountdownBar() {
  const [daysUntilTrip, setDaysUntilTrip] = useState<number>(() =>
    getDaysDiffFromToday(TRIP_START)
  );
  const [daysUntilBooking, setDaysUntilBooking] = useState<number>(() =>
    getDaysDiffFromToday(YUFUIN_BOOKING)
  );
  const [daysUntilEnd, setDaysUntilEnd] = useState<number>(() =>
    getDaysDiffFromToday(TRIP_END)
  );

  useEffect(() => {
    const sync = () => {
      setDaysUntilTrip(getDaysDiffFromToday(TRIP_START));
      setDaysUntilBooking(getDaysDiffFromToday(YUFUIN_BOOKING));
      setDaysUntilEnd(getDaysDiffFromToday(TRIP_END));
    };
    const timer = window.setInterval(sync, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const isDuringTrip = daysUntilTrip <= 0 && daysUntilEnd >= 0;
  const currentTripDay = Math.abs(daysUntilTrip) + 1;
  const isFinished = daysUntilEnd < 0;

  return (
    <div
      aria-label="行程出發倒數"
      className="bg-white border-b border-[#E5E0D8]"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 py-3 md:py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[17px] md:text-xs leading-relaxed">
        <div className="flex items-center gap-2 text-[#1C1917] tabular-nums">
          <Calendar className="w-4 h-4 md:w-3.5 md:h-3.5 text-[#1E3A5F] shrink-0" />
          {!isDuringTrip && !isFinished && (
            <span>
              距離 <span className="font-mono font-medium">2027/02/23</span> 九州出發還有{' '}
              <strong className="font-mono text-[18px] md:text-sm font-semibold text-[#1E3A5F]">
                {daysUntilTrip}
              </strong>{' '}
              天
            </span>
          )}
          {isDuringTrip && (
            <span>
              九州自由行進行中 ·{' '}
              <strong className="font-mono text-[18px] md:text-sm font-semibold text-[#1E3A5F]">
                Day {currentTripDay} / 6
              </strong>
            </span>
          )}
          {isFinished && (
            <span className="text-[#57534E]">
              2027/02/23 – 02/28 日本九州 6 天 5 夜自由行已圓滿完成
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2.5 text-[#78716C] tabular-nums">
          <span>星宇 JX842 桃園 ➔ 福岡</span>
          {daysUntilBooking > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#B43E2B]">
                由布院之森搶票（2027/01/25）倒數{' '}
                <strong className="font-mono font-semibold">{daysUntilBooking}</strong> 天
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
