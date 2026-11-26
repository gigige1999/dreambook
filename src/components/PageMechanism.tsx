import React, { useEffect, useState } from 'react';
import { Check, Lightbulb, RotateCcw } from 'lucide-react';
import { SeasonId } from '../types/game';
import { libraryAudio } from '../utils/audio';

/**
 * 页内机关：三步推理。
 * ① 这一页先做什么 → ② 用什么 → ③ 落在哪里。
 * 每一步的答案都能从书页正文与手记批注推出来；
 * 连错两次自动给提示，保证新手不会卡死。
 */

interface StepOption {
  label: string;
  ok?: boolean;
}

interface PageMechanismData {
  goal: string;
  steps: { prompt: string; options: string[]; answer: string }[];
  hint: string;
  success: string;
}

const DATA: Record<string, PageMechanismData> = {
  'spring-1': {
    goal: '让这粒种子开始它的一年',
    steps: [
      { prompt: '先做什么？', options: ['埋进花架下的土里', '先修剪花枝', '搬到月光下晾着'], answer: '埋进花架下的土里' },
      { prompt: '用什么？', options: ['小铲', '玻璃洒水壶', '铜剪'], answer: '小铲' },
      { prompt: '落在哪里？', options: ['花架下松过的土坑', '窗台边', '空花盆架上'], answer: '花架下松过的土坑' },
    ],
    hint: '手记写着：种子要先埋进土里，才轮得到露水、开花、放手。',
    success: '种荚落进土坑，温室的雾散开一线，花架下透出一点绿。',
  },
  'spring-2': {
    goal: '看清约定上原本写了什么',
    steps: [
      { prompt: '先做什么？', options: ['读约定的原文', '把约定烧掉', '再添上“永远”两个字'], answer: '读约定的原文' },
      { prompt: '用什么？', options: ['黄铜放大镜', '羽毛笔', '火漆'], answer: '黄铜放大镜' },
      { prompt: '看哪里？', options: ['约定末尾那片空白', '纸的折角', '桌沿的水印'], answer: '约定末尾那片空白' },
    ],
    hint: '争的是纸上的字，不是心里的字。',
    success: '墨迹里浮出原文——只有“一起看见春天”，后面干干净净。',
  },
  'spring-3': {
    goal: '把卡住的春天松开一线',
    steps: [
      { prompt: '先做什么？', options: ['把花从蜡里解出来', '再补一句“永远”', '把花盆搬走'], answer: '把花从蜡里解出来' },
      { prompt: '用什么？', options: ['案头的暖灯', '冰凿', '麻绳'], answer: '案头的暖灯' },
      { prompt: '照在哪里？', options: ['结了蜡的花苞', '花架横梁', '门缝底下'], answer: '结了蜡的花苞' },
    ],
    hint: '花不动，是被冻在“永远”里了。',
    success: '蜡壳裂开一道缝，一滴露珠落回土里。',
  },
  'spring-4': {
    goal: '读清窗上那行极淡的字',
    steps: [
      { prompt: '先做什么？', options: ['举镜读窗上的绿字', '把绿字擦掉', '把窗关严'], answer: '举镜读窗上的绿字' },
      { prompt: '用什么？', options: ['黄铜放大镜', '抹布', '蜡烛'], answer: '黄铜放大镜' },
      { prompt: '照在哪里？', options: ['月亮窗上最亮的那道纹', '窗框的铜扣', '门把手'], answer: '月亮窗上最亮的那道纹' },
    ],
    hint: '字小得像灰，不用镜子看不见。',
    success: '绿字浮出来：去下一个春天里盛开吧。',
  },
  'summer-1': {
    goal: '弄清那一晚究竟按什么次序发生',
    steps: [
      { prompt: '先做什么？', options: ['按节目单把那一晚排一遍', '先重弹出错的小节', '合上乐谱不再看'], answer: '按节目单把那一晚排一遍' },
      { prompt: '用什么？', options: ['那晚的节目单', '节拍器', '松香'], answer: '那晚的节目单' },
      { prompt: '看哪里？', options: ['缺了角的最后一页', '乐谱封面', '谱架上的松香末'], answer: '缺了角的最后一页' },
    ],
    hint: '手记：开演、出错、有人离开、掌声。',
    success: '节目单摊开，第七个节目后面空着一行——那是艾伦的独奏。',
  },
  'summer-2': {
    goal: '听清琴键上留下的那句话',
    steps: [
      { prompt: '先做什么？', options: ['听琴键里的声音', '擦掉琴键上的字', '换一根琴弦'], answer: '听琴键里的声音' },
      { prompt: '用什么？', options: ['那枚象牙琴键', '调音叉', '绒布'], answer: '那枚象牙琴键' },
      { prompt: '按哪里？', options: ['正中央的那一枚', '最左边的低音', '琴凳'], answer: '正中央的那一枚' },
    ],
    hint: '他调过这架琴，说过一句关于半个音的话。',
    success: '琴键轻响一声，声音里带着笑：按偏半个音，也是今晚才有的旋律。',
  },
  'summer-3': {
    goal: '对上灯灭与怀表的时间',
    steps: [
      { prompt: '先做什么？', options: ['核对灯灭与怀表的时间', '直接上弦让它走', '砸开表壳'], answer: '核对灯灭与怀表的时间' },
      { prompt: '用什么？', options: ['那枚回声怀表', '场记本', '烛台'], answer: '那枚回声怀表' },
      { prompt: '看哪里？', options: ['停住的指针', '表链的扣', '表背的划痕'], answer: '停住的指针' },
    ],
    hint: '灯灭是九点二十，怀表却停在三点一刻。',
    success: '指针停在排练的时刻——他走的时候，灯是亮的。',
  },
  'summer-4': {
    goal: '看清票根背面那行潦草的字',
    steps: [
      { prompt: '先做什么？', options: ['把票根翻到背面', '把票根烧掉', '抄下正面的座位号'], answer: '把票根翻到背面' },
      { prompt: '用什么？', options: ['黄铜放大镜', '钢笔', '灯罩'], answer: '黄铜放大镜' },
      { prompt: '照哪里？', options: ['票根的背面', '正面的座位号', '撕开的票角'], answer: '票根的背面' },
    ],
    hint: '手记：举镜看票根背面，别盯着书页正面。',
    success: '背面写着：我想跟着那段旋律走。',
  },
  'autumn-1': {
    goal: '从半空里接住还亮着的那封信',
    steps: [
      { prompt: '先做什么？', options: ['接住最亮的那一封', '把它们全收进信匣', '撕掉已经淡的'], answer: '接住最亮的那一封' },
      { prompt: '用什么？', options: ['空手去接', '铜夹子', '信匣的盖'], answer: '空手去接' },
      { prompt: '看哪里？', options: ['末尾还发亮的几行', '信头的称呼', '信封的火漆'], answer: '末尾还发亮的几行' },
    ],
    hint: '手记：淡掉的是琐事，留下来的是那几句暖话。',
    success: '信落在掌心，末尾几行泛着紫光。',
  },
  'autumn-2': {
    goal: '让这封信还能被拆开',
    steps: [
      { prompt: '先做什么？', options: ['把封蜡削薄', '再盖一层蜡', '换成铁印'], answer: '把封蜡削薄' },
      { prompt: '用什么？', options: ['拆信刀', '火漆', '蜡勺'], answer: '拆信刀' },
      { prompt: '削哪里？', options: ['蜡封的边缘', '信封的封口线', '火漆炉'], answer: '蜡封的边缘' },
    ],
    hint: '蜡太厚，收信的人一撬，纸就碎了。',
    success: '薄薄一层蜡，信纸完好无损。',
  },
  'autumn-3': {
    goal: '让字重新长出来',
    steps: [
      { prompt: '先做什么？', options: ['让字自己长', '用力把纸纹压平', '换一支硬笔'], answer: '让字自己长' },
      { prompt: '用什么？', options: ['灰雁羽毛笔', '镇纸', '砚台'], answer: '灰雁羽毛笔' },
      { prompt: '落在哪里？', options: ['被压平的那片纸纹', '笔尖的裂口', '墨水瓶口'], answer: '被压平的那片纸纹' },
    ],
    hint: '师父说过：字会自己长，别用石头压它。',
    success: '纸纹慢慢拱起，几行字自己站直了。',
  },
  'autumn-4': {
    goal: '看清碎片背面那行小字',
    steps: [
      { prompt: '先做什么？', options: ['把碎片翻过来', '先拼回正面', '把碎片扔掉'], answer: '把碎片翻过来' },
      { prompt: '用什么？', options: ['黄铜放大镜', '浆糊', '相框'], answer: '黄铜放大镜' },
      { prompt: '照哪里？', options: ['碎片的背面', '肖像的眼睛', '相框的铜角'], answer: '碎片的背面' },
    ],
    hint: '手记：举镜看碎片背面，别看书页。',
    success: '背面写着：只要记得三个最暖的瞬间，他就从未离开。',
  },
  'winter-1': {
    goal: '让这座停了十年的钟走起来',
    steps: [
      { prompt: '先做什么？', options: ['只装一枚，让它走', '把所有齿位补齐', '先上满发条'], answer: '只装一枚，让它走' },
      { prompt: '用什么？', options: ['那枚黄铜齿轮', '大一号的齿轮', '油壶'], answer: '那枚黄铜齿轮' },
      { prompt: '装哪里？', options: ['空着的那个齿位', '钟摆的轴', '发条的孔'], answer: '空着的那个齿位' },
    ],
    hint: '齿轮背面刻着：不必填满，只需让下一秒转动。',
    success: '咔哒一声，秒针动了一格。',
  },
  'winter-2': {
    goal: '读出钟面裂痕里停住的那一格',
    steps: [
      { prompt: '先做什么？', options: ['读出指针停的那一格', '把指针拨回十点', '换一张新钟面'], answer: '读出指针停的那一格' },
      { prompt: '用什么？', options: ['那枚碎钟面', '镊子', '胶水'], answer: '那枚碎钟面' },
      { prompt: '看哪里？', options: ['裂开的指针尖', '钟面的外圈', '钟壳的铜边'], answer: '裂开的指针尖' },
    ],
    hint: '她说完“再等一刻”之后，指针就没动过。',
    success: '指针停在那一格，背后的霜慢慢化开。',
  },
  'winter-3': {
    goal: '把这十年的停顿化开一点',
    steps: [
      { prompt: '先做什么？', options: ['把冰钥匙化开', '再锁住一秒', '多配一把钥匙'], answer: '把冰钥匙化开' },
      { prompt: '用什么？', options: ['案头的暖灯', '冰凿', '绒布'], answer: '案头的暖灯' },
      { prompt: '烤哪里？', options: ['钥匙上结的霜', '锁孔的内侧', '门缝的雪'], answer: '钥匙上结的霜' },
    ],
    hint: '锁得越多，门外越安静。',
    success: '霜化成水，顺着钥匙淌下来。',
  },
  'winter-4': {
    goal: '读出雪晶中心化开的那句话',
    steps: [
      { prompt: '先做什么？', options: ['读雪晶中心的暗语', '把雪扫掉', '把雪压实'], answer: '读雪晶中心的暗语' },
      { prompt: '用什么？', options: ['黄铜放大镜', '扫帚', '手套'], answer: '黄铜放大镜' },
      { prompt: '照哪里？', options: ['雪晶中心的水痕', '门外的台阶', '窗台上的积雪'], answer: '雪晶中心的水痕' },
    ],
    hint: '手记：举镜看雪晶中心，那圈融开的水痕。',
    success: '水痕里浮出一行字：只有时间重新流动，才走得到你身边。',
  },
};

