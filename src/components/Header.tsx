import React from 'react';
import { useRealtime } from '../context/RealtimeContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  const { setScreen, isConnected } = useRealtime();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container/50">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        {showBack ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onBack || (() => setScreen('home'))}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
            <span className="font-headline-sm text-on-surface text-[18px] font-semibold">{title}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-bold text-primary">Deliver to</span>
                {isConnected && (
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Live
                  </span>
                )}
              </div>
              <span className="text-[13px] text-on-surface font-semibold truncate max-w-[190px]">
                Indiranagar, Bengaluru
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScreen('profile')}
            className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all active:scale-95 relative"
            aria-label="Profile"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container border-2 border-surface"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
