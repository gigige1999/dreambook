import React, { useState } from 'react';
import { SeasonId } from '../types/game';

interface KeepsakeArtProps {
  id: string;
  className?: string;
}

const EVIDENCE_ARTWORK_MAP: Record<string, { src: string; label: string }> = {
  'ev-sp-pollen': { src: '/src/assets/images/keepsakes/ev-sp-pollen.jpg', label: '记忆花粉插画' },
  'ev-sp-promise': { src: '/src/assets/images/keepsakes/ev-sp-promise.jpg', label: '旧约定信笺插画' },
  'ev-sp-pot': { src: '/src/assets/images/keepsakes/ev-sp-pot.jpg', label: '空花盆插画' },
  'ev-sp-sprout': { src: '/src/assets/images/keepsakes/ev-sp-sprout.jpg', label: '嫩芽符号徽章插画' },
  'ev-su-score': { src: '/src/assets/images/keepsakes/ev-su-score.jpg', label: '碎乐谱残页插画' },
  'ev-su-key': { src: '/src/assets/images/keepsakes/ev-su-key.jpg', label: '金色琴键插画' },
  'ev-su-watch': { src: '/src/assets/images/keepsakes/ev-su-watch.jpg', label: '回声怀表插画' },
  'ev-su-ticket': { src: '/src/assets/images/keepsakes/ev-su-ticket.jpg', label: '剧院空票插画' },
  'ev-au-letter': { src: '/src/assets/images/keepsakes/ev-au-letter.jpg', label: '消散信件插画' },
  'ev-au-wax': { src: '/src/assets/images/keepsakes/ev-au-wax.jpg', label: '封蜡纹章插画' },
  'ev-au-quill': { src: '/src/assets/images/keepsakes/ev-au-quill.jpg', label: '羽毛笔插画' },
  'ev-au-portrait': { src: '/src/assets/images/keepsakes/ev-au-portrait.jpg', label: '旧肖像碎片插画' },
  'ev-wi-gear': { src: '/src/assets/images/keepsakes/ev-wi-gear.jpg', label: '黄铜齿轮插画' },
  'ev-wi-dial': { src: '/src/assets/images/keepsakes/ev-wi-dial.jpg', label: '碎钟面插画' },
  'ev-wi-key': { src: '/src/assets/images/keepsakes/ev-wi-key.jpg', label: '冰晶钥匙插画' },
  'ev-wi-snow': { src: '/src/assets/images/keepsakes/ev-wi-snow.jpg', label: '雪晶符号插画' },
};

const GIFT_ARTWORK_MAP: Record<string, { src: string; label: string }> = {
  'gift-isolde': { src: '/src/assets/images/keepsakes/gift-isolde.jpg', label: '挚友的玻璃花插画' },
  'gift-arthur': { src: '/src/assets/images/keepsakes/gift-arthur.jpg', label: '学徒的银铃插画' },
  'gift-martha': { src: '/src/assets/images/keepsakes/gift-martha.jpg', label: '丈夫的回信插画' },
  'gift-samuel': { src: '/src/assets/images/keepsakes/gift-samuel.jpg', label: '一瞬冰晶插画' },
};

/**
 * 1. 四季灵印图标：春芽、夏蝶、秋叶、冬钟（统一古铜金羊皮纸徽记基调）
 */
export const SeasonSigilIcon: React.FC<{
  season: SeasonId;
  className?: string;
  glowing?: boolean;
}> = ({ season, className = 'w-6 h-6', glowing = false }) => {
  switch (season) {
    case 'spring':
      // 春芽灵印（暖金羊皮纸环框，保留嫩芽辨识度）
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill={glowing ? '#FAF0D4' : '#F4E9CC'}
            stroke="#A17F3E"
            strokeWidth="1.8"
          />
          <circle
            cx="24"
            cy="24"
            r="16.5"
            fill="none"
            stroke="#C7A560"
            strokeWidth="1"
            strokeDasharray="2.5 2.5"
          />
          <path
            d="M24 35 V18"
            stroke="#6C5225"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 25 Q15 22 14 15 Q22 14 24 25 Z"
            fill="#84B888"
            stroke="#325539"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M24 21 Q33 17 34 11 Q26 11 24 21 Z"
            fill="#A6D4A1"
            stroke="#325539"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="13" r="1.8" fill="#E8C973" />
        </svg>
      );

    case 'summer':
      // 夏蝶灵印
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill={glowing ? '#FDF3DC' : '#F2EFE6'}
            stroke="#B98A3A"
            strokeWidth="1.8"
          />
          <circle
            cx="24"
            cy="24"
            r="16.5"
            fill="none"
            stroke="#D9B15E"
            strokeWidth="1"
            strokeDasharray="2.5 2.5"
          />
          {/* Butterfly wings */}
          <path
            d="M24 23 C17 13, 10 17, 13 24 C10 30, 17 34, 24 27"
            fill="#E7BE6A"
            stroke="#6B4C1D"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M24 23 C31 13, 38 17, 35 24 C38 30, 31 34, 24 27"
            fill="#F4D48A"
            stroke="#6B4C1D"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <line x1="24" y1="17" x2="24" y2="33" stroke="#3F2E18" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 17 Q21 13 19 14 M24 17 Q27 13 29 14" stroke="#3F2E18" strokeWidth="1.1" fill="none" />
        </svg>
      );

    case 'autumn':
      // 秋叶灵印
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill={glowing ? '#F7EAE3' : '#F3EDE6'}
            stroke="#9B586B"
            strokeWidth="1.8"
          />
          <circle
            cx="24"
            cy="24"
            r="16.5"
            fill="none"
            stroke="#C78A78"
            strokeWidth="1"
            strokeDasharray="2.5 2.5"
          />
          <path
            d="M24 11 L27 18 L34 17 L30 23 L35 28 L27 29 L24 35 L21 29 L13 28 L18 23 L14 17 L21 18 Z"
            fill="#D47E5E"
            stroke="#663428"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M24 16 V38" stroke="#663428" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="31" cy="14" r="1.4" fill="#B89AE0" />
        </svg>
      );

    case 'winter':
    default:
      // 冬钟灵印
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill={glowing ? '#E4EFF7' : '#ECEFF2'}
            stroke="#59768E"
            strokeWidth="1.8"
          />
          <circle
            cx="24"
            cy="24"
            r="16.5"
            fill="none"
            stroke="#92B2CA"
            strokeWidth="1"
            strokeDasharray="2.5 2.5"
          />
          <circle cx="24" cy="25" r="10.5" fill="#F9FCFF" stroke="#455D71" strokeWidth="1.5" />
          <rect x="21.5" y="11.5" width="5" height="3" rx="1" fill="#7D99B0" stroke="#455D71" strokeWidth="1.1" />
          <path d="M24 25 V18.5 M24 25 L29 25" stroke="#364C5E" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="25" r="1.5" fill="#59768E" />
        </svg>
      );
  }
};

