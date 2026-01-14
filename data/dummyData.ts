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
    date: formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)), 
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
    date: formatDate(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)), 
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
    date: formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)),
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
    date: formatDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)), 
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

export const pendingJobs = allJobs;

// Upcoming Appointments for Home Screen (linked to allAppointments by id)
export const upcomingAppointments = [
  {
    id: '1', 
    title: 'House Painting',
    subtitle: 'Yuli Callahan',
    clientAvatar: profileImage,
    date: 'Today',
    duration: '30 mins',
    hasVideoCall: true,
  },
  {
    id: '2', 
    title: 'House Painting',
    subtitle: 'Yuli Callahan',
    clientAvatar: profileImage,
    date: 'Tomorrow',
    duration: '45 mins',
    hasVideoCall: true,
  },
  {
    id: '6', 
    title: 'AC Repair',
    subtitle: 'Yuli Callahan',
    clientAvatar: profileImage,
    date: 'Next Week',
    duration: '60 mins',
    hasVideoCall: true,
  },
];


export const calendarEvents = [
  { date: 8, month: 12, year: 2025, hasEvent: true },
  { date: 9, month: 12, year: 2025, hasEvent: true },
  { date: 12, month: 12, year: 2025, hasEvent: true },
  { date: 15, month: 12, year: 2025, hasEvent: true },
  { date: 20, month: 11, year: 2025, hasEvent: true },
];

// Diary Appointments with detailed timeline info
export interface DiaryAppointment {
  id: string;
  title: string;
  startTime: string; // Format: "HH:MM" (24-hour)
  endTime: string; // Format: "HH:MM" (24-hour)
  clientName: string;
  clientAvatar?: any;
  status: 'Pending' | 'Completed' | 'Cancelled' | 'Confirmed';
  date: string; // Format: "YYYY-MM-DD"
  serviceName?: string;
  location?: string;
  notes?: string;
}

