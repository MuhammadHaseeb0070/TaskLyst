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
import { servicesData, Service, ServiceStatus } from "@/data/dummyData";

// Service Category Filter Options
type ServiceCategoryFilter =
  | "Pet Services"
  | "Cleaning & Housekeeping"
  | "Laundry and Garment Care"
  | "Home Maintenance & Repairs"
  | "Garden & Outdoor"
  | "Home Improvement"
  | "Childcare & Eldercare"
  | "Lifestyle Services"
  | "Seasonal / Niche Services";

const SERVICE_CATEGORY_OPTIONS: ServiceCategoryFilter[] = [
  "Pet Services",
  "Cleaning & Housekeeping",
  "Laundry and Garment Care",
  "Home Maintenance & Repairs",
  "Garden & Outdoor",
  "Home Improvement",
  "Childcare & Eldercare",
  "Lifestyle Services",
  "Seasonal / Niche Services",
];

// Radio Button Component
const RadioButton = ({
  selected,
  label,
  onPress,
}: {
  selected: boolean;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center py-2">
    <View
      className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
        selected ? "border-[#2C3E50]" : "border-gray-300"
      }`}
    >
      {selected && <View className="w-2.5 h-2.5 rounded-full bg-[#2C3E50]" />}
    </View>
    <Text
      className={`text-[15px] ${
        selected ? "text-[#2C3E50] font-medium" : "text-gray-600"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// Filter Modal Component
const FilterModal = ({
  visible,
  onClose,
  categoryFilter,
  setCategoryFilter,
  onApply,
}: {
  visible: boolean;
  onClose: () => void;
  categoryFilter: ServiceCategoryFilter | null;
  setCategoryFilter: (filter: ServiceCategoryFilter | null) => void;
  onApply: () => void;
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Filter Bottom Sheet */}
        <View className="bg-white rounded-t-3xl px-6 pt-4" style={{ paddingBottom: insets.bottom + 32 }}>
          {/* Handle Bar */}
          <View className="items-center mb-4">
            <View className="w-12 h-1 rounded-full bg-gray-300" />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="w-8" />
            <Text className="text-[#2C3E50] text-[18px] font-bold">Filter</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <View
                className="w-8 h-8 bg-[#E8F4FD] rounded-full items-center justify-center overflow-hidden"
                style={{ borderRadius: 16 }}
              >
                <Text className="text-[#2C3E50] text-[14px] font-bold leading-none">
                  ✕
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Category Section */}
          <View className="mb-8">
            <Text className="text-[#2C3E50] text-[16px] font-semibold mb-3">
              Category
            </Text>
            {SERVICE_CATEGORY_OPTIONS.map((option) => (
              <RadioButton
                key={option}
                label={option}
                selected={categoryFilter === option}
                onPress={() =>
                  setCategoryFilter(categoryFilter === option ? null : option)
                }
              />
            ))}
          </View>

          {/* Filter Button */}
          <TouchableOpacity
            onPress={onApply}
            className="bg-[#2C3E50] rounded-full py-4 items-center"
            style={{
              shadowColor: "#2C3E50",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
            activeOpacity={0.7}
          >
            <Text className="text-white text-[16px] font-semibold">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Header Component (same as reviews/payments screens)
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
            Services
          </Text>
        </View>
      </View>
    </View>
  );
};

// Search Bar with Filter Button Component
const SearchBarWithFilter = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
}: {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
}) => {
  return (
    <View className="flex-row items-center mb-6" style={{ gap: 12 }}>
      {/* Search Input */}
      <View
        className="flex-1 flex-row items-center bg-white rounded-full px-4 py-3"
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
          style={{ tintColor: "#9CA3AF" }}
        />
        <TextInput
          placeholder='Search for "Indoor Cleaning"'
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={onSearchChange}
          className="flex-1 text-[16px] text-[#313d49]"
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity
        onPress={onFilterPress}
        activeOpacity={0.7}
        className="w-14 h-14 bg-white rounded-full items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Image
          source={require("@/assets/images/icon-filter.png")}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: ServiceStatus }) => {
  const isActive = status === "Active";

  return (
    <View
      className="px-3 py-1.5 rounded-full"
      style={{
        backgroundColor: isActive ? "#07a537" : "#9CA3AF",
      }}
    >
      <Text className="text-white text-[12px] font-semibold">{status}</Text>
    </View>
  );
};

// Instant Booking Badge Component
const InstantBookingBadge = () => {
  return (
    <View className="flex-row items-center mt-3">
      <View
        className="w-7 h-7 rounded-full items-center justify-center mr-2"
        style={{ backgroundColor: "#add0eb" }}
      >
        <Image source={require("@/assets/images/lightning-icon.png")} className="w-4 h-4" resizeMode="contain" />
      </View>
      <Text className="text-[#424d58] text-[14px] text-semibold">Instant Booking</Text>
    </View>
  );
};

