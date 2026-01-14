import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router } from "expo-router";

// Logout Modal Component
const LogoutModal = ({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#1a1a2e]/95 justify-center items-center px-6">
        {/* Modal Card */}
        <View
          className="bg-white rounded-3xl w-full overflow-hidden "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 20,
          }}
        >
          {/* Image - contains everything (icon, bubbles, title, description) */}
          <View
            className="items-end relative"
            style={{ height: 420, width: "100%", backgroundColor: "#1e1e1e" }}
          >
            <Image
              source={require("@/assets/images/logout.png")}
              className="w-full"
              style={{ height: "100%", width: "100%" }}
            />
            <View
              className="px-6 flex-row absolute bottom-0 left-0 right-0"
              style={{ gap: 12, paddingBottom: insets.bottom + 24 }}
            >
              {/* Cancel Button */}
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="flex-1 py-3.5 rounded-full border-2 border-[#313d49]"
              >
                <Text className="text-[#313d49] text-[16px] font-semibold text-center">
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Allow Button */}
              <TouchableOpacity
                onPress={onConfirm}
                activeOpacity={0.7}
                className="flex-1 py-3.5 rounded-full bg-[#313d49]"
              >
                <Text className="text-white text-[16px] font-semibold text-center">
                  Allow
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
        </View>
      </View>
    </Modal>
  );
};

// Deactivate Account Modal Component
const DeactivateModal = ({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#1a1a2e]/95 justify-center items-center px-6">
        {/* Modal Card */}
        <View
          className="bg-white rounded-3xl w-full overflow-hidden "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 20,
          }}
        >
          {/* Image - contains everything (icon, bubbles, title, description) */}
          <View
            className="items-end relative"
            style={{ height: 420, width: "100%", backgroundColor: "#1e1e1e" }}
          >
            <Image
              source={require("@/assets/images/deactivateImage.png")}
              className="w-full"
              style={{ height: "100%", width: "100%" }}
            />
            <View
              className="px-6 flex-row absolute bottom-0 left-0 right-0"
              style={{ gap: 12, paddingBottom: insets.bottom + 24 }}
            >
              {/* Cancel Button */}
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="flex-1 py-3.5 rounded-full border-2 border-[#313d49]"
              >
                <Text className="text-[#313d49] text-[16px] font-semibold text-center">
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Allow Button */}
              <TouchableOpacity
                onPress={onConfirm}
                activeOpacity={0.7}
                className="flex-1 py-3.5 rounded-full bg-[#313d49]"
              >
                <Text className="text-white text-[16px] font-semibold text-center">
                  Allow
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
        </View>
      </View>
    </Modal>
  );
};

// Custom Switch Component
const CustomSwitch = ({
  toggleValue,
  onToggleChange,
}: {
  toggleValue: boolean;
  onToggleChange: (value: boolean) => void;
}) => {
  const translateX = useRef(new Animated.Value(toggleValue ? 10 : 2)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: toggleValue ? 10 : 2,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [toggleValue]);

  return (
    <Pressable
      onPress={() => onToggleChange(!toggleValue)}
      style={{
        width: 30,
        height: 18,
        borderRadius: 13,
        padding: 2,
        backgroundColor: toggleValue ? "#2C3E50" : "#D1D5DB",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          width: 14,
          height: 14,
          borderRadius: 11,
          backgroundColor: "#FFFFFF",
          transform: [{ translateX }],
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
        }}
      />
    </Pressable>
  );
};

