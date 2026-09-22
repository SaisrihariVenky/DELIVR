import { Restaurant, UserProfile, ActiveOrder } from '../types';

export const USER_PROFILE: UserProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBu7guIEHgSBRlCPMst4ky17VMCeavtEofw7M1S1h48MQ1fBe3aIAZ5lkfPG-Tg6__3wMYjckqf-Ga_-r9UsIc4cC8A06QqPJaSWnUJP720BKLCkuADNxRA_a7ciYkR6QdnmJdrLQqBRlA-vLlSofoZa5vrX5jV6b7ZS6cTu2P5IgnrQ3Cdn8zSQRU8J0DvYVM79heQjW39ZYP09UF-yGtDSUu0uci6Q4opuwoScWqPI7IiBmT86VVVBQ',
  isGoldVip: true,
  tier: 'Gold Member',
  totalDeliveredOrders: 24,
  totalSavedAmount: 2450,
  favoritesCount: 14,
  couponsCount: 6,
  addresses: [
    {
      id: 'addr-1',
      tag: 'Home',
      isDefault: true,
      fullAddress: 'Flat 402, Skyline Heights, 5th Main Road, Indiranagar, Bengaluru - 560038',
    },
    {
      id: 'addr-2',
      tag: 'Work',
      isDefault: false,
      fullAddress: 'WeWork Galaxy, 43 Residency Rd, Shanthala Nagar, Bengaluru - 560025',
    },
  ],
};

