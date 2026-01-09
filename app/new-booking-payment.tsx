import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Progress Indicator Component
const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <View className="flex-row items-center w-full px-5 mb-8">
    {[1, 2, 3].map((step, index) => (
      // We use a View with 'flex-row' and 'flex-1' for the first two items
      // The last item (step 3) should NOT have flex-1 so it stays at the end
      <View 
        key={step} 
        className={`flex-row items-center ${index < 2 ? 'flex-1' : ''}`}
      >
        {/* Step Circle */}
        <View className={`w-9 h-9 rounded-full items-center justify-center z-10 ${
          step <= currentStep ? 'bg-[#2C3E50]' : 'bg-white border-2 border-gray-100'
        }`}>
          <Text className={`text-[14px] font-bold ${
            step <= currentStep ? 'text-white' : 'text-gray-400'
          }`}>{step}</Text>
        </View>

        {/* Connecting Line - Only shows for step 1 and 2 */}
        {index < 2 && (
          <View className={`flex-1 h-[2px] ${
            step < currentStep ? 'bg-[#2C3E50]' : 'bg-gray-200'
          }`} />
        )}
      </View>
    ))}
  </View>
);

const softShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.03,
  shadowRadius: 20,
  elevation: 2,
};

// Dropdown Component
const Dropdown = ({ 
  label, 
  value, 
  placeholder, 
  options, 
  onSelect,
  className,
  style,
}: { 
  label: string;
  value: string;
  placeholder: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  className?: string;
  style?: object;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <View className="mb-4">
      <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">{label}</Text>
      <TouchableOpacity 
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between ${className || "border border-gray-200 rounded-xl px-4"}`}
        style={[style, { height: 52 }]}
      >
        <Text className={value ? 'text-[#2C3E50] text-[15px]' : 'text-gray-400 text-[15px]'}>
          {value || placeholder}
        </Text>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>
      
      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable 
          className="flex-1 bg-black/40 justify-center px-6"
          onPress={() => setIsOpen(false)}
        >
          <View className="bg-white rounded-2xl p-4 max-h-[300px]">
            <ScrollView>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className="py-3 border-b border-gray-100"
                >
                  <Text className="text-[#2C3E50] text-[14px]">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default function NewBookingPaymentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [paymentMethod, setPaymentMethod] = useState('Manual');

  const paymentStatusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Partially Paid', value: 'Partially Paid' },
    { label: 'Refunded', value: 'Refunded' },
  ];
  
  const paymentMethodOptions = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Stripe', value: 'Stripe' },
    { label: 'PayPal', value: 'PayPal' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Cash', value: 'Cash' },
  ];

  const handleCreateBooking = () => {
    // In a real app, we would save the booking to backend/storage
    // For now, navigate to success screen
    router.push('/booking-success');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Text className="text-[#2C3E50] text-[24px]">←</Text>
        </TouchableOpacity>
        <Text className="text-[#2C3E50] text-[18px] font-bold">Booking</Text>
        <View className="w-10" />
      </View>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={3} />

      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title */}
        <Text className="text-[#2C3E50] text-[22px] font-bold mb-1">Payment Option</Text>
        <Text className="text-gray-400 text-[14px] mb-6">Enter Customer Information</Text>

        {/* Payment Status */}
        <Dropdown
          className="bg-white border border-slate-100 rounded-xl px-4"
          style={softShadow}
          label="Payment Status"
          value={paymentStatus}
          placeholder="Select Payment Status"
          options={paymentStatusOptions}
          onSelect={setPaymentStatus}
        />

        {/* Payment Method */}
        <Dropdown
          className="bg-white border border-slate-100 rounded-xl px-4"
          style={softShadow}
          label="Payment Method"
          value={paymentMethod}
          placeholder="Select Payment Method"
          options={paymentMethodOptions}
          onSelect={setPaymentMethod}
        />
      </ScrollView>

      {/* Create Booking Button */}
      <View 
        className="absolute bottom-0 left-0 right-0 px-6 pt-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={handleCreateBooking}
          className="bg-[#2C3E50] rounded-full py-4 items-center"
        >
          <Text className="text-white text-[16px] font-semibold">Create Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

