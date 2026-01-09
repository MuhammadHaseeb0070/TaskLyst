import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignupEmailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const softShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  };

  const handleContinue = () => {
    if (email.trim()) {
      router.push('/signup-form');
    }
  };

  const handleLogin = () => {
    router.push('/login-email');
  };

  // Compute safe‑area padding once
  const safeAreaStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: insets.top + 20,
    paddingBottom: insets.bottom + 20,
    paddingHorizontal: 16,
  };

  return (
    // 1️⃣ SafeAreaView handles notches, status‑bar, home‑indicator, etc.
    <SafeAreaView style={safeAreaStyle}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
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
              Join TaskLyst &amp; connect with trusted{'\n'}service providers
            </Text>
          </View>

          {/* Email Input */}
          <View className="mt-8">
            <Text className="text-[#2C3E50] text-[14px] mb-2">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Loisbecket@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
              style={softShadow}
            />
          </View>

          {/* Continue Button – marginBottom keeps it above the home‑indicator */}
          <TouchableOpacity
            onPress={handleContinue}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#2C3E50',
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 24,
              marginBottom: insets.bottom, // <-- prevents cut‑off on iPhone‑style devices
            }}
          >
            <Text className="text-white text-[15px] font-semibold">
              Continue
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-5">
            <Text className="text-gray-400 text-[14px]">
              Have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
              <Text className="text-[#5BA4A4] text-[14px] font-medium">
                Log In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Spacer – now fully responsive because its container respects safe‑area padding */}
          <View className="flex-1 min-h-[50px]" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}