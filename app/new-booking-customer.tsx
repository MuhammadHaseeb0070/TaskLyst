import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Modal, Pressable } from 'react-native';
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

// Country Code Picker
const countryCodes = [
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
];

const softShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.03,
  shadowRadius: 20,
  elevation: 2,
};

export default function NewBookingCustomerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleNext = () => {
    // Navigate to step 3 with all booking data
    router.push({
      pathname: '/new-booking-payment',
      params: {
        ...params,
        customerName: fullName,
        customerEmail: email,
        customerPhone: `${selectedCountry.code}${phoneNumber}`,
      }
    });
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
      <ProgressIndicator currentStep={2} />

      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text className="text-[#2C3E50] text-[22px] font-bold mb-1">Customer Information</Text>
        <Text className="text-gray-400 text-[14px] mb-6">Enter Customer Information</Text>

        {/* Search Existing Customer */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">Search Existing Customer</Text>
          <View 
            className="flex-row items-center bg-white border border-slate-100 rounded-xl px-4"
            style={{...softShadow, height: 52}}
          >
            <Image 
              source={require('@/assets/images/icon-search.png')}
              className="w-5 h-5 mr-3"
              style={{ tintColor: '#9CA3AF' }}
              resizeMode="contain"
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search By Name, Email Or Phone.."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-[15px] text-[#2C3E50]"
            />
          </View>
        </View>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">
            Full Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter Customer Full Name"
            placeholderTextColor="#9CA3AF"
            className="bg-white border border-slate-100 rounded-xl px-4 text-[15px] text-[#2C3E50]"
            style={{...softShadow, height: 52}}
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Customer@gmail.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white border border-slate-100 rounded-xl px-4 text-[15px] text-[#2C3E50]"
            style={{...softShadow, height: 52}}
          />
        </View>

        {/* Mobile Number */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">Mobile Number</Text>
          <View className="flex-row items-center">
            {/* Country Code Selector */}
            <TouchableOpacity 
              onPress={() => setShowCountryPicker(true)}
              className="flex-row items-center justify-center bg-white border border-slate-100 rounded-xl px-4 mr-2"
              style={{...softShadow, height: 52}}
            >
              <Text className="text-[#2C3E50] text-[15px]">{selectedCountry.code}</Text>
              <Text className="text-gray-400 ml-2">▼</Text>
            </TouchableOpacity>
            
            {/* Phone Number Input */}
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="07726601220"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="flex-1 bg-white border border-slate-100 rounded-xl px-4 text-[15px] text-[#2C3E50]"
              style={{...softShadow, height: 52}}
            />
          </View>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View 
        className="absolute bottom-0 left-0 right-0 px-6 pt-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={handleNext}
          className="bg-[#2C3E50] rounded-full py-4 items-center"
        >
          <Text className="text-white text-[16px] font-semibold">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Country Code Picker Modal */}
      <Modal visible={showCountryPicker} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <Pressable className="flex-1" onPress={() => setShowCountryPicker(false)} />
          <View className="bg-white rounded-t-3xl p-6 max-h-[60%]">
            <View className="items-center mb-4">
              <View className="w-12 h-1 rounded-full bg-gray-300" />
            </View>
            <Text className="text-[#2C3E50] text-[18px] font-bold mb-4 text-center">Select Country</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {countryCodes.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  onPress={() => {
                    setSelectedCountry(country);
                    setShowCountryPicker(false);
                  }}
                  className={`flex-row items-center py-4 border-b border-gray-100 ${
                    selectedCountry.code === country.code ? 'bg-gray-50 -mx-2 px-2 rounded-lg' : ''
                  }`}
                >
                  <Text className="text-[24px] mr-3">{country.flag}</Text>
                  <Text className="text-[#2C3E50] text-[16px] flex-1">{country.country}</Text>
                  <Text className="text-gray-500 text-[16px]">{country.code}</Text>
                  {selectedCountry.code === country.code && (
                    <Text className="text-[#2C3E50] ml-3">✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

