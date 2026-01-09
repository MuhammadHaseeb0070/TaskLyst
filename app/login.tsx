import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");
type LoginMethod = 'email' | 'phone' | 'google' | null;

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState<LoginMethod>(null);

  const handleNext = () => {
    if (selectedMethod === 'email') {
      router.push('/login-email');
    } else if (selectedMethod === 'phone') {
      router.push('/login-phone');
    } else if (selectedMethod === 'google') {
      console.log('Google login');
    }
  };

  const loginOptions = [
    {
      id: 'email' as LoginMethod,
      label: 'Login with Email',
      icon: require('@/assets/images/icon-gmail.png'),
    },
    {
      id: 'phone' as LoginMethod,
      label: 'Login with Phone',
      icon: require('@/assets/images/icon-phone.png'),
    },
    {
      id: 'google' as LoginMethod,
      label: 'Login with Google',
      icon: require('@/assets/images/icon-google.png'),
    },
  ];

  return (
    <View 
      className="flex-1 bg-white px-8"
      style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}
    >
      {/* 1. Brand Logo (Centered as per image) */}
    {/* Logo */}
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
          Login Account
        </Text>
        <Text className="text-slate-600 text-[16px] mt-2 leading-6 font-medium">
        Join TaskLyst & connect with trusted service{"\n"}providers
        </Text>
      </View>

      {/* 3. Login Options with Exact Shadows */}
      <View>
        {loginOptions.map((option, index) => {
          const isSelected = selectedMethod === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedMethod(option.id)}
              activeOpacity={0.8}
              className={`
                flex-row items-center justify-center py-[18px] px-6 rounded-full mb-5 bg-white
                ${isSelected ? 'border-[1.5px] border-[#4ECDC4]' : 'border-0'}
              `}
              style={{
                shadowColor: "#rgba(0, 0, 0, 0.5)",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 12,
                elevation:2,
              }}
            >
              <Image 
                source={option.icon}
                style={{ width: 20, height: 22, marginRight: 12 }}
                resizeMode="contain"
              />
              <Text className="text-[#2D3748] text-[16px] font-semibold">
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-1" />

      {/* 4. Footer Next Button */}
      <View className="w-full">
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.9}
          disabled={!selectedMethod}
          className={`
            py-5 rounded-[35px] items-center
            ${selectedMethod ? 'bg-[#2D3748]' : 'bg-[#2D3748] opacity-60'}
          `}
        >
          <Text className="text-white text-[18px] font-bold">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 