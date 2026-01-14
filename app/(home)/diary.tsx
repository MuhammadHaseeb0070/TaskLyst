import { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DiaryAppointment, diaryAppointments } from "@/data/dummyData";
import { router } from "expo-router";
type ViewMode = "Day" | "Week" | "Month";

// Status color mapping
const getStatusColor = (status: DiaryAppointment['status']) => {
  switch (status) {
    case 'Pending':
      return { bg: '#e2f0fb', text: '#0f172a', badge: '#313d49' };
    case 'Completed':
      return { bg: '#e8eaeb', text: '#0f172a', badge: '#313d49' };
    case 'Cancelled':
      return { bg: '#e2f0fb', text: '#0f172a', badge: '#313d49' };
    case 'Confirmed':
      return { bg: '#e2f0fb', text: '#0f172a', badge: '#313d49' };
    default:
      return { bg: '#e2f0fb', text: '#0f172a', badge: '#313d49' };
  }
};

// Calculate time difference in hours
const getTimeDifferenceInHours = (startTime: string, endTime: string): number => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startInMinutes = startHour * 60 + startMin;
  const endInMinutes = endHour * 60 + endMin;
  
  return (endInMinutes - startInMinutes) / 60;
};

// Generate time markers for an appointment
const generateTimeMarkers = (startTime: string, endTime: string): string[] => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const markers: string[] = [];
  let currentHour = startHour;
  let currentMin = startMin;
  
  // Add start time
  markers.push(`${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`);
  
  // Add intermediate markers (max 1 hour gaps)
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    currentMin += 60;
    if (currentMin >= 60) {
      currentHour++;
      currentMin = 0;
    }
    
    if (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
      markers.push(`${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`);
    }
  }
  
  // Ensure end time is included
  if (markers[markers.length - 1] !== endTime) {
    markers.push(endTime);
  }
  
  return markers;
};

