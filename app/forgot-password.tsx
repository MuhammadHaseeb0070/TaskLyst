import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email.trim()) {
      console.log('Reset password for:', email);
      router.push({
        pathname: '/check-inbox',
        params: { email: email }
      });
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View 
          className="flex-1 px-6"
          style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}
        >
          {/* Logo */}
          <Image 
            source={require('@/assets/images/logo-tasklyst.png')}
            style={{ width: 100, height: 28 }}
            resizeMode="contain"
          />

          {/* Header */}
          <View className="mt-10">
            <Text className="text-[#2C3E50] text-[24px] font-bold">
              Forgot Password
            </Text>
            <Text className="text-gray-400 text-[14px] mt-2 leading-5">
              Enter your email address and we&apos;ll{'\n'}send you a link to reset your password.
            </Text>
          </View>

          {/* Form */}
          <View className="mt-8">
            {/* Email */}
            <View className="mb-4">
              <Text className="text-[#2C3E50] text-[12px] mb-1.5">
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
                style={{
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  fontSize: 14,
                  color: '#2C3E50',
                }}
              />
            </View>
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#2C3E50',
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            <Text className="text-white text-[15px] font-semibold">
              Reset Password
            </Text>
          </TouchableOpacity>

          {/* Back to Login Link */}
          <View className="flex-row justify-center mt-5">
            <Text className="text-gray-400 text-[14px]">
              Remember your password?{' '}
            </Text>
            <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7}>
              <Text className="text-[#5BA4A4] text-[14px] font-medium">
                Log In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Spacer */}
          <View className="flex-1" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
