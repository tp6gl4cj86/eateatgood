export type ActivityCategory = 'transport' | 'sightseeing' | 'dining' | 'sports_entertainment';

export interface SpotTag {
  name: string;
  jpName?: string;
  note?: string;
  category: ActivityCategory;
}

export interface TimelineBlock {
  id: string;
  timeRange: string;
  title: string;
  description: string;
  categories: ActivityCategory[];
  transportSummary?: string;
  teammate1900Note?: string;
  spots: SpotTag[];
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  weekday: string;
  shortTitle: string;
  routeSummary: string;
  regionId: 'kitakyushu' | 'yufuin' | 'kumamoto' | 'hakata';
  regionLabel: string;
  stay: string;
  jrPassDay?: number;
  jrTicketAdvice: string;
  teammate1900Cutoff?: string;
  highlights: string[];
  blocks: TimelineBlock[];
}

export interface RailDestination {
  id: 'hakata' | 'kitakyushu' | 'yufuin' | 'kumamoto';
  name: string;
  jpName: string;
  subtitle: string;
  days: number[];
  trainName: string;
  duration: string;
  seatRecommendation: string;
  keyStops: string[];
  x: number;
  y: number;
}

export interface JrSeatSlot {
  id: string;
  slotNumber: number;
  dayNumber: number;
  route: string;
  train: string;
  priority: '必搶指定席' | '建議預劃' | '彈性保留';
  bookingNote: string;
  defaultBooked: boolean;
}

export interface ChecklistItem {
  id: string;
  group: '行前票券' | '交通與搶票' | '住宿與賽事';
  title: string;
  detail: string;
  deadline?: string;
}

export type PackingCategory = '證件票券' | '保暖穿搭' | '3C與日用';

export interface PackingItem {
  id: string;
  category: PackingCategory;
  title: string;
  note: string;
  essential?: boolean;
}

export const ORIGINAL_PDF_PATH = `${import.meta.env.BASE_URL}assets/aistudio/__________6_5_______82bea904.pdf`;

export const TRIP_OVERVIEW = {
  brand: 'FAKER TRAVEL',
  edition: '自由行行程確認書 / 最終定稿版',
  title: '日本九州 6 天 5 夜自由行',
  dateRange: '2027/02/23（二）– 2027/02/28（日）',
  durationText: '6 天 5 夜 · 4 人同行',
  passName: 'JR 北九州鐵路周遊券（5 日版）',
  passDetail: 'Day 1 至 Day 5 連續 5 日啟用，含 6 次免費指定席劃位',
  flights: {
    outbound: {
      code: 'JX842',
      airline: '星宇航空 STARLUX',
      date: '2027/02/23（二）',
      from: '桃園 TPE',
      to: '福岡 FUK',
      note: '抵福岡國際線航廈後，1F 搭計程車或 2 號站牌直達接駁巴士往博多',
    },
    inbound: {
      code: 'JX843',
      airline: '星宇航空 STARLUX',
      date: '2027/02/28（日）',
      from: '福岡 FUK',
      to: '桃園 TPE',
      note: '中午自飯店分搭 2 台計程車直達福岡機場國際線航廈（約 10–15 分鐘）',
    },
  },
  hotel: {
    name: 'Minn 博多 Station East',
    jpName: 'Minn 博多 Station East（ミン 博多 ステーションイースト）',
    addressJp: '福岡市博多区博多駅東2-17-12',
    postal: '〒812-0013',
    access: '博多站筑紫口步行約 8 分鐘',
    nights: '全期 5 晚連住（2/23 入住 – 2/28 退房）',
    taxiEstimate: '自福岡機場國際線搭一般計程車約 10 分鐘直達（單台約 ¥1,500–¥1,700）',
  },
};

