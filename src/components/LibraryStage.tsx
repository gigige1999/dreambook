import React, { useState } from 'react';
import { BookOpen, Check, DoorOpen, Eye, Music, Search, Sparkles, X } from 'lucide-react';
import { GUEST_CASES } from '../data/libraryCases';
import { GamePhase, GuestCase, SeasonId } from '../types/game';
import { libraryAudio } from '../utils/audio';
import { ResilientImage } from './EvidenceIcon';
import {
  AntiquePhotoCorners,
  BrassCornerPlate,
  PaperFiberOverlay,
  VictorianCornerFiligree,
} from './VictorianOrnaments';
import {
  DeskLampArt,
  DeskMagnifierArt,
  DeskTeacupArt,
  GiftKeepsakeIllustration,
  KnotStateEmblem,
  MagicRelicFrame,
  MiniBookBadge,
  SeasonSigilIcon,
} from './VisualKeepsakes';

type DeskPropId = 'lamp' | 'tea' | 'magnifier';

interface LibraryStageProps {
  phase: GamePhase;
  currentCase: GuestCase;
  resolvedCaseIds: string[];
  isLampOn: boolean;
  isMagnifierActive: boolean;
  hasServedTea: boolean;
  propNotice: string | null;
  isGiftCollected: boolean;
  onDismissNotice: () => void;
  onToggleLamp: () => void;
  onServeTea: () => void;
  onToggleMagnifier: () => void;
  onWelcomeGuest: () => void;
  onOpenShelves: () => void;
  onOpenBookModal: () => void;
  onOpenKnotModal: () => void;
  onCollectGift: (giftId: string) => void;
  onOpenArchive: () => void;
}

const LIBRARY_BACKDROP = '/src/assets/images/library_interior_rusty_fresh_1795439953648.jpg';

const GUEST_MAGNIFIER_OBSERVATIONS: Record<string, string> = {
  spring: '透过黄铜镜片，你看见伊索尔德指尖沾着细碎的金色花粉，袖口还别着一枚褪色的枯萎花芽标本。',
  summer: '镜片下的亚瑟指节处残留着松香与蓝墨水痕，胸前怀表链上挂着半枚断裂的银质音叉。',
  autumn: '在镜面放大下，玛莎领口别着一枚焦边旧信封残角，指环内侧刻着模糊的「Never Sent」字样。',
  winter: '透过放大镜细看，塞缪尔大衣襟前凝着不化的霜花纹路，表袋里正传出停在零点前的微弱齿轮震动。',
};

interface DustParticle {
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
  variant: 'drift' | 'shimmer';
  warm: boolean;
}

const DUST_PARTICLES: DustParticle[] = [
  { left: '10%', top: '26%', size: 4, duration: '9.5s', delay: '0s', variant: 'drift', warm: true },
  { left: '14%', top: '42%', size: 3, duration: '7.2s', delay: '1.1s', variant: 'shimmer', warm: false },
  { left: '21%', top: '55%', size: 3, duration: '8.4s', delay: '0.7s', variant: 'shimmer', warm: true },
  { left: '28%', top: '68%', size: 3, duration: '7.8s', delay: '1.9s', variant: 'shimmer', warm: true },
  { left: '36%', top: '48%', size: 4, duration: '9.8s', delay: '2.8s', variant: 'shimmer', warm: true },
  { left: '48%', top: '38%', size: 5, duration: '8.6s', delay: '2.1s', variant: 'shimmer', warm: true },
  { left: '56%', top: '52%', size: 4, duration: '7.6s', delay: '1.4s', variant: 'shimmer', warm: true },
  { left: '68%', top: '21%', size: 4, duration: '9.7s', delay: '2.6s', variant: 'drift', warm: true },
  { left: '76%', top: '31%', size: 5, duration: '10.8s', delay: '3.9s', variant: 'drift', warm: true },
  { left: '84%', top: '25%', size: 3.5, duration: '9.1s', delay: '2.9s', variant: 'drift', warm: false },
];

