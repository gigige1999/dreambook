import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import {
  ShelfBookItem,
  ShelfDrawerItem,
  ShelfPocketItemId,
  ShelfZoneId,
} from '../types/game';

/**
 * 2D Hand-Painted Watercolor + Crisp Ink-Line Victorian Library Bookcases & Tactile Book Volumes
 */

export interface CabinetSlotRect {
  top: string;
  height: string;
  left: string;
  right: string;
}

export interface WingVisualTheme {
  id: ShelfZoneId;
  backdropUrl: string;
  backdropAlt: string;
  cabinetCutoutUrl: string;
  cabinetAspectRatio: string;
  shelfBounds: {
    top: CabinetSlotRect;
    middle: CabinetSlotRect;
    lower: CabinetSlotRect;
    drawers: CabinetSlotRect;
  };
  wallFallbackGradient: string;
  velvetLiningBg: string;
  lampBeamRgba: string;
  plaqueTitle: string;
  fillerColors: [string, string, string];
}

export const WING_VISUAL_THEMES: Record<ShelfZoneId, WingVisualTheme> = {
  spring: {
    id: 'spring',
    backdropUrl: 'src/assets/images/wing_spring_conservatory_1795574456613.jpg',
    backdropAlt: '春季植物学温室藏书阁手绘水彩拱窗与藤蔓背景',
    cabinetCutoutUrl: 'src/assets/images/cabinet_spring_oak_cutout.png',
    cabinetAspectRatio: '738 / 829',
    shelfBounds: {
      top: { top: '21.6%', height: '16.0%', left: '10.4%', right: '10.4%' },
      middle: { top: '39.8%', height: '16.0%', left: '10.4%', right: '10.4%' },
      lower: { top: '58.4%', height: '15.8%', left: '10.4%', right: '10.4%' },
      drawers: { top: '78.2%', height: '13.2%', left: '7.0%', right: '7.0%' },
    },
    wallFallbackGradient: 'linear-gradient(180deg, #CFE0CF 0%, #9EB89F 55%, #6A7B64 100%)',
    velvetLiningBg: '#3D5744',
    lampBeamRgba: 'rgba(255, 240, 190, 0.16)',
    plaqueTitle: '春 · 梦芽温室阁',
    fillerColors: ['#5E7A61', '#8A7656', '#697F6B'],
  },
  summer: {
    id: 'summer',
    backdropUrl: 'src/assets/images/wing_summer_theater_1795574457482.jpg',
    backdropAlt: '夏季永夏剧院乐谱阁手绘水彩天鹅绒帷幕与弧窗背景',
    cabinetCutoutUrl: 'src/assets/images/cabinet_summer_walnut_cutout.png',
    cabinetAspectRatio: '807 / 755',
    shelfBounds: {
      top: { top: '24.0%', height: '16.0%', left: '9.6%', right: '9.6%' },
      middle: { top: '42.2%', height: '15.6%', left: '9.6%', right: '9.6%' },
      lower: { top: '60.4%', height: '16.0%', left: '9.6%', right: '9.6%' },
      drawers: { top: '83.2%', height: '11.8%', left: '5.5%', right: '5.5%' },
    },
    wallFallbackGradient: 'linear-gradient(180deg, #35445A 0%, #566376 55%, #2C2520 100%)',
    velvetLiningBg: '#273549',
    lampBeamRgba: 'rgba(255, 222, 146, 0.16)',
    plaqueTitle: '夏 · 幻声剧院阁',
    fillerColors: ['#3E4E63', '#6E4C43', '#4E5D70'],
  },
  autumn: {
    id: 'autumn',
    backdropUrl: 'src/assets/images/wing_autumn_postoffice_1795574457444.jpg',
    backdropAlt: '秋季记忆邮局藏书阁手绘水彩木窗与漂浮信笺背景',
    cabinetCutoutUrl: 'src/assets/images/cabinet_autumn_mahogany_cutout.png',
    cabinetAspectRatio: '861 / 808',
    shelfBounds: {
      top: { top: '21.4%', height: '15.1%', left: '8.6%', right: '8.6%' },
      middle: { top: '39.2%', height: '15.6%', left: '8.6%', right: '8.6%' },
      lower: { top: '57.4%', height: '15.8%', left: '8.6%', right: '8.6%' },
      drawers: { top: '78.2%', height: '13.4%', left: '4.5%', right: '4.5%' },
    },
    wallFallbackGradient: 'linear-gradient(180deg, #8F757D 0%, #B9987A 55%, #5C3D2C 100%)',
    velvetLiningBg: '#533B4A',
    lampBeamRgba: 'rgba(242, 212, 250, 0.14)',
    plaqueTitle: '秋 · 笔迹邮驿阁',
    fillerColors: ['#6E5566', '#835C4D', '#675361'],
  },
  winter: {
    id: 'winter',
    backdropUrl: 'src/assets/images/wing_winter_clocktower_1795574457724.jpg',
    backdropAlt: '冬季永冻钟楼藏书阁手绘水彩圆花窗与悬雪背景',
    cabinetCutoutUrl: 'src/assets/images/cabinet_winter_fir_cutout.png',
    cabinetAspectRatio: '654 / 804',
    shelfBounds: {
      top: { top: '28.0%', height: '14.4%', left: '9.4%', right: '9.4%' },
      middle: { top: '44.6%', height: '14.0%', left: '9.4%', right: '9.4%' },
      lower: { top: '61.2%', height: '13.6%', left: '9.4%', right: '9.4%' },
      drawers: { top: '79.8%', height: '12.2%', left: '7.6%', right: '7.6%' },
    },
    wallFallbackGradient: 'linear-gradient(180deg, #748899 0%, #516373 55%, #2D3843 100%)',
    velvetLiningBg: '#2F4152',
    lampBeamRgba: 'rgba(214, 236, 255, 0.15)',
    plaqueTitle: '冬 · 永冻钟楼阁',
    fillerColors: ['#455666', '#586876', '#617482'],
  },
};

