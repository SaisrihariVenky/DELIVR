import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();
app.use(express.json());

// In-memory real-time state for the DELIVR application
let activeOrder = {
  id: '#SWG-84920',
  restaurantId: 'tuscany-pizza',
  restaurantName: 'Tuscany Wood-Fired Pizza',
  restaurantAddress: 'Spice Route Kitchen • 1.2 km away',
  restaurantImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnEUx89WzmoG2rTqhsN6h8YhKZQtqEMryL-pzBuEgcZCiQr5ap10LM3cgkxmGx_eIM6gptSYDUsZgDVdO1tWaB5zf9vkrhpo257qzcMaWQIl3VDjg4GYQqDvFDxe2f_kIPIkCR5UjBBg3xIIfNuqu0OgoxqZOQWFP_C_iRH2qJSbmYGrqPFLM70fGlgcKvR46Nbf6aIOKyt1kvkLJvf7HU1poMi_I0oOyU0raRG587u2626EjJnOAawg',
  placedAt: '8:15 PM',
  estimatedDeliveryTime: '8:42 PM',
  remainingMinutes: 14,
  status: 'on_the_way', // 'confirmed' | 'preparing' | 'picked_up' | 'on_the_way' | 'delivered'
  items: [
    {
      id: 'item-1',
      dishId: 'truffle-pizza',
      restaurantId: 'tuscany-pizza',
      name: 'Truffle Mushroom Pizza',
      price: 24.5,
      quantity: 1,
      size: 'regular',
      spiceLevel: 'medium',
      addons: ['Extra Cheese'],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Vm46Ts8Fm8dGD0fteG4hgk-i-b3jeodJ7WVP4dK-OH9c8bmvOdN9tZ0RX8lPFm6c7NBnwkIlPWlMqm6hw0tjk3YX9NlnX9tDC1uV7RsCnF3Sze1X_h294GnFx2nTdnq0V9BJwR0Grg0YPv_nzO79Bp7V6vJZbfEHs3KySahqBEDOj2d9UIE5ELFpHDNwIa7OPVf7zVDjp6Yk9XlfgqHh102UlxsYQVDqlu2VTOjEk21PNrrqjg-9Vg',
    },
    {
      id: 'item-2',
      dishId: 'garlic-focaccia',
      restaurantId: 'tuscany-pizza',
      name: 'Garlic Herb Focaccia',
      price: 8.0,
      quantity: 1,
      size: 'regular',
      spiceLevel: 'mild',
      addons: [],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBvY5UyLk8c0TSgr8YwqBMX4OERV1enDlhZeIFRMnJn_lKFZCHhtwpttFAumIuxG_B7RfWcMKnhodEBuHb9SV452UAL-Vhv9AOGScAFwwaP5_-rPmMNXEd3apdtR0ya5bfqqZGgCRmLTWu79oOpiQDeTwhkSAs3qOrulvPId89SxHBsV0zI-g2Ifs5aIMWqS77N735RxbMQ9h-dCUORu2gEq0wzo_KZ2H_--1-icy2EMmcQGFlJKwcpMQ',
    },
  ],
  itemTotal: 32.5,
  discount: 0,
  deliveryFee: 2.0,
  taxes: 3.5,
  totalToPay: 38.0,
  deliveryAddress: 'Flat 402, Skyline Heights, 5th Main Road, Indiranagar, Bengaluru - 560038',
  deliveryInstructions: 'Ring doorbell, leave at the door',
  paymentMethod: 'Google Pay / UPI',
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
      lat: 12.973,
      lng: 77.638,
      heading: 42,
      speed: 28,
      addressDescription: '1.2 km away • Next turn on MG Road',
    },
  },
  progressSteps: [
    {
      id: 'confirmed',
      label: 'Order Confirmed',
      subtitle: 'Restaurant accepted your order',
      time: '8:15 PM',
      completed: true,
      current: false,
    },
    {
      id: 'preparing',
      label: 'Preparing Your Food',
      subtitle: 'The chef is lovingly crafting your meal',
      time: '8:18 PM',
      completed: true,
      current: false,
    },
    {
      id: 'picked_up',
      label: 'Picked Up',
      subtitle: 'Ramesh has packed your items securely',
      time: '8:28 PM',
      completed: true,
      current: false,
    },
    {
      id: 'on_the_way',
      label: 'On the Way',
      subtitle: 'Heading to your delivery address',
      time: 'Est. 8:40 PM',
      completed: true,
      current: true,
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
      orderId: '#SWG-84920',
      sender: 'system',
      senderName: 'DELIVR System',
      text: 'Ramesh Kumar has been assigned to your order with Electric Scooter.',
      timestamp: '8:22 PM',
    },
    {
      id: 'msg-2',
      orderId: '#SWG-84920',
      sender: 'driver',
      senderName: 'Ramesh Kumar',
      text: 'Hello Aarav! I have your order and I am navigating via MG Road right now.',
      timestamp: '8:29 PM',
    },
  ],
  driverProgressPercent: 52,
};

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(data: object) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: Date.now() });
});

