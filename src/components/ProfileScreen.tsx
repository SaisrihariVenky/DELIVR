import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';

export const ProfileScreen: React.FC = () => {
  const { user, setScreen, setShowHelpModal } = useRealtime();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex flex-col w-full pb-32 pt-20 px-4 max-w-md mx-auto gap-5 select-none">
      {/* User Header Profile Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/60 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-primary/10 border-2 border-primary/20 shrink-0">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-base font-bold text-on-surface">{user.name}</h2>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
                {user.tier}
              </span>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">{user.email}</span>
            <span className="text-[11px] text-outline font-medium">{user.phone}</span>
          </div>
        </div>

        <button
          onClick={() => setScreen('edit_profile')}
          className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-all"
          aria-label="Edit Profile"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </button>
      </div>

      {/* Delight Bento Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-surface-container/60 flex flex-col items-center text-center">
          <span className="text-base font-extrabold text-primary">₹2,450</span>
          <span className="text-[11px] text-outline font-medium mt-0.5">Total Saved</span>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-surface-container/60 flex flex-col items-center text-center">
          <span className="text-base font-extrabold text-on-surface">14</span>
          <span className="text-[11px] text-outline font-medium mt-0.5">Favorites</span>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-surface-container/60 flex flex-col items-center text-center">
          <span className="text-base font-extrabold text-emerald-600">6</span>
          <span className="text-[11px] text-outline font-medium mt-0.5">Coupons</span>
        </div>
      </div>

      {/* Your Activity Section */}
      <div className="flex flex-col gap-2">
        <h3 className="font-headline-sm text-xs font-bold text-outline uppercase tracking-wider px-1">
          Your Activity
        </h3>
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container/60 overflow-hidden divide-y divide-surface-container">
          <div
            onClick={() => setScreen('orders')}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
              <span className="text-xs font-bold text-on-surface">My Orders & History</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
          </div>

          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">pin_drop</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Saved Addresses</span>
                <span className="text-[10px] text-outline">Home, Office (2 places)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
          </div>

          <div
            onClick={() => setScreen('restaurant_list')}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">favorite</span>
              <span className="text-xs font-bold text-on-surface">Favorite Restaurants</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
          </div>
        </div>
      </div>

      {/* Wallet & Perks Section */}
      <div className="flex flex-col gap-2">
        <h3 className="font-headline-sm text-xs font-bold text-outline uppercase tracking-wider px-1">
          Wallet & Perks
        </h3>
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container/60 overflow-hidden divide-y divide-surface-container">
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Payment Methods & UPI</span>
                <span className="text-[10px] text-outline">Google Pay, HDFC Card</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
          </div>

          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">local_offer</span>
              <span className="text-xs font-bold text-on-surface">Offers & Promos</span>
            </div>
            <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full">
              3 New
            </span>
          </div>
        </div>
      </div>

      {/* Preferences & Support */}
      <div className="flex flex-col gap-2">
        <h3 className="font-headline-sm text-xs font-bold text-outline uppercase tracking-wider px-1">
          Preferences & Support
        </h3>
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container/60 overflow-hidden divide-y divide-surface-container">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline text-[20px]">notifications</span>
              <span className="text-xs font-bold text-on-surface">Live Order Notifications</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="accent-primary w-4 h-4 cursor-pointer"
            />
          </div>

          <div
            onClick={() => setShowHelpModal(true)}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline text-[20px]">help_center</span>
              <span className="text-xs font-bold text-on-surface">Help & Support 24/7</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => alert('Logged out securely.')}
        className="w-full py-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container text-rose-600 font-bold text-xs flex items-center justify-center gap-2 border border-surface-container transition-all active:scale-[0.99]"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        <span>Log Out</span>
      </button>
    </div>
  );
};
