import { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { messages, MessageStatus } from "@/data/dummyData";

import { router } from "expo-router";
// Tab options
const TAB_OPTIONS: MessageStatus[] = ["Open", "Archived"];

// Header Component
const Header = () => {
  return (
    <View className="bg-[#313d49] px-2 py-8">
      {/* Title Row */}
      <View className="bg-[#313d49] px-4">
        {/* Title Row */}

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between w-full">
            <View className="flex-col items-startr justify-center">
              <Text className="text-white text-[30px] font-bold ">
                Messages
              </Text>
              <Text className="text-[#eeeeee] text-[14px]  align-bottom">
                Communicate with your clients
              </Text>
            </View>
            <View className=" flex-row  justify-between align-center">
              <TouchableOpacity
                className="w-12 h-12 rounded-full bg-white items-center justify-center"
                activeOpacity={0.7}
                onPress={() => router.push("/notifications")}
              >
                <Image
                  source={require("@/assets/images/icon_notification_bell.png")}
                  className="w-7 h-7"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notification Bell */}
        </View>
      </View>
    </View>
  );
};

// Tab Selector Component for Messages
const TabSelector = ({
  activeTab,
  onTabChange,
}: {
  activeTab: MessageStatus;
  onTabChange: (tab: MessageStatus) => void;
}) => {
  return (
    <View className=" w-full">
      <View className="flex-row bg-[#f8f8f8] rounded-full p-1.5 shadow-sm">
        {TAB_OPTIONS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              className={`flex-1 py-3 rounded-full items-center justify-center ${
                isActive ? "bg-[#313d49]" : ""
              }`}
            >
              <Text
                className={`text-[14px] font-semibold ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Search Bar Component
const SearchBar = () => {
  return (
    <View
      className="flex-row items-center bg-white rounded-2xl px-4 py-1 mt-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={require("@/assets/images/icon-search.png")}
        className="w-5 h-5 mr-3"
        resizeMode="contain"
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-[16px] text-gray-700"
      />
    </View>
  );
};

// Message Item Component
const MessageItem = ({
  message,
  onPress,
  isPressed,
}: {
  message: (typeof messages)[0];
  onPress: () => void;
  isPressed: boolean;
}) => {
  const hasUnread = message.unreadCount > 0;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center py-4 px-4 rounded-2xl ${
        isPressed ? "bg-[#F3F4F6]" : ""
      }`}
    >
      {/* Avatar with Online Dot */}
      <View className="relative mr-3">
        <Image
          source={message.senderAvatar}
          className="w-14 h-14 rounded-full"
          style={{ backgroundColor: "#ddd" }}
        />
        {/* Online Status Dot */}
        <View
          className="absolute bottom-[-3] right-[-2] w-5 h-5 bg-[#313d49] rounded-full"
          style={{
            borderWidth: 2,
            borderColor: "#FFFFFF",
          }}
        />
      </View>

      {/* Message Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[#1F2937] text-[16px] font-bold">
            {message.senderName}
          </Text>
          <Text 
            className="text-[12px]"
            style={{ color: hasUnread ? "#0f172a" : "#9CA3AF" }}
          >
            {message.time}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text 
            className="text-[14px] flex-1" 
            numberOfLines={1}
            style={{ color: hasUnread ? "#0f172a" : "#9CA3AF" }}
          >
            {message.lastMessage}
          </Text>
          {hasUnread && (
            <View className="bg-[#0f172a] w-7 h-7 rounded-full items-center justify-center ml-2">
              <Text className="text-[#ffffff] text-[11px] font-semibold">
                {message.unreadCount}
              </Text>
            </View>
          )}
          {!hasUnread && (
            <TouchableOpacity className="ml-2">
              <Text className="text-[#9CA3AF] text-[20px]">⋯</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Messages Screen
export default function MessageScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<MessageStatus>("Open");
  const [pressedMessageId, setPressedMessageId] = useState<string | null>(null);

  // Filter messages based on active tab
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => message.status === activeTab);
  }, [activeTab]);

  const handleMessagePress = (messageId: string) => {
    setPressedMessageId(messageId);
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      router.push(`/chat?name=${encodeURIComponent(message.senderName)}`);
    }
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      {/* Header */}
      <Header />

      {/* Content Area - White Card with Shadow */}
      <View className="flex-1 bg-gray-100 mb-4 mt-8">
        <View
          className="flex-1 bg-white mx-4 mt-0 rounded-3xl py-3"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {/* Card Content */}
          <View className="flex-1 px-6 ">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-[#1F2937] text-[24px] font-bold">Chat</Text>
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-[#313d49] items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-white text-[20px] font-light">+</Text>
              </TouchableOpacity>
            </View>

            {/* Tab Selector */}
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Search Bar */}
            <SearchBar />

            {/* Messages List */}
            <FlatList
              className="mt-3"
              data={filteredMessages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MessageItem
                  message={item}
                  onPress={() => handleMessagePress(item.id)}
                  isPressed={pressedMessageId === item.id}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 16,
                paddingBottom: 24,
              }}
              ListEmptyComponent={
                <View className="py-12 items-center">
                  <Text className="text-gray-400 text-[15px]">
                    No {activeTab.toLowerCase()} messages
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
