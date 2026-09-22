import React, { useState } from 'react';
import { RealtimeProvider, useRealtime } from './context/RealtimeContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { RestaurantListScreen } from './components/RestaurantListScreen';
import { RestaurantDetailScreen } from './components/RestaurantDetailScreen';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrderTrackingScreen } from './components/OrderTrackingScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { DriverChatModal } from './components/DriverChatModal';
import {
  CallDriverModal,
  HelpSupportModal,
  RateOrderModal,
} from './components/Modals';

const MainAppContent: React.FC = () => {
  const { screen, setScreen, liveNotification, setLiveNotification, isConnected } = useRealtime();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // If on splash screen
  if (screen === 'splash') {
    return <SplashScreen />;
  }

  const getHeaderTitle = () => {
    switch (screen) {
      case 'search':
        return 'Search';
      case 'restaurant_list':
        return 'Restaurants';
      case 'cart':
        return 'Your Cart';
      case 'checkout':
        return 'Checkout';
      case 'tracking':
        return 'Track Live Order';
      case 'orders':
        return 'Your Orders';
      case 'profile':
        return 'Profile';
      case 'edit_profile':
        return 'Edit Profile';
      default:
        return undefined;
    }
  };

  const isDetailView = screen === 'restaurant_detail';
  const showNav = ['home', 'search', 'orders', 'profile', 'restaurant_list'].includes(screen);
  const showCustomHeader = !isDetailView;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center relative overflow-x-hidden">
      {/* Real-time Toast Notification banner */}
      {liveNotification && (
        <div className="fixed top-3 inset-x-4 max-w-sm mx-auto z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-surface-container-highest/95 backdrop-blur-md text-on-surface px-4 py-2.5 rounded-2xl shadow-xl border border-primary/30 flex items-center justify-between gap-3 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="line-clamp-1">{liveNotification}</span>
            </div>
            <button
              onClick={() => setLiveNotification(null)}
              className="text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      {showCustomHeader && (
        <Header
          title={getHeaderTitle()}
          showBack={['cart', 'checkout', 'tracking', 'edit_profile'].includes(screen)}
          onBack={() => {
            if (screen === 'tracking') setScreen('orders');
            else if (screen === 'checkout') setScreen('cart');
            else if (screen === 'cart') setScreen('home');
            else if (screen === 'edit_profile') setScreen('profile');
            else setScreen('home');
          }}
        />
      )}

      {/* Main View Area */}
      <main className="w-full flex-1 flex flex-col">
        {screen === 'home' && <HomeScreen />}
        {screen === 'search' && <SearchScreen />}
        {screen === 'restaurant_list' && <RestaurantListScreen />}
        {screen === 'restaurant_detail' && <RestaurantDetailScreen />}
        {screen === 'cart' && <CartScreen />}
        {screen === 'checkout' && <CheckoutScreen />}
        {screen === 'tracking' && <OrderTrackingScreen />}
        {screen === 'orders' && <OrdersScreen />}
        {screen === 'profile' && <ProfileScreen />}
        {screen === 'edit_profile' && <EditProfileScreen />}
      </main>

      {/* Modals & Sheets */}
      <FoodDetailModal />
      <DriverChatModal />
      <CallDriverModal />
      <HelpSupportModal />
      <RateOrderModal />
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}

      {/* Floating Demo / Tour Trigger */}
      <button
        onClick={() => setShowOnboarding(true)}
        className="fixed bottom-20 right-4 z-30 bg-surface-container-highest/90 hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg border border-surface-container flex items-center gap-1.5 backdrop-blur-md active:scale-95 transition-all"
        title="View Onboarding Flow"
      >
        <span className="material-symbols-outlined text-[15px] text-primary">auto_stories</span>
        <span>App Tour</span>
      </button>

      {/* Bottom Navigation */}
      {showNav && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <RealtimeProvider>
      <MainAppContent />
    </RealtimeProvider>
  );
}
