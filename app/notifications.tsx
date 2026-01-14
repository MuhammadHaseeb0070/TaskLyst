import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  notificationsData,
  Notification,
  NotificationType,
} from "@/data/dummyData";

// Header Component (same as other screens)
const Header = () => {
  return (
    <View className="px-6 py-8">
      <View className="flex-row items-center relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center mr-4 z-10"
          activeOpacity={0.7}
        >
          <Text className="text-[#313d49] text-[24px] font-extrabold">←</Text>
        </TouchableOpacity>
        <View className="absolute left-0 right-0 items-center justify-center">
          <Text className="text-[#313d49] text-[28px] font-bold text-center">
            Notifications
          </Text>
        </View>
      </View>
    </View>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({
  selectedFilter,
  onFilterChange,
}: {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const filters = ["Newest First", "Oldest First", "Unread Only"];

  return (
    <View className="mb-4 z-20">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
        className="flex-row items-center"
      >
        <Text className="text-[#313d49] text-[18px] font-semibold mr-4">
          {selectedFilter}
        </Text>
      
        {isOpen ? (
          <Image
            source={require("@/assets/images/icon-arrow-right.png")}
            className="w-3.5 h-3.5 rotate-90"
            resizeMode="contain"
            style={{ transform: [{ rotate: "270deg" }] }}
          />
        ) : (
          <Image
            source={require("@/assets/images/icon-arrow-right.png")}
            className="w-3.5 h-3.5"
            resizeMode="contain"
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View
          className="absolute top-8 left-0 bg-white rounded-xl py-2 z-50 "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            minWidth: 150,
          }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => {
                onFilterChange(filter);
                setIsOpen(false);
              }}
              activeOpacity={0.7}
              className="px-4 py-3"
            >
              <Text
                className={`text-[14px] ${
                  selectedFilter === filter
                    ? "text-[#313d49] font-semibold"
                    : "text-[#6B7280]"
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Notification Icon Component
const NotificationIcon = ({ type }: { type: NotificationType }) => {
  // You can replace this with actual icons from assets
  return (
    <View className="w-12 h-12 rounded-full bg-[#add0eb] items-center justify-center">
      <Image
        source={require("@/assets/images/notification-screen-icon.png")}
        className="w-6 h-6"
        resizeMode="contain"
        style={{ tintColor: "#313d49" }}
      />
    </View>
  );
};

// Notification Card Component
const NotificationCard = ({
  notification,
  onDelete,
}: {
  notification: Notification;
  onDelete: (id: string) => void;
}) => {
  return (
    <View
      className="mb-4 bg-white rounded-2xl px-5 py-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center justify-between">
        {/* Icon */}
        <NotificationIcon type={notification.type} />

        {/* Content */}
        <View className="flex-1 ml-3">
          <Text className="text-[#68696b] text-[16px] font-bold mb-2">
            {notification.title}
          </Text>
          <Text className="text-[#68696b] text-[14px] mb-1" numberOfLines={1}>
            {notification.message}
          </Text>
          <Text className="text-[#68696b] text-[14px]">
            {notification.date}
          </Text>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => onDelete(notification.id)}
          activeOpacity={0.7}
          className="p-2 self-end"
        >
          <Image
            source={require("@/assets/images/delete-notification.png")}
            className="w-4 h-4"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Notifications Screen
export default function NotificationsScreen() {
  const [filter, setFilter] = useState("Newest First");
  const [notifications, setNotifications] = useState(notificationsData);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Sort notifications based on filter
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (filter === "Oldest First") {
      return a.id.localeCompare(b.id);
    }
    if (filter === "Unread Only") {
      return (a.read ? 1 : 0) - (b.read ? 1 : 0);
    }
    // Newest First (default)
    return b.id.localeCompare(a.id);
  });

  const displayedNotifications =
    filter === "Unread Only"
      ? sortedNotifications.filter((n) => !n.read)
      : sortedNotifications;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Filter Dropdown */}
        <FilterDropdown selectedFilter={filter} onFilterChange={setFilter} />

        {/* Notifications List */}
        <View className="mt-2">
          {displayedNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onDelete={handleDelete}
            />
          ))}
        </View>

        {/* Empty State */}
        {displayedNotifications.length === 0 && (
          <View className="items-center justify-center py-16">
            <Text className="text-[#9CA3AF] text-[16px]">
              No notifications found
            </Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