app.get('/api/order/active', (req, res) => {
  res.json(activeOrder);
});

app.post('/api/order/create', (req, res) => {
  const newOrder = req.body;
  if (!newOrder) {
    return res.status(400).json({ error: 'Order payload required' });
  }
  activeOrder = {
    ...activeOrder,
    ...newOrder,
    id: '#SWG-' + Math.floor(10000 + Math.random() * 90000),
    status: 'confirmed',
    remainingMinutes: 24,
    driverProgressPercent: 5,
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
        time: 'Est. 5 mins',
        completed: false,
        current: false,
      },
      {
        id: 'picked_up',
        label: 'Picked Up',
        subtitle: 'Ramesh has packed your items securely',
        time: 'Est. 12 mins',
        completed: false,
        current: false,
      },
      {
        id: 'on_the_way',
        label: 'On the Way',
        subtitle: 'Heading to your delivery address',
        time: 'Est. 20 mins',
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
        id: 'msg-init',
        orderId: activeOrder.id,
        sender: 'system',
        senderName: 'DELIVR System',
        text: 'Order placed! Kitchen has confirmed your order.',
        timestamp: 'Just now',
      },
    ],
  };

  broadcast({ type: 'order:updated', order: activeOrder });
  res.json({ success: true, order: activeOrder });
});

app.post('/api/order/advance', (req, res) => {
  const statuses = ['confirmed', 'preparing', 'picked_up', 'on_the_way', 'delivered'];
  const currentIndex = statuses.indexOf(activeOrder.status);
  const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];

  activeOrder.status = nextStatus as any;
  if (nextStatus === 'confirmed') activeOrder.driverProgressPercent = 5;
  if (nextStatus === 'preparing') activeOrder.driverProgressPercent = 20;
  if (nextStatus === 'picked_up') activeOrder.driverProgressPercent = 40;
  if (nextStatus === 'on_the_way') activeOrder.driverProgressPercent = 70;
  if (nextStatus === 'delivered') {
    activeOrder.driverProgressPercent = 100;
    activeOrder.remainingMinutes = 0;
  }

  // Update progress steps
  activeOrder.progressSteps = activeOrder.progressSteps.map((step) => {
    const stepIdx = statuses.indexOf(step.id);
    const currIdx = statuses.indexOf(nextStatus);
    return {
      ...step,
      completed: stepIdx <= currIdx,
      current: stepIdx === currIdx,
    };
  });

  broadcast({ type: 'order:updated', order: activeOrder });
  res.json(activeOrder);
});

app.post('/api/chat/send', (req, res) => {
  const { text, orderId } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });

  const userMsg = {
    id: 'msg-' + Date.now(),
    orderId: orderId || activeOrder.id,
    sender: 'user' as const,
    senderName: 'You',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  activeOrder.chatMessages.push(userMsg);
  broadcast({ type: 'chat:message', message: userMsg, order: activeOrder });

  // Driver auto-replies realistically over real-time socket
  setTimeout(() => {
    const driverResponses = [
      "Got it! I'm following your delivery notes.",
      "Just stopped at the signal on 100ft road. Will be there in about 5 minutes!",
      "Sure thing, I will ring the doorbell and leave it safely at your door.",
      "Food is kept warm in the insulated bag! See you very soon.",
      "I have arrived at Skyline Heights gate. Entering now!",
    ];
    const replyText = driverResponses[Math.floor(Math.random() * driverResponses.length)];
    const driverMsg = {
      id: 'msg-drv-' + Date.now(),
      orderId: activeOrder.id,
      sender: 'driver' as const,
      senderName: activeOrder.driver.name,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    activeOrder.chatMessages.push(driverMsg);
    broadcast({ type: 'chat:message', message: driverMsg, order: activeOrder });
  }, 1200);

  res.json({ success: true, message: userMsg });
});

