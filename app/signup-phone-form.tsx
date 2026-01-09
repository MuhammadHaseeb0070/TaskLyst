import { useState, useRef } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";

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

export default function SignupPhoneFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone?: string; code?: string }>();

  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.code === params.code) || countryCodes[0]
  );
  const [phoneNumber, setPhoneNumber] = useState(params.phone || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const softShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  };
  // Password validation rules
  const passwordRules = [
    { label: "One letter (a-z)", test: /[a-z]/.test(password) },
    { label: "One number (0-9)", test: /[0-9]/.test(password) },
    { label: "One letter (A-Z)", test: /[A-Z]/.test(password) },
    {
      label: "One special character",
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    { label: "8 characters minimum", test: password.length >= 8 },
  ];

  const passedRules = passwordRules.filter((r) => r.test).length;

  const getPasswordStrength = (): { label: string; color: string } => {
    if (password.length === 0) return { label: "", color: "#9CA3AF" };
    if (passedRules <= 2) return { label: "Weak", color: "#EF4444" };
    if (passedRules <= 4) return { label: "Medium", color: "#F59E0B" };
    return { label: "Strong", color: "#22C55E" };
  };

  const passwordStrength = getPasswordStrength();

  const selectCountry = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const handleSignUp = () => {
    console.log("Sign up:", {
      phone: `${selectedCountry.code} ${phoneNumber}`,
      firstName,
      lastName,
      password,
    });
    router.push("/signup-success");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-10 pb-6">
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
              Create Account
            </Text>
            <Text className="text-slate-600 text-[16px] mt-2 leading-6 font-medium">
              Join TaskLyst & connect with trusted{"\n"}service providers
            </Text>
          </View>

          {/* Form */}
          <View className="mt-5">
            {/* Mobile Number */}
            <View className="mb-3">
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

            {/* First Name */}
            <View className="mb-3">
              <Text className="text-[#2C3E50] text-[12px] mb-1.5">
                First Name
              </Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="e.g Johnathan"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                className=" items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                style={softShadow}
              />
            </View>

            {/* Last Name */}
            <View className="mb-3">
              <Text className="text-[#2C3E50] text-[12px] mb-1.5">
                Last Name
              </Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="e.g Mayyor"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                className=" items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                style={softShadow}
              />
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
                  onFocus={() => setShowPasswordRules(true)}
                  onBlur={() => setShowPasswordRules(false)}
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

            {/* Password Strength */}
            {password.length > 0 && (
              <View className="flex-row items-center mb-3">
                <Text className="text-[#2C3E50] text-[12px]">Strength: </Text>
                <Text
                  style={{
                    color: passwordStrength.color,
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  {passwordStrength.label}
                </Text>
              </View>
            )}

            {/* Password Requirements Tooltip */}
            {showPasswordRules && (
              <View
                className="p-4 rounded-xl mb-3"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text className="text-[#2C3E50] text-[13px] font-semibold mb-3">
                  Your Password must have:
                </Text>
                {passwordRules.map((rule, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View
                      className="w-5 h-5 rounded-full items-center justify-center mr-3"
                      style={{
                        backgroundColor: rule.test ? "#ECFDF5" : "#FEF2F2",
                      }}
                    >
                      <Text
                        style={{
                          color: rule.test ? "#22C55E" : "#EF4444",
                          fontSize: 10,
                          fontWeight: "600",
                        }}
                      >
                        {rule.test ? "✓" : "✗"}
                      </Text>
                    </View>
                    <Text className="text-gray-500 text-[12px]">
                      {rule.label}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Terms */}
          <View
            className="p-3 rounded-xl"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <Text className="text-gray-500 text-[12px] leading-5">
              By continuing you agree to Tasklyst&apos;s{" "}
              <Text className="text-[#2C3E50] font-medium">
                Terms of Service
              </Text>
              ,{" "}
              <Text className="text-[#2C3E50] font-medium">
                Payment Terms of Service
              </Text>
              {" & "}
              <Text className="text-[#2C3E50] font-medium">Privacy Policy</Text>
              .
            </Text>
          </View>

          {/* Spacer */}
          <View className="flex-1 min-h-[16px]" />

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#2C3E50",
              borderRadius: 30,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text className="text-white text-[14px] font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
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
