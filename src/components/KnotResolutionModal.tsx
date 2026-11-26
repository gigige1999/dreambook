import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  FastForward,
  Feather,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Search,
  Sparkles,
  Stamp,
  X,
} from 'lucide-react';
import { EvidenceItem, GuestCase, SeasonId } from '../types/game';
import { libraryAudio } from '../utils/audio';
import {
  CardOrientation,
  TarotCardData,
  TarotCardView,
} from './DreamTarotDeck';
import {
  EndingMagicIllustration,
  KeepsakeIllustration,
  SeasonSigilIcon,
} from './VisualKeepsakes';

const RITUAL_TABLETOP_ART = '/src/assets/images/desk_ritual_tabletop_clean.jpg';
const ROMAN_SLOTS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'] as const;

interface KnotResolutionModalProps {
  isOpen: boolean;
  currentCase: GuestCase;
  hasServedTea: boolean;
  onResolveSuccess: (feedback: string) => void;
  onBackToBook: () => void;
  onClose: () => void;
}

/* ============================================================================
 * 3:4 VINTAGE COPPERPLATE DECKS (WITH BACK INSCRIPTIONS & DECOY TRAPS)
 * ========================================================================== */
const SPRING_CARDS: TarotCardData[] = [
  {
    id: 'seq-bloom',
    roman: '❀',
    title: '开花',
    motif: '诚实唤醒花苞',
    artwork: 'bloom',
    supportsOrientation: true,
    backTitle: '暖棚手记',
    backInscription: '“直到喝饱了晨露与雨水，诚实的花苞才会朝日光昂首绽开；倒挂的花枝只会闷死在玻璃罩里。”',
  },
  {
    id: 'taboo-forever',
    roman: '∞',
    title: '永远',
    motif: '锁住春天的誓言',
    artwork: 'forever',
    tone: 'taboo',
    supportsOrientation: true,
    backTitle: '鎏金锁铭',
    backInscription: '“信封口用金环缠了一圈又一圈，写着‘愿我们永不改变’——可玻璃罩里被锁住的花，早就不再呼吸了。”',
  },
  {
    id: 'seq-sow',
    roman: '❦',
    title: '播种',
    motif: '埋下旧约种子',
    artwork: 'sow',
    supportsOrientation: true,
    backTitle: '黑土手记',
    backInscription: '“她跪在潮湿的黑土边把旧约定的种子埋下；若连根脉都倒悬朝天，芽尖便找不到地下的晨露。”',
  },
  {
    id: 'seq-farewell',
    roman: '✦',
    title: '告别',
    motif: '放手飞向月光',
    artwork: 'farewell',
    supportsOrientation: true,
    backTitle: '月光手记',
    backInscription: '“花瓣散尽的那晚她没有再遮住玻璃顶，而是扶正枝梢，任最后一阵风带走白色的花絮。”',
  },
  {
    id: 'taboo-lie',
    roman: '❖',
    title: '谎言',
    motif: '伪装挚友将归',
    artwork: 'lie',
    tone: 'ivory',
    supportsOrientation: true,
    backTitle: '旧信背页',
    backInscription: '“信纸正面写着‘再等两天她就会推门回来’，可翻过背面，墨水晕开处分明是半年前她寄不出去的草稿。”',
  },
  {
    id: 'seq-wait',
    roman: '☂',
    title: '等待',
    motif: '任晨露静静流过',
    artwork: 'wait',
    supportsOrientation: true,
    backTitle: '雨夜手记',
    backInscription: '“种子落土之后，唯有耐着性子等一场春雨渗过泥土；可抽到这一页时，露珠竟在叶底悬着倒流。”',
  },
];

const SUMMER_ANCHORS: TarotCardData[] = [
  {
    id: 'anc-prelude',
    roman: 'Ⅰ',
    title: '断弦序曲',
    motif: '缺一枚琴键共鸣',
    artwork: 'prelude',
    backTitle: '序章残谱',
    backInscription: '“琴台刚翻开第一页，高音弦便断在夏夜的风里，急需一枚带着光影的旧琴键补上开头。”',
  },
  {
    id: 'anc-watch',
    roman: 'Ⅱ',
    title: '回声怀表',
    motif: '停在失误那一秒',
    artwork: 'watch',
    backTitle: '走音那一秒',
    backInscription: '“怀表停在舞台中央失误的那一刻，学徒低头不敢看谱架——他等的是温柔原谅，而非冷冰冰的节拍。”',
  },
  {
    id: 'anc-seats',
    roman: 'Ⅲ',
    title: '空座掌声',
    motif: '第一排空无一人',
    artwork: 'seats',
    backTitle: '空荡第一排',
    backInscription: '“剧院灯暗了下来，台下第一排明明空着，学徒却仍攥着那张未撕角的纸片不肯散场。”',
  },
  {
    id: 'anc-crack',
    roman: '𝄢',
    title: '12小节裂隙',
    motif: '断裂的剧场暗缝',
    artwork: 'crack',
    tone: 'taboo',
    backTitle: '十二小节裂痕',
    backInscription: '“总谱第十二小节被浓墨划裂，像一道无人敢踩的舞台暗缝——任何强音压上去都会震乱左右乐声。”',
  },
];

const SUMMER_HAND_CARDS: TarotCardData[] = [
  {
    id: 'hnd-forgive',
    roman: '♩',
    title: '宽恕尾音',
    motif: '接纳偏音的旋律',
    artwork: 'forgive',
    backTitle: '偏音与微颤',
    backInscription: '“那两个音虽弹偏了半拍，老师却在乐谱边缘画了句柔和的圆弧，说‘人声本就不该像钟表’。”',
  },
  {
    id: 'hnd-metronome',
    roman: '⏱',
    title: '完美节拍器',
    motif: '分毫不差的强拍',
    artwork: 'metronome',
    tone: 'ivory',
    backTitle: '黄铜强拍',
    backInscription: '“木壳节拍器以分毫不差的冷硬声响逼迫每根手指归位——亚瑟最怕听见的，正是这种不许出错的咔哒声。”',
  },
  {
    id: 'hnd-erase',
    roman: '♯',
    title: '重弹擦除',
    motif: '强行抹去失误',
    artwork: 'erase',
    tone: 'taboo',
    backTitle: '浓墨涂痕',
    backInscription: '“用墨水和橡皮把错音硬生生刮穿纸背，可纸页一旦破了洞，连原本完整的相邻小节也会跟着散架。”',
  },
  {
    id: 'hnd-key',
    roman: '𝄞',
    title: '金色琴键',
    motif: '唤醒盛夏光影',
    artwork: 'gold-key',
    backTitle: '旧琴台微光',
    backInscription: '“从琴凳暗格拾起的第13枚琴键，还留着盛夏排练时阳光落在木纹上的暖意。”',
  },
  {
    id: 'hnd-ticket',
    roman: '♫',
    title: '谢幕票根',
    motif: '温柔收场之证',
    artwork: 'ticket',
    backTitle: '八月余晖',
    backInscription: '“褪色票根一角印着‘致第一排缺席的听众’，只要有人轻轻放进空座，掌声便会如潮水般响起。”',
  },
];

const AUTUMN_CARDS: (TarotCardData & {
  surfaceWeight: number;
  trueWeight: number;
  isGenuineWarm: boolean;
})[] = [
  {
    id: 'mem-hearth',
    roman: 'Ⅰ',
    title: '壁炉低笑',
    motif: '暖意轻如羽毛',
    artwork: 'hearth',
    surfaceWeight: 1,
    trueWeight: 1,
    isGenuineWarm: true,
    backTitle: '火漆家书',
    backInscription: '“他把灰披肩搭在我肩头时笑了一声，那段冬夜炉火没有留下半句催促或抱怨，读起来轻得像一缕暖烟。”',
  },
  {
    id: 'mem-ledger',
    roman: '✒',
    title: '沉重药单',
    motif: '琐碎焦虑如石',
    artwork: 'ledger',
    tone: 'stone',
    surfaceWeight: 3,
    trueWeight: 3,
    isGenuineWarm: false,
    backTitle: '病榻药方',
    backInscription: '“页边密密麻麻算着药费与归期，每一笔墨迹都沉甸甸压在胸口，让整封信几乎沉入桌面。”',
  },
  {
    id: 'mem-fake',
    roman: 'Ⅳ',
    title: '镀金旧照',
    motif: '装裱精致的合影',
    artwork: 'gilded-photo',
    tone: 'ivory',
    surfaceWeight: 1,
    trueWeight: 3,
    isGenuineWarm: false,
    backTitle: '相框背面',
    backInscription: '“正面镀着金边笑得温婉，可翻到相纸背后，却满是用力划破纸纤维的字迹：‘你当年根本不该离开邮局！’”',
  },
  {
    id: 'mem-tea',
    roman: 'Ⅱ',
    title: '秋雨红茶',
    motif: '窗边余温未散',
    artwork: 'tea',
    surfaceWeight: 1,
    trueWeight: 1,
    isGenuineWarm: true,
    backTitle: '雨夜红茶',
    backInscription: '“雨点敲着邮局绿玻璃窗，他递来滚烫的瓷杯却什么也没问，这份余温不重，恰足以暖透指尖。”',
  },
  {
    id: 'mem-chain',
    roman: '⛓',
    title: '铁链执念',
    motif: '锁死悲欢的重负',
    artwork: 'chain',
    tone: 'stone',
    surfaceWeight: 3,
    trueWeight: 3,
    isGenuineWarm: false,
    backTitle: '未寄铁锁',
    backInscription: '“把遗憾一字不落锁进牛皮纸袋里，看似保存了全部悲欢，实则让这页回忆沉若铁锚。”',
  },
  {
    id: 'mem-home',
    roman: 'Ⅲ',
    title: '那句回家',
    motif: '门廊笃定的轻唤',
    artwork: 'home',
    surfaceWeight: 1,
    trueWeight: 1,
    isGenuineWarm: true,
    backTitle: '门廊轻唤',
    backInscription: '“临行前门廊灯影里那句平静的‘记得回家’，没有一句责备，轻盈得能乘秋风寄到明天。”',
  },
];

const WINTER_SLOTS = [
  { id: 'slot-past', roman: '左槽', label: '过去 · 再等一刻' },
  { id: 'slot-present', roman: '中槽', label: '此刻 · 冻结静止' },
  { id: 'slot-future', roman: '右槽', label: '未来 · 留白新流' },
] as const;

