import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { allAppointments } from "@/data/dummyData";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Header Component
const Header = ({ onBack }: { onBack: () => void }) => (
  <View className="flex-row items-center justify-between px-6 py-5">
    <TouchableOpacity
      onPress={onBack}
      className="w-10 h-10 items-center justify-center"
    >
      <Text className="text-[#2C3E50] text-[24px]">←</Text>
    </TouchableOpacity>
    <Text className="text-[#2C3E50] text-[18px] font-bold">
      Booking Details
    </Text>
    <View className="w-10" />
  </View>
);

// Info Row Component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
    <Text className="text-[#2C3E50] text-[14px] font-medium">{label}</Text>
    <Text className="text-gray-400 text-[14px]">{value}</Text>
  </View>
);

export default function BookingDetailsScreen() {
  const router = useRouter();
  
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the appointment by ID
  const appointment = allAppointments.find((apt) => apt.id === id);

  if (!appointment) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}
      style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}>
        <Header onBack={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-[16px]">
            Appointment not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}
    style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}>
      {/* Header */}
      <Header onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-6">
          {/* Service Image */}
          <View className="rounded-2xl overflow-hidden mb-4">
            <Image
              source={appointment.serviceImage}
              className="w-full h-[200px]"
              resizeMode="cover"
            />
          </View>

          {/* Date and Price Row */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[#2C3E50] text-[14px]">
              {appointment.fullDate}
            </Text>
            <Text className="text-[#2C3E50] text-[20px] font-bold">
              £{appointment.amount.toFixed(2)}
            </Text>
          </View>

          {/* Service Provider Name */}
          <Text className="text-[#2C3E50] text-[24px] font-bold mb-1">
            {appointment.serviceProviderName}
          </Text>

          {/* Booking ID */}
          <Text className="text-gray-400 text-[15px] mb-4">
            Booking {appointment.bookingId}
          </Text>

          {/* Location and Duration */}
          <View className="flex-row items-center mb-6">
            {/* Location Group */}
            <View className="flex-row items-center mr-6">
              <View className="w-8 h-8 bg-[#EBF5FF] items-center justify-center mr-2  rounded-full">
                <Image
                  source={require("@/assets/images/icon-location.png")}
                  className="w-4 h-4"
                  style={{ tintColor: "#2C3E50" }} // Matching your primary dark theme color
                  resizeMode="contain"
                />
              </View>
              <Text className="text-gray-500 text-[13px] font-medium">
                {appointment.fullLocation}
              </Text>
            </View>

            {/* Clock Group */}
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-[#EBF5FF] rounded-full items-center justify-center mr-2">
                <Image
                  source={require("@/assets/images/icon-clock.png")}
                  className="w-4 h-4"
                  style={{ tintColor: "#2C3E50" }}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-gray-500 text-[13px] font-medium">
                {appointment.duration}
              </Text>
            </View>
          </View>

          {/* Customer Information */}
          <Text className="text-[#2C3E50] text-[18px] font-bold mb-4">
            Customer Information
          </Text>

          <View className="flex-row items-center mb-6">
            <Image
              source={appointment.customerAvatar}
              className="w-12 h-12 rounded-full mr-3"
              resizeMode="cover"
            />
            <View>
              <Text className="text-[#2C3E50] text-[16px] font-semibold">
                {appointment.customerName}
              </Text>
              <View className="flex-row items-center mt-1">
                <Image source={require("@/assets/images/icon-email.png")} className="w-4 h-4 mr-2" resizeMode="contain" />
                <Text className="text-gray-400 text-[13px]">
                  {appointment.customerEmail}
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Information Card */}
          <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* Card Header */}
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-[#E8F4FD] items-center justify-center mr-3">
                <Image
                  source={require("@/assets/images/icon-payment.png")}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[#2C3E50] text-[16px] font-semibold">
                Payment Information
              </Text>
            </View>

            {/* Payment Method */}
            <View className="bg-gray-50 rounded-xl p-4 mb-3">
              <Text className="text-[#2C3E50] text-[14px] font-medium mb-1">
                Payment Method
              </Text>
              <Text className="text-gray-400 text-[14px]">
                {appointment.paymentMethod}
              </Text>
            </View>

            {/* Amount */}
            <View className="bg-gray-50 rounded-xl p-4">
              <Text className="text-[#2C3E50] text-[14px] font-medium mb-1">
                Amount
              </Text>
              <Text className="text-gray-400 text-[14px]">
                £{appointment.amount.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Booking Information Card */}
          <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* Card Header */}
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-[#E8F4FD] items-center justify-center mr-3">
                <Image
                  source={require("@/assets/images/icon-booking.png")}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[#2C3E50] text-[16px] font-semibold">
                Booking Information
              </Text>
            </View>

            {/* Created */}
            <View className="bg-gray-50 rounded-xl p-4 mb-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-[#2C3E50] text-[14px] font-medium">
                  Created
                </Text>
                <Text className="text-gray-400 text-[14px]">
                  {appointment.createdDate}
                </Text>
              </View>
            </View>

            {/* Last Updated */}
            <View className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-[#2C3E50] text-[14px] font-medium">
                  Last Updated
                </Text>
                <Text className="text-gray-400 text-[14px]">
                  {appointment.lastUpdated}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Close Button */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gray-50"
      style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#2C3E50] rounded-full py-4 items-center"
          style={{
            shadowColor: "#2C3E50",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text className="text-white text-[16px] font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
