import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { RESTAURANTS_DATA } from '../data/mockData';

export const SearchScreen: React.FC = () => {
  const { setScreen, setSelectedRestaurantId, setSelectedDishId } = useRealtime();
  const [searchTerm, setSearchTerm] = useState('Biryani');
  const [recentSearches, setRecentSearches] = useState(['Biryani', 'Pizza', 'Burger']);

  const popularSearches = [
    { label: 'Rolls & Wraps', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { label: 'North Indian Thali', bg: 'bg-primary-fixed text-on-primary-fixed' },
    { label: 'Desserts & Cakes', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { label: 'Healthy Bowls', bg: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { label: 'South Indian Dosa', bg: 'bg-surface-container-highest text-on-surface' },
  ];

  const exploreCuisines = [
    {
      name: 'Biryani',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBmAhmycEA-yqWpgBR-yIMW_aqpICoxQFOE1kj8jYGWX06qIn6ucdmyq8Kvi2lNsxfyn05scQxyPior5nsO_-zUh-cJkurBdOA8vymIc5KMOQ8hi8BESRx_b79KDZADzdsRtQVu2Y6NOdQHoEa1rCHXiA7QbHnx2-4gFrDN2bH9Wfq-sQpx7FbCACG-sLZSWdKwKXY3Doj2txWghPX3I8g57g8Pww5sdOq2JYLNWpK4REIWvysuHiAoyw',
    },
    {
      name: 'Pizza',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBDx8TmwE-bPAoW6DXkmzfqSMj4vtULg82Hs2hQWxmOC_iV-oMqFqnJKnFAt9DdC22b2DDbm8ASKngxDiD4xlIlL1mEu7jPHD5JTsAJAihkw1hCzLxUt_8Qtt3xiqez-xpko6eND_2UGKOZ-8tocUDRCGMyfhdZdZnGkKU7ZZUdHVRc1iKJne0wVjtyPcB44Cd7U4xk9W6TRCYtvJFbKkciikGSZaZpwGn_iXlb-Mn2IlRr2V4K4aQDWA',
    },
    {
      name: 'Burgers',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQx3_Opb6uP3TKAbpcvyeuo8a7Iiq3qu9DG9kdYedr0ghNx-PIBEEG-GFgW4Ot78JqfEeIC-nbr-EB648II-C6haF65EGxImqX9Tl7dwXjb584ZSqLMqnYTdpvc-QM1uJMLTjSjaHwVqyjNFIZY18AcqEPMxvh6szp1Ii4BAPFKZ0CcvBBJJ_UbDKXdmYdZZp4tfKGfX-lAw6vQA_wTWhiQ_NNkbSOJcRB84O9rMLORPqDdwkSGks-oA',
    },
    {
      name: 'Asian',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAlWtumlEzEo7OZCMQpj21WkAxSVpjqJvkqBk0z9tQeIVde5_cRBxCTQdZdOVNHCIGPyguqhHWLCCJwrydIqGuHTm8UZrt3qhAtdO7vbUgYvUseKp0MkcxdzNGcfYQjAZXQYSbEg-B44OqmJuwGQSxBESIJNJnOvbMHZeGsrocYu4fRKZ4MaC79HdXxyLaCCYb1K019o1HQ7kx6ZLK4TImQgfG8E9FYbyFoxzVOGNUbsqim5fazFXoGOA',
    },
  ];

  const searchResults = [
    {
      id: 'behrouz-biryani',
      name: 'Behrouz Biryani',
      cuisines: 'Biryani • North Indian • Kebabs',
      priceLoc: '$$.$$ • Indiranagar',
      rating: '4.4',
      deliveryTime: '28 mins',
      offer: '60% OFF up to $120',
      mostOrdered: 'Royal Chicken Dum Biryani',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCtIs9PDRI0u2TgMRRtUkTJcyfhhVI_mPC2Icjz2I9OnLYmJzkEdIS6PsC0cO-fa4w4gIzHSP7aAWkLa51azuHNsqhbYBwHx_hpoIvUSkaMCPSjyK-Dmd6X9179jIF2RvgZIlYaseprUdukVvuWND685T-Bq2lxll3OdCOB5jBbF4qwNYstQFztdkVET3thzw3dVhampzcH6J-TC09ZdB2yUVenrsqAZ-DNVVg_dcmR1PUyxW-6a3qOSA',
      isOfferBadge: true,
    },
    {
      id: 'meghana-foods',
      name: 'Meghana Foods',
      cuisines: 'Andhra • Biryani • Seafood',
      priceLoc: '$$.$$ • Indiranagar',
      rating: '4.6',
      deliveryTime: '35 mins',
      offer: 'Free Delivery',
      mostOrdered: 'Meghana Special Chicken Biryani',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuATD3Y8Q4aIyv86IgIcaF1fLPTo3BaimgZhzORC6G7-Cngtvi8kiHy5F5Tiq0Lc-SINcSnmiQFADPNWjz7VMSBorDGu035f4lYufOmZtiIa__uO3IJ4hHBewRKhvvaR4Cn9BUi1XJRmf0ZQH4HidoNsZhrlR559-59NGJdiictrB3EsnoXI_l6mdvKo5HymL9l2YrP5fc3bjcHpMCM8Iv5odDlbOZRR6Y_0bLuPpQCTHiXX08VLTwFsmw',
      isFreeDeliveryBadge: true,
    },
  ];

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    setScreen('restaurant_detail');
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto gap-5">
      {/* Search Header & Input */}
      <div className="relative flex items-center w-full">
        <span className="absolute left-3.5 material-symbols-outlined text-outline text-[20px]">search</span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for restaurants or dishes"
          className="w-full h-12 pl-10 pr-10 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-surface-container"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 w-6 h-6 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-sm border border-surface-container shrink-0">
          <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
          <span>Filter</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold shadow-sm shrink-0">
          <span>Rating 4.0+</span>
          <span className="material-symbols-outlined text-[14px]">check</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-sm border border-surface-container shrink-0">
          <span>Delivery Time</span>
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-sm border border-surface-container shrink-0">
          <span>Price</span>
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-sm border border-surface-container shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Pure Veg</span>
        </button>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Recent Searches</h3>
            <button
              onClick={() => setRecentSearches([])}
              className="text-xs text-primary font-bold hover:underline"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <div
                key={item}
                onClick={() => setSearchTerm(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest shadow-sm text-xs text-on-surface cursor-pointer hover:bg-surface-container-low transition-colors border border-surface-container/60"
              >
                <span className="material-symbols-outlined text-[14px] text-outline">history</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cuisine Shortcuts */}
      <div className="flex flex-col gap-2">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Explore Cuisines</h3>
        <div className="grid grid-cols-4 gap-3">
          {exploreCuisines.map((c) => (
            <div
              key={c.name}
              onClick={() => setSearchTerm(c.name)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform border border-surface-container">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Search Suggestions */}
      <div className="flex flex-col gap-2">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((s) => (
            <span
              key={s.label}
              onClick={() => setSearchTerm(s.label)}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity ${s.bg}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Search Result Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-sm font-bold text-on-surface">
            Results for "{searchTerm || 'Biryani'}" & Restaurants
          </h3>
          <span className="text-xs text-on-surface-variant font-medium">124 places</span>
        </div>

        {searchResults.map((card) => (
          <div
            key={card.id}
            onClick={() => handleSelectRestaurant(card.id)}
            className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-surface-container/60"
          >
            <div className="relative w-full h-40">
              <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
              {card.isOfferBadge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[13px]">local_offer</span>
                  <span>{card.offer}</span>
                </div>
              )}
              {card.isFreeDeliveryBadge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface text-[11px] font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
                  <span>{card.offer}</span>
                </div>
              )}
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-surface/90 backdrop-blur-md text-on-surface text-xs font-semibold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[13px]">schedule</span>
                <span>{card.deliveryTime}</span>
              </div>
            </div>

            <div className="flex flex-col p-3.5 gap-1">
              <div className="flex items-start justify-between">
                <h4 className="font-headline-sm text-base font-bold text-on-surface">{card.name}</h4>
                <div className="flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded-md text-xs font-bold">
                  <span>{card.rating}</span>
                  <span className="material-symbols-outlined text-[11px]">star</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>{card.cuisines}</span>
                <span>{card.priceLoc}</span>
              </div>
              <div className="mt-1 pt-2 border-t border-surface-container flex items-center gap-1.5 text-xs text-primary font-medium">
                <span className="material-symbols-outlined text-[15px]">restaurant</span>
                <span className="truncate">Most ordered: {card.mostOrdered}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