export const diaryAppointments: DiaryAppointment[] = [
  {
    id: '1',
    title: 'Door Frame Repair',
    startTime: '08:00',
    endTime: '10:00',
    clientName: 'F. Miller',
    clientAvatar: profileImage,
    status: 'Pending',
    date: '2025-11-20',
    serviceName: 'Carpentry',
  },
  {
    id: '2',
    title: 'Gutter Cleaning',
    startTime: '11:00',
    endTime: '12:30',
    clientName: 'S. Smith',
    clientAvatar: profileImage,
    status: 'Completed',
    date: '2025-11-20',
    serviceName: 'Maintenance',
  },
  {
    id: '3',
    title: 'Kitchen Plumbing',
    startTime: '14:00',
    endTime: '16:30',
    clientName: 'J. Anderson',
    clientAvatar: profileImage,
    status: 'Confirmed',
    date: '2025-11-20',
    serviceName: 'Plumbing',
  },
  {
    id: '4',
    title: 'Bathroom Renovation',
    startTime: '09:00',
    endTime: '13:00',
    clientName: 'M. Johnson',
    clientAvatar: profileImage,
    status: 'Pending',
    date: '2025-11-21',
    serviceName: 'Renovation',
  },
  {
    id: '5',
    title: 'Electrical Inspection',
    startTime: '15:00',
    endTime: '16:00',
    clientName: 'R. Davis',
    clientAvatar: profileImage,
    status: 'Confirmed',
    date: '2025-11-21',
    serviceName: 'Electrical',
  },
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

// Message types
export type MessageStatus = 'Open' | 'Archived';

// Messages
export const messages = [
  {
    id: '1',
    senderName: 'Andreana Viola',
    senderAvatar: profileImage,
    lastMessage: 'Hi, How are you today?',
    time: '1m ago',
    unreadCount: 2,
    status: 'Open' as MessageStatus,
  },
  {
    id: '2',
    senderName: 'Francesco Long',
    senderAvatar: profileImage,
    lastMessage: 'Hi @Angel, I hope you are doi...',
    time: '2h ago',
    unreadCount: 2,
    status: 'Open' as MessageStatus,
  },
  {
    id: '3',
    senderName: 'Alexandra Michu',
    senderAvatar: profileImage,
    lastMessage: 'Hi, How are you today?',
    time: '09:00',
    unreadCount: 0,
    status: 'Open' as MessageStatus,
  },
  {
    id: '4',
    senderName: 'Hwang Lee',
    senderAvatar: profileImage,
    lastMessage: 'I hope it will be finished soon',
    time: 'Today',
    unreadCount: 0,
    status: 'Open' as MessageStatus,
  },
  {
    id: '5',
    senderName: 'Maximillian',
    senderAvatar: profileImage,
    lastMessage: 'You: you are absolutely right!',
    time: '23/11',
    unreadCount: 0,
    status: 'Open' as MessageStatus,
  },
  {
    id: '6',
    senderName: 'Xiao Ming',
    senderAvatar: profileImage,
    lastMessage: 'Okay, Great!',
    time: '23/11',
    unreadCount: 0,
    status: 'Open' as MessageStatus,
  },
  {
    id: '7',
    senderName: 'Sarah Johnson',
    senderAvatar: profileImage,
    lastMessage: 'Thanks for the service!',
    time: '22/11',
    unreadCount: 0,
    status: 'Archived' as MessageStatus,
  },
  {
    id: '8',
    senderName: 'Mike Peters',
    senderAvatar: profileImage,
    lastMessage: 'When can you come?',
    time: '20/11',
    unreadCount: 0,
    status: 'Archived' as MessageStatus,
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
export type NotificationType = 'message' | 'booking' | 'update' | 'payment' | 'reminder';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const notificationsData: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Ahmadi Arain',
    message: 'Aaaaaaa',
    date: 'Sep 19',
    read: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'New message from Ahmadi Arain',
    message: 'all good?',
    date: 'Sep 19',
    read: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'New message from Ahmadi Arain',
    message: 'all good?',
    date: 'Sep 19',
    read: true,
  },
  {
    id: '4',
    type: 'booking',
    title: 'Booking Confirmed!',
    message: 'Your booking for service has been....',
    date: 'Sep 19',
    read: true,
  },
  {
    id: '5',
    type: 'booking',
    title: 'Booking Confirmed!',
    message: 'Your booking for service has been....',
    date: 'Sep 19',
    read: true,
  },
  {
    id: '6',
    type: 'update',
    title: 'New Updates!',
    message: 'New updates appeard',
    date: 'Sep 18',
    read: true,
  },
  {
    id: '7',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received $50 for Refrigerator Repair',
    date: 'Sep 17',
    read: true,
  },
  {
    id: '8',
    type: 'reminder',
    title: 'Reminder',
    message: 'You have an appointment tomorrow at 10:00 AM',
    date: 'Sep 16',
    read: true,
  },
];

// Keep old format for backward compatibility
export const notifications = notificationsData;

// ==================== CLIENT MANAGEMENT DATA ====================

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: any;
  totalBookings: number;
  totalSpent: number;
}

export interface ClientStats {
  totalClients: number;
  thisMonthRevenue: number;
  responseOnTimeRate: number;
  avgRating: number;
  maxRating: number;
}

export const clientStats: ClientStats = {
  totalClients: 5,
  thisMonthRevenue: 0.00,
  responseOnTimeRate: 80,
  avgRating: 4.5,
  maxRating: 5.0,
};

export const clientsData: Client[] = [
  {
    id: '1',
    name: 'Jason Reed',
    email: 'jasonreed18@gmail.com',
    phone: '+44 7726601220',
    avatar: profileImage,
    totalBookings: 0,
    totalSpent: 608.00,
  },
  {
    id: '2',
    name: 'Alex Smith',
    email: 'alexsmith12@gmail.com',
    phone: '+44 7726601221',
    avatar: profileImage,
    totalBookings: 0,
    totalSpent: 0.00,
  },
  {
    id: '3',
    name: 'Jason Reed',
    email: 'jasonreed@gmail.com',
    phone: '+44 7726601222',
    avatar: profileImage,
    totalBookings: 0,
    totalSpent: 608.00,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@gmail.com',
    phone: '+44 7726601223',
    avatar: profileImage,
    totalBookings: 3,
    totalSpent: 245.00,
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.b@gmail.com',
    phone: '+44 7726601224',
    avatar: profileImage,
    totalBookings: 5,
    totalSpent: 890.00,
  },
];

