export type ActivityCategory = 'transport' | 'sightseeing' | 'dining' | 'sports_entertainment';

export interface SpotTag {
  name: string;
  jpName?: string;
  note?: string;
  category: ActivityCategory;
  mapUrl?: string;
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
  regionId: 'taiwan' | 'kitakyushu' | 'yufuin' | 'kumamoto' | 'hakata';
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
  edition: '自由行行程確認書 / 完整定稿版',
  title: '日本九州 6 天 5 夜自由行',
  dateRange: '2027/02/22（一）行前派對 · 02/23（二）– 02/28（日）',
  durationText: 'Day 0 開趴 + 6 天 5 夜 · 4 人同行',
  members: ['假髮', '班表人', '尼哥', '跟隨俠'] as const,
  passName: 'JR 北九州鐵路周遊券（5 日版）',
  passDetail: 'Day 1 至 Day 5（02/23–02/27）連續 5 日使用，含 6 次免費指定席劃位',
  flights: {
    outbound: {
      code: 'JX842',
      airline: '星宇航空 STARLUX',
      date: '2027/02/23（二）',
      from: '桃園 TPE',
      to: '福岡 FUK（10:00 抵達）',
      note: '10:00 抵福岡國際線航廈，視 2 號站牌人潮分搭 2 台計程車（約 ¥1,600/台）或 ¥310 連接巴士往飯店',
    },
    inbound: {
      code: 'JX843',
      airline: '星宇航空 STARLUX',
      date: '2027/02/28（日）',
      from: '福岡 FUK',
      to: '桃園 TPE',
      note: '11:45 自飯店或博多站筑紫口分搭 2 台計程車（約 ¥1,600/台，10–15 分）直達國際線航廈',
    },
  },
  hotel: {
    name: 'Minn 博多 Station East',
    jpName: 'Minn 博多 Station East（ミン 博多 ステーションイースト）',
    addressJp: '福岡市博多区博多駅東2-17-12',
    postal: '〒812-0013',
    access: '博多站筑紫口側步行約 8 分鐘',
    nights: '全期 5 晚連住（02/23 入住 – 02/28 退房）',
    taxiEstimate: '自福岡機場國際線搭一般計程車約 10 分鐘直達門口（每台約 ¥1,600）',
  },
};

export const RAIL_DESTINATIONS: RailDestination[] = [
  {
    id: 'hakata',
    name: '博多・福岡市區',
    jpName: '博多 / 福岡空港',
    subtitle: '全期 5 晚住宿與鐵道輻射中心',
    days: [1, 3, 4, 5, 6],
    trainName: '機場計程車 / 連接巴士 / 市區地鐵',
    duration: '機場至飯店約 10–15 分',
    seatRecommendation: '4 人含大行李建議分搭 2 台計程車（每台約 ¥1,600）',
    keyStops: [
      'Minn 博多 Station East',
      '博多拉麵 ShinShin・運河城・川端通',
      '燒肉大東園本店・Plaza 博多',
      'Ichimujin 渡邊通・中洲屋台街',
      '吉塚鰻魚屋・唐吉訶德中洲店・博多阪急',
    ],
    x: 248,
    y: 182,
  },
  {
    id: 'kitakyushu',
    name: '小倉・門司港',
    jpName: '小倉 / 門司港',
    subtitle: '門司港鐵道館與開橋、Aruaru City、B.LEAGUE 籃球賽、旦過市場與小倉賽馬場',
    days: [2, 5],
    trainName: 'JR 特急 Sonic + 鹿兒島本線 / 北九州單軌',
    duration: '博多至小倉約 45–50 分鐘',
    seatRecommendation: '自由席即可（注意 JR 北九州券不含山陽新幹線博多–小倉段）',
    keyStops: [
      '九州鐵道紀念館・11:00 藍翼吊橋',
      '燒咖哩 Koganemushi',
      '魚町＆京町銀天街・Aruaru City',
      '北九州市立綜合體育館',
      '旦過市場大學丼・JRA 小倉賽馬場',
    ],
    x: 378,
    y: 92,
  },
  {
    id: 'yufuin',
    name: '由布院',
    jpName: '由布院駅',
    subtitle: '湯之坪街道、貓頭鷹之森林、金鱗湖與離峰釜飯心',
    days: [3],
    trainName: 'JR 特急「由布院之森」/「由布」',
    duration: '博多出發約 2 小時 10–15 分',
    seatRecommendation: '由布院之森為全車指定席！乘車日前 1 個月台灣時間 09:00 必搶',
    keyStops: [
      '湯之坪街道（B-speak / 金賞可樂餅）',
      '湯布院貓頭鷹之森林（Floral Village）',
      '金鱗湖',
      '由布釜飯 心 湯布院站前店（僅收現金）',
    ],
    x: 416,
    y: 242,
  },
  {
    id: 'kumamoto',
    name: '熊本',
    jpName: '熊本駅',
    subtitle: '熊本城、加藤神社、上下通商店街與勝烈亭黑豚炸豬排',
    days: [4],
    trainName: '九州新幹線（車程約 35 分鐘）',
    duration: '博多直達約 35–40 分鐘',
    seatRecommendation: '建議使用 5 日券免費額度預劃來回指定席（15:15 返博多）',
    keyStops: [
      '熊本城・加藤神社',
      '櫻之馬場 城彩苑',
      '上下通商店街・熊本熊廣場',
      '勝烈亭 新市街本店',
    ],
    x: 242,
    y: 356,
  },
];

