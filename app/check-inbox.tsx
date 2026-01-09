import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CheckInboxScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string }>();
  const email = params.email || 'jonathanmayyor606@gmail.com';

  const handleResendEmail = () => {
    console.log('Resending email to:', email);
    // Handle resend logic
  };

  const handleBackToLogin = () => {
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {/* Logo */}
      <Image 
        source={require('@/assets/images/logo-tasklyst.png')}
        style={{ width: 100, height: 28 }}
        resizeMode="contain"
      />

      {/* Header */}
      <Text className="text-[#2C3E50] text-[24px] font-bold mt-6">
        Check Your Inbox
      </Text>

      {/* Email Illustration */}
      <View className="items-center mt-8 mb-6">
        <Image 
          source={require('@/assets/images/email-sent.png')}
          style={{ width: 180, height: 140 }}
          resizeMode="contain"
        />
      </View>

      {/* Email Info Box */}
      <View 
        className="rounded-2xl p-4 items-center"
        style={{ backgroundColor: '#EBF4FF' }}
      >
        <Text className="text-gray-500 text-[14px] text-center">
          We sent a configuration email to:
        </Text>
        <Text className="text-[#2C3E50] text-[14px] font-semibold text-center mt-1">
          {email}
        </Text>
      </View>

      {/* Spam Notice */}
      <View className="mt-6 items-center">
        <Text className="text-gray-400 text-[13px] text-center leading-5">
          Check your spam folder if you don&apos;t see the{'\n'}email. Haven&apos;t received the email?
        </Text>
        
        {/* Resend Email Link */}
        <TouchableOpacity 
          onPress={handleResendEmail}
          activeOpacity={0.7}
          className="mt-3"
        >
          <Text className="text-[#2C3E50] text-[14px] font-medium underline">
            Resend Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Back to Login Button */}
      <TouchableOpacity
        onPress={handleBackToLogin}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#2C3E50',
          borderRadius: 30,
          paddingVertical: 16,
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        <Text className="text-white text-[15px] font-semibold">
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