/**
 * 2. 信物魔法边框：比普通卡框更华丽，带微光符文、季节花纹与灵印角饰
 */
const SEASON_FRAME_STYLES: Record<
  SeasonId,
  {
    outerBorder: string;
    innerBorder: string;
    bg: string;
    cornerRune: string;
    glow: string;
    runeGlyph: string;
  }
> = {
  spring: {
    outerBorder: 'border-[#A88342]',
    innerBorder: 'border-[#D5B576]',
    bg: 'bg-gradient-to-b from-[#FCF5E1] to-[#EFE0BA]',
    cornerRune: 'text-[#825F28]',
    glow: 'shadow-[0_0_22px_rgba(200,159,85,0.24)]',
    runeGlyph: '✿',
  },
  summer: {
    outerBorder: 'border-[#B88839]',
    innerBorder: 'border-[#E0BC74]',
    bg: 'bg-gradient-to-b from-[#FDF6E4] to-[#F2DFB4]',
    cornerRune: 'text-[#8A5F1D]',
    glow: 'shadow-[0_0_22px_rgba(216,168,72,0.24)]',
    runeGlyph: '𝄞',
  },
  autumn: {
    outerBorder: 'border-[#8D454B]',
    innerBorder: 'border-[#C99B8E]',
    bg: 'bg-gradient-to-b from-[#FBF3E6] to-[#EEDCCB]',
    cornerRune: 'text-[#7B3036]',
    glow: 'shadow-[0_0_22px_rgba(142,60,64,0.2)]',
    runeGlyph: '❦',
  },
  winter: {
    outerBorder: 'border-[#7C6E5B]',
    innerBorder: 'border-[#C2B295]',
    bg: 'bg-gradient-to-b from-[#FAF3E6] to-[#EAE0CC]',
    cornerRune: 'text-[#5A4B3A]',
    glow: 'shadow-[0_0_22px_rgba(166,142,102,0.22)]',
    runeGlyph: '❄',
  },
};

export const MagicRelicFrame: React.FC<{
  season: SeasonId;
  className?: string;
  children: React.ReactNode;
}> = ({ season, className = '', children }) => {
  const s = SEASON_FRAME_STYLES[season];
  return (
    <div
      className={`relative rounded-lg border ${s.outerBorder} ${s.bg} ${s.glow} p-1.5 ${className}`}
    >
      <div className={`relative rounded border ${s.innerBorder} p-3`}>
        {/* Four Corner Seasonal Rune Filigree */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1 left-1.5 text-[9px] leading-none opacity-80 ${s.cornerRune}`}
        >
          {s.runeGlyph}
        </span>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1 right-1.5 text-[9px] leading-none opacity-80 ${s.cornerRune}`}
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1 left-1.5 text-[9px] leading-none opacity-80 ${s.cornerRune}`}
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1 right-1.5 text-[9px] leading-none opacity-80 ${s.cornerRune}`}
        >
          {s.runeGlyph}
        </span>

        {/* Top center tiny seasonal sigil crest */}
        <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2">
          <SeasonSigilIcon season={season} glowing className="w-5 h-5 drop-shadow-xs" />
        </div>

        {children}
      </div>
    </div>
  );
};

/**
 * 3. 结局魔法插画模板：
 *    好结局：季节灵印绽放
 *    坏结局：角色被符文 / 冰晶 / 黑雾 / 枯藤困住
 */