/* ============================================================================
 * 1. Shared SVG Watercolor Paper & Leather Grain Filter Definition
 * ========================================================================== */

export const BookTextureSvgDefs: React.FC = () => (
  <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
    <defs>
      <filter id="watercolor-book-grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          seed="7"
          result="noise"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0 0.07  0 0 0 0.08 0"
          in="noise"
          result="tintedNoise"
        />
        <feComposite in="tintedNoise" in2="SourceGraphic" operator="atop" />
      </filter>
    </defs>
  </svg>
);

/* ============================================================================
 * 2. Hand-Inked Rolling Wooden Ladder Art (Clean 2D Lines, No Muddy Shadows)
 * ========================================================================== */

export const InkedWoodenLadderArt: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 96 340" preserveAspectRatio="none" className={className} aria-hidden="true">
    {/* Brass top rail hooks */}
    <circle cx="16" cy="10" r="6" fill="#DFB864" stroke="#241B14" strokeWidth="2.2" />
    <circle cx="80" cy="10" r="6" fill="#DFB864" stroke="#241B14" strokeWidth="2.2" />

    {/* Left & right oak ladder rails */}
    <rect x="11" y="14" width="10" height="320" rx="2" fill="#B57E46" stroke="#241B14" strokeWidth="2.2" />
    <rect x="75" y="14" width="10" height="320" rx="2" fill="#B57E46" stroke="#241B14" strokeWidth="2.2" />
    <line x1="14" y1="20" x2="14" y2="328" stroke="#E4B77A" strokeWidth="1.2" opacity="0.6" />
    <line x1="78" y1="20" x2="78" y2="328" stroke="#E4B77A" strokeWidth="1.2" opacity="0.6" />

    {/* Rungs with brass brackets */}
    {[46, 94, 142, 190, 238, 286].map((y) => (
      <g key={y}>
        <rect x="19" y={y} width="58" height="7" rx="1.5" fill="#CF9A58" stroke="#241B14" strokeWidth="1.8" />
        <line x1="22" y1={y + 2} x2="74" y2={y + 2} stroke="#F3D89A" strokeWidth="1" opacity="0.55" />
      </g>
    ))}
  </svg>
);

/* ============================================================================
 * 3. Hand-Inked Stacked Horizontal Books (Lower Shelf Interactive Stack)
 * ========================================================================== */

export const HorizontalBookStackArt: React.FC<{
  isLifted: boolean;
}> = ({ isLifted }) => (
  <div className="relative flex flex-col items-center">
    <svg
      viewBox="0 0 112 52"
      className="w-24 sm:w-28 md:w-32 h-12 sm:h-14 overflow-visible"
      aria-hidden="true"
    >
      {/* Top tilted old leather volume */}
      <g
        transform={isLifted ? 'translate(-2, -10) rotate(-6 56 16)' : 'translate(0, 0)'}
        style={{ transition: 'transform 220ms ease-out' }}
      >
        <path
          d="M12 6 H96 Q102 13 96 20 H12 Q7 13 12 6 Z"
          fill="#8C5F4B"
          stroke="#241B14"
          strokeWidth="2"
        />
        {/* Paper pages exposed on right */}
        <path
          d="M94 8 H101 V18 H94"
          fill="#EFE2C4"
          stroke="#241B14"
          strokeWidth="1.4"
        />
        <line x1="20" y1="13" x2="78" y2="13" stroke="#E8C677" strokeWidth="1.4" />
        <rect x="34" y="9" width="32" height="8" rx="1" fill="#F4E9D0" stroke="#241B14" strokeWidth="1" />
        <text x="50" y="15.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#241B14">
          旧册手记
        </text>
      </g>

      {/* Bottom sturdy folio album */}
      <g>
        <path
          d="M6 23 H104 Q110 33 104 43 H6 Q2 33 6 23 Z"
          fill="#5D7461"
          stroke="#241B14"
          strokeWidth="2"
        />
        <path d="M101 25 H108 V41 H101" fill="#F2E6CC" stroke="#241B14" strokeWidth="1.4" />
        <line x1="16" y1="27" x2="16" y2="39" stroke="#E6C26E" strokeWidth="1.8" />
        <line x1="92" y1="27" x2="92" y2="39" stroke="#E6C26E" strokeWidth="1.8" />
        <rect x="32" y="27" width="44" height="11" rx="1.5" fill="#FAF1DB" stroke="#241B14" strokeWidth="1.1" />
        <text x="54" y="35" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#241B14">
          {isLifted ? '已翻底签' : '典藏图集'}
        </text>
      </g>
    </svg>
    {/* Crisp 2D resting contact line */}
    <span aria-hidden="true" className="w-20 h-[2px] -mt-0.5 rounded-full bg-[#241B14]/45" />
  </div>
);

