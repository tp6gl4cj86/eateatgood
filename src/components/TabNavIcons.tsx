interface TabIconProps {
  filled?: boolean;
  className?: string;
}

/** 總覽：指南針（選中實心填滿＋留白指針） */
export function OverviewTabIcon({ filled = false, className = 'w-[22px] h-[22px]' }: TabIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.42 5.58a.75.75 0 0 0-.77-.18l-5.12 1.71a1.5 1.5 0 0 0-.95.95l-1.71 5.12a.75.75 0 0 0 .95.95l5.12-1.71a1.5 1.5 0 0 0 .95-.95l1.71-5.12a.75.75 0 0 0-.18-.77Z"
          fill="currentColor"
        />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9.25" />
      <polygon points="15.8 8.2 13.7 13.7 8.2 15.8 10.3 10.3 15.8 8.2" />
    </svg>
  );
}

/** 行程：日曆（選中實心填滿＋留白日期格） */
export function ItineraryTabIcon({ filled = false, className = 'w-[22px] h-[22px]' }: TabIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          d="M7.5 2.5a1 1 0 0 1 1 1V5h7V3.5a1 1 0 1 1 2 0V5h1A2.5 2.5 0 0 1 21 7.5V9H3V7.5A2.5 2.5 0 0 1 5.5 5h1V3.5a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 10.5h18v8A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-8Zm4 2.75a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Zm4.25 0a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2h-1.5Zm4.25 0a1 1 0 1 0 0 2H17a1 1 0 1 0 0-2h-1.5ZM7 16.5a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2H7Zm4.25 0a1 1 0 1 0 0 2h1.5a1 1 0 1 0 0-2h-1.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 2.75v2.5M16 2.75v2.5" />
      <rect x="3.25" y="4.75" width="17.5" height="16" rx="2.5" />
      <path d="M3.25 9.5h17.5" />
      <path d="M8 13.75h.01M12 13.75h.01M16 13.75h.01M8 17.25h.01M12 17.25h.01" strokeWidth="2.2" />
    </svg>
  );
}

/** 路線：特急列車正面（選中實心填滿＋留白車窗與頭燈） */
export function RailMapTabIcon({ filled = false, className = 'w-[22px] h-[22px]' }: TabIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.5c-4.4 0-7.5 1.3-7.5 5.2v7.8A3.5 3.5 0 0 0 8 19h8a3.5 3.5 0 0 0 3.5-3.5V7.7c0-3.9-3.1-5.2-7.5-5.2ZM7.25 7.5A1.5 1.5 0 0 1 8.75 6h6.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-6.5a1.5 1.5 0 0 1-1.5-1.5v-3ZM8.5 16a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm7 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
          fill="currentColor"
        />
        <path
          d="M8.5 19.75 6.5 22M15.5 19.75 17.5 22"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 7.75C5 4.6 7.7 3 12 3s7 1.6 7 4.75v7.75A3 3 0 0 1 16 18.5H8a3 3 0 0 1-3-3V7.75Z" />
      <path d="M5 11.5h14" />
      <path d="M9 15h.01M15 15h.01" strokeWidth="2.3" />
      <path d="M8.5 18.5 6.5 21.5M15.5 18.5 17.5 21.5" />
    </svg>
  );
}

/** 行李攻略：行李箱（選中實心填滿＋留白直紋） */
export function LogisticsTabIcon({ filled = false, className = 'w-[22px] h-[22px]' }: TabIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          d="M9 4.25A2.25 2.25 0 0 1 11.25 2h1.5A2.25 2.25 0 0 1 15 4.25V6h-1.8V4.25a.45.45 0 0 0-.45-.45h-1.5a.45.45 0 0 0-.45.45V6H9V4.25Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 6A2.5 2.5 0 0 0 5 8.5v9A2.5 2.5 0 0 0 7.5 20h.75v1a1 1 0 1 0 2 0v-1h3.5v1a1 1 0 1 0 2 0v-1h.75a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 6h-9ZM9.5 9.25a.85.85 0 0 1 .85.85v5.8a.85.85 0 0 1-1.7 0v-5.8a.85.85 0 0 1 .85-.85Zm5 0a.85.85 0 0 1 .85.85v5.8a.85.85 0 0 1-1.7 0v-5.8a.85.85 0 0 1 .85-.85Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.5 6V4a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 4v2" />
      <rect x="5.5" y="6" width="13" height="13.5" rx="2.5" />
      <path d="M9.5 9.5v6.5M14.5 9.5v6.5" />
      <path d="M8.75 19.5v1.75M15.25 19.5v1.75" />
    </svg>
  );
}

/** 匯率：雙向換算（選中實心圓徽章＋留白雙向箭頭） */
export function CurrencyTabIcon({ filled = false, className = 'w-[22px] h-[22px]' }: TabIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm2.47 5.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H7.5a.75.75 0 0 1 0-1.5h7.94l-.97-.97a.75.75 0 0 1 0-1.06Zm-4.94 9.56a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 1 1 1.06 1.06l-.97.97h7.94a.75.75 0 0 1 0 1.5H8.56l.97.97a.75.75 0 0 1 0 1.06Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 4.5 19.5 8 16 11.5" />
      <path d="M19.5 8H4.5" />
      <path d="M8 19.5 4.5 16 8 12.5" />
      <path d="M4.5 16h15" />
    </svg>
  );
}
