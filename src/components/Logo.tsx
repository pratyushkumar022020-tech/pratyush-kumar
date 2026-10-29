import React from 'react';
import { useCms } from '../context/CmsContext';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'dark',
  showSubtitle = true 
}) => {
  const isDarkBg = variant === 'light';
  const { config } = useCms();
  const logo = config.logo;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Logo Emblem */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 shrink-0 flex items-center justify-center transition-transform hover:scale-105">
        <img 
          src={logo.imageUrl || '/logo.svg'} 
          alt={`${logo.titleText} - ${logo.subtitleText}`}
          className="w-full h-full object-contain drop-shadow-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/logo.svg';
          }}
        />
      </div>

      {/* Typography Branding Lockup */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-base sm:text-lg md:text-xl leading-tight ${isDarkBg ? 'text-white' : 'text-slate-900'}`}>
            {logo.titleText || 'THE FUTURE TRACK'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span 
            className="text-[11px] md:text-xs font-extrabold tracking-wider uppercase leading-none"
            style={{ color: isDarkBg ? '#FDA4AF' : (config.theme.secondaryColor || '#D12A38') }}
          >
            {logo.subtitleText || 'COMPUTER EDUCATION'}
          </span>
          {showSubtitle && logo.hindiSlogan && (
            <>
              <span className={isDarkBg ? 'text-slate-400' : 'text-slate-300'}>·</span>
              <span className={`text-[10px] md:text-[11px] font-semibold leading-none ${isDarkBg ? 'text-slate-300' : 'text-slate-600'}`}>
                {logo.hindiSlogan}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
