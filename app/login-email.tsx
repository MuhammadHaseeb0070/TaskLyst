import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginEmailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const softShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  };


  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      console.log('Login:', { email, password });
      router.push('/login-success');
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleCreateAccount = () => {
    router.push('/signup-email');
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
              Log in to your account
            </Text>
            <Text className="text-slate-600 text-[16px] mt-2 leading-6 font-medium">
              Welcome Back
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
                className="flex-row items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                  style={softShadow}
              />
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text className="text-[#2C3E50] text-[12px] mb-1.5">
                Password
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-row items-center bg-white border border-slate-100 rounded-xl px-3 py-4 mr-3"
                  style={softShadow}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                  }}
                >
                  <Text className="text-gray-400 text-[16px]">
                    {showPassword ? '👁' : '👁‍🗨'}
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
              backgroundColor: '#2C3E50',
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 24,
              
            }}
          >
            <Text className="text-white text-[15px] font-semibold">
              Log In
            </Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Create Account Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-400 text-[14px]">
              Don&apos;t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleCreateAccount} activeOpacity={0.7}>
              <Text className="text-[#5BA4A4] text-[14px] font-medium">
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