export const EndingMagicIllustration: React.FC<{
  season: SeasonId;
  isGoodEnding: boolean;
  className?: string;
}> = ({ season, isGoodEnding, className = 'w-44 h-44' }) => {
  if (isGoodEnding) {
    const palette: Record<SeasonId, { halo: string; ring: string; petal: string; core: string }> = {
      spring: { halo: '#DDF3DE', ring: '#5E8E65', petal: '#94C998', core: '#F7E7A9' },
      summer: { halo: '#FBF0CF', ring: '#C9963A', petal: '#E8C168', core: '#FFF8DF' },
      autumn: { halo: '#F3E3EC', ring: '#945B73', petal: '#D38262', core: '#DFC7F2' },
      winter: { halo: '#E2EFF8', ring: '#577B99', petal: '#9DC3DF', core: '#FFFFFF' },
    };
    const p = palette[season];

    return (
      <svg viewBox="0 0 180 180" className={className} aria-hidden="true">
        <defs>
          <radialGradient id={`goodHalo-${season}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.core} stopOpacity="0.95" />
            <stop offset="60%" stopColor={p.halo} stopOpacity="0.65" />
            <stop offset="100%" stopColor={p.halo} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="90" cy="90" r="82" fill={`url(#goodHalo-${season})`} />
        <circle cx="90" cy="90" r="64" fill="none" stroke={p.ring} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="90" cy="90" r="52" fill="none" stroke={p.ring} strokeWidth="1" opacity="0.55" />

        {/* Blooming radiating rune petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path
            key={deg}
            d="M90 30 Q97 46 90 56 Q83 46 90 30 Z"
            fill={p.petal}
            opacity="0.72"
            transform={`rotate(${deg} 90 90)`}
          />
        ))}

        {/* Season Sigil Center */}
        <g transform="translate(54 54) scale(1.5)">
          <circle cx="24" cy="24" r="21" fill="#FCF9F0" stroke={p.ring} strokeWidth="1.6" />
          {season === 'spring' && (
            <>
              <path d="M24 35 V18" stroke="#3C6444" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M24 25 Q14 22 14 15 Q22 14 24 25 Z" fill="#84B888" stroke="#325539" strokeWidth="1.2" />
              <path d="M24 21 Q33 17 34 11 Q26 11 24 21 Z" fill="#A6D4A1" stroke="#325539" strokeWidth="1.2" />
            </>
          )}
          {season === 'summer' && (
            <>
              <path d="M24 23 C17 13, 10 17, 13 24 C10 30, 17 34, 24 27" fill="#E7BE6A" stroke="#6B4C1D" strokeWidth="1.2" />
              <path d="M24 23 C31 13, 38 17, 35 24 C38 30, 31 34, 24 27" fill="#F4D48A" stroke="#6B4C1D" strokeWidth="1.2" />
              <line x1="24" y1="16" x2="24" y2="33" stroke="#3F2E18" strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}
          {season === 'autumn' && (
            <>
              <path d="M24 11 L27 18 L34 17 L30 23 L35 28 L27 29 L24 35 L21 29 L13 28 L18 23 L14 17 L21 18 Z" fill="#D47E5E" stroke="#663428" strokeWidth="1.2" />
              <path d="M24 16 V37" stroke="#663428" strokeWidth="1.3" strokeLinecap="round" />
            </>
          )}
          {season === 'winter' && (
            <>
              <circle cx="24" cy="25" r="10.5" fill="#F9FCFF" stroke="#455D71" strokeWidth="1.5" />
              <path d="M24 25 V18 M24 25 L29 25" stroke="#364C5E" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="24" cy="25" r="1.5" fill="#59768E" />
            </>
          )}
        </g>

        {/* Sparkling motes */}
        <circle cx="38" cy="48" r="2.5" fill={p.core} stroke={p.ring} strokeWidth="0.8" />
        <circle cx="144" cy="52" r="2.5" fill={p.core} stroke={p.ring} strokeWidth="0.8" />
        <circle cx="44" cy="134" r="2" fill={p.core} stroke={p.ring} strokeWidth="0.8" />
        <circle cx="138" cy="132" r="2.5" fill={p.core} stroke={p.ring} strokeWidth="0.8" />
      </svg>
    );
  }

  // Bad Ending Template: Character silhouette trapped by runes / thorns / shattered mirror / heavy stone / frost crystal
  return (
    <svg viewBox="0 0 180 180" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`badFog-${season}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#3B3340" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#1D1A21" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#141117" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="82" fill={`url(#badFog-${season})`} />
      {/* Broken curse rune circle */}
      <circle cx="90" cy="90" r="64" fill="none" stroke="#9B6E73" strokeWidth="1.6" strokeDasharray="10 4 2 4" opacity="0.8" />
      <circle cx="90" cy="90" r="48" fill="none" stroke="#7A657B" strokeWidth="1.2" opacity="0.6" />

      {/* Trapped Victorian guest silhouette */}
      <circle cx="90" cy="68" r="15" fill="#2A242D" stroke="#A68B8E" strokeWidth="1.5" />
      <path d="M62 128 Q64 90 90 88 Q116 90 118 128 Z" fill="#2A242D" stroke="#A68B8E" strokeWidth="1.5" />

      {/* Season-specific trap motif */}
      {season === 'spring' && (
        // Thorny withered vines & frozen runes
        <>
          <path d="M40 132 Q68 96 96 112 Q122 126 144 58" fill="none" stroke="#536853" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M44 62 Q78 88 92 78 Q118 66 138 126" fill="none" stroke="#3D4C3E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="90" cy="40" r="4" fill="#9E6252" />
        </>
      )}
      {season === 'summer' && (
        // Cracked mirror shards & dark note mist
        <>
          <polygon points="36,48 70,74 44,108" fill="#5D6B82" fillOpacity="0.45" stroke="#B7C8DE" strokeWidth="1.4" />
          <polygon points="146,54 114,84 140,122" fill="#5D6B82" fillOpacity="0.45" stroke="#B7C8DE" strokeWidth="1.4" />
          <path d="M46 134 L90 92 L132 136" stroke="#C86D51" strokeWidth="2" strokeDasharray="4 3" fill="none" />
        </>
      )}
      {season === 'autumn' && (
        // Heavy dark stones weighing down letters
        <>
          <polygon points="52,118 74,102 90,120 72,138" fill="#4E4A52" stroke="#9A919C" strokeWidth="1.6" />
          <polygon points="94,116 118,98 134,122 108,140" fill="#423E47" stroke="#9A919C" strokeWidth="1.6" />
          <path d="M60 56 Q90 42 120 56" stroke="#9A7CB2" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        </>
      )}
      {season === 'winter' && (
        // Frozen ice crystal cage & stopped hands
        <>
          <polygon points="90,28 130,68 122,134 58,134 50,68" fill="#90BBE0" fillOpacity="0.18" stroke="#A8D1F0" strokeWidth="2" />
          <line x1="90" y1="28" x2="90" y2="144" stroke="#A8D1F0" strokeWidth="1.2" opacity="0.65" />
          <line x1="46" y1="90" x2="134" y2="90" stroke="#A8D1F0" strokeWidth="1.2" opacity="0.65" />
        </>
      )}
    </svg>
  );
};

/**
 * High-precision hand-painted Victorian specimen illustrations for every collectible evidence token
 * (with vector SVG fallback if image asset fails to load)
 */
const KeepsakeSvgFallback: React.FC<KeepsakeArtProps> = ({
  id,
  className = 'w-14 h-14',
}) => {
  switch (id) {
    // --- SPRING: ISOLDE ---
    case 'ev-sp-pollen':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="31" y="14" width="18" height="7" rx="2" fill="#B5895A" stroke="#4D3520" strokeWidth="1.5" />
          <path d="M27 24 Q27 21 31 21 H49 Q53 21 53 24 L56 60 Q56 66 48 66 H32 Q24 66 24 60 Z" fill="#EDF6EB" stroke="#5B7E60" strokeWidth="1.8" />
          <circle cx="35" cy="48" r="4" fill="#B7E49C" />
          <circle cx="44" cy="52" r="3.2" fill="#F0CF6B" />
          <circle cx="40" cy="40" r="3.5" fill="#9AD98E" />
          <circle cx="37" cy="33" r="1.8" fill="#FCEB9F" />
        </svg>
      );
    case 'ev-sp-promise':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="14" y="18" width="52" height="44" rx="4" fill="#F6EBD2" stroke="#8C7352" strokeWidth="1.8" />
          <path d="M14 20 L40 42 L66 20" fill="none" stroke="#9E825E" strokeWidth="1.5" />
          <path d="M40 42 Q34 32 40 28 Q46 32 40 42 Z" fill="#77AA7B" stroke="#3E6144" strokeWidth="1.2" />
          <circle cx="40" cy="46" r="4.5" fill="#C86D51" stroke="#7A3623" strokeWidth="1.2" />
        </svg>
      );
    case 'ev-sp-pot':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <polygon points="22,34 58,34 52,64 28,64" fill="#C97E5B" stroke="#6E3D26" strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="18" y="27" width="44" height="8" rx="2" fill="#D98D69" stroke="#6E3D26" strokeWidth="1.8" />
          <ellipse cx="40" cy="27" rx="18" ry="3.5" fill="#634832" />
          <path d="M40 26 Q38 18 33 16 M40 26 Q43 17 47 16" stroke="#85B883" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'ev-sp-sprout':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="24" fill="#E6F4E7" stroke="#5A8B63" strokeWidth="1.8" strokeDasharray="3 2" />
          <path d="M40 56 V32" stroke="#3E6B47" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M40 40 Q26 36 25 25 Q37 24 40 40 Z" fill="#82BE88" stroke="#365E3D" strokeWidth="1.4" />
          <path d="M40 34 Q53 29 55 20 Q43 20 40 34 Z" fill="#A6DA9E" stroke="#365E3D" strokeWidth="1.4" />
        </svg>
      );

    // --- SUMMER: ARTHUR ---
    case 'ev-su-score':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M14 16 H38 L35 38 L40 62 H14 Z" fill="#F8F1E1" stroke="#7A6248" strokeWidth="1.6" />
          <path d="M43 18 H66 V64 H45 L40 40 Z" fill="#FCF7EA" stroke="#7A6248" strokeWidth="1.6" />
          <path d="M19 28 H32 M19 36 H31 M47 30 H60 M47 38 H60" stroke="#8A7B68" strokeWidth="1.2" />
          <circle cx="26" cy="48" r="3.5" fill="#3B485B" />
          <line x1="29.5" y1="48" x2="29.5" y2="36" stroke="#3B485B" strokeWidth="1.6" />
          <circle cx="53" cy="50" r="3.5" fill="#C9963A" />
        </svg>
      );
    case 'ev-su-key':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="24" y="14" width="32" height="52" rx="3" fill="#FFFDF5" stroke="#8D7856" strokeWidth="1.8" />
          <rect x="33" y="14" width="14" height="28" rx="1.5" fill="#2A323D" />
          <circle cx="40" cy="54" r="5" fill="#F2C864" opacity="0.6" />
          <circle cx="40" cy="54" r="2.5" fill="#E3AD3E" />
        </svg>
      );
    case 'ev-su-watch':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="36" y="12" width="8" height="6" rx="2" fill="#B48A3E" />
          <circle cx="40" cy="43" r="21" fill="#FCF9F0" stroke="#8B6B38" strokeWidth="3" />
          <path d="M40 43 L40 29 M40 43 L50 48" stroke="#323F50" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="40" cy="43" r="2.5" fill="#B55C40" />
        </svg>
      );
    case 'ev-su-ticket':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <rect x="14" y="26" width="52" height="28" rx="4" fill="#F9F1DF" stroke="#8A6C44" strokeWidth="1.8" />
          <line x1="48" y1="26" x2="48" y2="54" stroke="#8A6C44" strokeWidth="1.3" strokeDasharray="2 2" />
          <text x="20" y="43" fontSize="9" fontFamily="monospace" fill="#3B485B" fontWeight="bold">
            ROW 01
          </text>
          <circle cx="57" cy="40" r="4" fill="#E6BE64" opacity="0.7" />
        </svg>
      );

    // --- AUTUMN: MARTHA ---
    case 'ev-au-letter':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <g transform="rotate(-6 40 40)">
            <rect x="14" y="22" width="52" height="36" rx="3" fill="#FAF5EE" stroke="#8B7380" strokeWidth="1.7" />
            <path d="M14 23 L40 43 L66 23" fill="none" stroke="#8B7380" strokeWidth="1.5" />
            <path d="M22 49 H44" stroke="#B68EDB" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'ev-au-wax':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="42" r="21" fill="#A9493D" stroke="#63261E" strokeWidth="2" />
          <circle cx="40" cy="42" r="14" fill="#C45D4E" stroke="#7A3227" strokeWidth="1.3" />
          <path d="M40 32 V52 M35 37 L40 32 L45 37" stroke="#F6E5D0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'ev-au-quill':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <path d="M20 60 Q32 34 58 14 Q54 40 24 58 Z" fill="#EDE4F5" stroke="#6E587E" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M16 64 L54 18" stroke="#6E587E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="63" r="3" fill="#B58CE0" opacity="0.75" />
        </svg>
      );
    case 'ev-au-portrait':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <polygon points="16,22 44,16 38,52 14,48" fill="#F6EFE0" stroke="#7E6B58" strokeWidth="1.6" />
          <polygon points="40,28 66,24 62,62 36,56" fill="#EFE4CE" stroke="#7E6B58" strokeWidth="1.6" />
          <circle cx="38" cy="36" r="7" fill="#B38A76" opacity="0.65" />
          <path d="M26 50 Q38 42 52 52" stroke="#7E6B58" strokeWidth="1.6" fill="none" />
        </svg>
      );

    // --- WINTER: SAMUEL ---
    case 'ev-wi-gear':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="20" fill="#E3B962" stroke="#7C5A25" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="36.5"
              y="12"
              width="7"
              height="9"
              rx="1.5"
              fill="#D4A64A"
              stroke="#7C5A25"
              strokeWidth="1.4"
              transform={`rotate(${deg} 40 40)`}
            />
          ))}
          <circle cx="40" cy="40" r="9" fill="#FBF6EA" stroke="#7C5A25" strokeWidth="1.8" />
        </svg>
      );
    case 'ev-wi-dial':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="23" fill="#F5F8FC" stroke="#536A7E" strokeWidth="2" />
          <path d="M26 24 L42 40 L24 52" fill="none" stroke="#6B8399" strokeWidth="1.8" />
          <path d="M40 40 L40 24 M40 40 L52 40" stroke="#364859" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'ev-wi-key':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <g transform="rotate(-30 40 40)">
            <polygon points="22,32 30,24 38,32 30,40" fill="#CDE5F7" stroke="#4D7190" strokeWidth="1.8" />
            <rect x="37" y="30" width="24" height="4" fill="#BDE0FA" stroke="#4D7190" strokeWidth="1.6" />
            <path d="M52 34 V41 H56 V37 H60 V41" stroke="#4D7190" strokeWidth="1.6" fill="none" />
          </g>
        </svg>
      );
    case 'ev-wi-snow':
    default:
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="24" fill="#EAF3FA" stroke="#6286A5" strokeWidth="1.8" />
          {[0, 60, 120].map((deg) => (
            <line
              key={deg}
              x1="40"
              y1="20"
              x2="40"
              y2="60"
              stroke="#466B8A"
              strokeWidth="2.2"
              strokeLinecap="round"
              transform={`rotate(${deg} 40 40)`}
            />
          ))}
          <circle cx="40" cy="40" r="4" fill="#FFFFFF" stroke="#466B8A" strokeWidth="1.5" />
        </svg>
      );
  }
};

