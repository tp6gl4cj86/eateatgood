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
    photoAlt: '樂house 行前披薩開趴夜',
    figureCaption: '樂HOUSE社區 · 行前披薩夜',
    locationStamp: '台灣',
    paceLabel: '輕鬆暖身',
    paceLevel: 1,
    estimatedSteps: 2800,
    walkingKm: 2.0,
    localTransitMinutes: 20,
    activityBreakdown: [
      { category: 'dining', label: '披薩開趴', hours: 2.0 },
      { category: 'sports_entertainment', label: '暖身交流', hours: 1.5 },
      { category: 'transport', label: '行前核對', hours: 0.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd0-1',
        shortLabel: '樂house 披薩夜＆核對',
        startHour: 19.0,
        endHour: 22.5,
        primaryCategory: 'dining',
      },
    ],
    routeNodes: [
      { name: '各自出發', detail: '帶護照與日幣現鈔', modeToNext: '集合', durationToNext: '20 分' },
      { name: '樂HOUSE社區', detail: '披薩開趴與行前確認', modeToNext: '隔日', durationToNext: 'JX842' },
      { name: '桃園機場', detail: '10:00 抵福岡' },
    ],
    crewPlan: {
      headline: '4 人全員集合',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  1: {
    dayNumber: 1,
    photo: day1Photo,
    photoAlt: '博多炭火和牛燒肉',
    figureCaption: '大東園和牛・博多半日散策',
    locationStamp: '福岡・博多',
    paceLabel: '充實起跑',
    paceLevel: 3,
    estimatedSteps: 12200,
    walkingKm: 8.6,
    localTransitMinutes: 25,
    activityBreakdown: [
      { category: 'transport', label: '抵飯店＆換票', hours: 3.5 },
      { category: 'sightseeing', label: '運河城＆川端通', hours: 2.5 },
      { category: 'dining', label: 'ShinShin＆大東園', hours: 2.0 },
      { category: 'sports_entertainment', label: 'Plaza 博多', hours: 3.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd1-1',
        shortLabel: '機場 ➔ 寄行李＆換 JR 券',
        startHour: 10.0,
        endHour: 13.5,
        primaryCategory: 'transport',
      },
      {
        blockId: 'd1-2',
        shortLabel: 'ShinShin ➔ 運河城 ➔ 川端通',
        startHour: 13.75,
        endHour: 17.6,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd1-3',
        shortLabel: '大東園燒肉 ➔ Plaza 博多',
        startHour: 17.75,
        endHour: 22.5,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 18.75,
    cutoffLabel: '18:45 計程車返飯店（6 分）',
    routeNodes: [
      { name: '福岡機場 FUK', detail: '10:00 抵達', modeToNext: '2 台計程車', durationToNext: '10 分' },
      { name: '博多站＆ShinShin', detail: '換 JR 券＋午餐', modeToNext: '步行', durationToNext: '15 分' },
      { name: '運河城＆川端通', detail: '15:00–17:35 逛街', modeToNext: '步行', durationToNext: '5 分' },
      { name: '大東園 / Plaza', detail: '17:45 燒肉 ➔ 柏青哥' },
    ],
    crewPlan: {
      headline: '18:45 餐後分流（1 人返飯店・3 人 Plaza）',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  2: {
    dayNumber: 2,
    photo: day2Photo,
    photoAlt: '門司港懷舊區與藍翼門司吊橋',
    figureCaption: '門司港開橋秀・小倉 B.LEAGUE',
    locationStamp: '門司港・小倉',
    paceLabel: '熱血滿載',
    paceLevel: 5,
    estimatedSteps: 15200,
    walkingKm: 10.9,
    localTransitMinutes: 165,
    activityBreakdown: [
      { category: 'sightseeing', label: '門司港＆小倉', hours: 5.0 },
      { category: 'sports_entertainment', label: 'B.LEAGUE', hours: 3.0 },
      { category: 'transport', label: 'Sonic＆接駁', hours: 3.5 },
      { category: 'dining', label: '燒咖哩＆賽前餐', hours: 2.75 },
    ],
    timelineSlots: [
      {
        blockId: 'd2-1',
        shortLabel: '鐵道館・11:00 開橋・燒咖哩',
        startHour: 8.0,
        endHour: 13.0,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd2-2',
        shortLabel: '小倉銀天街＆Aruaru ➔ 分流晚餐',
        startHour: 13.25,
        endHour: 18.0,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd2-3',
        shortLabel: '19:00 B.LEAGUE ➔ 接駁返博多',
        startHour: 18.35,
        endHour: 22.75,
        primaryCategory: 'sports_entertainment',
      },
    ],
    cutoffHour: 16.0,
    cutoffLabel: '16:00 小倉搭 Sonic（16:50 抵博多）',
    routeNodes: [
      { name: '博多站', detail: '08:00 出發', modeToNext: 'Sonic＋普通', durationToNext: '70 分' },
      { name: '門司港', detail: '鐵道館・開橋・燒咖哩', modeToNext: '普通車', durationToNext: '15 分' },
      { name: '小倉站＆商場', detail: '銀天街・Aruaru・分流', modeToNext: '免費接駁', durationToNext: '20 分' },
      { name: '綜合體育館', detail: '19:00 B.LEAGUE', modeToNext: '接駁＋Sonic', durationToNext: '80 分' },
    ],
    crewPlan: {
      headline: '16:00 分流（1 人返博多・3 人看球）',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  3: {
    dayNumber: 3,
    photo: day3Photo,
    photoAlt: '冬日由布院金鱗湖與由布岳',
    figureCaption: '由布院金鱗湖・釜飯心・中洲屋台',
    locationStamp: '由布院・中洲',
    paceLabel: '豐富漫遊',
    paceLevel: 4,
    estimatedSteps: 14200,
    walkingKm: 10.1,
    localTransitMinutes: 290,
    activityBreakdown: [
      { category: 'transport', label: '由布院特急', hours: 5.5 },
      { category: 'sightseeing', label: '湯之坪＆金鱗湖', hours: 3.5 },
      { category: 'dining', label: '釜飯・拉麵・屋台', hours: 3.2 },
    ],
    timelineSlots: [
      {
        blockId: 'd3-1',
        shortLabel: '特急 ➔ 湯之坪・貓頭鷹・金鱗湖',
        startHour: 8.0,
        endHour: 14.9,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd3-2',
        shortLabel: '15:00 釜飯心 ➔ 16:00 特急返博多',
        startHour: 15.0,
        endHour: 18.17,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd3-3',
        shortLabel: 'Ichimujin 拉麵 ➔ 中洲屋台街',
        startHour: 18.6,
        endHour: 21.17,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 18.17,
    cutoffLabel: '18:10 抵博多買外帶返飯店',
    routeNodes: [
      { name: '博多站', detail: '08:00 出發', modeToNext: '由布院之森', durationToNext: '135 分' },
      { name: '由布院小鎮', detail: '湯之坪・貓頭鷹・金鱗湖', modeToNext: '步行', durationToNext: '回車站' },
      { name: '由布釜飯 心', detail: '15:00 離峰（純現金）', modeToNext: '特急由布', durationToNext: '130 分' },
      { name: '渡邊通＆中洲', detail: 'Ichimujin＋屋台街' },
    ],
    crewPlan: {
      headline: '18:10 博多站分流（1 人返飯店・3 人拉麵屋台）',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  4: {
    dayNumber: 4,
    photo: day4Photo,
    photoAlt: '冬日晴空下的熊本城天守閣',
    figureCaption: '熊本城・勝烈亭・魚ト肴 いとおかし',
    locationStamp: '熊本・博多春吉',
    paceLabel: '經典充實',
    paceLevel: 4,
    estimatedSteps: 15200,
    walkingKm: 10.9,
    localTransitMinutes: 135,
    activityBreakdown: [
      { category: 'sightseeing', label: '熊本城＆AMU', hours: 5.5 },
      { category: 'dining', label: '勝烈亭＆いとおかし', hours: 3.5 },
      { category: 'transport', label: '新幹線＆市電', hours: 2.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd4-1',
        shortLabel: '新幹線 ➔ 熊本城・加藤神社・城彩苑',
        startHour: 8.0,
        endHour: 12.25,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd4-2',
        shortLabel: '12:25 勝烈亭抽號 ➔ 上下通 ➔ 午餐',
        startHour: 12.4,
        endHour: 15.08,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd4-3',
        shortLabel: '15:15 新幹線 ➔ AMU ➔ 18:00 返飯店',
        startHour: 15.25,
        endHour: 18.0,
        primaryCategory: 'transport',
      },
      {
        blockId: 'd4-4',
        shortLabel: '魚ト肴 いとおかし 海鮮晚餐',
        startHour: 18.5,
        endHour: 20.5,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 18.0,
    cutoffLabel: '18:00 返飯店（1 人上線・3 人往春吉）',
    routeNodes: [
      { name: '博多站', detail: '08:00 出發', modeToNext: '九州新幹線', durationToNext: '35 分' },
      { name: '熊本城＆城彩苑', detail: '09:45–12:15', modeToNext: '步行', durationToNext: '7 分' },
      { name: '勝烈亭＆上下通', detail: '12:25 抽號＋午餐', modeToNext: '市電＋新幹線', durationToNext: '70 分' },
      { name: 'AMU＆いとおかし', detail: '16:00 採買 ➔ 18:30 晚餐' },
    ],
    crewPlan: {
      headline: '18:00 返飯店分流（1 人上線・3 人いとおかし）',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  5: {
    dayNumber: 5,
    photo: day5Photo,
    photoAlt: '週六小倉競馬場草地賽馬',
    figureCaption: '旦過大學丼・JRA 小倉賽馬・吉塚鰻魚',
    locationStamp: '小倉・中洲',
    paceLabel: '全日熱戰',
    paceLevel: 4,
    estimatedSteps: 13600,
    walkingKm: 9.7,
    localTransitMinutes: 145,
    activityBreakdown: [
      { category: 'sports_entertainment', label: '小倉賽馬場', hours: 5.0 },
      { category: 'dining', label: '大學丼＆吉塚', hours: 2.75 },
      { category: 'transport', label: '特急＆單軌', hours: 2.6 },
      { category: 'sightseeing', label: '唐吉訶德退稅', hours: 1.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd5-1',
        shortLabel: '10:00 旦過大學丼 ➔ 賽馬場至 16:05',
        startHour: 8.5,
        endHour: 16.08,
        primaryCategory: 'sports_entertainment',
      },
      {
        blockId: 'd5-2',
        shortLabel: '16:50 返博多 ➔ 18:05 吉塚抽號',
        startHour: 16.25,
        endHour: 19.67,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd5-3',
        shortLabel: '唐吉訶德中洲店退稅（帶護照正本）',
        startHour: 19.75,
        endHour: 21.35,
        primaryCategory: 'sightseeing',
      },
    ],
    cutoffHour: 17.75,
    cutoffLabel: '17:45 抵博多（1 人返飯店・3 人吉塚）',
    routeNodes: [
      { name: '博多站', detail: '08:50 特急 Sonic', modeToNext: 'Sonic', durationToNext: '45 分' },
      { name: '旦過市場', detail: '10:00 大學丼（現金）', modeToNext: '單軌', durationToNext: '15 分' },
      { name: 'JRA 小倉賽馬場', detail: '11:05–16:05 尾場', modeToNext: '單軌＋Sonic', durationToNext: '85 分' },
      { name: '吉塚＆唐吉訶德', detail: '18:05 抽號＋中洲退稅' },
    ],
    crewPlan: {
      headline: '17:45 博多分流（1 人返飯店・3 人吉塚＆唐吉訶德）',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
  6: {
    dayNumber: 6,
    photo: day6Photo,
    photoAlt: '博多車站與九州伴手禮',
    figureCaption: '博多阪急採買・JX843 返台',
    locationStamp: '博多・福岡空港',
    paceLabel: '從容返程',
    paceLevel: 2,
    estimatedSteps: 7600,
    walkingKm: 5.4,
    localTransitMinutes: 15,
    activityBreakdown: [
      { category: 'sightseeing', label: '博多阪急採買', hours: 2.0 },
      { category: 'transport', label: '往機場＆登機', hours: 3.0 },
    ],
    timelineSlots: [
      {
        blockId: 'd6-1',
        shortLabel: '09:30 退房寄行李 ➔ 博多阪急採買',
        startHour: 9.5,
        endHour: 11.5,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd6-2',
        shortLabel: '11:45 計程車往機場 ➔ JX843 返台',
        startHour: 11.75,
        endHour: 15.0,
        primaryCategory: 'transport',
      },
    ],
    routeNodes: [
      { name: 'Minn 博多', detail: '09:30 退房寄行李', modeToNext: '步行', durationToNext: '8 分' },
      { name: '博多阪急', detail: '09:30–11:30 補貨', modeToNext: '計程車', durationToNext: '15 分' },
      { name: '福岡機場', detail: '11:45 搭 2 台計程車', modeToNext: 'JX843', durationToNext: '前 2.5h' },
      { name: '桃園機場 TPE', detail: '平安返台' },
    ],
    crewPlan: {
      headline: '4 人全員返台',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
};
