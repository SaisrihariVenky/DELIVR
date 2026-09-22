import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';

export const EditProfileScreen: React.FC = () => {
  const { user, setUser, setScreen, setLiveNotification } = useRealtime();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
    }));
    setLiveNotification('Profile updated successfully!');
    setScreen('profile');
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-20 px-4 max-w-md mx-auto gap-5 select-none">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setScreen('profile')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all -ml-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <h2 className="font-headline-sm text-lg font-bold text-on-surface">Edit Profile</h2>
      </div>

      {/* Avatar Change */}
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-md">
          <img src={user.avatarUrl} alt={name} className="w-full h-full object-cover" />
          <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-[24px]">photo_camera</span>
          </button>
        </div>
        <span className="text-xs font-semibold text-primary">Change Profile Photo</span>
      </div>

      {/* Input Fields */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-on-surface">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-on-surface">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-on-surface">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
          />
        </div>
      </div>

      {/* Saved Addresses list */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-on-surface">Saved Addresses</label>
          <button className="text-xs font-bold text-primary hover:underline">+ Add New</button>
        </div>

        {user.addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3"
          >
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
              {addr.tag === 'Home' ? 'home' : 'work'}
            </span>
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface">{addr.tag}</span>
                {addr.isDefault && (
                  <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded">
                    Default
                  </span>
                )}
              </div>
              <span className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{addr.fullAddress}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
      >
        Save Changes
      </button>
    </div>
  );
};
