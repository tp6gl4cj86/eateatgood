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

export const CATEGORY_COLORS: Record<ActivityCategory, { fill: string; soft: string; text: string; label: string }> = {
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
      { category: 'transport', label: '行李與機票核對', hours: 0.5 },
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
      { name: '各自出發', detail: '攜帶護照與行李', modeToNext: '集合', durationToNext: '約 20 分' },
      { name: '樂HOUSE社區', detail: '披薩開趴與分工', modeToNext: '隔日出發', durationToNext: 'JX842' },
      { name: '桃園機場準備', detail: '確認起飛前動線' },
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
    figureCaption: 'Fig. 01 · 上川端町 燒肉大東園本店炭火和牛',
    locationStamp: '福岡・博多',
    paceLabel: '節奏舒適',
    paceLevel: 2,
    estimatedSteps: 9500,
    walkingKm: 6.8,
    localTransitMinutes: 25,
    activityBreakdown: [
      { category: 'transport', label: '抵達與換票入住', hours: 3.5 },
      { category: 'sightseeing', label: '博多市區散策', hours: 3.5 },
      { category: 'dining', label: '和牛燒肉大東園', hours: 2.0 },
      { category: 'sports_entertainment', label: 'PLAZA 柏青哥', hours: 2.0 },
    ],
    timelineSlots: [
      {
        blockId: 'd1-1',
        shortLabel: '福岡機場 ➔ 飯店寄行李＆換 JR Pass',
        startHour: 10.0,
        endHour: 13.5,
        primaryCategory: 'transport',
      },
      {
        blockId: 'd1-3',
        shortLabel: '燒肉大東園和牛 ＆ PLAZA 柏青哥',
        startHour: 18.5,
        endHour: 22.5,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 19.0,
    cutoffLabel: '19:00 隊友休息節點',
    routeNodes: [
      { name: '福岡機場 FUK', detail: '星宇 JX842 抵達', modeToNext: '2 台計程車', durationToNext: '10 分' },
      { name: 'Minn 博多', detail: '寄放行李入住', modeToNext: '步行', durationToNext: '8 分' },
      { name: '博多站', detail: '兌換 JR 5 日券', modeToNext: '市區移動', durationToNext: '7 分' },
      { name: '大東園 / PLAZA', detail: '和牛燒肉與柏青哥' },
    ],
    crewPlan: {
      headline: '4 人同行抵達福岡',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '若 19:00 隊友未參與晚間提早場，下午市區散策後先行返飯店休息',
    },
  },
  2: {
    dayNumber: 2,
    photo: day2Photo,
    photoAlt: '北九州門司港懷舊紅磚建築群與夕陽下開啟的藍翼門司吊橋',
    figureCaption: 'Fig. 02 · 門司港懷舊海峽與藍翼吊橋開橋景致',
    locationStamp: '門司港・小倉',
    paceLabel: '熱血滿載',
    paceLevel: 5,
    estimatedSteps: 14500,
    walkingKm: 10.4,
    localTransitMinutes: 145,
    activityBreakdown: [
      { category: 'sightseeing', label: '門司港鐵道與海峽', hours: 5.0 },
      { category: 'sports_entertainment', label: 'B.LEAGUE 籃球賽', hours: 3.5 },
      { category: 'transport', label: 'Sonic 特急＆接駁', hours: 2.5 },
      { category: 'dining', label: '燒咖哩＆賽前晚餐', hours: 2.0 },
    ],
    timelineSlots: [
      {
        blockId: 'd2-1',
        shortLabel: '門司港鐵道館・燒咖哩・藍翼吊橋',
        startHour: 9.0,
        endHour: 15.5,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd2-2',
        shortLabel: '小倉站分流・兩人晚餐・球團接駁',
        startHour: 15.6,
        endHour: 18.5,
        primaryCategory: 'dining',
      },
      {
        blockId: 'd2-3',
        shortLabel: 'B.LEAGUE 福岡新銳 vs 埼玉野馬',
        startHour: 19.0,
        endHour: 22.75,
        primaryCategory: 'sports_entertainment',
      },
    ],
    cutoffHour: 16.0,
    cutoffLabel: '16:00 小倉站分流返博多',
    routeNodes: [
      { name: '博多站', detail: '09:00 出發', modeToNext: '特急 Sonic', durationToNext: '45 分' },
      { name: '小倉站', detail: '轉鹿兒島本線', modeToNext: 'JR 普通車', durationToNext: '15 分' },
      { name: '門司港', detail: '鐵道館＆14:00 吊橋', modeToNext: '返回小倉', durationToNext: '15 分' },
      { name: '綜合體育館', detail: '19:00 籃球賽', modeToNext: '接駁＋特急', durationToNext: '70 分' },
    ],
    crewPlan: {
      headline: '白天 4 人同遊門司港 ➔ 16:00 分流',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '19:00 B.LEAGUE 籃球賽僅 2 人前往觀戰',
      specialMembers: ['尼哥', '班表人'],
    },
  },
  3: {
    dayNumber: 3,
    photo: day3Photo,
    photoAlt: '冬日清晨雲霧繚繞的大分由布院金鱗湖與遠方由布岳倒影',
    figureCaption: 'Fig. 03 · 由布院金鱗湖冬晨地熱薄霧與由布岳',
    locationStamp: '大分・由布院',
    paceLabel: '慢遊散策',
    paceLevel: 3,
    estimatedSteps: 13000,
    walkingKm: 9.2,
    localTransitMinutes: 270,
    activityBreakdown: [
      { category: 'transport', label: '由布院之森來回', hours: 4.5 },
      { category: 'sightseeing', label: '湯之坪＆金鱗湖', hours: 4.5 },
      { category: 'dining', label: '小鎮甜點＆博多鍋物', hours: 2.0 },
    ],
    timelineSlots: [
      {
        blockId: 'd3-1',
        shortLabel: '由布院之森 ➔ 湯之坪・童話村・金鱗湖',
        startHour: 9.5,
        endHour: 16.0,
        primaryCategory: 'sightseeing',
      },
      {
        blockId: 'd3-2',
        shortLabel: '16:00 特急返博多 ➔ 牛腸鍋 / 水炊鍋',
        startHour: 16.0,
        endHour: 20.5,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 18.3,
    cutoffLabel: '18:20 抵博多・19:00 隊友返飯店',
    routeNodes: [
      { name: '博多站', detail: '全車指定席必搶', modeToNext: '由布院之森', durationToNext: '135 分' },
      { name: '湯之坪街道', detail: '甜點與童話村', modeToNext: '步行散策', durationToNext: '20 分' },
      { name: '金鱗湖', detail: '湖畔溫泉景致', modeToNext: '16:00 特急', durationToNext: '135 分' },
      { name: '博多站鍋物', detail: '牛腸鍋 / 水炊鍋' },
    ],
    crewPlan: {
      headline: '白天 4 人同搭由布院之森',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '約 18:20 返抵博多站後，19:00 隊友直接步行返飯店，其餘三人享用鍋物晚餐',
    },
  },
  4: {
    dayNumber: 4,
    photo: day4Photo,
    photoAlt: '冬日晴空與早梅映襯下的熊本城黑瓦白牆天守閣與武者返石垣',
    figureCaption: 'Fig. 04 · 熊本城天守閣與二月早梅石垣',
    locationStamp: '熊本市區',
    paceLabel: '經典充實',
    paceLevel: 4,
    estimatedSteps: 15500,
    walkingKm: 11.2,
    localTransitMinutes: 90,
    activityBreakdown: [
      { category: 'sightseeing', label: '熊本城與上下通', hours: 6.5 },
      { category: 'dining', label: '勝烈亭黑豚炸豬排', hours: 1.5 },
      { category: 'transport', label: '九州新幹線來回', hours: 1.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd4-1',
        shortLabel: '九州新幹線 ➔ 熊本城・城彩苑・勝烈亭・上下通',
        startHour: 9.0,
        endHour: 18.5,
        primaryCategory: 'sightseeing',
      },
    ],
    cutoffHour: 17.75,
    cutoffLabel: '17:45 隊友最晚新幹線返博多',
    routeNodes: [
      { name: '博多站', detail: '預劃新幹線指定席', modeToNext: '九州新幹線', durationToNext: '38 分' },
      { name: '熊本城＆城彩苑', detail: '天守閣與城下町', modeToNext: '路面電車/步行', durationToNext: '12 分' },
      { name: '勝烈亭＆上下通', detail: '六白黑豚與逛街', modeToNext: '九州新幹線', durationToNext: '40 分' },
      { name: '博多站', detail: '返回飯店休息' },
    ],
    crewPlan: {
      headline: '4 人同遊熊本城與勝烈亭',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '19:00 隊友最晚務必搭乘 17:45 熊本發車之新幹線返回博多',
    },
  },
  5: {
    dayNumber: 5,
    photo: day5Photo,
    photoAlt: '週六晴空下小倉競馬場草地跑道奔馳的純血賽馬與看台觀眾',
    figureCaption: 'Fig. 05 · JRA 小倉競馬場週六實戰草地賽事',
    locationStamp: '北九州・小倉',
    paceLabel: '全日熱戰',
    paceLevel: 4,
    estimatedSteps: 13800,
    walkingKm: 9.8,
    localTransitMinutes: 130,
    activityBreakdown: [
      { category: 'sports_entertainment', label: '小倉競馬場全日賽', hours: 5.5 },
      { category: 'dining', label: '旦過市場＆魚町晚餐', hours: 3.5 },
      { category: 'transport', label: 'Sonic 特急＆單軌', hours: 2.2 },
    ],
    timelineSlots: [
      {
        blockId: 'd5-1',
        shortLabel: '旦過市場早午餐 ➔ JRA 小倉競馬場至 16:00 尾場',
        startHour: 9.5,
        endHour: 16.0,
        primaryCategory: 'sports_entertainment',
      },
      {
        blockId: 'd5-2',
        shortLabel: '17:00 隊友返程 ➔ 魚町銀天街名物晚餐',
        startHour: 16.25,
        endHour: 21.0,
        primaryCategory: 'dining',
      },
    ],
    cutoffHour: 17.0,
    cutoffLabel: '17:00 隊友搭特急先返博多',
    routeNodes: [
      { name: '博多站', detail: 'JR 5 日券最終日', modeToNext: '特急 Sonic', durationToNext: '45 分' },
      { name: '旦過市場', detail: '大學丼＆外帶熟食', modeToNext: '北九州單軌', durationToNext: '10 分' },
      { name: '小倉競馬場', detail: '熱戰至 16:00 尾場', modeToNext: '單軌回小倉', durationToNext: '12 分' },
      { name: '魚町銀天街', detail: '鐵鍋餃子＆燒烏龍', modeToNext: '特急返博多', durationToNext: '48 分' },
    ],
    crewPlan: {
      headline: '4 人全日觀賽小倉競馬場',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
      specialNote: '16:15 回小倉站後，19:00 隊友搭 17:00 特急先返博多，其餘三人於魚町銀天街晚餐',
    },
  },
  6: {
    dayNumber: 6,
    photo: day6Photo,
    photoAlt: '陽光下的博多車站現代建築立面與精緻包裝的九州和菓子伴手禮盒',
    figureCaption: 'Fig. 06 · JR 博多城最後伴手禮採買與返程',
    locationStamp: '博多・福岡空港',
    paceLabel: '從容返程',
    paceLevel: 2,
    estimatedSteps: 8200,
    walkingKm: 5.8,
    localTransitMinutes: 15,
    activityBreakdown: [
      { category: 'sightseeing', label: 'AMU / 阪急最後採買', hours: 3.0 },
      { category: 'transport', label: '計程車往機場＆返台', hours: 3.5 },
    ],
    timelineSlots: [
      {
        blockId: 'd6-1',
        shortLabel: '退房寄行李 ➔ 博多站商場補貨 ➔ 星宇 JX843 返台',
        startHour: 9.5,
        endHour: 16.0,
        primaryCategory: 'transport',
      },
    ],
    routeNodes: [
      { name: 'Minn 博多', detail: '退房並寄放行李', modeToNext: '步行', durationToNext: '8 分' },
      { name: 'AMU / 博多阪急', detail: '九州伴手禮採買', modeToNext: '領行李搭車', durationToNext: '15 分' },
      { name: '福岡機場 FUK', detail: '2 台計程車直達', modeToNext: '星宇 JX843', durationToNext: '平安返台' },
      { name: '桃園機場 TPE', detail: '圓滿結束九州之旅' },
    ],
    crewPlan: {
      headline: '4 人全員滿載而歸返台',
      fullCrew: ['假髮', '班表人', '尼哥', '跟隨俠'],
    },
  },
};