export const KeepsakeIllustration: React.FC<KeepsakeArtProps> = ({
  id,
  className = 'w-14 h-14',
}) => {
  const [imgError, setImgError] = useState(false);
  const art = EVIDENCE_ARTWORK_MAP[id];

  if (art && !imgError) {
    return (
      <div
        className={`relative rounded-[3px] overflow-hidden border border-[#B08A48]/70 bg-[#F7ECD4] shadow-[inset_0_0_8px_rgba(92,62,24,0.16)] ${className}`}
      >
        <img
          src={art.src}
          alt={art.label}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-[2px]"
        />
      </div>
    );
  }

  return <KeepsakeSvgFallback id={id} className={className} />;
};

interface KnotEmblemProps {
  caseId: string;
  healed: boolean;
  className?: string;
}

export const KnotStateEmblem: React.FC<KnotEmblemProps> = ({
  caseId,
  healed,
  className = 'w-16 h-16',
}) => {
  const season: SeasonId =
    caseId === 'case-isolde'
      ? 'spring'
      : caseId === 'case-arthur'
        ? 'summer'
        : caseId === 'case-martha'
          ? 'autumn'
          : 'winter';

  return <SeasonSigilIcon season={season} glowing={healed} className={className} />;
};

interface BookSpineBadgeProps {
  spineColor: string;
  accentColor: string;
  caseId: string;
}

