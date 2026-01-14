import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone: string; isLogin?: string }>();
  const phoneNumber = params.phone || '+44 07726601220';
  const isLogin = params.isLogin === 'true';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(56);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      console.log('Verifying OTP:', code);
      if (isLogin) {
        // Login flow - go to success or home
        router.push('/signup-success');
      } else {
        // Signup flow - go to form to complete registration
        router.push({
          pathname: '/signup-phone-form',
          params: { phone: phoneNumber }
        });
      }
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(56);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      console.log('Resending OTP...');
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-14" style={{ paddingBottom: insets.bottom + 32 }}>
          {/* Logo */}
          <Image 
            source={require('@/assets/images/logo-tasklyst.png')}
            style={{ width: 100, height: 28 }}
            resizeMode="contain"
          />

          {/* Header */}
          <View className="mt-10">
            <Text className="text-[#2C3E50] text-[24px] font-bold">
              Verify Phone Number
            </Text>
            <Text className="text-gray-400 text-[14px] mt-2 leading-5">
              Enter the code that was sent to your{'\n'}phone number at{' '}
              <Text className="text-[#5BA4A4] font-medium">{phoneNumber}</Text>
            </Text>
          </View>

          {/* OTP Input */}
          <View className="flex-row justify-between mt-10 px-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={{
                  width: 45,
                  height: 50,
                  borderBottomWidth: 2,
                  borderBottomColor: digit ? '#2C3E50' : '#E5E7EB',
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#2C3E50',
                  fontWeight: '600',
                }}
              />
            ))}
          </View>

          {/* Resend Section */}
          <View className="items-center mt-10">
            <Text className="text-gray-400 text-[14px]">
              Did not receive the code?
            </Text>
            <TouchableOpacity 
              onPress={handleResend}
              activeOpacity={canResend ? 0.7 : 1}
              className="mt-1"
            >
              <Text className="text-[14px]">
                <Text className="text-gray-500">Resend Code in </Text>
                <Text className={canResend ? "text-[#5BA4A4] font-medium" : "text-[#5BA4A4]"}>
                  {canResend ? 'Resend Now' : `${timer}s`}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Spacer */}
          <View className="flex-1 min-h-[40px]" />

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleVerify}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#2C3E50',
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: 'center',
              opacity: otp.every(d => d) ? 1 : 0.6,
            }}
            disabled={!otp.every(d => d)}
          >
            <Text className="text-white text-[15px] font-semibold">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
