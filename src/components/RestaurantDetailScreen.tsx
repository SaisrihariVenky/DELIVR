import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { RESTAURANTS_DATA } from '../data/mockData';
import { MenuItem } from '../types';

export const RestaurantDetailScreen: React.FC = () => {
  const {
    selectedRestaurantId,
    setScreen,
    setSelectedDishId,
    cart,
    addToCart,
    updateCartQty,
    cartTotal,
  } = useRealtime();

  const [activeCategory, setActiveCategory] = useState('Recommended');
  const [isFavorite, setIsFavorite] = useState(true);

  const restaurant =
    RESTAURANTS_DATA.find((r) => r.id === selectedRestaurantId) || RESTAURANTS_DATA[0];

  const categories = [
    { name: 'Recommended', count: 8 },
    { name: 'Starters', count: 6 },
    { name: 'Biryani', count: 5 },
    { name: 'Main Course', count: 10 },
    { name: 'Desserts', count: 4 },
    { name: 'Beverages', count: 3 },
  ];

  const handleOpenDish = (dish: MenuItem) => {
    setSelectedDishId(dish.id);
  };

  const handleDirectAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    addToCart({
      id: 'cart-' + Date.now(),
      dishId: dish.id,
      restaurantId: restaurant.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
      size: 'regular',
      spiceLevel: 'medium',
      addons: [],
      imageUrl: dish.imageUrl,
    });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col w-full pb-32 max-w-md mx-auto relative select-none">
      {/* Hero Header with Image */}
      <div className="relative w-full h-64 bg-surface-container">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top actions */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md hover:bg-surface active:scale-95 transition-all"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md hover:bg-surface active:scale-95 transition-all"
              aria-label="Favorite"
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isFavorite ? 'text-primary' : 'text-outline'
                }`}
                style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
            </button>
            <button
              className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md hover:bg-surface active:scale-95 transition-all"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {/* Restaurant Title Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
              Express Delivery
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-black">{restaurant.name}</h1>
          <p className="text-xs text-white/90 font-medium">
            {restaurant.address} • {restaurant.distance}
          </p>
        </div>
      </div>

      {/* Quick Stats Bento Box */}
      <div className="px-4 -mt-3 relative z-20">
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-md border border-surface-container/60 grid grid-cols-3 divide-x divide-surface-container">
          <div className="flex flex-col items-center text-center px-2">
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span>{restaurant.rating}</span>
            </div>
            <span className="text-[11px] text-outline mt-0.5">10.2k ratings</span>
          </div>
          <div className="flex flex-col items-center text-center px-2">
            <div className="flex items-center gap-1 text-on-surface font-bold text-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span className="text-[11px] text-outline mt-0.5">Delivery Time</span>
          </div>
          <div className="flex flex-col items-center text-center px-2">
            <div className="flex items-center gap-1 text-on-surface font-bold text-sm">
              <span>₹{restaurant.costForTwo}</span>
            </div>
            <span className="text-[11px] text-outline mt-0.5">For two people</span>
          </div>
        </div>
      </div>

      {/* Deals Carousel */}
      <div className="mt-5 px-4">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-2.5">Deals for you</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          <div className="min-w-[240px] bg-gradient-to-r from-primary-fixed to-primary-container/20 border border-primary/20 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[22px]">percent</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">60% OFF UPTO ₹120</span>
              <span className="text-[10px] text-on-surface-variant font-medium">USE MEGHANA60 • Above ₹199</span>
            </div>
          </div>
          <div className="min-w-[240px] bg-gradient-to-r from-secondary-fixed to-secondary-container/20 border border-secondary/20 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary text-[22px]">account_balance_wallet</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">Flat ₹100 Cashback</span>
              <span className="text-[10px] text-on-surface-variant font-medium">USE DELIVRPAY • On UPI orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Menu Categories */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md pt-4 pb-2 border-b border-surface-container px-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                activeCategory === cat.name
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Menu Dish Items */}
      <div className="px-4 mt-4 flex flex-col divide-y divide-surface-container">
        {restaurant.menu.map((dish) => {
          const cartItem = cart.find((i) => i.dishId === dish.id);

          return (
            <div
              key={dish.id}
              onClick={() => handleOpenDish(dish)}
              className="py-5 flex gap-4 justify-between items-start cursor-pointer group"
            >
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  {/* Veg / Non-Veg icon */}
                  <span
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                      dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    />
                  </span>
                  {dish.isBestseller && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed">
                      Bestseller
                    </span>
                  )}
                </div>

                <h4 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {dish.name}
                </h4>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-on-surface">₹{dish.price}</span>
                  <div className="flex items-center gap-0.5 text-xs text-emerald-600 font-semibold">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>{dish.rating}</span>
                    <span className="text-outline text-[11px]">({dish.ratingCount})</span>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Dish Image + Add Button */}
              <div className="relative w-28 h-28 shrink-0">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover rounded-2xl shadow-sm border border-surface-container"
                />

                <div className="absolute -bottom-2 inset-x-2 flex justify-center">
                  {cartItem ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between w-full h-8 px-2 bg-primary text-white rounded-lg shadow-md font-bold text-xs"
                    >
                      <button
                        onClick={() => updateCartQty(cartItem.id, -1)}
                        className="w-6 h-full flex items-center justify-center hover:opacity-80"
                      >
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() => updateCartQty(cartItem.id, 1)}
                        className="w-6 h-full flex items-center justify-center hover:opacity-80"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleDirectAdd(e, dish)}
                      className="px-4 py-1.5 bg-surface-container-lowest text-primary hover:bg-primary-fixed border border-primary/30 rounded-lg shadow-md font-bold text-xs active:scale-95 transition-all uppercase tracking-wider"
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-16 inset-x-4 max-w-md mx-auto z-40">
          <div
            onClick={() => setScreen('cart')}
            className="w-full bg-primary hover:bg-primary-container text-white py-3 px-4 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
          >
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-bold">
                {totalCartCount} {totalCartCount === 1 ? 'ITEM' : 'ITEMS'} ADDED
              </span>
              <span className="text-base font-extrabold">₹{cartTotal}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <span>View Cart</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
