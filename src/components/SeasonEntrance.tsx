import React, { useEffect, useRef, useState } from 'react';
import { DoorOpen, Sparkles } from 'lucide-react';
import { GuestCase, SeasonId } from '../types/game';
import { libraryAudio } from '../utils/audio';
import { ResilientImage } from './EvidenceIcon';
import { AntiquePhotoCorners, PaperFiberOverlay, VictorianCornerFiligree } from './VictorianOrnaments';
import { SeasonSigilIcon } from './VisualKeepsakes';

/**
 * 角色出场舞台，分三段：
 *  ① 馆外四季实景 —— 干净完整地播一遍，不做任何遮挡；
 *  ② 实景退成背景，浮出古董相框肖像卡与「开门」；
 *  ③ 开门后播放 3 帧进门过场（关门 → 半开 → 踏光而入），再接回馆内案头视角。
 */

const SEASON_SCENE: Record<SeasonId, { src: string; label: string; seasonName: string }> = {
  spring: {
    src: 'src/assets/scene/outdoor-spring.jpg',
    label: '春 · 温室梦芽',
    seasonName: '春',
  },
  summer: {
    src: 'src/assets/scene/outdoor-summer.jpg',
    label: '夏 · 幻声剧院',
    seasonName: '夏',
  },
  autumn: {
    src: 'src/assets/scene/outdoor-autumn.jpg',
    label: '秋 · 记忆邮局',
    seasonName: '秋',
  },
  winter: {
    src: 'src/assets/scene/outdoor-winter.jpg',
    label: '冬 · 钟楼雪夜',
    seasonName: '冬',
  },
};

const SEASON_WHISPER: Record<SeasonId, string> = {
  spring: '馆外的雾还没散尽，台阶上落了一层细碎的白色花芽。',
  summer: '午后的光把树影拉得很长，风里有琴弦被谁轻轻拨动的余音。',
  autumn: '枯叶被风卷过石阶，一封没有贴邮票的信压在门垫下。',
  winter: '雪停之后，整座建筑静得能听见钟摆在远处数着秒钟。',
};

const DOOR_FRAMES = [
  'src/assets/scene/door-1-closed.jpg',
  'src/assets/scene/door-2-open.jpg',
  'src/assets/scene/door-3-enter.jpg',
] as const;

const HALL_MAIN = 'src/assets/scene/hall-main.jpg';

/** 实景完整播放时长（不被任何元素遮挡） */
const SCENE_HOLD_MS = 4600;

interface SeasonEntranceProps {
  currentCase: GuestCase;
  guestIndex: number;
  totalGuests: number;
  /** 首位来客的进门过场放慢、放长 */
  slowDoor?: boolean;
  onWelcomeGuest: () => void;
}

type EntranceStage = 'scene' | 'card' | 'door';