const WINTER_CARDS: TarotCardData[] = [
  {
    id: 'gear-past',
    roman: '↺',
    title: '倒流之齿',
    motif: '拖回十年前雪夜',
    artwork: 'past-gear',
    tone: 'stone',
    backTitle: '十年前雪夜',
    backInscription: '“齿牙生锈却执意倒转，总想把钟摆拖回十年前那场大雪刚停的夜里——可停在旧夜的齿轮，只会咬死整座表盘。”',
  },
  {
    id: 'gear-present',
    roman: '❄',
    title: '静止冰晶',
    motif: '冻住此刻不流转',
    artwork: 'ice-crystal',
    tone: 'taboo',
    backTitle: '永冻气泡',
    backInscription: '“透明冰晶把这一秒冻成标本，既不后退也不前进；可若连此刻都拒绝流动，明天便永远进不来。”',
  },
  {
    id: 'gear-future',
    roman: '⚙',
    title: '未来之齿',
    motif: '松开冰封的齿轮',
    artwork: 'future-gear',
    supportsOrientation: true,
    backTitle: '铜芯刻度',
    backInscription: '“唯独这枚留给未知明天的黄铜齿轮尚未生锈——只要它朝顺流方向咬合而去，便不必再靠回望填满钟框。”',
  },
  {
    id: 'card-frostfire',
    roman: '✦',
    title: '余烬假象',
    motif: '宛如炉火的微光',
    artwork: 'frost-flame',
    tone: 'ember',
    backTitle: '幽蓝冷光',
    backInscription: '“远看像炉膛里跳跃的橘金火苗，凑近手背却刺骨发寒——它并非炉火，而是雪夜结霜前最后一抹虚幻反光。”',
  },
  {
    id: 'card-thaw',
    roman: '🔥',
    title: '暖铜余温',
    motif: '拂去表盘霜寒',
    artwork: 'warm-ember',
    tone: 'ember',
    backTitle: '掌心余温',
    backInscription: '“从旧书页缝隙间取回的真实铜暖，虽微弱却不熄；唯有搭在顺转的新齿轮上，方能一点点化开冰壳。”',
  },
];

const KEEPSAKE_VERIFY_MAP: Record<
  string,
  Record<string, { badge: string; note: string; isContradiction: boolean }>
> = {
  'ev-sp-promise': {
    'taboo-forever': {
      badge: '照出矛盾 · 枷锁',
      note: '「旧约定」原只写着各自奔赴新春天，牌上“永远”二字是后来强行描粗锁死花房的！',
      isContradiction: true,
    },
    'taboo-lie': {
      badge: '照出日期伪饰',
      note: '对照「旧约定」日期，这张“挚友将归”的字条半年前就被改写，背面全是欺瞒。',
      isContradiction: true,
    },
    'seq-sow': {
      badge: '泥印相契',
      note: '「旧约定」纸角的湿土印与这枚种子完全吻合，正是生长的第一步。',
      isContradiction: false,
    },
  },
  'ev-sp-pollen': {
    'seq-bloom': {
      badge: '花粉微亮',
      note: '「记忆花粉」落上花蕊，唯有正位昂首的花朵才能接住晨光。',
      isContradiction: false,
    },
    'taboo-lie': {
      badge: '花粉发黑枯萎',
      note: '「记忆花粉」一碰此牌便瞬间发黑——这截枯枝从未真正开过花。',
      isContradiction: true,
    },
  },
  'ev-sp-pot': {
    'seq-wait': {
      badge: '空盆蓄露',
      note: '「空花盆」正静待春雨渗入，若倒悬牌面，水珠便悬空难下。',
      isContradiction: false,
    },
    'taboo-forever': {
      badge: '盆沿结霜',
      note: '把空花盆锁进“永远”，新芽就再也没有破土的缝隙。',
      isContradiction: true,
    },
  },
  'ev-sp-sprout': {
    'seq-farewell': {
      badge: '新芽随风舒展',
      note: '花瓣离开后，花萼下早抽出新枝——真正的告别才让芽尖向上生长。',
      isContradiction: false,
    },
    'seq-sow': {
      badge: '叶脉起点',
      note: '「嫩芽符号」的叶脉指向一切生长诚实的起点。',
      isContradiction: false,
    },
  },
  'ev-su-watch': {
    'hnd-metronome': {
      badge: '怀表刺耳走偏',
      note: '「回声怀表」靠近节拍器立刻发出杂音——学徒正是被这种冷硬强拍逼到失误！',
      isContradiction: true,
    },
    'hnd-forgive': {
      badge: '表针轻颤松动',
      note: '柔和的偏音尾韵抚平了卡死的秒针，他真正等的是宽恕。',
      isContradiction: false,
    },
    'anc-watch': {
      badge: '停在失误秒针',
      note: '表盖内侧划痕说明它只能被温和宽恕唤醒，忌用强拍硬压。',
      isContradiction: false,
    },
  },
  'ev-su-score': {
    'hnd-erase': {
      badge: '残谱裂口相冲',
      note: '「碎乐谱」的破洞正是橡皮硬刮留下的！再涂抹擦除，连邻近小节也会震散。',
      isContradiction: true,
    },
    'anc-crack': {
      badge: '十二小节暗缝',
      note: '「碎乐谱」缺角正对着这道裂痕，强行落声只会震碎相邻和声。',
      isContradiction: true,
    },
    'hnd-key': {
      badge: '序章音阶吻合',
      note: '「碎乐谱」开篇空白处正缺这枚带着暖意的高音琴键。',
      isContradiction: false,
    },
  },
  'ev-su-key': {
    'anc-prelude': {
      badge: '木纹恰好嵌入',
      note: '「金色琴键」上的细纹正合「断弦序曲」空缺的首音。',
      isContradiction: false,
    },
    'hnd-key': {
      badge: '盛夏主音重合',
      note: '与琴台暗格拾起的琴键温润如一，是唤醒盛夏的第一声。',
      isContradiction: false,
    },
  },
  'ev-su-ticket': {
    'anc-seats': {
      badge: '票号对应第一排',
      note: '未撕角的旧票正对着第一排空椅，它在等温柔的谢幕回响。',
      isContradiction: false,
    },
    'hnd-ticket': {
      badge: '八月谢幕印记',
      note: '票根边角还留着当年剧场散场时的微暖余晖。',
      isContradiction: false,
    },
  },
  'ev-au-wax': {
    'mem-fake': {
      badge: '照出背面苛责！',
      note: '用「封蜡纹章」一照，「镀金旧照」背面顿时浮出“你本该早些回来”的沉重刻痕！',
      isContradiction: true,
    },
    'mem-hearth': {
      badge: '火漆轻盈无怨',
      note: '「封蜡纹章」印在壁炉低笑上温润平稳，毫无苛责之重。',
      isContradiction: false,
    },
  },
  'ev-au-letter': {
    'mem-tea': {
      badge: '信笺浮现茶香',
      note: '「消散信件」上的雨渍与红茶热气相合，轻盈得能乘秋风启程。',
      isContradiction: false,
    },
    'mem-chain': {
      badge: '信纸被铁锁拖沉',
      note: '死死锁住整封信的执念，让该寄出的思念再也飞不起来。',
      isContradiction: true,
    },
  },
  'ev-au-quill': {
    'mem-home': {
      badge: '笔锋温柔笃定',
      note: '「羽毛笔」写下“记得回家”时毫不犹豫，轻若鸿毛。',
      isContradiction: false,
    },
    'mem-ledger': {
      badge: '笔尖滞重划纸',
      note: '抄写药单账目时笔锋深深刺入纸背，每笔都是沉重忧虑。',
      isContradiction: true,
    },
  },
  'ev-au-portrait': {
    'mem-fake': {
      badge: '相框藏着铅重！',
      note: '「旧肖像碎片」一靠近这张镀金相片便猛地发沉——精美画框下藏着沉重内疚！',
      isContradiction: true,
    },
    'mem-hearth': {
      badge: '暖光拼回眉眼',
      note: '壁炉边的低笑正好补上旧肖像久违的温柔笑意。',
      isContradiction: false,
    },
  },
  'ev-wi-key': {
    'card-frostfire': {
      badge: '照出幽蓝冷焰！',
      note: '「冰晶钥匙」一碰“余烬假象”，橘光瞬间褪成刺骨幽蓝——它非炉火，只会凝霜！',
      isContradiction: true,
    },
    'card-thaw': {
      badge: '冰晶融出温水',
      note: '「冰晶钥匙」在「暖铜余温」旁化出一滴暖水，这才是真正的铜暖。',
      isContradiction: false,
    },
  },
  'ev-wi-gear': {
    'gear-future': {
      badge: '八齿咬合右轴',
      note: '齿距与书中残齿轮廓完全重合，正属于「未来」右轴且须顺流咬合。',
      isContradiction: false,
    },
    'gear-past': {
      badge: '锈齿死结相卡',
      note: '十齿旧轮执意倒转，落入钟框便会彻底锁死表盘。',
      isContradiction: true,
    },
  },
  'ev-wi-dial': {
    'gear-present': {
      badge: '中轴冰裂延伸',
      note: '「碎钟面」最深那道冰裂正压在中轴“此刻”，锁住此刻便永无明日。',
      isContradiction: true,
    },
    'gear-past': {
      badge: '左轴早已结死',
      note: '「碎钟面」左侧积满十年前顽冰，再装入任何齿轮都会立刻僵死。',
      isContradiction: true,
    },
  },
  'ev-wi-snow': {
    'card-frostfire': {
      badge: '雪晶增生结冰！',
      note: '「雪晶符号」靠近这团微光反而长出锋利冰刺，它是冻人的虚幻冷焰！',
      isContradiction: true,
    },
    'card-thaw': {
      badge: '雪晶化为青石露',
      note: '「暖铜余温」让雪晶六角缓缓化开，露出雪下石阶微光。',
      isContradiction: false,
    },
  },
};

const SEASON_META: Record<
  SeasonId,
  {
    vignetteTint: string;
    runes: string[];
    runeColor: string;
    modeTag: string;
    slipInstruction: string;
  }
> = {
  spring: {
    vignetteTint:
      'radial-gradient(circle at 50% 42%, rgba(164, 214, 170, 0.12), rgba(16, 11, 7, 0.48) 84%)',
    runes: ['✿', '❦', '✦', '❀'],
    runeColor: '#C2E8C7',
    modeTag: '春芽时序 · 识伪',
    slipInstruction: '梦芽园里混入了留住过去的糖衣与谎言——轻触桌角信物照验牌面或翻背细读，依生长之序扶正出牌',
  },
  summer: {
    vignetteTint:
      'radial-gradient(circle at 50% 42%, rgba(235, 194, 104, 0.14), rgba(16, 11, 7, 0.48) 84%)',
    runes: ['𝄞', '♩', '♫', '✦'],
    runeColor: '#F6D789',
    modeTag: '残谱共鸣 · 听伪',
    slipInstruction: '盛夏琴台只回响三种真切心意，可有人想用强拍与涂抹掩盖失误——翻开盲面残谱并借信物听出不和谐之声',
  },
  autumn: {
    vignetteTint:
      'radial-gradient(circle at 50% 42%, rgba(196, 152, 224, 0.14), rgba(18, 11, 14, 0.5) 84%)',
    runes: ['✒', '✉', '✦', '❦'],
    runeColor: '#E2C6F5',
    modeTag: '记忆天平 · 称心',
    slipInstruction: '秋风吹散沉重与虚饰，唯有不带苛责的微温能拼回肖像——小心那张表面镀金的旧照，用桌角信物照出背后真话',
  },
  winter: {
    vignetteTint:
      'radial-gradient(circle at 50% 42%, rgba(154, 202, 240, 0.16), rgba(12, 14, 20, 0.52) 84%)',
    runes: ['❄', '⚙', '✦', '✧'],
    runeColor: '#C0E0FA',
    modeTag: '钟楼空轴 · 辨温',
    slipInstruction: '整座钟楼因执着于过去与此刻而冻僵——细辨哪缕微光带着真温、哪处轴承本该留白让明日顺流',
  },
};

