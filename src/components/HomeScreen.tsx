import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { CUISINE_CATEGORIES, RESTAURANTS_DATA } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const { setScreen, setSelectedRestaurantId } = useRealtime();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'meghana-foods': true,
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    setScreen('restaurant_detail');
  };

  const filterChips = [
    { id: 'filters', label: 'Filters', icon: 'filter_list', isPrimary: true },
    { id: 'rating', label: 'Rating: 4.0+' },
    { id: 'hygienic', label: 'Safe & Hygienic' },
    { id: 'offers', label: 'Offers' },
    { id: 'fast', label: 'Fast Delivery' },
  ];

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto">
      {/* Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container to-[#ff9838] p-5 text-white shadow-md mb-6">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col gap-1 max-w-[200px]">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 px-2.5 py-0.5 rounded-full w-fit">
              Limited Time
            </span>
            <h2 className="font-headline-md text-2xl font-black leading-tight">Flat ₹150 OFF</h2>
            <p className="text-xs text-white/95 font-medium leading-snug">
              On your first 3 orders above ₹499. Use code <span className="font-bold underline">FEAST150</span>.
            </p>
          </div>
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-white/40 flex-shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS9v2lDmAGDUICXOtTiT2p1L_vqFJ19MoCRJbx46dMCQcNIrpAy7ad_A6zhzYlRcj94nRtK1AqVRIP06jG7ane0nd2tpArWvHpDWUfHdIT2UarmvVdAvT1sxElII_d2YSTcIphncxhGyPVdhjg7OSkaif_EEdejjdfZSb8exQaAcWv9mKaVlWZMRFWPI1iPNIJQBZ3jEmrXpXk75Z21GhhU2eHuSal7RWBzs_tg7uje2rx3EldRQiIZw"
              alt="Promotional Burger"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search Input trigger */}
      <div className="relative mb-6">
        <div
          onClick={() => setScreen('search')}
          className="flex items-center bg-surface-container-low rounded-xl px-4 py-3 shadow-sm hover:bg-surface-container cursor-pointer transition-all border border-surface-container/60"
        >
          <span className="material-symbols-outlined text-outline mr-3 text-[20px]">search</span>
          <span className="w-full text-outline text-sm font-medium">Search for dishes or restaurants</span>
          <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
        </div>
      </div>

      {/* Category Carousel ("What's on your mind?") */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-headline-sm text-base font-bold text-on-surface">What's on your mind?</h3>
          <button
            onClick={() => setScreen('restaurant_list')}
            className="text-xs text-primary font-bold hover:underline"
          >
            See all
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
          {CUISINE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setScreen('search')}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container-low shadow-sm transition-transform group-hover:scale-105 border border-surface-container">
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mb-3">
        {filterChips.map((chip) => {
          const isActive = selectedFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setSelectedFilter(chip.id === selectedFilter ? 'all' : chip.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm transition-all ${
                chip.isPrimary
                  ? 'bg-primary text-white'
                  : isActive
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span>{chip.label}</span>
              {chip.icon && (
                <span className="material-symbols-outlined text-[15px]">{chip.icon}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Curated Restaurants List */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm text-base font-bold text-on-surface">All restaurants near you</h3>
          <span className="text-xs text-outline font-medium">184 places</span>
        </div>

        {RESTAURANTS_DATA.slice(0, 3).map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleOpenRestaurant(restaurant.id)}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col border border-surface-container/40"
          >
            {/* Image & Overlay */}
            <div className="relative w-full h-48">
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              {/* Discount Tag */}
              <div className="absolute top-3 left-3 bg-primary text-white text-[11px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                {restaurant.offerText}
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(e, restaurant.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm active:scale-95 transition-transform"
                aria-label="Add to favorites"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    favorites[restaurant.id] ? 'text-primary' : 'text-outline'
                  }`}
                  style={favorites[restaurant.id] ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>

              {/* Delivery Time */}
              <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                <span
                  className="material-symbols-outlined text-[14px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  schedule
                </span>
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h4 className="font-headline-sm text-base font-bold text-on-surface truncate">
                  {restaurant.name}
                </h4>
                <div className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-lg text-xs font-bold">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{restaurant.rating}</span>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant truncate">
                {restaurant.cuisines.join(', ')}
              </p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-container/60 text-xs">
                <span className="text-outline">₹{restaurant.costForTwo} for two</span>
                {restaurant.isFreeDelivery ? (
                  <span className="text-primary font-bold bg-primary-fixed/80 px-2 py-0.5 rounded text-[11px]">
                    Free Delivery
                  </span>
                ) : (
                  <span className="text-on-surface-variant font-medium">{restaurant.distance}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