// Quote statuses
export type QuoteStatus = 'Active' | 'Rejected' | 'Pending';

// Quotes data for the Quotes screen
export const quotesData = [
  {
    id: '1',
    status: 'Active' as QuoteStatus,
    title: 'Kitchen Ventilation',
    serviceName: 'Kitchen Ventilation Upgrade',
    description: 'Requires a secondary vendor quote before final commitment.',
    vendorStatus: 'Awaiting vendor response',
    customerName: 'Ahmer Arain',
    customerEmail: 'ahmerarain18@gmail.com',
    estimatedPrice: 450,
    scheduledDate: '18 March',
    scheduledTime: '16:00',
    createdAt: new Date(),
  },
  {
    id: '2',
    status: 'Active' as QuoteStatus,
    title: 'Kitchen Ventilation',
    serviceName: 'Kitchen Ventilation Upgrade',
    description: 'Requires a secondary vendor quote before final commitment.',
    vendorStatus: 'Under review by customer',
    customerName: 'John Peters',
    customerEmail: 'john.peters@email.com',
    estimatedPrice: 380,
    scheduledDate: '20 March',
    scheduledTime: '10:00',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    status: 'Active' as QuoteStatus,
    title: 'Kitchen Ventilation',
    serviceName: 'Kitchen Ventilation Upgrade',
    description: 'Requires a secondary vendor quote before final commitment.',
    vendorStatus: 'Materials sourcing in progress',
    customerName: 'Emily Watson',
    customerEmail: 'emily.watson@email.com',
    estimatedPrice: 520,
    scheduledDate: '22 March',
    scheduledTime: '14:30',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    status: 'Rejected' as QuoteStatus,
    title: 'Bathroom Renovation',
    serviceName: 'Full Bathroom Renovation',
    description: 'Customer declined due to scheduling conflicts.',
    vendorStatus: 'Quote expired',
    customerName: 'Mike Thompson',
    customerEmail: 'mike.t@email.com',
    estimatedPrice: 1200,
    scheduledDate: '15 March',
    scheduledTime: '09:00',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    status: 'Rejected' as QuoteStatus,
    title: 'AC Installation',
    serviceName: 'Air Conditioning Installation',
    description: 'Budget constraints led to quote rejection.',
    vendorStatus: 'Closed',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.a@email.com',
    estimatedPrice: 890,
    scheduledDate: '12 March',
    scheduledTime: '11:00',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    status: 'Pending' as QuoteStatus,
    title: 'Plumbing Repair',
    serviceName: 'Emergency Plumbing Repair',
    description: 'Waiting for site inspection to finalize quote.',
    vendorStatus: 'Inspection scheduled',
    customerName: 'David Clark',
    customerEmail: 'david.clark@email.com',
    estimatedPrice: 280,
    scheduledDate: '25 March',
    scheduledTime: '15:00',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '7',
    status: 'Pending' as QuoteStatus,
    title: 'Indoor Cleaning',
    serviceName: 'Deep Indoor Cleaning Service',
    description: 'Deep cleaning service estimate pending approval.',
    vendorStatus: 'Quote sent to customer',
    customerName: 'Rachel Green',
    customerEmail: 'rachel.g@email.com',
    estimatedPrice: 150,
    scheduledDate: '28 March',
    scheduledTime: '08:00',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '8',
    status: 'Active' as QuoteStatus,
    title: 'Window Installation',
    serviceName: 'Premium Window Installation',
    description: 'Premium double-glazed windows for living room.',
    vendorStatus: 'Final measurements needed',
    customerName: 'Chris Martin',
    customerEmail: 'chris.m@email.com',
    estimatedPrice: 2100,
    scheduledDate: '30 March',
    scheduledTime: '12:00',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
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

// ==================== REVIEWS DATA ====================

export interface Review {
  id: string;
  name: string;
  avatar: any; // Image source
  rating: number; // Can be decimal like 3.5, 4.5
  timeAgo: string;
  review: string;
}

export interface ReviewsSummary {
  averageRating: number; // e.g., 4.0
  totalReviews: number; // e.g., 52
  ratingDistribution: {
    5: number; // percentage 0-100
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const reviewsSummary: ReviewsSummary = {
  averageRating: 4.5,
  totalReviews: 52,
  ratingDistribution: {
    5: 85,
    4: 70,
    3: 30,
    2: 15,
    1: 10,
  },
};

export const reviewsData: Review[] = [
  {
    id: "1",
    name: "Courtney Henry",
    avatar: profileImage,
    rating: 4,
    timeAgo: "2 mins ago",
    review:
      "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.",
  },
  {
    id: "2",
    name: "Cameron Williamson",
    avatar: profileImage,
    rating: 3.5,
    timeAgo: "2 mins ago",
    review:
      "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua",
  },
  {
    id: "3",
    name: "Jane Cooper",
    avatar: profileImage,
    rating: 3,
    timeAgo: "2 mins ago",
    review: "Ullamco tempor adipisicing et voluptate duis sit esse aliqua esse ex.",
  },
  {
    id: "4",
    name: "Robert Fox",
    avatar: profileImage,
    rating: 5,
    timeAgo: "5 mins ago",
    review:
      "Excellent service! Very professional and timely. Would definitely recommend to others.",
  },
  {
    id: "5",
    name: "Emily Johnson",
    avatar: profileImage,
    rating: 4.5,
    timeAgo: "10 mins ago",
    review:
      "Great experience overall. The team was very helpful and responsive.",
  },
];

// ==================== PAYMENTS DATA ====================

export type PaymentStatus = 'Succeeded' | 'Pending' | 'Failed';

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number;
  title: string;
  transactionId: string;
  date: string;
  paymentMethod: string;
  cardLast4: string;
}

export interface PaymentSummary {
  fundsFromCompletedJobs: number;
  nextPayoutDate: string;
  processingType: string;
}

export const paymentSummary: PaymentSummary = {
  fundsFromCompletedJobs: 0.00,
  nextPayoutDate: '22 Nov 2025',
  processingType: 'Standard processing',
};

export const paymentsData: Payment[] = [
  {
    id: '1',
    status: 'Succeeded',
    amount: 484.00,
    title: 'Payments',
    transactionId: '1Bpryxgo',
    date: '11 Oct 2025',
    paymentMethod: 'Card',
    cardLast4: '4242',
  },
  {
    id: '2',
    status: 'Succeeded',
    amount: 22.00,
    title: 'Payments',
    transactionId: '1Bpryxgo',
    date: '11 Oct 2025',
    paymentMethod: 'Card',
    cardLast4: '4242',
  },
  {
    id: '3',
    status: 'Succeeded',
    amount: 156.50,
    title: 'Payments',
    transactionId: '2Cqszyhp',
    date: '10 Oct 2025',
    paymentMethod: 'Card',
    cardLast4: '4242',
  },
  {
    id: '4',
    status: 'Pending',
    amount: 89.00,
    title: 'Payments',
    transactionId: '3Drtaziq',
    date: '09 Oct 2025',
    paymentMethod: 'Card',
    cardLast4: '4242',
  },
  {
    id: '5',
    status: 'Succeeded',
    amount: 320.00,
    title: 'Payments',
    transactionId: '4Esubajr',
    date: '08 Oct 2025',
    paymentMethod: 'Card',
    cardLast4: '4242',
  },
  {
    id: '6',
    status: 'Failed',
    amount: 45.00,
    title: 'Payments',
    transactionId: '5Ftvcbks',
    date: '07 Oct 2025',
    paymentMethod: 'Card',
    cardLast4: '4242',
  },
];

// ==================== SUBSCRIPTIONS DATA ====================

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
}

export interface CurrentSubscription {
  planId: string;
  planName: string;
  status: 'active' | 'inactive' | 'cancelled';
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic plan',
    price: 10,
    period: 'month',
    description: 'Upto 10 users and 20GB data.',
  },
  {
    id: 'business',
    name: 'Business plan',
    price: 20,
    period: 'month',
    description: 'Upto 10 users and 20GB data.',
  },
  {
    id: 'enterprise',
    name: 'Enterprise plan',
    price: 40,
    period: 'month',
    description: 'Upto 10 users and 20GB data.',
  },
];

export const currentSubscription: CurrentSubscription = {
  planId: 'basic',
  planName: 'basic',
  status: 'active',
};

// ==================== SERVICES DATA ====================

export type ServiceStatus = 'Active' | 'Inactive';

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  image: any;
  status: ServiceStatus;
  instantBooking: boolean;
}

