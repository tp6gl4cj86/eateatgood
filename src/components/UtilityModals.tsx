import { Check, Copy, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ORIGINAL_PDF_PATH, TRIP_OVERVIEW } from '../data/itineraryData';

interface PdfViewerModalProps {
  open: boolean;
  onClose: () => void;
}

export function PdfViewerModal({ open, onClose }: PdfViewerModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1917]/65 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF9F5] border border-[#D6CEBE] w-full max-w-5xl h-[86vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E5E0D8] bg-white">
          <div className="min-w-0">
            <h3
              id="pdf-modal-title"
              className="font-serif text-lg font-semibold text-[#1C1917] truncate"
            >
              FAKER TRAVEL — 原始行程確認書 PDF
            </h3>
            <p className="text-xs text-[#78716C] truncate">
              2027 日本九州 6 天 5 夜自由行（最終定稿版 · 共 2 頁）
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={ORIGINAL_PDF_PATH}
              download="FAKER_TRAVEL_2027日本九州6天5夜自由行.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#1E3A5F] text-white text-xs font-medium rounded-sm hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載 PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="關閉預覽視窗"
              className="p-2 text-[#57534E] hover:text-[#1C1917] border border-[#E5E0D8] rounded-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#EAE5DC] relative">
          <iframe
            src={ORIGINAL_PDF_PATH}
            title="FAKER TRAVEL 日本九州 6 天 5 夜自由行原始行程手冊"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

interface TaxiCardModalProps {
  open: boolean;
  onClose: () => void;
}

const TAXI_DESTINATIONS = [
  {
    id: 'hotel',
    tabLabel: '前往 Minn 博多飯店',
    politeLine: '運転手さん、こちらまでお願いします。',
    jpTitle: 'Minn 博多 Station East',
    jpSub: 'ミン 博多 ステーションイースト',
    jpAddress: `${TRIP_OVERVIEW.hotel.postal} ${TRIP_OVERVIEW.hotel.addressJp}`,
    hint: '博多駅 筑紫口から徒歩約8分（博多駅東エリア）',
    fareNote: '自福岡機場國際線出發約 10 分鐘｜預估單台 ¥1,500–¥1,700',
  },
  {
    id: 'airport',
    tabLabel: '前往福岡機場國際線',
    politeLine: '運転手さん、福岡空港の国際線ターミナルまでお願いします。',
    jpTitle: '福岡空港 国際線ターミナル',
    jpSub: 'Fukuoka Airport International Terminal',
    jpAddress: '福岡県福岡市博多区大字青木739（国際線出発口）',
    hint: '星宇航空 STARLUX JX843 返台班機',
    fareNote: '自 Minn 博多出發約 10–15 分鐘｜4 人含大行李建議分搭 2 台車',
  },
];

export function TaxiCardModal({ open, onClose }: TaxiCardModalProps) {
  const [selectedId, setSelectedId] = useState<'hotel' | 'airport'>('hotel');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const active =
    TAXI_DESTINATIONS.find((item) => item.id === selectedId) ?? TAXI_DESTINATIONS[0];

  const handleCopy = () => {
    navigator.clipboard?.writeText(active.jpAddress).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1917]/70 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="taxi-card-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#D6CEBE] w-full max-w-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E5E0D8]">
          <h3 id="taxi-card-title" className="font-serif text-lg font-semibold text-[#1C1917]">
            日本計程車司機放大溝通卡
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉計程車溝通卡"
            className="p-2 text-[#57534E] hover:text-[#1C1917] border border-[#E5E0D8] rounded-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-1 p-1 bg-[#F3EFE8] rounded-md mb-6">
            {TAXI_DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => setSelectedId(dest.id as 'hotel' | 'airport')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                  selectedId === dest.id
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {dest.tabLabel}
              </button>
            ))}
          </div>

          <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-6 md:p-8 space-y-4">
            <p className="text-sm font-medium text-[#1E3A5F]">{active.politeLine}</p>
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#1C1917] leading-tight">
              {active.jpTitle}
            </p>
            <p className="text-sm text-[#57534E]">{active.jpSub}</p>
            <div className="pt-4 border-t border-[#E5E0D8]">
              <p className="text-xs text-[#78716C] mb-1">住所 / 地址</p>
              <p className="text-xl md:text-2xl font-bold text-[#1C1917] tracking-wide">
                {active.jpAddress}
              </p>
              <p className="text-xs text-[#57534E] mt-2">{active.hint}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#78716C] tabular-nums">{active.fareNote}</p>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-sm hover:bg-[#292524] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已複製日文地址' : '複製日文地址'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
