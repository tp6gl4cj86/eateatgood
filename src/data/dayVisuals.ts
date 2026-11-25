import day0Photo from '../assets/images/day0_pizza_party_1795496150447.jpg';
import day1Photo from '../assets/images/day1_hakata_yakiniku_1795496151234.jpg';
import day2Photo from '../assets/images/day2_mojiko_harbor_1795496149780.jpg';
import day3Photo from '../assets/images/day3_yufuin_kinrin_1795496148658.jpg';
import day4Photo from '../assets/images/day4_kumamoto_castle_1795496148433.jpg';
import day5Photo from '../assets/images/day5_kokura_racecourse_1795496149674.jpg';
import day6Photo from '../assets/images/day6_hakata_station_1795496148850.jpg';
import { ActivityCategory } from './itineraryData';

export interface ActivityBreakdownSlice {
  category: ActivityCategory;
  label: string;
  hours: number;
}

export interface TimelineVisualSlot {
  blockId: string;
  shortLabel: string;
  startHour: number;
  endHour: number;
  primaryCategory: ActivityCategory;
}

export interface TransitRouteNode {
  name: string;
  detail: string;
  modeToNext?: string;
  durationToNext?: string;
}

export interface DayCrewPlan {
  headline: string;
  fullCrew: string[];
  specialNote?: string;
  specialMembers?: string[];
}

export interface DayVisualProfile {
  dayNumber: number;
  photo: string;
  photoAlt: string;
  figureCaption: string;
  locationStamp: string;
  paceLabel: string;
  paceLevel: 1 | 2 | 3 | 4 | 5;
  estimatedSteps: number;
  walkingKm: number;
  localTransitMinutes: number;
  activityBreakdown: ActivityBreakdownSlice[];
  timelineSlots: TimelineVisualSlot[];
  cutoffHour?: number;
  cutoffLabel?: string;
  routeNodes: TransitRouteNode[];
  crewPlan: DayCrewPlan;
}

export const CATEGORY_COLORS: Record<
  ActivityCategory,
  { fill: string; soft: string; text: string; label: string }
> = {
  transport: {
    fill: '#1E3A5F',
    soft: '#EBF0F6',
    text: '#1E3A5F',
    label: '鐵道交通',
  },
  sightseeing: {
    fill: '#2F6B4F',
    soft: '#EBF4EE',
    text: '#22543D',
    label: '景點散策',
  },
  dining: {
    fill: '#B4692B',
    soft: '#FBF1E6',
    text: '#924D18',
    label: '九州美食',
  },
  sports_entertainment: {
    fill: '#B43E2B',
    soft: '#FDF1EE',
    text: '#991B1B',
    label: '賽事娛樂',
  },
};