interface PageMechanismProps {
  season: SeasonId;
  pageNumber: number;
  evidenceId: string;
  isSolved: boolean;
  onSolved: (evidenceId: string) => void;
}

export const PageMechanism: React.FC<PageMechanismProps> = ({
  season,
  pageNumber,
  evidenceId,
  isSolved,
  onSolved,
}) => {
  const data = DATA[`${season}-${pageNumber}`];
  const [stepIndex, setStepIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);
  const [note, setNote] = useState<string>('');
  const [done, setDone] = useState(isSolved);

  useEffect(() => {
    setStepIndex(0);
    setWrongCount(0);
    setMissed([]);
    setNote('');
    setDone(isSolved);
  }, [season, pageNumber, evidenceId, isSolved]);

  if (!data) {
    return (
      <div className="text-[12px] font-serif-body text-[#6E563B]">这一页没有机关。</div>
    );
  }

  const step = data.steps[stepIndex];
  const showHint = wrongCount >= 2;

  const pick = (label: string) => {
    if (done) return;
    if (label === step.answer) {
      libraryAudio.playBrassClick();
      setNote('');
      setWrongCount(0);
      setMissed([]);
      if (stepIndex + 1 < data.steps.length) {
        setStepIndex(stepIndex + 1);
      } else {
        setDone(true);
        setNote(data.success);
        libraryAudio.playMagicChime();
        window.setTimeout(() => onSolved(evidenceId), 700);
      }
      return;
    }
    libraryAudio.playSlotPlace();
    setWrongCount((c) => c + 1);
    setMissed((prev) => (prev.includes(label) ? prev : [...prev, label]));
    setNote(`不像。${step.prompt.replace('？', '')}——再想想这一页写了什么。`);
  };

  return (
    <div className="w-full max-w-[330px] text-[#241B14]">
      {/* 目标 */}
      <p className="text-[11px] font-serif-body italic text-[#6E563B]">{data.goal}</p>

      {/* 步骤指示 */}
      <div className="mt-2 flex items-center gap-1.5" aria-hidden="true">
        {data.steps.map((_, idx) => (
          <span
            key={idx}
            className={`h-[2px] flex-1 rounded-full transition-colors ${
              done || idx < stepIndex
                ? 'bg-[#8E2D20]/70'
                : idx === stepIndex
                  ? 'bg-[#8E2D20]'
                  : 'bg-[#C7B087]/45'
            }`}
          />
        ))}
        <span className="ml-1 font-mono text-[10px] text-[#7A634A]">
          {done ? '完成' : `${stepIndex + 1}/${data.steps.length}`}
        </span>
      </div>

      {done ? (
        <p className="mt-3 flex items-start gap-1.5 text-[12px] font-serif-body leading-relaxed text-[#4B3A26]">
          <Check className="mt-0.5 w-3.5 h-3.5 shrink-0 text-[#4B7544]" />
          {data.success}
        </p>
      ) : (
        <>
          <p className="mt-3 text-[13px] font-serif-body font-medium text-[#2A1F16]">{step.prompt}</p>

          <div className="mt-2 space-y-1.5">
            {step.options.map((label) => {
              const isMissed = missed.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => pick(label)}
                  disabled={isMissed}
                  className={`w-full rounded-[2px] border px-3 py-2 text-left text-[12.5px] font-serif-body transition-colors ${
                    isMissed
                      ? 'border-[#C7B087]/35 text-[#9A8B74] line-through decoration-[#9A8B74]/50'
                      : 'border-[#B08D52]/70 hover:border-[#8E2D20] hover:bg-[#F7EAD0]/60 text-[#241B14]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {note && (
            <p className="mt-2.5 flex items-start gap-1.5 text-[11.5px] font-serif-body leading-relaxed text-[#8E2D20]">
              <RotateCcw className="mt-0.5 w-3 h-3 shrink-0" />
              {note}
            </p>
          )}

          {showHint && (
            <p className="mt-2 flex items-start gap-1.5 rounded-[2px] border border-[#C2974E]/70 px-2 py-1.5 text-[11.5px] font-serif-body leading-relaxed text-[#613616]">
              <Lightbulb className="mt-0.5 w-3.5 h-3.5 shrink-0 text-[#B08A4E]" />
              {data.hint}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export type { StepOption };