export const MiniBookBadge: React.FC<BookSpineBadgeProps> = ({
  spineColor,
  accentColor,
  caseId,
}) => {
  const symbol =
    caseId === 'case-isolde'
      ? '✿'
      : caseId === 'case-arthur'
        ? '♫'
        : caseId === 'case-martha'
          ? '✒'
          : '❄';

  return (
    <div
      className="relative w-10 h-14 rounded-r-md rounded-l-sm shadow-md border border-black/20 flex flex-col items-center justify-between py-1.5 shrink-0"
      style={{ backgroundColor: spineColor }}
      aria-hidden="true"
    >
      <span className="w-6 h-0.5 rounded-full opacity-75" style={{ backgroundColor: accentColor }} />
      <span className="text-[11px] font-bold" style={{ color: accentColor }}>
        {symbol}
      </span>
      <span className="w-6 h-0.5 rounded-full opacity-75" style={{ backgroundColor: accentColor }} />
    </div>
  );
};

interface GiftIllustrationProps {
  giftId: string;
  className?: string;
}

/**
 * 4 Seasonal Hidden Keepsake Artwork:
 * - gift-isolde: 挚友的玻璃花
 * - gift-arthur: 学徒的银铃
 * - gift-martha: 丈夫的回信
 * - gift-samuel: 一瞬冰晶
 */
