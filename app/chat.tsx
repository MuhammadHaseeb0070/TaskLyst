import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  ChatMessage,
  getChatMessages,
  getContactAvatar,
  getContactStatus,
} from "@/data/chatData";

// Header Component
const ChatHeader = ({
  name,
  status,
  avatar,
  onBack,
  onCall,
  onVideoCall,
}: {
  name: string;
  status: string;
  avatar: any;
  onBack: () => void;
  onCall: () => void;
  onVideoCall: () => void;
}) => {
  return (
    <View className="bg-white px-4 py-4 flex-row items-center justify-between border-b border-gray-100">
      {/* Left Section */}
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={onBack} className="mr-3 p-1">
          <Text className="text-[26px] text-[#1F2937]">←</Text>
        </TouchableOpacity>

        {/* Avatar with Online Dot */}
        <View className="relative mr-3">
          <Image
            source={avatar}
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: "#ddd" }}
          />
          <View
            className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full"
            style={{
              borderWidth: 2,
              borderColor: "#FFFFFF",
            }}
          />
        </View>

        {/* Name and Status */}
        <View className="flex-1">
          <Text className="text-[#1F2937] text-[19px] font-semibold">{name}</Text>
          <Text className="text-[#797c7b] text-[15px]">{status}</Text>
        </View>
      </View>

      {/* Right Section - Call Icons */}
      <View className="flex-row items-center gap-5">
        <TouchableOpacity onPress={onCall} className="p-1">
          <Image
            source={require("@/assets/images/icon-phone-chatscreen.png")}
            className="w-6 h-6"
            style={{ tintColor: "#1F2937" }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVideoCall} className="p-1">
          <Image
            source={require("@/assets/images/icon-video-chatscreen.png")}
            className="w-6 h-6"
            style={{ tintColor: "#1F2937" }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Date Separator Component
const DateSeparator = ({ date }: { date: string }) => {
  return (
    <View className="items-center my-6">
      <View className="bg-[#f8fbfa] px-4 py-1.5 rounded-md">
        <Text className="text-[#6B7280] text-[13px] font-medium">{date}</Text>
      </View>
    </View>
  );
};

// Text Message Bubble Component
const TextMessageBubble = ({
  message,
  avatar,
  showDateBefore,
}: {
  message: ChatMessage;
  avatar?: any;
  showDateBefore?: boolean;
}) => {
  const isMe = message.sender === "me";

  return (
    <View
      className={`flex-row items-center ${showDateBefore ? "mt-4" : ""} mb-4 ${
        isMe ? "justify-end" : "justify-start"
      } px-4`}
    >
      {/* Avatar for received messages */}
      {!isMe && avatar && (
        <Image
          source={avatar}
          className="w-12 h-12 rounded-full mr-2 mt-1"
          style={{ backgroundColor: "#ddd" }}
        />
      )}

      <View className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
        {/* Message Bubble */}
        <View
          className={`px-5 py-3.5 ${
            isMe
              ? "bg-[#313d49] rounded-3xl "
              : "bg-[#ffffff] rounded-3xl "
          }`}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text
            className={`text-[15px] leading-6 font-medium ${
              isMe ? "text-white" : "text-[#1F2937]"
            }`}
          >
            {message.content}
          </Text>
        </View>

        {/* Check marks for sent messages */}
        {isMe && message.isRead && (
          <View className="mt-1 mr-1">
            <Image source={require("@/assets/images/icon-message-delivered.png")} className="w-4 h-4" />
          </View>
        )}
      </View>
    </View>
  );
};

// Audio Message Bubble Component
const AudioMessageBubble = ({
  message,
  avatar,
  showDateBefore,
}: {
  message: ChatMessage;
  avatar?: any;
  showDateBefore?: boolean;
}) => {
  const isMe = message.sender === "me";
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Generate realistic waveform based on audio
  const generateWaveform = useCallback(() => {
    const barCount = 40;
    const heights: number[] = [];
    
    for (let i = 0; i < barCount; i++) {
      const progress = i / barCount;
      
      // Multiple sine waves for natural look
      const wave1 = Math.sin(progress * Math.PI * 2) * 0.25;
      const wave2 = Math.sin(progress * Math.PI * 6) * 0.35;
      const wave3 = Math.sin(progress * Math.PI * 12) * 0.2;
      const noise = (Math.random() - 0.5) * 0.25;
      
      // Combine and normalize between 0.15 and 1
      let amplitude = wave1 + wave2 + wave3 + noise + 0.5;
      amplitude = Math.max(0.15, Math.min(1, amplitude));
      
      // Convert to pixel height (8 to 28 pixels)
      heights.push(8 + amplitude * 20);
    }
    
    return heights;
  }, []);

  const onPlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);

      // Check if audio finished playing
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    }
  }, []);

  // Load audio on mount
  useEffect(() => {
    const loadAudio = async () => {
      try {
        // Set audio mode with minimal settings to avoid keep awake error
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const { sound, status } = await Audio.Sound.createAsync(
          require("@/assets/audio/sample.mp3"),
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;

        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
        }
        
        // Generate waveform after loading
        setWaveformHeights(generateWaveform());
      } catch (error) {
        console.error("Error loading audio:", error);
        setWaveformHeights(generateWaveform());
      }
    };

    loadAudio();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, [onPlaybackStatusUpdate, generateWaveform]);

  const handlePlayPause = async () => {
    try {
      if (!soundRef.current) return;

      const status = await soundRef.current.getStatusAsync();

      if (status.isLoaded) {
        if (isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          if (status.positionMillis === status.durationMillis) {
            await soundRef.current.replayAsync();
          } else {
            await soundRef.current.playAsync();
          }
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error playing/pausing audio:", error);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress indicator position
  const getProgressPosition = () => {
    if (duration === 0) return 0;
    return (position / duration) * 100; // Percentage
  };

  return (
    <View
      className={`flex-row items-center ${showDateBefore ? "mt-4" : ""} mb-4 ${
        isMe ? "justify-end" : "justify-start"
      } px-4`}
    >
      {/* Avatar for received messages */}
      {!isMe && avatar && (
        <Image
          source={avatar}
          className="w-12 h-12 rounded-full mr-2 mt-1"
          style={{ backgroundColor: "#ddd" }}
        />
      )}

      <View className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
        {/* Audio Bubble */}
        <View
          className={`px-4 py-3.5 rounded-3xl flex-row items-center ${
            isMe ? "bg-[#313d49]" : "bg-[#ffffff]"
          }`}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            minWidth: 260,
          }}
        >
          {/* Play/Pause Button with Icon */}
          <TouchableOpacity
            onPress={handlePlayPause}
            className={`w-9 h-9 rounded-full items-center justify-center mr-3 ${
              isMe ? "bg-white" : "bg-[#313d49]"
            }`}
            activeOpacity={0.8}
          >
            {isPlaying ? (
              // Pause Icon (two bars)
              <View className="flex-row gap-[3px] items-center justify-center">
                <View 
                  className={`w-[3px] h-[12px] rounded-sm ${isMe ? "bg-[#313d49]" : "bg-white"}`}
                />
                <View 
                  className={`w-[3px] h-[12px] rounded-sm ${isMe ? "bg-[#313d49]" : "bg-white"}`}
                />
              </View>
            ) : (
              // Play Icon (triangle)
              <View 
                className="ml-0.5"
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderLeftWidth: 10,
                  borderRightWidth: 0,
                  borderBottomWidth: 6,
                  borderTopWidth: 6,
                  borderLeftColor: isMe ? "#313d49" : "#FFFFFF",
                  borderRightColor: "transparent",
                  borderBottomColor: "transparent",
                  borderTopColor: "transparent",
                }}
              />
            )}
          </TouchableOpacity>

          {/* Waveform with Progress Slider */}
          <View className="flex-1 h-10 justify-center mr-3">
            {/* Fixed Waveform Bars */}
            <View className="flex-row items-center gap-[2px] h-10">
              {waveformHeights.map((height, index) => (
                <View
                  key={index}
                  className={`w-[2px] rounded-full ${
                    isMe ? "bg-white" : "bg-[#313d49]"
                  }`}
                  style={{
                    height: height,
                    opacity: 0.3,
                  }}
                />
              ))}
            </View>
            
            {/* Progress Overlay - Shows played portion */}
            <View 
              className="absolute top-0 left-0 bottom-0 overflow-hidden"
              style={{ width: `${getProgressPosition()}%` }}
            >
              <View className="flex-row items-center gap-[2px] h-10">
                {waveformHeights.map((height, index) => (
                  <View
                    key={index}
                    className={`w-[2px] rounded-full ${
                      isMe ? "bg-white" : "bg-[#313d49]"
                    }`}
                    style={{
                      height: height,
                      opacity: 1,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Duration / Current Time */}
          <Text className={`text-[13px] font-medium ${isMe ? "text-white" : "text-[#313d49]"}`}>
            {isPlaying ? formatTime(position) : formatTime(duration)}
          </Text>
        </View>

        {/* Check marks */}
        {isMe && message.isRead && (
          <View className="mt-1 mr-1">
            <Image source={require("@/assets/images/icon-message-delivered.png")} className="w-4 h-4" />
          </View>
        )}
      </View>
    </View>
  );
};

// Location Message Bubble Component
const LocationMessageBubble = ({
  message,
  avatar,
  showDateBefore,
}: {
  message: ChatMessage;
  avatar?: any;
  showDateBefore?: boolean;
}) => {
  return (
    <View
      className={`flex-row items-center ${showDateBefore ? "mt-4" : ""} mb-4 justify-start px-4`}
    >
      {/* Avatar */}
      {avatar && (
        <Image
          source={avatar}
          className="w-12 h-12 rounded-full mr-2 mt-1"
          style={{ backgroundColor: "#ddd" }}
        />
      )}

      <View className="max-w-[75%]">
        {/* Location Bubble */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-[#ffffff] px-5 py-3.5 rounded-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text className="text-[#1F2937] text-[15px] leading-6 font-medium">
            {message.content}
          </Text>
          {message.locationName && (
            <Text className="text-[#6B7280] text-[13px] mt-1 font-medium">
             {message.locationName}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Image Message Bubble Component
const ImageMessageBubble = ({
  message,
  avatar,
  showDateBefore,
}: {
  message: ChatMessage;
  avatar?: any;
  showDateBefore?: boolean;
}) => {
  const isMe = message.sender === "me";

  return (
    <View
      className={`flex-row items-center ${showDateBefore ? "mt-4" : ""} mb-4 ${
        isMe ? "justify-end" : "justify-start"
      } px-4`}
    >
      {/* Avatar for received messages */}
      {!isMe && avatar && (
        <Image
          source={avatar}
          className="w-12 h-12 rounded-full mr-2 mt-1"
          style={{ backgroundColor: "#ddd" }}
        />
      )}

      <View className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
        {/* Image Bubble */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-2xl overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: message.mediaUrl }}
            className="w-56 h-56"
            resizeMode="cover"
            style={{ backgroundColor: "#f0f0f0" }}
          />
        </TouchableOpacity>

        {/* Check marks for sent messages */}
        {isMe && message.isRead && (
          <View className="mt-1 mr-1">
            <Image source={require("@/assets/images/icon-message-delivered.png")} className="w-4 h-4" />
          </View>
        )}
      </View>
    </View>
  );
};

// Message Item Renderer
const MessageItem = ({
  message,
  avatar,
  showDateBefore,
}: {
  message: ChatMessage;
  avatar?: any;
  showDateBefore?: boolean;
}) => {
  switch (message.type) {
    case "audio":
      return <AudioMessageBubble message={message} avatar={avatar} showDateBefore={showDateBefore} />;
    case "location":
      return (
        <LocationMessageBubble
          message={message}
          avatar={avatar}
          showDateBefore={showDateBefore}
        />
      );
    case "image":
      return (
        <ImageMessageBubble
          message={message}
          avatar={avatar}
          showDateBefore={showDateBefore}
        />
      );
    case "text":
    default:
      return (
        <TextMessageBubble
          message={message}
          avatar={avatar}
          showDateBefore={showDateBefore}
        />
      );
  }
};

// Input Bar Component
const InputBar = ({
  onSend,
  onAttach,
  onCamera,
  onMicrophone,
}: {
  onSend: (text: string) => void;
  onAttach: () => void;
  onCamera: () => void;
  onMicrophone: () => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const insets = useSafeAreaInsets();
  
  return (
    <View
      className="bg-[#fefefe] px-4 pt-6 border-t border-[#eefaf8]"
      style={{ paddingBottom: insets.bottom + 20 }}
    >
      <View className="flex-row items-start gap-3 ">
        {/* Attachment Icon */}
        <TouchableOpacity onPress={onAttach} className="p-1 mb-1">
          <Image
            source={require("@/assets/images/icon-attachment.png")}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Text Input Container */}
        <View className="flex-1">
          <View className="bg-[#ffffff] border border-solid border-[#eefaf8] rounded-xl px-3 py-2">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Write a message"
              placeholderTextColor="#9CA3AF"
              className="text-[15px] text-[#1F2937] min-h-[24px]"
              multiline
              maxLength={500}
              style={{ maxHeight: 100 }}
            />
          </View>
        </View>

        {/* Conditional Buttons - Show camera/mic OR send button */}
        {message.trim() ? (
          // Send Button
          <TouchableOpacity
            onPress={handleSend}
            className="bg-[#313d49] px-4 py-2 rounded-full mb-1"
            activeOpacity={0.8}
          >
            <Text className="text-white text-[14px] font-semibold">Send</Text>
          </TouchableOpacity>
        ) : (
          <>
            {/* Camera Icon */}
            <TouchableOpacity onPress={onCamera} className="p-1 mb-1">
              <Image
                source={require("@/assets/images/icon-camera.png")}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Microphone Icon */}
            <TouchableOpacity
              onPress={onMicrophone}
              className="p-1 mb-1"
              activeOpacity={0.8}
            >
              <Image
                source={require("@/assets/images/icon-microphone.png")}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

// Main Chat Screen
export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const contactName = (params.name as string) || "Contact";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contactAvatar, setContactAvatar] = useState<any>(null);
  const [contactStatus, setContactStatus] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Load chat data dynamically
    const chatMessages = getChatMessages(contactName);
    const avatar = getContactAvatar(contactName);
    const status = getContactStatus(contactName);

    setMessages(chatMessages);
    setContactAvatar(avatar);
    setContactStatus(status);
  }, [contactName]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "text",
      sender: "me",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: false,
    };

    setMessages([...messages, newMessage]);
  };

  const handleAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        Alert.alert(
          "File Selected",
          `You selected: ${result.assets[0].name}\n\nIn a real app, this would upload the file to your backend.`,
          [{ text: "OK" }]
        );
        
        // Simulate adding document message (for demo)
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          type: "text",
          sender: "me",
          content: `📎 ${result.assets[0].name}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: false,
        };
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const handleCamera = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Camera permission is required to take photos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets[0]) {
        Alert.alert(
          "Photo Taken",
          "In a real app, this would upload the photo to your backend.",
          [{ text: "OK" }]
        );
        
        // Simulate adding image message (for demo)
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          type: "image",
          sender: "me",
          content: "",
          mediaUrl: result.assets[0].uri,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: false,
        };
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const handleMicrophone = async () => {
    try {
      if (isRecording) {
        // Stop recording
        setIsRecording(false);
        Alert.alert(
          "Recording Stopped",
          "In a real app, this would save and upload the audio recording to your backend.",
          [{ text: "OK" }]
        );
      } else {
        // Request microphone permissions
        const { status } = await Audio.requestPermissionsAsync();
        
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Microphone permission is required to record audio."
          );
          return;
        }

        // Set recording mode
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
        } catch (error) {
          console.warn("Audio mode error:", error);
        }

        setIsRecording(true);
        Alert.alert(
          "Recording Started",
          "Press the microphone button again to stop recording.\n\nIn a real app, this would record audio.",
          [
            {
              text: "Stop Recording",
              onPress: () => {
                setIsRecording(false);
                // Simulate adding audio message
                const newMessage: ChatMessage = {
                  id: Date.now().toString(),
                  type: "audio",
                  sender: "me",
                  content: "",
                  audioDuration: "00:05",
                  audioUrl: "@/assets/audio/sample.mp3",
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  isRead: false,
                };
                setMessages([...messages, newMessage]);
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error with microphone:", error);
      setIsRecording(false);
      Alert.alert("Error", "Failed to access microphone. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <ChatHeader
        name={contactName}
        status={contactStatus}
        avatar={contactAvatar}
        onBack={() => router.back()}
        onCall={() => console.log("Call")}
        onVideoCall={() => console.log("Video call")}
      />

      {/* Messages List */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-[#FAFAFA]"
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            // Check if we need to show date separator
            const showDate = index === 0;
            const showDateBefore = index === 0;
            
            return (
              <>
                {showDate && <DateSeparator date="Today" />}
                <MessageItem
                  message={item}
                  avatar={contactAvatar}
                  showDateBefore={showDateBefore}
                />
              </>
            );
          }}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 16,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-[#9CA3AF] text-[15px]">
                No messages yet
              </Text>
            </View>
          }
        />

        {/* Input Bar */}
        <InputBar
          onSend={handleSendMessage}
          onAttach={handleAttachment}
          onCamera={handleCamera}
          onMicrophone={handleMicrophone}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
