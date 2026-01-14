import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  serviceCategories,
  serviceSubcategories,
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

// Image Upload Area Component
const ImageUploadArea = ({
  images,
  onAddImages,
  onRemoveImage,
}: {
  images: string[];
  onAddImages: () => void;
  onRemoveImage: (index: number) => void;
}) => {
  return (
    <View>
      {/* Upload Box */}
      <TouchableOpacity
        onPress={onAddImages}
        activeOpacity={0.7}
        className="items-center justify-center py-8 rounded-xl mb-4"
        style={{
          borderWidth: 2,
          borderColor: "#D1D5DB",
          borderStyle: "dashed",
          backgroundColor: "#FAFAFA",
        }}
      >
        <Image
          source={require("@/assets/images/icon-upload.png")}
          className="w-8 h-8 mb-2"
          resizeMode="contain"
          style={{ tintColor: "#9CA3AF" }}
        />
        <Text className="text-[#313d49] text-[16px] font-medium mb-1">
          Click to upload images
        </Text>
        <Text className="text-[#9CA3AF] text-[13px] text-center px-4">
          PNG, JPG, WebP up to 10MB each. Images will upload immediately after
          selection.
        </Text>
      </TouchableOpacity>

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <View className="flex-row flex-wrap" style={{ gap: 10 }}>
          {images.map((uri, index) => (
            <View
              key={index}
              className="relative"
              style={{ width: "30%", aspectRatio: 1 }}
            >
              <Image
                source={{ uri }}
                className="w-full h-full rounded-xl"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-white text-[12px] font-bold">×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
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
          className="text-[15px] text-[#1F2937] py-4"
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

// Document/Image Icon Component
const ImageIcon = () => (
  <Image
    source={require("@/assets/images/iconservicesImages.png")}
    className="w-6 h-6"
    resizeMode="contain"
  />
);

// Info Icon Component
const InfoIcon = () => (
  <Image
  source={require("@/assets/images/icon-service-info.png")}
  className="w-6 h-6"
  resizeMode="contain"
/>
);

// Main Screen Component
export default function CreateServiceScreen() {
  const insets = useSafeAreaInsets();
  
  // Form state
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategoryLabel, setSubcategoryLabel] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // Modal state
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);

  // Get subcategories based on selected category
  const currentSubcategories = category
    ? serviceSubcategories[category] || []
    : [];

  // Handle image picking
  const handleAddImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle category selection
  const handleCategorySelect = (value: string, label: string) => {
    setCategory(value);
    setCategoryLabel(label);
    // Reset subcategory when category changes
    setSubcategory("");
    setSubcategoryLabel("");
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (value: string, label: string) => {
    setSubcategory(value);
    setSubcategoryLabel(label);
  };

  // Handle Next button
  const handleNext = () => {
    // Validate form
    if (!serviceName.trim()) {
      alert("Please enter a service name");
      return;
    }
    if (!category) {
      alert("Please select a category");
      return;
    }
    if (!description.trim() || description.length < 50) {
      alert("Please enter a description with at least 50 characters");
      return;
    }

    // Navigate to step 2
    router.push({
      pathname: "/create-service-step2",
      params: {
        serviceName,
        category,
        categoryLabel,
        subcategory,
        subcategoryLabel,
        description,
        imageCount: images.length.toString(),
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
        <ProgressIndicator currentStep={1} />

        {/* Service Images Section */}
        <SectionCard
          icon={<ImageIcon />}
          title="Service Images"
          subtitle="Upload photos to showcase your service work"
        >
          <ImageUploadArea
            images={images}
            onAddImages={handleAddImages}
            onRemoveImage={handleRemoveImage}
          />
        </SectionCard>

        {/* Basic Information Section */}
        <SectionCard
          icon={<InfoIcon />}
          title="Basic Information"
          subtitle="Define your service name, category, and description"
        >
          <InputField
            label="Service Name"
            placeholder="Enter Name"
            value={serviceName}
            onChangeText={setServiceName}
          />

          <DropdownField
            label="Category"
            placeholder="Select a Category"
            value={categoryLabel}
            onPress={() => setCategoryModalVisible(true)}
          />

          <DropdownField
            label="Subcategory"
            placeholder="Select a Category"
            value={subcategoryLabel}
            onPress={() => {
              if (!category) {
                alert("Please select a category first");
                return;
              }
              setSubcategoryModalVisible(true);
            }}
          />

          <TextAreaField
            label="Full Description"
            placeholder="Add Description"
            value={description}
            onChangeText={setDescription}
            helperText="Minimum 50 characters required"
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

      {/* Category Modal */}
      <DropdownModal
        visible={categoryModalVisible}
        title="Select Category"
        options={serviceCategories}
        selectedValue={category}
        onSelect={handleCategorySelect}
        onClose={() => setCategoryModalVisible(false)}
      />

      {/* Subcategory Modal */}
      <DropdownModal
        visible={subcategoryModalVisible}
        title="Select Subcategory"
        options={currentSubcategories}
        selectedValue={subcategory}
        onSelect={handleSubcategorySelect}
        onClose={() => setSubcategoryModalVisible(false)}
      />
    </SafeAreaView>
  );
}
