import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { PAST_ORDERS_DATA } from '../data/mockData';

export const OrdersScreen: React.FC = () => {
  const {
    activeOrder,
    setScreen,
    addToCart,
    setShowRateModal,
    setShowChatModal,
  } = useRealtime();

  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const hasActiveOrder = activeOrder && activeOrder.status !== 'cancelled';

  const handleReorder = (order: typeof PAST_ORDERS_DATA[0]) => {
    order.items.forEach((item, idx) => {
      addToCart({
        id: 'reorder-' + Date.now() + '-' + idx,
        dishId: 'dish-' + idx,
        restaurantId: order.restaurantId,
        name: item.name,
        price: Math.round(order.totalPaid / order.items.length),
        quantity: item.quantity,
        size: 'regular',
        spiceLevel: 'medium',
        addons: [],
        imageUrl: order.restaurantImage,
      });
    });
    setScreen('cart');
  };

  const filteredPastOrders = PAST_ORDERS_DATA.filter(
    (o) =>
      o.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto gap-4">
      {/* Tabs */}
      <div className="flex bg-surface-container-low p-1 rounded-2xl border border-surface-container">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'active'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Active Orders</span>
          {hasActiveOrder && activeOrder.status !== 'delivered' && (
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'past'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Past Orders ({PAST_ORDERS_DATA.length})
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'active' ? (
        hasActiveOrder ? (
          <div className="flex flex-col gap-4">
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-4">
              {/* Order Restaurant Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0">
                    <img
                      src={activeOrder.restaurantImage}
                      alt={activeOrder.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                      {activeOrder.restaurantName}
                    </h3>
                    <span className="text-xs text-on-surface-variant font-medium">
                      {activeOrder.restaurantAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="capitalize">{activeOrder.status.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Progress Summary Pill */}
              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">two_wheeler</span>
                  <span>
                    {activeOrder.status === 'delivered'
                      ? 'Delivered to your door'
                      : `Arriving in ~${activeOrder.remainingMinutes} mins`}
                  </span>
                </div>
                <span className="text-xs font-bold text-primary">₹{activeOrder.totalToPay}</span>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-1 text-xs text-on-surface-variant">
                {activeOrder.items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>
                      {i.quantity}x {i.name}
                    </span>
                    <span className="font-medium text-on-surface">₹{i.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-container">
                <button
                  onClick={() => setScreen('tracking')}
                  className="py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>Track Order</span>
                </button>

                <button
                  onClick={() => setShowChatModal(true)}
                  className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Chat Driver</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-outline text-[48px] mb-2">fastfood</span>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">No active orders</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mt-1">
              Craving something delicious? Order from top restaurants near you.
            </p>
            <button
              onClick={() => setScreen('home')}
              className="mt-4 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container"
            >
              Order Now
            </button>
          </div>
        )
      ) : (
        /* Past Tab View */
        <div className="flex flex-col gap-4">
          {/* Search bar in past orders */}
          <div className="relative flex items-center">
            <span className="absolute left-3 material-symbols-outlined text-outline text-[18px]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search previous dishes or restaurants..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low text-xs text-on-surface placeholder:text-outline font-medium focus:outline-none border border-surface-container"
            />
          </div>

          {filteredPastOrders.map((order) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0">
                    <img
                      src={order.restaurantImage}
                      alt={order.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                      {order.restaurantName}
                    </h3>
                    <span className="text-[11px] text-outline font-medium">
                      {order.date} • {order.id}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-on-surface">₹{order.totalPaid}</span>
              </div>

              <div className="text-xs text-on-surface-variant pl-1">
                {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-container">
                <button
                  onClick={() => setShowRateModal(true)}
                  className="py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-amber-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>Rate Order</span>
                </button>

                <button
                  onClick={() => handleReorder(order)}
                  className="py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">repeat</span>
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