const GiftKeepsakeSvgFallback: React.FC<GiftIllustrationProps> = ({
  giftId,
  className = 'w-20 h-20',
}) => {
  if (giftId === 'gift-isolde') {
    // 挚友的玻璃花
    return (
      <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
        <ellipse cx="48" cy="78" rx="22" ry="5" fill="#9E7B4F" stroke="#5A401E" strokeWidth="1.5" />
        <path
          d="M28 76 V42 Q28 16 48 16 Q68 16 68 42 V76 Z"
          fill="#E5F4E7"
          fillOpacity="0.65"
          stroke="#5C8664"
          strokeWidth="1.8"
        />
        <path d="M48 70 Q46 54 48 42" stroke="#4D7E55" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M48 56 Q38 52 37 59 Q44 62 48 56 Z" fill="#89BD8B" />
        <path d="M48 52 Q58 47 59 54 Q52 57 48 52 Z" fill="#77AD7A" />
        {/* Translucent glass white blossom */}
        <circle cx="48" cy="37" r="9" fill="#FFFFFF" fillOpacity="0.88" stroke="#9AC29F" strokeWidth="1.4" />
        <circle cx="48" cy="37" r="3.2" fill="#F0CE68" />
        <path d="M34 34 Q36 23 44 20" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }

  if (giftId === 'gift-arthur') {
    // 学徒的银铃
    return (
      <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
        <g transform="rotate(-10 48 48)">
          <rect x="44" y="54" width="8" height="24" rx="3" fill="#5D422C" stroke="#2D1E12" strokeWidth="1.5" />
          <path
            d="M32 52 Q34 26 48 24 Q62 26 64 52 L69 58 H27 Z"
            fill="#E3E9EE"
            stroke="#596875"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="60" r="4" fill="#D5A64A" stroke="#596875" strokeWidth="1.3" />
          <path d="M41 36 Q48 31 55 36" stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="67" cy="24" r="2.2" fill="#F4CF6E" />
          <circle cx="29" cy="28" r="1.8" fill="#F4CF6E" />
        </g>
      </svg>
    );
  }

  if (giftId === 'gift-martha') {
    // 丈夫的回信
    return (
      <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
        <g transform="rotate(-5 48 48)">
          <rect x="18" y="24" width="60" height="46" rx="4" fill="#FAF5EA" stroke="#8C7680" strokeWidth="1.8" />
          <path d="M18 26 L48 48 L78 26" fill="none" stroke="#8C7680" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="7" fill="#B55C40" stroke="#6E2F1C" strokeWidth="1.4" />
          <path d="M28 58 H68" stroke="#AC84CF" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
          <circle cx="70" cy="35" r="2" fill="#C9A8EA" />
        </g>
      </svg>
    );
  }

  // gift-samuel: 一瞬冰晶
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <polygon
        points="48,14 68,36 60,74 36,74 28,36"
        fill="#DCEEFB"
        fillOpacity="0.85"
        stroke="#527899"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon points="48,14 58,38 48,74 38,38" fill="#F3FAFF" fillOpacity="0.65" />
      <circle cx="48" cy="44" r="9" fill="#FFFDF6" stroke="#88AAC6" strokeWidth="1.4" />
      <path d="M48 44 V38 M48 44 L53 44" stroke="#42627E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

export const GiftKeepsakeIllustration: React.FC<GiftIllustrationProps> = ({
  giftId,
  className = 'w-20 h-20',
}) => {
  const [imgError, setImgError] = useState(false);
  const art = GIFT_ARTWORK_MAP[giftId];

  if (art && !imgError) {
    return (
      <div
        className={`relative rounded-[4px] overflow-hidden border border-[#B08A48]/75 bg-[#F7ECD4] shadow-[inset_0_0_10px_rgba(92,62,24,0.18)] ${className}`}
      >
        <img
          src={art.src}
          alt={art.label}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-[2px]"
        />
      </div>
    );
  }

  return <GiftKeepsakeSvgFallback giftId={giftId} className={className} />;
};

/* Tactile Tabletop Desk Prop Illustrations */

export const DeskLampArt: React.FC<{ isOn: boolean; className?: string }> = ({
  isOn,
  className = 'w-11 h-11',
}) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    {isOn && <polygon points="16,28 48,28 58,58 6,58" fill="#FFE69A" opacity="0.28" />}
    <ellipse cx="32" cy="54" rx="14" ry="4" fill="#9A722F" stroke="#5E4215" strokeWidth="1.4" />
    <path d="M32 52 V28" stroke="#C59845" strokeWidth="3.2" strokeLinecap="round" />
    <path
      d="M15 28 Q17 16 32 16 Q47 16 49 28 Z"
      fill={isOn ? '#9E3D28' : '#6A271B'}
      stroke="#3D150D"
      strokeWidth="1.5"
    />
    <path d="M21 21 Q32 19 42 21" stroke="#F4CF84" strokeWidth="1.3" fill="none" opacity="0.72" />
    <circle cx="32" cy="14" r="2.2" fill="#DFB55C" />
  </svg>
);

export const DeskTeacupArt: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <ellipse cx="31" cy="48" rx="20" ry="6.5" fill="#F8F2E4" stroke="#B7A78B" strokeWidth="1.5" />
    <path d="M17 28 H45 L42 45 Q31 50 20 45 Z" fill="#FCF9F0" stroke="#9E8E72" strokeWidth="1.5" />
    <path d="M44 31 Q52 31 52 37 Q52 42 43 42" fill="none" stroke="#9E8E72" strokeWidth="2.2" />
    <ellipse cx="31" cy="28" rx="14" ry="4" fill="#D49B54" stroke="#B07A38" strokeWidth="1" />
    <circle cx="32" cy="28" r="2.5" fill="#FFFDF8" />
    <circle cx="32" cy="28" r="1.1" fill="#E8B948" />
  </svg>
);