const SeasonalEggArtwork: React.FC<{ season: SeasonId; className?: string }> = ({
  season,
  className = 'w-8 h-8',
}) => {
  switch (season) {
    case 'spring':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 40 Q23 28 24 20" stroke="#689B6E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M24 31 Q16 28 15 33 Q20 35 24 31 Z" fill="#89BD8E" />
          <circle cx="24" cy="18" r="7" fill="#FFFFFF" opacity="0.95" />
          <circle cx="24" cy="18" r="3" fill="#F2D06B" />
        </svg>
      );
    case 'summer':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="10" y="24" width="28" height="16" rx="2" fill="#FAF2DE" stroke="#9B8258" strokeWidth="1.3" transform="rotate(-6 24 32)" />
          <path d="M14 31 H33 M14 35 H30" stroke="#B6A382" strokeWidth="1" />
          <path d="M25 22 C18 12, 12 16, 16 23 C13 27, 19 29, 25 24" fill="#F2CE74" stroke="#855D1C" strokeWidth="1.2" />
          <path d="M25 22 C32 12, 38 16, 34 23 C37 27, 31 29, 25 24" fill="#FAE096" stroke="#855D1C" strokeWidth="1.2" />
        </svg>
      );
    case 'autumn':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path
            d="M24 37 C14 30, 10 22, 14 16 C17 12, 22 14, 24 18 C26 14, 31 12, 34 16 C38 22, 34 30, 24 37 Z"
            fill="#E0855E"
            stroke="#8B3F28"
            strokeWidth="1.5"
          />
          <circle cx="20" cy="20" r="2" fill="#FBE1A6" opacity="0.85" />
          <circle cx="28" cy="22" r="1.6" fill="#E8C6F7" opacity="0.85" />
        </svg>
      );
    case 'winter':
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="8" y="22" width="32" height="16" rx="4" fill="#E9F2FA" stroke="#7A95AD" strokeWidth="1.4" />
          <ellipse cx="24" cy="30" rx="10" ry="5" fill="#9A8F82" stroke="#5E564C" strokeWidth="1.2" />
          <path d="M18 30 Q24 27 30 31" stroke="#DFD5C5" strokeWidth="1.1" fill="none" />
        </svg>
      );
  }
};

