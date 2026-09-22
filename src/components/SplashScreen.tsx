import React, { useEffect, useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useRealtime();
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setScreen('home'), 400);
          return 100;
        }
        return prev + 25;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [setScreen]);

  return (
    <div className="fixed inset-0 z-50 bg-surface flex flex-col justify-between items-center px-6 py-12 select-none">
      {/* Decorative blurred background orbs */}
      <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-52 h-52 rounded-full bg-tertiary-fixed/40 blur-3xl pointer-events-none" />

      <div className="w-full flex justify-end">
        <button
          onClick={() => setScreen('home')}
          className="text-on-surface-variant text-[13px] font-semibold bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-full transition-all"
        >
          Skip
        </button>
      </div>

      {/* Central Logo & Brand */}
      <div className="flex flex-col items-center justify-center z-10 space-y-4 my-auto">
        <div className="w-24 h-24 rounded-2xl bg-primary-container flex items-center justify-center shadow-xl shadow-primary-container/25 transform hover:scale-105 transition-transform duration-300">
          <span className="material-symbols-outlined text-white text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_shipping
          </span>
        </div>
        <div className="text-center space-y-1">
          <h1 className="font-headline-lg text-3xl font-extrabold text-on-surface tracking-tight">DELIVR</h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-[240px]">
            Freshness delivered with a moment of delight.
          </p>
        </div>
      </div>

      {/* Loading Progress */}
      <div className="flex flex-col items-center space-y-3 z-10 w-full max-w-xs pb-6">
        <div className="w-48 h-1.5 bg-surface-container-highest rounded-full overflow-hidden relative">
          <div
            className="h-full bg-primary-container rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[11px] font-semibold text-on-surface-variant tracking-wider uppercase">
          Preparing your experience...
        </span>
      </div>
    </div>
  );
};
