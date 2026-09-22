import React from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { screen, setScreen, activeOrder, cart } = useRealtime();

  const navItems: { label: string; icon: string; target: ScreenType }[] = [
    { label: 'Home', icon: 'home', target: 'home' },
    { label: 'Search', icon: 'search', target: 'search' },
    { label: 'Orders', icon: 'receipt_long', target: 'orders' },
    { label: 'Profile', icon: 'person', target: 'profile' },
  ];

  const hasActiveOrder = activeOrder && activeOrder.status !== 'delivered' && activeOrder.status !== 'cancelled';

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-container/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = screen === item.target || (item.target === 'home' && screen === 'restaurant_list');
          return (
            <button
              key={item.label}
              onClick={() => setScreen(item.target)}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all relative rounded-xl ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.target === 'orders' && hasActiveOrder && (
                  <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface animate-pulse" />
                )}
              </div>
              <span className="text-[11px] font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