export const RAIL_DESTINATIONS: RailDestination[] = [
  {
    id: 'hakata',
    name: '博多・福岡市區',
    jpName: '博多 / 福岡空港',
    subtitle: '全期 5 晚住宿與鐵道輻射中心',
    days: [1, 6],
    trainName: '機場計程車 / 直達巴士',
    duration: '機場至飯店約 10–15 分',
    seatRecommendation: '4 人含大行李建議分搭 2 台計程車',
    keyStops: ['Minn 博多 Station East', '上川端町 燒肉大東園本店', 'PLAZA Hakata', 'AMU PLAZA / 博多阪急'],
    x: 248,
    y: 182,
  },
  {
    id: 'kitakyushu',
    name: '小倉・門司港',
    jpName: '小倉 / 門司港',
    subtitle: '懷舊海峽、B.LEAGUE 籃球賽、小倉競馬場',
    days: [2, 5],
    trainName: 'JR 特急 Sonic + 鹿兒島本線 / 北九州單軌',
    duration: '博多至小倉約 45–50 分鐘',
    seatRecommendation: '自由席即可（注意 JR 北九州券不含山陽新幹線博多–小倉段）',
    keyStops: ['九州鐵道紀念館', '藍翼門司吊橋', '北九州市立綜合體育館', '旦過市場', 'JRA 小倉競馬場', '魚町銀天街'],
    x: 378,
    y: 92,
  },
  {
    id: 'yufuin',
    name: '由布院',
    jpName: '由布院駅',
    subtitle: '觀光特急與溫泉小鎮一日漫遊',
    days: [3],
    trainName: '觀光特急「由布院之森」',
    duration: '博多出發約 2 小時 15 分',
    seatRecommendation: '全車指定席！乘車日前 1 個月台灣時間 09:00 必搶',
    keyStops: ['湯之坪街道', 'Yufuin Floral Village', '金鱗湖'],
    x: 416,
    y: 242,
  },
  {
    id: 'kumamoto',
    name: '熊本',
    jpName: '熊本駅',
    subtitle: '名城巡禮與六白黑豚炸豬排',
    days: [4],
    trainName: '九州新幹線（Sakura / Tsubame）',
    duration: '博多直達約 35–40 分鐘',
    seatRecommendation: '建議使用 5 日券免費額度預劃來回指定席',
    keyStops: ['熊本城天守閣', '櫻之馬場 城彩苑', '勝烈亭 黑豚炸豬排', '上下通商店街'],
    x: 242,
    y: 356,
  },
];