export const CUISINE_CATEGORIES = [
  {
    id: 'biryani',
    name: 'Biryani',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHN_XWccSVayX1M6ct8ziPe6GCON83u0xmfcDxfgwwa32u05wF9XVDGQspqOS_LiM7lXs6T_shkwyCftNq4E6x0qKmzRFbIOYvrXPKVmAQbZ1Wq5OacZ8rpjxxPwKLAS1Y6Q6kOGbLlipFv9Sa0zbmUP2yqyDjtIzfXZO7Yltomv4f68oChuNyNVm-CCdiqqQ8hQDymA_kduPA5LYymSHwEZQYNOAK_nYw-Cp7PKfOXbroNzQZZVNHg',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvY5UyLk8c0TSgr8YwqBMX4OERV1enDlhZeIFRMnJn_lKFZCHhtwpttFAumIuxG_B7RfWcMKnhodEBuHb9SV452UAL-Vhv9AOGScAFwwaP5_-rPmMNXEd3apdtR0ya5bfqqZGgCRmLTWu79oOpiQDeTwhkSAs3qOrulvPId89SxHBsV0zI-g2Ifs5aIMWqS77N735RxbMQ9h-dCUORu2gEq0wzo_KZ2H_--1-icy2EMmcQGFlJKwcpMQ',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvkrgEX8AmIHo1PkzxZ0h4YjAJ9eq9kGfqfTtoW3lRs1WN3R0MEBGdSpqwWx4CRJJQsEGp00cb6ZHXfBswzrvXMfPPFg4-mFyIJBFdcUw-X6Mg7DS874orC7aORrvHnYs2XCYT-Vllz54gAhq3gFhROr8vg95xwKb3ByYV_Y-DCvhtlXYJqDh5oPtPiYPpvTuk6HkkRyE8EiNlZQ2xcxSxF61yOhE8aS0P7U6u7D9JzcNxTee-UaT4cw',
  },
  {
    id: 'rolls',
    name: 'Rolls',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJKgIN5aytWEHDihg7mJVB861drsUOAsK890yG9IjJTG3uIhXFq0kZU3PY4r6TNUrNgKZdM79bGfTllAchwt-tfv2I3Wkrl9_ynukzSLBQ8G4OnFWgJaW1LmUBeojfNysdz9PQSCr-YOlMW6lu4qu_t2eSMFS_yEp5QsPgs_xC0UfGquRBoVByh5w34C8LywxqmvO9LdYyGo7OXeNNJviG09flkpGROnSyUHeqF2m98_LHM_h_V3iTwg',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_-wE_p3oneLJk9ImwXMGyFf9mW_JQzsDV_VwlPSF_gyAYeAq8DmsQX-4aU8ejbCUKniDVVSH5WyAPd1SoROrb8yn8VSn3TbFssCWOYVxxYSbYNlHNOkjaG1YGQBiovmAybhJSjXsbZFeRZW0AHtGIZXtbl2RtH2-6Ry6ptXh8w4S1YtLCzauCu3OpIoZZAqXR0BKgBscgY4f03Cdp4QkydMfU58duf1sWWHeDWlfwmYzvVENlFqHIQ',
  },
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'meghana-foods',
    name: 'Meghana Foods',
    cuisines: ['Biryani', 'North Indian', 'Asian', 'Andhra'],
    rating: 4.4,
    ratingCount: '10.2k',
    deliveryTime: '25-30 mins',
    distance: '2.4 km',
    costForTwo: 400,
    offerText: '50% OFF up to ₹100',
    isFreeDelivery: true,
    isFavorite: true,
    address: 'Koramangala 5th Block, Bengaluru',
    lat: 12.9352,
    lng: 77.6245,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuClxbg_hBFZpVI_geZMvIEcwOtvTLhyoVzL7m6pp35NneAcliHtx4lZTBN3jXtv8eEYqxZthDaNjXzMVwgE_86PiLTC-lDmxxytCqOXgwdCtWCGzi4kZsCq5DmXNWPATxlB0UGDekxueCZKH1DnVJKcaFrT5uc4z6raZtmeidylq_5NQEuSQOZ2m4lPxAUVh4h7aXCsrHIuMFR9Ae5PK7h_g_JYCXySaOFy9X2ujHE67vIKAFw0oQ1ePA',
    menu: [
      {
        id: 'meghana-spec-biryani',
        restaurantId: 'meghana-foods',
        name: 'Meghana Special Chicken Biryani',
        description:
          'A legendary signature dish featuring succulent tender chicken pieces layered with aromatic long-grain basmati rice and secret spices.',
        price: 380,
        rating: 4.8,
        ratingCount: 3421,
        isVeg: false,
        category: 'Recommended',
        isBestseller: true,
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBV2vFDfKNbgl_iHvRJ3tEmJkniXSRBIIRvwDVL1r6dSE007u9fpIBfHMp0WpmPXpAWmuINaX1pIbqEAiuePlPgbIr8zkT0uLNF4r5_ILvWNpnYe7ZtJjSu9A1QPPh92f_qcWdAWFoCKWNj-XHzGBENItO0QBzrgcPBDrvPAvRxfQ9UrCiOcpx9Qk6YjFWNIB5_cL01TBRdGf6MOQArBsdeS64l555WfNKd3AzE37c5LgWTVs86TJg97A',
        prepTime: '25-30 min',
        ingredients: ['Basmati Rice', 'Tender Chicken', 'Saffron & Ghee', 'Secret Spices'],
        spiceLevel: 'hot',
      },
      {
        id: 'andhra-chilli-chicken',
        restaurantId: 'meghana-foods',
        name: 'Andhra Chilli Chicken',
        description:
          'Boneless chicken tossed in fiery green chillies, garlic, and freshly crushed Andhra spices.',
        price: 340,
        rating: 4.6,
        ratingCount: 1890,
        isVeg: false,
        category: 'Recommended',
        isMustTry: true,
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCrsEzWeLQhPdCPWpQX09WKLbbugbUKcuu833vR17ublCmUvdpa-KTvoZWHOubriijAZutxgHZD3BDzdAQ2CjeWNZs_wtPOghYWuSNHJHznzM2zSEszLiRGXLXHhpOaDalA83Af5Pw_i1LeX6fbbZhQHakMiXkT-NQDmWYZbOEXL3Keguwvnno8WbOQ99jzcKCDStuoFvLB4kiwhVRF-fMQl2Nip7gG2afXwzpCB2boQel_Gl_83HQZLw',
        prepTime: '15-20 min',
        ingredients: ['Boneless Chicken', 'Green Chillies', 'Curry Leaves', 'Garlic'],
        spiceLevel: 'hot',
      },
      {
        id: 'chicken-65',
        restaurantId: 'meghana-foods',
        name: 'Chicken 65',
        description:
          'Deep-fried chicken dish originating from Hotel Buhari, marinated in ginger, cayenne pepper, and lemon juice.',
        price: 320,
        rating: 4.5,
        ratingCount: 950,
        isVeg: false,
        category: 'Starters',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6S20mZBtZDMDPOP8VtL-dagyfqURlWghP4DE-5QH1C5tTwvoDNM0iA71y1pbMpM96cEMLmQuLv8tDr40Rod4wpDZpZvi6DP9snqBMx8PnnRnr-3PoInTHE2Nz5MpCnb7H3iJcZRRRZVZY_SspQXYJKE47teANP7nYz3vOU33biWBywPvxel-du-m1Oo9SDAqLY68Nx5B0WfKT-KS_c5C2KOSReXaZeOnhtZC9hCUSx_RHpTcW5Ws0Sg',
        prepTime: '15-20 min',
        ingredients: ['Chicken Thighs', 'Red Chilli Paste', 'Curd', 'Curry Leaves'],
        spiceLevel: 'medium',
      },
      {
        id: 'paneer-65-dry',
        restaurantId: 'meghana-foods',
        name: 'Paneer 65 (Dry)',
        description: 'Crisp cottage cheese cubes sauteed in special South Indian herbs and spices.',
        price: 260,
        rating: 4.4,
        ratingCount: 820,
        isVeg: true,
        category: 'Starters',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3PKmQGdEhH_Z_tl2v5gMLgzHnlQAXLzcUvKSJVVVa92nZxUFwxAPlxa8ABgVKbWhvZ5MFuBUrCKv5gMf9poWlfvQDwIEXnEu88hJ2WtI3C-LGglDA6tGZjLyJjwRkKCxqESrSzQ_yYqks_kRSWVjRporf4jTyKUBLFVWorpwg3P7wRFNUfqLdFRfFT1qXtNiEsiS9mTgmKhIDRYnC2Dox02EZGMDzY65ELWzoddqnRoSOownEIhbfg',
        prepTime: '15-18 min',
        ingredients: ['Fresh Paneer', 'Mint Chutney', 'Tempered Spices'],
        spiceLevel: 'medium',
      },
      {
        id: 'mutton-biryani',
        restaurantId: 'meghana-foods',
        name: 'Mutton Biryani',
        description:
          'Tender chunks of succulent mutton slow-cooked with aromatic spices and saffron-infused basmati rice.',
        price: 450,
        rating: 4.7,
        ratingCount: 2110,
        isVeg: false,
        category: 'Biryani',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCNp2o14q0AMgTuwhSlu9WmsUrLProjauZjQNiavYJ3UI1sOjlMAv3MPXN6oLTq-dNyM-M_i3SwFrDvX1eFmj7MpeFqbFc17mrlSZiYLm3D1-rx6IZHXfyL2unj8yut3DwW_viH9BHiILatL8CldU_eygBvrM0Bmika5OhhrPCzjKcueIoxdNohSjxyQb9A5LcPY77yRBdsIKma-iebAnKkqIodk0_mPR5yvT7ZMUtEMNUvYrk6LMGavQ',
        prepTime: '30-35 min',
        ingredients: ['Tender Mutton', 'Basmati Rice', 'Saffron', 'Brown Onions'],
        spiceLevel: 'hot',
      },
      {
        id: 'double-ka-meetha',
        restaurantId: 'meghana-foods',
        name: 'Double Ka Meetha',
        description:
          'Traditional Hyderabadi bread pudding sweet made of fried bread slices soaked in hot milk with spices, saffron, and nuts.',
        price: 150,
        rating: 4.5,
        ratingCount: 640,
        isVeg: true,
        category: 'Desserts',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA4Cabkz_6_XwtHYWOiWLyAtLD53M8EmMfp5_eZl8X2JNG7qJLy-C1mB9JrJgkcCfrHJnRtc278L47Wb6U9skOSR8iYc16d5smy9JZeQnJirH6Ygi9VUep4AHQP6i0T6oqWudTReu-xObKQ_HEb9820rAD-udymFzOgq5HbqHwTQ9NipXmXlVuH8QVqDpP4RH51Fyy1kXhul_xyzPcUk0XtsHqD5bKXws66Fv5XYsVBUmrgKeUcUIA7UA',
        prepTime: '5-10 min',
        ingredients: ['Bread Slices', 'Condensed Milk', 'Cardamom', 'Almonds & Pistachios'],
        spiceLevel: 'mild',
      },
      {
        id: 'special-rose-milk',
        restaurantId: 'meghana-foods',
        name: 'Special Rose Milk',
        description: 'Chilled sweet rose milk infused with crushed Damascus rose petals and sabja seeds.',
        price: 90,
        rating: 4.6,
        ratingCount: 420,
        isVeg: true,
        category: 'Beverages',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAdHHL6wmRxe3DEUjQwDwU3Xd1hyKcBtmONLf_R3gq5zVH-Cq7JZjC9AcZa6wA3VHus2_vqRpHhD2egQe07nQfsKZkgi3JGvYutNQW5FfzKMMrOjZzkWzgMA2hTUYvg1q5Ly7S9FOEOx_kWTZKWWUfPZ3N7NDOdAIj6YXCbVQIXaqRnrCNFyRoFKDHZBf9PbRHw08g02nIY2i6UsDEGfLAxKfab9VQPFQLqyoAZ1ZGPR_mfByhyGLaquQ',
        prepTime: '5 min',
        ingredients: ['Chilled Milk', 'Rose Petal Syrup', 'Sabja Seeds'],
        spiceLevel: 'mild',
      },
    ],
  },
  {
    id: 'toit-pizzeria',
    name: 'Toit Pizzeria & Brewpub',
    cuisines: ['Pizzas', 'Italian', 'Fast Food'],
    rating: 4.7,
    ratingCount: '8.4k',
    deliveryTime: '35-40 mins',
    distance: '2.8 km',
    costForTwo: 800,
    offerText: '₹125 OFF above ₹399',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnA0mVmQJe7XOp_uoClZFmSuc_ryjnL4YH0oCG2nMnJ2RqGEwJVF4edYlPBkFnskmaniP-MapRQj-0wLqHLYpX09LQkQAf6oa_NBGcd_qMhsp6jK3xhS95Nr_GtDKyVGtj_axkIDNnoe3CQ63doqiCjPlXtlZUHSAxWRujtQdV8ywQaA-v_KbyNNUTzXZx-G-vWObyh6tMGXr_1EpyHGfB_HBFcFesy_O58fGEp5te73lhTsp3ZmieUg',
    address: 'Indiranagar 100ft Road, Bengaluru',
    lat: 12.9784,
    lng: 77.6408,
    menu: [],
  },
  {
    id: 'burger-king-co',
    name: 'Burger King & Co.',
    cuisines: ['Burgers', 'American', 'Beverages'],
    rating: 4.2,
    ratingCount: '5.1k',
    deliveryTime: '20-25 mins',
    distance: '1.5 km',
    costForTwo: 350,
    offerText: 'Items at ₹149',
    isFreeDelivery: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtJyhjLloAdfIaK1m4eEZZvROOcgHDStHwGLCv29-rNHVpALLshx96h2SGeozUsnnNm4Z4akTqpfX8qdWcHYTKAoJCXvlhO-Q0DSO0X5pEaAMl7b33KndGhBI0Wm8iQ3fdzFU9oOK4d4I9Z2je6iAwXC5C1sd_-FcxK5ddLZpwMyi50RKLYPRysWiYCXlOYqAPztvXeNPHzkVFFIVt5CsLwZnaP5S0-v97vsBEYMWlM0_duxlbFc5jaA',
    address: 'CMH Road, Indiranagar, Bengaluru',
    lat: 12.9782,
    lng: 77.6433,
    menu: [],
  },
  {
    id: 'trattoria-bella-napoli',
    name: 'Trattoria Bella Napoli',
    cuisines: ['Italian', 'Wood-fired Pizza', 'Pasta'],
    rating: 4.8,
    ratingCount: '3.9k',
    deliveryTime: '25-30 mins',
    distance: '1.8 km',
    costForTwo: 650,
    offerText: '60% OFF up to $12',
    isFreeDelivery: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Vm46Ts8Fm8dGD0fteG4hgk-i-b3jeodJ7WVP4dK-OH9c8bmvOdN9tZ0RX8lPFm6c7NBnwkIlPWlMqm6hw0tjk3YX9NlnX9tDC1uV7RsCnF3Sze1X_h294GnFx2nTdnq0V9BJwR0Grg0YPv_nzO79Bp7V6vJZbfEHs3KySahqBEDOj2d9UIE5ELFpHDNwIa7OPVf7zVDjp6Yk9XlfgqHh102UlxsYQVDqlu2VTOjEk21PNrrqjg-9Vg',
    address: '24 Street, Park Ave, Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    menu: [],
  },
  {
    id: 'sakura-ramen',
    name: 'Sakura Ramen & Sushi Bar',
    cuisines: ['Japanese', 'Ramen', 'Sushi', 'Asian'],
    rating: 4.6,
    ratingCount: '2.8k',
    deliveryTime: '15-20 mins',
    distance: '0.9 km',
    costForTwo: 900,
    offerText: 'BOGO Free Appetizer',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbgs8A9OHFgPtEBoZpCPaopvyG0AFKds3ZOJrVaDz9eOZWCl9Fdo7XRuZnR-duv2xkZeYl2bGrfAEzCBCFzJyZ-ZfU1id1xWC_5h5icmsLGxIb95WT0aE2b80FVrH7mve_ezWOp3JJKdD5L0x3gbTwLses3dEeOiDLKCVmvEHUU_3MiiI0X6fLAY2qtyN6B5nm3hK8KvZi-ACw2eEsLYDITbzUf87pYxB6ugK3jsuqEUhl45AMRb8lRg',
    address: 'HAL 2nd Stage, Indiranagar',
    lat: 12.9698,
    lng: 77.6499,
    menu: [],
  },
  {
    id: 'the-burger-joint',
    name: 'The Burger Joint Craft Co.',
    cuisines: ['American', 'Burgers', 'Fries', 'Shakes'],
    rating: 4.4,
    ratingCount: '4.2k',
    deliveryTime: '35-40 mins',
    distance: '3.2 km',
    costForTwo: 450,
    offerText: 'Flat $5 OFF',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqCBOTN68zotO0yq8VLgsz9IhBhgnIK1n4p3k__GCdKELqE6CK4APwZIoYUkPHef3GcdtatwbS_GfMfN4Kd4U-vNxRCsOjo7AYjFgyUco4ZSVtcWJ32hadY19vMk1D0V3zQcqW3qEw0ewgc5si2uj89q75-MmBsc-9rAVhxY_SkKDQsA2bjOyHNIMWd01I4RSh0glb-JgzoGYCERxiHlqKixDaCyv6geOOQyIhj_yHGP7Vs1oz1zSsg',
    address: 'Double Road, Indiranagar',
    lat: 12.9654,
    lng: 77.6321,
    menu: [],
  },
  {
    id: 'behrouz-biryani',
    name: 'Behrouz Biryani',
    cuisines: ['Biryani', 'North Indian', 'Kebabs'],
    rating: 4.4,
    ratingCount: '6.7k',
    deliveryTime: '28 mins',
    distance: '2.1 km',
    costForTwo: 550,
    offerText: '60% OFF up to $120',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtIs9PDRI0u2TgMRRtUkTJcyfhhVI_mPC2Icjz2I9OnLYmJzkEdIS6PsC0cO-fa4w4gIzHSP7aAWkLa51azuHNsqhbYBwHx_hpoIvUSkaMCPSjyK-Dmd6X9179jIF2RvgZIlYaseprUdukVvuWND685T-Bq2lxll3OdCOB5jBbF4qwNYstQFztdkVET3thzw3dVhampzcH6J-TC09ZdB2yUVenrsqAZ-DNVVg_dcmR1PUyxW-6a3qOSA',
    address: 'Defence Colony, Indiranagar',
    lat: 12.973,
    lng: 77.6412,
    menu: [],
  },
];

