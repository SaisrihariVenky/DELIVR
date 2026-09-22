import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { RESTAURANTS_DATA } from '../data/mockData';

export const CartScreen: React.FC = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    cartTotal,
    setScreen,
    selectedRestaurantId,
  } = useRealtime();

  const [cookingNotes, setCookingNotes] = useState('Extra spicy, please provide 2 spoons');
  const [couponCode, setCouponCode] = useState('SAVE50');
  const [isCouponApplied, setIsCouponApplied] = useState(true);

  const restaurant =
    RESTAURANTS_DATA.find((r) => r.id === selectedRestaurantId) || RESTAURANTS_DATA[0];

  const discount = isCouponApplied ? 150 : 0;
  const deliveryFee = 45;
  const taxes = Number((cartTotal * 0.05).toFixed(2));
  const finalTotal = Math.max(0, cartTotal - discount + deliveryFee + taxes);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center max-w-md mx-auto pt-20">
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
          <span className="material-symbols-outlined text-[48px]">shopping_bag</span>
        </div>
        <h2 className="font-headline-md text-xl font-bold text-on-surface mb-1">Your cart is empty</h2>
        <p className="text-xs text-on-surface-variant max-w-xs mb-6">
          Good food is always cooking! Add your favorite dishes from top restaurants near you.
        </p>
        <button
          onClick={() => setScreen('home')}
          className="px-6 py-3 rounded-full bg-primary text-white text-sm font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-md mx-auto gap-4">
      {/* Restaurant Info Summary Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0">
            <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">{restaurant.name}</h3>
            <span className="text-xs text-on-surface-variant font-medium">
              {restaurant.address} • 25 mins
            </span>
          </div>
        </div>
        <button
          onClick={() => setScreen('restaurant_detail')}
          className="text-xs font-bold text-primary hover:underline px-2 py-1 rounded bg-primary/5"
        >
          + Add More
        </button>
      </div>

      {/* Cart Items List */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col divide-y divide-surface-container">
        {cart.map((item) => (
          <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 flex flex-col gap-0.5">
              <h4 className="text-xs font-bold text-on-surface line-clamp-1">{item.name}</h4>
              <span className="text-[11px] text-outline font-medium">{item.customizationText || 'Standard'}</span>
              <span className="text-xs font-extrabold text-on-surface">₹{item.price * item.quantity}</span>
            </div>

            {/* Stepper */}
            <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-surface-container">
              <button
                onClick={() => updateCartQty(item.id, -1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-xs text-on-surface hover:bg-surface-container rounded"
              >
                -
              </button>
              <span className="w-6 text-center text-xs font-bold text-on-surface">{item.quantity}</span>
              <button
                onClick={() => updateCartQty(item.id, 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-xs text-on-surface hover:bg-surface-container rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-outline hover:text-rose-600 transition-colors p-1"
              aria-label="Remove item"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        ))}
      </div>

      {/* Cooking Instructions note */}
      <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-surface-container/60 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-outline text-[20px]">edit_note</span>
        <input
          value={cookingNotes}
          onChange={(e) => setCookingNotes(e.target.value)}
          placeholder="Add cooking or delivery instructions..."
          className="flex-1 bg-transparent text-xs text-on-surface placeholder:text-outline font-medium focus:outline-none"
        />
      </div>

      {/* Offers & Coupon section */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">local_offer</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-on-surface">
              {isCouponApplied ? 'SAVE50 Applied' : 'Apply Coupon'}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {isCouponApplied ? 'Saved ₹150 with code SAVE50' : 'Avail exciting discounts'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsCouponApplied(!isCouponApplied)}
          className="text-xs font-bold text-primary hover:underline px-3 py-1 rounded bg-primary/10"
        >
          {isCouponApplied ? 'Remove' : 'Apply'}
        </button>
      </div>

      {/* Bill Details Breakdown */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-2.5">
        <h3 className="font-headline-sm text-xs font-bold text-outline uppercase tracking-wider">
          Bill Details
        </h3>
        <div className="flex justify-between text-xs text-on-surface">
          <span>Item Total</span>
          <span className="font-semibold">₹{cartTotal}</span>
        </div>
        <div className="flex justify-between text-xs text-on-surface">
          <span>Delivery Fee</span>
          <span className="font-semibold">₹{deliveryFee}</span>
        </div>
        {isCouponApplied && (
          <div className="flex justify-between text-xs text-emerald-600 font-semibold">
            <span>Discount (SAVE50)</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-xs text-on-surface">
          <span>Taxes & Charges (5% GST)</span>
          <span className="font-semibold">₹{taxes.toFixed(2)}</span>
        </div>
        <div className="pt-2 border-t border-surface-container flex justify-between text-sm font-extrabold text-on-surface">
          <span>To Pay</span>
          <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Cancellation Notice */}
      <div className="flex items-center gap-2 px-2 text-[11px] text-outline">
        <span className="material-symbols-outlined text-[15px]">info</span>
        <span>Orders can be modified or cancelled within 60 seconds of placing.</span>
      </div>

      {/* Sticky Proceed Button */}
      <div className="fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-md p-4 border-t border-surface-container z-40 max-w-md mx-auto">
        <button
          onClick={() => setScreen('checkout')}
          className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-xl shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex flex-col text-left">
            <span className="text-[11px] uppercase tracking-wider text-white/80 font-bold">TOTAL TO PAY</span>
            <span className="text-base font-black">₹{finalTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};
