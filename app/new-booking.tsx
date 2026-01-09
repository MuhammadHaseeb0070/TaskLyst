import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { services } from "@/data/dummyData";

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

// Dropdown Component
const Dropdown = ({
  label,
  value,
  placeholder,
  options,
  onSelect,
  required = false,
  className,
  style,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  required?: boolean;
  className?: string;
  style?: object;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between ${className || "border border-gray-200 rounded-xl px-4"}`}
        style={[style, { height: 52 }]}
      >
        <Text
          className={
            value ? "text-[#2C3E50] text-[15px]" : "text-gray-400 text-[15px]"
          }
        >
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
                  <Text className="text-[#2C3E50] text-[14px]">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

// Calendar Component
const BookingCalendar = ({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


  const softShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  };
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] =
      [];

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
    const remaining = 35 - calendarDays.length;
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
    <View 
    className=" flex-1items-center bg-white border border-gray-200 rounded-xl p-4 mb-4"
    style={softShadow}>
      {/* Month Navigation */}
      <View className="flex-row items-center justify-between mb-6 px-2">
        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
              )
            )
          }
          className="w-12 h-12 items-center justify-center bg-gray-50 rounded-full"
        >
          <Text className="text-[#2C3E50] text-[28px] leading-none">‹</Text>
        </TouchableOpacity>

        <Text className="text-[#2C3E50] text-[18px] font-bold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
              )
            )
          }
          className="w-12 h-12 items-center justify-center bg-gray-50 rounded-full"
        >
          <Text className="text-[#2C3E50] text-[28px] leading-none">›</Text>
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
          const isSelected =
            selectedDate &&
            item.date.getDate() === selectedDate.getDate() &&
            item.date.getMonth() === selectedDate.getMonth() &&
            item.date.getFullYear() === selectedDate.getFullYear();
          const isPast = item.date < today && item.isCurrentMonth;

          return (
            <TouchableOpacity
            key={index}
            onPress={() => !isPast && item.isCurrentMonth && onSelectDate(item.date)}
            disabled={isPast || !item.isCurrentMonth}
            // Remove rounded-full from the TouchableOpacity as it's just a hit-box
            className="w-[14.28%] aspect-square items-center justify-center"
          >
            <View
              // 1. Added overflow-hidden to force the background to stay inside the radius
              // 2. Added bg-transparent for unselected to keep layout consistent
              className={`w-8 h-8 rounded-full items-center justify-center overflow-hidden ${
                isSelected ? "bg-[#2C3E50]" : "bg-transparent"
              }`}
              // 3. Optional: Some Android versions need an explicit borderRadius in style
              style={isSelected ? { borderRadius: 16 } : null}
            >
              <Text
                className={`text-[13px] ${
                  isSelected
                    ? "text-white font-semibold"
                    : isPast
                    ? "text-gray-300"
                    : item.isCurrentMonth
                    ? "text-[#2C3E50]"
                    : "text-gray-300"
                }`}
              >
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

export default function NewBookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingTime, setBookingTime] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const serviceOptions = services.map((s) => ({
    label: s.name,
    value: s.name,
  }));

  const softShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  };

  const durationOptions = [
    { label: "15 Minutes", value: "15" },
    { label: "30 Minutes", value: "30" },
    { label: "39 Minutes", value: "39" },
    { label: "45 Minutes", value: "45" },
    { label: "60 Minutes", value: "60" },
    { label: "90 Minutes", value: "90" },
    { label: "120 Minutes", value: "120" },
  ];

  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Confirmed", value: "Confirmed" },
  ];

  const handleNext = () => {
    // Navigate to step 2 with booking data
    router.push({
      pathname: "/new-booking-customer",
      params: {
        service,
        date: selectedDate?.toISOString() || "",
        time: bookingTime,
        duration,
        price,
        status,
        notes,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <Text className="text-[#2C3E50] text-[24px]">←</Text>
        </TouchableOpacity>
        <Text className="text-[#2C3E50] text-[18px] font-bold">Booking</Text>
        <View className="w-10" />
      </View>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={1} />

      <ScrollView
        className="flex-1 px-6 mb-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title */}
        <Text className="text-[#2C3E50] text-[22px] font-bold mb-1">
          Service Details
        </Text>
        <Text className="text-gray-400 text-[14px] mb-6">
          Enter Service Details
        </Text>

        {/* Service Dropdown */}
        <Dropdown
          className="bg-white border border-slate-100 rounded-xl px-4"
          style={softShadow}
          label="Service"
          value={service}
          placeholder="Select a service"
          options={serviceOptions}
          onSelect={setService}
          required
        />

        {/* Calendar */}
        <BookingCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Booking Time */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">
            Booking Time <Text className="text-red-500">*</Text>
          </Text>
          <View 
            className="flex-row items-center bg-white border border-slate-100 rounded-xl px-4"
            style={{...softShadow, height: 52}}
          >
            <TextInput
              value={bookingTime}
              onChangeText={setBookingTime}
              placeholder="Set Time"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-[15px] text-[#2C3E50]"
            />
            <Text className="text-gray-400 text-[15px]">⏱</Text>
          </View>
        </View>

        {/* Duration */}
        <Dropdown
          className="bg-white border border-slate-100 rounded-xl px-4"
          style={softShadow}
          label="Duration (Minutes)"
          value={duration ? `${duration} Minutes` : ""}
          placeholder="Select duration"
          options={durationOptions}
          onSelect={setDuration}
          required
        />

        {/* Price */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">
            Price <Text className="text-red-500">*</Text>
          </Text>
          <View 
            className="flex-row items-center bg-white border border-slate-100 rounded-xl px-4"
            style={{...softShadow, height: 52}}
          >
            <Text className="text-gray-400 mr-2 text-[15px]">$</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="flex-1 text-[15px] text-[#2C3E50]"
            />
          </View>
        </View>

        {/* Status */}
        <Dropdown
          className="bg-white border border-slate-100 rounded-xl px-4"
          style={softShadow}
          label="Status"
          value={status}
          placeholder="Select Status"
          options={statusOptions}
          onSelect={setStatus}
        />

        {/* Additional Notes */}
        <View className="mb-4">
          <Text className="text-[#2C3E50] text-[14px] font-medium mb-2">
            Additional Notes
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Any specific requirements or instructions"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={1}
            className="bg-white border border-slate-100 rounded-xl px-4 text-[15px] text-[#2C3E50]"
            style={{...softShadow, height: 52}}
            textAlignVertical="top"
          />
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
    </SafeAreaView>
  );
}