export const DAY_VISUAL_PROFILES: Record<number, DayVisualProfile> = {
  0: {
    dayNumber: 0,
    photo: day0Photo,
    photoAlt: '四位好友出發前夜於樂house客廳舉杯與披薩派對合影氛圍',
    figureCaption: 'Fig. 00 · 樂HOUSE社區 行前披薩開趴夜',
    locationStamp: '台灣 · 行前暖身夜',
    paceLabel: '輕鬆暖身',
    paceLevel: 1,
    estimatedSteps: 2800,
    walkingKm: 2.0,
    localTransitMinutes: 20,
    activityBreakdown: [
      { category: 'dining', label: '披薩開趴', hours: 2.0 },
      { category: 'sports_entertainment', label: '行前暖身互動', hours: 1.5 },
      { category: 'transport', label: '現金與機票核對', hours: 0.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd0-1',
        shortLabel: '樂house 披薩開趴＆行前確認',
        startHour: 19.0,
        endHour: 22.5,
        primaryCategory: 'dining',
      },
    ],
    routeNodes: [
      { name: '各自出發', detail: '備護照正本與日幣現鈔', modeToNext: '集合', durationToNext: '約 20 分' },
      { name: '樂HOUSE社區', detail: '披薩開趴與分工', modeToNext: '隔日出發', durationToNext: 'JX842' },
      { name: '桃園機場準備', detail: '10:00 抵達福岡' },
    ],
    crewPlan: {
      headline: '4 人全員到齊暖身',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  1: {
    dayNumber: 1,
    photo: day1Photo,
    photoAlt: '博多上川端町炭火燒肉爐上滋滋作響的九州和牛切片',
    figureCaption: 'Fig. 01 · 燒肉大東園本店炭火和牛與博多半日散策',
    locationStamp: '福岡・博多',
    paceLabel: '充實起跑',
    paceLevel: 3,
    estimatedSteps: 12200,
    walkingKm: 8.6,
    localTransitMinutes: 25,
    activityBreakdown: [
      { category: 'transport', label: '機場抵飯店＆換票', hours: 3.5 },
      { category: 'sightseeing', label: '運河城＆川端通', hours: 2.5 },
      { category: 'dining', label: 'ShinShin＆大東園', hours: 2.0 },
      { category: 'sports_entertainment', label: 'Plaza 博多柏青哥', hours: 3.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd1-1',
        shortLabel: '福岡機場 ➔ Minn 寄行李＆換 JR 5 日券',
        startHour: 10.0,
        endHour: 13.5,
        primaryCategory: 'transport',
      },
      {
        blockId: 'd1-2',
        shortLabel: 'ShinShin 拉麵 ➔ 博多運河城 ➔ 川端通商店街',
        startHour: 13.75,
        endHour: 17.6,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd1-3',
        shortLabel: '大東園燒肉晚餐 ➔ 18:45 分流 ➔ Plaza 博多',
        startHour: 17.75,
        endHour: 22.5,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 18.75,
    cutoffLabel: '18:45 中洲川端搭計程車（6 分）返飯店，19:00 上線',
    routeNodes: [
      { name: '福岡機場 FUK', detail: '10:00 JX842 抵達', modeToNext: '2 台計程車', durationToNext: '10 分' },
      { name: '博多站＆ShinShin', detail: '換 JR 券＋DEITOS 午餐', modeToNext: '步行散策', durationToNext: '15 分' },
      { name: '運河城＆川端通', detail: '15:00–17:35 逛街', modeToNext: '步行', durationToNext: '5 分' },
      { name: '大東園 / Plaza', detail: '17:45 燒肉 ➔ 柏青哥' },
    ],
    crewPlan: {
      headline: '4 人同遊至大東園 ➔ 18:45 分流',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '19:00 返飯店隊友 18:45 於中洲川端搭計程車（6 分）回飯店上線；其餘三人往 Plaza 博多至 22:30',
    },
  },
  2: {
    dayNumber: 2,
    photo: day2Photo,
    photoAlt: '北九州門司港懷舊紅磚建築群與陽光下開啟的藍翼門司吊橋',
    figureCaption: 'Fig. 02 · 門司港 11:00 藍翼吊橋開橋與小倉熱血籃球夜',
    locationStamp: '門司港・小倉',
    paceLabel: '熱血滿載',
    paceLevel: 5,
    estimatedSteps: 15200,
    walkingKm: 10.9,
    localTransitMinutes: 165,
    activityBreakdown: [
      { category: 'sightseeing', label: '鐵道館・門司港・小倉', hours: 5.0 },
      { category: 'sports_entertainment', label: 'B.LEAGUE 籃球賽', hours: 3.0 },
      { category: 'transport', label: 'Sonic 特急＆免費接駁', hours: 3.5 },
      { category: 'dining', label: 'Koganemushi＆賽前餐', hours: 2.75 },
    ],
    timelineSlots: [
      {
        blockId: 'd2-1',
        shortLabel: '鐵道館・11:00 吊橋開橋・展望室・Koganemushi 燒咖哩',
        startHour: 8.0,
        endHour: 13.0,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd2-2',
        shortLabel: '小倉銀天街＆Aruaru City ➔ 16:00 分流 ➔ 三人晚餐',
        startHour: 13.25,
        endHour: 18.0,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd2-3',
        shortLabel: '19:00 B.LEAGUE 籃球賽 ➔ 21:25 接駁＆特急返博多',
        startHour: 18.35,
        endHour: 22.75,
        primaryCategory: 'sports_entertainment',
      },
    ],
    cutoffHour: 16.0,
    cutoffLabel: '16:00 小倉站分流（1 人搭 Sonic 約 16:50 抵博多）',
    routeNodes: [
      { name: '博多站', detail: '08:00 出發', modeToNext: 'Sonic＋普通車', durationToNext: '70 分' },
      { name: '門司港懷舊區', detail: '鐵道館・11:00 吊橋・燒咖哩', modeToNext: 'JR 普通車', durationToNext: '15 分' },
      { name: '小倉站＆商場', detail: '銀天街・Aruaru City・分流', modeToNext: '免費接駁車', durationToNext: '20 分' },
      { name: '綜合體育館', detail: '19:00 B.LEAGUE ➔ 返博多', modeToNext: '接駁＋Sonic', durationToNext: '80 分' },
    ],
    crewPlan: {
      headline: '白天 4 人同遊門司港＆小倉 ➔ 16:00 分流',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '16:00 返飯店隊友（1 人）搭 Sonic 約 16:50 返博多；看球三人組（3 人）小倉提早晚餐後搭 18:00/18:30 免費接駁車觀戰',
    },
  },
  3: {
    dayNumber: 3,
    photo: day3Photo,
    photoAlt: '冬日清晨雲霧繚繞的大分由布院金鱗湖與遠方由布岳倒影',
    figureCaption: 'Fig. 03 · 由布院金鱗湖散策、站前釜飯心與福岡中洲屋台夜',
    locationStamp: '由布院・中洲',
    paceLabel: '豐富漫遊',
    paceLevel: 4,
    estimatedSteps: 14200,
    walkingKm: 10.1,
    localTransitMinutes: 290,
    activityBreakdown: [
      { category: 'transport', label: '由布院之森＆由布號', hours: 5.5 },
      { category: 'sightseeing', label: '湯之坪・貓頭鷹・金鱗湖', hours: 3.5 },
      { category: 'dining', label: '釜飯心・渡邊通拉麵・屋台', hours: 3.2 },
    ],
    timelineSlots: [
      {
        blockId: 'd3-1',
        shortLabel: '由布院之森 ➔ 湯之坪・貓頭鷹之森林・金鱗湖',
        startHour: 8.0,
        endHour: 14.9,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd3-2',
        shortLabel: '15:00 離峰吃站前店釜飯心 ➔ 16:00 特急「由布」返博多',
        startHour: 15.0,
        endHour: 18.17,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd3-3',
        shortLabel: 'Ichimujin 渡邊通拉麵 ➔ 步行 8 分中洲屋台街',
        startHour: 18.6,
        endHour: 21.17,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 18.17,
    cutoffLabel: '18:10 抵博多站，19:00 隊友買外帶直接步行返飯店',
    routeNodes: [
      { name: '博多站', detail: '08:00 出發', modeToNext: '由布院之森/由布', durationToNext: '135 分' },
      { name: '由布院小鎮', detail: '湯之坪・貓頭鷹・金鱗湖', modeToNext: '回車站旁', durationToNext: '步行' },
      { name: '由布釜飯 心', detail: '15:00 離峰（純現金）', modeToNext: '16:00 特急由布', durationToNext: '130 分' },
      { name: '渡邊通＆中洲屋台', detail: 'Ichimujin 拉麵＋烤雞皮生啤' },
    ],
    crewPlan: {
      headline: '4 人同遊由布院 ➔ 18:10 博多站分流',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '18:10 抵博多後，19:00 隊友買好晚餐外帶回飯店上線；晚餐三人組往渡邊通吃 Ichimujin 拉麵並散步逛中洲屋台街',
    },
  },
  4: {
    dayNumber: 4,
    photo: day4Photo,
    photoAlt: '冬日晴空與早梅映襯下的熊本城黑瓦白牆天守閣與武者返石垣',
    figureCaption: 'Fig. 04 · 熊本城天守閣、加藤神社與勝烈亭黑豚炸豬排',
    locationStamp: '熊本・博多',
    paceLabel: '經典充實',
    paceLevel: 4,
    estimatedSteps: 14800,
    walkingKm: 10.6,
    localTransitMinutes: 120,
    activityBreakdown: [
      { category: 'sightseeing', label: '熊本城・上下通・AMU', hours: 5.5 },
      { category: 'transport', label: '九州新幹線＆熊本市電', hours: 2.5 },
      { category: 'dining', label: '勝烈亭黑豚炸豬排', hours: 1.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd4-1',
        shortLabel: '九州新幹線 ➔ 熊本城・加藤神社・櫻之馬場城彩苑',
        startHour: 8.0,
        endHour: 12.25,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd4-2',
        shortLabel: '12:25 勝烈亭抽號 ➔ 上下通＆熊本熊廣場 ➔ 炸豬排午餐',
        startHour: 12.4,
        endHour: 15.08,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd4-3',
        shortLabel: '15:15 新幹線返博多 ➔ AMU PLAZA 採買 ➔ 18:00 返飯店',
        startHour: 15.25,
        endHour: 18.0,
        primaryCategory: 'transport',
      },
    ],
    cutoffHour: 18.0,
    cutoffLabel: '18:00 全團步行返抵飯店，19:00 隊友準時回房上線',
    routeNodes: [
      { name: '博多站', detail: '08:00 出發', modeToNext: '九州新幹線', durationToNext: '35 分' },
      { name: '熊本城＆加藤神社', detail: '09:45–12:15 含城彩苑', modeToNext: '步行', durationToNext: '7 分' },
      { name: '勝烈亭＆上下通', detail: '12:25 抽號＋熊本熊廣場', modeToNext: '辛島町市電', durationToNext: '25 分' },
      { name: 'AMU PLAZA 博多', detail: '15:15 新幹線 ➔ 採買返飯店' },
    ],
    crewPlan: {
      headline: '4 人同進同出熊本城與 AMU PLAZA',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '18:00 全團步行返抵 Minn 博多，19:00 隊友準時回房上線；其餘三人晚上可於博多站周邊自由用餐',
    },
  },
  5: {
    dayNumber: 5,
    photo: day5Photo,
    photoAlt: '週六晴空下小倉競馬場草地跑道奔馳的純血賽馬與看台觀眾',
    figureCaption: 'Fig. 05 · 旦過市場內用大學丼、JRA 小倉賽馬場與吉塚鰻魚屋',
    locationStamp: '小倉・中洲',
    paceLabel: '全日熱戰',
    paceLevel: 4,
    estimatedSteps: 13600,
    walkingKm: 9.7,
    localTransitMinutes: 145,
    activityBreakdown: [
      { category: 'sports_entertainment', label: 'JRA 小倉賽馬場', hours: 5.0 },
      { category: 'dining', label: '旦過大學丼＆吉塚鰻魚', hours: 2.75 },
      { category: 'transport', label: 'Sonic 特急・單軌・計程車', hours: 2.6 },
      { category: 'sightseeing', label: '唐吉訶德中洲店退稅', hours: 1.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd5-1',
        shortLabel: '08:50 Sonic ➔ 10:00 旦過內用大學丼 ➔ 小倉賽馬場至 16:05',
        startHour: 8.5,
        endHour: 16.08,
        primaryCategory: 'sports_entertainment',
      },
      {
        blockId: 'd5-2',
        shortLabel: '16:50 Sonic 返博多 ➔ 17:45 分流 ➔ 18:05 吉塚鰻魚屋抽號',
        startHour: 16.25,
        endHour: 19.67,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd5-3',
        shortLabel: '唐吉訶德 中洲店免稅採買（帶護照正本）➔ 21:20 返飯店',
        startHour: 19.75,
        endHour: 21.35,
        primaryCategory: 'sightseeing',
      },
    ],
    cutoffHour: 17.75,
    cutoffLabel: '17:45 抵博多站分流（1 人外帶返飯店，3 人直奔吉塚鰻魚屋）',
    routeNodes: [
      { name: '博多站', detail: '08:50 JR 特急 Sonic', modeToNext: '特急 Sonic', durationToNext: '45 分' },
      { name: '旦過市場', detail: '10:00 內用大學丼（現金）', modeToNext: '北九州單軌', durationToNext: '15 分' },
      { name: 'JRA 小倉賽馬場', detail: '11:05–16:05 尾場收工', modeToNext: '單軌＋Sonic', durationToNext: '85 分' },
      { name: '吉塚鰻魚＆唐吉訶德', detail: '18:05 抽號＋中洲退稅採買' },
    ],
    crewPlan: {
      headline: '4 人全日觀賽小倉賽馬場 ➔ 17:45 博多站分流',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '17:45 返抵博多後，19:00 隊友（1 人）外帶晚餐回飯店上線；晚餐三人組搭計程車 18:05 衝吉塚鰻魚屋＋步行逛唐吉訶德中洲店',
    },
  },
  6: {
    dayNumber: 6,
    photo: day6Photo,
    photoAlt: '陽光下的博多車站現代建築立面與精緻包裝的九州和菓子伴手禮盒',
    figureCaption: 'Fig. 06 · 博多阪急最後伴手禮採買與 11:45 計程車往機場',
    locationStamp: '博多・福岡空港',
    paceLabel: '從容返程',
    paceLevel: 2,
    estimatedSteps: 7600,
    walkingKm: 5.4,
    localTransitMinutes: 15,
    activityBreakdown: [
      { category: 'sightseeing', label: '博多阪急最後採買', hours: 2.0 },
      { category: 'transport', label: '計程車往機場＆登機', hours: 3.0 },
    ],
    timelineSlots: [
      {
        blockId: 'd6-1',
        shortLabel: '09:30 退房寄行李 ➔ 博多阪急最後伴手禮採買',
        startHour: 9.5,
        endHour: 11.5,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd6-2',
        shortLabel: '11:45 分搭 2 台計程車直達機場 ➔ 星宇 JX843 返台',
        startHour: 11.75,
        endHour: 15.0,
        primaryCategory: 'transport',
      },
    ],
    routeNodes: [
      { name: 'Minn 博多', detail: '09:30 退房寄放行李', modeToNext: '步行', durationToNext: '8 分' },
      { name: '博多阪急百貨', detail: '09:30–11:30 最後補貨', modeToNext: '11:45 搭車', durationToNext: '15 分' },
      { name: '福岡機場國際線', detail: '2 台計程車（¥1,600/台）', modeToNext: '星宇 JX843', durationToNext: '前 2.5h 報到' },
      { name: '桃園機場 TPE', detail: '滿載戰利品平安返台' },
    ],
    crewPlan: {
      headline: '4 人全員滿載而歸返台',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
};