export const DAYS_ITINERARY: DayItinerary[] = [
  {
    dayNumber: 0,
    date: '2027/02/22',
    weekday: '一',
    shortTitle: '「樂house」開趴披薩夜',
    routeSummary: '行前全員集結 ➔ 樂HOUSE社區 ➔ 披薩開趴與行前最後確認',
    regionId: 'taiwan',
    regionLabel: '行前派對',
    stay: '台灣・出發前夕',
    jrTicketAdvice:
      '隔日出發搭乘星宇航空 JX842（10:00 抵福岡），今晚最後確認護照正本、行動電源、日幣現鈔零錢與機場集合時間。',
    highlights: [
      '「樂house」開趴披薩夜',
      '假髮・班表人・尼哥・跟隨俠 全員集結',
      '行前日幣現鈔與機票最後核對',
    ],
    blocks: [
      {
        id: 'd0-1',
        timeRange: '出發前夜',
        title: '「樂house」開趴披薩夜・行前熱身集結',
        description:
          '出發前夕四位成員（假髮、班表人、尼哥、跟隨俠）全員集結於「樂HOUSE社區」舉辦行前披薩開趴夜！邊吃披薩邊熱身暖場，順便做最後一次護照正本、eSIM、純現金店家日幣現鈔與明日桃園機場星宇 JX842 集合動線確認。',
        categories: ['dining', 'sports_entertainment'],
        spots: [
          {
            name: '樂HOUSE社區',
            jpName: '樂house · 行前披薩開趴夜',
            note: '四成員行前集結場地',
            category: 'dining',
            mapUrl:
              'https://www.google.com/maps/place/%E6%A8%82HOUSE%E7%A4%BE%E5%8D%80/data=!4m2!3m1!1s0x0:0x2d4762a0e03ba727?sa=X&ved=1t:2428&ictx=111',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 1,
    date: '2027/02/23',
    weekday: '二',
    shortTitle: '抵達福岡・市區半日遊・大東園燒肉・Plaza 博多',
    routeSummary:
      '福岡機場 ➔ 博多站換票＆ShinShin 拉麵 ➔ 博多運河城＆川端通 ➔ 大東園燒肉 ➔ Plaza 博多',
    regionId: 'hakata',
    regionLabel: '福岡・博多',
    stay: 'Minn 博多 Station East',
    jrPassDay: 1,
    jrTicketAdvice:
      '10:00 抵福岡後，先至飯店寄放行李，11:30–13:30 步行至博多站兌換／啟用 JR 北九州 5 日券（02/23–02/27）並領取預劃指定席車票。',
    teammate1900Cutoff:
      '大東園餐後約 18:45 直接於中洲川端路口搭計程車（約 6 分鐘）返回 Minn 博多 Station East，19:00 準時上線。',
    highlights: [
      '星宇 JX842 10:00 抵福岡',
      'ShinShin 博多DEITOS店午餐',
      '博多運河城＆川端通商店街',
      '燒肉大東園本店・Plaza 博多',
    ],
    blocks: [
      {
        id: 'd1-1',
        timeRange: '10:00–13:30',
        title: '抵達福岡機場、寄放行李與啟用 JR 北九州 5 日券',
        description:
          '10:00 搭乘星宇航空 JX842 抵達福岡機場國際線航廈。視 2 號站牌人潮，分搭 2 台一般計程車（每台約 ¥1,600，10 分鐘直達門口）或搭 ¥310 博多站直達連接巴士前往飯店。11:30–13:30 於 Minn 博多 Station East 寄放行李後，步行至博多站兌換／啟用 JR 北九州 5 日券與預劃指定席車票。',
        categories: ['transport'],
        transportSummary:
          '10:00 抵福岡 ➔ 2 台計程車（¥1,600/台，10 分）或 ¥310 巴士 ➔ Minn 博多寄行李 ➔ 博多站換 JR 5 日券',
        spots: [
          {
            name: '福岡機場國際線航廈',
            jpName: '福岡空港 国際線ターミナル',
            note: '10:00 抵達・1F 計程車或 2 號巴士站牌',
            category: 'transport',
          },
          {
            name: 'Minn 博多 Station East',
            jpName: '福岡市博多区博多駅東2-17-12',
            note: '寄放行李・五晚連住',
            category: 'transport',
          },
          {
            name: 'JR 博多站綠色窗口',
            jpName: 'JR 博多駅 みどりの窓口',
            note: '兌換啟用北九州 5 日券與指定席票',
            category: 'transport',
          },
        ],
      },
      {
        id: 'd1-2',
        timeRange: '13:45–17:35',
        title: 'ShinShin 豚骨拉麵午餐、博多運河城與川端通商店街散策',
        description:
          '13:45–14:45 於博多站內築紫口側享用人氣名店「博多拉麵 ShinShin 博多DEITOS店」午餐。15:00–16:30 散步逛博多運河城感受水舞商場氛圍；16:35–17:35 接著漫步歷史悠久的川端通商店街，一路往中洲川端方向散步前往晚餐地點。',
        categories: ['dining', 'sightseeing'],
        transportSummary: '博多站築紫口 ➔ 步行至博多運河城 ➔ 川端通商店街往中洲川端方向',
        spots: [
          {
            name: '博多拉麵 ShinShin 博多DEITOS店',
            jpName: '博多らーめん ShinShin 博多デイトス店',
            note: '13:45–14:45 博多站內築紫口側午餐',
            category: 'dining',
          },
          {
            name: '博多運河城',
            jpName: 'キャナルシティ博多',
            note: '15:00–16:30 散步逛街',
            category: 'sightseeing',
          },
          {
            name: '川端通商店街',
            jpName: '川端通商店街',
            note: '16:35–17:35 往中洲川端方向漫步',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd1-3',
        timeRange: '17:45–22:30',
        title: '燒肉・冷麵 大東園 本店晚餐 & Plaza 博多柏青哥',
        description:
          '17:45–18:45 於「燒肉・冷麵 大東園 本店」享用九州和牛燒肉與冷麵晚餐（建議事先訂位）。19:00–22:30 其餘三人前往博多站筑紫口正對面的 Plaza 博多打柏青哥／Slot，結束後步行回 Minn 博多飯店休息。',
        categories: ['dining', 'sports_entertainment'],
        transportSummary: '中洲川端大東園 ➔ 18:45 返飯店隊友搭計程車（6 分）/ 其餘三人往 Plaza 博多',
        teammate1900Note:
          '餐後約 18:45 直接於中洲川端路口搭計程車（約 6 分鐘）返回 Minn 博多 Station East，19:00 準時上線。',
        spots: [
          {
            name: '燒肉・冷麵 大東園 本店',
            jpName: '焼肉の大東園 本店（上川端町）',
            note: '17:45–18:45 建議事先訂位',
            category: 'dining',
          },
          {
            name: 'Plaza 博多（PLAZA Hakata）',
            jpName: 'プラザ博多（筑紫口正對面）',
            note: '19:00–22:30 柏青哥／Slot',
            category: 'sports_entertainment',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 2,
    date: '2027/02/24',
    weekday: '三',
    shortTitle: '門司港鐵道館與開橋・燒咖哩・小倉逛街・B.LEAGUE 籃球賽',
    routeSummary:
      '九州鐵道紀念館 ➔ 11:00 藍翼吊橋＆31F展望室 ➔ Koganemushi 燒咖哩 ➔ 小倉銀天街＆Aruaru City ➔ B.LEAGUE 籃球賽',
    regionId: 'kitakyushu',
    regionLabel: '門司港・小倉',
    stay: 'Minn 博多 Station East',
    jrPassDay: 2,
    jrTicketAdvice:
      '08:00 出發搭 JR 特急 Sonic 至小倉轉普通車往門司港；18:00 / 18:30 及 21:25 賽後往返體育館均搭球團免費接駁巴士。',
    teammate1900Cutoff:
      '16:00 準時於小倉站分流：19:00 返飯店隊友（1 人）搭 JR 特急 Sonic 返回博多（約 16:50 抵達），19:00 準時上線。',
    highlights: [
      '九州鐵道紀念館（門票 ¥310）',
      '11:00 藍翼吊橋開橋＆31F展望室（¥300）',
      '燒咖哩 Koganemushi',
      '小倉 Aruaru City・19:00 B.LEAGUE 籃球賽',
    ],
    blocks: [
      {
        id: 'd2-1',
        timeRange: '08:00–13:00',
        title: '門司港鐵道館、11:00 藍翼吊橋開橋秀與 Koganemushi 燒咖哩',
        description:
          '08:00 自 Minn 博多出發，博多站搭 JR 特急 Sonic 至小倉轉普通車抵門司港（09:10）。09:15–10:30 參觀九州鐵道紀念館（步行 3 分鐘，門票 ¥310）；10:30–11:35 門司港懷舊區散步，觀賞 11:00 藍翼門司吊橋整點開橋秀、門司稅關浮棧橋跡，並登 31 樓門司港懷舊展望室俯瞰關門大橋海景（門票 ¥300）；11:45–13:00 享用名店「燒咖哩 Koganemushi（こがねむし）」午餐。',
        categories: ['transport', 'sightseeing', 'dining'],
        transportSummary: '08:00 出發 ➔ 博多搭 JR 特急 Sonic 至小倉 ➔ 轉 JR 普通車抵門司港（09:10）',
        spots: [
          {
            name: '九州鐵道紀念館',
            jpName: '九州鉄道記念館',
            note: '09:15–10:30 門司港站步行 3 分・門票 ¥310',
            category: 'sightseeing',
          },
          {
            name: '藍翼門司吊橋＆門司稅關浮棧橋跡',
            jpName: 'ブルーウィングもじ',
            note: '11:00 整點開橋秀',
            category: 'sightseeing',
          },
          {
            name: '門司港懷舊展望室（31F）',
            jpName: '門司港レトロ展望室',
            note: '俯瞰關門大橋海景・門票 ¥300',
            category: 'sightseeing',
          },
          {
            name: '燒咖哩 Koganemushi',
            jpName: 'こがねむし（門司港焼きカレー）',
            note: '11:45–13:00 午餐',
            category: 'dining',
          },
        ],
      },
      {
        id: 'd2-2',
        timeRange: '13:15–18:00',
        title: '小倉魚町＆京町銀天街、Aruaru City 逛街與 16:00 分流晚餐',
        description:
          '13:15–15:45 搭 JR 普通車返回小倉站，逛魚町銀天街、京町銀天街與 Aruaru City 商場區（看公仔模型、扭蛋與街機）。16:00 準時分流後，看球三人組於 16:15–17:45 在小倉站周邊提早吃晚餐（小倉鐵鍋餃子、燒烏龍麵或拉麵）並買飲料補給，18:00（或最晚 18:30）於 JR 小倉站指定乘車處搭球團免費接駁巴士直達體育館正面玄關（車程約 20 分鐘）。',
        categories: ['sightseeing', 'dining', 'transport'],
        transportSummary:
          '門司港 ➔ JR 普通車返小倉站 ➔ 18:00（最晚 18:30）球團免費接駁車約 20 分直達體育館',
        teammate1900Note:
          '16:00 準時分流：19:00 返飯店隊友（1 人）於小倉站搭 JR 特急 Sonic 返回博多（約 16:50 抵達），走回飯店晚餐、準備 19:00 上線；看球三人組留小倉提前晚餐。',
        spots: [
          {
            name: '魚町銀天街・京町銀天街',
            jpName: '魚町銀天街・京町銀天街',
            note: '13:15–15:45 小倉商店街逛街',
            category: 'sightseeing',
          },
          {
            name: 'Aruaru City 商場區',
            jpName: 'あるあるCity（小倉駅新幹線口）',
            note: '公仔模型、扭蛋與街機',
            category: 'sightseeing',
          },
          {
            name: '小倉站周邊賽前晚餐',
            jpName: '小倉駅周辺（鉄なべ餃子・焼うどん）',
            note: '16:15–17:45 看球三人組提早晚餐＋飲料補給',
            category: 'dining',
          },
        ],
      },
      {
        id: 'd2-3',
        timeRange: '18:20–22:45',
        title: 'B.LEAGUE 職業籃球賽：福岡新銳 vs 埼玉野馬 & 返程',
        description:
          '18:20 抵達北九州市立綜合體育館進場，觀賞 19:00 開打的 B.LEAGUE 職業籃球賽（福岡新銳 Rizing Zephyr Fukuoka vs 埼玉野馬 Saitama Broncos）至 21:15。21:25–22:45 賽後於體育館門口搭乘 21:25 起每 5 分鐘一班的免費接駁巴士回小倉站，再轉乘 JR 特急 Sonic 返回 Minn 博多 Station East。',
        categories: ['sports_entertainment', 'transport'],
        transportSummary:
          '21:25 起每 5 分鐘一班免費接駁巴士回小倉站 ➔ JR 特急 Sonic 返回 Minn 博多',
        spots: [
          {
            name: '北九州市立綜合體育館（B.LEAGUE）',
            jpName: '北九州市立総合体育館',
            note: '19:00 開打・福岡新銳 vs 埼玉野馬',
            category: 'sports_entertainment',
          },
          {
            name: 'JR 特急 Sonic',
            jpName: '特急ソニック（小倉 ➔ 博多）',
            note: '賽後轉乘返博多',
            category: 'transport',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 3,
    date: '2027/02/25',
    weekday: '四',
    shortTitle: '由布院小鎮・站前店釜飯心・渡邊通拉麵・中洲屋台街',
    routeSummary:
      '由布院之森/由布 ➔ 湯之坪＆貓頭鷹之森＆金鱗湖 ➔ 15:00 站前店釜飯心 ➔ Ichimujin 渡邊通拉麵 ➔ 中洲屋台街',
    regionId: 'yufuin',
    regionLabel: '大分・由布院',
    stay: 'Minn 博多 Station East',
    jrPassDay: 3,
    jrTicketAdvice:
      '去程 08:00 出發搭「由布院之森」（全車指定席必提前搶票）或「由布」；回程搭 16:00 左右 JR 特急「由布」約 18:10 抵博多。',
    teammate1900Cutoff:
      '18:10 抵達博多站後，19:00 返飯店隊友買好晚餐外帶直接步行回 Minn 博多 Station East，19:00 準時上線。',
    highlights: [
      '由布院之森／由布號',
      '貓頭鷹之森林＆金鱗湖',
      '15:00 離峰吃由布釜飯 心（純現金）',
      'Ichimujin 渡邊通拉麵＆中洲屋台街',
    ],
    blocks: [
      {
        id: 'd3-1',
        timeRange: '08:00–14:55',
        title: '由布院鐵道移動、湯之坪街道、貓頭鷹之森林與金鱗湖',
        description:
          '08:00 自 Minn 博多出發，博多站搭乘 JR 特急「由布院之森」或「由布」前往由布院（11:25 抵達）。11:25–12:30 沿湯之坪街道一路逛往山邊；12:35–13:35 探訪湯布院貓頭鷹之森林（Yufuin Floral Village）；13:40–14:15 金鱗湖湖畔散步拍照；14:20–14:55 沿湯之坪街道悠閒逛回車站，順買 B-speak、金賞可樂餅等伴手禮。',
        categories: ['transport', 'sightseeing'],
        transportSummary: '08:00 飯店出發 ➔ 博多站搭「由布院之森」或「由布」➔ 11:25 抵由布院站',
        spots: [
          {
            name: 'JR 特急「由布院之森」/「由布」',
            jpName: '特急 ゆふいんの森 / ゆふ',
            note: '由布院之森全車指定席・必提前預訂',
            category: 'transport',
          },
          {
            name: '湯之坪街道（B-speak / 金賞可樂餅）',
            jpName: '湯の坪街道',
            note: '11:25 去程逛街・14:20 回程順買伴手禮',
            category: 'sightseeing',
          },
          {
            name: '湯布院貓頭鷹之森林',
            jpName: '湯布院フローラルヴィレッジ（フクロウの森）',
            note: '12:35–13:35 Yufuin Floral Village',
            category: 'sightseeing',
          },
          {
            name: '金鱗湖',
            jpName: '金鱗湖',
            note: '13:40–14:15 湖畔散步拍照',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd3-2',
        timeRange: '15:00–18:10',
        title: '離峰享用由布釜飯 心 湯布院站前店 & 搭特急「由布」返博多',
        description:
          '15:00–15:50 安排下午離峰午餐「由布釜飯 心 湯布院站前店」，避開正午排隊人潮且吃完下樓就是車站（注意：僅收日幣現金，請提前備妥現鈔）。16:00–18:10 搭乘 16:00 左右發車的 JR 特急「由布」返回博多站。',
        categories: ['dining', 'transport'],
        transportSummary: '15:50 下樓即抵由布院站 ➔ 16:00 JR 特急「由布」➔ 18:10 抵博多站',
        teammate1900Note:
          '18:10 抵達博多站後，19:00 返飯店隊友買好晚餐外帶直接步行回 Minn 博多 Station East，19:00 準時上線。',
        spots: [
          {
            name: '由布釜飯 心 湯布院站前店',
            jpName: '由布まぶし 心 由布院駅前支店',
            note: '15:00–15:50 離峰免排隊・僅收日幣現金',
            category: 'dining',
          },
          {
            name: 'JR 特急「由布」返博多',
            jpName: '特急 ゆふ（16:00 由布院 ➔ 18:10 博多）',
            note: '回程班次',
            category: 'transport',
          },
        ],
      },
      {
        id: 'd3-3',
        timeRange: '18:35–21:10',
        title: 'Ichimujin 渡邊通豚骨拉麵 & 中洲屋台街夜遊',
        description:
          '18:35–19:40 晚餐三人組搭計程車或地鐵前往「Ichimujin（いちむじん）渡邊通店」享用香醇豚骨拉麵。19:50–21:00 散步約 8 分鐘至中洲屋台街體驗福岡在地路邊攤氛圍、吃烤雞皮喝生啤（多數攤位僅收現金），21:10 搭計程車或地鐵返回 Minn 博多 Station East。',
        categories: ['dining', 'sports_entertainment'],
        transportSummary: '博多站 ➔ 計程車/地鐵至渡邊通 ➔ 步行 8 分至中洲屋台 ➔ 21:10 搭車返飯店',
        spots: [
          {
            name: 'Ichimujin（いちむじん）渡邊通店',
            jpName: '博多豚骨ラーメン いちむじん 渡辺通店',
            note: '18:35–19:40 晚餐三人組豚骨拉麵',
            category: 'dining',
          },
          {
            name: '中洲屋台街',
            jpName: '中洲屋台横丁',
            note: '19:50–21:00 烤雞皮・生啤・多數攤位僅收現金',
            category: 'dining',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 4,
    date: '2027/02/26',
    weekday: '五',
    shortTitle: '熊本城巡禮・上下通商店街・勝烈亭・AMU PLAZA 博多',
    routeSummary:
      '九州新幹線 ➔ 熊本城＆加藤神社＆城彩苑 ➔ 勝烈亭抽號＆上下通＆熊本熊廣場 ➔ 15:15 新幹線 ➔ AMU PLAZA 博多',
    regionId: 'kumamoto',
    regionLabel: '熊本市區',
    stay: 'Minn 博多 Station East',
    jrPassDay: 4,
    jrTicketAdvice:
      '使用 JR 北九州 5 日券預劃九州新幹線來回指定席（去程 08:00 出發、回程 15:15–16:00，單程約 35 分鐘）；熊本市區改搭熊本市電。',
    teammate1900Cutoff:
      '全團 15:15 搭新幹線 16:00 返博多，逛完 AMU PLAZA 後 18:00 步行返回飯店，19:00 隊友準時回房上線。',
    highlights: [
      '熊本城・加藤神社・城彩苑',
      '12:25 勝烈亭先抽號碼牌',
      '上下通商店街＆熊本熊廣場',
      '16:00–17:45 AMU PLAZA 博多採買',
    ],
    blocks: [
      {
        id: 'd4-1',
        timeRange: '08:00–12:15',
        title: '九州新幹線直達熊本：熊本城、加藤神社與城彩苑',
        description:
          '08:00–09:15 自 Minn 博多出發，於博多站搭乘九州新幹線抵達 JR 九州熊本站（車程約 35 分鐘）。09:45–12:15 轉乘熊本市電前往參觀熊本城，順路步行 3 分鐘拍攝加藤神社取景角度，再下山逛江戶城下町風情的櫻之馬場城彩苑。',
        categories: ['transport', 'sightseeing'],
        transportSummary: '08:00 出發 ➔ 九州新幹線約 35 分抵熊本站 ➔ 轉熊本市電往熊本城',
        spots: [
          {
            name: '熊本城',
            jpName: '熊本城 天守閣',
            note: '09:45–12:15 熊本市電直達',
            category: 'sightseeing',
          },
          {
            name: '加藤神社',
            jpName: '加藤神社',
            note: '順路步行 3 分鐘拍天守閣絕佳視角',
            category: 'sightseeing',
          },
          {
            name: '櫻之馬場 城彩苑',
            jpName: '桜の馬場 城彩苑',
            note: '下山順逛城下町美食伴手禮',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd4-2',
        timeRange: '12:25–15:05',
        title: '勝烈亭先抽號、上下通＆熊本熊廣場逛街與黑豚炸豬排午餐',
        description:
          '12:25 步行約 7 分鐘至「勝烈亭 新市街本店」，先於門口抽號碼牌並記下叫號進度。12:30–13:20 善用等位空檔散步逛旁邊的上下通商店街與熊本熊廣場（鶴屋百貨東館 1F）採買周邊；13:20–14:30 返回勝烈亭享用鹿兒島六白黑豚炸豬排午餐；14:40–15:05 從旁「辛島町站」搭熊本市電返回 JR 九州熊本站。',
        categories: ['dining', 'sightseeing', 'transport'],
        transportSummary: '城彩苑步行 7 分至勝烈亭 ➔ 14:40「辛島町站」搭熊本市電返 JR 熊本站',
        spots: [
          {
            name: '勝烈亭 新市街本店',
            jpName: '勝烈亭 新市街本店',
            note: '12:25 先抽號・13:20–14:30 享用鹿兒島六白黑豚炸豬排',
            category: 'dining',
          },
          {
            name: '上下通商店街',
            jpName: '上通・下通アーケード',
            note: '12:30–13:20 等位空檔散步採買',
            category: 'sightseeing',
          },
          {
            name: '熊本熊廣場（鶴屋百貨東館 1F）',
            jpName: 'くまモンスクエア（鶴屋百貨店東館 1F）',
            note: '採買熊本熊限定周邊',
            category: 'sightseeing',
          },
          {
            name: '熊本市電 辛島町站',
            jpName: '辛島町電停',
            note: '14:40–15:05 搭市電返熊本站',
            category: 'transport',
          },
        ],
      },
      {
        id: 'd4-3',
        timeRange: '15:15–18:00',
        title: '九州新幹線返博多、AMU PLAZA 博多採買與 18:00 返飯店',
        description:
          '15:15–16:00 搭乘九州新幹線返回博多站。16:00–17:45 逛博多站共構的 AMU PLAZA 博多採買電器、服飾與九州伴手禮；18:00 步行返回 Minn 博多 Station East。',
        categories: ['transport', 'sightseeing'],
        transportSummary: '15:15 熊本站搭九州新幹線 ➔ 16:00 抵博多站 ➔ 18:00 步行返飯店',
        teammate1900Note:
          '18:00 全團步行返回 Minn 博多（19:00 返飯店隊友準時回房上線），其餘三人晚上可於博多站周邊自由用餐。',
        spots: [
          {
            name: 'AMU PLAZA 博多',
            jpName: 'アミュプラザ博多',
            note: '16:00–17:45 電器、服飾、伴手禮採買',
            category: 'sightseeing',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 5,
    date: '2027/02/27',
    weekday: '六',
    shortTitle: '旦過市場內用大學丼・小倉賽馬場・吉塚鰻魚屋・唐吉訶德',
    routeSummary:
      '旦過市場內用大學丼 ➔ JRA 小倉賽馬場至 16:05 尾場 ➔ 16:50 特急返博多 ➔ 吉塚鰻魚屋 ➔ 唐吉訶德 中洲店',
    regionId: 'kitakyushu',
    regionLabel: '小倉・中洲',
    stay: 'Minn 博多 Station East',
    jrPassDay: 5,
    jrTicketAdvice:
      'JR 北九州 5 日券最終日！去程搭 08:50 特急 Sonic 至小倉，回程搭 16:50 特急 Sonic（17:45 抵博多）；小倉單軌電車另以 IC 卡／現金支付。',
    teammate1900Cutoff:
      '16:50 自小倉搭特急 Sonic（17:45 抵博多站），19:00 返飯店隊友（1 人）外帶晚餐步行回飯店，19:00 準時上線。',
    highlights: [
      '10:00 旦過市場內用大學丼（純現金）',
      'JRA 小倉賽馬場 11:05–16:05 尾場',
      '博多名代 吉塚鰻魚屋（18:05 抽號）',
      '唐吉訶德 中洲店退稅（帶護照正本）',
    ],
    blocks: [
      {
        id: 'd5-1',
        timeRange: '08:30–16:05',
        title: '旦過市場內用大學丼 & JRA 小倉賽馬場熱戰至 16:05 尾場',
        description:
          '08:30 自飯店出發，博多站搭 08:50 左右 JR 特急 Sonic 至小倉站（09:35 抵）。09:45–10:45 旦過市場內用早午餐：10:00 大學堂開門買白飯後，至市場各攤挑選生魚片、明太子、糠煮魚自組「大學丼」內用（純現金交易）。10:50 自單軌「旦過站」搭車直達「競馬場前站」，11:05 進入 JRA 小倉賽馬場，從第 3/4 場一路觀賽投注至 16:05 尾場結束。',
        categories: ['transport', 'dining', 'sports_entertainment'],
        transportSummary:
          '08:50 特急 Sonic 抵小倉 ➔ 旦過市場 ➔ 10:50 單軌「旦過站」直達「競馬場前站」',
        spots: [
          {
            name: '旦過市場 大學堂（內用大學丼）',
            jpName: '旦過市場 大学堂（ぬか炊き）',
            note: '10:00 開門買白飯自組內用・純現金交易',
            category: 'dining',
          },
          {
            name: 'JRA 小倉賽馬場',
            jpName: 'JRA 小倉競馬場（競馬場前駅）',
            note: '11:05–16:05 第 3/4 場至尾場熱戰',
            category: 'sports_entertainment',
          },
        ],
      },
      {
        id: 'd5-2',
        timeRange: '16:15–19:40',
        title: '收工返博多、17:45 分流與博多名代 吉塚鰻魚屋晚餐',
        description:
          '16:15 準時收工搭單軌回小倉站，轉乘 16:50 左右 JR 特急 Sonic（約 45 分鐘，17:45 抵博多站）。晚餐三人組於 17:45 抵博多站後直接搭計程車前往「博多名代 吉塚鰻魚屋」（約 18:05 到店抽號碼牌，避開 20:00 最後點餐截單風險）享用碳烤蒲燒鰻魚晚餐。',
        categories: ['transport', 'dining'],
        transportSummary:
          '16:15 單軌回小倉 ➔ 16:50 特急 Sonic（17:45 抵博多）➔ 計程車直奔吉塚鰻魚屋',
        teammate1900Note:
          '17:45 抵博多站後分流：19:00 返飯店隊友（1 人）外帶晚餐步行回 Minn 博多，19:00 準時上線；晚餐三人組搭計程車往吉塚鰻魚屋。',
        spots: [
          {
            name: '博多名代 吉塚鰻魚屋',
            jpName: '博多名代 吉塚うなぎ屋（中洲）',
            note: '約 18:05 到店抽號碼牌・避開 20:00 L.O. 截單',
            category: 'dining',
          },
        ],
      },
      {
        id: 'd5-3',
        timeRange: '19:45–21:20',
        title: '唐吉訶德 中洲店退稅採買 & 返飯店打包戰利品',
        description:
          '19:45–21:15 餐後步行 3 分鐘前往「唐吉訶德 中洲店」（Gate\'s 大樓 1 樓，24 小時營業），補齊藥妝零食與伴手禮，務必隨身攜帶護照正本辦理退稅並出示電子優惠券。21:20 於門口搭計程車返回 Minn 博多 Station East（車程約 6 分鐘），回房打包戰利品休息。',
        categories: ['sightseeing', 'transport'],
        transportSummary: '吉塚鰻魚屋步行 3 分至唐吉訶德中洲店 ➔ 21:20 計程車（6 分）返飯店',
        spots: [
          {
            name: '唐吉訶德 中洲店',
            jpName: 'ドン・キホーテ 中洲店（Gate\'s 1F）',
            note: '24H 營業・務必帶護照正本退稅＋電子優惠券',
            category: 'sightseeing',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 6,
    date: '2027/02/28',
    weekday: '日',
    shortTitle: '博多阪急最後採買・星宇 JX843 返台',
    routeSummary:
      '退房寄放行李 ➔ 09:30–11:30 博多阪急採買 ➔ 11:45 兩台計程車往機場 ➔ 星宇 JX843 返台',
    regionId: 'hakata',
    regionLabel: '博多・返程',
    stay: 'JX843 返台',
    jrTicketAdvice:
      'JR 5 日券已於 Day 5 屆滿；11:45 自飯店或博多站筑紫口分搭 2 台計程車（約 ¥1,600/台）直達福岡機場國際線航廈。',
    highlights: [
      '09:30–11:30 博多阪急最後採買',
      '11:45 分搭 2 台計程車（約 ¥1,600/台）',
      '起飛前 2.5 小時抵達機場登機',
      '星宇 JX843 返台',
    ],
    blocks: [
      {
        id: 'd6-1',
        timeRange: '09:30–11:30',
        title: '退房寄放行李 & 博多阪急最後伴手禮採買',
        description:
          '退房並將大件行李寄放於 Minn 博多 Station East（或拖至博多站寄物櫃），前往博多阪急百貨進行最後伴手禮補貨。',
        categories: ['sightseeing'],
        transportSummary: 'Minn 博多退房寄放行李 ➔ 步行 8 分至博多阪急',
        spots: [
          {
            name: 'Minn 博多 Station East',
            jpName: 'Minn 博多 Station East',
            note: '退房寄放行李（或使用博多站寄物櫃）',
            category: 'transport',
          },
          {
            name: '博多阪急百貨',
            jpName: '博多阪急',
            note: '09:30–11:30 最後伴手禮採買',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd6-2',
        timeRange: '11:45–返台',
        title: '分搭 2 台計程車直達福岡機場國際線 & 星宇 JX843 返台',
        description:
          '11:45 從飯店或博多站筑紫口分搭 2 台一般計程車（每台約 ¥1,600，車程僅 10–15 分鐘）直達福岡機場國際線航廈，請依星宇航空 JX843 實際起飛時間前 2.5 小時抵達辦理登機，滿載而歸平安返台。',
        categories: ['transport'],
        transportSummary:
          '11:45 飯店/筑紫口 ➔ 2 台計程車（¥1,600/台，10–15 分）➔ 福岡機場國際線 ➔ JX843',
        spots: [
          {
            name: '福岡機場國際線航廈',
            jpName: '福岡空港 国際線ターミナル',
            note: '起飛前 2.5 小時辦理登機',
            category: 'transport',
          },
          {
            name: '星宇航空 JX843',
            jpName: '福岡 FUK ➔ 桃園 TPE',
            note: '平安返台',
            category: 'transport',
          },
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
    route: '博多 ➔ 由布院（早班）',
    train: 'JR 特急「由布院之森」（全車指定席）',
    priority: '必搶指定席',
    bookingNote: '乘車日前 1 個月（2027/01/25 台灣時間 09:00）線上準時搶劃，確保 11:25 前抵由布院。',
    defaultBooked: false,
  },
  {
    id: 'seat-2',
    slotNumber: 2,
    dayNumber: 3,
    route: '由布院 ➔ 博多（16:00）',
    train: 'JR 特急「由布」',
    priority: '必搶指定席',
    bookingNote: '16:00 出發、約 18:10 抵博多站，讓 19:00 隊友準時回房並銜接渡邊通晚餐。',
    defaultBooked: false,
  },
  {
    id: 'seat-3',
    slotNumber: 3,
    dayNumber: 4,
    route: '博多 ➔ 熊本（08:00 出發）',
    train: '九州新幹線（車程約 35 分）',
    priority: '建議預劃',
    bookingNote: '使用免費指定席額度預先劃位，4 人同行坐相鄰座位直達 JR 熊本站。',
    defaultBooked: false,
  },
  {
    id: 'seat-4',
    slotNumber: 4,
    dayNumber: 4,
    route: '熊本 ➔ 博多（15:15–16:00）',
    train: '九州新幹線',
    priority: '建議預劃',
    bookingNote: '全團 15:15 搭乘九州新幹線返博多（16:00 抵），接續逛 AMU PLAZA 博多。',
    defaultBooked: false,
  },
  {
    id: 'seat-5',
    slotNumber: 5,
    dayNumber: 2,
    route: '博多 ↔ 小倉（選用）',
    train: 'JR 特急 Sonic',
    priority: '彈性保留',
    bookingNote: '08:00 去程或 16:00 / 21:45 回程可搭自由席，此額度可保留視人潮使用。',
    defaultBooked: false,
  },
  {
    id: 'seat-6',
    slotNumber: 6,
    dayNumber: 5,
    route: '小倉 ➔ 博多（16:50 選用）',
    train: 'JR 特急 Sonic',
    priority: '彈性保留',
    bookingNote: '週六賽馬尾場結束後 16:50 返博多（17:45 抵），可先劃位確保有座直奔吉塚鰻魚屋。',
    defaultBooked: false,
  },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    group: '交通與搶票',
    title: '線上搶劃 Day 3「由布院之森」與 JR 5 日券指定席',
    detail: 'JR 北九州 5 日券含 6 次免費指定席，Day 3 由布院之森全車指定席務必於 1 個月前 09:00 開搶。',
    deadline: '2027/01/25 09:00',
  },
  {
    id: 'chk-2',
    group: '交通與搶票',
    title: '預購 JR 北九州鐵路周遊券（5 日版，02/23–02/27）',
    detail: 'Day 1 11:30–13:30 於博多站兌換／啟用並領取預劃指定席車票。',
    deadline: '出發前完成',
  },
  {
    id: 'chk-3',
    group: '住宿與賽事',
    title: '提前預約 Day 1「燒肉・冷麵 大東園 本店」與 Day 2 B.LEAGUE 籃球賽門票',
    detail: 'Day 1 17:45 晚餐時段建議事先訂位；Day 2 19:00 福岡新銳 vs 埼玉野馬球票提前購妥。',
    deadline: '出發前完成',
  },
  {
    id: 'chk-4',
    group: '行前票券',
    title: '備妥純現金店家日幣現鈔與零錢',
    detail: 'Day 3「由布釜飯 心」、Day 5「旦過市場」、以及「中洲屋台街」多數攤位僅收日幣現金。',
    deadline: '出發前換匯',
  },
  {
    id: 'chk-5',
    group: '行前票券',
    title: '確認 Day 5 唐吉訶德 中洲店免稅護照正本＆電子優惠券',
    detail: '辦理免稅退稅務必隨身攜帶護照正本（不可用影本或照片），並先存好唐吉訶德電子優惠券。',
    deadline: 'Day 5 必帶',
  },
  {
    id: 'chk-6',
    group: '住宿與賽事',
    title: '確認星宇 JX842 / JX843 航班與 Minn 博多五晚連住憑證',
    detail: '去程 10:00 抵福岡；回程起飛前 2.5 小時抵達機場。飯店地址：福岡市博多区博多駅東2-17-12。',
    deadline: '出發前 48 小時',
  },
];

export const INITIAL_PACKING_ITEMS: PackingItem[] = [
  {
    id: 'pack-1',
    category: '證件票券',
    title: '護照正本（效期 6 個月以上・Day 5 退稅必隨身攜帶）',
    note: '兌換 JR 北九州 5 日券與 Day 5 唐吉訶德中洲店免稅退稅均須出示正本（影本或照片無效）。',
    essential: true,
  },
  {
    id: 'pack-2',
    category: '證件票券',
    title: '足夠日幣現鈔零錢、信用卡與交通 IC 卡',
    note: 'Day 3 由布釜飯 心、Day 5 旦過市場、中洲屋台街與賽馬投注皆以現金為主；Suica/ICOCA 搭熊本市電與小倉單軌。',
    essential: true,
  },
  {
    id: 'pack-3',
    category: '證件票券',
    title: 'eSIM / 漫遊網路、數位憑證與唐吉訶德電子優惠券',
    note: '星宇 JX842/843 機票、Minn 博多訂房單、JR Pass 憑證、B.LEAGUE 門票與唐吉訶德優惠券。',
    essential: true,
  },
  {
    id: 'pack-4',
    category: '保暖穿搭',
    title: '防風羽絨外套或厚大衣',
    note: 'Day 3 由布院早晚近 0°C、Day 2 門司港海風、Day 3 夜間中洲屋台與 Day 5 賽馬場看台必備。',
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
    note: '門司港 11:00 吊橋開橋與由布院金鱗湖畔散步時特別實用。',
  },
  {
    id: 'pack-7',
    category: '保暖穿搭',
    title: '好走防滑步行鞋與厚襪',
    note: '每日步行量高（運河城、川端通、湯之坪、熊本城、上下通與博多站商場）。',
  },
  {
    id: 'pack-8',
    category: '3C與日用',
    title: '行動電源（限隨身手提登機，勿託運）',
    note: '查車班、導航、勝烈亭／吉塚抽號進度與全日拍照用電量高，建議備 10,000mAh 以上。',
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
    note: 'Day 4 AMU PLAZA、Day 5 唐吉訶德中洲店與 Day 6 博多阪急補貨使用。',
  },
];