export const KnotResolutionModal: React.FC<KnotResolutionModalProps> = ({
  isOpen,
  currentCase,
  hasServedTea,
  onResolveSuccess,
  onBackToBook,
  onClose,
}) => {
  const [selectedHandCardId, setSelectedHandCardId] = useState<string | null>(null);
  const [hoveredFanCardId, setHoveredFanCardId] = useState<string | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);

  // Flip & inspection state (cardId -> flipped face-down/back showing)
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});
  const [inspectedMap, setInspectedMap] = useState<Record<string, boolean>>({});
  const [orientationMap, setOrientationMap] = useState<Record<string, CardOrientation>>({});

  // Spring: 4 slots
  const [springSlots, setSpringSlots] = useState<(string | null)[]>([null, null, null, null]);

  // Summer: anchorId -> stacked handCardId + shock feedback notice
  const [summerPairs, setSummerPairs] = useState<Record<string, string | null>>({
    'anc-prelude': null,
    'anc-watch': null,
    'anc-seats': null,
    'anc-crack': null,
  });
  const [summerShockNote, setSummerShockNote] = useState<string | null>(null);

  // Autumn: keep vs discard piles
  const [autumnKeepIds, setAutumnKeepIds] = useState<string[]>([]);
  const [autumnDiscardIds, setAutumnDiscardIds] = useState<string[]>([]);

  // Winter: 3 clock slots -> gear card ID, plus which slot has flame stacked
  const [winterSlots, setWinterSlots] = useState<Record<string, string | null>>({
    'slot-past': null,
    'slot-present': null,
    'slot-future': null,
  });
  const [winterHeatCardId, setWinterHeatCardId] = useState<{
    slotId: string;
    cardId: string;
  } | null>(null);

  // Corner keepsake & tea slip hover/pin + active verification lens state
  const [hoveredEvidence, setHoveredEvidence] = useState<EvidenceItem | null>(null);
  const [hoveredTeaSlip, setHoveredTeaSlip] = useState(false);
  const [pinnedTipId, setPinnedTipId] = useState<string | null>(null);
  const [selectedVerifyEvidenceId, setSelectedVerifyEvidenceId] = useState<string | null>(null);
  const [verifiedCardNotes, setVerifiedCardNotes] = useState<Record<string, string>>({});
  const [verifyRevealNote, setVerifyRevealNote] = useState<{
    evidenceTitle: string;
    cardTitle: string;
    text: string;
    isContradiction: boolean;
  } | null>(null);
  const [tableImgFailed, setTableImgFailed] = useState(false);

  const [endingOutcome, setEndingOutcome] = useState<
    | null
    | { kind: 'good'; feedback: string }
    | { kind: 'bad'; title: string; subtitle: string; desc: string }
  >(null);

  const resetAllBoards = () => {
    setSelectedHandCardId(null);
    setHoveredFanCardId(null);
    setDraggingCardId(null);
    setSpringSlots([null, null, null, null]);
    setSummerPairs({
      'anc-prelude': null,
      'anc-watch': null,
      'anc-seats': null,
      'anc-crack': null,
    });
    setSummerShockNote(null);
    setAutumnKeepIds([]);
    setAutumnDiscardIds([]);
    setWinterSlots({
      'slot-past': null,
      'slot-present': null,
      'slot-future': null,
    });
    setWinterHeatCardId(null);

    // Initialize blind anchors (Summer) & initial reversed cards (Spring / Winter)
    setFlippedMap({
      'anc-prelude': true,
      'anc-watch': true,
      'anc-seats': true,
    });
    setInspectedMap({});
    setOrientationMap({
      'seq-wait': 'reversed',
      'seq-farewell': 'reversed',
      'gear-future': 'reversed',
    });
    setSelectedVerifyEvidenceId(null);
    setVerifiedCardNotes({});
    setVerifyRevealNote(null);
  };

  useEffect(() => {
    resetAllBoards();
    setHoveredEvidence(null);
    setHoveredTeaSlip(false);
    setPinnedTipId(null);
    setEndingOutcome(null);
  }, [currentCase.id, isOpen]);

  if (!isOpen) return null;

  const { knot, season } = currentCase;
  const meta = SEASON_META[season];

  const toggleFlipCard = (cardId: string) => {
    libraryAudio.playCardFlip();
    setFlippedMap((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
    setInspectedMap((prev) => ({
      ...prev,
      [cardId]: true,
    }));
  };

  const toggleOrientationCard = (cardId: string) => {
    libraryAudio.playBrassClick();
    setOrientationMap((prev) => ({
      ...prev,
      [cardId]: prev[cardId] === 'reversed' ? 'upright' : 'reversed',
    }));
  };

  const handleDragStartCard = (cardId: string) => (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingCardId(cardId);
    setSelectedHandCardId(cardId);
  };

  const handleDragEndCard = () => {
    setDraggingCardId(null);
  };

  const getDroppedCardId = (e: React.DragEvent) =>
    e.dataTransfer.getData('text/plain') || draggingCardId || selectedHandCardId;

  /* ---------------- SPRING HANDLERS ---------------- */
  const placeSpringCard = (cardId: string, slotIdx: number) => {
    const orient = orientationMap[cardId] ?? 'upright';
    if (orient === 'reversed') {
      libraryAudio.playGentleNudge();
    } else {
      libraryAudio.playSlotPlace();
    }
    setSpringSlots((prev) => {
      const cleared = prev.map((id) => (id === cardId ? null : id));
      cleared[slotIdx] = cardId;
      return cleared;
    });
    setSelectedHandCardId(null);
    setDraggingCardId(null);
  };

  /* ---------------- SUMMER HANDLERS ---------------- */
  const pairSummerCard = (handId: string, anchorId: string) => {
    // Auto-reveal blind anchor if player drops straight onto a face-down anchor
    if (flippedMap[anchorId]) {
      setFlippedMap((prev) => ({ ...prev, [anchorId]: false }));
      setInspectedMap((prev) => ({ ...prev, [anchorId]: true }));
    }

    const isTrapCard = handId === 'hnd-erase' || handId === 'hnd-metronome' || anchorId === 'anc-crack';
    const isValidPair =
      (anchorId === 'anc-prelude' && handId === 'hnd-key') ||
      (anchorId === 'anc-watch' && handId === 'hnd-forgive') ||
      (anchorId === 'anc-seats' && handId === 'hnd-ticket');

    const anchorOrder = ['anc-prelude', 'anc-watch', 'anc-seats', 'anc-crack'];
    const targetIdx = anchorOrder.indexOf(anchorId);

    setSummerPairs((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (next[k] === handId) next[k] = null;
      });
      next[anchorId] = handId;

      if (isTrapCard) {
        // Chain shockwave! Ejects an adjacent paired harmony card back to hand!
        const neighborIdx = targetIdx > 0 ? targetIdx - 1 : targetIdx + 1;
        const neighborKey = anchorOrder[neighborIdx];
        const altKey = anchorOrder.find((k, idx) => k !== anchorId && idx !== neighborIdx && next[k]);
        const ejectedAnchor = next[neighborKey] ? neighborKey : altKey;

        if (ejectedAnchor && next[ejectedAnchor]) {
          const ejectedCard = SUMMER_HAND_CARDS.find((c) => c.id === next[ejectedAnchor]);
          next[ejectedAnchor] = null;
          setSummerShockNote(
            `裂隙与强拍余波震荡琴台，「${ejectedCard?.title ?? '邻槽手牌'}」已被震落退回下方牌扇。`
          );
        } else {
          setSummerShockNote('琴台发出刺耳震颤，此声与残谱气息格格不入。');
        }
        libraryAudio.playCardChainShock();
      } else {
        setSummerShockNote(null);
        if (isValidPair) {
          libraryAudio.playPianoKey(
            anchorId === 'anc-prelude' ? 523.25 : anchorId === 'anc-watch' ? 659.25 : 880.0,
            false
          );
        } else {
          libraryAudio.playSlotPlace();
        }
      }

      return next;
    });

    setSelectedHandCardId(null);
    setDraggingCardId(null);
  };

  /* ---------------- AUTUMN HANDLERS ---------------- */
  const moveAutumnCard = (cardId: string, target: 'keep' | 'discard' | 'hand') => {
    const nextKeep =
      target === 'keep'
        ? Array.from(new Set([...autumnKeepIds, cardId]))
        : autumnKeepIds.filter((id) => id !== cardId);
    const nextDiscard =
      target === 'discard'
        ? Array.from(new Set([...autumnDiscardIds, cardId]))
        : autumnDiscardIds.filter((id) => id !== cardId);

    const nextTrueWeight = nextKeep.reduce((sum, id) => {
      const c = AUTUMN_CARDS.find((card) => card.id === id);
      return sum + (c?.trueWeight ?? 1);
    }, 0);
    libraryAudio.playScaleCreak(nextKeep.length > 3 || nextTrueWeight > 3);

    setAutumnKeepIds(nextKeep);
    setAutumnDiscardIds(nextDiscard);
    setSelectedHandCardId(null);
    setDraggingCardId(null);
  };

  /* ---------------- WINTER HANDLERS ---------------- */
  const placeWinterCard = (cardId: string, slotId: string) => {
    if (cardId === 'card-thaw' || cardId === 'card-frostfire') {
      if (!winterSlots[slotId]) {
        libraryAudio.playGentleNudge();
        return;
      }
      const isTrueWarm =
        cardId === 'card-thaw' &&
        slotId === 'slot-future' &&
        winterSlots['slot-future'] === 'gear-future' &&
        (orientationMap['gear-future'] ?? 'upright') === 'upright' &&
        !winterSlots['slot-past'] &&
        !winterSlots['slot-present'];
      if (cardId === 'card-frostfire') {
        libraryAudio.playCardChainShock();
      } else {
        libraryAudio.playClockTick(!isTrueWarm);
      }
      setWinterHeatCardId({ slotId, cardId });
      setSelectedHandCardId(null);
      setDraggingCardId(null);
      return;
    }

    const oldSlotId = Object.keys(winterSlots).find((k) => winterSlots[k] === cardId);
    const nextSlots = { ...winterSlots };
    if (oldSlotId) nextSlots[oldSlotId] = null;
    nextSlots[slotId] = cardId;

    let nextHeat = winterHeatCardId;
    if (oldSlotId && winterHeatCardId?.slotId === oldSlotId) {
      nextHeat = { ...winterHeatCardId, slotId };
    } else if (winterHeatCardId?.slotId === slotId && winterSlots[slotId] && winterSlots[slotId] !== cardId) {
      nextHeat = null;
    }

    const filledKeys = Object.entries(nextSlots).filter(([, v]) => Boolean(v));
    const isTicking =
      filledKeys.length === 1 &&
      nextSlots['slot-future'] === 'gear-future' &&
      (orientationMap['gear-future'] ?? 'upright') === 'upright' &&
      nextHeat?.slotId === 'slot-future' &&
      nextHeat?.cardId === 'card-thaw';

    if (slotId !== 'slot-future') {
      libraryAudio.playCardChainShock();
    } else {
      libraryAudio.playClockTick(!isTicking);
    }

    setWinterSlots(nextSlots);
    setWinterHeatCardId(nextHeat);
    setSelectedHandCardId(null);
    setDraggingCardId(null);
  };

  /* ---------------- CAN SEAL VERDICT? ---------------- */
  const canSealBoard = (() => {
    switch (season) {
      case 'spring':
        return springSlots.every((s) => s !== null);
      case 'summer':
        return Object.values(summerPairs).filter(Boolean).length >= 1;
      case 'autumn':
        return autumnKeepIds.length + autumnDiscardIds.length === AUTUMN_CARDS.length;
      case 'winter':
        return Object.values(winterSlots).some(Boolean);
    }
  })();

  const handleSealVerdict = () => {
    if (!canSealBoard) return;
    libraryAudio.playWaxSealStamp();

    if (season === 'spring') {
      if (springSlots.includes('taboo-forever')) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 静止的枯藤牢笼',
          subtitle: '禁忌牌「永远」落入了春芽阵位',
          desc: '“永远”二字令整座漂浮温室的露珠与花苞瞬间凝固，伊索尔德再度被枯藤锁回同一个醒不来的春天。',
        });
        return;
      }
      if (springSlots.includes('taboo-lie')) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 枯萎的梦芽园',
          subtitle: '伪装禁忌牌「谎言」令整盆春芽黯然枯萎',
          desc: '梦芽园里的种子听得懂伪饰。未先翻牌识破“谎言”的枯枝暗铭，花瓣便会失去所有金绿荧光。',
        });
        return;
      }
      const hasReversed = springSlots.some(
        (id) => id && (orientationMap[id] ?? 'upright') === 'reversed'
      );
      if (hasReversed) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 逆位停滞的花信',
          subtitle: '阵中仍有倒悬「逆位 ↓」的春芽牌未曾扶正',
          desc: '倒悬的时光让露珠停在叶尖无法滴落。需将「播种、等待、开花、告别」全部旋为「正位 ↑」方能破土绽放。',
        });
        return;
      }
      const expected = ['seq-sow', 'seq-wait', 'seq-bloom', 'seq-farewell'];
      const ok = springSlots.every((id, i) => id === expected[i]);
      if (!ok) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: knot.badEndingDefault.title,
          subtitle: knot.badEndingDefault.subtitle,
          desc: knot.badEndingDefault.desc,
        });
        return;
      }
    } else if (season === 'summer') {
      const placedCards = Object.values(summerPairs).filter(Boolean);
      if (
        summerPairs['anc-crack'] !== null ||
        placedCards.includes('hnd-erase') ||
        placedCards.includes('hnd-metronome')
      ) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 裂隙吞没琴台',
          subtitle: '触碰了裂隙或叠入了「重弹擦除 / 完美节拍器」诱饵',
          desc: '强行擦除失误或用冰冷机械强拍校正，令第12小节的裂隙蔓延至整座盛夏剧场。',
        });
        return;
      }
      const ok =
        summerPairs['anc-prelude'] === 'hnd-key' &&
        summerPairs['anc-watch'] === 'hnd-forgive' &&
        summerPairs['anc-seats'] === 'hnd-ticket';
      if (!ok) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: knot.badEndingDefault.title,
          subtitle: '琴键和声尚未完全配对成功',
          desc: '请翻开三张盲面底牌核对乐声需求，将「金色琴键」「宽恕尾音」「谢幕票根」一一叠对。',
        });
        return;
      }
    } else if (season === 'autumn') {
      if (autumnKeepIds.length === 0) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 灰烬邮局',
          subtitle: '所有记忆信牌都被弃入秋风之中',
          desc: '连最温暖的三段回忆也一并舍弃后，桌面只余冷冰冰的炉灰。',
        });
        return;
      }
      if (autumnKeepIds.includes('mem-fake')) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 铅重相框压垮天平',
          subtitle: '未识破「镀金旧照」背面的隐性铅重苛责',
          desc: '那张看似温和的镀金旧照背面写满苛责，放入保留区后瞬间化作黑石压翻了整座记忆天平。',
        });
        return;
      }
      const hasStone = autumnKeepIds.some((id) => {
        const c = AUTUMN_CARDS.find((card) => card.id === id);
        return c && !c.isGenuineWarm;
      });
      if (autumnKeepIds.length > 3 || hasStone) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 石化的记忆怪物',
          subtitle: '保留牌过量或掺入了沉重的石块执念',
          desc: '肖像保留区只能轻盈留住 3 张真正轻盈的温暖记忆；其余石重与伪装牌必须悉数丢入秋风堆。',
        });
        return;
      }
      if (autumnKeepIds.length < 3) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: knot.badEndingDefault.title,
          subtitle: '保留的温暖记忆不足 3 张，肖像未能完整',
          desc: '请将「壁炉低笑」「秋雨红茶」「那句回家」全部留入肖像保留区，其余三张沉重牌弃入秋风堆。',
        });
        return;
      }
    } else if (season === 'winter') {
      const filledCount = Object.values(winterSlots).filter(Boolean).length;
      if (filledCount === 3) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 永冻的完整之钟',
          subtitle: '三座钟表卡槽被全部填满，时间彻底死锁',
          desc: '完整无缺之钟会把人永远困在原地等待。必须刻意留空「过去」与「此刻」两槽。',
        });
        return;
      }
      if (Object.values(winterSlots).includes('gear-present') || Object.values(winterSlots).includes('gear-past')) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 时间气泡囚牢',
          subtitle: '落入了「倒流之齿 / 静止冰晶」并触发寒霜连锁',
          desc: '越想把过去或此刻留住，寒霜越会顺着齿槽封死整座怀表。',
        });
        return;
      }
      if (winterHeatCardId?.cardId === 'card-frostfire') {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 幽蓝冷焰封霜',
          subtitle: '叠放了假热源「余烬假象」而非真正的暖铜余温',
          desc: '没有翻牌核验那抹微光——苍白冷焰虽像炉火，落在未来之齿上却凝成永冻冰壳。',
        });
        return;
      }
      if (
        winterSlots['slot-future'] === 'gear-future' &&
        (orientationMap['gear-future'] ?? 'upright') === 'reversed'
      ) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: '坏结局 · 逆时针倒转之钟',
          subtitle: '「未来之齿」仍处于逆位 ↓，表针倒流退回雪夜',
          desc: '必须先将「未来之齿」旋至「正位 ↑」顺流转动，再叠放「暖铜余温」方能报时。',
        });
        return;
      }
      const ok =
        filledCount === 1 &&
        winterSlots['slot-future'] === 'gear-future' &&
        (orientationMap['gear-future'] ?? 'upright') === 'upright' &&
        winterHeatCardId?.slotId === 'slot-future' &&
        winterHeatCardId?.cardId === 'card-thaw';
      if (!ok) {
        libraryAudio.playBadEndingDissonance();
        setEndingOutcome({
          kind: 'bad',
          title: knot.badEndingDefault.title,
          subtitle:
            winterSlots['slot-future'] === 'gear-future' && winterHeatCardId?.cardId !== 'card-thaw'
              ? '「未来之齿」尚未叠放真正的「暖铜余温」'
              : '齿轮未能正确落入「右槽 · 未来」或未留空其余两槽',
          desc: '请将正位「未来之齿」放入「右槽 · 未来」，再叠放真「暖铜余温」，并保持左、中两槽空置。',
        });
        return;
      }
    }

    // Good Ending!
    if (season === 'summer') {
      libraryAudio.playSilverBellMelody();
    } else {
      libraryAudio.playKnotResolved();
    }
    const healingInterp = knot.interpretations.find((i) => i.isHealingTruth);
    setEndingOutcome({
      kind: 'good',
      feedback: healingInterp?.feedback ?? knot.resolutionDialogue,
    });
  };

  const handleQuickSolveTable = () => {
    setSelectedHandCardId(null);
    setDraggingCardId(null);
    setSummerShockNote(null);

    if (season === 'spring') {
      setSpringSlots(['seq-sow', 'seq-wait', 'seq-bloom', 'seq-farewell']);
      setOrientationMap((prev) => ({
        ...prev,
        'seq-sow': 'upright',
        'seq-wait': 'upright',
        'seq-bloom': 'upright',
        'seq-farewell': 'upright',
      }));
    } else if (season === 'summer') {
      setFlippedMap((prev) => ({
        ...prev,
        'anc-prelude': false,
        'anc-watch': false,
        'anc-seats': false,
      }));
      setSummerPairs({
        'anc-prelude': 'hnd-key',
        'anc-watch': 'hnd-forgive',
        'anc-seats': 'hnd-ticket',
        'anc-crack': null,
      });
    } else if (season === 'autumn') {
      setAutumnKeepIds(['mem-hearth', 'mem-tea', 'mem-home']);
      setAutumnDiscardIds(['mem-ledger', 'mem-chain', 'mem-fake']);
    } else if (season === 'winter') {
      setWinterSlots({
        'slot-past': null,
        'slot-present': null,
        'slot-future': 'gear-future',
      });
      setOrientationMap((prev) => ({ ...prev, 'gear-future': 'upright' }));
      setWinterHeatCardId({ slotId: 'slot-future', cardId: 'card-thaw' });
    }

    if (season === 'summer') {
      libraryAudio.playSilverBellMelody();
    } else {
      libraryAudio.playKnotResolved();
    }
    const healingInterp = knot.interpretations.find((i) => i.isHealingTruth);
    setEndingOutcome({
      kind: 'good',
      feedback: healingInterp?.feedback ?? knot.resolutionDialogue,
    });
  };

  /* ---------------- LIVE DERIVED STATES FOR FEEDBACK ---------------- */
  const springHasReversed = springSlots.some(
    (id) => id && (orientationMap[id] ?? 'upright') === 'reversed'
  );

  // Autumn true weight & Brass Scale Tilt (zero numeric cheat!)
  const autumnTrueWeight = autumnKeepIds.reduce((sum, id) => {
    const c = AUTUMN_CARDS.find((card) => card.id === id);
    return sum + (c?.trueWeight ?? 1);
  }, 0);
  const autumnBalanced = autumnKeepIds.length === 3 && autumnTrueWeight === 3;
  const autumnOverweight = autumnKeepIds.length > 3 || autumnTrueWeight > 3;
  const autumnScaleTiltDeg =
    autumnKeepIds.length === 0
      ? 0
      : autumnOverweight
        ? 13
        : autumnBalanced
          ? 0
          : -7;

  // Winter live clock state
  const winterFilledCount = Object.values(winterSlots).filter(Boolean).length;
  const winterHasFrostChain =
    Boolean(winterSlots['slot-past']) ||
    Boolean(winterSlots['slot-present']) ||
    winterHeatCardId?.cardId === 'card-frostfire';
  const winterFutureReversed =
    winterSlots['slot-future'] === 'gear-future' &&
    (orientationMap['gear-future'] ?? 'upright') === 'reversed';
  const winterIsTicking =
    winterFilledCount === 1 &&
    winterSlots['slot-future'] === 'gear-future' &&
    (orientationMap['gear-future'] ?? 'upright') === 'upright' &&
    winterHeatCardId?.slotId === 'slot-future' &&
    winterHeatCardId?.cardId === 'card-thaw';

  // Active deck & hand cards for the Curved Fan Hand Tray
  const currentFanCards: TarotCardData[] = (() => {
    switch (season) {
      case 'spring':
        return SPRING_CARDS.filter((c) => !springSlots.includes(c.id));
      case 'summer':
        return SUMMER_HAND_CARDS.filter(
          (c) => !Object.values(summerPairs).includes(c.id)
        );
      case 'autumn':
        return AUTUMN_CARDS.filter(
          (c) => !autumnKeepIds.includes(c.id) && !autumnDiscardIds.includes(c.id)
        );
      case 'winter':
        return WINTER_CARDS.filter(
          (c) =>
            !Object.values(winterSlots).includes(c.id) &&
            winterHeatCardId?.cardId !== c.id
        );
    }
  })();

  const selectedFanCard =
    currentFanCards.find((c) => c.id === selectedHandCardId) ?? null;

  const inspectedCount = Object.values(inspectedMap).filter(Boolean).length;

  // Corner keepsake tip & active verification lens state
  const activeVerifyEvidence =
    selectedVerifyEvidenceId
      ? currentCase.evidence.find((e) => e.id === selectedVerifyEvidenceId) ?? null
      : null;
  const pinnedEvidence =
    pinnedTipId && pinnedTipId !== 'tea'
      ? currentCase.evidence.find((e) => e.id === pinnedTipId) ?? null
      : null;
  const activeEvidenceTip = hoveredEvidence ?? activeVerifyEvidence ?? pinnedEvidence;
  const showTeaTip = (hoveredTeaSlip || pinnedTipId === 'tea') && !hoveredEvidence && !activeVerifyEvidence;

  const ALL_SEASON_CARDS: TarotCardData[] = [
    ...SPRING_CARDS,
    ...SUMMER_ANCHORS,
    ...SUMMER_HAND_CARDS,
    ...AUTUMN_CARDS,
    ...WINTER_CARDS,
  ];

  const verifyCardWithKeepsake = (cardId: string) => {
    if (!selectedVerifyEvidenceId) return false;
    const ev = currentCase.evidence.find((e) => e.id === selectedVerifyEvidenceId);
    const card = ALL_SEASON_CARDS.find((c) => c.id === cardId);
    if (!ev || !card) return false;

    const match = KEEPSAKE_VERIFY_MAP[ev.id]?.[cardId];
    if (match) {
      if (match.isContradiction) {
        libraryAudio.playCardChainShock();
      } else {
        libraryAudio.playMagicChime();
      }
      setVerifiedCardNotes((prev) => ({ ...prev, [cardId]: match.badge }));
      setInspectedMap((prev) => ({ ...prev, [cardId]: true }));
      setVerifyRevealNote({
        evidenceTitle: ev.title,
        cardTitle: card.title,
        text: match.note,
        isContradiction: match.isContradiction,
      });
    } else {
      libraryAudio.playBrassClick();
      setVerifyRevealNote({
        evidenceTitle: ev.title,
        cardTitle: card.title,
        text: `持「${ev.title}」近照「${card.title}」，纸面暂未映出异常暗痕，或许可换一件信物或翻看牌背线索。`,
        isContradiction: false,
      });
    }
    return true;
  };

  const handleSelectHandCard = (cardId: string) => {
    if (verifyCardWithKeepsake(cardId)) return;
    libraryAudio.playBrassClick();
    setSelectedHandCardId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`馆长梦境塔罗牌桌 · ${currentCase.guestName}`}
      className="fixed inset-0 z-40 bg-wood-tabletop overflow-y-auto library-scroll"
    >
      {/* Overhead 2D Hand-Painted Walnut Desk & Sage Leather Blotter */}
      {!tableImgFailed && (
        <img
          src={RITUAL_TABLETOP_ART}
          alt="铺着铜角深绿皮质书写垫、羽毛笔与墨水瓶的俯视维多利亚复古胡桃木书桌"
          referrerPolicy="no-referrer"
          onError={() => setTableImgFailed(true)}
          className="pointer-events-none fixed inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Candlelight Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ background: meta.vignetteTint }}
      />

      {/* Quiet Seasonal Motes Along Wood Rim */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {meta.runes.map((rune, i) => (
          <span
            key={i}
            className="animate-mote absolute font-serif-body text-lg sm:text-xl opacity-35 select-none"
            style={{
              left: i % 2 === 0 ? `${3 + i * 2}%` : `${92 - i * 2}%`,
              top: `${18 + i * 18}%`,
              color: meta.runeColor,
              animationDuration: `${8 + i * 1.4}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {rune}
          </span>
        ))}
      </div>

      {/* Main Card Table Stage */}
      <div className="relative z-10 min-h-full max-w-[1220px] mx-auto flex flex-col justify-between px-4 py-4 sm:px-7 sm:py-5">
        {/* TOP WOOD RIM CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[#FAF2E2]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif-body font-medium bg-[#2C1E14]/92 hover:bg-[#1E130C] border border-[#B89258]/80 rounded-sm shadow-md transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E5C175]" />
              <span>离开牌桌</span>
            </button>

            <button
              type="button"
              onClick={onBackToBook}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif-body font-medium bg-[#2C1E14]/92 hover:bg-[#1E130C] border border-[#B89258]/80 rounded-sm shadow-md transition-colors whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E5C175]" />
              <span>重翻《{currentCase.bookTitle}》</span>
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#241810]/88 border border-[#A6824B]/70 text-xs font-serif-body text-[#F3E6CC]">
            <SeasonSigilIcon season={season} glowing className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">{knot.dreamTitle}</span>
            <span aria-hidden="true" className="text-[#9E8258]">·</span>
            <span className="text-[#DCC69E] whitespace-nowrap">{meta.modeTag}</span>
            <span aria-hidden="true" className="text-[#9E8258]">·</span>
            <span className="font-mono tabular-nums text-[#E9C982] whitespace-nowrap">
              已验牌 {inspectedCount}
            </span>
          </div>
        </div>

        {/* CENTER TAROT WORKSPACE: Corner Keepsake Tray + 3:4 Board + Curved Fan Hand */}
        <div className="my-auto py-3 flex flex-col lg:flex-row items-center lg:items-end justify-center gap-5 lg:gap-6">
          {/* BOTTOM-LEFT CORNER KEEPSAKE SPECIMEN TRAY */}
          {!endingOutcome && (
            <aside
              aria-label="桌角信物照验台与茶话便签"
              className="relative w-full lg:w-48 shrink-0 order-2 lg:order-1 flex flex-col items-center lg:items-start gap-2.5"
            >
              {verifyRevealNote && (
                <div
                  className={`w-full max-w-xs lg:w-64 rounded-[3px] border p-2.5 text-left shadow-md z-20 ${
                    verifyRevealNote.isContradiction
                      ? 'border-[#D97C68] bg-[#3E1B16]/95 text-[#FDEAE4]'
                      : 'border-[#DFBA6D] bg-[#FAF0D6] text-[#241B14]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display text-[11px] font-semibold">
                      {verifyRevealNote.evidenceTitle} ✕ {verifyRevealNote.cardTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setVerifyRevealNote(null)}
                      aria-label="关闭照验记录"
                      className="opacity-70 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] font-serif-body leading-snug">
                    {verifyRevealNote.text}
                  </p>
                </div>
              )}

              {(activeEvidenceTip || showTeaTip) && (
                <div className="w-full max-w-xs lg:w-64 bg-vintage-folio desk-ink-card rounded-[2px] p-1 text-[#241B14] z-20">
                  <div className="border border-[#BFA880] rounded-[1px] px-2.5 py-2 space-y-1">
                    {activeEvidenceTip ? (
                      <>
                        <p className="font-display text-xs font-semibold text-[#231B14]">
                          {activeEvidenceTip.title}
                        </p>
                        <p className="text-[11px] font-serif-body text-[#4F4334] leading-snug">
                          {activeEvidenceTip.summary}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-xs font-semibold text-[#7A3526]">
                          洋甘菊茶话便签
                        </p>
                        <p className="text-[11px] font-serif-body text-[#4F3B2A] leading-snug">
                          {currentCase.teaBonusHint}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="w-full max-w-md lg:max-w-none bg-[#23170F]/85 border border-[#A6824B]/70 rounded-sm p-2 backdrop-blur-[2px]">
                <div className="flex items-center justify-between gap-1 mb-1.5 px-0.5">
                  <p className="text-[10.5px] font-serif-body text-[#E7D4B0] flex items-center gap-1">
                    <Search className="w-3 h-3 text-[#E5C175] shrink-0" />
                    <span>{activeVerifyEvidence ? '手持照验中' : '桌角信物（点选照验）'}</span>
                  </p>
                  {activeVerifyEvidence && (
                    <button
                      type="button"
                      onClick={() => {
                        libraryAudio.playBrassClick();
                        setSelectedVerifyEvidenceId(null);
                      }}
                      className="text-[10px] font-serif-body text-[#F4D078] hover:underline whitespace-nowrap"
                    >
                      收起
                    </button>
                  )}
                </div>

                {activeVerifyEvidence && (
                  <div className="mb-1.5 px-2 py-1 rounded-[2px] border border-[#E5C175]/75 bg-[#46291A]/90 text-[10px] font-serif-body text-[#FCEAC0] leading-snug">
                    正持「{activeVerifyEvidence.title}」——轻触任意卡牌即可对照剧情矛盾
                  </div>
                )}

                <div className="grid grid-cols-4 lg:grid-cols-2 gap-1.5">
                  {currentCase.evidence.map((ev) => {
                    const isVerifying = selectedVerifyEvidenceId === ev.id;
                    const isActive =
                      hoveredEvidence?.id === ev.id || pinnedTipId === ev.id || isVerifying;
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onMouseEnter={() => setHoveredEvidence(ev)}
                        onMouseLeave={() => setHoveredEvidence(null)}
                        onFocus={() => setHoveredEvidence(ev)}
                        onBlur={() => setHoveredEvidence(null)}
                        onClick={() => {
                          libraryAudio.playBrassClick();
                          setPinnedTipId((prev) => (prev === ev.id ? null : ev.id));
                          setSelectedVerifyEvidenceId((prev) => {
                            const next = prev === ev.id ? null : ev.id;
                            if (next) setSelectedHandCardId(null);
                            return next;
                          });
                        }}
                        className={`p-1.5 rounded-[2px] border flex flex-col items-center justify-center gap-0.5 transition-transform duration-150 hover:-translate-y-0.5 ${
                          isVerifying
                            ? 'bg-[#FFF3CC] border-[#E5B85C] ring-2 ring-[#F0CA7A] text-[#241B14]'
                            : isActive
                              ? 'bg-[#FCF6E6] border-[#D4A656] text-[#241B14]'
                              : 'bg-[#F4EAD2]/92 border-[#6D553B] text-[#2B2219]'
                        }`}
                      >
                        <KeepsakeIllustration id={ev.id} className="w-7 h-7 shrink-0" />
                        <span className="text-[10px] font-serif-body font-medium leading-tight truncate max-w-full">
                          {ev.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {hasServedTea && (
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredTeaSlip(true)}
                    onMouseLeave={() => setHoveredTeaSlip(false)}
                    onFocus={() => setHoveredTeaSlip(true)}
                    onBlur={() => setHoveredTeaSlip(false)}
                    onClick={() =>
                      setPinnedTipId((prev) => (prev === 'tea' ? null : 'tea'))
                    }
                    className={`mt-1.5 w-full px-2 py-1 rounded-[2px] border flex items-center justify-center gap-1.5 text-[10.5px] font-serif-body transition-colors ${
                      showTeaTip
                        ? 'bg-[#F6E6C6] border-[#B88D44] text-[#4E2D18] font-medium'
                        : 'bg-[#EFE4CC]/92 border-[#8B7352] text-[#4A3523] hover:bg-[#FAF1DB]'
                    }`}
                  >
                    <Feather className="w-3 h-3 shrink-0 text-[#8E2D20]" />
                    <span className="whitespace-nowrap">茶话秘语便签</span>
                  </button>
                )}
              </div>
            </aside>
          )}

          {/* CENTER TAROT TABLE & CURVED FAN HAND */}
          <div className="w-full max-w-[820px] order-1 lg:order-2 flex flex-col items-center">
            {endingOutcome ? (
              /* ================= ENDING MEMORIAL PLATE ================= */
              <div className="w-full max-w-xl bg-vintage-folio desk-ink-card rounded-sm p-1.5 sm:p-2 text-[#241B14]">
                <div className="border-[1.5px] border-[#8A714F] rounded-[2px] px-5 py-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-sm border border-[#B99E72] bg-[#FAF4E4]/95">
                    <EndingMagicIllustration
                      season={season}
                      isGoodEnding={endingOutcome.kind === 'good'}
                      className="w-36 h-36 sm:w-40 sm:h-40"
                    />
                  </div>

                  {endingOutcome.kind === 'good' ? (
                    <>
                      <div className="space-y-1.5 max-w-md">
                        <p className="text-xs font-serif-body font-semibold text-[#8E2D20]">
                          好结局 · {currentCase.fantasyProfile.endingSealGood}
                        </p>
                        <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#231B14] text-balance">
                          {currentCase.knot.archiveStamp}
                        </h2>
                        <p className="font-serif-body text-sm text-[#352C23] leading-[1.75]">
                          {endingOutcome.feedback}
                        </p>
                        <p className="pt-1 text-xs font-serif-body italic text-[#685844]">
                          “{currentCase.knot.healingMotto}”
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onResolveSuccess(endingOutcome.feedback)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-sm transition-colors whitespace-nowrap shrink-0"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>唤醒季节彩蛋并领取回礼信物</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1.5 max-w-md">
                        <p className="text-xs font-serif-body font-semibold text-[#8E2F23]">
                          {endingOutcome.title}
                        </p>
                        <h2 className="font-display text-lg sm:text-xl font-semibold text-[#231B14] text-balance">
                          {endingOutcome.subtitle}
                        </h2>
                        <p className="font-serif-body text-sm text-[#45352E] leading-[1.75]">
                          {endingOutcome.desc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEndingOutcome(null)}
                        className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-serif-body font-medium text-[#FAF6EE] bg-[#8E2F23] hover:bg-[#742319] border-[1.5px] border-[#4E160F] rounded-sm shadow-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>回溯牌局 · 重新出牌</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* ================= ACTIVE PER-SEASON 3:4 TAROT PUZZLE ================= */
              <div className="w-full space-y-3.5">
                {/* Pinned Story Inquiry Paper Slip */}
                <div className="mx-auto max-w-2xl bg-vintage-folio desk-ink-card rounded-[2px] px-4 py-2 text-[#241B14] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Feather className="w-3.5 h-3.5 text-[#8E2D20] shrink-0" />
                    <p className="text-xs sm:text-[13px] font-serif-body font-medium text-[#241B14] leading-snug">
                      {meta.slipInstruction}
                    </p>
                  </div>
                  <span className="text-[10.5px] font-serif-body text-[#695742] whitespace-nowrap shrink-0">
                    翻牌 · 信物照验
                  </span>
                </div>

                {/* -------- 1. SPRING BOARD (4x 3:4 Brass Slots + Orientation Chain) -------- */}
                {season === 'spring' && (
                  <div className="space-y-3">
                    {springHasReversed && (
                      <div className="mx-auto max-w-xl rounded-[3px] border border-[#D48B6E] bg-[#3E1F1A]/85 px-3.5 py-1.5 text-center text-[11.5px] font-serif-body text-[#FADAD0]">
                        寒露凝滞：阵中似有倒悬花枝令邻近嫩芽停顿，可轻触牌角旋钮调整朝向。
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-[600px] mx-auto">
                      {springSlots.map((slottedId, slotIdx) => {
                        const slottedCard = SPRING_CARDS.find((c) => c.id === slottedId);
                        const orient = slottedId ? orientationMap[slottedId] ?? 'upright' : 'upright';
                        const dropHighlight = Boolean(selectedHandCardId);
                        const neighborReversed =
                          (slotIdx > 0 &&
                            springSlots[slotIdx - 1] &&
                            (orientationMap[springSlots[slotIdx - 1]!] ?? 'upright') === 'reversed') ||
                          (slotIdx < 3 &&
                            springSlots[slotIdx + 1] &&
                            (orientationMap[springSlots[slotIdx + 1]!] ?? 'upright') === 'reversed');

                        return (
                          <div
                            key={slotIdx}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const id = getDroppedCardId(e);
                              if (id) placeSpringCard(id, slotIdx);
                            }}
                            onClick={() => {
                              if (selectedHandCardId) {
                                placeSpringCard(selectedHandCardId, slotIdx);
                              }
                            }}
                            className={`relative w-full aspect-[3/4] rounded-[6px] p-1 flex flex-col items-center justify-center transition-colors ${
                              slottedCard
                                ? neighborReversed || orient === 'reversed'
                                  ? 'bg-[#3D221D]/75 border-2 border-[#D47A65]'
                                  : 'brass-slot-filled'
                                : dropHighlight
                                  ? 'brass-slot-empty ring-2 ring-[#E8C272]/85 bg-[#253B2D]/70 cursor-pointer'
                                  : neighborReversed
                                    ? 'brass-slot-empty border-[#8BB5D8] bg-[#1A2935]/60'
                                    : 'brass-slot-empty'
                            }`}
                          >
                            {slottedCard ? (
                              <TarotCardView
                                card={slottedCard}
                                isFlipped={Boolean(flippedMap[slottedCard.id])}
                                hasInspected={Boolean(inspectedMap[slottedCard.id])}
                                orientation={orient}
                                isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                                verifiedBadgeText={verifiedCardNotes[slottedCard.id] ?? null}
                                actionHint="点卡退回"
                                onSelect={() => {
                                  if (verifyCardWithKeepsake(slottedCard.id)) return;
                                  if (selectedHandCardId) {
                                    placeSpringCard(selectedHandCardId, slotIdx);
                                  } else {
                                    libraryAudio.playSlotPlace();
                                    setSpringSlots((prev) =>
                                      prev.map((id, i) => (i === slotIdx ? null : id))
                                    );
                                  }
                                }}
                                onToggleFlip={() => toggleFlipCard(slottedCard.id)}
                                onToggleOrientation={() => toggleOrientationCard(slottedCard.id)}
                              />
                            ) : (
                              <div className="text-center space-y-1 pointer-events-none px-2">
                                <span className="block font-display text-xl text-[#DEC38C]">
                                  {ROMAN_SLOTS[slotIdx]}
                                </span>
                                <span className="block text-[10.5px] font-serif-body text-[#D5C6A8]">
                                  {dropHighlight
                                    ? '轻触放入此槽'
                                    : neighborReversed
                                      ? '邻位逆位冻滞'
                                      : '3:4 黄铜序位'}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* -------- 2. SUMMER BOARD (Flip Blind Anchors + Stacked 3:4 Pairs + Chain Shock) -------- */}
                {season === 'summer' && (
                  <div className="space-y-3">
                    {summerShockNote && (
                      <div className="mx-auto max-w-xl rounded-[3px] border border-[#E07C67] bg-[#461E19]/88 px-3.5 py-1.5 text-center text-[11.5px] font-serif-body text-[#FCE0D8]">
                        {summerShockNote}
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-[620px] mx-auto items-start">
                      {SUMMER_ANCHORS.map((anchor) => {
                        const pairedHandId = summerPairs[anchor.id];
                        const pairedCard = SUMMER_HAND_CARDS.find(
                          (c) => c.id === pairedHandId
                        );
                        const isAnchorBlind = Boolean(flippedMap[anchor.id]);
                        const isValidPair =
                          (anchor.id === 'anc-prelude' && pairedHandId === 'hnd-key') ||
                          (anchor.id === 'anc-watch' && pairedHandId === 'hnd-forgive') ||
                          (anchor.id === 'anc-seats' && pairedHandId === 'hnd-ticket');

                        return (
                          <div
                            key={anchor.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const id = getDroppedCardId(e);
                              if (id) pairSummerCard(id, anchor.id);
                            }}
                            className={`relative rounded-[6px] p-1 transition-all ${
                              pairedCard
                                ? isValidPair
                                  ? 'bg-[#253C2D]/78 border-[1.5px] border-[#E3BE70]'
                                  : 'bg-[#4E231D]/82 border-[1.5px] border-[#DF7764]'
                                : selectedHandCardId
                                  ? 'bg-[#1F3126]/68 border-[1.5px] border-dashed border-[#E8C272]'
                                  : 'bg-[#18222C]/48 border border-[#8E7A56]/75'
                            }`}
                          >
                            {/* 3:4 Anchor Card (Starts Face-Down with Blind Clue!) */}
                            <TarotCardView
                              card={anchor}
                              isFlipped={isAnchorBlind}
                              hasInspected={Boolean(inspectedMap[anchor.id])}
                              isStackedPair={Boolean(pairedCard && isValidPair)}
                              isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                              verifiedBadgeText={verifiedCardNotes[anchor.id] ?? null}
                              actionHint={isAnchorBlind ? '点此翻开' : undefined}
                              onSelect={() => {
                                if (verifyCardWithKeepsake(anchor.id)) return;
                                if (selectedHandCardId) {
                                  pairSummerCard(selectedHandCardId, anchor.id);
                                } else {
                                  toggleFlipCard(anchor.id);
                                }
                              }}
                              onToggleFlip={() => toggleFlipCard(anchor.id)}
                            />

                            {/* Stacked 3:4 Harmony Card Overlapping Anchor */}
                            {pairedCard ? (
                              <div className="relative z-10 -mt-20 w-[86%] mx-auto shadow-[0_-6px_14px_rgba(8,6,4,0.55)]">
                                <TarotCardView
                                  card={pairedCard}
                                  isFlipped={Boolean(flippedMap[pairedCard.id])}
                                  hasInspected={Boolean(inspectedMap[pairedCard.id])}
                                  isStackedPair={isValidPair}
                                  compact
                                  isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                                  verifiedBadgeText={verifiedCardNotes[pairedCard.id] ?? null}
                                  actionHint="点此拆开"
                                  onSelect={() => {
                                    if (verifyCardWithKeepsake(pairedCard.id)) return;
                                    if (selectedHandCardId) {
                                      pairSummerCard(selectedHandCardId, anchor.id);
                                    } else {
                                      libraryAudio.playSlotPlace();
                                      setSummerPairs((prev) => ({
                                        ...prev,
                                        [anchor.id]: null,
                                      }));
                                    }
                                  }}
                                  onToggleFlip={() => toggleFlipCard(pairedCard.id)}
                                />
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  if (selectedHandCardId) {
                                    pairSummerCard(selectedHandCardId, anchor.id);
                                  } else {
                                    toggleFlipCard(anchor.id);
                                  }
                                }}
                                className="mt-1.5 w-full py-1 text-center text-[10px] font-serif-body text-[#E7D8B7] hover:text-white transition-colors"
                              >
                                {selectedHandCardId
                                  ? '轻触叠放手牌'
                                  : isAnchorBlind
                                    ? '点牌面翻看线索'
                                    : '等待叠放配对'}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* -------- 3. AUTUMN BOARD (Brass Balance Scale + Keep vs Discard) -------- */}
                {season === 'autumn' && (
                  <div className="space-y-3">
                    {/* Visual Brass Balance Scale Bar (No Numeric Spoilers) */}
                    <div className="rounded-[3px] border border-[#9E8458] bg-[#21181D]/86 px-4 py-2 flex items-center justify-between gap-3 text-xs font-serif-body">
                      <div className="flex items-center gap-3 min-w-0">
                        <svg viewBox="0 0 68 38" className="w-14 h-8 shrink-0" aria-hidden="true">
                          <line x1="34" y1="7" x2="34" y2="33" stroke="#C89F55" strokeWidth="2" />
                          <rect x="24" y="32" width="20" height="3" rx="1" fill="#8C6735" />
                          <g
                            className="transition-transform duration-200"
                            style={{
                              transformOrigin: '34px 10px',
                              transform: `rotate(${autumnScaleTiltDeg}deg)`,
                            }}
                          >
                            <line x1="12" y1="10" x2="56" y2="10" stroke="#E5C175" strokeWidth="2" strokeLinecap="round" />
                            <path d="M8 22 Q12 26 16 22 Z" fill="#C89F55" />
                            <line x1="12" y1="10" x2="9" y2="22" stroke="#D2B170" strokeWidth="0.9" />
                            <line x1="12" y1="10" x2="15" y2="22" stroke="#D2B170" strokeWidth="0.9" />
                            <path d="M52 22 Q56 26 60 22 Z" fill={autumnOverweight ? '#D97C68' : '#C89F55'} />
                            <line x1="56" y1="10" x2="53" y2="22" stroke="#D2B170" strokeWidth="0.9" />
                            <line x1="56" y1="10" x2="59" y2="22" stroke="#D2B170" strokeWidth="0.9" />
                          </g>
                          <circle cx="34" cy="10" r="2.2" fill="#FBE5A4" />
                        </svg>
                        <div className="min-w-0">
                          <span className="text-[11px] text-[#C9B694]">记忆天平示象：</span>
                          <strong
                            className={`text-xs ${
                              autumnOverweight
                                ? 'text-[#F09B8A]'
                                : autumnBalanced
                                  ? 'text-[#BCE3BF]'
                                  : 'text-[#EAD08B]'
                            }`}
                          >
                            {autumnKeepIds.length === 0
                              ? '天平空悬 · 静待安放暖忆'
                              : autumnOverweight
                                ? '右盘沉坠如石，似有苛责重负藏于纸背'
                                : autumnBalanced
                                  ? '天平平正安稳，肖像微光舒展'
                                  : '左重右轻，尚余些许未拼回的微温'}
                          </strong>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-serif-body text-[#C9B694] whitespace-nowrap shrink-0">
                        保留 {autumnKeepIds.length} · 弃风 {autumnDiscardIds.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[1.35fr_1fr] gap-3.5">
                      {/* Keep Zone */}
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const id = getDroppedCardId(e);
                          if (id) moveAutumnCard(id, 'keep');
                        }}
                        onClick={() => {
                          if (selectedHandCardId) {
                            moveAutumnCard(selectedHandCardId, 'keep');
                          }
                        }}
                        className={`min-h-[172px] rounded-[5px] p-2.5 flex flex-col justify-between transition-colors ${
                          autumnOverweight
                            ? 'bg-[#45211E]/75 border-[1.5px] border-[#D67260]'
                            : autumnBalanced
                              ? 'bg-[#223B2B]/75 border-[1.5px] border-[#86C48C]'
                              : selectedHandCardId
                                ? 'brass-slot-empty ring-2 ring-[#E8C272]/80 cursor-pointer'
                                : 'brass-slot-empty'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#F2E4C4] mb-2">
                          <span>肖像保留区 · 轻盈安放</span>
                          <span className="font-mono tabular-nums">{autumnKeepIds.length} 张</span>
                        </div>

                        {autumnKeepIds.length === 0 ? (
                          <p className="my-auto text-center text-[11px] font-serif-body text-[#D4C4A4]">
                            拖入或点选后轻触此处保留
                          </p>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {autumnKeepIds.map((id) => {
                              const card = AUTUMN_CARDS.find((c) => c.id === id);
                              if (!card) return null;
                              return (
                                <div key={id} className="w-full max-w-[96px] mx-auto">
                                  <TarotCardView
                                    card={card}
                                    isFlipped={Boolean(flippedMap[id])}
                                    hasInspected={Boolean(inspectedMap[id])}
                                    compact
                                    isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                                    verifiedBadgeText={verifiedCardNotes[id] ?? null}
                                    actionHint="收回"
                                    onDragStart={handleDragStartCard(id)}
                                    onDragEnd={handleDragEndCard}
                                    onSelect={() => {
                                      if (verifyCardWithKeepsake(id)) return;
                                      moveAutumnCard(id, 'hand');
                                    }}
                                    onToggleFlip={() => toggleFlipCard(id)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Discard Zone */}
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const id = getDroppedCardId(e);
                          if (id) moveAutumnCard(id, 'discard');
                        }}
                        onClick={() => {
                          if (selectedHandCardId) {
                            moveAutumnCard(selectedHandCardId, 'discard');
                          }
                        }}
                        className={`min-h-[172px] rounded-[5px] p-2.5 flex flex-col justify-between transition-colors ${
                          selectedHandCardId
                            ? 'bg-[#2B2027]/78 border-[1.5px] border-dashed border-[#D8B4E8] cursor-pointer'
                            : 'bg-[#21191E]/68 border-[1.5px] border-dashed border-[#9E849C]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#E7D4EE] mb-2">
                          <span>秋风弃牌堆（随风消散）</span>
                          <span className="font-mono tabular-nums">{autumnDiscardIds.length} 张</span>
                        </div>

                        {autumnDiscardIds.length === 0 ? (
                          <p className="my-auto text-center text-[11px] font-serif-body text-[#CBBAD1]">
                            拖入或点选后丢弃至此
                          </p>
                        ) : (
                          <div className="grid grid-cols-3 gap-1.5">
                            {autumnDiscardIds.map((id) => {
                              const card = AUTUMN_CARDS.find((c) => c.id === id);
                              if (!card) return null;
                              return (
                                <div key={id} className="w-full max-w-[82px] mx-auto">
                                  <TarotCardView
                                    card={card}
                                    isFlipped={Boolean(flippedMap[id])}
                                    hasInspected={Boolean(inspectedMap[id])}
                                    compact
                                    isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                                    verifiedBadgeText={verifiedCardNotes[id] ?? null}
                                    actionHint="拾回"
                                    onDragStart={handleDragStartCard(id)}
                                    onDragEnd={handleDragEndCard}
                                    onSelect={() => {
                                      if (verifyCardWithKeepsake(id)) return;
                                      moveAutumnCard(id, 'hand');
                                    }}
                                    onToggleFlip={() => toggleFlipCard(id)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* -------- 4. WINTER BOARD (3x 3:4 Clock Slots + Orientation + Frost Chain) -------- */}
                {season === 'winter' && (
                  <div className="space-y-3">
                    <div className="rounded-[3px] border border-[#849BB0] bg-[#16202A]/84 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-serif-body">
                      <span className="text-[#E2EDF7]">
                        钟盘感应：
                        <strong
                          className={`ml-1.5 ${
                            winterIsTicking
                              ? 'text-[#BCE3BF]'
                              : winterHasFrostChain || winterFilledCount >= 2 || winterFutureReversed
                                ? 'text-[#9ECAF2]'
                                : 'text-[#EAD08B]'
                          }`}
                        >
                          {winterIsTicking
                            ? '嘀嗒——积雪从表缘化水，石阶露出微光'
                            : winterHasFrostChain || winterFilledCount >= 2
                              ? '寒霜顺着轴承迅速蔓延，整座表盘渐趋僵死'
                              : winterFutureReversed
                                ? '右轴齿轮微微震颤，表针却逆流倒退'
                                : winterSlots['slot-future'] === 'gear-future'
                                  ? '黄铜齿轮缓缓咬合，齿面仍覆着一层薄霜'
                                  : '表盘冷寂无声，三处轴承静待裁断'}
                        </strong>
                      </span>
                      <span className="text-[11px] font-serif-body text-[#B4C8DB]">
                        左 · 中 · 右 三重时间轴
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 max-w-[490px] mx-auto items-start">
                      {WINTER_SLOTS.map((slot) => {
                        const gearId = winterSlots[slot.id];
                        const gearCard = WINTER_CARDS.find((c) => c.id === gearId);
                        const orient = gearId ? orientationMap[gearId] ?? 'upright' : 'upright';
                        const heatCard =
                          winterHeatCardId?.slotId === slot.id
                            ? WINTER_CARDS.find((c) => c.id === winterHeatCardId.cardId) ?? null
                            : null;
                        const activeSpin =
                          slot.id === 'slot-future' &&
                          gearId === 'gear-future' &&
                          orient === 'upright' &&
                          heatCard?.id === 'card-thaw' &&
                          winterFilledCount === 1;

                        const selectedIsHeat =
                          selectedHandCardId === 'card-thaw' ||
                          selectedHandCardId === 'card-frostfire';

                        return (
                          <div
                            key={slot.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const id = getDroppedCardId(e);
                              if (id) placeWinterCard(id, slot.id);
                            }}
                            className={`rounded-[6px] p-1.5 flex flex-col items-center gap-1 transition-colors ${
                              activeSpin
                                ? 'bg-[#3A3020]/88 border-2 border-[#E8C16E] shadow-[0_0_20px_rgba(232,193,110,0.34)]'
                                : gearCard
                                  ? 'bg-[#2B2016]/75 border border-[#B58B42]'
                                  : selectedHandCardId && !selectedIsHeat
                                    ? 'brass-slot-empty ring-2 ring-[#E8C272]/80 cursor-pointer'
                                    : 'brass-slot-empty'
                            }`}
                          >
                            <span className="text-[10px] font-serif-body text-[#DFCFAF] whitespace-nowrap">
                              {slot.roman} · {slot.label}
                            </span>

                            {gearCard ? (
                              <div className="w-full">
                                <TarotCardView
                                  card={gearCard}
                                  isFlipped={Boolean(flippedMap[gearCard.id])}
                                  hasInspected={Boolean(inspectedMap[gearCard.id])}
                                  orientation={orient}
                                  isStackedPair={activeSpin}
                                  isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                                  verifiedBadgeText={verifiedCardNotes[gearCard.id] ?? null}
                                  actionHint={heatCard ? undefined : '退回'}
                                  onSelect={() => {
                                    if (verifyCardWithKeepsake(gearCard.id)) return;
                                    if (selectedHandCardId) {
                                      placeWinterCard(selectedHandCardId, slot.id);
                                    } else {
                                      libraryAudio.playClockTick(true);
                                      setWinterSlots((prev) => ({ ...prev, [slot.id]: null }));
                                      if (winterHeatCardId?.slotId === slot.id) {
                                        setWinterHeatCardId(null);
                                      }
                                    }
                                  }}
                                  onToggleFlip={() => toggleFlipCard(gearCard.id)}
                                  onToggleOrientation={() => toggleOrientationCard(gearCard.id)}
                                />

                                {heatCard && (
                                  <div className="relative z-10 -mt-16 w-[84%] mx-auto shadow-[0_-6px_14px_rgba(8,6,4,0.58)]">
                                    <TarotCardView
                                      card={heatCard}
                                      isFlipped={Boolean(flippedMap[heatCard.id])}
                                      hasInspected={Boolean(inspectedMap[heatCard.id])}
                                      isStackedPair={activeSpin}
                                      compact
                                      isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                                      verifiedBadgeText={verifiedCardNotes[heatCard.id] ?? null}
                                      actionHint="取下"
                                      onSelect={() => {
                                        if (verifyCardWithKeepsake(heatCard.id)) return;
                                        if (selectedHandCardId) {
                                          placeWinterCard(selectedHandCardId, slot.id);
                                        } else {
                                          libraryAudio.playSlotPlace();
                                          setWinterHeatCardId(null);
                                        }
                                      }}
                                      onToggleFlip={() => toggleFlipCard(heatCard.id)}
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  if (selectedHandCardId) {
                                    placeWinterCard(selectedHandCardId, slot.id);
                                  }
                                }}
                                className="w-full aspect-[3/4] flex flex-col items-center justify-center text-center space-y-1 px-2"
                              >
                                <span className="block font-display text-sm text-[#B7D2E8]">
                                  [ 留空 ]
                                </span>
                                <span className="block text-[10px] font-serif-body text-[#C5D2DF]">
                                  {selectedHandCardId && !selectedIsHeat
                                    ? '轻触装入此槽'
                                    : '空置轴承'}
                                </span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ================= CURVED FAN HAND TRAY (下方扇形手牌排布) ================= */}
                {currentFanCards.length > 0 && (
                  <section
                    aria-label="下方扇形手牌"
                    className="pt-2 pb-1 flex flex-col items-center"
                  >
                    {/* Selected Card Floating Inspection & Orientation Bar */}
                    <div className="min-h-[34px] mb-2 flex flex-wrap items-center justify-center gap-2">
                      {selectedFanCard ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#241810]/92 border border-[#B89258]/80 text-[11px] font-serif-body text-[#F6EAD0] shadow-md">
                          <span className="font-display font-semibold text-[#EAD08B] whitespace-nowrap">
                            {selectedFanCard.title}
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleFlipCard(selectedFanCard.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-[#3B2A1C] hover:bg-[#4F3926] border border-[#9E7C48] text-[#FAF0D8] transition-colors whitespace-nowrap shrink-0"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>
                              {flippedMap[selectedFanCard.id] ? '翻回正面' : '翻面验牌'}
                            </span>
                          </button>

                          {selectedFanCard.supportsOrientation && (
                            <button
                              type="button"
                              onClick={() => toggleOrientationCard(selectedFanCard.id)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-[#2B3D31] hover:bg-[#354B3C] border border-[#7CA686] text-[#E6F4E8] transition-colors whitespace-nowrap shrink-0"
                            >
                              <RotateCw className="w-3 h-3" />
                              <span>
                                {(orientationMap[selectedFanCard.id] ?? 'upright') === 'reversed'
                                  ? '旋回正位 ↑'
                                  : '旋为逆位 ↓'}
                              </span>
                            </button>
                          )}

                          <span className="hidden sm:inline text-[#C9B491] whitespace-nowrap">
                            可拖拽或轻触上方槽位出牌
                          </span>
                        </div>
                      ) : (
                        <p className="text-[11px] font-serif-body text-[#DFCEAC]/90">
                          悬停浮起细看 3:4 牌面，点选后可「翻面验牌」或「旋转正逆位」
                        </p>
                      )}
                    </div>

                    {/* Curved Arc Fan Container */}
                    <div className="w-full flex items-end justify-center pt-5 pb-3 px-2 overflow-visible">
                      {currentFanCards.map((card, idx) => {
                        const mid = (currentFanCards.length - 1) / 2;
                        const offset = idx - mid;
                        const fanAngle = offset * 4.8;
                        const fanDrop = Math.abs(offset) * Math.abs(offset) * 3.4;
                        const isSelected = selectedHandCardId === card.id;
                        const isHovered = hoveredFanCardId === card.id;
                        const isElevated = isSelected || isHovered;
                        const isFlipped = Boolean(flippedMap[card.id]);
                        const hasInspected = Boolean(inspectedMap[card.id]);
                        const orient = orientationMap[card.id] ?? 'upright';

                        return (
                          <div
                            key={card.id}
                            onMouseEnter={() => setHoveredFanCardId(card.id)}
                            onMouseLeave={() =>
                              setHoveredFanCardId((prev) =>
                                prev === card.id ? null : prev
                              )
                            }
                            style={{
                              transform: isSelected
                                ? 'translate3d(0, -24px, 0) rotate(0deg) scale(1.13)'
                                : isHovered
                                  ? 'translate3d(0, -18px, 0) rotate(0deg) scale(1.08)'
                                  : `translate3d(0, ${fanDrop}px, 0) rotate(${fanAngle}deg)`,
                            }}
                            className={`w-[98px] sm:w-[116px] shrink-0 transition-transform duration-200 ease-out origin-bottom ${
                              idx > 0 ? '-ml-3 sm:-ml-2' : ''
                            } ${
                              isSelected
                                ? 'z-40'
                                : isElevated
                                  ? 'z-30'
                                  : 'z-10'
                            }`}
                          >
                            <TarotCardView
                              card={card}
                              isFlipped={isFlipped}
                              hasInspected={hasInspected}
                              orientation={orient}
                              isSelected={isSelected}
                              isVerifyTargetMode={Boolean(selectedVerifyEvidenceId)}
                              verifiedBadgeText={verifiedCardNotes[card.id] ?? null}
                              onDragStart={handleDragStartCard(card.id)}
                              onDragEnd={handleDragEndCard}
                              onSelect={() => handleSelectHandCard(card.id)}
                              onToggleFlip={() => toggleFlipCard(card.id)}
                              onToggleOrientation={() => toggleOrientationCard(card.id)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Bottom Desk Controls: Reset Board + Test Quick Clear + Crimson Wax Seal */}
                <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        libraryAudio.playSlotPlace();
                        resetAllBoards();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif-body text-[#EFE2C6] hover:text-white bg-[#1D2B22]/85 border border-[#8E7652]/75 rounded-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>重置牌局</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleQuickSolveTable}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif-body font-medium text-[#E9F5EB] hover:text-white bg-[#2E4B38]/90 hover:bg-[#3A5E47] border border-[#77A183]/80 rounded-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>测试：一键通关本局</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={!canSealBoard}
                    onClick={handleSealVerdict}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-serif-body font-medium text-[#FAF6EE] bg-[#8E2F23] hover:bg-[#742319] disabled:bg-[#5E5242]/80 disabled:text-[#C8BCA6] border-[1.5px] border-[#4E160F] disabled:border-[#42382B] rounded-sm shadow-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <Stamp className="w-4 h-4" />
                    <span>落印 · 印证牌局结局</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="h-1" />
      </div>
    </div>
  );
};
