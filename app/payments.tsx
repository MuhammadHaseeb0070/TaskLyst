import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { paymentsData, paymentSummary, Payment, PaymentStatus } from "@/data/dummyData";

// Header Component (same as reviews screen)
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
            Payments
          </Text>
        </View>
      </View>
    </View>
  );
};

// Funds Summary Card Component
const FundsSummaryCard = () => {
  return (
    <View
      className="flex-col mb-6 mt-3 bg-white rounded-2xl p-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Text className="text-[#313d49] text-[14px] mb-1 font-bold">
        Funds from Completed Jobs
      </Text>
      <Text className="text-[#1F2937] text-[28px] font-bold mb-4">
        £{paymentSummary.fundsFromCompletedJobs.toFixed(2)}
      </Text>

      <TouchableOpacity
        className="bg-[#313d49] px-8 py-3 rounded-full mb-4"
        style={{ alignSelf: "flex-start" }}
        activeOpacity={0.7}
      >
        <Text className="text-white text-[14px] font-semibold">
          Payout Now
        </Text>
      </TouchableOpacity>

      <Text className="text-[#9CA3AF] text-[13px]">
        Next scheduled payout: {paymentSummary.nextPayoutDate}{"\n"}({paymentSummary.processingType})
      </Text>
    </View>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'Succeeded':
        return {
          bgColor: '#c9eeff',
          textColor: '#313d49',
        };
      case 'Pending':
        return {
          bgColor: '#FEF3C7',
          textColor: '#92400E',
        };
      case 'Failed':
        return {
          bgColor: '#FEE2E2',
          textColor: '#DC2626',
        };
      default:
        return {
          bgColor: '#F3F4F6',
          textColor: '#6B7280',
        };
    }
  };

  const styles = getBadgeStyles();

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: styles.bgColor,
        borderRadius: 100, // Use a large enough number for pill shape
        paddingHorizontal: 12,
        paddingVertical: 5,
      }}
    >
      <Text
        style={{
          color: styles.textColor,
          fontSize: 12,
          fontWeight: '500',
        }}
      >
        {status}
      </Text>
    </View>
  );
};

// Payment Card Component
const PaymentCard = ({ payment }: { payment: Payment }) => {
  return (
    <View
      className="mb-4 bg-white rounded-2xl px-6 py-6"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      {/* Header Row - Status and Amount */}
      <View className="flex-row justify-between items-start mb-3">
  
        <StatusBadge status={payment.status} />
        <Text className="text-[#1F2937] text-[20px] font-bold">
          £{payment.amount.toFixed(2)}
        </Text>
      </View>

      {/* Title */}
      <Text className="text-[#1F2937] text-[18px] font-semibold mb-3">
        {payment.title} – {payment.transactionId}
      </Text>

      {/* Details */}
      <View className="space-y-1">
        <View className="flex-row mb-1">
          <Text className="text-[#313d49] text-[16px] font-semibold">Date:  </Text>
          <Text className="text-[#9CA3AF] text-[16px] font-semibold">{payment.date}</Text>
        </View>
        <View className="flex-row mb-1">
          <Text className="text-[#313d49] text-[16px] font-semibold">Payment Method:  </Text>
          <Text className="text-[#9CA3AF] text-[16px] font-semibold">
            {payment.paymentMethod} {payment.cardLast4}
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-[#313d49] text-[16px] font-semibold">Transaction:  </Text>
          <Text className="text-[#9CA3AF] text-[16px] font-semibold">{payment.transactionId}</Text>
        </View>
      </View>
    </View>
  );
};

// Load More Button Component
const LoadMoreButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      className="bg-[#313d49] py-4 rounded-full mb-6"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className="text-white text-[16px] font-semibold text-center">
        Load More
      </Text>
    </TouchableOpacity>
  );
};

// Main Payments Screen
export default function PaymentsScreen() {
  const [displayCount, setDisplayCount] = useState(3);
  const displayedPayments = paymentsData.slice(0, displayCount);
  const hasMore = displayCount < paymentsData.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 3, paymentsData.length));
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
        {/* Funds Summary Card */}
        <FundsSummaryCard />

        {/* Payment Cards List */}
        <View>
          {displayedPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </View>

        {/* Load More Button */}
        {hasMore && <LoadMoreButton onPress={handleLoadMore} />}

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
