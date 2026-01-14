import { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { quotesData, QuoteStatus } from "@/data/dummyData";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Filter types
type CategoryFilter = 
  | "Pet Services"
  | "Cleaning & Housekeeping"
  | "Laundry and Garment Care"
  | "Home Maintenance & Repairs"
  | "Garden & Outdoor"
  | "Home Improvement"
  | "Childcare & Eldercare"
  | "Lifestyle Services"
  | "Seasonal / Niche Services";

type DateFilter = "Today" | "Upcoming" | "Past";
type StatusFilter = "Accepted" | "Pending" | "Rejected" | "Expired";

// Tab options
const TAB_OPTIONS: QuoteStatus[] = ["Active", "Rejected", "Pending"];

// Filter options
const CATEGORY_OPTIONS: CategoryFilter[] = [
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

const DATE_OPTIONS: DateFilter[] = ["Today", "Upcoming", "Past"];
const STATUS_OPTIONS: StatusFilter[] = ["Accepted", "Pending", "Rejected", "Expired"];

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
  <TouchableOpacity onPress={onPress} className="flex-row items-center py-2.5">
    <View
      className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
        selected ? "border-[#2C3E50]" : "border-gray-300"
      }`}
    >
      {selected && <View className="w-2.5 h-2.5 rounded-full bg-[#2C3E50]" />}
    </View>
    <Text
      className={`text-[15px] font-medium`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// Filter Modal Component with Swipe to Dismiss
const FilterModal = ({
  visible,
  onClose,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
  onApply,
}: {
  visible: boolean;
  onClose: () => void;
  categoryFilter: CategoryFilter | null;
  setCategoryFilter: (filter: CategoryFilter | null) => void;
  dateFilter: DateFilter | null;
  setDateFilter: (filter: DateFilter | null) => void;
  statusFilter: StatusFilter | null;
  setStatusFilter: (filter: StatusFilter | null) => void;
  onApply: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(0)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // Swipe down threshold reached - close modal
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
            translateY.setValue(0);
          });
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start();
        }
      },
    })
  ).current;

  // Reset translateY when modal opens
  if (visible) {
    translateY.setValue(0);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/40">
        {/* Backdrop - tap to close */}
        <Pressable className="absolute inset-0" onPress={onClose} />
        
        {/* Bottom Sheet */}
        <Animated.View 
          className="flex-1 bg-white mt-12 rounded-t-3xl"
          style={{
            transform: [{ translateY }],
          }}
        >
          {/* Drag Handle */}
          <View {...panResponder.panHandlers} className="items-center pt-3 pb-2">
            <View className="w-16 h-1 rounded-full bg-gray-300" />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-3">
            <View className="w-8" />
            <Text className="text-[#2C3E50] text-[23px] font-bold">Filter</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <View className="w-8 h-8 bg-[#add0eb] rounded-full items-center justify-center">
                <Text className="text-[#2C3E50] text-[14px] font-bold">✕</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView 
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Category Section */}
            <View className="mb-6">
              <Text className="text-[#2C3E50] text-[16px] font-semibold mb-2">
                Category
              </Text>
              {CATEGORY_OPTIONS.map((option) => (
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

            {/* Dates Section */}
            <View className="mb-6">
              <Text className="text-[#2C3E50] text-[16px] font-semibold mb-2">
                Dates
              </Text>
              {DATE_OPTIONS.map((option) => (
                <RadioButton
                  key={option}
                  label={option}
                  selected={dateFilter === option}
                  onPress={() =>
                    setDateFilter(dateFilter === option ? null : option)
                  }
                />
              ))}
            </View>

            {/* Status Section */}
            <View className="mb-6">
              <Text className="text-[#2C3E50] text-[16px] font-semibold mb-2">
                Status
              </Text>
              {STATUS_OPTIONS.map((option) => (
                <RadioButton
                  key={option}
                  label={option}
                  selected={statusFilter === option}
                  onPress={() =>
                    setStatusFilter(statusFilter === option ? null : option)
                  }
                />
              ))}
            </View>
          </ScrollView>

          {/* Filter Button */}
          <View 
            className="px-6 bg-white"
            style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
          >
            <TouchableOpacity
              onPress={onApply}
              className="bg-[#313d49] rounded-full py-4 items-center"
            >
              <Text className="text-white text-[16px] font-semibold">Filter</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Get status badge color
const getStatusColor = (status: QuoteStatus) => {
  switch (status) {
    case "Active":
      return "bg-[#12a73f]";
    case "Rejected":
      return "bg-[#f7ce45]";
    case "Pending":
      return "bg-[#313d49]";
    default:
      return "bg-[#313d49]";
  }
};

// Quote Details Modal Component
const QuoteDetailsModal = ({
  visible,
  quote,
  onClose,
  onAccept,
  onReject,
}: {
  visible: boolean;
  quote: (typeof quotesData)[0] | null;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
            translateY.setValue(0);
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start();
        }
      },
    })
  ).current;

  if (visible) {
    translateY.setValue(0);
  }

  if (!quote) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/40">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <Animated.View
          className="flex-1 bg-white mt-16 rounded-t-3xl"
          style={{
            transform: [{ translateY }],
          }}
        >
          {/* Drag Handle */}
          <View {...panResponder.panHandlers} className="items-center pt-3 pb-2">
            <View className="w-16 h-1 rounded-full bg-gray-300" />
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Image Section */}
            <View className="mx-6 mb-4">
              <View className="relative">
                <Image
                  source={require("@/assets/images/pending-job-image.jpeg")}
                  className=" min-w-[320px] w-full h-56 rounded-2xl"
                  resizeMode="cover"
                />
                {/* Close button on image */}
                <TouchableOpacity
                  onPress={onClose}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
                >
                  <Text className="text-[#2C3E50] text-[14px] font-bold">✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Date & Time */}
            <View className="px-6 mb-2 mt-4">
              <Text className="text-[#2C3E50] text-[20px] font-medium">
                {quote.scheduledDate} • {quote.scheduledTime}
              </Text>
            </View>

            {/* Customer Name & Status */}
            <View className="px-6 flex-row items-center justify-between mb-1">
              <Text className="text-[#1F2937] text-[26px] font-semibold">
                {quote.customerName}
              </Text>
              <View className={`${getStatusColor(quote.status)} px-4 py-1.5 rounded-full`}>
                <Text className="text-white text-[13px] font-semibold">
                  {quote.status}
                </Text>
              </View>
            </View>

            {/* Customer Email */}
            <View className="px-6 mb-5">
              <Text className="text-[#616874] text-[17px]">
                {quote.customerEmail}
              </Text>
            </View>

            {/* Service Section */}
            <View className="mx-6 bg-[#e8eaeb] rounded-2xl p-4 mb-3">
              <View className="flex-row items-center mb-1">
                <Image
                  source={require("@/assets/images/icon-pending-quote.png")}
                  className="w-6 h-6 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-[#2C3E50] text-[18px] font-semibold">
                  Service
                </Text>
              </View>
              <Text className="text-[#313d49] text-[16px] ">
                {quote.serviceName}
              </Text>
            </View>

            {/* Customer Notes Section */}
            <View className="mx-6 bg-[#ecf4fc] rounded-2xl p-4 mb-6">
              <View className="flex-row items-center mb-1">
                <Image
                  source={require("@/assets/images/icon-pending-job.png")}
                  className="w-6 h-6 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-[#2C3E50] text-[18px] font-semibold">
                  Customer Notes
                </Text>
              </View>
              <Text className="text-[#6B7280] text-[16px]">
                {quote.description}
              </Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View
            className="px-6 bg-white flex-row gap-3"
            style={{ paddingBottom: insets.bottom + 16, paddingTop: 16 }}
          >
            <TouchableOpacity
              onPress={onAccept}
              className="flex-1 bg-[#313d49] py-4 rounded-full items-center justify-center"
            >
              <Text className="text-white text-[16px] font-semibold">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onReject}
              className="flex-1 bg-[#e2f0fb] py-4 rounded-full items-center justify-center border border-[#E5E7EB]"
            >
              <Text className="text-[#1F2937] text-[16px] font-semibold">Reject</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Quote Card Component
const QuoteCard = ({
  quote,
  onPress,
  onAccept,
  onReject,
}: {
  quote: (typeof quotesData)[0];
  onPress: () => void;
  onAccept: () => void;
  onReject: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-md p-4 mb-4 mx-6 border border-[#f0f1f2]"
    >
      {/* Top Row: Badge and Menu */}
      <View className="flex-row items-center justify-between mb-3">
        {/* Status Badge */}
        <View className={`${getStatusColor(quote.status)} px-3 py-1 rounded-full`}>
          <Text className="text-white text-[12px] font-semibold">
            {quote.status}
          </Text>
        </View>

        {/* Kebab Menu */}
        <TouchableOpacity className="p-1">
          <Image
            source={require("@/assets/images/icon_menu_dots.png")}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-[#1F2937] text-[20px] font-medium mb-1.5 ">
        {quote.title}
      </Text>

      {/* Description */}
      <Text className="text-[#6B7280] text-[14px] leading-5 mb-4">
        {quote.description}
      </Text>

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        {/* Accept Button */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onAccept();
          }}
          className="flex-1 bg-[#1F2937] py-3.5 rounded-full items-center justify-center"
        >
          <Text className="text-white text-[15px] font-semibold">Accept</Text>
        </TouchableOpacity>

        {/* Reject Button */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onReject();
          }}
          className="flex-1 bg-[#E8F4FD] py-3.5 rounded-full items-center justify-center"
        >
          <Text className="text-[#1F2937] text-[15px] font-semibold">
            Reject
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Header Component
const Header = () => {
  return (
    <View className="bg-[#313d49] px-2 py-8">
      {/* Title Row */}
      <View className="bg-[#313d49] px-4">
        {/* Title Row */}

        <View className="flex-row items-center justify-between">
          <View className="flex-col">
            <Text className="text-white text-[30px] font-bold ">
              Quotes
            </Text>
            <View className="w-full flex-row  justify-between align-center">
              <Text className="text-[#eeeeee] text-[14px] leading-5 align-bottom">
                Review and respond to customer{"\n"}quote requests
              </Text>
              <TouchableOpacity
                className="w-12 h-12 rounded-full bg-white items-center justify-center"
                activeOpacity={0.7}
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

// Tab Selector Component
const TabSelector = ({
  activeTab,
  onTabChange,
}: {
  activeTab: QuoteStatus;
  onTabChange: (tab: QuoteStatus) => void;
}) => {
  return (
    <View className="mx-6 mt-5 mb-4">
      <View className="flex-row bg-[#f8f8f8] rounded-full p-1.5 shadow-sm">
        {TAB_OPTIONS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              className={`flex-1 py-3 rounded-full items-center justify-center ${
                isActive ? "bg-[#1E293B]" : ""
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
const SearchBar = ({ onFilterPress }: { onFilterPress: () => void }) => {
  return (
    <View className="px-6 mb-4 mt-4">
      <View className="flex-row items-center">
        {/* Search Input - separate rounded box */}
        <View className="flex-1 flex-row items-center bg-white rounded-full px-4 py-2 mr-3">
          <Image
            source={require("@/assets/images/icon-search.png")}
            className="w-5 h-5 mr-3"
            style={{ tintColor: "#9CA3AF" }}
            resizeMode="contain"
          />
          <TextInput
            placeholder='Search for "Indoor Cleaning"'
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-[16px] text-gray-700"
          />
        </View>

        {/* Filter Button - separate rounded box */}
        <TouchableOpacity
          onPress={onFilterPress}
          className="bg-white rounded-full p-5 items-center justify-center"
        >
          <Image
            source={require("@/assets/images/icon-filter.png")}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Quotes Screen
export default function QuotesScreen() {
  const [activeTab, setActiveTab] = useState<QuoteStatus>("Active");
  
  // Filter modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter | null>("Cleaning & Housekeeping");
  const [dateFilter, setDateFilter] = useState<DateFilter | null>("Upcoming");
  const [statusFilter, setStatusFilter] = useState<StatusFilter | null>(null);

  // Quote details modal state
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<(typeof quotesData)[0] | null>(null);

  // Filter quotes based on active tab
  const filteredQuotes = useMemo(() => {
    return quotesData.filter((quote) => quote.status === activeTab);
  }, [activeTab]);

  const handleQuotePress = (quote: (typeof quotesData)[0]) => {
    setSelectedQuote(quote);
    setDetailsModalVisible(true);
  };

  const handleAccept = (quoteId: string) => {
    console.log("Accepted quote:", quoteId);
    setDetailsModalVisible(false);
    // Handle accept logic
  };

  const handleReject = (quoteId: string) => {
    console.log("Rejected quote:", quoteId);
    setDetailsModalVisible(false);
    // Handle reject logic
  };

  const handleApplyFilter = () => {
    setFilterModalVisible(false);
    // Apply filters logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-[#313d49]" edges={["top", "bottom"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <View className="flex-1 bg-gray-100">
        {/* Tab Selector */}
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Search Bar */}
        <SearchBar onFilterPress={() => setFilterModalVisible(true)} />

        {/* Quote Cards List */}
        <FlatList
          data={filteredQuotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuoteCard
              quote={item}
              onPress={() => handleQuotePress(item)}
              onAccept={() => handleAccept(item.id)}
              onReject={() => handleReject(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingBottom: 24
          }}
          ListEmptyComponent={
            <View className="mx-6 bg-white rounded-2xl p-8 items-center">
              <Text className="text-gray-400 text-[15px]">
                No {activeTab.toLowerCase()} quotes found
              </Text>
            </View>
          }
        />
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onApply={handleApplyFilter}
      />

      {/* Quote Details Modal */}
      <QuoteDetailsModal
        visible={detailsModalVisible}
        quote={selectedQuote}
        onClose={() => setDetailsModalVisible(false)}
        onAccept={() => selectedQuote && handleAccept(selectedQuote.id)}
        onReject={() => selectedQuote && handleReject(selectedQuote.id)}
      />
    </SafeAreaView>
  );
}
