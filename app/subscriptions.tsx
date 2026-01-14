import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  subscriptionPlans,
  currentSubscription,
  SubscriptionPlan,
} from "@/data/dummyData";

import { Image } from "react-native";
// Header Component (same as payments/reviews screen)
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
            Subscriptions
          </Text>
        </View>
      </View>
    </View>
  );
};

// Active Plan Card Component
const ActivePlanCard = () => {
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
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12  bg-[#add0eb] rounded-full items-center justify-center">
          <Image
            source={require("@/assets/images/majesticons_creditcard.png")}
            className="w-6 h-6"
          />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text className="text-[#313d49] text-[16px] font-semibold">
            Active plan
          </Text>
          <Text className="text-[#9CA3AF] text-[14px]">
            Current plan is {currentSubscription.planName}.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-[#313d49] px-6 py-3 rounded-full"
        style={{ alignSelf: "flex-start" }}
        activeOpacity={0.7}
      >
        <Text className="text-white text-[14px] font-semibold">
          Manage Subscription
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Plan Card Component
const PlanCard = ({
  plan,
  isSelected,
  onSelect,
}: {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
      className={`mb-4 rounded-2xl px-5 py-5`}
      style={{
        backgroundColor: isSelected ? "#e2f0fb" : "#fff",
     
        borderWidth: isSelected ? 2 : 2,
        borderColor: isSelected ? "#313d49" : "#d9d9da",
      }}
    >
      <View className="flex-row items-center">
        {/* Card Icon */}
        <View
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{
            backgroundColor: isSelected ? "#add0eb" : "#f1f1f1",
            borderWidth: 0,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("@/assets/images/majesticons_creditcard.png")}
            className="w-8 h-8"
            style={{ borderRadius: 999 }}
          />
        </View>

        {/* Plan Details */}
        <View className="flex-1" style={{ marginLeft: 10 }}>
          <View className="flex-row items-baseline">
            <Text className="text-[#313d49] text-[18px] font-semibold">
              {plan.name}
            </Text>
            <Text className="text-[#313d49] text-[18px] font-bold">
              {" "}
              ${plan.price}/
            </Text>
            <Text className="text-[#9CA3AF] text-[16px]">{plan.period}</Text>
          </View>
          <Text className="text-[#9CA3AF] text-[16px] mt-1">
            {plan.description}
          </Text>
        </View>

        {/* Selection Indicator */}
        <View
          className="w-6 h-6 rounded-full items-center justify-center"
          style={{
            borderWidth: isSelected ? 0 : 2,
            borderColor: "#D1D5DB",
            backgroundColor: isSelected ? "#313d49" : "transparent",
          }}
        >
          {isSelected && (
            <Text className="text-white text-[14px] font-bold">✓</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Subscriptions Screen
export default function SubscriptionsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPlanId, setSelectedPlanId] = useState(
    currentSubscription.planId
  );

  const handleConfirm = () => {
    // Handle subscription confirmation
    console.log("Confirmed plan:", selectedPlanId);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Active Plan Card */}
        <ActivePlanCard />

        {/* Change Plan Section */}
        <View className="mb-4">
          <Text className="text-[#313d49] text-[20px] font-bold mb-1">
            Change your plan
          </Text>
          <Text className="text-[#68696b] text-[16px]">
            Flexible pricing that grows with you.
          </Text>
        </View>

        {/* Plan Options */}
        <View className="mb-6">
          {subscriptionPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </View>

        {/* Bottom Spacing for buttons */}
        <View className="h-4" />
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="px-6 pt-2 bg-white" style={{ paddingBottom: insets.bottom + 24 }}>
        <TouchableOpacity
          className="bg-[#313d49] py-4 rounded-full mb-3"
          activeOpacity={0.7}
          onPress={handleConfirm}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Confirm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-4 rounded-full"
          style={{
            borderWidth: 1,
            borderColor: "#313d49",
          }}
          activeOpacity={0.7}
          onPress={handleCancel}
        >
          <Text className="text-[#313d49] text-[16px] font-semibold text-center">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
