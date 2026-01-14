import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  serviceDurationOptions,
  routeModeOptions,
  CategoryOption,
} from "@/data/dummyData";

// Header Component
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
            Create New Service
          </Text>
        </View>
      </View>
    </View>
  );
};

// Progress Indicator Component
const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <View className="flex-row items-center w-full mb-6">
    {[1, 2, 3].map((step, index) => (
      <View
        key={step}
        className={`flex-row items-center ${index < 2 ? "flex-1" : ""}`}
      >
        {/* Step Circle */}
        <View
          className={`w-10 h-10 rounded-full items-center justify-center z-10 ${
            step <= currentStep
              ? "bg-[#313d49]"
              : "bg-white border-2 border-gray-200"
          }`}
        >
          <Text
            className={`text-[14px] font-bold ${
              step <= currentStep ? "text-white" : "text-gray-400"
            }`}
          >
            {step}
          </Text>
        </View>

        {/* Connecting Line */}
        {index < 2 && (
          <View
            className={`flex-1 h-[2px] ${
              step < currentStep ? "bg-[#313d49]" : "bg-gray-200"
            }`}
          />
        )}
      </View>
    ))}
  </View>
);

// Section Card Component
const SectionCard = ({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  return (
    <View
      className="bg-white rounded-2xl p-5 mb-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Header Row */}
      <View className="flex-row items-center mb-4">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: "#E0F2FE" }}
        >
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-[#313d49] text-[18px] font-bold">{title}</Text>
          <Text className="text-[#68696b] text-[14px]">{subtitle}</Text>
        </View>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

// Dropdown Field Component
const DropdownField = ({
  label,
  placeholder,
  value,
  onPress,
}: {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
}) => {
  return (
    <View className="mb-4">
      <Text className="text-[#374151] text-[16px] font-semibold mb-2">
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="rounded-xl px-4 py-4 border border-[#E5E7EB] flex-row items-center justify-between"
      >
        <Text
          className={`text-[15px] ${value ? "text-[#1F2937]" : "text-[#9CA3AF]"}`}
        >
          {value || placeholder}
        </Text>
        <Image
          source={require("@/assets/images/icon-chevron-down.png")}
          className="w-5 h-5"
          resizeMode="contain"
          style={{ tintColor: "#9CA3AF" }}
        />
      </TouchableOpacity>
    </View>
  );
};

// Text Area Field Component
const TextAreaField = ({
  label,
  placeholder,
  value,
  onChangeText,
  helperText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  helperText?: string;
}) => {
  return (
    <View className="mb-4">
      <Text className="text-[#374151] text-[16px] font-semibold mb-2">
        {label}
      </Text>
      <View className="rounded-xl px-4 border border-[#E5E7EB]">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          className="text-[15px] text-[#1F2937] py-4"
          style={{ minHeight: 120 }}
        />
      </View>
      {helperText && (
        <Text className="text-[#9CA3AF] text-[13px] mt-2">{helperText}</Text>
      )}
    </View>
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

// Switch Field Component (NEW)
const SwitchField = ({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-1 mr-4">
        <Text className="text-[#374151] text-[16px] font-semibold">
          {label}
        </Text>
        <Text className="text-[#68696b] text-[14px] mt-1">{description}</Text>
      </View>
      <CustomSwitch
        toggleValue={value}
        onToggleChange={onValueChange}
      />
    </View>
  );
};

// Dropdown Modal Component
const DropdownModal = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: {
  visible: boolean;
  title: string;
  options: CategoryOption[];
  selectedValue: string;
  onSelect: (value: string, label: string) => void;
  onClose: () => void;
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-end"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="bg-white rounded-t-3xl max-h-[60%]">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
            <Text className="text-[18px] font-bold text-[#1F2937]">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-[24px] text-[#6B7280]">×</Text>
            </TouchableOpacity>
          </View>

          {/* Options */}
          <ScrollView className="px-6 py-2" style={{ paddingBottom: insets.bottom + 16 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  onSelect(option.value, option.label);
                  onClose();
                }}
                className={`py-4 border-b border-[#F3F4F6] ${
                  selectedValue === option.value ? "bg-[#F0F9FF]" : ""
                }`}
              >
                <Text
                  className={`text-[16px] ${
                    selectedValue === option.value
                      ? "text-[#313d49] font-semibold"
                      : "text-[#374151]"
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Settings Icon Component
const SettingsIcon = () => (
<Image
  source={require("@/assets/images/service-configuration.png")}
  className="w-6 h-6"
  resizeMode="contain"
/>

);

// Lightning Icon Component
const LightningIcon = () => (
  <Image
  source={require("@/assets/images/lightning-icon.png")}
  className="w-6 h-6"
  resizeMode="contain"
/>
);

// Location Icon Component
const LocationIcon = () => (
  <Image
    source={require("@/assets/images/location.png")}
    className="w-6 h-6"
    resizeMode="contain"
  />
);

// Main Screen Component
export default function CreateServiceStep2Screen() {
  const insets = useSafeAreaInsets();
  
  // Get params from Step 1
  const params = useLocalSearchParams();

  // Form state
  const [serviceDuration, setServiceDuration] = useState("");
  const [serviceDurationLabel, setServiceDurationLabel] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [instantBooking, setInstantBooking] = useState(true);
  const [optimizeRoutes, setOptimizeRoutes] = useState(true);
  const [routeMode, setRouteMode] = useState("");
  const [routeModeLabel, setRouteModeLabel] = useState("");

  // Modal state
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [routeModeModalVisible, setRouteModeModalVisible] = useState(false);

  // Handle duration selection
  const handleDurationSelect = (value: string, label: string) => {
    setServiceDuration(value);
    setServiceDurationLabel(label);
  };

  // Handle route mode selection
  const handleRouteModeSelect = (value: string, label: string) => {
    setRouteMode(value);
    setRouteModeLabel(label);
  };

  // Handle Next button
  const handleNext = () => {
    // Validate form
    if (!serviceDuration) {
      alert("Please select a service duration");
      return;
    }

    // Navigate to step 3
    router.push({
      pathname: "/create-service-step3",
      params: {
        ...params,
        serviceDuration,
        serviceDurationLabel,
        specialRequirements,
        instantBooking: instantBooking.toString(),
        optimizeRoutes: optimizeRoutes.toString(),
        routeMode,
        routeModeLabel,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />

        {/* Service Configuration Section */}
        <SectionCard
          icon={<SettingsIcon />}
          title="Service Configuration"
          subtitle="Configure service-specific settings"
        >
          <DropdownField
            label="Service Duration (Minutes)"
            placeholder="Enter Service Duration"
            value={serviceDurationLabel}
            onPress={() => setDurationModalVisible(true)}
          />

          <TextAreaField
            label="Special Requirements"
            placeholder="Any Special Requirements or notes..."
            value={specialRequirements}
            onChangeText={setSpecialRequirements}
          />
        </SectionCard>

        {/* How Customers Book Section */}
        <SectionCard
          icon={<LightningIcon />}
          title="How Customers Book"
          subtitle="Choose how customers book your service"
        >
          <SwitchField
            label="Booking Type"
            description="Instant Booking - Customers book immediately"
            value={instantBooking}
            onValueChange={setInstantBooking}
          />
        </SectionCard>

        {/* Routing & Location Section */}
        <SectionCard
          icon={<LocationIcon />}
          title="Routing & Location"
          subtitle="Configure route optimization and zone-based scheduling"
        >
          <SwitchField
            label="Optimize Routes"
            description="Automatically plan efficient routes between jobs"
            value={optimizeRoutes}
            onValueChange={setOptimizeRoutes}
          />

          <DropdownField
            label="Route Mode"
            placeholder="Select Route Mode"
            value={routeModeLabel}
            onPress={() => setRouteModeModalVisible(true)}
          />
        </SectionCard>

        {/* Bottom spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="px-6 pt-2 bg-white" style={{ paddingBottom: insets.bottom + 24 }}>
        <TouchableOpacity
          className="bg-[#313d49] py-4 rounded-full"
          activeOpacity={0.7}
          onPress={handleNext}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* Duration Modal */}
      <DropdownModal
        visible={durationModalVisible}
        title="Select Duration"
        options={serviceDurationOptions}
        selectedValue={serviceDuration}
        onSelect={handleDurationSelect}
        onClose={() => setDurationModalVisible(false)}
      />

      {/* Route Mode Modal */}
      <DropdownModal
        visible={routeModeModalVisible}
        title="Select Route Mode"
        options={routeModeOptions}
        selectedValue={routeMode}
        onSelect={handleRouteModeSelect}
        onClose={() => setRouteModeModalVisible(false)}
      />
    </SafeAreaView>
  );
}
