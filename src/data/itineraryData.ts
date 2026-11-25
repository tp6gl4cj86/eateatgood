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
  edition: '2027 九州自由行定稿版',
  title: '日本九州 6 天 5 夜自由行',
  dateRange: '2027/02/22（一）行前派對 · 02/23（二）– 02/28（日）',
  durationText: 'Day 0 開趴 + 6 天 5 夜 · 4 人同行',
  members: ['假髮', '班表人', '尼哥', '跟隨俠'] as const,
  passName: 'JR 北九州鐵路周遊券（5 日版）',
  passDetail: '02/23–02/27 連續 5 日使用，含 6 次免費指定席',
  flights: {
    outbound: {
      code: 'JX842',
      airline: '星宇航空 STARLUX',
      date: '2027/02/23（二）',
      from: '桃園 TPE',
      to: '福岡 FUK',
      departTime: '07:45',
      arriveTime: '11:00',
      duration: '約 2 小時 15 分',
      note: '國際線 1F 搭 2 台計程車（約 ¥1,600/台）或 2 號站牌 ¥310 巴士',
    },
    inbound: {
      code: 'JX843',
      airline: '星宇航空 STARLUX',
      date: '2027/02/28（日）',
      from: '福岡 FUK',
      to: '桃園 TPE',
      departTime: '12:10',
      arriveTime: '13:50',
      duration: '約 2 小時 40 分',
      note: '11:45 分搭 2 台計程車（約 ¥1,600/台，10–15 分），起飛前 2.5 小時報到',
    },
  },
  hotel: {
    name: 'Minn 博多 Station East',
    jpName: 'Minn 博多 Station East（ミン 博多 ステーションイースト）',
    addressJp: '福岡市博多区博多駅東2-17-12',
    postal: '〒812-0013',
    access: '博多站筑紫口步行 8 分',
    nights: '5 晚連住（02/23–02/28）',
    taxiEstimate: '機場計程車直達約 10 分（約 ¥1,600/台）',
  },
};

