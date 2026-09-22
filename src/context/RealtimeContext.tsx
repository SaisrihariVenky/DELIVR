import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ActiveOrder, CartItem, ScreenType, UserProfile, OrderStatus } from '../types';
import { INITIAL_ACTIVE_ORDER, USER_PROFILE } from '../data/mockData';

interface RealtimeContextType {
  activeOrder: ActiveOrder;
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isConnected: boolean;
  liveNotification: string | null;
  setLiveNotification: (msg: string | null) => void;
  sendChatMessage: (text: string) => void;
  advanceOrderStage: () => void;
  resetOrderSimulation: () => void;
  placeNewOrder: (details: {
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: string;
    restaurantImage: string;
    paymentMethod: string;
    deliveryAddress: string;
    deliveryInstructions?: string;
  }) => void;
  selectedRestaurantId: string;
  setSelectedRestaurantId: (id: string) => void;
  selectedDishId: string | null;
  setSelectedDishId: (id: string | null) => void;
  showChatModal: boolean;
  setShowChatModal: (show: boolean) => void;
  showCallModal: boolean;
  setShowCallModal: (show: boolean) => void;
  showHelpModal: boolean;
  setShowHelpModal: (show: boolean) => void;
  showRateModal: boolean;
  setShowRateModal: (show: boolean) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>(INITIAL_ACTIVE_ORDER);
  const [screen, setScreen] = useState<ScreenType>('home');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      dishId: 'meghana-spec-biryani',
      restaurantId: 'meghana-foods',
      name: 'Meghana Special Chicken Biryani',
      price: 380,
      quantity: 2,
      size: 'regular',
      spiceLevel: 'spicy',
      addons: ['Extra Mirchi ka Salan'],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBV2vFDfKNbgl_iHvRJ3tEmJkniXSRBIIRvwDVL1r6dSE007u9fpIBfHMp0WpmPXpAWmuINaX1pIbqEAiuePlPgbIr8zkT0uLNF4r5_ILvWNpnYe7ZtJjSu9A1QPPh92f_qcWdAWFoCKWNj-XHzGBENItO0QBzrgcPBDrvPAvRxfQ9UrCiOcpx9Qk6YjFWNIB5_cL01TBRdGf6MOQArBsdeS64l555WfNKd3AzE37c5LgWTVs86TJg97A',
      customizationText: 'Extra Spicy • Boneless',
    },
    {
      id: 'cart-2',
      dishId: 'paneer-65-dry',
      restaurantId: 'meghana-foods',
      name: 'Paneer 65 (Dry)',
      price: 260,
      quantity: 1,
      size: 'regular',
      spiceLevel: 'medium',
      addons: [],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3PKmQGdEhH_Z_tl2v5gMLgzHnlQAXLzcUvKSJVVVa92nZxUFwxAPlxa8ABgVKbWhvZ5MFuBUrCKv5gMf9poWlfvQDwIEXnEu88hJ2WtI3C-LGglDA6tGZjLyJjwRkKCxqESrSzQ_yYqks_kRSWVjRporf4jTyKUBLFVWorpwg3P7wRFNUfqLdFRfFT1qXtNiEsiS9mTgmKhIDRYnC2Dox02EZGMDzY65ELWzoddqnRoSOownEIhbfg',
      customizationText: 'Standard Portions • Mint Chutney',
    },
    {
      id: 'cart-3',
      dishId: 'special-rose-milk',
      restaurantId: 'meghana-foods',
      name: 'Special Rose Milk',
      price: 90,
      quantity: 1,
      size: 'regular',
      spiceLevel: 'mild',
      addons: [],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAdHHL6wmRxe3DEUjQwDwU3Xd1hyKcBtmONLf_R3gq5zVH-Cq7JZjC9AcZa6wA3VHus2_vqRpHhD2egQe07nQfsKZkgi3JGvYutNQW5FfzKMMrOjZzkWzgMA2hTUYvg1q5Ly7S9FOEOx_kWTZKWWUfPZ3N7NDOdAIj6YXCbVQIXaqRnrCNFyRoFKDHZBf9PbRHw08g02nIY2i6UsDEGfLAxKfab9VQPFQLqyoAZ1ZGPR_mfByhyGLaquQ',
      customizationText: 'Chilled • Less Sugar',
    },
  ]);
  const [user, setUser] = useState<UserProfile>(USER_PROFILE);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [liveNotification, setLiveNotification] = useState<string | null>(null);

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('meghana-foods');
  const [selectedDishId, setSelectedDishId] = useState<string | null>(null);

  const [showChatModal, setShowChatModal] = useState<boolean>(false);
  const [showCallModal, setShowCallModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showRateModal, setShowRateModal] = useState<boolean>(false);

  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket Connection & Static Fallback Simulation
  useEffect(() => {
    const isStaticHost =
      typeof window !== 'undefined' &&
      (window.location.hostname.endsWith('github.io') ||
        window.location.hostname.endsWith('github.com') ||
        window.location.protocol === 'file:' ||
        window.location.hostname.includes('pages.dev') ||
        window.location.hostname.includes('vercel.app') ||
        window.location.hostname.includes('netlify.app'));
    let localSimInterval: any = null;

    // Local client-side simulation ticker for static hosting (GitHub Pages) or offline mode
    const startLocalSimulation = () => {
      if (localSimInterval) return;
      const streets = [
        'Turning onto 100 Feet Road',
        'Passing 12th Main Junction',
        'Crossing CMH Road signal',
        'Entering 5th Main Road',
        'Approaching Skyline Heights gate',
      ];

      localSimInterval = setInterval(() => {
        setActiveOrder((prev) => {
          if (prev.status === 'delivered' || prev.status === 'cancelled') {
            return prev;
          }

          const newProgress = Math.min(100, Math.round((prev.driverProgressPercent + 1.5) * 10) / 10);
          const remainingMins = Math.max(1, Math.round((1 - newProgress / 100) * 18));
          const streetIdx = Math.min(streets.length - 1, Math.floor((newProgress / 100) * streets.length));
          const remainingKm = (Math.max(0.1, (1 - newProgress / 100) * 2.8)).toFixed(1);

          let updatedStatus: OrderStatus = prev.status;
          if (newProgress >= 99) {
            updatedStatus = 'delivered';
          } else if (newProgress >= 25 && prev.status === 'confirmed') {
            updatedStatus = 'preparing';
          } else if (newProgress >= 40 && prev.status === 'preparing') {
            updatedStatus = 'picked_up';
          } else if (newProgress >= 50 && prev.status === 'picked_up') {
            updatedStatus = 'on_the_way';
          }

          const orderStatuses: OrderStatus[] = ['confirmed', 'preparing', 'picked_up', 'on_the_way', 'delivered'];
          const activeIdx = orderStatuses.indexOf(updatedStatus);

          return {
            ...prev,
            status: updatedStatus,
            remainingMinutes: updatedStatus === 'delivered' ? 0 : remainingMins,
            driverProgressPercent: newProgress,
            progressSteps: prev.progressSteps.map((step) => {
              const stepIdx = orderStatuses.indexOf(step.id);
              return {
                ...step,
                completed: stepIdx <= activeIdx,
                current: stepIdx === activeIdx,
              };
            }),
            driver: {
              ...prev.driver,
              currentLocation: {
                ...prev.driver.currentLocation,
                speed: updatedStatus === 'delivered' ? 0 : 28,
                addressDescription:
                  updatedStatus === 'delivered'
                    ? 'Delivered at doorstep'
                    : `${remainingKm} km away • ${streets[streetIdx]}`,
              },
            },
          };
        });
      }, 3000);
    };

    if (isStaticHost) {
      setIsConnected(true);
      startLocalSimulation();
      return () => {
        if (localSimInterval) clearInterval(localSimInterval);
      };
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    let ws: WebSocket;
    let reconnectTimeout: any;

    function connect() {
      try {
        ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
          if (localSimInterval) {
            clearInterval(localSimInterval);
            localSimInterval = null;
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'init' && data.order) {
              setActiveOrder(data.order);
            } else if (data.type === 'order:updated' && data.order) {
              setActiveOrder(data.order);
              setLiveNotification(`Order status updated to: ${data.order.status.replace('_', ' ').toUpperCase()}`);
            } else if (data.type === 'driver:position') {
              setActiveOrder((prev) => ({
                ...prev,
                driverProgressPercent: data.progress,
                remainingMinutes: data.remainingMinutes,
                driver: {
                  ...prev.driver,
                  currentLocation: data.location,
                },
              }));
            } else if (data.type === 'chat:message' && data.message) {
              setActiveOrder((prev) => {
                if (prev.chatMessages.some((m) => m.id === data.message.id)) return prev;
                return {
                  ...prev,
                  chatMessages: [...prev.chatMessages, data.message],
                };
              });
              if (data.message.sender === 'driver') {
                setLiveNotification(`New message from ${data.message.senderName}: "${data.message.text}"`);
              }
            } else if (data.type === 'order:delivered' && data.order) {
              setActiveOrder(data.order);
              setLiveNotification('🎉 Your order has been delivered! Enjoy your meal!');
            }
          } catch (e) {
            console.error('Failed to parse WebSocket message', e);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          startLocalSimulation();
          reconnectTimeout = setTimeout(connect, 4000);
        };

        ws.onerror = () => {
          setIsConnected(false);
          startLocalSimulation();
          ws.close();
        };
      } catch (err) {
        setIsConnected(false);
        startLocalSimulation();
        reconnectTimeout = setTimeout(connect, 4000);
      }
    }

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (localSimInterval) clearInterval(localSimInterval);
      if (ws) ws.close();
    };
  }, []);

  // Clear live notification after 4s
  useEffect(() => {
    if (liveNotification) {
      const timer = setTimeout(() => setLiveNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [liveNotification]);

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.dishId === item.dishId && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setLiveNotification(`Added ${item.name} to cart`);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Send driver message
  const sendChatMessage = (text: string) => {
    const userMsg = {
      id: 'msg-' + Date.now(),
      orderId: activeOrder.id,
      sender: 'user' as const,
      senderName: 'You',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveOrder((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, userMsg],
    }));

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'chat:message', text, orderId: activeOrder.id }));
    } else {
      // Local fallback driver auto-reply
      setTimeout(() => {
        const reply = {
          id: 'msg-drv-' + Date.now(),
          orderId: activeOrder.id,
          sender: 'driver' as const,
          senderName: activeOrder.driver.name,
          text: "I received your note! I'm 4 minutes away on 100ft road.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setActiveOrder((prev) => ({
          ...prev,
          chatMessages: [...prev.chatMessages, reply],
        }));
      }, 1500);
    }
  };

  // Advance order status for testing / real-time demo
  const advanceOrderStage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'order:advance' }));
    } else {
      const orderStatuses: OrderStatus[] = ['confirmed', 'preparing', 'picked_up', 'on_the_way', 'delivered'];
      const currentIdx = orderStatuses.indexOf(activeOrder.status);
      const nextStatus = orderStatuses[Math.min(currentIdx + 1, orderStatuses.length - 1)];
      setActiveOrder((prev) => ({
        ...prev,
        status: nextStatus,
        driverProgressPercent: nextStatus === 'delivered' ? 100 : Math.min(100, prev.driverProgressPercent + 25),
        remainingMinutes: nextStatus === 'delivered' ? 0 : Math.max(2, prev.remainingMinutes - 4),
        progressSteps: prev.progressSteps.map((s) => {
          const stepIdx = orderStatuses.indexOf(s.id);
          const activeIdx = orderStatuses.indexOf(nextStatus);
          return {
            ...s,
            completed: stepIdx <= activeIdx,
            current: stepIdx === activeIdx,
          };
        }),
      }));
    }
  };

  const resetOrderSimulation = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'order:reset' }));
    } else {
      setActiveOrder(INITIAL_ACTIVE_ORDER);
    }
  };

  const placeNewOrder = (details: {
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: string;
    restaurantImage: string;
    paymentMethod: string;
    deliveryAddress: string;
    deliveryInstructions?: string;
  }) => {
    const itemTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const discount = 150;
    const deliveryFee = 45;
    const taxes = 58.5;
    const totalToPay = Math.max(0, itemTotal - discount + deliveryFee + taxes);

    const newOrder: ActiveOrder = {
      id: '#SWG-' + Math.floor(10000 + Math.random() * 90000),
      restaurantId: details.restaurantId,
      restaurantName: details.restaurantName,
      restaurantAddress: details.restaurantAddress,
      restaurantImage: details.restaurantImage,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryTime: '24 mins',
      remainingMinutes: 24,
      status: 'confirmed',
      items: [...cart],
      itemTotal,
      discount,
      couponCode: 'SAVE50',
      deliveryFee,
      taxes,
      totalToPay,
      deliveryAddress: details.deliveryAddress,
      deliveryInstructions: details.deliveryInstructions || 'Ring doorbell, leave at the door',
      paymentMethod: details.paymentMethod,
      driver: {
        id: 'driver-ramesh',
        name: 'Ramesh Kumar',
        vehicle: 'Electric Scooter',
        phone: '+91 98765 43210',
        photoUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCAqqNaUYKhNjqeKnMaa-avUNb6rSIbkE0rUWGs7jlR0sIRUjhLSSxCJbkA0QcvC1PWlIuA5dnBDNtQNJLi9fW98ZjIVJx9-ofdPjmr-bNBgbl8D7YkTIk5XyPaEdNytibf690zypktc71HCUj7dnYG1GIpwk10MyLYMFIZUrC3cx7uClcQg1F37LFIUsaVav4avJuMljXj0nuAixsfoxDXCiEP15iqQvz-P8FKsRK_TkEqgteLk2BYtg',
        rating: 4.9,
        deliveryCount: 1420,
        currentLocation: {
          lat: 12.9352,
          lng: 77.6245,
          heading: 0,
          speed: 0,
          addressDescription: 'Waiting at restaurant',
        },
      },
      progressSteps: [
        {
          id: 'confirmed',
          label: 'Order Confirmed',
          subtitle: 'Restaurant accepted your order',
          time: 'Just now',
          completed: true,
          current: true,
        },
        {
          id: 'preparing',
          label: 'Preparing Your Food',
          subtitle: 'The chef is lovingly crafting your meal',
          time: 'Est. 8:18 PM',
          completed: false,
          current: false,
        },
        {
          id: 'picked_up',
          label: 'Picked Up',
          subtitle: 'Ramesh has packed your items securely',
          time: 'Est. 8:28 PM',
          completed: false,
          current: false,
        },
        {
          id: 'on_the_way',
          label: 'On the Way',
          subtitle: 'Heading to your delivery address',
          time: 'Est. 8:40 PM',
          completed: false,
          current: false,
        },
        {
          id: 'delivered',
          label: 'Delivered',
          subtitle: 'Enjoy your fresh meal!',
          time: '--:--',
          completed: false,
          current: false,
        },
      ],
      chatMessages: [
        {
          id: 'msg-1',
          orderId: 'new',
          sender: 'system',
          senderName: 'DELIVR System',
          text: 'Order placed successfully! Chef has begun preparing.',
          timestamp: 'Just now',
        },
      ],
      routeCoordinates: [
        [18, 78],
        [30, 68],
        [42, 54],
        [56, 42],
        [68, 32],
        [80, 22],
      ],
      driverProgressPercent: 5,
    };

    setActiveOrder(newOrder);
    setScreen('tracking');
    setLiveNotification('🎉 Order placed successfully! Tracking live updates now.');

    fetch('/api/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch((err) => console.log('Order save error (using local state)', err));
  };

  return (
    <RealtimeContext.Provider
      value={{
        activeOrder,
        screen,
        setScreen,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotal,
        user,
        setUser,
        isConnected,
        liveNotification,
        setLiveNotification,
        sendChatMessage,
        advanceOrderStage,
        resetOrderSimulation,
        placeNewOrder,
        selectedRestaurantId,
        setSelectedRestaurantId,
        selectedDishId,
        setSelectedDishId,
        showChatModal,
        setShowChatModal,
        showCallModal,
        setShowCallModal,
        showHelpModal,
        setShowHelpModal,
        showRateModal,
        setShowRateModal,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider');
  }
  return context;
};
