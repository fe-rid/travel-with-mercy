export const bookingTrendsData = [
  { name: "Jan", bookings: 40, revenue: 24000 },
  { name: "Feb", bookings: 30, revenue: 13980 },
  { name: "Mar", bookings: 45, revenue: 98000 },
  { name: "Apr", bookings: 50, revenue: 39080 },
  { name: "May", bookings: 65, revenue: 48000 },
  { name: "Jun", bookings: 85, revenue: 38000 },
  { name: "Jul", bookings: 100, revenue: 43000 },
  { name: "Aug", bookings: 120, revenue: 84000 },
  { name: "Sep", bookings: 95, revenue: 53000 },
  { name: "Oct", bookings: 80, revenue: 43000 },
  { name: "Nov", bookings: 60, revenue: 23000 },
  { name: "Dec", bookings: 70, revenue: 34000 },
];

export const popularDestinationsData = [
  { name: "Bale Mountains", value: 400 },
  { name: "Omo Valley", value: 350 },
  { name: "Lake Chamo", value: 300 },
  { name: "Arbaminch", value: 250 },
  { name: "Dorze Village", value: 200 },
  { name: "Nechsar Park", value: 180 },
];

export interface Booking {
  id: string;
  customer: string;
  email: string;
  phone: string;
  tour: string;
  tourId: string;
  date: string;
  departureDate: string;
  returnDate: string;
  amount: string;
  travelers: number;
  hotelPreference: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Approved";
}

export const recentBookings: Booking[] = [
  { 
    id: "TWM-482910", 
    customer: "Alice Johnson", 
    email: "alice@example.com", 
    phone: "+1 234 567 8900", 
    tour: "Bale Mountains Wildlife Trek", 
    tourId: "bale-mountains-trek", 
    date: "06/10/2026", 
    departureDate: "2026-07-12", 
    returnDate: "2026-07-22", 
    amount: "$5,300", 
    travelers: 2, 
    hotelPreference: "Premium", 
    status: "Confirmed" 
  },
  { 
    id: "TWM-109283", 
    customer: "Bob Smith", 
    email: "bob@example.com", 
    phone: "+44 7700 900077", 
    tour: "Arbaminch & Lake Chamo Excursion", 
    tourId: "arbaminch-chamo-excursion", 
    date: "05/12/2026", 
    departureDate: "2026-05-15", 
    returnDate: "2026-05-18", 
    amount: "$550", 
    travelers: 1, 
    hotelPreference: "Standard", 
    status: "Completed" 
  },
  { 
    id: "TWM-993821", 
    customer: "Charlie Davis", 
    email: "charlie@example.com", 
    phone: "+61 400 123 456", 
    tour: "Dorze & Omo Cultural Tour", 
    tourId: "dorze-omo-cultural", 
    date: "04/01/2026", 
    departureDate: "2026-10-20", 
    returnDate: "2026-11-01", 
    amount: "$13,400", 
    travelers: 4, 
    hotelPreference: "Luxury", 
    status: "Cancelled" 
  },
  { 
    id: "TWM-203948", 
    customer: "Diana Prince", 
    email: "diana@example.com", 
    phone: "+1 555 777 8888", 
    tour: "Nechsar & Rift Valley Adventure", 
    tourId: "nechsar-rift-valley", 
    date: "06/18/2026", 
    departureDate: "2026-08-01", 
    returnDate: "2026-08-09", 
    amount: "$1,950", 
    travelers: 1, 
    hotelPreference: "Premium", 
    status: "Pending" 
  }
];

export const recentReviews = [
  { id: 1, customer: "John Doe", rating: 5, comment: "Absolutely incredible experience. The guides were knowledgeable and the logistics were flawless.", date: "2 days ago" },
  { id: 2, customer: "Sarah Williams", rating: 4, comment: "Great trip overall. The hotels could have been slightly better in some remote areas, but the views made up for it.", date: "1 week ago" },
  { id: 3, customer: "Michael Chen", rating: 5, comment: "A life-changing journey through history. Highly recommend Travel With Mercy.", date: "2 weeks ago" },
];

export const customersData = [
  { id: "CUST-001", name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 8900", nationality: "USA", totalBookings: 3, lastActivity: "2026-06-10" },
  { id: "CUST-002", name: "Bob Smith", email: "bob@example.com", phone: "+44 7700 900077", nationality: "UK", totalBookings: 1, lastActivity: "2026-05-12" },
  { id: "CUST-003", name: "Charlie Davis", email: "charlie@example.com", phone: "+61 400 123 456", nationality: "Australia", totalBookings: 5, lastActivity: "2026-04-01" },
];