// Format time to 12-hour with AM/PM
const formatTime12Hour = (time24: string): string => {
  const [hour, min] = time24.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${period}`;
};

// Calculate position for each time marker based on actual time (not equal spacing)
const getTimePosition = (time: string, startTime: string, endTime: string, totalHeight: number): number => {
  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const currentMinutes = timeToMinutes(time);
  
  const totalDuration = endMinutes - startMinutes;
  const elapsed = currentMinutes - startMinutes;
  
  return (elapsed / totalDuration) * totalHeight;
};

// Timeline Appointment Card Component
const TimelineAppointmentCard = ({ appointment }: { appointment: DiaryAppointment }) => {
  const { width } = useWindowDimensions();
  const colors = getStatusColor(appointment.status);
  
  // Calculate responsive card height (minimum 120, scales with screen)
  const TOTAL_HEIGHT = Math.max(120, width * 0.32);
  const timeMarkers = generateTimeMarkers(appointment.startTime, appointment.endTime);
  
  // Card padding from lines
  const CARD_MARGIN = 10; // Space between card and lines
  const CARD_HEIGHT = TOTAL_HEIGHT - (CARD_MARGIN * 2);
  
  return (
    <View style={{ height: TOTAL_HEIGHT, marginBottom: 0, position: 'relative' }}>
      {/* Horizontal lines - positioned based on ACTUAL time intervals */}
      {timeMarkers.map((time, index) => {
        // Calculate position based on actual time difference
        const linePosition = getTimePosition(time, appointment.startTime, appointment.endTime, TOTAL_HEIGHT);
        
        return (
          <View
            key={`line-${index}`}
            className="absolute"
            style={{
              top: linePosition - 1,
              left: 60, // Start after time label
              right: 16, // End before screen edge
              height: 1,
              backgroundColor: '#d9d9d9',
              zIndex: 1,
            }}
          />
        );
      })}
      
      {/* Content Row */}
      <View className="flex-row" style={{ height: TOTAL_HEIGHT, position: 'relative', zIndex: 2 }}>
        {/* Time Labels - positioned based on ACTUAL time intervals */}
        <View style={{ width: 70 }}>
          {timeMarkers.map((time, index) => {
            const labelPosition = getTimePosition(time, appointment.startTime, appointment.endTime, TOTAL_HEIGHT);
            
            return (
              <View
                key={index}
                className="absolute"
                style={{
                  top: labelPosition - 8, // Center text with line
                  left:10
                }}
              >
                <Text className="text-[#0f172a] text-[16px] font-medium">
                  {time}
                </Text>
              </View>
            );
          })}
        </View>
        
        {/* Appointment Card with margins from top/bottom lines */}
        <View className="flex-1 pr-4">
          <View
            style={{
              marginTop: CARD_MARGIN,
              height: CARD_HEIGHT,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="rounded-2xl p-4 flex-1"
              style={{
                backgroundColor: colors.bg,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              {/* Title and Status */}
              <View className="flex-row items-start justify-between mb-2">
                <Text className="text-[18px] font-semibold flex-1 mr-2" style={{ color: colors.text }}>
                  {appointment.title}
                </Text>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: colors.badge }}
                >
                  <Text className="text-white text-[11px] font-semibold">
                    {appointment.status}
                  </Text>
                </View>
              </View>
              
              {/* Time Range */}
              <Text className="text-[15px] font-normal mb-2" style={{ color: colors.text }}>
                {formatTime12Hour(appointment.startTime)} - {formatTime12Hour(appointment.endTime)}
              </Text>
              
              {/* Client */}
              <Text className="text-[14px] font-normal" style={{ color: colors.text }}>
                Client : {appointment.clientName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Calendar Component (Simplified version)
const MiniCalendar = ({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) => {
  const [displayMonth, setDisplayMonth] = useState(selectedDate.getMonth());
  const [displayYear, setDisplayYear] = useState(selectedDate.getFullYear());
  
  // Get days in month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
  const daysInPrevMonth = new Date(displayYear, displayMonth, 0).getDate();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Calendar days with metadata
  type CalendarDay = {
    day: number;
    isCurrentMonth: boolean;
  };
  
  const days: CalendarDay[] = [];
  
  // Add previous month days (greyed out)
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }
  
  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    });
  }
  
  // Fill remaining slots with next month days (greyed out)
  const totalSlots = 42; // 6 weeks * 7 days
  const remaining = totalSlots - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
    });
  }
  
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const goToPrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };
  
  // Check if a day is the selected date
  const isSelectedDay = (day: number, isCurrentMonth: boolean) => {
    return (
      isCurrentMonth &&
      day === selectedDate.getDate() &&
      displayMonth === selectedDate.getMonth() &&
      displayYear === selectedDate.getFullYear()
    );
  };
  
  return (
    <View className="mx-4 rounded-2xl p-4 mb-4">
      {/* Date Header - Shows selected date */}
      <View className="flex-row items-center justify-between mb-4 py-3 px-4 bg-[#f7f7f7] rounded-xl">
        <TouchableOpacity onPress={goToPrevMonth} className="p-2">
          <Text className="text-[20px] text-[#2C3E50] font-medium">{"<"}</Text>
        </TouchableOpacity>
        <Text className="text-[16px] font-bold text-[#2C3E50]">
          {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}, {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} className="p-2">
          <Text className="text-[20px] text-[#2C3E50] font-medium">{">"}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Week Days */}
      <View className="flex-row mb-2">
        {weekDays.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-[11px] font-medium text-[#9CA3AF]">{day}</Text>
          </View>
        ))}
      </View>
      
      {/* Calendar Grid */}
      <View className="flex-row flex-wrap">
        {days.map((item, index) => {
          const isSelected = isSelectedDay(item.day, item.isCurrentMonth);
          const isDisabled = !item.isCurrentMonth;
          
          return (
            <View key={index} className="w-[14.28%] items-center py-2">
              {isDisabled ? (
                // Disabled day (previous/next month) - greyed out, not clickable
                <View className="w-10 h-10 rounded-full items-center justify-center">
                  <Text className="text-[14px] font-medium text-[#D1D5DB]">
                    {item.day}
                  </Text>
                </View>
              ) : (
                // Current month day - clickable
                <TouchableOpacity
                  onPress={() => onDateSelect(new Date(displayYear, displayMonth, item.day))}
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    isSelected ? 'bg-[#2C3E50]' : ''
                  }`}
                >
                  <Text className={`text-[14px] font-medium ${
                    isSelected ? 'text-white' : 'text-[#1F2937]'
                  }`}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Gap Component - Shows time gap between appointments