export const servicesData: Service[] = [
  {
    id: '1',
    name: 'Sheila Conway',
    price: 199.00,
    description: 'Sunt ut enim doloremSunt ut enim doloremSunt ut enim dolorem',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Active',
    instantBooking: true,
  },
  {
    id: '2',
    name: 'Yuli Callahan',
    price: 124.00,
    description: 'sed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with deskt...',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Active',
    instantBooking: true,
  },
  {
    id: '3',
    name: 'Brock Berger',
    price: 124.00,
    description: 'y text of the printing and typesettingy text of the printing and typesettingAut sunt perferendis',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Active',
    instantBooking: true,
  },
  {
    id: '4',
    name: 'Indoor Cleaning',
    price: 85.00,
    description: 'Professional indoor cleaning service for homes and offices. Includes dusting, vacuuming, and sanitizing.',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Inactive',
    instantBooking: false,
  },
  {
    id: '5',
    name: 'Garden Maintenance',
    price: 150.00,
    description: 'Complete garden maintenance including lawn mowing, hedge trimming, and plant care services.',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Active',
    instantBooking: true,
  },
];

// ==================== SERVICE DETAILS (Extended) ====================

export interface AvailabilitySlot {
  day: string;
  dateRange: string;
  hours: string;
}

export interface ServiceDetails extends Service {
  rating: number;
  reviewCount: number;
  location: string;
  duration: string;
  aboutDescription: string;
  availability: AvailabilitySlot[];
  requirements: string[];
  equipmentProvided: string[];
  cancellationPolicy: string;
  termsConditions: string;
  bookingMode: string;
  providerApproval: string;
  imageUploadRequired: boolean;
  paymentMethod: string;
  holdPayment: string;
  recurringFrequency: string;
  visitsPerDay: number;
  autoGenerateBookings: boolean;
  createdDate: string;
  lastUpdated: string;
  address: string;
  serviceRadius: string;
  latitude: number;
  longitude: number;
}