// Seed initial active order (#SWG-84920) matching user screenshots
export const INITIAL_ACTIVE_ORDER: ActiveOrder = {
  id: '#SWG-84920',
  restaurantId: 'tuscany-pizza',
  restaurantName: 'Tuscany Wood-Fired Pizza',
  restaurantAddress: 'Spice Route Kitchen • 1.2 km away',
  restaurantImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnEUx89WzmoG2rTqhsN6h8YhKZQtqEMryL-pzBuEgcZCiQr5ap10LM3cgkxmGx_eIM6gptSYDUsZgDVdO1tWaB5zf9vkrhpo257qzcMaWQIl3VDjg4GYQqDvFDxe2f_kIPIkCR5UjBBg3xIIfNuqu0OgoxqZOQWFP_C_iRH2qJSbmYGrqPFLM70fGlgcKvR46Nbf6aIOKyt1kvkLJvf7HU1poMi_I0oOyU0raRG587u2626EjJnOAawg',
  placedAt: '8:15 PM',
  estimatedDeliveryTime: '8:42 PM',
  remainingMinutes: 14,
  status: 'picked_up',
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
      addressDescription: 'Next turn on MG Road • 1.2 km away',
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
      current: true,
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
      orderId: '#SWG-84920',
      sender: 'system',
      senderName: 'DELIVR System',
      text: 'Ramesh Kumar has been assigned to your order.',
      timestamp: '8:22 PM',
    },
    {
      id: 'msg-2',
      orderId: '#SWG-84920',
      sender: 'driver',
      senderName: 'Ramesh Kumar',
      text: 'Hello Aarav! I have picked up your hot pizza from Spice Route Kitchen and I am on the way.',
      timestamp: '8:29 PM',
    },
  ],
  routeCoordinates: [
    [18, 78], // Restaurant location % (x, y)
    [30, 68],
    [42, 54],
    [56, 42],
    [68, 32],
    [80, 22], // Customer location %
  ],
  driverProgressPercent: 45,
};