// Menu Item Component
const MenuItem = ({
  icon,
  label,
  onPress,
  showArrow = true,
  showToggle = false,
  toggleValue = false,
  onToggleChange,
  isLast = false,
}: {
  icon: any;
  label: string;
  onPress?: () => void;
  showArrow?: boolean;
  showToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  isLast?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={showToggle ? 1 : 0.7}
    className={`flex-row items-center py-3 ${!isLast ? "" : ""}`}
  >
    <View className="w-10 h-10 rounded-full bg-[#F9FAFB] items-center justify-center mr-1">
      <Image
        source={icon}
        className="w-6 h-6"
        resizeMode="contain"
        style={{ tintColor: "#374151" }}
      />
    </View>
    <Text className="flex-1 text-[17px] font-normal text-[#1F2937]">
      {label}
    </Text>
    {showToggle ? (
      <CustomSwitch
        toggleValue={toggleValue || false}
        onToggleChange={onToggleChange || (() => {})}
      />
    ) : showArrow ? (
      <Image
        source={require("@/assets/images/icon-arrow-right.png")}
        className="w-3.5 h-3.5"
        resizeMode="contain"
      />
    ) : null}
  </TouchableOpacity>
);

// Header Component (same as quotes/messages screen)
const Header = () => {
  return (
    <View className="bg-[#313d49] px-2 py-8">
      {/* Title Row */}
      <View className="bg-[#313d49] px-4">
        {/* Title Row */}

        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center w-full justify-between">
            <View className="flex-col items-startr justify-center">
              <Text className="text-white text-[30px] font-bold ">
                Settings
              </Text>
              <Text className="text-[#eeeeee] text-[14px]  align-bottom">
                Start Editing Your Profile
              </Text>
            </View>
            <View className="align-center">
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

// Profile Section Component
const ProfileSection = () => {
  return (
    <View className=" flex-row items-center py-6 px-6 mt-8">
      {/* Profile Image Container */}
      <View className="relative mb-4">
        <Image
          source={require("@/assets/images/Ellipse 172.png")}
          className="w-24 h-24 rounded-full"
          resizeMode="cover"
        />
        {/* Camera Icon Overlay */}
        <TouchableOpacity
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#add0eb] items-center justify-center"
          activeOpacity={0.7}
        >
          <Image
            source={require("@/assets/images/icon-camera-settings.png")}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className="ml-8">
        {/* Name and Username */}
        <Text className="text-[20px] font-semibold text-[#1F2937] mb-1">
          Charlotte King
        </Text>
        <Text className="text-[17px] text-[#1F2937] mb-2 font-medium">
          @johnkinggraphics
        </Text>

        {/* Edit Profile Button */}
        <TouchableOpacity
          className="bg-[#2C3E50] px-6 py-3 rounded-full"
          activeOpacity={0.7}
        >
          <Text className="text-white text-center text-[16px] font-semibold">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Settings Screen
export default function SettingScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // Navigate to login or welcome screen
    router.replace("/login");
  };

  const handleDeactivate = () => {
    setDeactivateModalVisible(false);
    // Handle account deactivation logic
    router.replace("/welcome");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#313d49]" edges={["top"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <ScrollView
        className="flex-1 bg-[#F3F4F6]"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section - No background */}
        <View className="bg-[#F3F4F6]">
          <ProfileSection />
        </View>

        {/* Main Menu Card */}
        <View
          className="mx-4 mb-4 bg-white rounded-2xl px-4 py-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <MenuItem
            icon={require("@/assets/images/icon-client-management.png")}
            label="Client Management"
            onPress={() => router.push("/client-management")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-business-details.png")}
            label="Business Details"
            onPress={() => router.push("/business-details")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-services.png")}
            label="Services"
            onPress={() => router.push("/services")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-quote-settings.png")}
            label="Quote"
            onPress={() => console.log("Quote")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-reviews.png")}
            label="Reviews"
            onPress={() => router.push("/reviews")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-payments.png")}
            label="Payments"
            onPress={() => router.push("/payments")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-subscriptions.png")}
            label="Subscriptions"
            onPress={() => router.push("/subscriptions")}
          />
          <MenuItem
            icon={require("@/assets/images/icon-notification-settings.png")}
            label="Notification"
            showArrow={false}
            showToggle={true}
            toggleValue={notificationsEnabled}
            onToggleChange={setNotificationsEnabled}
            isLast={true}
          />
        </View>

        {/* Account Actions Card */}
        <View
          className="mx-4 mb-6 bg-white rounded-2xl px-4 py-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <MenuItem
            icon={require("@/assets/images/icon-deactivate.png")}
            label="Deactivate Account"
            onPress={() => setDeactivateModalVisible(true)}
          />
          <MenuItem
            icon={require("@/assets/images/icon-logout.png")}
            label="Logout"
            onPress={() => setLogoutModalVisible(true)}
            isLast={true}
          />
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Logout Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />

      {/* Deactivate Account Modal */}
      <DeactivateModal
        visible={deactivateModalVisible}
        onClose={() => setDeactivateModalVisible(false)}
        onConfirm={handleDeactivate}
      />
    </SafeAreaView>
  );
}