// Menu Button Component (Three dots)
const MenuButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-8 h-8 bg-white rounded-full items-center justify-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Text className="text-[#313d49] text-[16px] font-bold">⋮</Text>
    </TouchableOpacity>
  );
};

// Service Card Component
const ServiceCard = ({
  service,
  onMenuPress,
  onPress,
}: {
  service: Service;
  onMenuPress: () => void;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="mb-4 bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      {/* Image Container */}
      <View className="relative">
        <Image
          source={service.image}
          className="w-full"
          style={{ height: 180 }}
          resizeMode="cover"
        />

        {/* Status Badge - Top Left */}
        <View className="absolute top-3 left-3">
          <StatusBadge status={service.status} />
        </View>

        {/* Menu Button - Top Right */}
        <View className="absolute top-3 right-3">
          <MenuButton onPress={onMenuPress} />
        </View>
      </View>

      {/* Content Container */}
      <View className="p-4">
        {/* Name and Price Row */}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-[#313d49] text-[18px] font-bold flex-1 mr-2">
            {service.name}
          </Text>
          <Text className="text-[#313d49] text-[18px] font-bold">
            £{service.price.toFixed(2)}
          </Text>
        </View>

        {/* Description */}
        <Text
          className="text-[#68696b] text-[14px] leading-5"
          numberOfLines={3}
        >
          {service.description}
        </Text>

        {/* Instant Booking Badge */}
        {service.instantBooking && <InstantBookingBadge />}
      </View>
    </TouchableOpacity>
  );
};

// Service Options Modal
const ServiceOptionsModal = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-center items-center"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="bg-white rounded-2xl w-[80%] overflow-hidden">
          <TouchableOpacity
            className="px-6 py-4 border-b border-[#F3F4F6]"
            activeOpacity={0.7}
            onPress={onEdit}
          >
            <Text className="text-[#1F2937] text-[16px]">Edit Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-4 border-b border-[#F3F4F6]"
            activeOpacity={0.7}
            onPress={onToggleStatus}
          >
            <Text className="text-[#1F2937] text-[16px]">
              Toggle Active/Inactive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-4 border-b border-[#F3F4F6]"
            activeOpacity={0.7}
            onPress={onDelete}
          >
            <Text className="text-[#EF4444] text-[16px]">Delete Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-4"
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Text className="text-[#6B7280] text-[16px]">Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Main Services Screen
export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState(servicesData);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] =
    useState<ServiceCategoryFilter | null>("Cleaning & Housekeeping");

  // Filter services based on search query and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    // For now, category filter is just stored but not applied to services
    // since Service interface doesn't have category field
    // This can be extended when category is added to Service model
    return matchesSearch;
  });

  const handleMenuPress = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setOptionsModalVisible(true);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleApplyFilter = () => {
    setFilterModalVisible(false);
    // Filter logic can be extended here when Service model includes category
    console.log("Applied filter:", categoryFilter);
  };

  const handleEdit = () => {
    setOptionsModalVisible(false);
    if (selectedServiceId) {
      router.push({
        pathname: "/edit-service",
        params: { serviceId: selectedServiceId },
      });
    }
  };

  const handleDelete = () => {
    if (selectedServiceId) {
      setServices((prev) => prev.filter((s) => s.id !== selectedServiceId));
    }
    setOptionsModalVisible(false);
  };

  const handleToggleStatus = () => {
    if (selectedServiceId) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === selectedServiceId
            ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
            : s
        )
      );
    }
    setOptionsModalVisible(false);
  };

  const handleCreateNewService = () => {
    router.push("/create-service");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar with Filter */}
        <SearchBarWithFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={handleFilterPress}
        />

        {/* Services List */}
        <View>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onMenuPress={() => handleMenuPress(service.id)}
              onPress={() => router.push({
                pathname: "/service-details",
                params: { serviceId: service.id }
              })}
            />
          ))}
        </View>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <View className="items-center justify-center py-16">
            <Text className="text-[#9CA3AF] text-[16px]">
              No services found
            </Text>
          </View>
        )}

        {/* Bottom Spacing for button */}
        <View className="h-20" />
      </ScrollView>

      {/* Fixed Bottom Button */}
      {/* 
        The 'insets' variable is giving an error because it hasn't been defined or imported.
        To use insets for padding with SafeAreaView, you usually get them from the `useSafeAreaInsets` hook from 'react-native-safe-area-context':
        Example:
            import { useSafeAreaInsets } from 'react-native-safe-area-context';
            const insets = useSafeAreaInsets();
        Make sure to define this at the top of your component.
      */}
      <View className="px-6 pt-2 bg-white" style={{ paddingBottom: 24 }}>
        <TouchableOpacity
          className="bg-[#313d49] py-4 rounded-full"
          activeOpacity={0.7}
          onPress={handleCreateNewService}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Create New Service
          </Text>
        </TouchableOpacity>
      </View>

      {/* Service Options Modal */}
      <ServiceOptionsModal
        visible={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onApply={handleApplyFilter}
      />
    </SafeAreaView>
  );
}