export const DAYS_ITINERARY: DayItinerary[] = [
  {
    dayNumber: 1,
    date: '2027/02/23',
    weekday: '二',
    shortTitle: '抵達福岡・博多市區散策・和牛與柏青哥',
    routeSummary: '抵達福岡 ➔ 博多站換票與市區自由活動 ➔ 燒肉 大東園 本店 ➔ 柏青哥',
    regionId: 'hakata',
    regionLabel: '福岡・博多',
    stay: 'Minn 博多 Station East',
    jrPassDay: 1,
    jrTicketAdvice: '抵達後先於博多站綠色窗口兌換 JR 北九州 5 日券（確認指定席車票），本日於博多市區自由活動。',
    teammate1900Cutoff: '若 19:00 隊友未同行提早場晚餐，下午自由活動後先返飯店休息。',
    highlights: ['星宇 JX842 抵達福岡', '博多站兌換 JR 北九州 5 日券', '博多市區輕鬆散策', '上川端町燒肉大東園本店'],
    blocks: [
      {
        id: 'd1-1',
        timeRange: '10:00–13:30',
        title: '抵達福岡機場、寄放行李與兌換 JR Pass',
        description:
          '搭乘星宇航空 JX842 抵達福岡機場。自國際線 1F 分搭 2 台一般計程車（約 10 分鐘直達飯店，或視排隊情況改搭 2 號站牌 ¥310 博多站直達接駁巴士）前往 Minn 博多寄放行李，隨後步行至博多站兌換 JR 北九州 5 日券，下午於博多市區彈性自由活動並辦理飯店入住。',
        categories: ['transport'],
        transportSummary: '星宇 JX842 ➔ 2 台計程車（約 10 分）或 ¥310 巴士 ➔ 博多站兌換 JR 5 日券',
        spots: [
          { name: '福岡機場國際線航廈', jpName: '福岡空港 国際線ターミナル', category: 'transport' },
          { name: 'Minn 博多 Station East', jpName: '福岡市博多区博多駅東2-17-12', note: '寄放行李 / 辦理入住', category: 'transport' },
          { name: 'JR 博多站綠色窗口', jpName: 'JR 博多駅 みどりの窓口', note: '兌換北九州 5 日券', category: 'transport' },
        ],
      },
      {
        id: 'd1-3',
        timeRange: '18:30–22:30',
        title: '九州和牛燒肉大東園本店 & PLAZA Hakata 柏青哥',
        description:
          '前往上川端町名店「燒肉 大東園 本店」享用九州和牛晚餐。餐後返回博多站筑紫口對面 PLAZA Hakata 體驗柏青哥至 22:30 收工步行回飯店。',
        categories: ['dining', 'sports_entertainment'],
        teammate1900Note: '若 19:00 隊友未同行提早場晚餐，下午市區自由活動後先返飯店休息。',
        spots: [
          { name: '燒肉 大東園 本店', jpName: '焼肉の大東園 本店（上川端町）', note: '九州和牛晚餐', category: 'dining' },
          { name: 'PLAZA Hakata', jpName: 'プラザ博多（筑紫口對面）', note: '柏青哥至 22:30 收工', category: 'sports_entertainment' },
        ],
      },
    ],
  },
  {
    dayNumber: 2,
    date: '2027/02/24',
    weekday: '三',
    shortTitle: '門司港懷舊海峽・B.LEAGUE 現場籃球賽',
    routeSummary: '九州鐵道館 ➔ 燒咖哩 ➔ 藍翼吊橋開橋 ➔ B.LEAGUE 籃球賽',
    regionId: 'kitakyushu',
    regionLabel: '門司港・小倉',
    stay: 'Minn 博多 Station East',
    jrPassDay: 2,
    jrTicketAdvice: '全程使用 JR 特急 Sonic（自由席）轉 JR 鹿兒島本線；體育館往返小倉站搭乘球團免費接駁巴士。',
    teammate1900Cutoff: '16:00 於小倉站，19:00 隊友先行搭特急返博多。',
    highlights: ['九州鐵道紀念館', '14:00 藍翼吊橋開橋秀', '門司港 31F 懷舊展望室', '19:00 福岡新銳 vs 埼玉野馬'],
    blocks: [
      {
        id: 'd2-1',
        timeRange: '09:00–15:30',
        title: '門司港鐵道懷舊、燒咖哩與藍翼吊橋開橋秀',
        description:
          '搭 JR 特急至小倉轉乘 JR 抵達門司港。上午參觀九州鐵道紀念館並享用門司港名物燒咖哩午餐；14:00 準時觀賞「藍翼門司吊橋」整點開橋秀，隨後登上門司港懷舊展望室（31F）俯瞰關門海峽並逛海峽廣場。',
        categories: ['transport', 'sightseeing', 'dining'],
        transportSummary: '博多 ➔ JR 特急至小倉 ➔ 轉 JR 鹿兒島本線抵門司港',
        spots: [
          { name: '九州鐵道紀念館', jpName: '九州鉄道記念館', note: '上午參觀', category: 'sightseeing' },
          { name: '門司港燒咖哩', jpName: '門司港 焼きカレー', note: '午餐必吃名物', category: 'dining' },
          { name: '藍翼門司吊橋', jpName: 'ブルーウィングもじ', note: '14:00 整點開橋秀', category: 'sightseeing' },
          { name: '門司港懷舊展望室（31F）', jpName: '門司港レトロ展望室', note: '俯瞰關門海峽・海峽廣場', category: 'sightseeing' },
        ],
      },
      {
        id: 'd2-2',
        timeRange: '15:35–18:30',
        title: '返回小倉站分流、晚餐與球團接駁入場',
        description:
          '自門司港搭 JR 返回小倉站。三人於小倉站周邊享用晚餐後，搭乘 18:00 或 18:30 球團免費接駁巴士直達北九州市立綜合體育館進場暖身。',
        categories: ['transport', 'dining'],
        transportSummary: '門司港 ➔ JR 返回小倉站 ➔ 18:00 / 18:30 免費接駁巴士直達體育館',
        teammate1900Note: '16:00 於小倉站分流：19:00 隊友先行搭乘 JR 特急返回博多。',
        spots: [
          { name: '小倉站周邊晚餐', jpName: '小倉駅周辺', note: '三人賽前晚餐', category: 'dining' },
          { name: '北九州市立綜合體育館', jpName: '北九州市立総合体育館', note: '18:00 或 18:30 免費接駁車', category: 'sports_entertainment' },
        ],
      },
      {
        id: 'd2-3',
        timeRange: '19:00–22:45',
        title: 'B.LEAGUE 職業籃球現場觀戰：福岡新銳 vs 埼玉野馬',
        description:
          '19:00 準時開球！於北九州市立綜合體育館現場觀戰 B.LEAGUE 福岡新銳（Rizing Zephyr Fukuoka）對戰埼玉野馬（Saitama Broncos）。賽後搭乘 21:25 起每 5 分鐘一班的免費接駁巴士回小倉站，再轉乘 JR 特急 Sonic 返回博多飯店。',
        categories: ['sports_entertainment', 'transport'],
        transportSummary: '21:25 起每 5 分鐘一班接駁車回小倉站 ➔ JR 特急 Sonic 返回博多',
        spots: [
          { name: 'B.LEAGUE 福岡新銳 vs 埼玉野馬', jpName: 'ライジングゼファーフクオカ vs さいたまブロンコス', note: '19:00 準時開球', category: 'sports_entertainment' },
          { name: 'JR 特急 Sonic', jpName: '特急ソニック', note: '賽後小倉返回博多', category: 'transport' },
        ],
      },
    ],
  },
  {
    dayNumber: 3,
    date: '2027/02/25',
    weekday: '四',
    shortTitle: '由布院之森觀光特急・溫泉小鎮一日遊',
    routeSummary: '由布院之森 ➔ 湯之坪街道 ➔ Yufuin Floral Village ➔ 金鱗湖 ➔ 博多鍋物',
    regionId: 'yufuin',
    regionLabel: '大分・由布院',
    stay: 'Minn 博多 Station East',
    jrPassDay: 3,
    jrTicketAdvice: '由布院之森為全車指定席，務必於乘車日前 1 個月（2027/01/25 台灣時間 09:00）線上搶劃來回座位。',
    teammate1900Cutoff: '全團搭 16:00 左右 JR 特急，約 18:20 抵博多，19:00 隊友直接先回飯店。',
    highlights: ['觀光特急「由布院之森」', '湯之坪街道漫遊', 'Yufuin Floral Village', '金鱗湖・博多牛腸鍋/水炊鍋'],
    blocks: [
      {
        id: 'd3-1',
        timeRange: '09:30–16:00',
        title: '搭乘「由布院之森」慢遊由布院小鎮與金鱗湖',
        description:
          '搭乘全車指定席人氣觀光特急「由布院之森」前往大分由布院。抵達後漫遊湯之坪街道特色小店與甜點，探訪歐風童話聚落 Yufuin Floral Village（童話村／貓頭鷹之森），再步行至湖畔欣賞金鱗湖風景。',
        categories: ['transport', 'sightseeing'],
        transportSummary: '博多站 ➔ 全車指定席觀光特急「由布院之森」➔ 由布院站',
        spots: [
          { name: '觀光特急「由布院之森」', jpName: '特急 ゆふいんの森', note: '全車指定席・必搶', category: 'transport' },
          { name: '湯之坪街道', jpName: '湯の坪街道', note: '逛街與小鎮散策', category: 'sightseeing' },
          { name: 'Yufuin Floral Village', jpName: '湯布院フローラルヴィレッジ', note: '童話村／貓頭鷹之森', category: 'sightseeing' },
          { name: '金鱗湖', jpName: '金鱗湖', note: '溫泉湖泊賞景', category: 'sightseeing' },
        ],
      },
      {
        id: 'd3-2',
        timeRange: '16:00–20:30',
        title: '全團搭特急返回博多 & 博多牛腸鍋或水炊鍋晚餐',
        description:
          '全團搭乘 16:00 左右發車之 JR 特急返回博多（約 18:20 抵達博多）。19:00 隊友先行返回 Minn 博多飯店，其餘三人於博多站周邊享用福岡經典名物牛腸鍋（もつ鍋）或水炊鍋（水炊き）晚餐。',
        categories: ['transport', 'dining'],
        transportSummary: '由布院站 16:00 左右 JR 特急 ➔ 約 18:20 抵博多站',
        teammate1900Note: '全團約 18:20 抵達博多站，19:00 隊友直接步行先回飯店。',
        spots: [
          { name: '博多牛腸鍋 / 水炊鍋', jpName: '博多もつ鍋 / 水炊き', note: '三人博多站周邊晚餐', category: 'dining' },
        ],
      },
    ],
  },
  {
    dayNumber: 4,
    date: '2027/02/26',
    weekday: '五',
    shortTitle: '熊本城天守閣巡禮・勝烈亭黑豚炸豬排',
    routeSummary: '九州新幹線 ➔ 熊本城天守閣 & 城彩苑 ➔ 勝烈亭黑豚炸豬排 ➔ 上下通商店街',
    regionId: 'kumamoto',
    regionLabel: '熊本市區',
    stay: 'Minn 博多 Station East',
    jrPassDay: 4,
    jrTicketAdvice: '使用 JR 北九州 5 日券免費額度預劃九州新幹線來回指定席（單程僅約 35–40 分鐘）。',
    teammate1900Cutoff: '19:00 隊友最晚務必搭乘 17:45 熊本出發的新幹線班次返回博多。',
    highlights: ['九州新幹線 35–40 分直達', '熊本城天守閣與城彩苑', '勝烈亭鹿兒島六白黑豚', '上下通商店街'],
    blocks: [
      {
        id: 'd4-1',
        timeRange: '全日行程',
        title: '新幹線直達熊本：熊本城巡禮、勝烈亭與上下通散策',
        description:
          '自博多站搭乘九州新幹線直達熊本（約 35–40 分鐘）。參訪氣勢恢宏的熊本城天守閣與江戶城下町風情的櫻之馬場城彩苑；午餐品嚐人氣名店「勝烈亭」鹿兒島六白黑豚炸豬排；下午漫步逛熊本最熱鬧的上下通商店街後，搭乘新幹線返回博多。',
        categories: ['transport', 'sightseeing', 'dining'],
        transportSummary: '博多站 ➔ 九州新幹線（35–40 分）➔ 熊本站（來回建議預劃指定席）',
        teammate1900Note: '19:00 隊友最晚須搭乘 17:45 新幹線班次返博多，以確保準時返抵飯店。',
        spots: [
          { name: '熊本城天守閣', jpName: '熊本城 天守閣', note: '日本三大名城巡禮', category: 'sightseeing' },
          { name: '櫻之馬場 城彩苑', jpName: '桜の馬場 城彩苑', note: '城下町歷史街區', category: 'sightseeing' },
          { name: '勝烈亭 新市街本店', jpName: '勝烈亭（鹿児島六白黒豚）', note: '鹿兒島六白黑豚炸豬排', category: 'dining' },
          { name: '上下通商店街', jpName: '上通・下通アーケード', note: '午後購物散策', category: 'sightseeing' },
        ],
      },
    ],
  },
  {
    dayNumber: 5,
    date: '2027/02/27',
    weekday: '六',
    shortTitle: '旦過市場早午餐・小倉競馬場熱戰・魚町銀天街',
    routeSummary: '旦過市場早午餐 ➔ JRA 小倉競馬場全日熱戰 ➔ 魚町銀天街晚餐',
    regionId: 'kitakyushu',
    regionLabel: '北九州・小倉',
    stay: 'Minn 博多 Station East',
    jrPassDay: 5,
    jrTicketAdvice: 'JR 北九州 5 日券最終日！博多↔小倉搭 JR 特急自由席；小倉市區轉乘北九州單軌電車（另付單軌車資）。',
    teammate1900Cutoff: '16:15 返小倉站後，19:00 隊友搭乘 17:00 JR 特急先回博多。',
    highlights: ['旦過市場大學丼與糠煮魚', 'JRA 小倉競馬場至 16:00 尾場', '魚町銀天街鐵鍋餃子與燒烏龍麵'],
    blocks: [
      {
        id: 'd5-1',
        timeRange: '09:30–16:00',
        title: '旦過市場早午餐外帶 & JRA 小倉競馬場全日熱戰',
        description:
          '自博多搭 JR 特急至小倉站，轉乘北九州單軌電車於「旦過站」下車。先逛北九州廚房「旦過市場」品嚐自選配料的大學丼、特色糠煮魚與在地熟食（亦可外帶進馬場享用）；隨即再搭單軌直達 JRA 小倉競馬場，全日現場觀賽與投注直至 16:00 尾場結束。',
        categories: ['transport', 'dining', 'sports_entertainment'],
        transportSummary: '博多 ➔ JR 特急至小倉 ➔ 單軌「旦過站」➔ 單軌直達「競馬場前站」',
        spots: [
          { name: '旦過市場', jpName: '旦過市場（單軌旦過站）', note: '大學丼、糠煮魚、熟食可外帶', category: 'dining' },
          { name: 'JRA 小倉競馬場', jpName: 'JRA 小倉競馬場（競馬場前駅）', note: '觀賽投注至 16:00 尾場結束', category: 'sports_entertainment' },
        ],
      },
      {
        id: 'd5-2',
        timeRange: '16:15–21:00',
        title: '魚町銀天街小倉名物晚餐 & 返回博多',
        description:
          '搭單軌返回小倉站後與 19:00 隊友道別，其餘三人步行至熱鬧的「魚町銀天街」，享用小倉名物鐵鍋餃子、發源地燒烏龍麵或在地居酒屋晚餐，餐後搭 JR 特急返回博多。',
        categories: ['transport', 'dining'],
        transportSummary: '競馬場前 ➔ 單軌回小倉站 ➔ 步行至魚町銀天街 ➔ JR 特急返博多',
        teammate1900Note: '19:00 隊友於小倉站搭乘 17:00 JR 特急班次先行返回博多。',
        spots: [
          { name: '魚町銀天街', jpName: '魚町銀天街', note: '鐵鍋餃子、燒烏龍麵、居酒屋', category: 'dining' },
        ],
      },
    ],
  },
  {
    dayNumber: 6,
    date: '2027/02/28',
    weekday: '日',
    shortTitle: '博多車站最後採買・星宇 JX843 返台',
    routeSummary: '退房寄放行李 ➔ AMU PLAZA & 博多阪急採買 ➔ 福岡機場 ➔ 星宇 JX843 返台',
    regionId: 'hakata',
    regionLabel: '博多・返程',
    stay: 'JX843 返台',
    jrTicketAdvice: 'JR 5 日券已於 Day 5 屆滿；本日全程步行於博多站商場，中午自飯店搭 2 台計程車直達機場。',
    highlights: ['退房寄放行李', 'AMU PLAZA / 博多阪急伴手禮', '2 台計程車 10–15 分直達機場', '星宇 JX843 返台'],
    blocks: [
      {
        id: 'd6-1',
        timeRange: '上午–下午',
        title: '博多市區伴手禮最後採買與星宇航空 JX843 返台',
        description:
          '早晨於 Minn 博多辦理退房並寄放行李，把握最後時光前往博多車站共構商場（AMU PLAZA、博多阪急）補貨九州限定伴手禮。中午返回飯店領取行李，分搭 2 台一般計程車直達福岡機場國際線航廈（車程約 10–15 分鐘），搭乘星宇航空 JX843 滿載而歸返台。',
        categories: ['sightseeing', 'transport'],
        transportSummary: 'Minn 博多 ➔ 2 台計程車（約 10–15 分）➔ 福岡機場國際線 ➔ 星宇 JX843 返台',
        spots: [
          { name: 'AMU PLAZA 博多', jpName: 'アミュプラザ博多', note: '伴手禮與最後採買', category: 'sightseeing' },
          { name: '博多阪急百貨', jpName: '博多阪急', note: 'B1 九州甜點伴手禮', category: 'sightseeing' },
          { name: '星宇航空 JX843', jpName: '福岡 FUK ➔ 桃園 TPE', note: '平安返台', category: 'transport' },
        ],
      },
    ],
  },
];