// Periodic real-time GPS & ETA tick
setInterval(() => {
  if (activeOrder.status === 'on_the_way' || activeOrder.status === 'picked_up') {
    activeOrder.driverProgressPercent = Math.min(100, activeOrder.driverProgressPercent + 1.5);
    const progress = activeOrder.driverProgressPercent;

    const remainingKm = Math.max(0.1, (2.4 * (1 - progress / 100))).toFixed(1);
    const remainingMins = Math.max(1, Math.round(15 * (1 - progress / 100)));
    activeOrder.remainingMinutes = remainingMins;

    const streets = [
      'Next turn on MG Road',
      'Passing 100ft Road junction',
      'Turning onto 5th Main Road',
      'Approaching Skyline Heights',
      'Arrived at your doorstep!',
    ];
    const streetIdx = Math.min(streets.length - 1, Math.floor((progress / 100) * streets.length));

    activeOrder.driver.currentLocation = {
      lat: 12.9716 + (progress / 100) * 0.008,
      lng: 77.63 + (progress / 100) * 0.012,
      heading: 45 + Math.sin(progress) * 15,
      speed: progress >= 95 ? 0 : Math.round(25 + Math.random() * 8),
      addressDescription: `${remainingKm} km away • ${streets[streetIdx]}`,
    };

    if (activeOrder.driverProgressPercent >= 98) {
      activeOrder.status = 'delivered';
      activeOrder.remainingMinutes = 0;
      activeOrder.progressSteps = activeOrder.progressSteps.map((s) => ({
        ...s,
        completed: true,
        current: s.id === 'delivered',
      }));
      activeOrder.chatMessages.push({
        id: 'msg-deliv-' + Date.now(),
        orderId: activeOrder.id,
        sender: 'system',
        senderName: 'DELIVR System',
        text: 'Order Delivered! Enjoy your fresh and delicious meal.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      broadcast({ type: 'order:delivered', order: activeOrder });
    } else {
      broadcast({
        type: 'driver:position',
        progress: activeOrder.driverProgressPercent,
        remainingMinutes: activeOrder.remainingMinutes,
        location: activeOrder.driver.currentLocation,
        orderId: activeOrder.id,
      });
    }
  }
}, 2500);

// WebSocket connection handling
wss.on('connection', (ws) => {
  // Send initial full state immediately
  ws.send(JSON.stringify({ type: 'init', order: activeOrder, serverTime: Date.now() }));

  ws.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      if (parsed.type === 'chat:message') {
        const userMsg = {
          id: 'msg-' + Date.now(),
          orderId: activeOrder.id,
          sender: 'user' as const,
          senderName: 'You',
          text: parsed.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        activeOrder.chatMessages.push(userMsg);
        broadcast({ type: 'chat:message', message: userMsg, order: activeOrder });
      } else if (parsed.type === 'order:advance') {
        // Trigger status advance
        const statuses = ['confirmed', 'preparing', 'picked_up', 'on_the_way', 'delivered'];
        const currentIndex = statuses.indexOf(activeOrder.status);
        const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];
        activeOrder.status = nextStatus as any;
        if (nextStatus === 'delivered') {
          activeOrder.driverProgressPercent = 100;
          activeOrder.remainingMinutes = 0;
        }
        activeOrder.progressSteps = activeOrder.progressSteps.map((step) => {
          const stepIdx = statuses.indexOf(step.id);
          const currIdx = statuses.indexOf(nextStatus);
          return {
            ...step,
            completed: stepIdx <= currIdx,
            current: stepIdx === currIdx,
          };
        });
        broadcast({ type: 'order:updated', order: activeOrder });
      } else if (parsed.type === 'order:reset') {
        activeOrder.status = 'on_the_way';
        activeOrder.driverProgressPercent = 45;
        activeOrder.remainingMinutes = 14;
        broadcast({ type: 'order:updated', order: activeOrder });
      }
    } catch (e) {
      console.error('Error parsing WS message:', e);
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`DELIVR Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
