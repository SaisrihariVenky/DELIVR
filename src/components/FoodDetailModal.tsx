import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { RESTAURANTS_DATA } from '../data/mockData';

export const FoodDetailModal: React.FC = () => {
  const { selectedDishId, setSelectedDishId, selectedRestaurantId, addToCart } = useRealtime();

  const restaurant =
    RESTAURANTS_DATA.find((r) => r.id === selectedRestaurantId) || RESTAURANTS_DATA[0];

  const dish =
    restaurant.menu.find((d) => d.id === selectedDishId) ||
    RESTAURANTS_DATA.flatMap((r) => r.menu).find((d) => d.id === selectedDishId) ||
    restaurant.menu[0];

  const [size, setSize] = useState<'regular' | 'family'>('regular');
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'medium' | 'spicy'>('medium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!selectedDishId) return null;

  const basePrice = dish.price;
  const sizeSurcharge = size === 'family' ? 140 : 0;
  const addonsCost = selectedAddons.length * 35;
  const unitPrice = basePrice + sizeSurcharge + addonsCost;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleAddToCart = () => {
    addToCart({
      id: 'cart-' + Date.now(),
      dishId: dish.id,
      restaurantId: restaurant.id,
      name: dish.name,
      price: unitPrice,
      quantity,
      size,
      spiceLevel,
      addons: selectedAddons,
      imageUrl: dish.imageUrl,
      customizationText: `${size === 'family' ? 'Family Pack' : 'Regular'} • ${spiceLevel.toUpperCase()}${
        selectedAddons.length ? ` • ${selectedAddons.join(', ')}` : ''
      }`,
    });
    setSelectedDishId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface w-full max-w-md max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Floating Close Button */}
        <button
          onClick={() => setSelectedDishId(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-md active:scale-95"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto no-scrollbar pb-24">
          {/* Dish Hero Image */}
          <div className="relative w-full h-64 bg-surface-container">
            <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges on Hero */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 bg-surface/90 backdrop-blur-md text-on-surface px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                <span className="material-symbols-outlined text-emerald-600 text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{dish.rating} (2.4k+ reviews)</span>
              </span>
              <span className="flex items-center gap-1 bg-primary text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                <span>Hot & Spicy</span>
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-6">
            {/* Title & Desc */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-xl font-bold text-on-surface">{dish.name}</h2>
                <span className="text-xl font-black text-primary">₹{unitPrice}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{dish.description}</p>
            </div>

            {/* Key Ingredients */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-outline">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-1 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface border border-surface-container"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Choose Size */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-surface-container">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-on-surface">Choose Size</h3>
                <span className="text-xs text-outline font-medium">Required</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setSize('regular')}
                  className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                    size === 'regular'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">Regular</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {size === 'regular' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <span className="text-xs text-outline font-medium">Standard portion</span>
                </div>

                <div
                  onClick={() => setSize('family')}
                  className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                    size === 'family'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">Family Pack (+₹140)</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {size === 'family' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <span className="text-xs text-outline font-medium">Serves 2-3 people</span>
                </div>
              </div>
            </div>

            {/* Spice Level */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-surface-container">
              <h3 className="text-sm font-bold text-on-surface">Spice Level</h3>
              <div className="grid grid-cols-3 gap-2">
                {(['mild', 'medium', 'spicy'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSpiceLevel(lvl)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                      spiceLevel === lvl
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Make it a Feast Add-ons */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-surface-container">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-on-surface">Make it a Feast</h3>
                <span className="text-xs text-outline font-medium">Optional</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Extra Mirchi ka Salan', price: '+₹35' },
                  { name: 'Boiled Egg [2 pcs]', price: '+₹35' },
                  { name: 'Chilled Rose Milk', price: '+₹35' },
                ].map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[18px]">
                          {isChecked ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span className="text-xs font-semibold text-on-surface">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{addon.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="absolute bottom-0 inset-x-0 bg-surface/95 backdrop-blur-md p-4 border-t border-surface-container flex items-center gap-4">
          <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-surface-container">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-on-surface">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-between"
          >
            <span>Add to Cart</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
