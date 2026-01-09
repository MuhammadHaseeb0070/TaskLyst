import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Role = "customer" | "business";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState<Role>("business");

  const handleNext = () => {
    router.push("/create-account");
  };

  const cardShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  };

  return (
    <View
      className="flex-1 bg-white px-6 "
      style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}
    >
       <View className="mt-4 mb-4">
        <Image 
          source={require('@/assets/images/logo-tasklyst.png')}
          style={{ width: 110, height: 35 ,marginTop:"20%"}}
          resizeMode="contain"
        />
      </View>

      {/* Header */}
      <View className="mb-10">
        <Text className="text-[#2D3748] text-[32px] font-bold leading-[40px]">
          Role Selection
        </Text>
        <Text className="text-slate-600 text-[16px] mt-2 leading-6 font-medium">
        Choose how will you use the app.
        </Text>
      </View>

      {/* Role Options */}
      <View className="mt-6">
        {/* Customer Option */}
        <TouchableOpacity
          onPress={() => setSelectedRole("customer")}
          activeOpacity={0.7}
          className="rounded-full bg-white"
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              marginBottom: 12,
              // Border logic: only if selected
              borderWidth: selectedRole === "customer" ? 1.5 : 0,
              borderColor: "#313d49",
            },
            cardShadow,
          ]}
        >
          <View
            className="items-center justify-center mr-4"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F3F4F6",
            }}
          >
            <Image
              source={require("@/assets/images/icon-customer.png")}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          </View>
          <Text className="flex-1 text-[#2C3E50] text-[15px]">
            I am a customer.
          </Text>
          {selectedRole === "customer" && (
            <Text className="text-[#34c759] bg-[#effff3] px-2 py-1 rounded-full text-[13px] font-medium">
              Selected
            </Text>
          )}
        </TouchableOpacity>

        {/* Business Option */}
        <TouchableOpacity
          onPress={() => setSelectedRole("business")}
          activeOpacity={0.7}
          className="rounded-full bg-white"
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              // Border logic: only if selected
              borderWidth: selectedRole === "business" ? 1.5 : 0,
              borderColor: "#313d49",
            },
            cardShadow,
          ]}
        >
          <View
            className="items-center justify-center mr-4"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F3F4F6",
            }}
          >
            <Image
              source={require("@/assets/images/icon-business.png")}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          </View>
          <Text className="flex-1 text-[#2C3E50] text-[15px]">
            I am a business.
          </Text>
          {selectedRole === "business" && (
            <Text className="text-[#34c759] bg-[#effff3] px-2 py-1 rounded-full text-[13px] font-medium">
              Selected
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.8}
        style={{
          backgroundColor: "#2C3E50",
          borderRadius: 30,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text className="text-white text-[15px] font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  );
}