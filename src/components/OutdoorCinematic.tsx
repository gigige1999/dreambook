import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SkipForward } from 'lucide-react';
import { libraryAudio } from '../utils/audio';

/**
 * 首次进入游戏时播放的「馆外晨昏」轮转：白天 → 黄昏 → 黑夜。
 * 以极简字幕替代原有的弹窗式手谕，讲清故事背景后自然过渡到第一位来客。
 */

const DAY_SRC = '/src/assets/scene/outdoor-day.jpg';
const NIGHT_SRC = '/src/assets/scene/outdoor-night.jpg';

type LightingStage = 0 | 1 | 2;

interface CinematicBeat {
  stage: LightingStage;
  line: string;
  hold: number;
}

const BEATS: CinematicBeat[] = [
  {
    stage: 0,
    hold: 5200,
    line: '城郊有一座只在晨露时分开门的图书馆，馆中收藏着人世间遗落的梦境。',
  },
  {
    stage: 1,
    hold: 6000,
    line: '四季更迭，总有人循着门铃而来——他们带着一本读不完的书，和一件放不下的旧事。',
  },
  {
    stage: 2,
    hold: 7000,
    line: '你是这里的守梦人：不问罪名，只问心事。替他们寻回《梦境之书》，拾起散落的信物。',
  },
  {
    stage: 2,
    hold: 5600,
    line: '天亮了。第一位客人，已经站在门外。',
  },
];

interface OutdoorCinematicProps {
  onComplete: () => void;
}

export const OutdoorCinematic: React.FC<OutdoorCinematicProps> = ({ onComplete }) => {
  const [beatIdx, setBeatIdx] = useState(0);
  const finishedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    libraryAudio.playWaxSealStamp();
    onComplete();
  }, [onComplete]);

  const advance = useCallback(() => {
    if (beatIdx >= BEATS.length - 1) {
      finish();
      return;
    }
    libraryAudio.playPageTurn();
    setBeatIdx((idx) => idx + 1);
  }, [beatIdx, finish]);

  // 逐句字幕：每句停留到时自动推进
  useEffect(() => {
    if (finishedRef.current) return;
    const beat = BEATS[beatIdx];
    timerRef.current = window.setTimeout(() => {
      if (beatIdx >= BEATS.length - 1) finish();
      else setBeatIdx((idx) => idx + 1);
    }, beat.hold);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [beatIdx, finish]);

  // 键盘：Esc 跳过、空格/回车推进
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        finish();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [advance, finish]);

  const beat = BEATS[beatIdx];
  const stage = beat.stage;

  return (
    <main
      aria-label="馆外晨昏轮转 · 开场"
      onClick={advance}
      className="relative h-screen w-screen overflow-hidden bg-[#0C0805] cursor-pointer select-none"
    >
      {/* 白天底图：缓慢推移的第一人称馆外远景 */}
      <img
        src={DAY_SRC}
        alt="晨露梦境图书馆的白天外景"
        className="absolute inset-0 w-full h-full object-cover object-center animate-scene-drift"
        draggable={false}
      />

      {/* 黑夜图层：随字幕逐句压暗，完成白天→黄昏→黑夜的轮转 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-[4200ms] ease-in-out"
        style={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.52 : 1 }}
      >
        <img
          src={NIGHT_SRC}
          alt="晨露梦境图书馆的夜晚外景"
          className="absolute inset-0 w-full h-full object-cover object-center animate-scene-drift-slow"
          draggable={false}
        />
      </div>

      {/* 黄昏暖调 / 深夜冷调滤镜 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-all duration-[4200ms] ease-in-out"
        style={{
          background:
            stage === 0
              ? 'linear-gradient(to bottom, rgba(247,205,140,0.10), rgba(24,12,6,0.30))'
              : stage === 1
                ? 'linear-gradient(to bottom, rgba(214,124,68,0.22), rgba(28,14,8,0.56))'
                : 'linear-gradient(to bottom, rgba(22,38,64,0.34), rgba(6,9,18,0.78))',
        }}
      />

      {/* 顶部与底部渐晕，保证字幕清晰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_28%,rgba(8,5,3,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#070503] via-[#070503]/72 to-transparent"
      />

      {/* 左上：卷标 */}
      <header className="pointer-events-none absolute left-6 top-6 sm:left-10 sm:top-8 z-10 flex items-center gap-3">
        <span className="h-[1px] w-8 bg-[#C89F55]/70" aria-hidden="true" />
        <p className="font-display text-[11px] sm:text-xs tracking-[0.42em] text-[#F1E0BC]/92">
          晨露梦境图书馆 · 序
        </p>
      </header>

      {/* 右上：跳过 */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="absolute right-6 top-6 sm:right-10 sm:top-8 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-[#C89F55]/45 bg-[#120C07]/55 text-[11px] font-serif-body text-[#E8D8B8]/85 hover:text-[#FCF3DE] hover:border-[#C89F55]/80 backdrop-blur-sm transition-colors"
      >
        <span>跳过开场</span>
        <SkipForward className="w-3 h-3" />
      </button>

      {/* 极简字幕：无边框、无弹窗，仅一行行淡入的叙述 */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-14 sm:pb-20">
        <p
          key={beatIdx}
          className="max-w-[46rem] text-center text-balance font-display text-[15px] sm:text-[19px] leading-[1.95] tracking-[0.08em] text-[#F7EDD8] animate-subtitle-in"
          style={{ textShadow: '0 2px 18px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)' }}
        >
          {beat.line}
        </p>

        {/* 节拍进度：四段细金线 */}
        <div className="mt-7 flex items-center gap-2.5" aria-hidden="true">
          {BEATS.map((b, idx) => (
            <span
              key={b.line}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                idx === beatIdx
                  ? 'w-12 bg-[#E3BE72]'
                  : idx < beatIdx
                    ? 'w-6 bg-[#E3BE72]/45'
                    : 'w-6 bg-[#E3BE72]/16'
              }`}
            />
          ))}
        </div>

        <p className="mt-5 text-[10.5px] font-serif-body tracking-[0.28em] text-[#D9C6A2]/55">
          点击任意处继续 · ESC 跳过
        </p>
      </div>
    </main>
  );
};