export const DeskMagnifierArt: React.FC<{ active: boolean; className?: string }> = ({
  active,
  className = 'w-10 h-10',
}) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <g transform="rotate(-28 32 32)">
      <rect x="29" y="38" width="6" height="19" rx="3" fill="#6F472B" stroke="#422815" strokeWidth="1.4" />
      <rect x="29.5" y="35" width="5" height="4" fill="#D4A64A" />
      <circle
        cx="32"
        cy="22"
        r="14"
        fill={active ? '#FFF9E2' : '#EBF2EE'}
        fillOpacity="0.65"
        stroke={active ? '#E2AF4A' : '#B48A3E'}
        strokeWidth="3.5"
      />
      <path d="M23 16 Q27 12 33 13" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
    </g>
  </svg>
);

export const DeskJournalArt: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect x="15" y="13" width="36" height="40" rx="3" fill="#EFE6D2" stroke="#B6A587" strokeWidth="1.2" />
    <rect x="12" y="10" width="36" height="40" rx="3" fill="#9E513A" stroke="#662F1F" strokeWidth="1.5" />
    <rect x="16" y="10" width="3" height="40" fill="#7E3D2A" />
    <rect x="22" y="17" width="20" height="24" rx="2" fill="none" stroke="#E5C175" strokeWidth="1.2" opacity="0.85" />
    <circle cx="32" cy="29" r="4" fill="#E5C175" opacity="0.9" />
    <path d="M27 50 V58 L30 55 L33 58 V50 Z" fill="#8E2D20" />
  </svg>
);