/* ============================================================================
 * 4. Hand-Painted Companion Books (Organic 2D Silhouettes, Zero CSS Boxes)
 * ========================================================================== */

const getFillerSpritesForZone = (zone: ShelfZoneId): [string, string] => {
  switch (zone) {
    case 'spring':
      return ['src/assets/images/book_sprite_4.png', 'src/assets/images/book_sprite_1.png'];
    case 'summer':
      return ['src/assets/images/book_sprite_3.png', 'src/assets/images/book_sprite_2.png'];
    case 'autumn':
      return ['src/assets/images/book_sprite_4.png', 'src/assets/images/book_sprite_5.png'];
    case 'winter':
    default:
      return ['src/assets/images/book_sprite_2.png', 'src/assets/images/book_sprite_6.png'];
  }
};

export const ShelfFillerBookCluster: React.FC<{
  zone: ShelfZoneId;
  variant?: 'left' | 'right';
}> = ({ zone, variant = 'left' }) => {
  const [leftSrc, rightSrc] = getFillerSpritesForZone(zone);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden lg:flex items-end -space-x-2 h-[74%] opacity-55 saturate-75 brightness-90 shrink-0 select-none"
    >
      <img
        src={variant === 'left' ? leftSrc : rightSrc}
        alt=""
        referrerPolicy="no-referrer"
        className="h-full w-8 object-fill"
      />
      <img
        src={variant === 'left' ? rightSrc : leftSrc}
        alt=""
        referrerPolicy="no-referrer"
        className={`h-[90%] w-8 object-fill ${variant === 'right' ? 'rotate-[4deg] origin-bottom' : ''}`}
      />
    </div>
  );
};

/* ============================================================================
 * 5. Transparent Hotspots Over Painted Catalog Drawers (No Box Clutter!)
 * ========================================================================== */

export const PaintedDrawerHotspot: React.FC<{
  drawer: ShelfDrawerItem;
  isOpened: boolean;
  hasToolInside: boolean;
  onClick: () => void;
}> = ({ drawer, isOpened, hasToolInside, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`拉开 ${drawer.brassCode} ${drawer.label}`}
      className={`group relative h-full w-full rounded-[3px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#FCE2A6] ${
        isOpened
          ? 'bg-[#FCE2A6]/18 ring-2 ring-[#FCE2A6]'
          : 'hover:bg-[#FFF0C2]/12 hover:ring-1 hover:ring-[#E8C574]/85'
      }`}
    >
      {/* Crisp Mini Brass Catalog Tag tucked at top-left/bottom-center without hiding cup pull */}
      <div className="absolute inset-x-1 bottom-1 flex items-center justify-center gap-1 pointer-events-none">
        <span className="px-1.5 py-[1px] rounded-[2px] bg-[#FAF0D6]/95 border border-[#241B14] font-mono text-[8.5px] sm:text-[9.5px] font-bold text-[#241B14] tabular-nums whitespace-nowrap">
          {drawer.brassCode} · {drawer.label}
        </span>
        {hasToolInside && (
          <span
            aria-label="抽屉内有工具"
            className="px-1 rounded-full bg-[#241B14]/80 text-[#FFE48F] text-[9px] leading-tight"
          >
            ✦
          </span>
        )}
      </div>
    </button>
  );
};

/* ============================================================================
 * 6. Seasonal Subtle Floating Particles (No Muddy Gradient Blobs)
 * ========================================================================== */

const SEASONAL_MOTES: Record<
  ShelfZoneId,
  Array<{ left: string; top: string; delay: string; size: string; glyph?: string }>
> = {
  spring: [
    { left: '16%', top: '28%', delay: '0s', size: 'w-1.5 h-1.5' },
    { left: '34%', top: '48%', delay: '1.4s', size: 'w-2 h-2' },
    { left: '66%', top: '34%', delay: '0.8s', size: 'w-1.5 h-1.5' },
    { left: '82%', top: '58%', delay: '2.4s', size: 'w-1.5 h-1.5' },
  ],
  summer: [
    { left: '14%', top: '34%', delay: '0.3s', size: 'text-[11px]', glyph: '♪' },
    { left: '38%', top: '54%', delay: '1.8s', size: 'w-1.5 h-1.5' },
    { left: '68%', top: '42%', delay: '2.2s', size: 'text-[11px]', glyph: '♩' },
    { left: '84%', top: '28%', delay: '1.1s', size: 'w-1.5 h-1.5' },
  ],
  autumn: [
    { left: '16%', top: '24%', delay: '0.2s', size: 'text-[10px]', glyph: '❦' },
    { left: '42%', top: '44%', delay: '2.1s', size: 'w-1.5 h-1.5' },
    { left: '70%', top: '50%', delay: '3.1s', size: 'w-1.5 h-1.5' },
    { left: '84%', top: '28%', delay: '1.5s', size: 'text-[10px]', glyph: '✒' },
  ],
  winter: [
    { left: '15%', top: '24%', delay: '0s', size: 'text-[10px]', glyph: '❄' },
    { left: '36%', top: '54%', delay: '1.5s', size: 'w-1.5 h-1.5' },
    { left: '66%', top: '40%', delay: '2.2s', size: 'text-[10px]', glyph: '❄' },
    { left: '82%', top: '30%', delay: '0.9s', size: 'w-1.5 h-1.5' },
  ],
};

