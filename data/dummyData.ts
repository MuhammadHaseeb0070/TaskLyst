// Dummy data file - simulates backend API responses

// Profile image used throughout the app
const profileImage = require('@/assets/images/Ellipse 172.png');

// User Profile
export const currentUser = {
  id: '1',
  firstName: 'Courtney',
  lastName: 'Henry',
  email: 'courtney.henry@email.com',
  phone: '+44 7726601220',
  avatar: profileImage,
  location: 'Manchester, United Kingdom',
  role: 'business', // 'customer' or 'business'
};

// Job statuses
export type JobStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type DateFilter = 'Today' | 'Upcoming' | 'Past';

// Get today's date for filtering
const today = new Date();
const formatDate = (date: Date) => {
  const day = date.getDate();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${day} ${months[date.getMonth()]}`;
};

// All Jobs (with various statuses and dates for filtering)
export const allJobs = [
  {
    id: '1',
    clientName: 'Ahmer Arain',
    clientEmail: 'ahmerarain18@gmail.com',
    clientAvatar: profileImage,
    jobImage: profileImage,
    date: formatDate(today), // Today
    rawDate: new Date(today),
    time: '16:00',
    status: 'Pending' as JobStatus,
    pendingQuotes: {
      title: 'Pending quotes',
      description: 'Kitchen Ventilation Upgrade',
    },
    pendingJobs: {
      title: 'Pending jobs',
      description: 'Requires a secondary vendor quote before final commitment.',
    },
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    clientAvatar: profileImage,
    jobImage: profileImage,
    date: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)), // 2 days from now
    rawDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    time: '10:00',
    status: 'Confirmed' as JobStatus,
    pendingQuotes: {
      title: 'Pending quotes',
      description: 'Bathroom Renovation',
    },
    pendingJobs: {
      title: 'Pending jobs',
      description: 'Waiting for material cost confirmation.',
    },
  },
  {
    id: '3',
    clientName: 'Mike Wilson',
    clientEmail: 'mike.wilson@email.com',
    clientAvatar: profileImage,
    jobImage: profileImage,
    date: formatDate(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)), // 3 days ago
    rawDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    time: '14:00',
    status: 'Completed' as JobStatus,
    pendingQuotes: {
      title: 'Pending quotes',
      description: 'AC Installation',
    },
    pendingJobs: {
      title: 'Pending jobs',
      description: 'Service completed successfully.',
    },
  },
  {
    id: '4',
    clientName: 'Emily Davis',
    clientEmail: 'emily.d@email.com',
    clientAvatar: profileImage,
    jobImage: profileImage,
    date: formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)), // 5 days from now
    rawDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
    time: '09:00',
    status: 'Pending' as JobStatus,
    pendingQuotes: {
      title: 'Pending quotes',
      description: 'Plumbing Repair',
    },
    pendingJobs: {
      title: 'Pending jobs',
      description: 'Awaiting customer confirmation.',
    },
  },
  {
    id: '5',
    clientName: 'John Smith',
    clientEmail: 'john.smith@email.com',
    clientAvatar: profileImage,
    jobImage: profileImage,
    date: formatDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)), // 7 days ago
    rawDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
    time: '11:00',
    status: 'Cancelled' as JobStatus,
    pendingQuotes: {
      title: 'Pending quotes',
      description: 'Electrical Work',
    },
    pendingJobs: {
      title: 'Pending jobs',
      description: 'Job cancelled by customer.',
    },
  },
  {
    id: '6',
    clientName: 'Lisa Anderson',
    clientEmail: 'lisa.a@email.com',
    clientAvatar: profileImage,
    jobImage: profileImage,
    date: formatDate(today), // Today
    rawDate: new Date(today),
    time: '15:30',
    status: 'Confirmed' as JobStatus,
    pendingQuotes: {
      title: 'Pending quotes',
      description: 'Window Cleaning',
    },
    pendingJobs: {
      title: 'Pending jobs',
      description: 'Confirmed for today.',
    },
  },
];

// Legacy export for backwards compatibility
export const pendingJobs = allJobs;

// Upcoming Appointments for Home Screen (linked to allAppointments by id)
export const upcomingAppointments = [
  {
    id: '1', // Links to allAppointments[0]
    title: 'House Painting',
    subtitle: 'Yuli Callahan',
    clientAvatar: profileImage,
    date: 'Today',
    duration: '30 mins',
    hasVideoCall: true,
  },
  {
    id: '2', // Links to allAppointments[1]
    title: 'House Painting',
    subtitle: 'Yuli Callahan',
    clientAvatar: profileImage,
    date: 'Tomorrow',
    duration: '45 mins',
    hasVideoCall: true,
  },
  {
    id: '6', // Links to allAppointments[5] (AC Repair)
    title: 'AC Repair',
    subtitle: 'Yuli Callahan',
    clientAvatar: profileImage,
    date: 'Next Week',
    duration: '60 mins',
    hasVideoCall: true,
  },
];

// Calendar Events (dates that have events)
export const calendarEvents = [
  { date: 8, month: 12, year: 2025, hasEvent: true },
  { date: 9, month: 12, year: 2025, hasEvent: true },
  { date: 12, month: 12, year: 2025, hasEvent: true },
  { date: 15, month: 12, year: 2025, hasEvent: true },
  { date: 20, month: 11, year: 2025, hasEvent: true },
];

// Dashboard Stats
export const dashboardStats = {
  totalBookings: 24,
  pending: 5,
  completed: 19,
  revenue: 2450,
  clients: 18,
  services: 12,
  rating: 4.8,
};

// Messages
export const messages = [
  {
    id: '1',
    senderName: 'Sarah Johnson',
    senderAvatar: profileImage,
    lastMessage: 'Thanks for the service!',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    senderName: 'Mike Peters',
    senderAvatar: profileImage,
    lastMessage: 'When can you come?',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    senderName: 'Emily Davis',
    senderAvatar: profileImage,
    lastMessage: 'Great work!',
    time: '3h ago',
    unread: false,
  },
  {
    id: '4',
    senderName: 'John Smith',
    senderAvatar: profileImage,
    lastMessage: 'See you tomorrow',
    time: '1d ago',
    unread: false,
  },
];

// Services offered (for business users)
export const services = [
  {
    id: '1',
    name: 'Refrigerator Repair',
    price: 50,
    duration: '40 mins',
    description: 'Professional refrigerator repair service',
  },
  {
    id: '2',
    name: 'AC Installation',
    price: 120,
    duration: '2 hours',
    description: 'Air conditioning installation and setup',
  },
  {
    id: '3',
    name: 'Kitchen Ventilation',
    price: 80,
    duration: '1 hour',
    description: 'Kitchen ventilation system maintenance',
  },
];

// Notifications
export const notifications = [
  {
    id: '1',
    title: 'New Booking Request',
    message: 'Sarah Johnson requested a booking for Dec 15',
    time: '5m ago',
    read: false,
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'You received $50 for Refrigerator Repair',
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    title: 'Reminder',
    message: 'You have an appointment tomorrow at 10:00 AM',
    time: '2h ago',
    read: true,
  },
];

// Locations (for dropdown)
export const locations = [
  'Manchester, United Kingdom',
  'London, United Kingdom',
  'Birmingham, United Kingdom',
  'Liverpool, United Kingdom',
  'Leeds, United Kingdom',
];

// Appointment statuses (same as JobStatus for consistency)
export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

// Helper to get month abbreviation
const getMonthAbbr = (date: Date) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return months[date.getMonth()];
};

// Helper to format full date
const formatFullDate = (date: Date) => {
  const day = date.getDate();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Helper to format date as DD/MM/YYYY
const formatShortDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
};

// Dynamic dates for appointments
const todayDate = new Date();
const tomorrowDate = new Date(todayDate.getTime() + 1 * 24 * 60 * 60 * 1000);
const nextWeekDate = new Date(todayDate.getTime() + 7 * 24 * 60 * 60 * 1000);
const in2WeeksDate = new Date(todayDate.getTime() + 14 * 24 * 60 * 60 * 1000);
const in3WeeksDate = new Date(todayDate.getTime() + 21 * 24 * 60 * 60 * 1000);
const lastWeekDate = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000);
const twoWeeksAgoDate = new Date(todayDate.getTime() - 14 * 24 * 60 * 60 * 1000);

// All Appointments for the Appointments screen
export const allAppointments = [
  // Upcoming appointments
  {
    id: '1',
    serviceName: 'House Painting',
    price: 0.00,
    clientName: 'Alex Smith',
    clientEmail: 'alexsmith12@gm..',
    clientPhone: '+145678456345',
    location: 'Merseyside',
    time: '14:00',
    serviceImage: profileImage,
    status: 'Pending' as AppointmentStatus,
    month: getMonthAbbr(todayDate),
    day: todayDate.getDate(),
    rawDate: todayDate,
    isUpcoming: true,
    // Booking details
    bookingId: '#e5c46f02',
    serviceProviderName: 'Yuli Callahan',
    fullDate: formatFullDate(todayDate),
    duration: '30 Mins',
    fullLocation: 'Merseyside, UK',
    customerName: 'Ahmer Arain',
    customerEmail: 'ahmerarain18@gmail.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 0.00,
    createdDate: formatShortDate(lastWeekDate),
    lastUpdated: formatShortDate(todayDate),
  },
  {
    id: '2',
    serviceName: 'House Painting',
    price: 0.00,
    clientName: 'Alex Smith',
    clientEmail: 'alexsmith12@gm..',
    clientPhone: '+145678456345',
    location: 'Merseyside',
    time: '14:00',
    serviceImage: profileImage,
    status: 'Pending' as AppointmentStatus,
    month: getMonthAbbr(tomorrowDate),
    day: tomorrowDate.getDate(),
    rawDate: tomorrowDate,
    isUpcoming: true,
    // Booking details
    bookingId: '#a7b82d03',
    serviceProviderName: 'Yuli Callahan',
    fullDate: formatFullDate(tomorrowDate),
    duration: '45 Mins',
    fullLocation: 'Merseyside, UK',
    customerName: 'Ahmer Arain',
    customerEmail: 'ahmerarain18@gmail.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 0.00,
    createdDate: formatShortDate(lastWeekDate),
    lastUpdated: formatShortDate(todayDate),
  },
  {
    id: '6',
    serviceName: 'AC Repair',
    price: 75.00,
    clientName: 'Emma Wilson',
    clientEmail: 'emma.w@email..',
    clientPhone: '+145678456999',
    location: 'Manchester',
    time: '10:00',
    serviceImage: profileImage,
    status: 'Pending' as AppointmentStatus,
    month: getMonthAbbr(nextWeekDate),
    day: nextWeekDate.getDate(),
    rawDate: nextWeekDate,
    isUpcoming: true,
    // Booking details
    bookingId: '#d4e52f07',
    serviceProviderName: 'Yuli Callahan',
    fullDate: formatFullDate(nextWeekDate),
    duration: '60 Mins',
    fullLocation: 'Manchester, UK',
    customerName: 'Emma Wilson',
    customerEmail: 'emma.w@email.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 75.00,
    createdDate: formatShortDate(todayDate),
    lastUpdated: formatShortDate(todayDate),
  },
  // Finished/Completed appointments
  {
    id: '3',
    serviceName: 'House Painting',
    price: 0.00,
    clientName: 'Alex Smith',
    clientEmail: 'alexsmith12@gm..',
    clientPhone: '+145678456345',
    location: 'Merseyside',
    time: '14:00',
    serviceImage: profileImage,
    status: 'Completed' as AppointmentStatus,
    month: getMonthAbbr(lastWeekDate),
    day: lastWeekDate.getDate(),
    rawDate: lastWeekDate,
    isUpcoming: false,
    // Booking details
    bookingId: '#c3d91e04',
    serviceProviderName: 'Yuli Callahan',
    fullDate: formatFullDate(lastWeekDate),
    duration: '30 Mins',
    fullLocation: 'Merseyside, UK',
    customerName: 'Ahmer Arain',
    customerEmail: 'ahmerarain18@gmail.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 0.00,
    createdDate: formatShortDate(twoWeeksAgoDate),
    lastUpdated: formatShortDate(lastWeekDate),
  },
  {
    id: '4',
    serviceName: 'House Painting',
    price: 0.00,
    clientName: 'Alex Smith',
    clientEmail: 'alexsmith12@gm..',
    clientPhone: '+145678456345',
    location: 'Merseyside',
    time: '14:00',
    serviceImage: profileImage,
    status: 'Completed' as AppointmentStatus,
    month: getMonthAbbr(twoWeeksAgoDate),
    day: twoWeeksAgoDate.getDate(),
    rawDate: twoWeeksAgoDate,
    isUpcoming: false,
    // Booking details
    bookingId: '#f8e72b05',
    serviceProviderName: 'Yuli Callahan',
    fullDate: formatFullDate(twoWeeksAgoDate),
    duration: '60 Mins',
    fullLocation: 'Merseyside, UK',
    customerName: 'Ahmer Arain',
    customerEmail: 'ahmerarain18@gmail.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 0.00,
    createdDate: formatShortDate(twoWeeksAgoDate),
    lastUpdated: formatShortDate(lastWeekDate),
  },
  {
    id: '5',
    serviceName: 'Kitchen Cleaning',
    price: 45.00,
    clientName: 'John Doe',
    clientEmail: 'johndoe@email..',
    clientPhone: '+145678456789',
    location: 'Liverpool',
    time: '10:00',
    serviceImage: profileImage,
    status: 'Completed' as AppointmentStatus,
    month: getMonthAbbr(lastWeekDate),
    day: lastWeekDate.getDate(),
    rawDate: lastWeekDate,
    isUpcoming: false,
    // Booking details
    bookingId: '#b2c41a06',
    serviceProviderName: 'Sarah Wilson',
    fullDate: formatFullDate(lastWeekDate),
    duration: '45 Mins',
    fullLocation: 'Liverpool, UK',
    customerName: 'John Doe',
    customerEmail: 'johndoe@email.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 45.00,
    createdDate: formatShortDate(twoWeeksAgoDate),
    lastUpdated: formatShortDate(lastWeekDate),
  },
  // More upcoming appointments for calendar view
  {
    id: '7',
    serviceName: 'Plumbing Fix',
    price: 60.00,
    clientName: 'Sheila Conway',
    clientEmail: 'sheila.c@email..',
    clientPhone: '+145678456111',
    location: 'Leeds',
    time: '11:00',
    serviceImage: profileImage,
    status: 'Pending' as AppointmentStatus,
    month: getMonthAbbr(in2WeeksDate),
    day: in2WeeksDate.getDate(),
    rawDate: in2WeeksDate,
    isUpcoming: true,
    // Booking details
    bookingId: '#g5h63i08',
    serviceProviderName: 'Sheila Conway',
    fullDate: formatFullDate(in2WeeksDate),
    duration: '45 Mins',
    fullLocation: 'Leeds, UK',
    customerName: 'Sheila Conway',
    customerEmail: 'sheila.c@email.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 60.00,
    createdDate: formatShortDate(todayDate),
    lastUpdated: formatShortDate(todayDate),
  },
  {
    id: '8',
    serviceName: 'Window Cleaning',
    price: 35.00,
    clientName: 'Mark Johnson',
    clientEmail: 'mark.j@email..',
    clientPhone: '+145678456222',
    location: 'Birmingham',
    time: '09:00',
    serviceImage: profileImage,
    status: 'Confirmed' as AppointmentStatus,
    month: getMonthAbbr(in3WeeksDate),
    day: in3WeeksDate.getDate(),
    rawDate: in3WeeksDate,
    isUpcoming: true,
    // Booking details
    bookingId: '#j6k74l09',
    serviceProviderName: 'Yuli Callahan',
    fullDate: formatFullDate(in3WeeksDate),
    duration: '30 Mins',
    fullLocation: 'Birmingham, UK',
    customerName: 'Mark Johnson',
    customerEmail: 'mark.j@email.com',
    customerAvatar: profileImage,
    paymentMethod: 'Stripe',
    amount: 35.00,
    createdDate: formatShortDate(todayDate),
    lastUpdated: formatShortDate(todayDate),
  },
];