export const LibraryStage: React.FC<LibraryStageProps> = ({
  phase,
  currentCase,
  resolvedCaseIds,
  isLampOn,
  isMagnifierActive,
  hasServedTea,
  propNotice,
  isGiftCollected,
  onDismissNotice,
  onToggleLamp,
  onServeTea,
  onToggleMagnifier,
  onWelcomeGuest,
  onOpenShelves,
  onOpenBookModal,
  onOpenKnotModal,
  onCollectGift,
  onOpenArchive,
}) => {
  const [activeEggId, setActiveEggId] = useState<string | null>(null);
  const [whisperOpen, setWhisperOpen] = useState(false);
  const [hoveredProp, setHoveredProp] = useState<DeskPropId | null>(null);
  const [inspectedGuestIds, setInspectedGuestIds] = useState<string[]>([]);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number } | null>(null);

  const showGuestAtDesk = phase !== 'TITLE_MENU' && phase !== 'GUEST_ARRIVING';
  const canClickShelves = phase === 'DESK_DIALOGUE' || phase === 'BOOK_INSPECTION';
  const isCurrentResolved = resolvedCaseIds.includes(currentCase.id);
  const hasInspectedGuest = inspectedGuestIds.includes(currentCase.id);
  const isTargetWestWing = currentCase.shelfZone === 'spring' || currentCase.shelfZone === 'summer';
  const isTargetEastWing = currentCase.shelfZone === 'autumn' || currentCase.shelfZone === 'winter';

  const unlockedEggs = GUEST_CASES.filter((c) => resolvedCaseIds.includes(c.id)).map(
    (c) => c.easterEgg
  );
  const activeEgg = unlockedEggs.find((e) => e.id === activeEggId) ?? null;

  const propMetaMap: Record<
    DeskPropId,
    { title: string; status: string; usage: string; actionHint: string }
  > = {
    lamp: {
      title: '映墨暖灯',
      status: isLampOn ? '已点亮指路' : '晨雾微暗',
      usage: '点亮后，正厅两侧书架会为目标书籍所在的馆区亮起「✦ 暖灯指路」，书架内也会标出目标区。',
      actionHint: isLampOn ? '点击切换为微暗晨雾光影' : '点击立即点亮台灯并照亮目标书架方向',
    },
    tea: {
      title: '洋甘菊热茶',
      status: hasServedTea ? `已奉予 ${currentCase.guestName}` : '待端给访客',
      usage: '点击即可请客人入座并奉上热茶，直接解锁破咒秘语、明确索书指引与牌桌花茶护佑。',
      actionHint: hasServedTea
        ? '再次轻触可获得当前阶段的贴心指路提示'
        : '点击立即奉茶套取关键线索',
    },
    magnifier: {
      title: '黄铜放大镜',
      status: isMagnifierActive ? '持镜巡检中' : '放置于案头',
      usage: '拿起后可直接点击访客肖像细察隐藏特征，也能在「书架抽屉」与「梦境书第 4 页」照出暗字。',
      actionHint: isMagnifierActive ? '点击放回案头' : '点击拿起黄铜放大镜并开启主厅细察模式',
    },
  };

  const activeHoverMeta = hoveredProp ? propMetaMap[hoveredProp] : null;

  const renderHoverPropArt = (propId: DeskPropId) => {
    switch (propId) {
      case 'lamp':
        return <DeskLampArt isOn={isLampOn} className="w-9 h-9 shrink-0" />;
      case 'tea':
        return <DeskTeacupArt className="w-9 h-9 shrink-0" />;
      case 'magnifier':
        return <DeskMagnifierArt active={isMagnifierActive} className="w-9 h-9 shrink-0" />;
    }
  };

  const handleInteractKeepsake = () => {
    if (currentCase.giftKeepsake.interactiveType === 'silver-bell') {
      libraryAudio.playSilverBellMelody();
    } else {
      libraryAudio.playMagicChime();
    }
    setWhisperOpen((v) => !v);
  };

  const handleInspectGuestPortrait = () => {
    if (!isMagnifierActive) return;
    libraryAudio.playEvidenceCollect();
    setInspectedGuestIds((prev) =>
      prev.includes(currentCase.id) ? prev : [...prev, currentCase.id]
    );
  };

  return (
    <section
      aria-label="梦境图书馆主场景视野"
      onMouseMove={(e) => {
        if (!isMagnifierActive) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setLoupePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setLoupePos(null)}
      className={`relative flex-1 min-h-0 w-full overflow-hidden bg-[#2A1B10] ${
        isMagnifierActive ? 'cursor-zoom-in' : ''
      }`}
    >
      {/* Full-Bleed First-Person Library Backdrop */}
      <ResilientImage
        src={LIBRARY_BACKDROP}
        alt="阳光洒落的英伦复古梦境图书馆内部，远处是半掩的木质大门与四周书架"
        fallbackTitle="晨露梦境图书馆大厅"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
          isLampOn ? 'brightness-105 saturate-105' : 'brightness-[0.68] saturate-[0.76]'
        }`}
      />

      {/* Ambient Morning & Lamp Lighting */}
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
          isLampOn
            ? 'bg-gradient-to-b from-[#FFE6B3]/22 via-transparent to-[#3B2616]/24'
            : 'bg-gradient-to-b from-[#1A222E]/48 via-[#1D1610]/24 to-[#120C08]/58'
        }`}
      />

      {/* Dramatic Warm Lamp Pool When Lamp Is Lit */}
      {isLampOn && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_62%,rgba(255,222,150,0.22),transparent_64%)]"
        />
      )}

      {phase === 'CASE_CLEARED' && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#F8D698]/24 via-transparent to-[#FFF3D1]/34 transition-opacity duration-700" />
      )}

      {/* Soft Diagonal Window Sunbeam & Floating Dust Particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[8%] -top-[18%] w-[52%] h-[135%] rotate-[18deg] bg-gradient-to-r from-[#FFF7DF]/18 via-[#FFF5D2]/10 to-transparent blur-2xl" />
        {DUST_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full ${
              p.variant === 'drift' ? 'animate-mote' : 'animate-dust-shimmer'
            }`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.warm ? 'rgba(255, 240, 194, 0.88)' : 'rgba(255, 251, 238, 0.82)',
              boxShadow: p.warm
                ? '0 0 8px 2px rgba(255, 224, 150, 0.55)'
                : '0 0 6px 1px rgba(255, 249, 230, 0.45)',
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Live Cursor-Tracking Brass Magnifier Ring */}
      {isMagnifierActive && loupePos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-30 w-20 h-20 -ml-10 -mt-10 rounded-full border-[2.5px] border-[#C89F55] bg-[#FFF8DF]/12 shadow-[0_0_0_2px_rgba(36,27,20,0.65),0_0_24px_rgba(246,204,116,0.42)] backdrop-brightness-110"
          style={{ left: `${loupePos.x}px`, top: `${loupePos.y}px` }}
        >
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-[2px] bg-[#2B1B11]/92 border border-[#C89F55]/70 text-[9.5px] font-serif-body text-[#F8E7C0] whitespace-nowrap">
            细察镜
          </span>
        </div>
      )}

      {/* TOP-LEFT WALNUT & BRASS DESK TOOL CADDY (Genuinely interactive on main stage) */}
      <div className="absolute top-3 left-3 sm:left-4 z-20 flex flex-col items-start gap-2">
        <div className="flex items-center gap-1 rounded-[3px] border-[1.5px] border-[#241B14] bg-gradient-to-b from-[#4B2F1B] to-[#311E10] p-1 shadow-[0_10px_22px_rgba(14,8,4,0.48)] text-[#241B14]">
          <button
            type="button"
            onClick={onToggleLamp}
            onMouseEnter={() => setHoveredProp('lamp')}
            onMouseLeave={() => setHoveredProp(null)}
            onFocus={() => setHoveredProp('lamp')}
            onBlur={() => setHoveredProp(null)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] border transition-all whitespace-nowrap shrink-0 ${
              isLampOn
                ? 'bg-gradient-to-b from-[#FAF0D4] to-[#EBD6A8] border-[#C89F55] text-[#5B3A14] font-semibold shadow-xs'
                : 'bg-[#3C2617] border-[#6A4A2E] text-[#DCC6A0] hover:bg-[#4A301D]'
            }`}
          >
            <DeskLampArt isOn={isLampOn} className="w-5 h-5 shrink-0" />
            <span className="text-[11px] font-serif-body">
              {isLampOn ? '暖灯·指路中' : '暖灯·已熄'}
            </span>
          </button>

          <button
            type="button"
            onClick={onServeTea}
            onMouseEnter={() => setHoveredProp('tea')}
            onMouseLeave={() => setHoveredProp(null)}
            onFocus={() => setHoveredProp('tea')}
            onBlur={() => setHoveredProp(null)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] border transition-all whitespace-nowrap shrink-0 ${
              hasServedTea
                ? 'bg-gradient-to-b from-[#FAF0D4] to-[#EBD6A8] border-[#C89F55] text-[#6B3B16] font-semibold shadow-xs'
                : 'bg-[#FAF1D8] border-[#9E7C4B] text-[#3B291C] hover:bg-[#FFF8E4]'
            }`}
          >
            <DeskTeacupArt className="w-5 h-5 shrink-0" />
            <span className="text-[11px] font-serif-body">
              {hasServedTea ? '花茶·续茶提示' : '奉洋甘菊茶'}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleMagnifier}
            onMouseEnter={() => setHoveredProp('magnifier')}
            onMouseLeave={() => setHoveredProp(null)}
            onFocus={() => setHoveredProp('magnifier')}
            onBlur={() => setHoveredProp(null)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] border transition-all whitespace-nowrap shrink-0 ${
              isMagnifierActive
                ? 'bg-[#8E2D20] border-[#E5C175] text-[#FAF3E2] font-semibold shadow-xs'
                : 'bg-[#FAF1D8] border-[#9E7C4B] text-[#3B291C] hover:bg-[#FFF8E4]'
            }`}
          >
            <DeskMagnifierArt active={isMagnifierActive} className="w-5 h-5 shrink-0" />
            <span className="text-[11px] font-serif-body">
              {isMagnifierActive ? '持镜细察中' : '黄铜放大镜'}
            </span>
          </button>
        </div>

        {isMagnifierActive && !activeHoverMeta && !propNotice && (
          <div className="rounded-[2px] border border-[#C89F55] bg-[#362113]/92 px-3 py-1.5 text-[11px] font-serif-body text-[#F8E7C0] shadow-md">
            持镜巡检已开启：请点击下方访客肖像细察人物特征，或前往书架/梦境书第 4 页照出暗字。
          </div>
        )}

        {(activeHoverMeta || propNotice) && (
          <div
            role="status"
            className="relative w-72 sm:w-80 rounded-[3px] bg-vintage-folio desk-ink-card text-[#241B14] p-2.5"
          >
            <VictorianCornerFiligree color="#8A6332" sizeClass="w-3.5 h-3.5" />
            {activeHoverMeta && hoveredProp ? (
              <div className="flex items-start gap-2.5">
                {renderHoverPropArt(hoveredProp)}
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-xs font-semibold text-[#241B14]">
                      {activeHoverMeta.title}
                    </p>
                    <span className="text-[10px] font-serif-body text-[#7C5E3E] whitespace-nowrap">
                      {activeHoverMeta.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-serif-body text-[#3E3125] leading-relaxed">
                    {activeHoverMeta.usage}
                  </p>
                  <p className="text-[10px] font-serif-body text-[#8E2D20]">
                    {activeHoverMeta.actionHint}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-serif-body text-[#241B14] leading-relaxed">
                  {propNotice}
                </p>
                <button
                  type="button"
                  onClick={onDismissNotice}
                  aria-label="关闭提示"
                  className="p-0.5 text-[#7A634A] hover:text-[#241B14] shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* UNLOCKED OUTDOOR SEASONAL EASTER EGGS (Top-Right Window / Threshold Sill) */}
      {unlockedEggs.length > 0 && (
        <div className="absolute top-3 right-4 z-20 flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 rounded-[3px] border-[1.5px] border-[#3B291C] bg-vintage-folio px-2.5 py-1 shadow-[0_6px_14px_rgba(18,10,5,0.34)]">
            <span className="text-[10.5px] font-serif-body text-[#4F3F2D] whitespace-nowrap">
              馆外季节彩蛋：
            </span>
            {unlockedEggs.map((egg) => (
              <button
                key={egg.id}
                type="button"
                onClick={() => {
                  if (egg.season === 'summer') libraryAudio.playSilverBellMelody();
                  else libraryAudio.playMagicChime();
                  setActiveEggId((prev) => (prev === egg.id ? null : egg.id));
                }}
                title={egg.title}
                className={`p-1 rounded-[2px] transition-transform hover:scale-110 ${
                  activeEggId === egg.id ? 'bg-[#E9DEC4] ring-1 ring-[#8E2D20]' : ''
                }`}
              >
                <SeasonalEggArtwork season={egg.season} className="w-6 h-6" />
              </button>
            ))}
          </div>

          {activeEgg && (
            <div className="relative w-64 rounded-[3px] bg-vintage-folio desk-ink-card p-2.5 text-[#241B14]">
              <p className="font-display text-xs font-semibold text-[#241B14]">
                {activeEgg.title}
              </p>
              <p className="mt-1 font-serif-body text-[11px] text-[#45392C] leading-relaxed">
                {activeEgg.detail}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Left & Right Bookcase Index Plates (Illuminated by Lamp When ON) */}
      {canClickShelves && (
        <>
          <button
            type="button"
            onClick={onOpenShelves}
            aria-label="查看西侧春夏书架"
            className={`group hidden md:flex flex-col items-center justify-center absolute left-5 lg:left-8 top-[46%] -translate-y-1/2 px-3.5 py-3 rounded-[3px] text-[#FAF2E2] border-[1.5px] transition-all duration-200 hover:-translate-y-[52%] ${
              isLampOn && isTargetWestWing
                ? 'bg-[#422B18] border-[#F0C86E] shadow-[0_0_24px_rgba(245,198,96,0.45)]'
                : 'bg-[#2D1E13]/92 hover:bg-[#3C2819] border-[#C6A25E]/80 shadow-[0_12px_26px_rgba(14,8,4,0.5)]'
            }`}
          >
            <VictorianCornerFiligree color="#C6A25E" sizeClass="w-3.5 h-3.5" />
            <Search className="w-3.5 h-3.5 text-[#E8C472] mb-1 transition-transform group-hover:scale-110" />
            <span className="font-display text-xs font-medium tracking-wide whitespace-nowrap">
              西侧书架
            </span>
            <span className="text-[10px] font-serif-body text-[#D4BE98] whitespace-nowrap">
              {isLampOn && isTargetWestWing ? '✦ 暖灯指路' : '春夏藏阁'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenShelves}
            aria-label="查看东侧秋冬书架"
            className={`group hidden md:flex flex-col items-center justify-center absolute right-5 lg:right-8 top-[46%] -translate-y-1/2 px-3.5 py-3 rounded-[3px] text-[#FAF2E2] border-[1.5px] transition-all duration-200 hover:-translate-y-[52%] ${
              isLampOn && isTargetEastWing
                ? 'bg-[#422B18] border-[#F0C86E] shadow-[0_0_24px_rgba(245,198,96,0.45)]'
                : 'bg-[#2D1E13]/92 hover:bg-[#3C2819] border-[#C6A25E]/80 shadow-[0_12px_26px_rgba(14,8,4,0.5)]'
            }`}
          >
            <VictorianCornerFiligree color="#C6A25E" sizeClass="w-3.5 h-3.5" />
            <BookOpen className="w-3.5 h-3.5 text-[#E8C472] mb-1 transition-transform group-hover:scale-110" />
            <span className="font-display text-xs font-medium tracking-wide whitespace-nowrap">
              东侧书架
            </span>
            <span className="text-[10px] font-serif-body text-[#D4BE98] whitespace-nowrap">
              {isLampOn && isTargetEastWing ? '✦ 暖灯指路' : '秋冬藏阁'}
            </span>
          </button>
        </>
      )}

      {/* Stage Center: Doorway Guest Arrival OR Seated Guest Across the Desk */}
      <div className="relative z-10 h-full max-w-5xl mx-auto px-4 sm:px-8 flex items-end justify-center pb-2">
        {phase === 'GUEST_ARRIVING' && (
          <div className="mb-3 flex flex-col items-center text-center">
            <button
              type="button"
              onClick={onWelcomeGuest}
              className="group relative flex flex-col items-center focus-visible:outline-2 focus-visible:outline-[#B55C40]"
            >
              {/* Rectangular Victorian Cabinet Portrait */}
              <div className="relative w-26 sm:w-30 aspect-[3/4] rounded-[3px] p-1.5 bg-[#3B2415] border-[2px] border-[#C89F55] shadow-[0_20px_38px_rgba(16,8,4,0.58)] transition-transform duration-300 group-hover:scale-[1.03]">
                <div className="relative w-full h-full rounded-[2px] p-1 bg-[#FAF3DE] border border-[#7C572C]">
                  <AntiquePhotoCorners tone="brass" />
                  <div className="w-full h-full overflow-hidden border border-[#9E783B]/65">
                    <ResilientImage
                      src={currentCase.portraitUrl}
                      alt={`${currentCase.guestName} 站在图书馆门口`}
                      fallbackTitle={currentCase.guestName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-2 px-4 py-1.5 rounded-[3px] bg-vintage-folio desk-ink-card text-[#241B14] group-hover:bg-[#8E2D20] group-hover:text-[#FAF6EE] group-hover:border-[#4E160F] transition-colors">
                <DoorOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="font-serif-body text-xs sm:text-sm font-medium whitespace-nowrap">
                  门铃轻响 · 请 {currentCase.guestName} 入座
                </span>
              </div>
            </button>
          </div>
        )}

        {showGuestAtDesk && (
          <div className="w-full max-w-[840px] flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-5">
            {/* Rectangular Framed Oil-Portrait Character Card Seated Across the Oak Desk */}
            <div className="relative shrink-0 w-28 sm:w-32 md:w-[146px] aspect-[3/4] rounded-[3px] p-1 bg-gradient-to-b from-[#54341F] to-[#331D0F] border border-[#CFA95E] shadow-[0_14px_28px_rgba(14,8,4,0.48)] translate-y-1">
              <div className="relative w-full h-full rounded-[2px] p-1 bg-[#FBF5E4] border border-[#B08A4E]">
                <AntiquePhotoCorners tone="brass" />
                <div className="relative w-full h-full overflow-hidden border border-[#A6824B]/75">
                  <ResilientImage
                    src={currentCase.portraitUrl}
                    alt={`${currentCase.guestName}（${currentCase.occupation}）`}
                    fallbackTitle={currentCase.guestName}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Interactive Magnifier Hotspot on Rectangular Portrait */}
                  {isMagnifierActive && (
                    <button
                      type="button"
                      onClick={handleInspectGuestPortrait}
                      className="absolute inset-x-1.5 top-1.5 flex items-center justify-center gap-1 py-1 px-1.5 rounded-[2px] bg-[#2D1A0E]/88 hover:bg-[#8E2D20] border border-[#E5C175] text-[10px] font-serif-body text-[#FAF2DE] shadow-md transition-colors"
                    >
                      <Eye className="w-3 h-3 shrink-0 text-[#F2CB74]" />
                      <span>{hasInspectedGuest ? '已细察特征' : '持镜细察'}</span>
                    </button>
                  )}

                  {/* Crisp Rectangular Brass-Trimmed Nameplate */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#21130B]/96 via-[#2B190F]/86 to-transparent border-t border-[#C89F55]/55 px-2 py-1.5 text-center text-[#FAF6EE]">
                    <p className="font-display text-sm font-semibold leading-tight tracking-wide">
                      {currentCase.guestName}
                    </p>
                    <p className="text-[10px] font-serif-body text-[#E5D3B3] truncate">
                      {currentCase.occupation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Layered Walnut, Delicate Gilt Hairline & Watercolor Dialogue Folio */}
            <div className="relative flex-1 min-w-0 mb-1.5 rounded-[4px] bg-gradient-to-b from-[#543520] via-[#412817] to-[#2F1B0E] border border-[#7C5B34] p-[4px] shadow-[0_16px_34px_rgba(12,6,3,0.5)]">
              <BrassCornerPlate position="tl" />
              <BrassCornerPlate position="tr" />
              <BrassCornerPlate position="bl" />
              <BrassCornerPlate position="br" />

              <div className="relative bg-vintage-folio rounded-[2px] gilt-hairline-frame overflow-hidden text-[#241B14]">
                <PaperFiberOverlay idSuffix="desk-dialogue" light />
                {/* Top Engraved Letterhead Ribbon */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-[#F1E4C8]/82 border-b border-[#C6A25E]/70 px-4 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <SeasonSigilIcon
                      season={currentCase.season}
                      glowing={isCurrentResolved}
                      className="w-4 h-4 shrink-0"
                    />
                    <span className="font-display text-xs sm:text-[13px] font-semibold text-[#241B14] truncate">
                      {currentCase.guestName}
                    </span>
                    <span className="text-[11px] font-serif-body italic text-[#6D563B] truncate">
                      {currentCase.englishName}
                    </span>
                    {hasServedTea && phase !== 'CASE_CLEARED' && (
                      <span className="inline-flex items-center gap-1 pl-2 border-l border-[#B89864] text-[11px] font-serif-body font-medium text-[#7D3A19] whitespace-nowrap">
                        <DeskTeacupArt className="w-4 h-4 shrink-0" />
                        <span>已品洋甘菊茶</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Ruled Parchment Prose + Recessed Right Specimen Niche */}
                <div className="relative z-10 journal-ruled-page px-4 py-3 sm:px-5 sm:py-3.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1 min-w-0">
                        <>
                          <div className="relative pl-4">
                            <span
                              aria-hidden="true"
                              className="absolute left-0 -top-1 font-display text-2xl leading-none text-[#A37B42]/70 select-none"
                            >
                              “
                            </span>
                            <p className="font-serif-body text-sm sm:text-[15px] text-[#241B14] leading-[1.78]">
                              {phase === 'CASE_CLEARED'
                                ? currentCase.knot.resolutionDialogue
                                : phase === 'KNOT_RESOLUTION'
                                  ? currentCase.knot.guestWorry
                                  : currentCase.greetingDialogue}
                            </p>
                          </div>

                          {hasServedTea && phase !== 'CASE_CLEARED' && (
                            <div className="rounded-[2px] border border-[#C2974E] bg-[#F7E7C0]/85 px-3 py-1.5 font-serif-body text-xs text-[#613616] leading-relaxed">
                              <span className="font-semibold text-[#8E2D20]">花茶密谈：</span>
                              {currentCase.teaBonusHint}
                            </div>
                          )}

                          {hasInspectedGuest && GUEST_MAGNIFIER_OBSERVATIONS[currentCase.season] && (
                            <div className="rounded-[2px] border border-[#9E7840] bg-[#EFE2C2]/90 px-3 py-1.5 font-serif-body text-xs text-[#3B2818] leading-relaxed">
                              <span className="font-semibold text-[#6B441C]">放大镜细察：</span>
                              {GUEST_MAGNIFIER_OBSERVATIONS[currentCase.season]}
                            </div>
                          )}
                        </>
                    </div>

                    {/* Recessed Brass-Trimmed Specimen Niche */}
                    <div className="shrink-0 flex flex-col items-center gap-1 rounded-[2px] border border-[#B08D52] bg-[#E8D5AE]/80 px-2.5 py-2 shadow-inner">
                      {phase === 'DESK_DIALOGUE' ? (
                        <>
                          <MiniBookBadge
                            spineColor={currentCase.spineColor}
                            accentColor={currentCase.spineAccent}
                            caseId={currentCase.id}
                          />
                          <span className="text-[10px] font-mono text-[#4F3B27] tabular-nums">
                            {currentCase.bookCallNumber}
                          </span>
                        </>
                      ) : (
                        <KnotStateEmblem
                          caseId={currentCase.id}
                          healed={phase === 'CASE_CLEARED'}
                          className="w-12 h-12"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Brass-Trimmed Action Plinth */}
                {phase === 'CASE_CLEARED' ? (
                  <div className="bg-[#E9D6B0]/85 border-t border-[#B89864] px-4 py-2.5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <MagicRelicFrame season={currentCase.season} className="flex-1 min-w-0 w-full">
                        <div className="flex items-center gap-3 min-w-0">
                          <GiftKeepsakeIllustration
                            giftId={currentCase.giftKeepsake.id}
                            className="w-11 h-11 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-serif-body text-xs font-semibold text-[#241B14]">
                              隐藏信物：{currentCase.giftKeepsake.title}
                            </p>
                            <p className="text-[11px] font-serif-body text-[#5A4836] leading-snug mt-0.5">
                              {whisperOpen
                                ? currentCase.giftKeepsake.hiddenWhisper
                                : currentCase.giftKeepsake.partingNote}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleInteractKeepsake}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10.5px] font-serif-body font-medium text-[#6B3A24] hover:text-[#241B14] border border-[#B08D52] bg-[#FCF6E4] rounded transition-colors whitespace-nowrap shrink-0"
                          >
                            {currentCase.giftKeepsake.interactiveType === 'silver-bell' ? (
                              <>
                                <Music className="w-3 h-3" />
                                <span>摇响银铃</span>
                              </>
                            ) : (
                              <span>{whisperOpen ? '收起密语' : '轻触细看'}</span>
                            )}
                          </button>
                        </div>
                      </MagicRelicFrame>

                      {!isGiftCollected ? (
                        <button
                          type="button"
                          onClick={() => onCollectGift(currentCase.giftKeepsake.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>收进梦境手帐本</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenArchive}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-serif-body font-medium text-[#5B2228] bg-[#F5E6C4] hover:bg-[#ECD7AA] border border-[#B08A48] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Check className="w-3.5 h-3.5 text-[#8E2D20]" />
                          <span>已贴入手帐本 · 翻看</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#E9D6B0]/85 border-t border-[#B89864] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    {phase === 'DESK_DIALOGUE' && (
                      <>
                        <span className="font-serif-body text-[#4E3B27]">
                          记住右侧书脊花纹，前往四季书架寻回《{currentCase.bookTitle}》
                        </span>
                        <button
                          type="button"
                          onClick={onOpenShelves}
                          className="px-3.5 py-1.5 font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap"
                        >
                          去书架寻书
                        </button>
                      </>
                    )}

                    {phase === 'BOOK_INSPECTION' && (
                      <>
                        <span className="font-serif-body text-[#4E3B27]">
                          《{currentCase.bookTitle}》已置桌面，请翻阅收集 4 枚入梦信物
                        </span>
                        <button
                          type="button"
                          onClick={onOpenBookModal}
                          className="px-3.5 py-1.5 font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap"
                        >
                          翻开梦境书
                        </button>
                      </>
                    )}

                    {phase === 'KNOT_RESOLUTION' && (
                      <>
                        <span className="font-serif-body text-[#4E3B27]">
                          凭证已齐备，可入梦解析
                        </span>
                        <button
                          type="button"
                          onClick={onOpenKnotModal}
                          className="px-3.5 py-1.5 font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap"
                        >
                          进入梦境解析牌桌
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