export const WingAmbientAtmosphere: React.FC<{
  zone: ShelfZoneId;
  isNightLampMode: boolean;
}> = ({ zone, isNightLampMode }) => {
  const theme = WING_VISUAL_THEMES[zone];
  const motes = SEASONAL_MOTES[zone];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {isNightLampMode && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 35%, ${theme.lampBeamRgba} 0%, transparent 72%)`,
          }}
        />
      )}

      {motes.map((m, idx) => {
        const animClass =
          zone === 'autumn'
            ? 'animate-wing-leaf'
            : zone === 'winter'
              ? 'animate-wing-frost'
              : 'animate-wing-float';

        const dotColor =
          zone === 'spring'
            ? 'bg-[#D8F8C6]'
            : zone === 'summer'
              ? 'bg-[#FFE291]'
              : zone === 'autumn'
                ? 'bg-[#DFB5F5]'
                : 'bg-[#E2F3FF]';

        const glyphColor =
          zone === 'summer'
            ? 'text-[#FFE28F]'
            : zone === 'autumn'
              ? 'text-[#F0C89B]'
              : 'text-[#DCEFFF]';

        return m.glyph ? (
          <span
            key={idx}
            className={`absolute ${m.size} ${glyphColor} opacity-75 ${animClass}`}
            style={{ left: m.left, top: m.top, animationDelay: m.delay }}
          >
            {m.glyph}
          </span>
        ) : (
          <span
            key={idx}
            className={`absolute rounded-full ${m.size} ${dotColor} ${animClass}`}
            style={{ left: m.left, top: m.top, animationDelay: m.delay }}
          />
        );
      })}
    </div>
  );
};

/* ============================================================================
 * 7. Bespoke 2D Illustrated Mechanism Overlays (Glass / Wax Seal / Frost)
 * ========================================================================== */

export const SpringGlassCabinetOverlay: React.FC<{
  hasKeySelected: boolean;
  onClick: () => void;
}> = ({ hasKeySelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group absolute inset-x-1 top-1 bottom-0 z-30 rounded-t-[3px] border-2 flex items-center justify-center transition-colors overflow-hidden ${
      hasKeySelected
        ? 'border-[#FCE2A6] bg-[#E2F2E6]/35 ring-2 ring-[#E6C06E]'
        : 'border-[#241B14] bg-[#D8EBE1]/24 hover:bg-[#E2F2E6]/34'
    }`}
  >
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    >
      <path d="M0 40 L100 0 M0 100 L200 0 M100 120 L300 0 M220 120 L400 20 M320 120 L400 75" stroke="#2D3C31" strokeWidth="1.2" />
      <path d="M400 40 L300 0 M400 100 L200 0 M300 120 L100 0 M180 120 L0 20 M80 120 L0 75" stroke="#2D3C31" strokeWidth="1.2" />
      <polygon points="35,0 75,0 45,120 5,120" fill="rgba(255,255,255,0.22)" />
    </svg>

    <div
      aria-hidden="true"
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-[#8A5A2F] border-x border-[#241B14]"
    />
    <div className="relative z-10 px-2.5 py-1 rounded bg-[#FAF4E4]/95 border-[1.5px] border-[#241B14] flex items-center gap-1.5 text-[#28332B]">
      <Lock className="w-3 h-3 text-[#A85137]" />
      <span className="text-[10.5px] font-serif-body font-medium whitespace-nowrap">
        {hasKeySelected
          ? '点击用「黄铜小钥匙」开锁'
          : '彩玻标本柜 · 需黄铜小钥匙'}
      </span>
    </div>
  </button>
);