export const PAST_ORDERS = [
  {
    id: '#8831',
    restaurantName: 'Burger & Co. Artisan',
    date: 'Oct 14, 2023',
    total: 38.5,
    status: 'Delivered',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBifWebT1xrp4-GrGXtBeYhGaKs4LCPTEF_DAM1LXFnoeDcxP-TZXY34b1T8f7XkpMvh9t1Kc-HvicmY22C2GTkxmZQ41HmFjFuH5kTW3sTw5O-D1_tbQ_CyUieAmeIrHKFyrKDZM_U_61d3n1STti3-5J-9hXaL2HYDnAVP1FT81hGi0L_QWyJKNwrwnhL0QC44WrqhsXaC2yCB3liDNIwS6buvSQ_VK_yKQrKxKLE80s7-aQ3zBy0Pw',
    items: [
      { name: '2x Double Truffle Smash Burger', price: 31.0 },
      { name: '1x Loaded Truffle Fries', price: 7.5 },
    ],
    rating: 5,
  },
  {
    id: '#7621',
    restaurantName: 'Zenith Poke & Sushi',
    date: 'Sep 29, 2023',
    total: 22.5,
    status: 'Delivered',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2jZjnGf25fQFNo6iEd1xKqC__HnQF2knVm0oXuWUnMAf3zKp3bRPt1ySkoSofB8s83pZkUTuMZYq70MEae5h7NZ98U2EV0912QBnOrezUVzXhLkdskGQ6CNCl0G5dxpP8KHplPKDOggTyouFtkRGh0sZoq6gJeQw8idX2zCltMOgqjgi8w5SZBImABRiPXPsT3YsNRGwbdG7B6Qpbw09c3QM8AMBpfxw44rBelsplsNAztXJ5aRTU8g',
    items: [
      { name: '1x Spicy Salmon Avocado Bowl', price: 18.5 },
      { name: '1x Miso Soup', price: 4.0 },
    ],
    rating: 5,
  },
];

