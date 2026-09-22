import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: '1,200+ spots near you',
      badgeIcon: 'local_fire_department',
      badgeClass: 'text-primary',
      title: 'Discover nearby restaurants',
      subtitle:
        'Explore the best local spots, hidden culinary gems, and top-rated cuisines right in your neighborhood.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4K3zjw27FlJ7M1OC5M8J1Ha3hAw2l7Dr9e9uY6w_nNEkaEJthjdyWGpzvH8K00VxGb9bAeNIT8d7DkmjV8eTPBEx_L6nzvv2nVNdy_YhxXiC-5WCcNHOnWTGSa0fv3OtmaxXJEMOyCmk9Agayr0s9DaJXTzLCf8mGNkyGx_f-YByfUX-AOA4I8yP3cwT9nulRi2Zg1gQWeGMaMncYg2As_OyrfctwlU-462QqDmeqDY4xfFwXS7Havw',
    },
    {
      badge: 'Lightning fast checkout',
      badgeIcon: 'bolt',
      badgeClass: 'text-primary-container',
      title: 'Order food easily',
      subtitle:
        'Seamless customization, instant cart updates, and your favorite comforting meals delivered with just a tap.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuASdKiO2zgcMkeOu0X37y5uTc0WIDbSmsJqVmZWOxH6usLKfGkhzE_bvq8i4KHUe1qK7kxN6njfutHvH4VyOpzJmjWX8-O3lKNgO8vlzFmKiuF8lxQW-s5vYSdJReCq7lztNuJxB1dJUcfFwLOHTakslGURaiSEMJIKGSz2TXptUvwD9KTxcbob0J4glCnMF97maugQCCsWNpocXl8AoD6-TcMZE2HnQy_Nl7NfzvBbQvqX1Bsg_AzPog',
    },
    {
      badge: 'Live GPS tracking',
      badgeIcon: 'my_location',
      badgeClass: 'text-tertiary',
      title: 'Track deliveries in real time',
      subtitle:
        'Watch your courier glide across the map live. Never wonder where your hot meal is again!',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5RfmH3IccV12tNXJt0nvbLxX5oyKKE91yNfYs1VX-hqkOxTbyvXhFVyDJ4Spe9_9lK4f47kh2F1eQ-1YJSOIrCgtDpnftC40SQZx0BI-_aDKNSVa4KWKzmX1VWhf1ksbRdCg9K1u4vyLQ2lMJQjQIuFw0f7WyuTeY93hYXTVTh-RHPo4z_3kQD-lzT3M0EUNoG1N8uYwpMmbvVZhI3VKS-ptYEYyyyiLzJ6Maac2fLf1_Y-6Cx74dg',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-md flex flex-col justify-between items-center px-5 py-8 max-w-md mx-auto select-none">
      {/* Top Bar with Skip */}
      <div className="flex justify-end w-full pt-2">
        <button
          onClick={onClose}
          className="text-on-surface-variant font-medium text-sm px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-all active:scale-95"
        >
          Skip
        </button>
      </div>

      {/* Central Content */}
      <div className="flex flex-col items-center text-center w-full my-auto relative">
        <div className="absolute -z-10 w-64 h-64 bg-primary-fixed/30 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest flex items-center justify-center relative mb-6 group">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 text-on-surface text-[11px] font-semibold">
            <span className={`material-symbols-outlined text-[16px] ${slide.badgeClass}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {slide.badgeIcon}
            </span>
            <span>{slide.badge}</span>
          </div>
        </div>

        <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2">{slide.title}</h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-xs">{slide.subtitle}</p>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col w-full gap-5 pb-4">
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-surface-container-highest'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-semibold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <span className="material-symbols-outlined text-[18px]">
            {currentSlide === slides.length - 1 ? 'check' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </div>
  );
};
