import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginSuccessScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/(home)');
  };

  return (
    <View className="flex-1 bg-black/50 items-center justify-center px-6">
      {/* Modal Card */}
      <View 
        className="w-full bg-white rounded-3xl px-6 py-10 items-center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        {/* Icon Container */}
        <View className="relative items-center justify-center mb-8" style={{ width: 140, height: 140 }}>
          {/* Decorative dots */}
          <View className="absolute w-3 h-3 rounded-full bg-[#2C3E50]" style={{ top: 10, left: 20 }} />
          <View className="absolute w-2 h-2 rounded-full bg-[#2C3E50]" style={{ top: 30, right: 15 }} />
          <View className="absolute w-1.5 h-1.5 rounded-full bg-[#2C3E50]" style={{ bottom: 35, left: 10 }} />
          <View className="absolute w-2 h-2 rounded-full bg-[#2C3E50]" style={{ bottom: 20, right: 25 }} />
          
          {/* Small decorative dots */}
          <View className="absolute w-1 h-1 rounded-full bg-[#2C3E50]/40" style={{ top: 50, left: 5 }} />
          <View className="absolute w-1 h-1 rounded-full bg-[#2C3E50]/40" style={{ top: 20, right: 35 }} />
          <View className="absolute w-1 h-1 rounded-full bg-[#2C3E50]/40" style={{ bottom: 50, right: 5 }} />
          
          {/* Main circle with user icon */}
          <View 
            className="w-24 h-24 rounded-full bg-[#2C3E50] items-center justify-center"
          >
            {/* User icon */}
            <View className="items-center">
              {/* Head */}
              <View className="w-6 h-6 rounded-full bg-white mb-1" />
              {/* Body */}
              <View 
                className="w-10 h-5 bg-white rounded-t-full"
                style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              />
            </View>
          </View>
        </View>

        {/* Text Content */}
        <Text className="text-[#2C3E50] text-[24px] font-bold text-center mb-2">
          Login Successful!
        </Text>
        <Text className="text-gray-400 text-[15px] text-center leading-6">
          Welcome back to{'\n'}Tasklyst.
        </Text>

        {/* Go to Home Button */}
        <TouchableOpacity
          onPress={handleGoHome}
          activeOpacity={0.8}
          className="w-full mt-8"
          style={{
            backgroundColor: '#2C3E50',
            borderRadius: 30,
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text className="text-white text-[15px] font-semibold">
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
