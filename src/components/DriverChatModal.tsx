import React, { useState, useRef, useEffect } from 'react';
import { useRealtime } from '../context/RealtimeContext';

export const DriverChatModal: React.FC = () => {
  const {
    activeOrder,
    showChatModal,
    setShowChatModal,
    sendChatMessage,
    setShowCallModal,
  } = useRealtime();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickChips = [
    'Where are you right now?',
    "Please don't ring the bell",
    'Leave at the door',
    'Thank you so much!',
  ];

  useEffect(() => {
    if (showChatModal) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeOrder.chatMessages, showChatModal]);

  if (!showChatModal) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;
    sendChatMessage(text.trim());
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface w-full max-w-md h-[88vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 bg-surface-container-lowest border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary shrink-0">
              <img
                src={activeOrder.driver.photoUrl}
                alt={activeOrder.driver.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                  {activeOrder.driver.name}
                </h3>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded">
                  Courier
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online • {activeOrder.driver.currentLocation.speed} km/h on 100ft Rd
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCallModal(true)}
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-emerald-700 active:scale-95 transition-all"
              aria-label="Call driver"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </button>
            <button
              onClick={() => setShowChatModal(false)}
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant active:scale-95 transition-all"
              aria-label="Close chat"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Vehicle Badge */}
        <div className="bg-surface-container-low px-4 py-2 border-b border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">electric_scooter</span>
            <span>Riding {activeOrder.driver.vehicle}</span>
          </div>
          <span className="text-[11px] font-semibold text-outline">Order {activeOrder.id}</span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {activeOrder.chatMessages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="flex justify-center my-1">
                  <span className="text-[11px] font-medium bg-surface-container-low text-outline px-3 py-1 rounded-full text-center max-w-[85%] border border-surface-container/60">
                    {msg.text}
                  </span>
                </div>
              );
            }

            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[78%] ${
                  isUser ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium shadow-sm leading-relaxed ${
                    isUser
                      ? 'bg-primary text-white rounded-br-xs'
                      : 'bg-surface-container-lowest text-on-surface border border-surface-container rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-outline mt-1 px-1">{msg.timestamp}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-surface-container bg-surface-container-lowest/50 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface whitespace-nowrap active:scale-95 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 bg-surface border-t border-surface-container flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message to Ramesh..."
            className="flex-1 h-11 px-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-outline text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-primary hover:bg-primary-container disabled:opacity-50 text-white flex items-center justify-center shadow-md shadow-primary/20 active:scale-95 transition-all"
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