export const SeasonEntrance: React.FC<SeasonEntranceProps> = ({
  currentCase,
  guestIndex,
  totalGuests,
  slowDoor = false,
  onWelcomeGuest,
}) => {
  const scene = SEASON_SCENE[currentCase.season];
  const [stage, setStage] = useState<EntranceStage>('scene');
  const [doorStep, setDoorStep] = useState(0);
  const [cardReady, setCardReady] = useState(false);
  // 用 ref 持有回调，避免父组件重渲染时重置过场计时
  const welcomeRef = useRef(onWelcomeGuest);
  welcomeRef.current = onWelcomeGuest;

  // ① 实景先完整播放，播完才进入 ② 肖像卡
  useEffect(() => {
    if (stage !== 'scene') return;
    const timer = window.setTimeout(() => setStage('card'), SCENE_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'card') return;
    const timer = window.setTimeout(() => setCardReady(true), 60);
    return () => window.clearTimeout(timer);
  }, [stage]);

  // ③ 三帧进门过场：每帧停留 time，最后用大堂实景收尾，与案头无缝衔接
  useEffect(() => {
    if (stage !== 'door') return;
    const per = slowDoor ? [1900, 1900, 2400] : [1300, 1300, 1600];
    const timers: number[] = [];
    let acc = per[0];
    timers.push(
      window.setTimeout(() => {
        libraryAudio.playPageTurn();
        setDoorStep(1);
      }, acc)
    );
    acc += per[1];
    timers.push(
      window.setTimeout(() => {
        libraryAudio.playPageTurn();
        setDoorStep(2);
      }, acc)
    );
    acc += per[2];
    timers.push(
      window.setTimeout(() => {
        libraryAudio.playPageTurn();
        setDoorStep(3);
      }, acc)
    );
    timers.push(window.setTimeout(() => welcomeRef.current(), acc + 820));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [stage, slowDoor]);

  const handleOpenDoor = () => {
    if (stage !== 'card') return;
    libraryAudio.playDoorBell();
    setStage('door');
  };

  const handleSkipScene = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stage === 'scene') setStage('card');
  };

  return (
    <section
      aria-label={`${currentCase.guestName} 抵达馆外 · ${scene.label}`}
      className="fixed inset-0 z-40 overflow-hidden bg-[#0D0805]"
    >
      {/* ① 馆外四季实景：先单独完整播放，进入肖像卡阶段后虚化退为背景 */}
      <div
        className={`absolute inset-0 transition-all duration-[1100ms] ease-out ${
          stage === 'card' ? 'blur-[2.5px] brightness-[0.66] scale-[1.04]' : 'blur-0 brightness-100 scale-100'
        }`}
      >
        <ResilientImage
          src={scene.src}
          alt={`${scene.label}的图书馆外景`}
          fallbackTitle={scene.label}
          className="absolute inset-0 w-full h-full object-cover object-center animate-scene-drift saturate-[1.06]"
        />
      </div>

      {/* 季节调色与渐晕 */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
          stage === 'card' ? 'opacity-100' : 'opacity-70'
        } bg-[radial-gradient(ellipse_at_50%_34%,rgba(12,8,5,0.04)_22%,rgba(9,6,4,0.6)_100%)]`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[46%] transition-opacity duration-1000 ${
          stage === 'card' ? 'opacity-100' : 'opacity-80'
        } bg-gradient-to-t from-[#0A0603] via-[#0B0704]/72 to-transparent`}
      />

      {/* 顶部来客序号与季节卷标 */}
      <header className="absolute left-6 top-6 sm:left-10 sm:top-8 z-20 flex items-center gap-3">
        <SeasonSigilIcon season={currentCase.season} className="w-5 h-5" />
        <div className="space-y-0.5">
          <p
            className="font-display text-[11px] sm:text-xs tracking-[0.34em] text-[#F1DFB8]/92"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.85)' }}
          >
            第 {String(guestIndex + 1).padStart(2, '0')} 位来客
            <span className="mx-2 text-[#C8A460]/60">·</span>
            {scene.seasonName}
          </p>
        </div>
      </header>

      {/* ① 纯实景阶段：只留一行环境旁白，不遮挡画面 */}
      {stage === 'scene' && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-14 sm:pb-16">
          <p
            key={`${currentCase.id}-whisper`}
            className="max-w-2xl text-center text-balance font-serif-body text-[12.5px] sm:text-[13.5px] leading-[1.95] tracking-[0.06em] text-[#F0E3CA]/88 animate-subtitle-in"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)' }}
          >
            {SEASON_WHISPER[currentCase.season]}
          </p>
          <button
            type="button"
            onClick={handleSkipScene}
            className="mt-5 text-[10.5px] font-serif-body tracking-[0.26em] text-[#D9C6A2]/45 hover:text-[#F1E0BC]/80 transition-colors"
          >
            轻触跳过实景
          </button>
        </div>
      )}

      {/* ② 肖像卡阶段 */}
      {stage === 'card' && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pb-6">
          <div
            className={`transition-all duration-700 ease-out ${
              cardReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="relative w-[190px] sm:w-[228px] aspect-[3/4] rounded-[3px] p-[6px] bg-gradient-to-b from-[#5B3A22] to-[#2E1A0D] border border-[#CFA95E] shadow-[0_30px_60px_rgba(6,3,2,0.72)]">
              <VictorianCornerFiligree color="#C9A35F" sizeClass="w-4 h-4" />
              <div className="relative w-full h-full rounded-[2px] p-1.5 bg-[#FBF5E4] border border-[#B08A4E]">
                <PaperFiberOverlay idSuffix={`entrance-${currentCase.id}`} light />
                <AntiquePhotoCorners tone="brass" />
                <div className="relative w-full h-full overflow-hidden border border-[#A6824B]/75">
                  <ResilientImage
                    src={currentCase.portraitUrl}
                    alt={`${currentCase.guestName}（${currentCase.occupation}）`}
                    fallbackTitle={currentCase.guestName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-6 text-center transition-all duration-700 delay-150 ease-out ${
              cardReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[0.14em] text-[#FAF2E0]">
              {currentCase.guestName}
            </h2>
          </div>

          <p
            className={`mt-5 max-w-xl text-center text-balance font-serif-body text-[12.5px] sm:text-[13.5px] leading-[1.9] text-[#F4E8D2]/90 transition-all duration-700 delay-200 ease-out ${
              cardReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {currentCase.arrivalLine}
          </p>

          <button
            type="button"
            onClick={handleOpenDoor}
            className={`group mt-7 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-[2px] border bg-[#F7ECD2] hover:bg-[#FFF8E6] border-[#C89F55] text-[#3B291C] shadow-[0_10px_26px_rgba(6,3,2,0.55)] hover:-translate-y-0.5 transition-all duration-700 delay-300 ${
              cardReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <DoorOpen className="w-4 h-4 shrink-0 text-[#8E2D20]" />
            <span className="font-serif-body text-[13px] font-medium tracking-[0.06em]">
              开门 · 请 {currentCase.guestName.split('・')[0]} 入座
            </span>
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#B08A4E] group-hover:text-[#8E2D20] transition-colors" />
          </button>
        </div>
      )}

      {/* ③ 三帧进门过场 */}
      {stage === 'door' && (
        <div className="absolute inset-0 z-30 bg-[#0B0704] animate-stage-fade-in">
          {DOOR_FRAMES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={['馆内大门紧闭', '木门被推开一道缝', '门扉敞开，光里有人影'][idx]}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[900ms] ease-in-out"
              style={{
                opacity: doorStep >= idx ? 1 : 0,
                transform: idx === 2 ? 'scale(1.04)' : 'scale(1)',
                transitionProperty: 'opacity, transform',
                transitionDuration: '900ms, 3200ms',
              }}
            />
          ))}

          {/* 收尾：切回案头同一张大堂实景，完成无缝衔接 */}
          <img
            src={HALL_MAIN}
            alt="梦境图书馆大厅"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[820ms] ease-in-out"
            style={{ opacity: doorStep >= 3 ? 1 : 0 }}
          />

          {/* 暖光渐亮，压掉切镜的生硬感 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-[1200ms] ease-out"
            style={{
              opacity: doorStep >= 2 ? 1 : 0,
              background:
                'radial-gradient(ellipse at 50% 44%, rgba(255,245,220,0.30) 0%, rgba(255,236,196,0.10) 34%, transparent 62%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#0A0603] to-transparent opacity-70"
          />

          <p className="absolute inset-x-0 bottom-10 text-center font-serif-body text-[11px] tracking-[0.34em] text-[#F0DFBE]/80">
            {doorStep >= 3 ? '门扉合上，炭火与茶香正暖' : '门扉轻启'}
          </p>
        </div>
      )}
    </section>
  );
};