export const serviceDetailsData: ServiceDetails[] = [
  {
    id: '1',
    name: 'Sheila Conway',
    price: 199.00,
    description: 'Sunt ut enim doloremSunt ut enim doloremSunt ut enim dolorem.',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Active',
    instantBooking: true,
    rating: 4.7,
    reviewCount: 47,
    location: 'Merseyside, UK',
    duration: '30 Mins',
    aboutDescription: 'Velit anis quaerat. Vero voluptate et delloro voluptate et de.',
    availability: [
      { day: 'Monday', dateRange: '15-10 AUG', hours: '09:00 - 17:00' },
      { day: 'Tuesday', dateRange: '15-16 AUG', hours: '09:00 - 17:00' },
      { day: 'Wednesday', dateRange: '15-16 AUG', hours: '09:00 - 17:00' },
      { day: 'Thursday', dateRange: '15-18 AUG', hours: '09:00 - 17:00' },
      { day: 'Friday', dateRange: '15-18 AUG', hours: '09:00 - 17:00' },
    ],
    requirements: ['Some obscaecati vel'],
    equipmentProvided: ['Voluptas consectetur'],
    cancellationPolicy: 'Vero voluptate et dolorem sem.',
    termsConditions: 'Vero voluptate et dolorem sem.',
    bookingMode: 'Instant Booking',
    providerApproval: 'Not Required',
    imageUploadRequired: false,
    paymentMethod: 'Escrow (Hold Until Completion)',
    holdPayment: 'Until Completion',
    recurringFrequency: 'Monthly',
    visitsPerDay: 2,
    autoGenerateBookings: true,
    createdDate: '14/09/2025',
    lastUpdated: '23/07/2025',
    address: '6 Swansea Close, Merseyside, L19 2HF United Kingdom',
    serviceRadius: '41 miles',
    latitude: 53.3631,
    longitude: -2.9189,
  },
  {
    id: '2',
    name: 'Yuli Callahan',
    price: 124.00,
    description: 'Professional cleaning service with attention to detail.',
    image: require('@/assets/images/pending-job-image.jpeg'),
    status: 'Active',
    instantBooking: true,
    rating: 4.5,
    reviewCount: 32,
    location: 'London, UK',
    duration: '45 Mins',
    aboutDescription: 'Expert cleaning services for residential and commercial properties.',
    availability: [
      { day: 'Monday', dateRange: '15-10 AUG', hours: '08:00 - 18:00' },
      { day: 'Tuesday', dateRange: '15-16 AUG', hours: '08:00 - 18:00' },
      { day: 'Wednesday', dateRange: '15-16 AUG', hours: '08:00 - 18:00' },
      { day: 'Thursday', dateRange: '15-18 AUG', hours: '08:00 - 18:00' },
      { day: 'Friday', dateRange: '15-18 AUG', hours: '08:00 - 18:00' },
    ],
    requirements: ['Access to water', 'Parking space'],
    equipmentProvided: ['Cleaning supplies', 'Vacuum cleaner'],
    cancellationPolicy: '24 hours notice required for cancellation.',
    termsConditions: 'Standard terms and conditions apply.',
    bookingMode: 'Instant Booking',
    providerApproval: 'Not Required',
    imageUploadRequired: false,
    paymentMethod: 'Instant Payment',
    holdPayment: 'Not Applicable',
    recurringFrequency: 'Weekly',
    visitsPerDay: 3,
    autoGenerateBookings: false,
    createdDate: '10/08/2025',
    lastUpdated: '15/09/2025',
    address: '123 High Street, London, E1 6AN United Kingdom',
    serviceRadius: '25 miles',
    latitude: 51.5174,
    longitude: -0.0714,
  },
];