export const PAST_ORDERS_DATA = [
  {
    id: '#SWG-72910',
    restaurantId: 'toit-pizzeria',
    restaurantName: 'Toit Pizzeria & Brewpub',
    restaurantImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnA0mVmQJe7XOp_uoClZFmSuc_ryjnL4YH0oCG2nMnJ2RqGEwJVF4edYlPBkFnskmaniP-MapRQj-0wLqHLYpX09LQkQAf6oa_NBGcd_qMhsp6jK3xhS95Nr_GtDKyVGtj_axkIDNnoe3CQ63doqiCjPlXtlZUHSAxWRujtQdV8ywQaA-v_KbyNNUTzXZx-G-vWObyh6tMGXr_1EpyHGfB_HBFcFesy_O58fGEp5te73lhTsp3ZmieUg',
    date: 'Yesterday, 8:45 PM',
    status: 'Delivered',
    totalPaid: 840,
    items: [
      { name: 'Truffle Mushroom Pizza', quantity: 1 },
      { name: 'Garlic Herb Focaccia', quantity: 1 },
    ],
  },
  {
    id: '#SWG-61049',
    restaurantId: 'burger-king-co',
    restaurantName: 'Burger King & Co.',
    restaurantImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtJyhjLloAdfIaK1m4eEZZvROOcgHDStHwGLCv29-rNHVpALLshx96h2SGeozUsnnNm4Z4akTqpfX8qdWcHYTKAoJCXvlhO-Q0DSO0X5pEaAMl7b33KndGhBI0Wm8iQ3fdzFU9oOK4d4I9Z2je6iAwXC5C1sd_-FcxK5ddLZpwMyi50RKLYPRysWiYCXlOYqAPztvXeNPHzkVFFIVt5CsLwZnaP5S0-v97vsBEYMWlM0_duxlbFc5jaA',
    date: '14 May, 1:20 PM',
    status: 'Delivered',
    totalPaid: 420,
    items: [{ name: 'Crispy Chicken Whopper', quantity: 2 }],
  },
  {
    id: '#SWG-55192',
    restaurantId: 'meghana-foods',
    restaurantName: 'Behrouz Biryani',
    restaurantImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtIs9PDRI0u2TgMRRtUkTJcyfhhVI_mPC2Icjz2I9OnLYmJzkEdIS6PsC0cO-fa4w4gIzHSP7aAWkLa51azuHNsqhbYBwHx_hpoIvUSkaMCPSjyK-Dmd6X9179jIF2RvgZIlYaseprUdukVvuWND685T-Bq2lxll3OdCOB5jBbF4qwNYstQFztdkVET3thzw3dVhampzcH6J-TC09ZdB2yUVenrsqAZ-DNVVg_dcmR1PUyxW-6a3qOSA',
    date: '2 May, 9:10 PM',
    status: 'Delivered',
    totalPaid: 950,
    items: [{ name: 'Dum Gosht Biryani', quantity: 1 }],
  },
];

