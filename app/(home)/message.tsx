import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessageScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-[#2C3E50] text-[24px] font-bold mb-4">Messages</Text>
        <View className="bg-white rounded-2xl p-8 items-center justify-center w-full">
          <Text className="text-gray-400 text-[18px] font-medium">Coming Soon</Text>
          <Text className="text-gray-300 text-[14px] mt-2 text-center">
            This feature is under development
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
