import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

// Category options
const CATEGORY_OPTIONS = ["A", "B", "C", "D"];

// Availability options
const AVAILABILITY_OPTIONS = [
  "In Stock",
  "Out of Stock",
  "Limited Availability",
  "By Appointment Only",
  "Weekdays Only",
  "Weekends Only",
  "24/7 Available",
];

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
            Business Details
          </Text>
        </View>
      </View>
    </View>
  );
};

// Upload Image Component with preview
const UploadImageBox = ({
  imageUri,
  onPress,
  onRemove,
}: {
  imageUri: string | null;
  onPress: () => void;
  onRemove: () => void;
}) => {
  return (
    <View className="mb-6">
      <Text className="text-[#374151] text-[18px] font-semibold mb-2">
        Upload Logo
      </Text>
      {imageUri ? (
        // Show uploaded image
        <View className="relative">
          <Image
            source={{ uri: imageUri }}
            className="w-full h-60 rounded-xl"
            resizeMode="cover"
          />
          {/* Remove button */}
          <TouchableOpacity
            onPress={onRemove}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 items-center justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-white text-[16px] font-bold">×</Text>
          </TouchableOpacity>
          {/* Change image button */}
          <TouchableOpacity
            onPress={onPress}
            className="absolute bottom-3 right-3 px-4 py-2 rounded-full bg-[#2C3E50]"
            activeOpacity={0.7}
          >
            <Text className="text-white text-[12px] font-semibold">Change</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Show upload placeholder
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          className="h-60 rounded-xl items-center justify-center"
          style={{
            borderWidth: 2,
            borderColor: "#D1D5DB",
            borderStyle: "dashed",
          }}
        >
          <View className="rounded-full items-center justify-center mb-1">
            <Image
              source={require("@/assets/images/icon-upload.png")}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </View>
          <Text className="text-[#313d49] text-[18px] font-medium">
            Upload Logo
          </Text>
          <Text className="text-[#9CA3AF] text-[12px] mt-1">
            Tap to select an image
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Input Field Component
const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  prefix,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?:
    | "default"
    | "email-address"
    | "phone-pad"
    | "numeric"
    | "decimal-pad";
  prefix?: string;
}) => {
  return (
    <View className="mb-5">
      <Text className="text-[#374151] text-[18px] font-semibold mb-2">
        {label}
      </Text>
      <View className="rounded-xl px-4 py-1 border border-[#E5E7EB] flex-row items-center">
        {prefix && (
          <Text className="text-[#1F2937] text-[15px] font-medium mr-1">
            {prefix}
          </Text>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          className="flex-1 text-[15px] text-[#1F2937] py-3"
        />
      </View>
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
    <View className="mb-5">
      <Text className="text-[#374151] text-[18px] font-semibold mb-2">
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="rounded-xl px-4 py-4 border border-[#E5E7EB] flex-row items-center justify-between"
      >
        <Text
          className={`text-[15px] ${
            value ? "text-[#1F2937]" : "text-[#9CA3AF]"
          }`}
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
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
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
            <Text className="text-[18px] font-bold text-[#1F2937]">
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-[20px] text-[#6B7280]">×</Text>
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
            renderItem={({ item }) => {
              const isSelected = item === selectedValue;
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className={`px-6 py-4 border-b border-[#F9FAFB] flex-row items-center justify-between ${
                    isSelected ? "bg-[#F0FDF4]" : ""
                  }`}
                >
                  <Text
                    className={`text-[15px] ${
                      isSelected
                        ? "text-[#2C3E50] font-semibold"
                        : "text-[#374151]"
                    }`}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <View className="w-5 h-5 rounded-full bg-[#2C3E50] items-center justify-center">
                      <Text className="text-white text-[12px]">✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />

          {/* Bottom Spacing */}
          <View className="h-8" />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Description/Textarea Field Component
const TextareaField = ({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View className="mb-5">
      <Text className="text-[#374151] text-[18px] font-semibold mb-2">
        {label}
      </Text>
      <View
        className="rounded-xl px-4 py-4 border border-[#E5E7EB]"
        style={{ minHeight: 120 }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          className="text-[15px] text-[#1F2937]"
          style={{ minHeight: 100 }}
        />
      </View>
    </View>
  );
};

// Main Business Details Screen
export default function BusinessDetailsScreen() {
  // Form state
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState("");
  const [availability, setAvailability] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Dropdown modal states
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [availabilityModalVisible, setAvailabilityModalVisible] =
    useState(false);

  // Handle image upload
  const handleUploadImage = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setImageUri(null);
  };

  // Handle rate input (format as currency)
  const handleRateChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, "");
    // Ensure only one decimal point
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return;
    }
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    setRate(cleaned);
  };

  // Format rate for display
  const formatRate = (value: string) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toFixed(2);
  };

  const handleSave = () => {
    console.log("Saving:", {
      businessName,
      description,
      category,
      rate: rate ? `$${formatRate(rate)}` : "",
      availability,
      imageUri,
    });
    // Handle save logic
    router.back();
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <ScrollView
        className="flex-1 bg-[#F3F4F6]"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main Form Card */}
        <View
          className="mx-4 my-4 bg-white rounded-2xl p-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          {/* Upload Image Section */}
          <UploadImageBox
            imageUri={imageUri}
            onPress={handleUploadImage}
            onRemove={handleRemoveImage}
          />

          {/* Business Name */}
          <InputField
            label="Business Name"
            placeholder="Enter your business name"
            value={businessName}
            onChangeText={setBusinessName}
          />

          {/* Description */}
          <TextareaField
            label="Description"
            placeholder="Add Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Category Dropdown */}
          <DropdownField
            label="Category"
            placeholder="Select a category"
            value={category}
            onPress={() => setCategoryModalVisible(true)}
          />

          {/* Rate */}
          <InputField
            label="Rate"
            placeholder="0.00"
            value={rate}
            onChangeText={handleRateChange}
            keyboardType="decimal-pad"
            prefix="$"
          />

          {/* Availability Dropdown */}
          <DropdownField
            label="Availability"
            placeholder="Select availability"
            value={availability}
            onPress={() => setAvailabilityModalVisible(true)}
          />

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            className="bg-[#313d49] rounded-full py-4 items-center mt-2"
          >
            <Text className="text-white text-[16px] font-semibold">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Category Dropdown Modal */}
      <DropdownModal
        visible={categoryModalVisible}
        title="Select Category"
        options={CATEGORY_OPTIONS}
        selectedValue={category}
        onSelect={setCategory}
        onClose={() => setCategoryModalVisible(false)}
      />

      {/* Availability Dropdown Modal */}
      <DropdownModal
        visible={availabilityModalVisible}
        title="Select Availability"
        options={AVAILABILITY_OPTIONS}
        selectedValue={availability}
        onSelect={setAvailability}
        onClose={() => setAvailabilityModalVisible(false)}
      />
    </SafeAreaView>
  );
}