export const AutumnWaxSealOverlay: React.FC<{
  hasOpenerSelected: boolean;
  onClick: () => void;
}> = ({ hasOpenerSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title="火漆红绳封印（需铜柄拆信刀裁开）"
    className={`absolute -inset-x-1 top-1/2 -translate-y-1/2 z-30 h-6 flex items-center justify-center transition-transform ${
      hasOpenerSelected ? 'scale-105' : 'hover:scale-[1.03]'
    }`}
  >
    <span
      aria-hidden="true"
      className={`w-full h-2.5 border-y border-[#241B14] ${
        hasOpenerSelected ? 'ring-2 ring-[#FCE2A6]' : ''
      }`}
      style={{
        background:
          'repeating-linear-gradient(45deg, #A44432 0px, #A44432 4px, #D16850 4px, #D16850 7px)',
      }}
    />
    <span
      aria-hidden="true"
      className={`absolute w-5 h-5 rounded-full border-[1.5px] border-[#241B14] flex items-center justify-center text-[8.5px] font-display font-bold ${
        hasOpenerSelected
          ? 'bg-[#E5B85B] text-[#241B14]'
          : 'bg-[#A63F32] text-[#FCEAD0]'
      }`}
    >
      封
    </span>
  </button>
);

export const WinterFrostCaseOverlay: React.FC<{
  hasThawSelected: boolean;
  onClick: () => void;
}> = ({ hasThawSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title="厚霜冰晶封印（需暖铜融雪匙融开）"
    className={`absolute -inset-1 z-30 rounded-[4px] border-2 flex flex-col items-center justify-center transition-colors overflow-hidden ${
      hasThawSelected
        ? 'bg-[#D6ECFC]/68 border-[#FCE2A6] ring-2 ring-[#E6C06E]'
        : 'bg-[#CBE3F6]/52 border-[#7BA6C9] hover:bg-[#D8ECFC]/64'
    }`}
  >
    <svg viewBox="0 0 64 96" className="pointer-events-none absolute inset-0 w-full h-full opacity-75" aria-hidden="true">
      <path d="M2 14 L14 2 M2 26 L24 4 M62 82 L50 94 M62 70 L40 92" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 14 V32 M23 23 H41 M26 17 L38 29 M38 17 L26 29" stroke="#4D789B" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
    <span className="relative z-10 px-1 py-0.5 rounded bg-[#FAF4E4]/95 border border-[#4D789B] text-[8.5px] font-serif-body font-semibold text-[#243B50] whitespace-nowrap">
      {hasThawSelected ? '融霜' : '冰封'}
    </span>
  </button>
);

/* ============================================================================
 * 8. Hand-Painted Watercolor + Ink-Line 2D Hardcover Book Sprites
 * ========================================================================== */

const getBookMotifSymbol = (bookId: string): string => {
  if (bookId === 'book-isolde') return '✿';
  if (bookId === 'book-arthur') return '♫';
  if (bookId === 'book-martha') return '✒';
  if (bookId === 'book-samuel') return '❄';
  if (bookId.startsWith('spr')) return '❦';
  if (bookId.startsWith('sum')) return '♪';
  if (bookId.startsWith('aut')) return '✉';
  return '✦';
};

const BOOK_SPRITE_URLS = [
  'src/assets/images/book_sprite_1.png', // 0: sage botanical green + brass
  'src/assets/images/book_sprite_2.png', // 1: deep midnight navy + gilt ribs
  'src/assets/images/book_sprite_3.png', // 2: terracotta burgundy + marbled cover
  'src/assets/images/book_sprite_4.png', // 3: honey-ochre antique leather
  'src/assets/images/book_sprite_5.png', // 4: dusty mauve-plum cloth
  'src/assets/images/book_sprite_6.png', // 5: slate graphite winter hardcover
];

const getBookSpriteUrl = (book: ShelfBookItem, styleIndex: number): string => {
  if (book.id === 'book-isolde') return BOOK_SPRITE_URLS[0];
  if (book.id === 'book-arthur') return BOOK_SPRITE_URLS[1];
  if (book.id === 'book-martha') return BOOK_SPRITE_URLS[4];
  if (book.id === 'book-samuel') return BOOK_SPRITE_URLS[5];

  const hex = book.spineColor.toLowerCase();
  if (hex.includes('4e65') || hex.includes('5b73') || hex.includes('4358') || hex.includes('485b') || hex.includes('5e6e') || hex.includes('7688')) {
    return BOOK_SPRITE_URLS[0];
  }
  if (hex.includes('3946') || hex.includes('4b55') || hex.includes('3e4c') || hex.includes('485a') || hex.includes('4e5b')) {
    return BOOK_SPRITE_URLS[1];
  }
  if (hex.includes('b57b') || hex.includes('b878') || hex.includes('8b62') || hex.includes('9c6b') || hex.includes('6941') || hex.includes('a96b') || hex.includes('7c5a')) {
    return BOOK_SPRITE_URLS[2];
  }
  if (hex.includes('a987') || hex.includes('7b63') || hex.includes('8b71') || hex.includes('8a6d') || hex.includes('725c') || hex.includes('8b6d') || hex.includes('7863') || hex.includes('8b79') || hex.includes('7a68') || hex.includes('7b67')) {
    return BOOK_SPRITE_URLS[3];
  }
  if (hex.includes('6e67') || hex.includes('5e53') || hex.includes('8b68') || hex.includes('8b83')) {
    return BOOK_SPRITE_URLS[4];
  }
  if (hex.includes('4654') || hex.includes('5b70') || hex.includes('3b42') || hex.includes('5262') || hex.includes('6974') || hex.includes('4451') || hex.includes('5c6f') || hex.includes('4e5d') || hex.includes('5661')) {
    return BOOK_SPRITE_URLS[5];
  }
  return BOOK_SPRITE_URLS[styleIndex % BOOK_SPRITE_URLS.length];
};

export interface EnhancedBookSpineProps {
  book: ShelfBookItem;
  styleIndex: number;
  selected: boolean;
  pulled: boolean;
  isTarget: boolean;
  isNightMode: boolean;
  highlighted?: boolean;
  onClick: () => void;
}

export const EnhancedBookSpine: React.FC<EnhancedBookSpineProps> = ({
  book,
  styleIndex,
  selected,
  pulled,
  isTarget,
  isNightMode,
  highlighted = false,
  onClick,
}) => {
  const spriteUrl = getBookSpriteUrl(book, styleIndex);
  const isLongTitle = book.title.length >= 8;

  const widthClass =
    styleIndex % 3 === 1
      ? 'w-[54px] sm:w-[62px] md:w-[66px]'
      : styleIndex % 3 === 2
        ? 'w-[48px] sm:w-[54px] md:w-[58px]'
        : 'w-[51px] sm:w-[58px] md:w-[62px]';

  // Tall, prominent volumes filling 88%–98% of each shelf compartment
  const heightPctClass =
    book.heightClass.includes('h-24') || book.heightClass.includes('h-28')
      ? 'h-[88%]'
      : book.heightClass.includes('h-32')
        ? 'h-[98%]'
        : 'h-[93%]';

  const tiltClass = selected
    ? '-translate-y-3 -rotate-2 scale-[1.06]'
    : book.tilt === 'left'
      ? '-rotate-2 origin-bottom'
      : book.tilt === 'right'
        ? 'rotate-2 origin-bottom'
        : '';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`翻阅《${book.title}》(${book.callNumber})`}
      className={`group relative z-10 ${widthClass} ${heightPctClass} transition-transform duration-200 ease-out shrink-0 focus-visible:outline-2 focus-visible:outline-[#E6C06E] overflow-visible ${tiltClass} ${
        selected
          ? 'z-20'
          : highlighted
            ? '-translate-y-2'
            : pulled
              ? '-translate-y-1'
              : 'hover:-translate-y-2.5 hover:brightness-[1.07]'
      }`}
    >
      {/* Genuine 2D Hand-Painted Watercolor & Ink Hardcover Book Sprite */}
      <img
        src={spriteUrl}
        alt={`《${book.title}》`}
        referrerPolicy="no-referrer"
        className={`pointer-events-none w-full h-full object-fill select-none ${
          selected || highlighted
            ? 'drop-shadow-[0_0_6px_rgba(252,226,166,0.95)]'
            : ''
        }`}
      />

      {/* Motif Emblem tucked cleanly inside the painted Cream Spine Label (y: 33%..43%, left: 5%..42%) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[6%] top-[33%] w-[36%] h-[10%] flex items-center justify-center text-[10px] sm:text-[11px] font-bold leading-none ${
          isNightMode && isTarget ? 'text-[#18704A]' : 'text-[#3B2A1A]'
        }`}
      >
        {getBookMotifSymbol(book.id)}
      </span>

      {/* Single-Column Non-Wrapping Vertical Title Bookplate on Angled Front Cover */}
      <div
        className={`pointer-events-none absolute left-[52%] right-[10%] top-[10%] bottom-[19%] flex items-center justify-center rounded-[2px] border px-[1px] py-1 ${
          isNightMode && isTarget
            ? 'bg-[#173026]/95 border-[#8CEFC0]'
            : 'bg-[#FAF2DE]/94 border-[#241B14]/85'
        }`}
      >
        <span
          className={`font-display font-bold [writing-mode:vertical-rl] whitespace-nowrap leading-none tracking-tight ${
            isLongTitle
              ? 'text-[8.5px] sm:text-[9px] md:text-[9.5px]'
              : 'text-[9px] sm:text-[10px] md:text-[10.5px]'
          } ${isNightMode && isTarget ? 'text-[#B8FFE0]' : 'text-[#241B14]'}`}
        >
          {book.title}
        </span>
      </div>

      {/* Crisp Paper Call-Number Tag along Bottom Spine Foot */}
      <span
        className={`pointer-events-none absolute bottom-[2%] left-[4%] px-1 py-[1px] rounded-[2px] border border-[#241B14] font-mono text-[6.5px] sm:text-[7.5px] font-bold tabular-nums leading-none whitespace-nowrap ${
          isNightMode && isTarget
            ? 'bg-[#1D352B] text-[#A8FAD0]'
            : 'bg-[#FAF2DE] text-[#241B14]'
        }`}
      >
        {book.callNumber}
      </span>

      {/* Hover / Focus Vintage Nameplate Tooltip */}
      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded bg-[#2B1D13]/95 border border-[#D8B467] text-[10px] font-serif-body text-[#FAF2DE] whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
        《{book.title}》 · {book.callNumber}
      </span>

      {selected && isTarget && (
        <span className="absolute -top-2.5 right-0 z-20 w-5 h-5 rounded-full bg-[#B55C40] text-white flex items-center justify-center border-[1.5px] border-[#241B14]">
          <Sparkles className="w-3 h-3" />
        </span>
      )}
    </button>
  );
};

/* ============================================================================
 * 9. Pocket Item Art, Theater Regulator Clock, & Velvet-Lined Drawer Tray
 * ========================================================================== */

export const PocketItemArt: React.FC<{
  id: ShelfPocketItemId;
  className?: string;
}> = ({ id, className = 'w-11 h-11' }) => {
  switch (id) {
    case 'brass-key':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <g transform="rotate(-35 32 32)">
            <circle cx="20" cy="32" r="9" fill="#DFB968" stroke="#241B14" strokeWidth="2.2" />
            <circle cx="20" cy="32" r="3.5" fill="#FBF4E4" stroke="#241B14" strokeWidth="1.6" />
            <rect x="28" y="29.5" width="25" height="5" rx="1.5" fill="#DFB968" stroke="#241B14" strokeWidth="2" />
            <path
              d="M44 34.5 V42 H48 V38 H51 V42 H54 V34.5"
              fill="#C79B46"
              stroke="#241B14"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'winding-key':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path
            d="M22 18 Q13 18 13 26 Q13 33 22 33 H29 V50 H35 V33 H42 Q51 33 51 26 Q51 18 42 18 Q36 18 35 23 H29 Q28 18 22 18 Z"
            fill="#D8AC56"
            stroke="#241B14"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="25.5" r="3.2" fill="#FBF4E4" stroke="#241B14" strokeWidth="1.6" />
          <circle cx="43" cy="25.5" r="3.2" fill="#FBF4E4" stroke="#241B14" strokeWidth="1.6" />
          <rect x="29" y="45" width="6" height="7" fill="#9E7630" stroke="#241B14" strokeWidth="1.8" />
        </svg>
      );

    case 'letter-opener':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <g transform="rotate(-38 32 32)">
            <path d="M28 8 L34 12 L34 36 H28 Z" fill="#E2E5DF" stroke="#241B14" strokeWidth="2" strokeLinejoin="round" />
            <rect x="25" y="35" width="12" height="4.5" rx="1.5" fill="#D5A850" stroke="#241B14" strokeWidth="1.8" />
            <rect x="27.5" y="39.5" width="7" height="16" rx="3" fill="#C86D51" stroke="#241B14" strokeWidth="2" />
            <circle cx="31" cy="48" r="1.4" fill="#F9EEDB" />
          </g>
        </svg>
      );

    case 'thaw-key':
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <g transform="rotate(-32 32 32)">
            <circle cx="20" cy="32" r="9.5" fill="#D5825A" stroke="#241B14" strokeWidth="2.2" />
            <circle cx="20" cy="32" r="4" fill="#FFF0C8" stroke="#241B14" strokeWidth="1.5" />
            <rect x="29" y="29.5" width="23" height="5" rx="1.5" fill="#D5825A" stroke="#241B14" strokeWidth="2" />
            <path d="M44 34.5 V42 H49 V38 H52 V42" fill="#B8623B" stroke="#241B14" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="20" cy="20" r="2.2" fill="#FFE8A3" />
          </g>
        </svg>
      );
  }
};