export const JR_SEAT_SLOTS: JrSeatSlot[] = [
  {
    id: 'seat-1',
    slotNumber: 1,
    dayNumber: 3,
    route: '博多 ➔ 由布院',
    train: '觀光特急「由布院之森」（全車指定席）',
    priority: '必搶指定席',
    bookingNote: '乘車日前 1 個月（2027/01/25 台灣時間 09:00）線上準時開搶！',
    defaultBooked: false,
  },
  {
    id: 'seat-2',
    slotNumber: 2,
    dayNumber: 3,
    route: '由布院 ➔ 博多（約 16:00）',
    train: 'JR 特急「由布院之森」或「由布」',
    priority: '必搶指定席',
    bookingNote: '與去程同步於 2027/01/25 09:00 搶劃，確保約 18:20 準時返抵博多。',
    defaultBooked: false,
  },
  {
    id: 'seat-3',
    slotNumber: 3,
    dayNumber: 4,
    route: '博多 ➔ 熊本',
    train: '九州新幹線（車程約 35–40 分）',
    priority: '建議預劃',
    bookingNote: '使用免費指定席額度預先劃位，4 人同行可坐相鄰座位。',
    defaultBooked: false,
  },
  {
    id: 'seat-4',
    slotNumber: 4,
    dayNumber: 4,
    route: '熊本 ➔ 博多',
    train: '九州新幹線',
    priority: '建議預劃',
    bookingNote: '19:00 隊友最晚須劃 17:45 班次；另三人可視上下通逛街進度安排。',
    defaultBooked: false,
  },
  {
    id: 'seat-5',
    slotNumber: 5,
    dayNumber: 2,
    route: '博多 ↔ 小倉（選用）',
    train: 'JR 特急 Sonic',
    priority: '彈性保留',
    bookingNote: '攻略建議其餘路線搭自由席即可，此額度可彈性留作熱門時段備用。',
    defaultBooked: false,
  },
  {
    id: 'seat-6',
    slotNumber: 6,
    dayNumber: 5,
    route: '小倉 ➔ 博多（選用）',
    train: 'JR 特急 Sonic / Kirameki',
    priority: '彈性保留',
    bookingNote: '週六賽馬日傍晚返程可視人潮彈性決定是否使用最後 1 次免費額度。',
    defaultBooked: false,
  },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    group: '交通與搶票',
    title: '線上搶劃 Day 3「由布院之森」來回指定席',
    detail: 'JR 北九州 5 日券含 6 次免費指定席，乘車日前 1 個月台灣時間 09:00 開搶。',
    deadline: '2027/01/25 09:00',
  },
  {
    id: 'chk-2',
    group: '交通與搶票',
    title: '預購 JR 北九州鐵路周遊券（5 日版）',
    detail: 'Day 1 抵達後於博多站兌換並啟用（適用 Day 1–Day 5，共 5 天）。',
    deadline: '出發前完成',
  },
  {
    id: 'chk-3',
    group: '交通與搶票',
    title: '預劃 Day 4 九州新幹線（博多 ↔ 熊本）指定席',
    detail: '留意 19:00 隊友回程最晚需搭 17:45 班次。',
    deadline: '2027/01/26 起',
  },
  {
    id: 'chk-4',
    group: '行前票券',
    title: '確認星宇航空 JX842 / JX843 航班與行李額度',
    detail: '2/23 去程 TPE ➔ FUK，2/28 回程 FUK ➔ TPE；線上預辦登機。',
    deadline: '出發前 48 小時',
  },
  {
    id: 'chk-5',
    group: '住宿與賽事',
    title: '確認 Minn 博多 Station East 五晚連住憑證與寄放行李規則',
    detail: '地址：福岡市博多区博多駅東2-17-12（博多站筑紫口步行約 8 分鐘）。',
  },
  {
    id: 'chk-6',
    group: '住宿與賽事',
    title: '確認 Day 1 燒肉大東園本店訂位 & Day 2 B.LEAGUE 球賽門票',
    detail: '福岡新銳 vs 埼玉野馬 19:00 開球，小倉站 18:00 / 18:30 搭球團免費接駁車。',
  },
];