export const RAIL_DESTINATIONS: RailDestination[] = [
  {
    id: 'hakata',
    name: '博多・福岡市區',
    jpName: '博多 / 福岡空港',
    subtitle: '5 晚住宿與鐵道樞紐',
    days: [1, 3, 4, 5, 6],
    trainName: '機場計程車 / 巴士 / 市區地鐵',
    duration: '機場至飯店 10–15 分',
    seatRecommendation: '4 人含大行李分搭 2 台計程車（約 ¥1,600/台）',
    keyStops: [
      'Minn 博多 Station East',
      'ShinShin 拉麵・運河城・川端通',
      '大東園本店・Plaza 博多',
      'Ichimujin・中洲屋台・いとおかし',
      '吉塚鰻魚屋・唐吉訶德・博多阪急',
    ],
    x: 248,
    y: 182,
  },
  {
    id: 'kitakyushu',
    name: '小倉・門司港',
    jpName: '小倉 / 門司港',
    subtitle: '門司港開橋、B.LEAGUE 籃球、旦過市場與賽馬場',
    days: [2, 5],
    trainName: 'JR 特急 Sonic + 鹿兒島本線 / 單軌',
    duration: '博多至小倉 45–50 分',
    seatRecommendation: '自由席即可（北九州券不含山陽新幹線）',
    keyStops: [
      '九州鐵道紀念館・11:00 藍翼吊橋',
      '燒咖哩 Koganemushi',
      '魚町＆京町銀天街・Aruaru City',
      '北九州市立綜合體育館',
      '旦過市場・JRA 小倉賽馬場',
    ],
    x: 378,
    y: 92,
  },
  {
    id: 'yufuin',
    name: '由布院',
    jpName: '由布院駅',
    subtitle: '湯之坪、貓頭鷹之森林、金鱗湖與站前釜飯心',
    days: [3],
    trainName: 'JR 特急「由布院之森」/「由布」',
    duration: '單程約 2 小時 10–15 分',
    seatRecommendation: '由布院之森全車指定席，1 個月前 09:00 必搶',
    keyStops: [
      '湯之坪街道（B-speak / 可樂餅）',
      '湯布院貓頭鷹之森林',
      '金鱗湖',
      '由布釜飯 心 站前店（純現金）',
    ],
    x: 416,
    y: 242,
  },
  {
    id: 'kumamoto',
    name: '熊本',
    jpName: '熊本駅',
    subtitle: '熊本城、上下通商店街與勝烈亭炸豬排',
    days: [4],
    trainName: '九州新幹線',
    duration: '博多直達 35–40 分',
    seatRecommendation: '用 5 日券預劃來回指定席（15:15 返博多）',
    keyStops: [
      '熊本城・加藤神社',
      '櫻之馬場 城彩苑',
      '上下通・熊本熊廣場',
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
    routeSummary: '全員集結 ➔ 樂HOUSE社區 ➔ 披薩開趴＆行前確認',
    regionId: 'taiwan',
    regionLabel: '行前派對',
    stay: '台灣・出發前夕',
    jrTicketAdvice: '核對護照正本、eSIM、日幣現鈔零錢與隔日 JX842 機場集合時間。',
    highlights: ['樂house 披薩開趴', '4 人全員集結', '核對護照與現鈔'],
    blocks: [
      {
        id: 'd0-1',
        timeRange: '出發前夜',
        title: '樂house 披薩開趴＆行前確認',
        description:
          '19:00 假髮、班表人、尼哥、跟隨俠於「樂HOUSE社區」集合開趴\n21:00 核對護照正本、eSIM、純現金店家日幣現鈔與隔日機場集合時間',
        categories: ['dining', 'sports_entertainment'],
        spots: [
          {
            name: '樂HOUSE社區',
            jpName: '樂house',
            note: '4 人行前集結',
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
    shortTitle: '抵達福岡・市區半日遊・大東園・Plaza 博多',
    routeSummary: '福岡機場 ➔ 換 JR 券＆ShinShin ➔ 運河城＆川端通 ➔ 大東園 ➔ Plaza 博多',
    regionId: 'hakata',
    regionLabel: '福岡・博多',
    stay: 'Minn 博多 Station East',
    jrPassDay: 1,
    jrTicketAdvice: '11:30–13:30 飯店寄行李後，至博多站兌換 JR 北九州 5 日券與預劃指定席票。',
    teammate1900Cutoff: '18:45 中洲川端路口搭計程車（6 分）回飯店，19:00 上線。',
    highlights: ['JX842 10:00 抵福岡', 'ShinShin 拉麵', '大東園燒肉', 'Plaza 博多'],
    blocks: [
      {
        id: 'd1-1',
        timeRange: '10:00–13:30',
        title: '抵福岡機場・寄行李・兌換 JR 5 日券',
        description:
          '10:00–11:30 星宇 JX842 抵國際線 ➔ 視 2 號站牌人潮，分搭 2 台計程車（¥1,600/台，10 分）或 ¥310 直達巴士\n11:30–13:30 Minn 博多寄行李 ➔ 步行至博多站兌換 JR 北九州 5 日券＆領取指定席票',
        categories: ['transport'],
        spots: [
          {
            name: '福岡機場國際線',
            jpName: '福岡空港 国際線ターミナル',
            note: '1F 計程車 / 2 號巴士站',
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
            note: '兌換北九州 5 日券＆指定席',
            category: 'transport',
          },
        ],
      },
      {
        id: 'd1-2',
        timeRange: '13:45–17:35',
        title: 'ShinShin 拉麵・博多運河城・川端通商店街',
        description:
          '13:45–14:45 午餐：博多拉麵 ShinShin 博多DEITOS店（筑紫口側）\n15:00–16:30 步行逛博多運河城\n16:35–17:35 漫步川端通商店街，往中洲川端移動',
        categories: ['dining', 'sightseeing'],
        spots: [
          {
            name: 'ShinShin 博多DEITOS店',
            jpName: '博多らーめん ShinShin 博多デイトス店',
            note: '13:45 午餐・筑紫口側',
            category: 'dining',
          },
          {
            name: '博多運河城',
            jpName: 'キャナルシティ博多',
            note: '15:00–16:30',
            category: 'sightseeing',
          },
          {
            name: '川端通商店街',
            jpName: '川端通商店街',
            note: '16:35–17:35 往中洲川端',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd1-3',
        timeRange: '17:45–22:30',
        title: '大東園燒肉晚餐 & Plaza 博多',
        description:
          '17:45–18:45 晚餐：燒肉・冷麵 大東園 本店（建議事先訂位）\n19:00–22:30 其餘三人至筑紫口對面 Plaza 博多打柏青哥／Slot，結束步行回飯店',
        categories: ['dining', 'sports_entertainment'],
        teammate1900Note: '18:45 中洲川端路口搭計程車（約 6 分）返飯店，19:00 上線。',
        spots: [
          {
            name: '燒肉・冷麵 大東園 本店',
            jpName: '焼肉の大東園 本店',
            note: '17:45 晚餐・建議預約',
            category: 'dining',
          },
          {
            name: 'Plaza 博多',
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
    shortTitle: '門司港開橋・燒咖哩・小倉・B.LEAGUE 籃球賽',
    routeSummary: '鐵道紀念館 ➔ 11:00 開橋＆展望室 ➔ 燒咖哩 ➔ 小倉銀天街＆Aruaru ➔ B.LEAGUE',
    regionId: 'kitakyushu',
    regionLabel: '門司港・小倉',
    stay: 'Minn 博多 Station East',
    jrPassDay: 2,
    jrTicketAdvice: '博多搭特急 Sonic 至小倉轉普通車往門司港；晚間往返體育館搭球團免費接駁車。',
    teammate1900Cutoff: '16:00 小倉站搭特急 Sonic 返博多（16:50 抵），19:00 上線。',
    highlights: ['鐵道館 ¥310', '11:00 藍翼開橋', 'Koganemushi 燒咖哩', '19:00 B.LEAGUE'],
    blocks: [
      {
        id: 'd2-1',
        timeRange: '08:00–13:00',
        title: '門司港鐵道館・11:00 藍翼開橋・Koganemushi 燒咖哩',
        description:
          '08:00–09:10 博多站搭特急 Sonic 至小倉，轉普通車抵門司港\n09:15–10:30 九州鐵道紀念館（步行 3 分，門票 ¥310）\n10:30–11:35 11:00 藍翼吊橋開橋 ➔ 浮棧橋跡 ➔ 31F 懷舊展望室（¥300）\n11:45–13:00 午餐：燒咖哩 Koganemushi（こがねむし）',
        categories: ['transport', 'sightseeing', 'dining'],
        spots: [
          {
            name: '九州鐵道紀念館',
            jpName: '九州鉄道記念館',
            note: '09:15–10:30・門票 ¥310',
            category: 'sightseeing',
          },
          {
            name: '藍翼門司吊橋＆浮棧橋跡',
            jpName: 'ブルーウィングもじ',
            note: '11:00 整點開橋秀',
            category: 'sightseeing',
          },
          {
            name: '門司港懷舊展望室（31F）',
            jpName: '門司港レトロ展望室',
            note: '俯瞰關門大橋・¥300',
            category: 'sightseeing',
          },
          {
            name: '燒咖哩 Koganemushi',
            jpName: 'こがねむし',
            note: '11:45–13:00 午餐',
            category: 'dining',
          },
        ],
      },
      {
        id: 'd2-2',
        timeRange: '13:15–18:00',
        title: '小倉銀天街・Aruaru City・16:00 分流與賽前餐',
        description:
          '13:15–15:45 JR 普通車返小倉 ➔ 逛魚町＆京町銀天街、Aruaru City（模型、扭蛋、街機）\n16:15–17:45 看球三人組提早晚餐（小倉鐵鍋餃／燒烏龍／拉麵）＋飲料補給\n18:00（最晚 18:30）JR 小倉站指定乘車處搭免費接駁車（20 分直達體育館）',
        categories: ['sightseeing', 'dining', 'transport'],
        teammate1900Note: '16:00（1 人）於小倉站搭特急 Sonic 返博多（約 16:50 抵），回飯店 19:00 上線。',
        spots: [
          {
            name: '魚町＆京町銀天街',
            jpName: '魚町銀天街・京町銀天街',
            note: '13:15–15:45 商店街',
            category: 'sightseeing',
          },
          {
            name: 'Aruaru City',
            jpName: 'あるあるCity',
            note: '模型、扭蛋、街機',
            category: 'sightseeing',
          },
          {
            name: '小倉站周邊賽前晚餐',
            jpName: '小倉駅周辺（鉄なべ餃子・焼うどん）',
            note: '16:15–17:45 三人提早晚餐',
            category: 'dining',
          },
        ],
      },
      {
        id: 'd2-3',
        timeRange: '18:20–22:45',
        title: 'B.LEAGUE 籃球賽（福岡新銳 vs 埼玉野馬）',
        description:
          '18:20–21:15 北九州市立綜合體育館進場，觀看 19:00 開打 B.LEAGUE\n21:25–22:45 門口搭免費接駁車（21:25 起每 5 分一班）回小倉站 ➔ 轉特急 Sonic 返博多',
        categories: ['sports_entertainment', 'transport'],
        spots: [
          {
            name: '北九州市立綜合體育館',
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
    shortTitle: '由布院・站前釜飯心・渡邊通拉麵・中洲屋台',
    routeSummary: '由布院之森 ➔ 湯之坪＆貓頭鷹＆金鱗湖 ➔ 15:00 釜飯心 ➔ Ichimujin ➔ 中洲屋台',
    regionId: 'yufuin',
    regionLabel: '大分・由布院',
    stay: 'Minn 博多 Station East',
    jrPassDay: 3,
    jrTicketAdvice: '去程搭「由布院之森」（全車指定席必搶）或「由布」；回程搭 16:00 特急「由布」。',
    teammate1900Cutoff: '18:10 抵博多站後外帶晚餐步行回飯店，19:00 上線。',
    highlights: ['由布院之森', '貓頭鷹之森林＆金鱗湖', '釜飯心（純現金）', '中洲屋台街'],
    blocks: [
      {
        id: 'd3-1',
        timeRange: '08:00–14:55',
        title: '由布院特急・湯之坪街道・貓頭鷹之森林・金鱗湖',
        description:
          '08:00–11:25 博多站搭特急「由布院之森」或「由布」抵由布院\n11:25–12:30 沿湯之坪街道逛往山邊\n12:35–13:35 湯布院貓頭鷹之森林（Yufuin Floral Village）\n13:40–14:15 金鱗湖湖畔散步\n14:20–14:55 逛回車站，順買 B-speak、金賞可樂餅',
        categories: ['transport', 'sightseeing'],
        spots: [
          {
            name: 'JR 特急「由布院之森」/「由布」',
            jpName: '特急 ゆふいんの森 / ゆふ',
            note: '由布院之森全車指定席',
            category: 'transport',
          },
          {
            name: '湯之坪街道',
            jpName: '湯の坪街道',
            note: 'B-speak・金賞可樂餅',
            category: 'sightseeing',
          },
          {
            name: '湯布院貓頭鷹之森林',
            jpName: '湯布院フローラルヴィレッジ',
            note: '12:35–13:35',
            category: 'sightseeing',
          },
          {
            name: '金鱗湖',
            jpName: '金鱗湖',
            note: '13:40–14:15',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd3-2',
        timeRange: '15:00–18:10',
        title: '站前店由布釜飯 心（離峰）& 搭特急返博多',
        description:
          '15:00–15:50 離峰午餐：由布釜飯 心 湯布院站前店（免排隊、僅收現金、下樓即車站）\n16:00–18:10 搭 16:00 特急「由布」返回博多站',
        categories: ['dining', 'transport'],
        teammate1900Note: '18:10 抵博多站買外帶直接步行回飯店，19:00 上線。',
        spots: [
          {
            name: '由布釜飯 心 湯布院站前店',
            jpName: '由布まぶし 心 由布院駅前支店',
            note: '15:00 離峰・僅收現金',
            category: 'dining',
          },
          {
            name: 'JR 特急「由布」',
            jpName: '特急 ゆふ（16:00 ➔ 18:10）',
            note: '由布院 ➔ 博多',
            category: 'transport',
          },
        ],
      },
      {
        id: 'd3-3',
        timeRange: '18:35–21:10',
        title: 'Ichimujin 渡邊通拉麵 & 中洲屋台街',
        description:
          '18:35–19:40 三人組搭計程車／地鐵往 Ichimujin 渡邊通店吃豚骨拉麵\n19:50–21:00 步行 8 分至中洲屋台街吃烤雞皮、喝生啤（多數僅收現金）\n21:10 搭計程車／地鐵返 Minn 博多',
        categories: ['dining', 'sports_entertainment'],
        spots: [
          {
            name: 'Ichimujin 渡邊通店',
            jpName: '博多豚骨ラーメン いちむじん 渡辺通店',
            note: '18:35–19:40 豚骨拉麵',
            category: 'dining',
          },
          {
            name: '中洲屋台街',
            jpName: '中洲屋台横丁',
            note: '19:50–21:00・多數純現金',
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
    shortTitle: '熊本城・勝烈亭・AMU PLAZA・いとおかし晚餐',
    routeSummary: '九州新幹線 ➔ 熊本城＆城彩苑 ➔ 勝烈亭＆上下通 ➔ AMU PLAZA ➔ 魚ト肴 いとおかし',
    regionId: 'kumamoto',
    regionLabel: '熊本・博多',
    stay: 'Minn 博多 Station East',
    jrPassDay: 4,
    jrTicketAdvice: '預劃九州新幹線來回指定席（單程約 35 分，15:15 返博多）；熊本市內搭市電。',
    teammate1900Cutoff: '18:00 全團返抵飯店（1 人上線），其餘三人往春吉吃魚ト肴 いとおかし。',
    highlights: ['熊本城＆加藤神社', '12:25 勝烈亭抽號', 'AMU PLAZA', '魚ト肴 いとおかし'],
    blocks: [
      {
        id: 'd4-1',
        timeRange: '08:00–12:15',
        title: '九州新幹線・熊本城・加藤神社・城彩苑',
        description:
          '08:00–09:15 博多站搭九州新幹線抵熊本站（車程約 35 分）\n09:45–12:15 轉熊本市電逛熊本城 ➔ 步行 3 分拍加藤神社 ➔ 下山逛櫻之馬場城彩苑',
        categories: ['transport', 'sightseeing'],
        spots: [
          {
            name: '熊本城',
            jpName: '熊本城 天守閣',
            note: '09:45–12:15',
            category: 'sightseeing',
          },
          {
            name: '加藤神社',
            jpName: '加藤神社',
            note: '步行 3 分拍天守閣',
            category: 'sightseeing',
          },
          {
            name: '櫻之馬場 城彩苑',
            jpName: '桜の馬場 城彩苑',
            note: '下山順逛',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd4-2',
        timeRange: '12:25–15:05',
        title: '勝烈亭抽號・上下通＆熊本熊廣場・炸豬排午餐',
        description:
          '12:25 步行 7 分至勝烈亭 新市街本店先抽號碼牌\n12:30–13:20 等位空檔逛上下通商店街＆熊本熊廣場（鶴屋東館 1F）\n13:20–14:30 返回勝烈亭吃六白黑豚炸豬排\n14:40–15:05 自「辛島町站」搭市電返 JR 熊本站',
        categories: ['dining', 'sightseeing', 'transport'],
        spots: [
          {
            name: '勝烈亭 新市街本店',
            jpName: '勝烈亭 新市街本店',
            note: '12:25 抽號・13:20 午餐',
            category: 'dining',
          },
          {
            name: '上下通商店街',
            jpName: '上通・下通アーケード',
            note: '12:30–13:20 等位逛街',
            category: 'sightseeing',
          },
          {
            name: '熊本熊廣場',
            jpName: 'くまモンスクエア（鶴屋東館 1F）',
            note: '限定周邊',
            category: 'sightseeing',
          },
          {
            name: '辛島町電停',
            jpName: '辛島町電停',
            note: '14:40 搭市電返熊本站',
            category: 'transport',
          },
        ],
      },
      {
        id: 'd4-3',
        timeRange: '15:15–18:00',
        title: '新幹線返博多・AMU PLAZA 採買・返飯店',
        description:
          '15:15–16:00 搭九州新幹線返博多站\n16:00–17:45 逛 AMU PLAZA 博多（電器、服飾、伴手禮）\n18:00 步行返 Minn 博多放戰利品',
        categories: ['transport', 'sightseeing'],
        teammate1900Note: '18:00 全團返飯店（19:00 隊友上線），三人隨後往春吉晚餐。',
        spots: [
          {
            name: 'AMU PLAZA 博多',
            jpName: 'アミュプラザ博多',
            note: '16:00–17:45 採買',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd4-4',
        timeRange: '18:30–20:30',
        title: '晚餐三人組：魚ト肴 いとおかし（Itookashi）',
        description:
          '18:30 自飯店搭計程車（約 8 分）或地鐵至春吉「魚ト肴 いとおかし」\n主打九州現撈刺身拼盤、胡麻鯖魚與海鮮料理（建議提前預約）',
        categories: ['dining'],
        spots: [
          {
            name: '魚ト肴 いとおかし',
            jpName: '魚ト肴 いとおかし（春吉）',
            note: '九州鮮魚・胡麻鯖魚・建議預約',
            category: 'dining',
            mapUrl: 'https://maps.app.goo.gl/dr1dSXpLaZt5vATG9',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 5,
    date: '2027/02/27',
    weekday: '六',
    shortTitle: '旦過大學丼・小倉賽馬場・吉塚鰻魚・唐吉訶德',
    routeSummary: '旦過市場大學丼 ➔ 小倉賽馬場至尾場 ➔ 16:50 返博多 ➔ 吉塚鰻魚屋 ➔ 唐吉訶德',
    regionId: 'kitakyushu',
    regionLabel: '小倉・中洲',
    stay: 'Minn 博多 Station East',
    jrPassDay: 5,
    jrTicketAdvice: 'JR 5 日券最終日：去程 08:50、回程 16:50 特急 Sonic；小倉單軌刷 IC 卡／現金。',
    teammate1900Cutoff: '17:45 抵博多站外帶晚餐步行回飯店，19:00 上線。',
    highlights: ['旦過大學丼（純現金）', '小倉賽馬場至 16:05', '18:05 吉塚抽號', '唐吉訶德退稅'],
    blocks: [
      {
        id: 'd5-1',
        timeRange: '08:30–16:05',
        title: '旦過市場內用大學丼 & JRA 小倉賽馬場',
        description:
          '08:30–09:35 博多站搭 08:50 特急 Sonic 至小倉\n09:45–10:45 旦過市場：10:00 大學堂買白飯，各攤挑生魚片／明太子／糠煮魚內用（純現金）\n10:50–16:05 單軌「旦過站」➔「競馬場前站」，11:05 進場觀賽投注至 16:05 尾場',
        categories: ['transport', 'dining', 'sports_entertainment'],
        spots: [
          {
            name: '旦過市場 大學堂',
            jpName: '旦過市場 大学堂',
            note: '10:00 開門內用大學丼・純現金',
            category: 'dining',
          },
          {
            name: 'JRA 小倉賽馬場',
            jpName: 'JRA 小倉競馬場',
            note: '11:05–16:05 尾場結束',
            category: 'sports_entertainment',
          },
        ],
      },
      {
        id: 'd5-2',
        timeRange: '16:15–19:40',
        title: '收工返博多・17:45 分流・吉塚鰻魚屋',
        description:
          '16:15 搭單軌返小倉 ➔ 轉 16:50 特急 Sonic（17:45 抵博多）\n17:45 三人組直接搭計程車往「博多名代 吉塚鰻魚屋」（約 18:05 抽號，避開 20:00 截單）',
        categories: ['transport', 'dining'],
        teammate1900Note: '17:45 抵博多站後（1 人）外帶晚餐步行返飯店，19:00 上線。',
        spots: [
          {
            name: '博多名代 吉塚鰻魚屋',
            jpName: '博多名代 吉塚うなぎ屋',
            note: '18:05 抽號・20:00 L.O.',
            category: 'dining',
          },
        ],
      },
      {
        id: 'd5-3',
        timeRange: '19:45–21:20',
        title: '唐吉訶德 中洲店退稅採買',
        description:
          '19:45–21:15 步行 3 分至唐吉訶德 中洲店（Gate\'s 1F，24H）➔ 必帶護照正本退稅＋電子優惠券\n21:20 門口搭計程車（6 分）回 Minn 博多打包戰利品',
        categories: ['sightseeing', 'transport'],
        spots: [
          {
            name: '唐吉訶德 中洲店',
            jpName: 'ドン・キホーテ 中洲店（Gate\'s 1F）',
            note: '24H・帶護照正本退稅＋優惠券',
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
    shortTitle: '博多阪急採買・星宇 JX843 返台',
    routeSummary: '退房寄行李 ➔ 博多阪急補貨 ➔ 11:45 計程車往機場 ➔ JX843 返台',
    regionId: 'hakata',
    regionLabel: '博多・返程',
    stay: 'JX843 返台',
    jrTicketAdvice: 'JR 5 日券已屆滿；11:45 分搭 2 台計程車（¥1,600/台）直達機場。',
    highlights: ['09:30–11:30 博多阪急', '11:45 兩台計程車', '起飛前 2.5h 報到', 'JX843 返台'],
    blocks: [
      {
        id: 'd6-1',
        timeRange: '09:30–11:30',
        title: '退房寄行李 & 博多阪急最後採買',
        description:
          '09:30 退房寄行李於飯店（或博多站寄物櫃）\n09:30–11:30 逛博多阪急補齊伴手禮',
        categories: ['sightseeing'],
        spots: [
          {
            name: 'Minn 博多 Station East',
            jpName: 'Minn 博多 Station East',
            note: '退房寄放行李',
            category: 'transport',
          },
          {
            name: '博多阪急百貨',
            jpName: '博多阪急',
            note: '09:30–11:30 最後採買',
            category: 'sightseeing',
          },
        ],
      },
      {
        id: 'd6-2',
        timeRange: '11:45–返台',
        title: '搭計程車往機場 & 星宇 JX843 返台',
        description:
          '11:45 飯店／筑紫口分搭 2 台計程車（¥1,600/台，10–15 分）直達國際線航廈\n依 JX843 實際起飛前 2.5 小時報到登機返台',
        categories: ['transport'],
        spots: [
          {
            name: '福岡機場國際線',
            jpName: '福岡空港 国際線ターミナル',
            note: '起飛前 2.5 小時報到',
            category: 'transport',
          },
          {
            name: '星宇航空 JX843',
            jpName: '福岡 FUK ➔ 桃園 TPE',
            note: '返台航班',
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
    bookingNote: '2027/01/25 台灣時間 09:00 準時搶劃。',
    defaultBooked: false,
  },
  {
    id: 'seat-2',
    slotNumber: 2,
    dayNumber: 3,
    route: '由布院 ➔ 博多（16:00）',
    train: 'JR 特急「由布」',
    priority: '必搶指定席',
    bookingNote: '16:00 發車、18:10 抵博多，銜接分流與晚餐。',
    defaultBooked: false,
  },
  {
    id: 'seat-3',
    slotNumber: 3,
    dayNumber: 4,
    route: '博多 ➔ 熊本（08:00）',
    train: '九州新幹線（約 35 分）',
    priority: '建議預劃',
    bookingNote: '4 人相鄰座位直達 JR 熊本站。',
    defaultBooked: false,
  },
  {
    id: 'seat-4',
    slotNumber: 4,
    dayNumber: 4,
    route: '熊本 ➔ 博多（15:15）',
    train: '九州新幹線',
    priority: '建議預劃',
    bookingNote: '16:00 抵博多，銜接 AMU PLAZA 採買。',
    defaultBooked: false,
  },
  {
    id: 'seat-5',
    slotNumber: 5,
    dayNumber: 2,
    route: '博多 ↔ 小倉（選用）',
    train: 'JR 特急 Sonic',
    priority: '彈性保留',
    bookingNote: '可搭自由席，此額度視人潮保留。',
    defaultBooked: false,
  },
  {
    id: 'seat-6',
    slotNumber: 6,
    dayNumber: 5,
    route: '小倉 ➔ 博多（16:50）',
    train: 'JR 特急 Sonic',
    priority: '彈性保留',
    bookingNote: '賽馬尾場後 17:45 抵博多，先劃位保底有座。',
    defaultBooked: false,
  },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    group: '交通與搶票',
    title: '搶劃 Day 3「由布院之森」與指定席',
    detail: '1 個月前台灣時間 09:00 準時開搶。',
    deadline: '2027/01/25 09:00',
  },
  {
    id: 'chk-2',
    group: '交通與搶票',
    title: '預購 JR 北九州 5 日券（02/23–02/27）',
    detail: 'Day 1 11:30–13:30 博多站兌換並領取指定席票。',
    deadline: '出發前完成',
  },
  {
    id: 'chk-3',
    group: '住宿與賽事',
    title: '訂位大東園、いとおかし & 買 B.LEAGUE 球票',
    detail: 'Day 1 17:45 大東園、Day 4 晚間いとおかし訂位；預購 Day 2 籃球票。',
    deadline: '出發前完成',
  },
  {
    id: 'chk-4',
    group: '行前票券',
    title: '備妥純現金店家日幣現鈔＆零錢',
    detail: 'Day 3 由布釜飯 心、Day 5 旦過市場、中洲屋台多數僅收現金。',
    deadline: '出發前換匯',
  },
  {
    id: 'chk-5',
    group: '行前票券',
    title: 'Day 5 唐吉訶德退稅：護照正本＆電子券',
    detail: '免稅必帶護照正本（影本／照片無效），先存優惠券。',
    deadline: 'Day 5 必帶',
  },
  {
    id: 'chk-6',
    group: '住宿與賽事',
    title: '核對 JX842/843 機票＆Minn 博多訂房單',
    detail: '飯店地址：福岡市博多区博多駅東2-17-12。',
    deadline: '出發前 48 小時',
  },
];

export const INITIAL_PACKING_ITEMS: PackingItem[] = [
  {
    id: 'pack-1',
    category: '證件票券',
    title: '護照正本（效期 6 個月以上）',
    note: '換 JR Pass 與 Day 5 唐吉訶德退稅必帶正本。',
    essential: true,
  },
  {
    id: 'pack-2',
    category: '證件票券',
    title: '日幣現鈔零錢、信用卡、交通 IC 卡',
    note: '釜飯心／旦過／屋台／賽馬用現金；Suica/ICOCA 搭市電與單軌。',
    essential: true,
  },
  {
    id: 'pack-3',
    category: '證件票券',
    title: 'eSIM、數位憑證與唐吉訶德優惠券',
    note: '機票、飯店、JR Pass、B.LEAGUE 球票與免稅券。',
    essential: true,
  },
  {
    id: 'pack-4',
    category: '保暖穿搭',
    title: '防風羽絨外套或厚大衣',
    note: '由布院近 0°C、門司港海風、屋台與賽馬場看台必備。',
    essential: true,
  },
  {
    id: 'pack-5',
    category: '保暖穿搭',
    title: '發熱衣與洋蔥式上衣（6 天份）',
    note: '室外冷、室內暖氣強，好穿脫為佳。',
  },
  {
    id: 'pack-6',
    category: '保暖穿搭',
    title: '圍巾、毛帽、暖暖包',
    note: '門司港開橋與金鱗湖畔防風。',
  },
  {
    id: 'pack-7',
    category: '保暖穿搭',
    title: '好走防滑鞋與厚襪',
    note: '每日預估步行 1.2–1.5 萬步。',
  },
  {
    id: 'pack-8',
    category: '3C與日用',
    title: '行動電源（限手提登機）',
    note: '建議 10,000mAh 以上，供導航、查車班與拍照。',
    essential: true,
  },
  {
    id: 'pack-9',
    category: '3C與日用',
    title: '充電線與多孔插頭（100V 雙扁頭）',
    note: '與台灣雙扁頭相容（三孔才需轉接）。',
  },
  {
    id: 'pack-10',
    category: '3C與日用',
    title: '輕便摺疊傘',
    note: '2 月底偶有短暫陣雨。',
  },
  {
    id: 'pack-11',
    category: '3C與日用',
    title: '常備藥品、護唇膏、保濕乳液',
    note: '冬季暖氣乾燥，備感冒／腸胃藥。',
  },
  {
    id: 'pack-12',
    category: '3C與日用',
    title: '輕便摺疊購物袋',
    note: 'AMU PLAZA、唐吉訶德與博多阪急採買用。',
  },
];