// Helper function to get service details by ID
export const getServiceDetailsById = (id: string): ServiceDetails | undefined => {
  return serviceDetailsData.find(service => service.id === id);
};

// ==================== SERVICE CATEGORIES DATA ====================

export interface CategoryOption {
  label: string;
  value: string;
}

export const serviceCategories: CategoryOption[] = [
  { label: 'Cleaning', value: 'cleaning' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Gardening', value: 'gardening' },
  { label: 'Plumbing', value: 'plumbing' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Painting', value: 'painting' },
  { label: 'Moving', value: 'moving' },
  { label: 'Other', value: 'other' },
];

export const serviceSubcategories: Record<string, CategoryOption[]> = {
  cleaning: [
    { label: 'Indoor Cleaning', value: 'indoor_cleaning' },
    { label: 'Outdoor Cleaning', value: 'outdoor_cleaning' },
    { label: 'Deep Cleaning', value: 'deep_cleaning' },
    { label: 'Window Cleaning', value: 'window_cleaning' },
    { label: 'Carpet Cleaning', value: 'carpet_cleaning' },
  ],
  maintenance: [
    { label: 'General Maintenance', value: 'general_maintenance' },
    { label: 'HVAC Services', value: 'hvac_services' },
    { label: 'Appliance Repair', value: 'appliance_repair' },
    { label: 'Roof Repair', value: 'roof_repair' },
  ],
  gardening: [
    { label: 'Lawn Mowing', value: 'lawn_mowing' },
    { label: 'Hedge Trimming', value: 'hedge_trimming' },
    { label: 'Tree Services', value: 'tree_services' },
    { label: 'Landscaping', value: 'landscaping' },
    { label: 'Plant Care', value: 'plant_care' },
  ],
  plumbing: [
    { label: 'Leak Repair', value: 'leak_repair' },
    { label: 'Drain Cleaning', value: 'drain_cleaning' },
    { label: 'Pipe Installation', value: 'pipe_installation' },
    { label: 'Water Heater', value: 'water_heater' },
  ],
  electrical: [
    { label: 'Wiring', value: 'wiring' },
    { label: 'Lighting Installation', value: 'lighting_installation' },
    { label: 'Outlet Repair', value: 'outlet_repair' },
    { label: 'Panel Upgrade', value: 'panel_upgrade' },
  ],
  painting: [
    { label: 'Interior Painting', value: 'interior_painting' },
    { label: 'Exterior Painting', value: 'exterior_painting' },
    { label: 'Wallpaper', value: 'wallpaper' },
    { label: 'Touch-ups', value: 'touch_ups' },
  ],
  moving: [
    { label: 'Local Moving', value: 'local_moving' },
    { label: 'Long Distance', value: 'long_distance' },
    { label: 'Packing Services', value: 'packing_services' },
    { label: 'Furniture Assembly', value: 'furniture_assembly' },
  ],
  other: [
    { label: 'Custom Service', value: 'custom_service' },
    { label: 'Consultation', value: 'consultation' },
  ],
};

// ==================== SERVICE DURATION OPTIONS ====================

export const serviceDurationOptions: CategoryOption[] = [
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '45 minutes', value: '45' },
  { label: '1 hour', value: '60' },
  { label: '1.5 hours', value: '90' },
  { label: '2 hours', value: '120' },
  { label: '3 hours', value: '180' },
  { label: '4 hours', value: '240' },
];

// ==================== ROUTE MODE OPTIONS ====================

export const routeModeOptions: CategoryOption[] = [
  { label: 'Fastest Route', value: 'fastest' },
  { label: 'Shortest Distance', value: 'shortest' },
  { label: 'Eco-friendly', value: 'eco' },
  { label: 'Avoid Highways', value: 'no_highways' },
  { label: 'Balanced', value: 'balanced' },
];

// ==================== PRICING OPTIONS (Step 3) ====================

export const priceOptions: CategoryOption[] = [
  { label: '0', value: '0' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
  { label: '150', value: '150' },
  { label: '200', value: '200' },
  { label: '250', value: '250' },
  { label: '500', value: '500' },
];

export const pricingTypeOptions: CategoryOption[] = [
  { label: 'Fixed Price', value: 'fixed' },
  { label: 'Hourly Rate', value: 'hourly' },
  { label: 'Per Job', value: 'per_job' },
  { label: 'Quote Based', value: 'quote' },
];

export const serviceRadiusOptions: CategoryOption[] = [
  { label: '5 miles', value: '5' },
  { label: '10 miles', value: '10' },
  { label: '15 miles', value: '15' },
  { label: '20 miles', value: '20' },
  { label: '25 miles', value: '25' },
  { label: '50 miles', value: '50' },
  { label: 'Nationwide', value: 'nationwide' },
];

export const minimumNoticeOptions: CategoryOption[] = [
  { label: '0 hours', value: '0' },
  { label: '1 hour', value: '1' },
  { label: '2 hours', value: '2' },
  { label: '4 hours', value: '4' },
  { label: '6 hours', value: '6' },
  { label: '12 hours', value: '12' },
  { label: '24 hours', value: '24' },
  { label: '48 hours', value: '48' },
];

// ==================== PAYMENT METHOD OPTIONS ====================

export interface PaymentMethodOption {
  id: string;
  title: string;
  description: string;
}

export const paymentMethodOptions: PaymentMethodOption[] = [
  {
    id: 'instant',
    title: 'Instant',
    description: 'Payment on booking, immediately when customer books',
  },
  {
    id: 'escrow',
    title: 'Escrow',
    description: 'Payment held until completion',
  },
  {
    id: 'both',
    title: 'Both',
    description: 'Customer chooses between instant and escrow',
  },
];
