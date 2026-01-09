import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function BookingSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    // Navigate back to home screen, clearing the booking flow from stack
    router.replace('/(home)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        {/* Celebration Image */}
        <Image
          source={require('@/assets/images/Image.png')}
          className="w-64 h-64 mb-8"
          resizeMode="contain"
        />

        {/* Congratulations Text */}
        <Text className="text-[#2C3E50] text-[28px] font-bold text-center mb-4">
          Congratulations!
        </Text>
        
        <Text className="text-gray-400 text-[16px] text-center leading-6">
          The Booking has been created{'\n'}for the customer.
        </Text>
      </View>

      {/* Close Button */}
      <View className="px-6" style={{ paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity
          onPress={handleClose}
          className="bg-[#2C3E50] rounded-full py-4 items-center"
        >
          <Text className="text-white text-[16px] font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