export const INITIAL_PACKING_ITEMS: PackingItem[] = [
  {
    id: 'pack-1',
    category: '證件票券',
    title: '護照（效期 6 個月以上）',
    note: '兌換 JR 北九州 5 日券與免稅採買皆須出示正本。',
    essential: true,
  },
  {
    id: 'pack-2',
    category: '證件票券',
    title: '日幣現金、海外回饋信用卡與交通 IC 卡',
    note: '現金供旦過市場、小倉競馬場投注與計程車使用；Suica / ICOCA 可搭小倉單軌。',
    essential: true,
  },
  {
    id: 'pack-3',
    category: '證件票券',
    title: 'eSIM / 漫遊網路與數位憑證備份',
    note: '星宇 JX842/843 電子機票、Minn 博多訂房單、JR Pass 兌換憑證、B.LEAGUE 門票。',
    essential: true,
  },
  {
    id: 'pack-4',
    category: '保暖穿搭',
    title: '防風羽絨外套或厚大衣',
    note: 'Day 3 由布院早晚近 0°C、Day 2 關門海峽與 Day 5 競馬場戶外看台風大必備。',
    essential: true,
  },
  {
    id: 'pack-5',
    category: '保暖穿搭',
    title: '發熱衣與洋蔥式穿脫上衣（6 天份）',
    note: '九州冬季室外清冷但列車與商場暖氣強，內層透氣好穿脫最舒適。',
  },
  {
    id: 'pack-6',
    category: '保暖穿搭',
    title: '圍巾、毛帽與隨身暖暖包',
    note: '門司港吊橋海風與由布院清晨湖畔賞景時特別實用。',
  },
  {
    id: 'pack-7',
    category: '保暖穿搭',
    title: '好走防滑步行鞋與厚襪',
    note: '每日步行量高（湯之坪街道、熊本城、上下通與博多車站商場）。',
  },
  {
    id: 'pack-8',
    category: '3C與日用',
    title: '行動電源（限隨身手提登機，勿託運）',
    note: '查車班、導航與全日拍照用電量高，建議備 10,000mAh 以上。',
    essential: true,
  },
  {
    id: 'pack-9',
    category: '3C與日用',
    title: '充電線與多孔插頭（日本雙扁頭 100V）',
    note: '與台灣雙扁插頭相容，免轉接頭（三孔插頭才需轉接）。',
  },
  {
    id: 'pack-10',
    category: '3C與日用',
    title: '輕便摺疊傘',
    note: '2 月底九州偶有局部短暫陣雨，建議隨身放背包。',
  },
  {
    id: 'pack-11',
    category: '3C與日用',
    title: '個人常備藥品、護唇膏與保濕乳液',
    note: '日本冬季室內暖氣乾燥，保濕用品與感冒／腸胃藥建議自備。',
  },
  {
    id: 'pack-12',
    category: '3C與日用',
    title: '輕便摺疊購物袋（預留伴手禮空間）',
    note: 'Day 5 旦過市場外帶熟食進馬場、Day 6 博多車站最後補貨使用。',
  },
];