const TimelineGap = ({ gapHours }: { gapHours: number }) => {
  const GAP_HEIGHT_PER_HOUR = 80; // 40px per hour gap
  const gapHeight = Math.max(20, gapHours * GAP_HEIGHT_PER_HOUR);
  
  return (
    <View style={{ height: 70 }} />
  );
};

// Header Component (same as message/settings screen)
const Header = () => {
  return (
    <View className="bg-[#313d49] px-2 py-8">
      {/* Title Row */}
      <View className="bg-[#313d49] px-4">
        {/* Title Row */}

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between w-full">
            <View className="flex-col items-startr justify-center">
              <Text className="text-white text-[30px] font-bold ">
                Diary / Calender
              </Text>
              <Text className="text-[#eeeeee] text-[14px]  align-bottom">
                Review and respond to customer{"\n"} quote requests.
              </Text>
            </View>
            <View className=" flex-row  justify-between align-center">
              <TouchableOpacity
                className="w-12 h-12 rounded-full bg-white items-center justify-center"
                activeOpacity={0.7}
                   onPress={() => router.push("/notifications")}
              >
                <Image
                  source={require("@/assets/images/icon_notification_bell.png")}
                  className="w-7 h-7"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notification Bell */}
        </View>
      </View>
    </View>
  );
};


// Main Diary Screen
export default function DiaryScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("Day");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 20)); // Nov 20, 2025
  
  // Filter appointments for selected date
  const filteredAppointments = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return diaryAppointments
      .filter(apt => apt.date === dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [selectedDate]);
  
  // Calculate gaps between appointments
  const appointmentsWithGaps = useMemo(() => {
    const result: { type: 'appointment' | 'gap'; data: any; gapHours?: number }[] = [];
    
    filteredAppointments.forEach((apt, index) => {
      // Check for gap before this appointment
      if (index > 0) {
        const prevApt = filteredAppointments[index - 1];
        const gapHours = getTimeDifferenceInHours(prevApt.endTime, apt.startTime);
        
        if (gapHours > 0.1) { // Only show if gap is significant (> 6 minutes)
          result.push({
            type: 'gap',
            data: null,
            gapHours,
          });
        }
      }
      
      result.push({
        type: 'appointment',
        data: apt,
      });
    });
    
    return result;
  }, [filteredAppointments]);
  
  return (
    <SafeAreaView className="flex-1 bg-[#313d49]" edges={["top"]}>
      {/* Header */}
      <Header />
      
      {/* Content Area with light background */}
      <View className="flex-1 bg-[#F9FAFB]">
        {/* View Mode Tabs - Matching Quotes Screen Style */}
        <View className="mx-6 mt-5 mb-4">
          <View className="flex-row bg-[#f8f8f8] rounded-full p-1.5">
            {(['Day', 'Week', 'Month'] as ViewMode[]).map((mode) => {
              const isActive = viewMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setViewMode(mode)}
                  className={`flex-1 py-3 rounded-full items-center justify-center ${
                    isActive ? 'bg-[#1E293B]' : ''
                  }`}
                >
                  <Text className={`text-[14px] font-semibold ${
                    isActive ? 'text-white' : 'text-[#64748B]'
                  }`}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <MiniCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        
        {/* Timeline Section */}
        <View className="px-3 pb-6">
       
          
          {filteredAppointments.length > 0 ? (
            appointmentsWithGaps.map((item, index) => {
              if (item.type === 'gap') {
                return (
                  <TimelineGap
                    key={`gap-${index}`}
                    gapHours={item.gapHours || 0}
                  />
                );
              } else {
                return (
                  <TimelineAppointmentCard
                    key={item.data.id}
                    appointment={item.data}
                  />
                );
              }
            })
          ) : (
            <View className="bg-white rounded-2xl p-8 items-center" style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}>
              <Text className="text-[#9CA3AF] text-[16px] font-medium">
                No appointments scheduled
              </Text>
              <Text className="text-[#D1D5DB] text-[13px] mt-2">
                Select a different date to view appointments
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
