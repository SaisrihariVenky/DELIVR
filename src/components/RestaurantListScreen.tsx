import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { RESTAURANTS_DATA } from '../data/mockData';

export const RestaurantListScreen: React.FC = () => {
  const { setScreen, setSelectedRestaurantId } = useRealtime();
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'filters', label: 'Filters (2)', icon: 'tune', isPrimary: true },
    { id: 'rating', label: 'Rating 4.0+' },
    { id: 'offers', label: 'Offers' },
    { id: 'fast', label: 'Fast Delivery' },
    { id: 'cost', label: 'Cost: Low to High' },
  ];

  const handleSelect = (id: string) => {
    setSelectedRestaurantId(id);
    setScreen('restaurant_detail');
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto gap-4">
      {/* Top Search Input with Mic */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setScreen('home')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all -ml-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-3.5 material-symbols-outlined text-outline text-[19px]">search</span>
          <input
            placeholder="Search pizza, sushi, burgers..."
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-surface-container"
          />
          <button className="absolute right-3 text-outline hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {filterTabs.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm transition-all ${
              f.isPrimary
                ? 'bg-primary text-white'
                : activeFilter === f.id
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container'
            }`}
          >
            {f.icon && <span className="material-symbols-outlined text-[15px]">{f.icon}</span>}
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Count & Location header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <h2 className="font-headline-sm text-base font-bold text-on-surface">48 restaurants around you</h2>
          <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
            <span>Near 5th Cross Road, Indiranagar</span>
          </div>
        </div>
        <button className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline">
          <span>Map View</span>
          <span className="material-symbols-outlined text-[14px]">map</span>
        </button>
      </div>

      {/* Restaurant Cards */}
      <div className="flex flex-col gap-5">
        {RESTAURANTS_DATA.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleSelect(restaurant.id)}
            className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-surface-container/60"
          >
            <div className="relative w-full h-44">
              <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
              {/* Offer Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">percent</span>
                <span>{restaurant.offerText}</span>
              </div>

              {/* Delivery time pill */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-surface/90 backdrop-blur-md text-on-surface text-xs font-bold shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">timer</span>
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>

            <div className="flex flex-col p-4 gap-1.5">
              <div className="flex items-start justify-between">
                <h3 className="font-headline-sm text-base font-bold text-on-surface">{restaurant.name}</h3>
                <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                  <span>{restaurant.rating}</span>
                  <span className="material-symbols-outlined text-[12px]">star</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span>{restaurant.cuisines.join(' • ')}</span>
                <span>•</span>
                <span>{restaurant.distance}</span>
              </div>

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-surface-container text-xs">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[15px] text-primary">two_wheeler</span>
                  <span>{restaurant.isFreeDelivery ? 'Free Delivery' : 'Standard Delivery $2.99'}</span>
                </div>
                <span className="text-outline font-medium">₹{restaurant.costForTwo} for two</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