export const RustyRegulatorClockArt: React.FC<{
  minutesTotal: number;
  isWound: boolean;
  isSolved: boolean;
  className?: string;
}> = ({ minutesTotal, isWound, isSolved, className = 'w-28 h-44' }) => {
  const minuteDeg = (minutesTotal % 60) * 6;
  const hourDeg = ((minutesTotal / 60) % 12) * 30;

  return (
    <svg viewBox="0 0 116 176" className={className} aria-hidden="true">
      <rect x="24" y="64" width="68" height="102" rx="4" fill="#3B485B" stroke="#241B14" strokeWidth="2.4" />
      <rect x="34" y="86" width="48" height="68" rx="2" fill="#232B38" stroke="#241B14" strokeWidth="1.8" />
      <g
        transform={isSolved ? 'rotate(-9 58 90)' : 'rotate(0 58 90)'}
        style={{ transition: 'transform 400ms ease-out' }}
      >
        <line x1="58" y1="88" x2="58" y2="138" stroke="#D9B15E" strokeWidth="2.6" />
        <circle cx="58" cy="140" r="10" fill="#DFB864" stroke="#241B14" strokeWidth="1.8" />
      </g>

      <circle cx="58" cy="48" r="40" fill="#4B5B70" stroke="#241B14" strokeWidth="2.5" />
      <circle cx="58" cy="48" r="32" fill={isSolved ? '#FFF7DF' : '#F6EEDB'} stroke="#241B14" strokeWidth="2" />

      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="58"
          y1="20"
          x2="58"
          y2={deg % 90 === 0 ? '26' : '23'}
          stroke="#241B14"
          strokeWidth={deg % 90 === 0 ? '2.4' : '1.4'}
          transform={`rotate(${deg} 58 48)`}
        />
      ))}

      <circle
        cx="46"
        cy="60"
        r="3.2"
        fill={isWound ? '#D5A850' : '#241B14'}
        stroke="#241B14"
        strokeWidth="1.2"
      />

      <line
        x1="58"
        y1="48"
        x2="58"
        y2="30"
        stroke="#241B14"
        strokeWidth="3.4"
        strokeLinecap="round"
        transform={`rotate(${hourDeg} 58 48)`}
      />
      <line
        x1="58"
        y1="48"
        x2="58"
        y2="22"
        stroke="#B55C40"
        strokeWidth="2.4"
        strokeLinecap="round"
        transform={`rotate(${minuteDeg} 58 48)`}
      />
      <circle cx="58" cy="48" r="3.4" fill="#241B14" />
    </svg>
  );
};

