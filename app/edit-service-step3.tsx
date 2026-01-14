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
  priceOptions,
  pricingTypeOptions,
  serviceRadiusOptions,
  minimumNoticeOptions,
  paymentMethodOptions,
  CategoryOption,
  getServiceDetailsById,
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
            Edit Service
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

// Dropdown Field Component with Required Asterisk
const DropdownField = ({
  label,
  placeholder,
  value,
  onPress,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
  required?: boolean;
}) => {
  return (
    <View className="mb-4">
      <Text className="text-[#374151] text-[16px] font-semibold mb-2">
        {label}
        {required && <Text className="text-red-500">*</Text>}
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

// Input Field with Icon Component
const InputFieldWithIcon = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: React.ReactNode;
  required?: boolean;
}) => {
  return (
    <View className="mb-4">
      <Text className="text-[#374151] text-[16px] font-semibold mb-2">
        {label}
        {required && <Text className="text-red-500">*</Text>}
      </Text>
      <View className="rounded-xl px-4 border border-[#E5E7EB] flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-[15px] text-[#1F2937] py-4"
        />
        {icon}
      </View>
    </View>
  );
};

// Radio Option Card Component
const RadioOptionCard = ({
  title,
  description,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
      className={`rounded-xl px-4 py-4 mb-3 border-2 ${
        selected ? "border-[#313d49] bg-[#e2f0fb]" : "border-[#E5E7EB]"
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <Text className="text-[#374151] text-[16px] font-semibold">
            {title}
          </Text>
          <Text className="text-[#68696b] text-[14px] mt-1">{description}</Text>
        </View>
        {/* Radio Circle */}
        <View
          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            selected ? "border-[#add0eb] bg-[#add0eb]" : "border-[#D1D5DB]"
          }`}
        >
          {selected && <Text className="text-[#313d49] text-[12px]">✓</Text>}
        </View>
      </View>
    </TouchableOpacity>
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
  const translateX = useRef(new Animated.Value(toggleValue ? 12 : 2)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: toggleValue ? 12 : 2,
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

// Switch Field Component
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

// Location Icon Component - Reusing original icon from create-service-step3 (NO TINT)
const LocationIcon = () => (
  <Image
    source={require("@/assets/images/location.png")}
    className="w-6 h-6"
    resizeMode="contain"
  />
);

// Location Icon for Input - Reusing original icon from create-service-step3 (NO TINT)
const LocationInputIcon = () => (
  <Image
    source={require("@/assets/images/location.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);

// Lightning Icon Component - Reusing original icon from create-service-step3 (NO TINT)
const LightningIcon = () => (
  <Image
    source={require("@/assets/images/lightning-icon.png")}
    className="w-6 h-6"
    resizeMode="contain"
  />
);

// Main Screen Component
export default function EditServiceStep3Screen() {
  const insets = useSafeAreaInsets();
  
  // Get params from previous steps
  const params = useLocalSearchParams<{
    serviceId?: string;
    serviceName?: string;
    category?: string;
    categoryLabel?: string;
    subcategory?: string;
    subcategoryLabel?: string;
    description?: string;
    imageCount?: string;
    isEdit?: string;
    serviceDuration?: string;
    serviceDurationLabel?: string;
    specialRequirements?: string;
    instantBooking?: string;
    optimizeRoutes?: string;
    routeMode?: string;
    routeModeLabel?: string;
  }>();

  // Form state - Pricing & Location
  const [price, setPrice] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [pricingTypeLabel, setPricingTypeLabel] = useState("");
  const [serviceRadius, setServiceRadius] = useState("");
  const [serviceRadiusLabel, setServiceRadiusLabel] = useState("");
  const [minimumNotice, setMinimumNotice] = useState("");
  const [minimumNoticeLabel, setMinimumNoticeLabel] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");

  // Form state - Payment Settings
  const [paymentMethod, setPaymentMethod] = useState("instant");
  const [holdPayment, setHoldPayment] = useState(true);

  // Modal state
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [pricingTypeModalVisible, setPricingTypeModalVisible] = useState(false);
  const [radiusModalVisible, setRadiusModalVisible] = useState(false);
  const [noticeModalVisible, setNoticeModalVisible] = useState(false);

  // Initialize form with existing service data if editing
  useEffect(() => {
    if (params.isEdit === "true" && params.serviceId) {
      const serviceDetails = getServiceDetailsById(params.serviceId);
      if (serviceDetails) {
        // Set price - convert price number to string value
        const priceValue = serviceDetails.price.toString();
        const priceOption = priceOptions.find(
          (opt) => opt.value === priceValue || Math.abs(parseFloat(opt.value) - serviceDetails.price) < 1
        );
        if (priceOption) {
          setPrice(priceOption.value);
          setPriceLabel(priceOption.label);
        } else {
          // If exact match not found, set the price value directly
          setPrice(priceValue);
          setPriceLabel(`£${serviceDetails.price.toFixed(2)}`);
        }

        // Set service radius - extract number from "41 miles" format
        const radiusMatch = serviceDetails.serviceRadius.match(/(\d+)/);
        if (radiusMatch) {
          const radiusValue = radiusMatch[1];
          const radiusOption = serviceRadiusOptions.find(
            (opt) => opt.value === radiusValue
          );
          if (radiusOption) {
            setServiceRadius(radiusOption.value);
            setServiceRadiusLabel(radiusOption.label);
          }
        }

        // Set service address
        setServiceAddress(serviceDetails.address || "");

        // Set payment method - try to match from paymentMethod field
        if (serviceDetails.paymentMethod) {
          const paymentMatch = serviceDetails.paymentMethod.toLowerCase();
          if (paymentMatch.includes("instant")) {
            setPaymentMethod("instant");
          } else if (paymentMatch.includes("escrow")) {
            setPaymentMethod("escrow");
          } else if (paymentMatch.includes("both")) {
            setPaymentMethod("both");
          }
        }

        // Set hold payment - check holdPayment field
        if (serviceDetails.holdPayment) {
          setHoldPayment(
            serviceDetails.holdPayment.toLowerCase().includes("completion") ||
            serviceDetails.holdPayment.toLowerCase().includes("hold")
          );
        }

        // Set pricing type - try to infer from payment method
        // Default to "Fixed" if not found
        setPricingType("fixed");
        setPricingTypeLabel("Fixed");

        // Set minimum notice - default to 0 if not found
        setMinimumNotice("0");
        setMinimumNoticeLabel("0 hours");
      }
    }
  }, [params.serviceId, params.isEdit]);

  // Handle Save button
  const handleSave = () => {
    // Validate required fields
    if (!price) {
      alert("Please select a price");
      return;
    }
    if (!pricingType) {
      alert("Please select a pricing type");
      return;
    }
    if (!serviceRadius) {
      alert("Please select a service radius");
      return;
    }
    if (!minimumNotice) {
      alert("Please select minimum notice hours");
      return;
    }
    if (!serviceAddress.trim()) {
      alert("Please enter your service address");
      return;
    }

    // TODO: Update service in backend/state
    // For now, navigate back to services list
    alert("Service updated successfully!");
    router.push("/services");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={3} />

        {/* Pricing & Location Section */}
        <SectionCard
          icon={<LocationIcon />}
          title="Pricing & Location"
          subtitle="Set your service pricing and location preferences"
        >
          <DropdownField
            label="Price (£)"
            placeholder="0"
            value={priceLabel}
            onPress={() => setPriceModalVisible(true)}
            required
          />

          <DropdownField
            label="Pricing Type"
            placeholder="Select Pricing Type"
            value={pricingTypeLabel}
            onPress={() => setPricingTypeModalVisible(true)}
            required
          />

          <DropdownField
            label="Service Radius (Miles)"
            placeholder="Select Service Radius"
            value={serviceRadiusLabel}
            onPress={() => setRadiusModalVisible(true)}
            required
          />

          <DropdownField
            label="Minimum Notice (Hours)"
            placeholder="0"
            value={minimumNoticeLabel}
            onPress={() => setNoticeModalVisible(true)}
            required
          />

          <InputFieldWithIcon
            label="Service Address"
            placeholder="Enter your service address"
            value={serviceAddress}
            onChangeText={setServiceAddress}
            icon={<LocationInputIcon />}
            required
          />
        </SectionCard>

        {/* Payment Settings Section */}
        <SectionCard
          icon={<LightningIcon />}
          title="Payment Settings"
          subtitle="Configure how customers pay for your service"
        >
          <Text className="text-[#374151] text-[16px] font-semibold mb-3">
            Payment Method
          </Text>

          {paymentMethodOptions.map((option) => (
            <RadioOptionCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={paymentMethod === option.id}
              onSelect={() => setPaymentMethod(option.id)}
            />
          ))}

          <View className="mt-2">
            <SwitchField
              label="Hold Payment Until Completion"
              description="Release payment only after job completion"
              value={holdPayment}
              onValueChange={setHoldPayment}
            />
          </View>
        </SectionCard>

        {/* Bottom spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="px-6 pt-2 bg-white" style={{ paddingBottom: insets.bottom + 24 }}>
        <TouchableOpacity
          className="bg-[#313d49] py-4 rounded-full"
          activeOpacity={0.7}
          onPress={handleSave}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Save Service
          </Text>
        </TouchableOpacity>
      </View>

      {/* Price Modal */}
      <DropdownModal
        visible={priceModalVisible}
        title="Select Price"
        options={priceOptions}
        selectedValue={price}
        onSelect={(value, label) => {
          setPrice(value);
          setPriceLabel(label);
        }}
        onClose={() => setPriceModalVisible(false)}
      />

      {/* Pricing Type Modal */}
      <DropdownModal
        visible={pricingTypeModalVisible}
        title="Select Pricing Type"
        options={pricingTypeOptions}
        selectedValue={pricingType}
        onSelect={(value, label) => {
          setPricingType(value);
          setPricingTypeLabel(label);
        }}
        onClose={() => setPricingTypeModalVisible(false)}
      />

      {/* Service Radius Modal */}
      <DropdownModal
        visible={radiusModalVisible}
        title="Select Service Radius"
        options={serviceRadiusOptions}
        selectedValue={serviceRadius}
        onSelect={(value, label) => {
          setServiceRadius(value);
          setServiceRadiusLabel(label);
        }}
        onClose={() => setRadiusModalVisible(false)}
      />

      {/* Minimum Notice Modal */}
      <DropdownModal
        visible={noticeModalVisible}
        title="Select Minimum Notice"
        options={minimumNoticeOptions}
        selectedValue={minimumNotice}
        onSelect={(value, label) => {
          setMinimumNotice(value);
          setMinimumNoticeLabel(label);
        }}
        onClose={() => setNoticeModalVisible(false)}
      />
    </SafeAreaView>
  );
}
