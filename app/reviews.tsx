import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { reviewsData, reviewsSummary, Review, ReviewsSummary } from "@/data/dummyData";

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
            Reviews
          </Text>
        </View>
      </View>
    </View>
  );
};

// Star Rating Component with half-star support
const StarRating = ({ rating, size = 18 }: { rating: number; size?: number }) => {
  const stars = [];
  const YELLOW = "#f2d406";
  const GRAY = "#b0b2b6";
  
  for (let i = 1; i <= 5; i++) {
    const diff = rating - (i - 1);
    
    if (diff >= 1) {
      // Full star - completely filled yellow
      stars.push(
        <Text
          key={i}
          style={{ fontSize: size, color: YELLOW, lineHeight: size }}
        >
          ★
        </Text>
      );
    } else if (diff > 0 && diff < 1) {
      // Partial star (half-filled) - show both empty and filled overlapping
      const fillWidth = diff * size;
      stars.push(
        <View 
          key={i} 
          style={{ 
            width: size, 
            height: size, 
            position: 'relative',
          }}
        >
          {/* Gray star background */}
          <Text
            style={{ 
              fontSize: size, 
              color: GRAY,
              lineHeight: size,
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            ★
          </Text>
          {/* Yellow filled portion with overflow hidden */}
          <View 
            style={{ 
              position: 'absolute',
              left: 0,
              top: 0,
              width: fillWidth,
              height: size,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{ 
                fontSize: size, 
                color: YELLOW,
                lineHeight: size,
              }}
            >
              ★
            </Text>
          </View>
        </View>
      );
    } else {
      // Empty star - gray
      stars.push(
        <Text
          key={i}
          style={{ fontSize: size, color: GRAY, lineHeight: size }}
        >
          ★
        </Text>
      );
    }
  }
  
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>;
};

// Rating Bar Component
const RatingBar = ({ stars, percentage }: { stars: number; percentage: number }) => {
  return (
    <View className="flex-row items-center mb-2">
      <Text className="text-[#374151] text-[16px] font-medium w-4">{stars}</Text>
      <Text  style={{ color: "#f2d406", fontSize:20,marginLeft: 4 }}>★</Text>
      <View className="flex-1 h-2.5  rounded-full ml-3 mr-3">
        <View
          className="h-2.5 bg-[#313d49] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
};

// Rating Summary Component
const RatingSummary = ({ summary }: { summary: ReviewsSummary }) => {
  return (
    <View
    className="mb-6 bg-white rounded-2xl p-4"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 }, // push shadow downward
      shadowOpacity: 0.1,
      shadowRadius: 1, // smaller radius = less side shadow
      elevation: 1, // Android (cannot be one-sided, keep low)
    }}
  >
  
      <Text className="text-[#1F2937] text-[22px] font-bold mb-4">
        Customers Reviews
      </Text>

      <View className="flex-row">
        {/* Rating Bars */}
        <View className="flex-1 pr-4">
          {[5, 4, 3, 2, 1].map((stars) => (
            <RatingBar
              key={stars}
              stars={stars}
              percentage={summary.ratingDistribution[stars as keyof typeof summary.ratingDistribution]}
            />
          ))}
        </View>

        {/* Overall Rating */}
        <View className="items-center justify-center pl-4">
          <Text className="text-[#1F2937] font-bold" style={{ fontSize: 50 }}>
            {summary.averageRating.toFixed(1)}
          </Text>
          <View className="flex-row items-center mt-1">
            <StarRating rating={summary.averageRating} size={20} />
            <Text className="text-[#6B7280] text-[13px] ml-1 font-semibold">
              {summary.averageRating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-[#313d49] text-[13px] mt-1 font-bold">
            {summary.totalReviews} Reviews
          </Text>
        </View>
      </View>
    </View>
  );
};

// Review Card Component
const ReviewCard = ({
  review,
  onMenuPress,
}: {
  review: Review;
  onMenuPress: () => void;
}) => {
  return (
    <View className="py-4 border-b border-[#F3F4F6]">
      {/* Header Row */}
      <View className="flex-row items-start mb-2">
        {/* Avatar */}
        <Image
          source={review.avatar}
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />

        {/* Name and Rating */}
        <View className="flex-1 ml-3">
          <Text className="text-[#1F2937] text-[20px] font-semibold">
            {review.name}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <StarRating rating={review.rating} size={20} />
            <Text className="text-[#313d49] text-[16px] ml-2">
              {review.timeAgo}
            </Text>
          </View>
        </View>

        {/* Menu Button */}
        <TouchableOpacity
          onPress={onMenuPress}
          className="p-2"
          activeOpacity={0.7}
        >
          <Text className="text-[#313d49] text-[28px]">⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Review Text */}
      <Text className="text-[#9ca3af] text-[14px] leading-6 ml-13">
        {review.review}
      </Text>
    </View>
  );
};

// Review Options Modal
const ReviewOptionsModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
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
          >
            <Text className="text-[#1F2937] text-[16px]">Report Review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-4 border-b border-[#F3F4F6]"
            activeOpacity={0.7}
          >
            <Text className="text-[#1F2937] text-[16px]">Reply to Review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-4"
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Text className="text-[#EF4444] text-[16px]">Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Main Reviews Screen
export default function ReviewsScreen() {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  const handleMenuPress = (_reviewId: string) => {
    // reviewId can be used for specific actions on the review
    setOptionsModalVisible(true);
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
        {/* Rating Summary - Data from dummyData */}
        <RatingSummary summary={reviewsSummary} />

        {/* Reviews List - Data from dummyData */}
        <View>
          {reviewsData.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onMenuPress={() => handleMenuPress(review.id)}
            />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Review Options Modal */}
      <ReviewOptionsModal
        visible={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
      />
    </SafeAreaView>
  );
}