export const ShelfCurioIllustration: React.FC<{
  kind:
    | 'terrarium'
    | 'pressed-frame'
    | 'metronome'
    | 'astrolabe'
    | 'tea-caddy'
    | 'letter-bundle'
    | 'ice-lantern'
    | 'pocket-stand';
  className?: string;
}> = ({ kind, className = 'w-14 h-16' }) => {
  switch (kind) {
    case 'terrarium':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <rect x="14" y="58" width="36" height="7" rx="2" fill="#8C6B3B" stroke="#3D2B18" strokeWidth="1.6" />
          <path d="M17 58 V30 Q17 12 32 12 Q47 12 47 30 V58 Z" fill="#DCEBE2" fillOpacity="0.6" stroke="#425849" strokeWidth="1.6" />
          <circle cx="32" cy="10" r="3" fill="#C9A255" stroke="#3D2B18" strokeWidth="1.2" />
          <path d="M19 57 Q32 51 45 57 Z" fill="#66896B" />
          <path d="M32 54 Q30 38 24 27 M32 54 Q34 35 40 25 M32 54 V22" stroke="#3E6146" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="27" r="2.2" fill="#88AE83" />
          <circle cx="40" cy="25" r="2.2" fill="#88AE83" />
        </svg>
      );

    case 'pressed-frame':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <rect x="12" y="10" width="40" height="54" rx="2" fill="#6C4B32" stroke="#2D1D11" strokeWidth="1.8" />
          <rect x="17" y="15" width="30" height="44" fill="#F8F2E2" stroke="#9B876A" strokeWidth="1.2" />
          <path d="M32 53 V25" stroke="#5B7055" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M32 34 L24 28 M32 39 L40 33 M32 45 L25 40" stroke="#6B8564" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 25 Q26 19 32 17 Q38 19 32 25" fill="#9ED197" stroke="#3D6143" strokeWidth="1" />
        </svg>
      );

    case 'metronome':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <polygon points="18,62 46,62 39,14 25,14" fill="#465466" stroke="#232B36" strokeWidth="1.8" strokeLinejoin="round" />
          <polygon points="24,56 40,56 36,20 28,20" fill="#ECE1CA" stroke="#5E452F" strokeWidth="1.2" />
          <line x1="32" y1="53" x2="39" y2="23" stroke="#D5A64A" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="35" y="29" width="7" height="5" rx="1" fill="#E8C268" stroke="#5A4018" strokeWidth="1.1" transform="rotate(14 38 31)" />
          <rect x="14" y="60" width="36" height="5" rx="1.5" fill="#2E3744" stroke="#181D24" strokeWidth="1.5" />
        </svg>
      );

    case 'astrolabe':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <path d="M22 63 H42 L36 53 H28 Z" fill="#8C6635" stroke="#3A2812" strokeWidth="1.6" />
          <circle cx="32" cy="33" r="19" fill="none" stroke="#C99E48" strokeWidth="3.2" />
          <circle cx="32" cy="33" r="14" fill="#2A3542" fillOpacity="0.85" stroke="#D5B267" strokeWidth="1.2" />
          <ellipse cx="32" cy="33" rx="14" ry="5" fill="none" stroke="#E8C97E" strokeWidth="1.1" transform="rotate(-24 32 33)" />
          <circle cx="32" cy="33" r="2.6" fill="#F2D78F" />
        </svg>
      );

    case 'tea-caddy':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <rect x="16" y="22" width="32" height="40" rx="3" fill="#7D6878" stroke="#3B2D38" strokeWidth="1.8" />
          <rect x="18" y="16" width="28" height="7" rx="2" fill="#C9A255" stroke="#5E4518" strokeWidth="1.4" />
          <circle cx="32" cy="14" r="3" fill="#B5893D" stroke="#5E4518" strokeWidth="1.2" />
          <rect x="21" y="32" width="22" height="18" rx="2" fill="#FAF4E6" stroke="#8C7A5B" strokeWidth="1.2" />
          <circle cx="32" cy="41" r="4" fill="#AC85D4" />
        </svg>
      );

    case 'ice-lantern':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <rect x="16" y="58" width="32" height="6" rx="2" fill="#4C5F70" stroke="#242C33" strokeWidth="1.5" />
          <rect x="18" y="22" width="28" height="36" rx="3" fill="#DDEFF9" fillOpacity="0.7" stroke="#3F5669" strokeWidth="1.8" />
          <path d="M22 18 H42 L36 12 H28 Z" fill="#5D7487" stroke="#242C33" strokeWidth="1.5" />
          <circle cx="28" cy="34" r="2.2" fill="#FFFFFF" />
          <circle cx="37" cy="42" r="2" fill="#FFFFFF" />
          <circle cx="31" cy="49" r="1.6" fill="#FFFFFF" />
        </svg>
      );

    case 'pocket-stand':
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <path d="M18 62 H46 M32 62 V20 Q46 14 48 24" fill="none" stroke="#5E6E7D" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="36" cy="39" r="14" fill="#EFF6FC" stroke="#4D667D" strokeWidth="2.2" />
          <path d="M36 39 V30 M36 39 L43 39" stroke="#2E4052" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="39" r="17" fill="none" stroke="#B7DCF7" strokeWidth="1.2" strokeDasharray="3 2" />
        </svg>
      );

    case 'letter-bundle':
    default:
      return (
        <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
          <rect x="10" y="38" width="44" height="22" rx="2" fill="#E9DEC8" stroke="#6E5A42" strokeWidth="1.6" />
          <rect x="12" y="28" width="42" height="20" rx="2" fill="#F6EFE0" stroke="#6E5A42" strokeWidth="1.6" transform="rotate(-5 33 38)" />
          <path d="M13 29 L33 41 L53 27" fill="none" stroke="#8F785B" strokeWidth="1.3" />
          <path d="M31 24 V61" stroke="#B55C40" strokeWidth="3.2" />
          <circle cx="31" cy="39" r="5" fill="#B55C40" stroke="#6E2F1C" strokeWidth="1.2" />
        </svg>
      );
  }
};

export const OwlBookendArt: React.FC<{ className?: string }> = ({ className = 'w-12 h-24' }) => (
  <svg viewBox="0 0 48 92" className={className} aria-hidden="true">
    <rect x="4" y="80" width="40" height="8" rx="2" fill="#7D5636" stroke="#362314" strokeWidth="1.5" />
    <path
      d="M12 80 V40 Q12 24 24 20 Q36 24 36 40 V80 Z"
      fill="#8D6342"
      stroke="#362314"
      strokeWidth="1.8"
    />
    <path d="M14 26 L20 33 L24 29 L28 33 L34 26" fill="none" stroke="#E5C890" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="19" cy="37" r="4" fill="#FAF2DE" stroke="#362314" strokeWidth="1.2" />
    <circle cx="29" cy="37" r="4" fill="#FAF2DE" stroke="#362314" strokeWidth="1.2" />
    <circle cx="19" cy="37" r="1.6" fill="#281D13" />
    <circle cx="29" cy="37" r="1.6" fill="#281D13" />
    <polygon points="22,41 26,41 24,45" fill="#D59B42" stroke="#362314" strokeWidth="1" />
    <path d="M15 54 Q24 62 33 54 M16 64 Q24 70 32 64" fill="none" stroke="#533722" strokeWidth="1.4" />
  </svg>
);
