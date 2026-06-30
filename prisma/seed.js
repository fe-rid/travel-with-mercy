const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clear existing data
  await prisma.booking.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.websiteSettings.deleteMany();

  console.log('Existing database tables cleared.');

  // 2. Seed Default Admin
  const adminPasswordHash = bcrypt.hashSync('ChangeMe123!', 10);
  const defaultAdmin = await prisma.admin.create({
    data: {
      name: 'Travel With Mercy Admin',
      email: 'admin@travelwithmercy.com',
      passwordHash: adminPasswordHash,
      role: 'Admin',
    },
  });
  console.log('Seeded default admin account.');

  // 3. Seed Website Settings
  const settings = await prisma.websiteSettings.create({
    data: {
      id: 'singleton',
      companyName: 'Travel With Mercy',
      email: 'travelwithmercy15@gmail.com',
      phone: '+251 912 826 488',
      address: 'Bole District, Imperial Road, Addis Ababa, Ethiopia',
      facebook: 'https://www.facebook.com/share/1LfVqrheuK/?mibextid=wwXIfr',
      instagram: 'https://www.instagram.com/travel_with_mercy15?igsh=MWI0cGJzMjRuY3pvaA%3D%3D&utm_source=qr',
      tiktok: 'https://www.tiktok.com/@travelwithmercy12?_r=1&_t=ZS-97N1ZbyxIgB',
      heroTitle: 'Experience Luxury Travel in Ethiopia',
      heroSubtitle: 'Bespoke, private, and fully guided travel experiences through the historical and natural wonders of East Africa.',
    },
  });
  console.log('Seeded website settings.');

  // 4. Seed Destinations (6)
  const destData = [
    {
      id: 'arbaminch',
      name: 'Arbaminch',
      slug: 'arbaminch',
      description: 'The gateway to southern Ethiopia, famous for its lush forests, natural springs, and panoramic views of two rift valley lakes.',
      heroImage: '/assets/destinations/arbaminch.jpg',
      gallery: ['/assets/destinations/arbaminch.jpg', '/assets/destinations/lake chamo.jpg'],
      highlights: ['Forty Springs walk', 'Bridge of God views', 'Nechsar gate access']
    },
    {
      id: 'dorze-village',
      name: 'Dorze Village',
      slug: 'dorze-village',
      description: 'Known for its beehive-shaped cotton-woven huts, traditional weaving culture, and energetic community celebrations.',
      heroImage: '/assets/destinations/dorze.jpg',
      gallery: ['/assets/destinations/dorze.jpg'],
      highlights: ['Beehive hut architecture', 'Kocho bread preparation', 'Dorze traditional dance']
    },
    {
      id: 'nechsar-park',
      name: 'Nechsar Park',
      slug: 'nechsar-park',
      description: 'A spectacular national park spanning the "Bridge of God" between Lake Chamo and Lake Abaya, home to diverse wildlife.',
      heroImage: '/assets/destinations/nechsar park.jpg',
      gallery: ['/assets/destinations/nechsar park.jpg'],
      highlights: ['Swaynes Hartebeest spotting', 'Savannah grasslands', 'Bridge of God crossing']
    },
    {
      id: 'omo-valley',
      name: 'Omo Valley',
      slug: 'omo-valley',
      description: 'Renowned for its extraordinary cultural diversity, hosting unique tribal communities like the Mursi, Hamer, and Karo.',
      heroImage: '/assets/destinations/omo valley.jpg',
      gallery: ['/assets/destinations/omo valley.jpg'],
      highlights: ['Mursi lip plates', 'Hamer Bull Jumping ceremony', 'Dassanech Omo River crossing']
    },
    {
      id: 'bale-mountains',
      name: 'Bale Mountains National Park',
      slug: 'bale-mountains',
      description: 'Famous for its Afro-alpine plateau, endemic wildlife including the Ethiopian wolf, and stunning mountain peaks.',
      heroImage: '/assets/destinations/bale mountains national park.webp',
      gallery: ['/assets/destinations/bale mountains national park.webp'],
      highlights: ['Sanetti Plateau trek', 'Ethiopian Wolf sighting', 'Harenna forest wild coffee']
    },
    {
      id: 'lake-chamo',
      name: 'Lake Chamo',
      slug: 'lake-chamo',
      description: 'A spectacular Rift Valley lake famous for the "crocodile market" where huge Nile crocodiles and hippos bask on the shores.',
      heroImage: '/assets/destinations/lake chamo.jpg',
      gallery: ['/assets/destinations/lake chamo.jpg'],
      highlights: ['Crocodile Market boat safari', 'Hippo pods viewing', 'Pelican flocks watching']
    }
  ];

  for (const d of destData) {
    await prisma.destination.create({ data: d });
  }
  console.log('Seeded 6 destinations.');

  // 5. Seed Tour Packages (8)
  const toursData = [
    {
      id: 'bale-mountains-trek',
      title: 'Bale Mountains Wildlife Trek',
      slug: 'bale-mountains-wildlife-trek',
      description: 'Explore the pristine Afro-alpine ecosystem of Bale Mountains, tracking the endemic Ethiopian wolf and hiking high peaks.',
      price: '$2,450',
      duration: '10 Days / 9 Nights',
      destination: 'Bale Mountains National Park',
      heroImage: '/assets/destinations/bale mountains national park.webp',
      galleryImages: ['/assets/destinations/bale mountains national park.webp', '/assets/destinations/omo valley.jpg'],
      highlights: ['Track the endangered Ethiopian Wolf', 'Hike across Sanetti Plateau', 'Explore Harenna Forest'],
      itinerary: [
        { day: 1, title: 'Arrival in Addis Ababa', description: 'Arrive at Bole International Airport and transfer to hotel. Welcome dinner.' },
        { day: 2, title: 'Drive to Dinsho', description: 'Travel south to Bale Mountains HQ. Spot Mountain Nyala.' },
        { day: 3, title: 'Trek Dinsho to Mararo', description: 'Trek through beautiful ridges, spotting endemic highland birds.' }
      ],
      includedServices: ['All transport in 4x4 vehicles', 'Luxury eco-lodges & hotels', 'Master travel guide'],
      excludedServices: ['International flight tickets', 'Travel insurance', 'Tips and personal expenses'],
      featured: true,
      status: 'Published',
      faqs: [
        { question: 'Is the trekking difficulty high?', answer: 'The trek is moderate but at high altitudes. Acclimatization is recommended.' }
      ]
    },
    {
      id: 'dorze-omo-cultural',
      title: 'Dorze & Omo Cultural Tour',
      slug: 'dorze-and-omo-cultural-tour',
      description: 'Journey into the cultural heart of southern Ethiopia, experiencing the unique traditions of the Dorze, Hamer, and Mursi tribes.',
      price: '$2,850',
      duration: '12 Days / 11 Nights',
      destination: 'Omo Valley',
      heroImage: '/assets/destinations/omo valley.jpg',
      galleryImages: ['/assets/destinations/omo valley.jpg', '/assets/destinations/dorze.jpg'],
      highlights: ['Stay in Dorze beehive huts', 'Witness Hamer Bull Jumping', 'Visit lip-plated Mursi tribe'],
      itinerary: [
        { day: 1, title: 'Addis Ababa welcome', description: 'Airport pickup and transfer to Sheraton Addis.' },
        { day: 2, title: 'Drive to Arbaminch via Tiya', description: 'Stop at UNESCO stelae site of Tiya. Arrive in Arbaminch.' },
        { day: 3, title: 'Dorze Village Cultural Experience', description: 'Learn about weaving and sleep in beehive huts.' }
      ],
      includedServices: ['Vetted premium lodge accommodations', 'Tribal scout fees and entry permits', '4x4 transport'],
      excludedServices: ['Camera fees in tribal villages', 'Gratuities for local guides', 'Visa fees'],
      featured: true,
      status: 'Published',
      faqs: [
        { question: 'Is it okay to take photos?', answer: 'Yes, but local customs dictate asking first. Your guide will coordinate this.' }
      ]
    },
    {
      id: 'arbaminch-chamo-excursion',
      title: 'Arbaminch & Lake Chamo Excursion',
      slug: 'arbaminch-and-lake-chamo-excursion',
      description: 'A compact luxury getaway to Arbaminch, featuring boat safaris on Lake Chamo, hiking in Nechsar, and visiting the Dorze weavers.',
      price: '$550',
      duration: '3 Days / 2 Nights',
      destination: 'Arbaminch',
      heroImage: '/assets/destinations/lake chamo.jpg',
      galleryImages: ['/assets/destinations/lake chamo.jpg', '/assets/destinations/nechsar park.jpg'],
      highlights: ['Spot crocodiles & hippos on Lake Chamo', 'Panoramic views from Bridge of God', 'Visit Dorze village weavers'],
      itinerary: [
        { day: 1, title: 'Lake Chamo crocodile market', description: 'Boat safari on Lake Chamo to see crocodiles and hippos.' },
        { day: 2, title: 'Nechsar wildlife drive', description: 'Morning wildlife drive and afternoon Dorze village cultural visit.' },
        { day: 3, title: 'Forty springs walk', description: 'Walk through Arba Minch springs forest and fly back to Addis.' }
      ],
      includedServices: ['2 nights luxury lodging', 'Boat safari and park permits', 'Addis-Arbaminch flights'],
      excludedServices: ['Personal expenses', 'Tips for drivers and boat captains'],
      featured: false,
      status: 'Published',
      faqs: [
        { question: 'How close do we get to crocodiles?', answer: 'The boat gets quite close but maintains a safe, respectful distance.' }
      ]
    },
    {
      id: 'nechsar-rift-valley',
      title: 'Nechsar & Rift Valley Adventure',
      slug: 'nechsar-and-rift-valley-adventure',
      description: 'A luxury wildlife safari spanning Nechsar National Park, Lake Abaya, and key Rift Valley lakes with exclusive boat safaris.',
      price: '$1,950',
      duration: '8 Days / 7 Nights',
      destination: 'Nechsar Park',
      heroImage: '/assets/destinations/nechsar park.jpg',
      galleryImages: ['/assets/destinations/nechsar park.jpg', '/assets/destinations/lake chamo.jpg'],
      highlights: ['Savannah wildlife game drives', 'Scenic Rift Valley lakes', 'Hot springs exploration'],
      itinerary: [
        { day: 1, title: 'Drive to Lake Langano', description: 'Travel south to luxury resort on the shores of Lake Langano.' },
        { day: 2, title: 'Drive to Arbaminch', description: 'Travel further south, checking into Paradise Lodge.' }
      ],
      includedServices: ['Luxury hotels and lodges', 'Private safari cruiser', 'All entrance fees'],
      excludedServices: ['Alcoholic beverages', 'Laundry and tips'],
      featured: false,
      status: 'Published',
      faqs: [
        { question: 'What animals will we see?', answer: 'Zebras, gazelles, baboons, crocodiles, hippos, and abundant birds.' }
      ]
    },
    {
      id: 'lalibela-historic',
      title: 'Lalibela & Gonder Historic Route',
      slug: 'lalibela-and-gonder-historic-route',
      description: 'Explore the majestic rock-hewn churches of Lalibela, the imperial castles of Gonder, and the source of the Blue Nile.',
      price: '$2,200',
      duration: '7 Days / 6 Nights',
      destination: 'Heritage Sites',
      heroImage: '/assets/destinations/arbaminch.jpg', // Fallback image
      galleryImages: [],
      highlights: ['Visit 11 rock-hewn churches of Lalibela', 'Explore Gonder royal castles', 'Boat trip on Lake Tana'],
      itinerary: [
        { day: 1, title: 'Fly to Lalibela', description: 'Fly from Addis to Lalibela. Visit the first group of rock-hewn churches.' },
        { day: 2, title: 'Second group of Lalibela churches', description: 'Explore the remaining churches, including the iconic St. George.' }
      ],
      includedServices: ['Domestic flights within Ethiopia', 'Heritage hotels', 'Professional local guides'],
      excludedServices: ['International visa', 'Tips and personal shopping'],
      featured: true,
      status: 'Published',
      faqs: []
    },
    {
      id: 'danakil-depression',
      title: 'Danakil Depression Active Volcano Tour',
      slug: 'danakil-depression-active-volcano-tour',
      description: 'Witness the other-worldly landscapes of Dallol salt flats, trek to the active lava lake of Erta Ale volcano, and explore salt mines.',
      price: '$1,800',
      duration: '4 Days / 3 Nights',
      destination: 'Danakil Depression',
      heroImage: '/assets/destinations/omo valley.jpg', // Fallback image
      galleryImages: [],
      highlights: ['Trek to Erta Ale active lava lake', 'Explore colorful sulfur springs of Dallol', 'Witness camel caravans'],
      itinerary: [
        { day: 1, title: 'Fly to Semera & Drive to Dallol', description: 'Fly to Semera. Drive to the salt lake and Dallol region.' },
        { day: 2, title: 'Trek Erta Ale Volcano', description: 'Drive to the base of Erta Ale volcano and hike up to the crater.' }
      ],
      includedServices: ['Armed military escorts & local scouts', 'All camping equipment & meals', '4x4 transport'],
      excludedServices: ['Trekking shoes and gear', 'Personal tips'],
      featured: false,
      status: 'Published',
      faqs: []
    },
    {
      id: 'simien-trekking',
      title: 'Simien Mountains Trekking Adventure',
      slug: 'simien-mountains-trekking-adventure',
      description: 'Trek through the dramatic peaks and deep gorges of the Simien Mountains, home to Gelada baboons and Walia ibex.',
      price: '$1,650',
      duration: '6 Days / 5 Nights',
      destination: 'Simien Mountains',
      heroImage: '/assets/destinations/bale mountains national park.webp', // Fallback image
      galleryImages: [],
      highlights: ['Hike the peaks of Simien Mountains', 'Spot endemic Gelada baboons', 'Panoramic views of Jinbar waterfall'],
      itinerary: [
        { day: 1, title: 'Fly to Gonder & Drive to Sankaber', description: 'Fly to Gonder, drive to park entrance, and begin short trek to Sankaber.' },
        { day: 2, title: 'Trek Sankaber to Geech', description: 'Hike through scenic escarpments, observing Jinbar waterfall.' }
      ],
      includedServices: ['Park scout, guides, and cook team', 'High quality camping gears', 'Transport'],
      excludedServices: ['Sleeping bags', 'Personal medications', 'Tips'],
      featured: false,
      status: 'Published',
      faqs: []
    },
    {
      id: 'harar-walled-city',
      title: 'Harar Walled City Heritage Experience',
      slug: 'harar-walled-city-heritage-experience',
      description: 'Discover the ancient walled city of Harar Jugol, feed wild hyenas by hand at night, and walk the labyrinthine traditional streets.',
      price: '$950',
      duration: '4 Days / 3 Nights',
      destination: 'Harar',
      heroImage: '/assets/destinations/dorze.jpg', // Fallback image
      galleryImages: [],
      highlights: ['Hand-feed wild hyenas at night', 'Walk the 99 labyrinthine alleys', 'Visit Harari traditional houses'],
      itinerary: [
        { day: 1, title: 'Fly to Dire Dawa & Drive to Harar', description: 'Fly to Dire Dawa. Drive to Harar. Hyena man feeding show in the evening.' },
        { day: 2, title: 'Harar Walled City Tour', description: 'Visit historical mosques, Harar gate, and traditional markets.' }
      ],
      includedServices: ['Addis-Dire Dawa flight tickets', 'Harari traditional lodge', 'Concierge tour guides'],
      excludedServices: ['Alcoholic drinks', 'Personal tips'],
      featured: false,
      status: 'Published',
      faqs: []
    }
  ];

  for (const t of toursData) {
    await prisma.tour.create({ data: t });
  }
  console.log('Seeded 8 tour packages.');

  // 6. Seed Testimonials (8)
  const testimonialsData = [
    { customerName: 'Alice Johnson', country: 'USA', review: 'Absolutely incredible experience. The guides were knowledgeable and the logistics were flawless.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', approved: true },
    { customerName: 'Bob Smith', country: 'UK', review: 'Great trip overall. The hotels could have been slightly better in some remote areas, but the views made up for it.', rating: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', approved: true },
    { customerName: 'Sofia Al-Mansoor', country: 'UAE', review: 'We requested a bespoke southern package for our family. The coordination was flawless. Secure Mercedes transport, five-star heritage hotels, and customized pacing for our kids.', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', approved: true },
    { customerName: 'Michael Chen', country: 'Canada', review: 'A life-changing journey through history. Highly recommend Travel With Mercy.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', approved: true },
    { customerName: 'Emma Watson', country: 'Australia', review: 'Trekking Simien Mountains was challenging but breathtaking. Highly recommend this team!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', approved: false },
    { customerName: 'Hans Gruber', country: 'Germany', review: 'Flawless execution of our custom photo tour. We got amazing shots in Omo Valley.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', approved: false },
    { customerName: 'Yuki Tanaka', country: 'Japan', review: 'Very beautiful country. The crocodile market safari on Lake Chamo was very exciting!', rating: 4, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', approved: true },
    { customerName: 'Carlos Santano', country: 'Spain', review: 'Master class agency. Safe, luxury cars and very good guides. 10/10.', rating: 5, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', approved: true }
  ];

  for (const test of testimonialsData) {
    await prisma.testimonial.create({ data: test });
  }
  console.log('Seeded 8 testimonials.');

  // 7. Seed Bookings (12)
  const bookingsData = [
    {
      bookingReference: 'TWM-482910',
      fullName: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1 234 567 8900',
      nationality: 'USA',
      travelers: 2,
      departureDate: new Date('2026-07-12'),
      returnDate: new Date('2026-07-22'),
      notes: 'Please arrange vegetarian meals throughout the trip.',
      totalPrice: 5300.0,
      status: 'Confirmed',
      tourId: 'bale-mountains-trek',
      hotelPreference: 'Premium'
    },
    {
      bookingReference: 'TWM-109283',
      fullName: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+44 7700 900077',
      nationality: 'UK',
      travelers: 1,
      departureDate: new Date('2026-05-15'),
      returnDate: new Date('2026-05-18'),
      notes: 'No specific requirements.',
      totalPrice: 550.0,
      status: 'Completed',
      tourId: 'arbaminch-chamo-excursion',
      hotelPreference: 'Standard'
    },
    {
      bookingReference: 'TWM-993821',
      fullName: 'Charlie Davis',
      email: 'charlie@example.com',
      phone: '+61 400 123 456',
      nationality: 'Australia',
      travelers: 4,
      departureDate: new Date('2026-10-20'),
      returnDate: new Date('2026-11-01'),
      notes: 'Needs family suites.',
      totalPrice: 13400.0,
      status: 'Cancelled',
      tourId: 'dorze-omo-cultural',
      hotelPreference: 'Luxury'
    },
    {
      bookingReference: 'TWM-203948',
      fullName: 'Diana Prince',
      email: 'diana@example.com',
      phone: '+1 555 777 8888',
      nationality: 'USA',
      travelers: 1,
      departureDate: new Date('2026-08-01'),
      returnDate: new Date('2026-08-09'),
      notes: 'Interested in photography guides.',
      totalPrice: 1950.0,
      status: 'Pending',
      tourId: 'nechsar-rift-valley',
      hotelPreference: 'Premium'
    },
    {
      bookingReference: 'TWM-883291',
      fullName: 'Jane Miller',
      email: 'jane@example.com',
      phone: '+49 170 1234567',
      nationality: 'Germany',
      travelers: 2,
      departureDate: new Date('2026-09-05'),
      returnDate: new Date('2026-09-15'),
      notes: '',
      totalPrice: 4900.0,
      status: 'Confirmed',
      tourId: 'bale-mountains-trek',
      hotelPreference: 'Premium'
    },
    {
      bookingReference: 'TWM-301928',
      fullName: 'Kenji Sato',
      email: 'kenji@example.com',
      phone: '+81 90 1234 5678',
      nationality: 'Japan',
      travelers: 2,
      departureDate: new Date('2026-11-02'),
      returnDate: new Date('2026-11-14'),
      notes: 'Require twin beds.',
      totalPrice: 6700.0,
      status: 'Pending',
      tourId: 'dorze-omo-cultural',
      hotelPreference: 'Luxury'
    },
    {
      bookingReference: 'TWM-449102',
      fullName: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '+34 600 123 456',
      nationality: 'Spain',
      travelers: 1,
      departureDate: new Date('2026-06-20'),
      returnDate: new Date('2026-06-23'),
      notes: '',
      totalPrice: 750.0,
      status: 'Completed',
      tourId: 'arbaminch-chamo-excursion',
      hotelPreference: 'Premium'
    },
    {
      bookingReference: 'TWM-602931',
      fullName: 'Ahmed Al-Fayed',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      nationality: 'UAE',
      travelers: 3,
      departureDate: new Date('2026-12-15'),
      returnDate: new Date('2026-12-22'),
      notes: 'Private Land Cruiser request.',
      totalPrice: 8100.0,
      status: 'Confirmed',
      tourId: 'lalibela-historic',
      hotelPreference: 'Luxury'
    },
    {
      bookingReference: 'TWM-558291',
      fullName: 'Sarah Jenkins',
      email: 'sarah@example.com',
      phone: '+1 202 555 0143',
      nationality: 'USA',
      travelers: 2,
      departureDate: new Date('2026-08-10'),
      returnDate: new Date('2026-08-14'),
      notes: 'Need airport pickup at 6 AM.',
      totalPrice: 4100.0,
      status: 'Pending',
      tourId: 'danakil-depression',
      hotelPreference: 'Standard'
    },
    {
      bookingReference: 'TWM-774921',
      fullName: 'Luca Rossi',
      email: 'luca@example.com',
      phone: '+39 02 123456',
      nationality: 'Italy',
      travelers: 2,
      departureDate: new Date('2026-09-12'),
      returnDate: new Date('2026-09-18'),
      notes: '',
      totalPrice: 3300.0,
      status: 'Confirmed',
      tourId: 'simien-trekking',
      hotelPreference: 'Standard'
    },
    {
      bookingReference: 'TWM-119382',
      fullName: 'Sophie Dubois',
      email: 'sophie@example.com',
      phone: '+33 6 12345678',
      nationality: 'France',
      travelers: 1,
      departureDate: new Date('2026-10-01'),
      returnDate: new Date('2026-10-04'),
      notes: 'Solo traveler interest in hyena feeding.',
      totalPrice: 1150.0,
      status: 'Pending',
      tourId: 'harar-walled-city',
      hotelPreference: 'Premium'
    },
    {
      bookingReference: 'TWM-220194',
      fullName: 'David Kim',
      email: 'david@example.com',
      phone: '+82 10 1234 5678',
      nationality: 'South Korea',
      travelers: 2,
      departureDate: new Date('2026-07-02'),
      returnDate: new Date('2026-07-05'),
      notes: '',
      totalPrice: 1500.0,
      status: 'Completed',
      tourId: 'arbaminch-chamo-excursion',
      hotelPreference: 'Premium'
    }
  ];

  for (const b of bookingsData) {
    await prisma.booking.create({ data: b });
  }
  console.log('Seeded 12 bookings.');

  // 8. Seed Gallery Images (30+)
  // We can query the assets/gallery folder or seed directly. To be robust, let's seed with realistic images using the files we verified inside assets/gallery.
  const galleryImagesData = [
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(1).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(2).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(3).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(4).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(5).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(6).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze%20(7).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Day2%20in%20%23Arbaminch%20and%20%23Dorze.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23Travel_with_Mercy%20%23Day_One_in_Arbaminch_Ethiopia%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(1).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B0%E1%89%A1%E1%89%A5_%E1%8A%A6%E1%88%9E_%E1%8A%AB%E1%88%AE_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(1).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B0%E1%89%A1%E1%89%A5_%E1%8A%A6%E1%88%9E_%E1%8A%AB%E1%88%AE_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(2).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B0%E1%89%A1%E1%89%A5_%E1%8A%A6%E1%88%9E_%E1%8A%AB%E1%88%AE_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(1).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(2).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F%20(3).jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%23%E1%8B%B3%E1%88%B0%E1%8A%90%E1%89%BD_%E1%8A%A6%E1%88%9E%E1%88%AB%E1%89%B4_%E1%8A%A2%E1%89%B5%E1%8B%AE%E1%8B%BD%E1%8B%AB%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/A%20huge%20shoutout%20to%20the%20amazing%20tourist%20guide%20Ethiopia%20Mak%20ToursI%20recently%20traveled%20to%20Southern%20E.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/AQNqTfCQhCLp1Bj9f0yp5bsocisuImPJDx5DgQ4xI9DGq8MahhmzF1zw2qNvFiWjSZ3sdep4douqnVSZJFbNdSpfbZiI1ezX.mp4', caption: '', category: 'Nature' },
    { imageUrl: '/assets/gallery/Great%20things%20never%20come%20from%20comfort%20zones%20%20%23%E1%8A%A5%E1%8B%A8%E1%8D%88%E1%8C%8B%E1%8A%95_%E1%8B%88%E1%8C%88%E1%8A%95%E2%9C%8C%EF%B8%8F.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/IMG_2620.JPG', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/IMG_2621.JPG', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/IMG_2622.JPG', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/Peace%20grows%20where%20respect%20lives.%20Celebrate%20cultures%2C%20spread%20kindness%2C%20and%20treat%20everyone%20with%20di.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_10_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_11_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_15_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_16_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_19_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_20_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_21_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_22_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_23_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_28_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_29_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_33_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_3_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_5_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_7_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_8_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/photo_9_2026-06-23_13-36-13.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%E1%89%B5%E1%8A%95%E1%88%BD%20%E1%89%B3%E1%88%98%E1%88%9D%E1%8A%95%20%E1%8A%A5%E1%8A%93%20%E1%8A%A0%E1%88%B5%E1%89%B3%E1%88%9B%E1%88%9A%E1%8B%AB%E1%89%BD%E1%8A%95%E1%8A%95%20%E1%8A%A5%E1%8A%93%20%E1%89%80%E1%89%A3%E1%88%AD%E1%8B%AB%E1%89%BD%E1%8A%95%E1%8A%95%20%E1%88%88%E1%8B%A8%E1%8A%95%E1%89%A0%E1%89%B5.jpg', caption: '', category: 'Heritage' },
    { imageUrl: '/assets/gallery/%E1%8B%B0%E1%88%B5%20%E1%8B%A8%E1%88%9A%E1%88%8D%20%E1%89%80%E1%8A%95%F0%9F%92%9A%F0%9F%92%9B%E2%9D%A4%EF%B8%8F.mp4', caption: '', category: 'Nature' }
  ];

  for (const img of galleryImagesData) {
    await prisma.galleryImage.create({ data: img });
  }
  console.log('Seeded ' + galleryImagesData.length + ' gallery images.');

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