interface RustyOpenDrawerTrayProps {
  drawer: ShelfDrawerItem;
  isMagnifierActive: boolean;
  isToolCollected: boolean;
  toolId?: ShelfPocketItemId;
  onCollectTool?: (toolId: ShelfPocketItemId) => void;
  onCloseDrawer: () => void;
}

export const RustyOpenDrawerTray: React.FC<RustyOpenDrawerTrayProps> = ({
  drawer,
  isMagnifierActive,
  isToolCollected,
  toolId,
  onCollectTool,
  onCloseDrawer,
}) => {
  const theme = WING_VISUAL_THEMES[drawer.zone];

  return (
    <div className="relative rounded-xl border-[2.5px] border-[#241B14] bg-[#7A5437] p-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b-2 border-[#241B14]/40 text-[#FAF2DF]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#DFB968] border border-[#241B14] font-mono text-[11px] font-bold text-[#241B14] tabular-nums">
            {drawer.brassCode}
          </span>
          <span className="font-display text-sm font-semibold">{drawer.label}</span>
        </div>
        <button
          type="button"
          onClick={onCloseDrawer}
          className="px-2.5 py-1 text-[11px] font-medium rounded bg-[#3B2618] hover:bg-[#2A1B11] border border-[#C7A158]/60 text-[#F4E6C9] whitespace-nowrap shrink-0"
        >
          推回抽屉
        </button>
      </div>

      <div
        className="rounded-lg border-2 border-[#241B14] p-2"
        style={{ backgroundColor: theme.velvetLiningBg }}
      >
        <div className="rounded border border-dashed border-[#E8D5A9]/45 bg-[#EFE4CC] p-3 sm:p-3.5 flex flex-col sm:flex-row items-center gap-4 text-[#241B14]">
          <div className="w-24 h-24 rounded-lg border-2 border-[#241B14] bg-[#FAF4E6] flex items-center justify-center shrink-0">
            {toolId ? (
              isToolCollected ? (
                <span className="text-[11px] font-serif-body text-[#6E6454] text-center px-2">
                  已放入右侧工具架
                </span>
              ) : (
                <PocketItemArt id={toolId} className="w-16 h-16" />
              )
            ) : (
              <DrawerArtifactSvg drawerId={drawer.id} />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="font-display text-sm font-bold text-[#241B14]">{drawer.itemName}</p>
            <p className="font-serif-body text-xs sm:text-sm text-[#393026] leading-relaxed">
              {drawer.note}
            </p>
            {drawer.magnifierSecret && (
              <p
                className={`text-xs font-serif-body leading-relaxed ${
                  isMagnifierActive ? 'text-[#965219] font-semibold' : 'text-[#786D5B] italic'
                }`}
              >
                {isMagnifierActive
                  ? `黄铜放大镜显影：${drawer.magnifierSecret}`
                  : '提示：举起黄铜放大镜查看抽屉内衬，还能发现隐约批注。'}
              </p>
            )}
          </div>

          {toolId && !isToolCollected && onCollectTool && (
            <button
              type="button"
              onClick={() => onCollectTool(toolId)}
              className="px-4 py-2 text-xs font-semibold bg-[#B55C40] hover:bg-[#9B4B31] text-[#FAF6EE] border-2 border-[#241B14] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              收进随身工具架
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const DrawerArtifactSvg: React.FC<{ drawerId: string }> = ({ drawerId }) => {
  if (drawerId === 'drw-spr-1') {
    return (
      <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden="true">
        <path d="M22 10 H42 V54 L32 45 L22 54 Z" fill="#7FA18A" stroke="#241B14" strokeWidth="2" strokeLinejoin="round" />
        <text x="32" y="31" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FAF6EE" fontWeight="bold">
          217
        </text>
      </svg>
    );
  }
  if (drawerId === 'drw-sum-2') {
    return (
      <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden="true">
        <rect x="10" y="16" width="44" height="32" rx="3" fill="#F8F0DB" stroke="#241B14" strokeWidth="2" />
        <text x="32" y="34" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#241B14">
          15:15
        </text>
        <circle cx="32" cy="30" r="14" fill="none" stroke="#C86D51" strokeWidth="2" />
      </svg>
    );
  }
  if (drawerId === 'drw-aut-1' || drawerId === 'drw-aut-2') {
    return (
      <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden="true">
        <rect x="14" y="14" width="36" height="36" rx="4" fill="#ECE4F2" stroke="#241B14" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="32" cy="32" r="8" fill="#B58CE0" stroke="#241B14" strokeWidth="1.5" />
      </svg>
    );
  }
  if (drawerId === 'drw-win-1' || drawerId === 'drw-win-2') {
    return (
      <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden="true">
        <circle cx="32" cy="32" r="16" fill="#DCEEFB" stroke="#241B14" strokeWidth="2" />
        <path d="M32 32 V20 M32 32 L41 32" stroke="#364859" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden="true">
      <circle cx="32" cy="32" r="16" fill="#E8DCC3" stroke="#241B14" strokeWidth="2" />
      <circle cx="26" cy="28" r="4" fill="#6F9478" />
      <circle cx="38" cy="28" r="4" fill="#C86D51" />
      <circle cx="32" cy="39" r="4" fill="#DFB864" />
    </svg>
  );
};
