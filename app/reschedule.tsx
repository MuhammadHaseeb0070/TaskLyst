import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { allAppointments } from '@/data/dummyData';

// Calendar Component
const RescheduleCalendar = ({ 
  selectedDate, 
  onSelectDate 
}: { 
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }
    
    // Fill remaining days
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }
    
    return calendarDays;
  };

  const calendarDays = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <View className="border border-gray-200 rounded-xl p-4 mb-4">
      {/* Month Navigation */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity 
          onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="p-2"
        >
          <Text className="text-gray-400 text-[18px]">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#2C3E50] text-[14px] font-semibold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity 
          onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="p-2"
        >
          <Text className="text-gray-400 text-[18px]">›</Text>
        </TouchableOpacity>
      </View>
      
      {/* Days Header */}
      <View className="flex-row mb-2">
        {days.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-gray-400 text-[10px]">{day}</Text>
          </View>
        ))}
      </View>
      
      {/* Calendar Grid */}
      <View className="flex-row flex-wrap">
        {calendarDays.map((item, index) => {
          const isSelected = selectedDate && 
            item.date.getDate() === selectedDate.getDate() &&
            item.date.getMonth() === selectedDate.getMonth() &&
            item.date.getFullYear() === selectedDate.getFullYear();
          const isPast = item.date < today && item.isCurrentMonth;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => !isPast && item.isCurrentMonth && onSelectDate(item.date)}
              disabled={isPast || !item.isCurrentMonth}
              className="w-[14.28%] aspect-square items-center justify-center"
            >
              <View className={`w-8 h-8 rounded-full items-center justify-center ${
                isSelected ? 'bg-[#2C3E50]' : ''
              }`}>
                <Text className={`text-[13px] ${
                  isSelected 
                    ? 'text-white font-semibold' 
                    : isPast
                      ? 'text-gray-300'
                      : item.isCurrentMonth 
                        ? 'text-[#2C3E50]' 
                        : 'text-gray-300'
                }`}>
                  {item.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Time Slot Component
const TimeSlot = ({ 
  time, 
  isSelected, 
  onSelect 
}: { 
  time: string; 
  isSelected: boolean; 
  onSelect: () => void;
}) => (
  <TouchableOpacity
    onPress={onSelect}
    className={`px-4 py-3 rounded-lg mr-2 mb-2 ${
      isSelected ? 'bg-[#2C3E50]' : 'bg-gray-100'
    }`}
  >
    <Text className={`text-[13px] font-medium ${
      isSelected ? 'text-white' : 'text-[#2C3E50]'
    }`}>
      {time}
    </Text>
  </TouchableOpacity>
);

// Success Modal
const SuccessModal = ({ 
  visible, 
  onClose 
}: { 
  visible: boolean; 
  onClose: () => void;
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 bg-black/40 justify-center items-center px-6">
      <View className="bg-white rounded-2xl p-6 w-full items-center">
        <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center mb-4">
          <Text className="text-green-500 text-[28px]">✓</Text>
        </View>
        <Text className="text-[#2C3E50] text-[20px] font-bold mb-2">Rescheduled!</Text>
        <Text className="text-gray-400 text-[14px] text-center mb-6">
          Your appointment has been successfully rescheduled.
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-[#2C3E50] rounded-full py-3 px-8"
        >
          <Text className="text-white text-[15px] font-semibold">Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function RescheduleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  
  // Find the appointment
  const appointment = allAppointments.find(apt => apt.id === id);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    appointment ? new Date(appointment.rawDate) : null
  );
  const [selectedTime, setSelectedTime] = useState(appointment?.time || '');
  const [showSuccess, setShowSuccess] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  const handleReschedule = () => {
    // In a real app, update the appointment in the backend
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.back();
  };

  if (!appointment) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-400">Appointment not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-[#2C3E50] font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Text className="text-[#2C3E50] text-[24px]">←</Text>
        </TouchableOpacity>
        <Text className="text-[#2C3E50] text-[18px] font-bold">Reschedule</Text>
        <View className="w-10" />
      </View>

      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Current Appointment Info */}
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="text-gray-400 text-[12px] mb-1">Current Appointment</Text>
          <Text className="text-[#2C3E50] text-[16px] font-semibold">{appointment.serviceName}</Text>
          <Text className="text-gray-500 text-[14px]">{appointment.fullDate} at {appointment.time}</Text>
        </View>

        {/* Select New Date */}
        <Text className="text-[#2C3E50] text-[16px] font-semibold mb-3">Select New Date</Text>
        <RescheduleCalendar 
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Select Time */}
        <Text className="text-[#2C3E50] text-[16px] font-semibold mb-3">Select Time</Text>
        <View className="flex-row flex-wrap mb-6">
          {timeSlots.map((time) => (
            <TimeSlot
              key={time}
              time={time}
              isSelected={selectedTime === time}
              onSelect={() => setSelectedTime(time)}
            />
          ))}
        </View>

        {/* Selected Summary */}
        {selectedDate && selectedTime && (
          <View className="bg-blue-50 rounded-xl p-4 mb-4">
            <Text className="text-blue-600 text-[12px] mb-1">New Appointment</Text>
            <Text className="text-[#2C3E50] text-[16px] font-semibold">
              {selectedDate.toLocaleDateString('en-GB', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </Text>
            <Text className="text-gray-500 text-[14px]">at {selectedTime}</Text>
          </View>
        )}
      </ScrollView>

      {/* Reschedule Button */}
      <View 
        className="absolute bottom-0 left-0 right-0 px-6 pt-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={handleReschedule}
          disabled={!selectedDate || !selectedTime}
          className={`rounded-full py-4 items-center ${
            selectedDate && selectedTime ? 'bg-[#2C3E50]' : 'bg-gray-300'
          }`}
        >
          <Text className="text-white text-[16px] font-semibold">Reschedule Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <SuccessModal 
        visible={showSuccess}
        onClose={handleSuccessClose}
      />
    </SafeAreaView>
  );
}

