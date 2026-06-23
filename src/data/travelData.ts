export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  toursCount: number;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tour {
  id: string;
  title: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  highlights: string[];
  gallery: string[];
  itinerary: ItineraryItem[];
  included: string[];
  excluded: string[];
  faqs: FAQItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export const destinations: Destination[] = [
  {
    id: "arbaminch",
    name: "Arbaminch",
    image: "/assets/destinations/arbaminch.jpg",
    description: "The gateway to southern Ethiopia, famous for its lush forests, natural springs, and panoramic views of two rift valley lakes.",
    toursCount: 15,
  },
  {
    id: "dorze-village",
    name: "Dorze Village",
    image: "/assets/destinations/dorze.jpg",
    description: "Known for its beehive-shaped cotton-woven huts, traditional weaving culture, and energetic community celebrations.",
    toursCount: 8,
  },
  {
    id: "nechsar-park",
    name: "Nechsar Park",
    image: "/assets/destinations/nechsar park.jpg",
    description: "A spectacular national park spanning the 'Bridge of God' between Lake Chamo and Lake Abaya, home to diverse wildlife.",
    toursCount: 10,
  },
  {
    id: "omo-valley",
    name: "Omo Valley",
    image: "/assets/destinations/omo valley.jpg",
    description: "Renowned for its extraordinary cultural diversity, hosting unique tribal communities like the Mursi, Hamer, and Karo.",
    toursCount: 6,
  },
  {
    id: "bale-mountains",
    name: "Bale Mountains National Park",
    image: "/assets/destinations/bale mountains national park.webp",
    description: "Famous for its Afro-alpine plateau, endemic wildlife including the Ethiopian wolf, and stunning mountain peaks.",
    toursCount: 12,
  },
  {
    id: "lake-chamo",
    name: "Lake Chamo",
    image: "/assets/destinations/lake chamo.jpg",
    description: "A spectacular Rift Valley lake famous for the 'crocodile market' where huge Nile crocodiles and hippos bask on the shores.",
    toursCount: 14,
  },
];

export const tours: Tour[] = [
  {
    id: "bale-mountains-trek",
    title: "Bale Mountains Wildlife Trek",
    duration: "10 Days / 9 Nights",
    price: "$2,450",
    rating: 4.9,
    image: "/assets/destinations/bale mountains national park.webp",
    description: "Explore the pristine Afro-alpine ecosystem of Bale Mountains, tracking the endemic Ethiopian wolf and hiking high peaks.",
    tags: ["Wildlife", "Trekking", "Nature"],
    highlights: [
      "Track the endangered Ethiopian Wolf in Web Valley",
      "Hike across the unique Sanetti Plateau above 4,000m",
      "Explore the Harenna Forest, one of the largest cloud forests",
      "Ascend Mount Tullu Dimtu, the second-highest peak in Ethiopia"
    ],
    gallery: [
      "/assets/destinations/bale mountains national park.webp",
      "/assets/destinations/omo valley.jpg",
      "/assets/destinations/lake chamo.jpg",
      "/assets/destinations/arbaminch.jpg"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Addis Ababa", description: "Arrive at Bole International Airport. Meet your luxury travel coordinator and transfer to the Hyatt Regency. Evening welcome dinner with traditional music and coffee ceremony." },
      { day: 2, title: "Drive to Dinsho (Bale Mountains HQ)", description: "Travel south into the Rift Valley, ascending into the Bale highlands. Walk through Dinsho juniper woodlands to spot Mountain Nyala and Menelik's Bushbuck." },
      { day: 3, title: "Trek Dinsho to Mararo", description: "Begin trekking through beautiful alpine ridges and valleys, spotting diverse highland birds and endemic rodent species." },
      { day: 4, title: "Trek Mararo to Worgona", description: "Cross spectacular valleys and camp near the Worgona River, surrounded by lava flows and towering volcanic peaks." },
      { day: 5, title: "Trek Worgona to Wasama", description: "Trek through the Wasama Valley, observing unique geological formations and endemic flora like the Giant Lobelia." },
      { day: 6, title: "Trek Wasama to Sanetti Plateau", description: "Ascend onto the vast Sanetti Plateau. Walk among the high-altitude lakes and track the rare Ethiopian Wolf." },
      { day: 7, title: "Mount Tullu Dimtu & Descent to Harenna", description: "Summit Mount Tullu Dimtu (4,377m) for epic panoramic views. Drive down the dramatic southern escarpment into the lush Harenna Cloud Forest." },
      { day: 8, title: "Harenna Forest Walk & Coffee Tasting", description: "Explore the Harenna cloud forest, search for forest monkeys, and enjoy wild coffee picked directly from the organic forest floor." },
      { day: 9, title: "Return to Addis Ababa", description: "Drive back north through the Great Rift Valley lakes to Addis Ababa. Dine at the iconic cultural restaurant Yod Abyssinia." },
      { day: 10, title: "Departure", description: "Transfer to Bole International Airport for your international departure flight home. Safe travels!" }
    ],
    included: [
      "Domestic air tickets or premium 4x4 private transport",
      "5-star hotel accommodations & luxury eco-lodges",
      "Professional English-speaking local historians & national guides",
      "All park entry fees, scouts, and trekking permits",
      "All entrance fees to cultural and historical monuments",
      "All meals (Breakfast, Lunch, Dinner) & bottled spring water"
    ],
    excluded: [
      "International flights and airport visa fees",
      "Travel insurance (highly recommended)",
      "Alcoholic beverages & personal expenditures",
      "Gratuities/tips for local guides, scouts, and drivers"
    ],
    faqs: [
      { question: "Is the trekking difficulty high in Bale?", answer: "The trek is moderate but takes place at high altitudes (3,000m - 4,300m). Acclimatization is highly recommended." },
      { question: "What wildlife will we see?", answer: "Bale is home to the Ethiopian Wolf, Mountain Nyala, Menelik's Bushbuck, and over 300 bird species." },
      { question: "What is the best season to trek?", answer: "The dry season, from October to April, is best for trekking and clear skies." }
    ]
  },
  {
    id: "dorze-omo-cultural",
    title: "Dorze & Omo Cultural Tour",
    duration: "12 Days / 11 Nights",
    price: "$2,850",
    rating: 5.0,
    image: "/assets/destinations/omo valley.jpg",
    description: "Journey into the cultural heart of southern Ethiopia, experiencing the unique traditions of the Dorze, Hamer, and Mursi tribes.",
    tags: ["Culture", "Photography", "Adventure"],
    highlights: [
      "Stay in the unique beehive huts of the Dorze people",
      "Witness a traditional Hamer Bull Jumping ceremony",
      "Visit the famous lip-plated Mursi tribe in Mago National Park",
      "Cross the Omo River to visit the Dassanech community"
    ],
    gallery: [
      "/assets/destinations/omo valley.jpg",
      "/assets/destinations/dorze.jpg",
      "/assets/destinations/lake chamo.jpg",
      "/assets/destinations/bale mountains national park.webp"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Addis Ababa", description: "Arrive in Addis. Luxury airport pickup and transfer to Sheraton Addis. Enjoy a quiet relaxation day." },
      { day: 2, title: "Drive to Arbaminch via Tiya", description: "Drive south through the Rift Valley, stopping at the UNESCO stelae site of Tiya. Arrive in Arbaminch." },
      { day: 3, title: "Dorze Village Cultural Experience", description: "Ascend into the Guge Hills to visit Dorze. Experience weaving, taste Kocho (bread made from false banana), and sleep in a beehive hut." },
      { day: 4, title: "Boat Safari on Lake Chamo & Jinka", description: "Enjoy a morning boat safari on Lake Chamo to spot hippos and huge crocodiles. Continue the drive to Jinka." },
      { day: 5, title: "Mursi Village (Mago National Park)", description: "Drive into Mago National Park to visit the Mursi people, famous for their unique clay lip plates and body decorations." },
      { day: 6, title: "Drive to Turmi (Home of the Hamer)", description: "Travel to Turmi. Meet the Hamer people, known for their elaborate hairstyles, clay head-dresses, and leather garments." },
      { day: 7, title: "Hamer Market & Bull Jumping", description: "Visit a bustling local market in Turmi. With luck, witness the sacred Bull Jumping ceremony, a Hamer rite of passage." },
      { day: 8, title: "Omorate Excursion (Dassanech Tribe)", description: "Drive to Omorate on the Kenyan border. Cross the Omo River in a dugout canoe to visit a Dassanech village." },
      { day: 9, title: "Drive to Konso Cultural Landscape", description: "Travel to Konso. Explore the UNESCO-registered terraced stone villages and learn about Konso wooden waga stelae." },
      { day: 10, title: "Return to Arbaminch", description: "Drive back to Arbaminch, checking into the premium Paradise Lodge overlooking the forest." },
      { day: 11, title: "Return Flight to Addis", description: "Fly from Arbaminch back to Addis. Celebrate with a grand farewell cultural dinner." },
      { day: 12, title: "Departure", description: "Concierge transfer to airport for final flight out." }
    ],
    included: [
      "All park entry permits and local tribal scout fees",
      "Private 4x4 Land Cruisers with expert drivers",
      "Vetted premium lodge accommodations",
      "Domestic air tickets (Arbaminch to Addis)",
      "Traditional guides and translators for tribal interactions"
    ],
    excluded: [
      "Camera/video fees in tribal villages (variable)",
      "Gratuities for local tribal guides",
      "International flights and travel insurance"
    ],
    faqs: [
      { question: "Is it okay to take photos in Omo Valley?", answer: "Yes, but local customs dictate asking first and paying a small fee per photo. Your guide will coordinate this." },
      { question: "What is the accommodation quality in Omo?", answer: "We book the absolute best available luxury eco-lodges, though utilities in remote Omo can occasionally be basic." }
    ]
  },
  {
    id: "arbaminch-chamo-excursion",
    title: "Arbaminch & Lake Chamo Excursion",
    duration: "3 Days / 2 Nights",
    price: "$550",
    rating: 4.8,
    image: "/assets/destinations/lake chamo.jpg",
    description: "A compact luxury getaway to Arbaminch, featuring boat safaris on Lake Chamo, hiking in Nechsar, and visiting the Dorze weavers.",
    tags: ["Lake Safari", "Wildlife", "Short Stay"],
    highlights: [
      "Spot huge crocodiles and hippos on Lake Chamo's shore",
      "Enjoy panoramic views of Lakes Chamo and Abaya from the Bridge of God",
      "Hike the grasslands of Nechsar National Park",
      "Sip local drinks and taste traditional flatbread in Dorze"
    ],
    gallery: [
      "/assets/destinations/lake chamo.jpg",
      "/assets/destinations/nechsar park.jpg",
      "/assets/destinations/dorze.jpg",
      "/assets/destinations/arbaminch.jpg"
    ],
    itinerary: [
      { day: 1, title: "Lake Chamo Crocodile Safari", description: "Arrive in Arbaminch. Take a private luxury boat safari on Lake Chamo, visiting the 'crocodile market' where huge Nile crocodiles bask alongside pods of hippos." },
      { day: 2, title: "Nechsar Wildlife Drive & Dorze Village", description: "Embark on an early morning safari in Nechsar National Park across the 'Bridge of God'. In the afternoon, ascend the mountains to Dorze Village to learn about cotton weaving." },
      { day: 3, title: "Forty Springs Walk & Departure", description: "Take a walking tour of the local Forty Springs (Arba Minch) from which the city gets its name. Transfer to the airport for your flight back to Addis." }
    ],
    included: [
      "2 nights luxury accommodation in Arbaminch",
      "Private vehicle and expert driver guide",
      "All park, boat, and community entry fees",
      "Traditional dinners and coffee tastings"
    ],
    excluded: [
      "Visa fees",
      "Tips and personal items"
    ],
    faqs: [
      { question: "Are we close to the crocodiles on Lake Chamo?", answer: "Yes, the boat gets quite close, but our experienced captain keeps a safe, professional distance." }
    ]
  },
  {
    id: "nechsar-rift-valley",
    title: "Nechsar & Rift Valley Adventure",
    duration: "8 Days / 7 Nights",
    price: "$1,950",
    rating: 4.9,
    image: "/assets/destinations/nechsar park.jpg",
    description: "Explore the beautiful lakes, wildlife, and community cultures of the Great Rift Valley, with a deep dive into Nechsar National Park.",
    tags: ["Safari", "Nature", "Comfort"],
    highlights: [
      "Safari in Nechsar National Park for Swayne's Hartebeest",
      "Boat safari on Lake Chamo to see the crocodile market",
      "Explore Rift Valley lakes like Langano and Ziway",
      "Interact with local Konso and Dorze communities"
    ],
    gallery: [
      "/assets/destinations/nechsar park.jpg",
      "/assets/destinations/omo valley.jpg",
      "/assets/destinations/dorze.jpg",
      "/assets/destinations/bale mountains national park.webp"
    ],
    itinerary: [
      { day: 1, title: "Addis Ababa Introduction", description: "Arrive in Addis, check into Hyatt. Welcome dinner and orientation." },
      { day: 2, title: "Drive to Lake Langano Eco-Lodge", description: "Drive south, stopping at Lake Ziway for birdwatching. Check into a premium eco-lodge on the shores of sandy Lake Langano." },
      { day: 3, title: "Drive to Arbaminch via Alaba", description: "Drive to Arbaminch. Visit an Alaba village to see traditional painted houses. Check into Paradise Lodge." },
      { day: 4, title: "Nechsar National Park Safari", description: "Spend a full day exploring Nechsar Park's plains and forest, seeking zebra, baboons, and Swayne's Hartebeest." },
      { day: 5, title: "Lake Chamo Safari & Dorze", description: "Morning boat trip on Lake Chamo. Afternoon excursion to Dorze mountain village to see the giant cotton huts." },
      { day: 6, title: "Konso Terraced Landscape", description: "Day trip to Konso, exploring the fortified hilltop stone towns, a masterpiece of agricultural terracing." },
      { day: 7, title: "Return drive to Addis Ababa", description: "Drive back to Addis, enjoying lakeside views. Farewell dinner with live music." },
      { day: 8, title: "Departure", description: "Airport transfer and departure." }
    ],
    included: [
      "All accommodations, local transfers, and private ground transport",
      "Hands-on cultural cooking classes and coffee harvesting experiences",
      "Elite tour managers and local guides"
    ],
    excluded: [
      "Alcoholic beverages",
      "Gratuities and personal items"
    ],
    faqs: [
      { question: "Is swimming safe in the Rift Valley lakes?", answer: "Lake Langano is bilharzia-free and completely safe for swimming. Lake Chamo is not suitable for swimming due to crocodiles." }
    ]
  }
];

export const features: Feature[] = [
  {
    id: "expert-guides",
    title: "Expert Guides",
    description: "Our licensed local historians and naturalists bring Ethiopia's deep heritage and landscapes to life with expert knowledge.",
    iconName: "Compass",
  },
  {
    id: "affordable-pricing",
    title: "Affordable Pricing",
    description: "Luxury service doesn't have to be overpriced. We offer the best value-to-luxury ratio for all customizable packages.",
    iconName: "DollarSign",
  },
  {
    id: "custom-packages",
    title: "Custom Packages",
    description: "Tailor your itinerary exactly to your timeline, interests, and comfort requirements. We make custom dreams a reality.",
    iconName: "Sliders",
  },
  {
    id: "safe-travel",
    title: "Safe Travel",
    description: "Your safety is our absolute priority. We provide secure transport, vetted premium hotels, and constant regional monitoring.",
    iconName: "ShieldCheck",
  },
  {
    id: "support-24-7",
    title: "24/7 Support",
    description: "Our dedicated concierge desk is available day and night to assist you with active trip modifications or general inquiries.",
    iconName: "Clock",
  },
  {
    id: "fast-booking",
    title: "Fast Booking",
    description: "Experience hassle-free reservations with instant digital confirmation, fast visa assistance, and flexible cancellation policies.",
    iconName: "CheckCircle",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Eleanor Vance",
    role: "Cultural Anthropologist, UK",
    content: "My trip to the Omo Valley and Dorze with Travel With Mercy was extraordinary. The guides were exceptionally knowledgeable, and the hospitality was luxury at its finest. Highly recommend for any traveler wanting a deeper connection.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "t2",
    name: "Marcus Dupont",
    role: "Photographer, France",
    content: "The Bale Mountains trek was spectacular. Every detail was curated. The crew, the tents, and the meals surpassed my expectations for a remote mountain trek. Capturing the Ethiopian Wolf was a life milestone.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "t3",
    name: "Sofia Al-Mansoor",
    role: "Executive, UAE",
    content: "We requested a bespoke southern package for our family. The coordination was flawless. Secure Mercedes transport, five-star heritage hotels, and customized pacing for our kids. A five-star agency.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    "id": "g1",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(1).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (1)",
    "category": "Heritage"
  },
  {
    "id": "g2",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(2).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (2)",
    "category": "Heritage"
  },
  {
    "id": "g3",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(3).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (3)",
    "category": "Heritage"
  },
  {
    "id": "g4",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(4).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (4)",
    "category": "Heritage"
  },
  {
    "id": "g5",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(5).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (5)",
    "category": "Heritage"
  },
  {
    "id": "g6",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(6).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (6)",
    "category": "Heritage"
  },
  {
    "id": "g7",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(7).jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze (7)",
    "category": "Heritage"
  },
  {
    "id": "g8",
    "url": "/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze.jpg",
    "caption": "Memories from Southern Ethiopia: #Day2 in #Arbaminch and #Dorze",
    "category": "Heritage"
  },
  {
    "id": "g9",
    "url": "/assets/gallery/%23Travel_with_Mercy%20%23Day_One_in_Arbaminch_Ethiopia%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(1).jpg",
    "caption": "Memories from Southern Ethiopia: #Travel with Mercy #Day One in Arbaminch Ethiopia💚💛❤️ (1)",
    "category": "Heritage"
  },
  {
    "id": "g10",
    "url": "/assets/gallery/%23%E1%8B%B0%E1%89%A1%E1%89%A5_%E1%8A%A6%E1%88%9E_%E1%8A%AB%E1%88%AE_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(1).jpg",
    "caption": "Memories from Southern Ethiopia: #ደቡብ ኦሞ ካሮ ኢትዮዽያ💚💛❤️ (1)",
    "category": "Heritage"
  },
  {
    "id": "g11",
    "url": "/assets/gallery/%23%E1%8B%B0%E1%89%A1%E1%89%A5_%E1%8A%A6%E1%88%9E_%E1%8A%AB%E1%88%AE_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(2).jpg",
    "caption": "Memories from Southern Ethiopia: #ደቡብ ኦሞ ካሮ ኢትዮዽያ💚💛❤️ (2)",
    "category": "Heritage"
  },
  {
    "id": "g12",
    "url": "/assets/gallery/%23%E1%8B%B0%E1%89%A1%E1%89%A5_%E1%8A%A6%E1%88%9E_%E1%8A%AB%E1%88%AE_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F.jpg",
    "caption": "Memories from Southern Ethiopia: #ደቡብ ኦሞ ካሮ ኢትዮዽያ💚💛❤️",
    "category": "Heritage"
  },
  {
    "id": "g13",
    "url": "/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(1).jpg",
    "caption": "Memories from Southern Ethiopia: #ዳሰነች ኦሞራቴ ኢትዮዽያ💚💛❤️ (1)",
    "category": "Heritage"
  },
  {
    "id": "g14",
    "url": "/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(2).jpg",
    "caption": "Memories from Southern Ethiopia: #ዳሰነች ኦሞራቴ ኢትዮዽያ💚💛❤️ (2)",
    "category": "Heritage"
  },
  {
    "id": "g15",
    "url": "/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(3).jpg",
    "caption": "Memories from Southern Ethiopia: #ዳሰነች ኦሞራቴ ኢትዮዽያ💚💛❤️ (3)",
    "category": "Heritage"
  },
  {
    "id": "g16",
    "url": "/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F.jpg",
    "caption": "Memories from Southern Ethiopia: #ዳሰነች ኦሞራቴ ኢትዮዽያ💚💛❤️",
    "category": "Heritage"
  },
  {
    "id": "g17",
    "url": "/assets/gallery/A%20huge%20shoutout%20to%20the%20amazing%20tourist%20guide%20Ethiopia%20Mak%20ToursI%20recently%20traveled%20to%20Southern%20E.jpg",
    "caption": "Memories from Southern Ethiopia: A huge shoutout to the amazing tourist guide Ethiopia Mak ToursI recently traveled to Southern E",
    "category": "Heritage"
  },
  {
    "id": "g18",
    "url": "/assets/gallery/AQNqTfCQhCLp1Bj9f0yp5bsocisuImPJDx5DgQ4xI9DGq8MahhmzF1zw2qNvFiWjSZ3sdep4douqnVSZJFbNdSpfbZiI1ezX.mp4",
    "caption": "Memories from Southern Ethiopia: Scenic Highlights",
    "category": "Nature"
  },
  {
    "id": "g19",
    "url": "/assets/gallery/Great%20things%20never%20come%20from%20comfort%20zones%20%20%23%E1%8A%A5%E1%8B%A8%E1%8D%88%E1%8C%8B%E1%8A%95_%E1%8B%88%E1%8C%88%E1%8A%95%E2%9C%8C%EF%B8%8F.jpg",
    "caption": "Memories from Southern Ethiopia: Great things never come from comfort zones #እየፈጋን ወገን✌️",
    "category": "Heritage"
  },
  {
    "id": "g20",
    "url": "/assets/gallery/IMG_2620.JPG",
    "caption": "Memories from Southern Ethiopia: IMG 2620",
    "category": "Heritage"
  },
  {
    "id": "g21",
    "url": "/assets/gallery/IMG_2621.JPG",
    "caption": "Memories from Southern Ethiopia: IMG 2621",
    "category": "Heritage"
  },
  {
    "id": "g22",
    "url": "/assets/gallery/IMG_2622.JPG",
    "caption": "Memories from Southern Ethiopia: IMG 2622",
    "category": "Heritage"
  },
  {
    "id": "g23",
    "url": "/assets/gallery/Peace%20grows%20where%20respect%20lives.%20Celebrate%20cultures%2C%20spread%20kindness%2C%20and%20treat%20everyone%20with%20di.jpg",
    "caption": "Memories from Southern Ethiopia: Peace grows where respect lives. Celebrate cultures, spread kindness, and treat everyone with di",
    "category": "Heritage"
  },
  {
    "id": "g24",
    "url": "/assets/gallery/photo_10_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 10 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g25",
    "url": "/assets/gallery/photo_11_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 11 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g26",
    "url": "/assets/gallery/photo_15_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 15 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g27",
    "url": "/assets/gallery/photo_16_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 16 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g28",
    "url": "/assets/gallery/photo_19_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 19 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g29",
    "url": "/assets/gallery/photo_20_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 20 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g30",
    "url": "/assets/gallery/photo_21_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 21 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g31",
    "url": "/assets/gallery/photo_22_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 22 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g32",
    "url": "/assets/gallery/photo_23_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 23 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g33",
    "url": "/assets/gallery/photo_28_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 28 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g34",
    "url": "/assets/gallery/photo_29_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 29 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g35",
    "url": "/assets/gallery/photo_33_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 33 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g36",
    "url": "/assets/gallery/photo_3_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 3 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g37",
    "url": "/assets/gallery/photo_5_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 5 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g38",
    "url": "/assets/gallery/photo_7_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 7 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g39",
    "url": "/assets/gallery/photo_8_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 8 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g40",
    "url": "/assets/gallery/photo_9_2026-06-23_13-36-13.jpg",
    "caption": "Memories from Southern Ethiopia: photo 9 2026-06-23 13-36-13",
    "category": "Heritage"
  },
  {
    "id": "g41",
    "url": "/assets/gallery/%E1%89%B5%E1%8A%95%E1%88%BD%20%E1%89%B3%E1%88%98%E1%88%9D%E1%8A%95%20%E1%8A%A5%E1%8A%93%20%E1%8A%A0%E1%88%B5%E1%89%B3%E1%88%9B%E1%88%9A%E1%8B%AB%E1%89%BD%E1%8A%95%E1%8A%95%20%E1%8A%A5%E1%8A%93%20%E1%89%80%E1%89%A3%E1%88%AD%E1%8B%AB%E1%89%BD%E1%8A%95%E1%8A%95%20%E1%88%88%E1%8B%A8%E1%8A%95%E1%89%A0%E1%89%B5.jpg",
    "caption": "Memories from Southern Ethiopia: ትንሽ ታመምን እና አስታማሚያችንን እና ቀባርያችንን ለየንበት",
    "category": "Heritage"
  },
  {
    "id": "g42",
    "url": "/assets/gallery/%E1%8B%B0%E1%88%B5%20%E1%8B%A8%E1%88%9A%E1%88%8D%20%E1%89%80%E1%8A%95%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F.mp4",
    "caption": "Memories from Southern Ethiopia: ደስ የሚል ቀን💚💛❤️",
    "category": "Nature"
  }
];
