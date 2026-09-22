import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';

export const OrderTrackingScreen: React.FC = () => {
  const {
    activeOrder,
    advanceOrderStage,
    resetOrderSimulation,
    setShowChatModal,
    setShowCallModal,
    setShowHelpModal,
    setScreen,
  } = useRealtime();

  const [showOrderItems, setShowOrderItems] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const progress = activeOrder.driverProgressPercent || 50;
  const isDelivered = activeOrder.status === 'delivered';

  // Calculate live scooter position on route:
  // Route goes from (35, 140) [Restaurant] to (340, 60) [Customer Home]
  const startX = 40;
  const startY = 145;
  const endX = 330;
  const endY = 65;
  const midX = 170;
  const midY = 170;

  // Bezier curve interpolation
  const t = Math.min(1, Math.max(0, progress / 100));
  const currentX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX;
  const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY;

  return (
    <div className="flex flex-col w-full pb-32 pt-20 px-4 max-w-md mx-auto gap-4 select-none">
      {/* Live Status Header Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
              Live Tracking
            </span>
            <span className="text-xs font-semibold text-outline">{activeOrder.id}</span>
          </div>

          <h2 className="font-headline-md text-xl font-black text-on-surface mt-1">
            {isDelivered
              ? 'Order Delivered!'
              : `Arriving in ${activeOrder.remainingMinutes} mins`}
          </h2>
          <span className="text-xs text-on-surface-variant font-medium">
            {isDelivered
              ? 'Enjoy your delicious hot meal!'
              : activeOrder.driver.currentLocation.addressDescription}
          </span>
        </div>

        <button
          onClick={() => setShowHelpModal(true)}
          className="text-xs font-bold text-primary hover:underline px-3 py-1.5 rounded-xl bg-primary/10 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">support_agent</span>
          <span>Help</span>
        </button>
      </div>

      {/* Live Map Canvas Component */}
      <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-md border border-surface-container bg-[#f2ede7]">
        {/* SVG Street Grid & Animation */}
        <svg
          className="w-full h-full"
          viewBox="0 0 380 230"
          style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center' }}
        >
          <defs>
            {/* Soft grid pattern for urban blocks */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e6dfd6" strokeWidth="1" />
            </pattern>
            {/* Route glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#fc8019" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Background grid */}
          <rect width="100%" height="100%" fill="#f4efe9" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Waterway / Canal */}
          <path
            d="M -10,180 Q 120,210 240,160 T 400,190"
            fill="none"
            stroke="#d4e8ee"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Main roads */}
          <path d="M 0,90 Q 190,70 380,110" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
          <path d="M 0,90 Q 190,70 380,110" fill="none" stroke="#e0d7cd" strokeWidth="1" strokeDasharray="4 4" />

          <path d="M 120,0 Q 160,120 180,230" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
          <path d="M 270,0 Q 250,110 320,230" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />

          {/* Delivery Route line */}
          <path
            d={`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`}
            fill="none"
            stroke="#fc8019"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Completed portion of route */}
          <path
            d={`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`}
            fill="none"
            stroke="#2e7d32"
            strokeWidth="3"
            strokeDasharray="4 2"
            strokeOpacity="0.7"
          />

          {/* Street labels */}
          <text x="50" y="82" fill="#998877" fontSize="9" fontWeight="bold">
            100FT ROAD
          </text>
          <text x="210" y="105" fill="#998877" fontSize="9" fontWeight="bold">
            MG ROAD
          </text>
          <text x="280" y="55" fill="#998877" fontSize="8" fontWeight="bold">
            5TH MAIN RD
          </text>

          {/* Restaurant Marker */}
          <g transform={`translate(${startX}, ${startY})`}>
            <circle r="14" fill="#fc8019" opacity="0.25" className="animate-ping" />
            <circle r="12" fill="#984800" />
            <circle r="10" fill="#fc8019" />
            <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
              🍴
            </text>
          </g>

          {/* Customer Home Marker */}
          <g transform={`translate(${endX}, ${endY})`}>
            <circle r="14" fill="#2e7d32" opacity="0.25" className="animate-ping" />
            <circle r="12" fill="#1b5e20" />
            <circle r="10" fill="#2e7d32" />
            <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
              🏠
            </text>
          </g>

          {/* Live Courier / Scooter Marker */}
          <g
            transform={`translate(${currentX}, ${currentY})`}
            className="transition-all duration-700 ease-out"
          >
            {/* Pulse wave */}
            <circle r="18" fill="#fc8019" opacity="0.3" className="animate-ping" />
            <circle r="14" fill="#ffffff" stroke="#fc8019" strokeWidth="2.5" />
            <text x="0" y="4" textAnchor="middle" fill="#fc8019" fontSize="13">
              🛵
            </text>
          </g>
        </svg>

        {/* Map Overlays: Live speed & Zoom */}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-bold text-on-surface">
          <span className="material-symbols-outlined text-[15px] text-primary">speed</span>
          <span>{activeOrder.driver.currentLocation.speed} km/h</span>
        </div>

        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={() => setMapZoom((z) => Math.min(1.4, z + 0.15))}
            className="w-8 h-8 rounded-lg bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md hover:bg-surface font-bold text-base active:scale-95"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setMapZoom((z) => Math.max(0.85, z - 0.15))}
            className="w-8 h-8 rounded-lg bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md hover:bg-surface font-bold text-base active:scale-95"
            aria-label="Zoom out"
          >
            -
          </button>
        </div>
      </div>

      {/* Driver Partner Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0">
            <img
              src={activeOrder.driver.photoUrl}
              alt={activeOrder.driver.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                {activeOrder.driver.name}
              </h4>
              <div className="flex items-center gap-0.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{activeOrder.driver.rating}</span>
              </div>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">
              {activeOrder.driver.vehicle} • {activeOrder.driver.deliveryCount}+ deliveries
            </span>
          </div>
        </div>

        {/* Action Buttons: Call & Chat */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCallModal(true)}
            className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-all active:scale-95 shadow-sm"
            aria-label="Call Driver"
          >
            <span className="material-symbols-outlined text-[20px] text-emerald-600">call</span>
          </button>

          <button
            onClick={() => setShowChatModal(true)}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center text-white transition-all active:scale-95 shadow-md shadow-primary/25 relative"
            aria-label="Chat with Driver"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface animate-pulse" />
          </button>
        </div>
      </div>

      {/* 5-Stage Live Timeline */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Order Progress</h3>

        <div className="flex flex-col gap-3 relative pl-3">
          {/* Vertical connecting line */}
          <div className="absolute top-2 bottom-4 left-6 w-0.5 bg-surface-container-high -z-0" />

          {activeOrder.progressSteps.map((step, idx) => {
            const isFinished = step.completed;
            const isCurr = step.current;

            return (
              <div key={step.id} className="flex items-start gap-4 z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm shrink-0 ${
                    isCurr
                      ? 'bg-primary text-white ring-4 ring-primary/20 animate-pulse'
                      : isFinished
                      ? 'bg-emerald-600 text-white'
                      : 'bg-surface-container text-outline'
                  }`}
                >
                  {isFinished && !isCurr ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-bold ${
                        isCurr ? 'text-primary' : isFinished ? 'text-on-surface' : 'text-outline'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[11px] text-outline font-medium">{step.time}</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    {step.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion Order Items */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container/60">
        <button
          onClick={() => setShowOrderItems(!showOrderItems)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline text-[20px]">receipt</span>
            <span className="text-xs font-bold text-on-surface">
              Order Items ({activeOrder.items.length}) • ₹{activeOrder.totalToPay}
            </span>
          </div>
          <span className="material-symbols-outlined text-outline text-[20px]">
            {showOrderItems ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {showOrderItems && (
          <div className="p-4 pt-0 border-t border-surface-container flex flex-col gap-2.5">
            {activeOrder.items.map((i) => (
              <div key={i.id} className="flex justify-between text-xs text-on-surface">
                <span>
                  {i.quantity}x {i.name}
                </span>
                <span className="font-semibold">₹{i.price * i.quantity}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-surface-container flex justify-between text-xs font-extrabold text-on-surface">
              <span>Paid via {activeOrder.paymentMethod}</span>
              <span className="text-primary">₹{activeOrder.totalToPay}</span>
            </div>
            <div className="text-[11px] text-outline mt-1">
              Delivering to: {activeOrder.deliveryAddress}
            </div>
          </div>
        )}
      </div>

      {/* Real-time Simulator / Fast Forward Bar */}
      <div className="p-3 bg-surface-container-low rounded-2xl border border-surface-container flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            Real-Time State Simulation
          </span>
          <span className="text-[11px] text-emerald-600 font-bold">
            {Math.round(progress)}% Progress
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={advanceOrderStage}
            className="py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-xs font-bold text-on-surface border border-surface-container shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">fast_forward</span>
            <span>Advance Stage</span>
          </button>
          <button
            onClick={resetOrderSimulation}
            className="py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-xs font-bold text-on-surface border border-surface-container shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-outline">restart_alt</span>
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
