import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const countryCodes = [
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
];

export default function LoginPhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const softShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  };


  const handleLogin = () => {
    if (phoneNumber.trim() && password.trim()) {
      console.log("Login:", {
        phone: `${selectedCountry.code} ${phoneNumber}`,
        password,
      });
      router.push("/login-success");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleCreateAccount = () => {
    router.push("/signup-phone");
  };

  const selectCountry = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="flex-1 px-6"
          style={{
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          }}
        >
          {/* Logo */}
          <View className="mt-4 mb-4">
            <Image
              source={require("@/assets/images/logo-tasklyst.png")}
              style={{ width: 110, height: 35, marginTop: "20%" }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="mb-10">
            <Text className="text-[#2D3748] text-[32px] font-bold leading-[40px]">
              Login Account
            </Text>
            <Text className="text-slate-600 text-[16px] mt-2 leading-6 font-medium">
              Welcome Back
            </Text>
          </View>

          {/* Form */}
          <View className="mt-8">
            {/* Mobile Number */}
            <View className="mb-4">
              <Text className="text-[#2C3E50] text-[12px] mb-1.5">
                Mobile Number
              </Text>
              <View className="flex-row">
                {/* Country Code Selector */}
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(true)}
                  activeOpacity={0.7}
                  className="flex-row items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                  style={softShadow}
                >
                  <Text className="text-[#2C3E50] text-[14px]">
                    {selectedCountry.code}
                  </Text>
                  <Text className="text-gray-400 text-[8px] ml-1">▼</Text>
                </TouchableOpacity>

                {/* Phone Number Input */}
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="07726601220"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  className="flex-1 items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                  style={softShadow}
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text className="text-[#2C3E50] text-[12px] mb-1.5">
                Password
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                  style={softShadow}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-gray-400 text-[16px]">
                    {showPassword ? "👁" : "👁‍🗨"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              activeOpacity={0.7}
              className="self-end mt-1"
            >
              <Text className="text-[#5BA4A4] text-[13px]">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#2C3E50",
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <Text className="text-white text-[15px] font-semibold">Log In</Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Create Account Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-400 text-[14px]">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleCreateAccount} activeOpacity={0.7}>
              <Text className="text-[#5BA4A4] text-[14px] font-medium">
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Country Code Picker Modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[70%]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
              <Text className="text-[#2C3E50] text-[18px] font-semibold">
                Select Country
              </Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Text className="text-gray-400 text-[24px]">×</Text>
              </TouchableOpacity>
            </View>

            {/* Country List */}
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectCountry(item)}
                  activeOpacity={0.7}
                  className="flex-row items-center px-6 py-4 border-b border-gray-50"
                  style={{
                    backgroundColor:
                      selectedCountry.code === item.code ? "#F0FFFE" : "white",
                  }}
                >
                  <Text className="text-[20px] mr-3">{item.flag}</Text>
                  <Text className="flex-1 text-[#2C3E50] text-[15px]">
                    {item.country}
                  </Text>
                  <Text className="text-gray-500 text-[15px]">{item.code}</Text>
                  {selectedCountry.code === item.code && (
                    <Text className="text-[#4ECDC4] ml-2">✓</Text>
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
