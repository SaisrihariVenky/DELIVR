import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useRealtime } from '../context/RealtimeContext';

// Call Driver Realistic Screen/Modal
export const CallDriverModal: React.FC = () => {
  const { activeOrder, showCallModal, setShowCallModal } = useRealtime();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    let interval: any;
    if (showCallModal) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [showCallModal]);

  if (!showCallModal) return null;

  const minutes = Math.floor(callDuration / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (callDuration % 60).toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-6 flex flex-col items-center justify-between h-[460px] shadow-2xl relative">
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl">
            <img
              src={activeOrder.driver.photoUrl}
              alt={activeOrder.driver.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-headline-md text-lg font-bold text-on-surface">
              {activeOrder.driver.name}
            </h3>
            <span className="text-xs text-outline">{activeOrder.driver.phone}</span>
            <span className="text-xs font-semibold text-emerald-600 mt-1">
              Connected • {minutes}:{seconds}
            </span>
          </div>
        </div>

        {/* Call In-Progress Controls */}
        <div className="grid grid-cols-2 gap-4 w-full px-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`py-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
              isMuted
                ? 'bg-rose-100 text-rose-800'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
            <span>{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`py-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
              isSpeaker
                ? 'bg-primary/20 text-primary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">volume_up</span>
            <span>Speaker</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={() => setShowCallModal(false)}
          className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 active:scale-95 transition-all mb-2"
          aria-label="End Call"
        >
          <span className="material-symbols-outlined text-[28px]">call_end</span>
        </button>
      </div>
    </div>
  );
};

// Help & Support Modal
export const HelpSupportModal: React.FC = () => {
  const { showHelpModal, setShowHelpModal, activeOrder } = useRealtime();

  if (!showHelpModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">support_agent</span>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">DELIVR Support 24/7</h3>
          </div>
          <button
            onClick={() => setShowHelpModal(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-1">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
            Issue regarding Order
          </span>
          <span className="text-xs font-bold text-on-surface">
            {activeOrder.id} • {activeOrder.restaurantName}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            'My order is delayed or running late',
            'I want to provide special delivery directions',
            'Items are missing or food quality issue',
            'Payment debited but order status unclear',
          ].map((topic) => (
            <div
              key={topic}
              onClick={() => alert(`Support ticket created for: "${topic}". An agent will respond in 2 mins.`)}
              className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between cursor-pointer hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-colors"
            >
              <span>{topic}</span>
              <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              alert('Connecting you with live support specialist...');
              setShowHelpModal(false);
            }}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Live Chat with Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Rate Order Modal
export const RateOrderModal: React.FC = () => {
  const { showRateModal, setShowRateModal } = useRealtime();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('Food arrived steaming hot! Excellent packaging and super polite rider.');

  if (!showRateModal) return null;

  const handleSubmit = () => {
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
    alert('Thank you for rating! You earned 50 Delivr Coins.');
    setShowRateModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-sm rounded-3xl p-6 flex flex-col gap-4 shadow-2xl relative">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-base font-bold text-on-surface">Rate Your Meal</h3>
          <button
            onClick={() => setShowRateModal(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-amber-500 hover:scale-110 transition-transform"
            >
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
            </button>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
          placeholder="Share your compliments or suggestions..."
          className="w-full p-3 rounded-xl bg-surface-container-low text-xs text-on-surface placeholder:text-outline border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md shadow-primary/20 active:scale-95 transition-all"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};
