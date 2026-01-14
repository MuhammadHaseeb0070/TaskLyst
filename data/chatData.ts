// Chat message types
export type MessageType = "text" | "audio" | "video" | "image" | "location" | "document";
export type MessageSender = "me" | "other";

export interface ChatMessage {
  id: string;
  type: MessageType;
  sender: MessageSender;
  content: string;
  timestamp: string;
  isRead?: boolean;
  
  // Audio specific
  audioDuration?: string;
  audioUrl?: string;
  
  // Image/Video specific
  mediaUrl?: string;
  thumbnailUrl?: string;
  
  // Location specific
  latitude?: number;
  longitude?: number;
  locationName?: string;
  
  // Document specific
  fileName?: string;
  fileSize?: string;
}

// Sample chat conversations
const profileImage = require('@/assets/images/Ellipse 172.png');

export const chatConversations: Record<string, ChatMessage[]> = {
  'Andreana Viola': [
    {
      id: '1',
      type: 'text',
      sender: 'me',
      content: "Hi there! Need a quick fix or a full home tune-up? I'm here to help.",
      timestamp: '10:30 AM',
      isRead: true,
    },
    {
      id: '2',
      type: 'text',
      sender: 'other',
      content: 'What can I help you with today? A leaky faucet, loose cabinet, or something else?',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      type: 'audio',
      sender: 'me',
      content: '',
      timestamp: '10:35 AM',
      audioDuration: '00:16',
      audioUrl: '@/assets/audio/sample.mp3',
      isRead: true,
    },
    {
      id: '4',
      type: 'location',
      sender: 'other',
      content: '? Share Your Location Details',
      timestamp: '10:40 AM',
      latitude: 40.7128,
      longitude: -74.0060,
      locationName: 'New York, NY',
    },
  ],
  'Francesco Long': [
    {
      id: '1',
      type: 'text',
      sender: 'other',
      content: 'Hi @Angel, I hope you are doing well!',
      timestamp: '09:15 AM',
    },
    {
      id: '2',
      type: 'text',
      sender: 'me',
      content: 'Hello! Yes, I am doing great. How can I help you today?',
      timestamp: '09:20 AM',
      isRead: true,
    },
    {
      id: '3',
      type: 'audio',
      sender: 'other',
      content: '',
      timestamp: '09:25 AM',
      audioDuration: '00:23',
      audioUrl: '@/assets/audio/sample.mp3',
    },
  ],
  'Alexandra Michu': [
    {
      id: '1',
      type: 'text',
      sender: 'other',
      content: 'Hi, How are you today?',
      timestamp: '09:00 AM',
    },
    {
      id: '2',
      type: 'text',
      sender: 'me',
      content: "I'm doing well, thank you! What about you?",
      timestamp: '09:05 AM',
      isRead: true,
    },
  ],
  'Hwang Lee': [
    {
      id: '1',
      type: 'text',
      sender: 'other',
      content: 'I hope it will be finished soon',
      timestamp: 'Today',
    },
    {
      id: '2',
      type: 'text',
      sender: 'me',
      content: 'Yes, we are almost done. Should be ready by tomorrow.',
      timestamp: 'Today',
      isRead: true,
    },
  ],
  'Maximillian': [
    {
      id: '1',
      type: 'text',
      sender: 'me',
      content: 'You are absolutely right!',
      timestamp: '23/11',
      isRead: true,
    },
  ],
  'Xiao Ming': [
    {
      id: '1',
      type: 'text',
      sender: 'other',
      content: 'Okay, Great!',
      timestamp: '23/11',
    },
  ],
};

// Get chat messages for a specific contact
export const getChatMessages = (contactName: string): ChatMessage[] => {
  return chatConversations[contactName] || [];
};

// Get contact avatar (in real app, this would come from user data)
export const getContactAvatar = (contactName: string) => {
  return profileImage;
};

// Get contact status (in real app, this would come from presence data)
export const getContactStatus = (contactName: string): string => {
  // Simulate online status
  return 'Active now';
};
