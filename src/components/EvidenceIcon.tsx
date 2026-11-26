import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Cog,
  Feather,
  Flower2,
  KeyRound,
  Mail,
  Music,
  ScrollText,
  Snowflake,
  Sparkles,
  Stamp,
  Ticket,
  UserSquare,
} from 'lucide-react';
import { EvidenceSymbol } from '../types/game';

interface EvidenceIconProps {
  symbol: EvidenceSymbol;
  className?: string;
}

export const EvidenceIcon: React.FC<EvidenceIconProps> = ({ symbol, className = 'w-5 h-5' }) => {
  switch (symbol) {
    case 'pollen':
      return <Sparkles className={className} />;
    case 'promise':
      return <ScrollText className={className} />;
    case 'pot':
      return <Flower2 className={className} />;
    case 'sprout':
      return <Flower2 className={className} />;
    case 'score':
      return <Music className={className} />;
    case 'piano-key':
      return <Music className={className} />;
    case 'watch':
      return <Clock className={className} />;
    case 'ticket':
      return <Ticket className={className} />;
    case 'letter':
      return <Mail className={className} />;
    case 'wax':
      return <Stamp className={className} />;
    case 'quill':
      return <Feather className={className} />;
    case 'portrait':
      return <UserSquare className={className} />;
    case 'gear':
      return <Cog className={className} />;
    case 'dial':
      return <Clock className={className} />;
    case 'ice-key':
      return <KeyRound className={className} />;
    case 'snowflake':
      return <Snowflake className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = '梦境图书馆',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4EAD2] via-[#EADBB9] to-[#D9C398] text-[#4D3723] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-8 h-8 mb-2 opacity-60" />
        <span className="font-display text-sm font-medium">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
