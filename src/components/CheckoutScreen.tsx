import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useRealtime } from '../context/RealtimeContext';
import { RESTAURANTS_DATA } from '../data/mockData';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    cartTotal,
    setScreen,
    placeNewOrder,
    selectedRestaurantId,
  } = useRealtime();

  const [paymentMethod, setPaymentMethod] = useState<'Google Pay / UPI' | 'Card' | 'COD'>('Google Pay / UPI');
  const [instructions, setInstructions] = useState('Ring doorbell, leave at the door');
  const [isProcessing, setIsProcessing] = useState(false);

  const restaurant =
    RESTAURANTS_DATA.find((r) => r.id === selectedRestaurantId) || RESTAURANTS_DATA[0];

  const discount = 150;
  const deliveryFee = 45;
  const taxes = Number((cartTotal * 0.05).toFixed(2));
  const finalTotal = Math.max(0, cartTotal - discount + deliveryFee + taxes);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fc8019', '#984800', '#2e7d32', '#ffc107'],
      });
    } catch (e) {
      // Confetti fallback
    }

    setTimeout(() => {
      placeNewOrder({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantAddress: `${restaurant.address} • 2.4 km away`,
        restaurantImage: restaurant.imageUrl,
        paymentMethod,
        deliveryAddress: 'Flat 402, Skyline Heights, 5th Main Road, Indiranagar, Bengaluru - 560038',
        deliveryInstructions: instructions,
      });
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-md mx-auto gap-4">
      {/* Delivery Address Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              home_pin
            </span>
            <span className="font-headline-sm text-sm font-bold text-on-surface">Deliver to: Home</span>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              Default
            </span>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">Change</button>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed pl-7">
          Flat 402, Skyline Heights, 5th Main Road, Indiranagar, Bengaluru - 560038
        </p>

        <div className="flex items-center gap-2 pl-7 pt-1 text-xs text-emerald-600 font-semibold">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>Delivery in 24 mins</span>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-outline text-[20px]">room_service</span>
          <span className="font-headline-sm text-sm font-bold text-on-surface">Delivery Instructions</span>
        </div>
        <input
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g. Leave at gate, don't ring bell"
          className="w-full text-xs p-2.5 rounded-xl bg-surface-container-low text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['Ring doorbell', 'Avoid calling', 'Leave at door', 'Directions'].map((tag) => (
            <button
              key={tag}
              onClick={() => setInstructions(tag)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-sm font-bold text-on-surface">Payment Options</span>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Secure</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* UPI */}
          <div
            onClick={() => setPaymentMethod('Google Pay / UPI')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              paymentMethod === 'Google Pay / UPI'
                ? 'border-primary bg-primary/5 text-on-surface'
                : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                UPI
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">Google Pay / UPI</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Fastest & Recommended</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">
              {paymentMethod === 'Google Pay / UPI' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </div>

          {/* Cards */}
          <div
            onClick={() => setPaymentMethod('Card')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              paymentMethod === 'Card'
                ? 'border-primary bg-primary/5 text-on-surface'
                : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">credit_card</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">Credit / Debit Card</span>
                <span className="text-[10px] text-outline">Visa, Mastercard, RuPay</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">
              {paymentMethod === 'Card' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </div>

          {/* COD */}
          <div
            onClick={() => setPaymentMethod('COD')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              paymentMethod === 'COD'
                ? 'border-primary bg-primary/5 text-on-surface'
                : 'border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">Cash on Delivery</span>
                <span className="text-[10px] text-outline">Pay cash or UPI at delivery</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">
              {paymentMethod === 'COD' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </div>
        </div>
      </div>

      {/* Items in this order */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-2">
        <span className="font-headline-sm text-xs font-bold text-outline uppercase tracking-wider">
          Items Summary ({cart.length})
        </span>
        {cart.map((i) => (
          <div key={i.id} className="flex justify-between text-xs text-on-surface py-0.5">
            <span>
              {i.quantity}x {i.name}
            </span>
            <span className="font-semibold">₹{i.price * i.quantity}</span>
          </div>
        ))}
      </div>

      {/* Cancellation Policy Guarantee */}
      <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-2.5">
        <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified_user</span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-on-surface">100% Cancellation Refund Guarantee</span>
          <span className="text-[10px] text-on-surface-variant">
            Full instant refund if cancelled before kitchen starts preparing.
          </span>
        </div>
      </div>

      {/* Place Order CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-md p-4 border-t border-surface-container z-40 max-w-md mx-auto">
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-base shadow-xl shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-between disabled:opacity-75"
        >
          <div className="flex flex-col text-left">
            <span className="text-[11px] uppercase tracking-wider text-white/80 font-bold">TOTAL AMOUNT</span>
            <span className="text-lg font-black">₹{finalTotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2 font-bold">
            <span>{isProcessing ? 'Confirming...' : 'Place Order'}</span>
            <span className="material-symbols-outlined text-[20px]">
              {isProcessing ? 'sync' : 'shopping_bag'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
