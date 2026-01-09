import { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  currentUser,
  allJobs,
  upcomingAppointments,
  calendarEvents,
  JobStatus,
  DateFilter,
} from "@/data/dummyData";

// Header Component
const Header = () => (
  <View className="bg-[#2C3E50] px-6 pt-8 pb-8">
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Image
          source={currentUser.avatar}
          className="w-14 h-14 rounded-full mr-4"
          style={{ backgroundColor: "#ddd" }}
        />
        <View>
          <Text className="text-white/60 text-[14px]">Welcome Back</Text>
          <Text className="text-white text-[20px] font-bold">
            {currentUser.firstName} {currentUser.lastName}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="w-12 h-12 rounded-full bg-white items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          source={require("@/assets/images/icon-notification.png")}
          className="w-5 h-5"
          style={{ tintColor: "#2C3E50" }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

// Location Selector
const LocationSelector = () => (
  <TouchableOpacity className="flex-row items-center justify-between px-6 py-4 mt-4">
    <View className="flex-row items-center flex-1">
      <Image
        source={require("@/assets/images/icon-location.png")}
        className="w-5 h-5 mr-3"
        style={{ tintColor: "#6B7280" }}
        resizeMode="contain"
      />
      <Text className="text-[#2C3E50] text-[15px] font-medium">
        {currentUser.location}
      </Text>
    </View>
    <Text className="text-gray-400 text-[14px]">▼</Text>
  </TouchableOpacity>
);

// Search Bar Component
const SearchBar = ({ onFilterPress }: { onFilterPress: () => void }) => (
  <View className="px-6 mb-4 mt-0">
    <View className="flex-row items-center">
      {/* Search Input - separate rounded box */}
      <View className="flex-1 flex-row items-center bg-white rounded-full px-4 py-2 mr-3">
        <Image
          source={require("@/assets/images/icon-search.png")}
          className="w-5 h-5 mr-3"
          style={{ tintColor: "#9CA3AF" }}
          resizeMode="contain"
        />
        <TextInput
          placeholder='Search for "Indoor Cleaning"'
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-[16px] text-gray-700"
        />
      </View>

      {/* Filter Button - separate rounded box */}
      <TouchableOpacity
        onPress={onFilterPress}
        className="bg-white rounded-full p-5  items-center justify-center"
      >
        <Image
          source={require("@/assets/images/icon-filter.png")}
          className="w-5 h-5 "
          style={{}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

// Radio Button Component
const RadioButton = ({
  selected,
  label,
  onPress,
}: {
  selected: boolean;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center py-2">
    <View
      className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
        selected ? "border-[#2C3E50]" : "border-gray-300"
      }`}
    >
      {selected && <View className="w-2.5 h-2.5 rounded-full bg-[#2C3E50]" />}
    </View>
    <Text
      className={`text-[15px] ${
        selected ? "text-[#2C3E50] font-medium" : "text-gray-600"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// Filter Modal Component
const FilterModal = ({
  visible,
  onClose,
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
  onApply,
}: {
  visible: boolean;
  onClose: () => void;
  dateFilter: DateFilter | null;
  setDateFilter: (filter: DateFilter | null) => void;
  statusFilter: JobStatus | null;
  setStatusFilter: (filter: JobStatus | null) => void;
  onApply: () => void;
}) => {
  const dateOptions: DateFilter[] = ["Today", "Upcoming", "Past"];
  const statusOptions: JobStatus[] = [
    "Confirmed",
    "Pending",
    "Completed",
    "Cancelled",
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />

        {/* Filter Bottom Sheet */}
        <View className="bg-white rounded-t-3xl px-6 pt-4 pb-8">
          {/* Handle Bar */}
          <View className="items-center mb-4">
            <View className="w-12 h-1 rounded-full bg-gray-300" />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="w-8" />
            <Text className="text-[#2C3E50] text-[18px] font-bold">Filter</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <View
                className="w-8 h-8 bg-[#E8F4FD] rounded-full items-center justify-center overflow-hidden"
                style={{ borderRadius: 16 }}
              >
                <Text className="text-[#2C3E50] text-[14px] font-bold leading-none">
                  ✕
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Dates Section */}
          <View className="mb-6">
            <Text className="text-[#2C3E50] text-[16px] font-semibold mb-3">
              Dates
            </Text>
            {dateOptions.map((option) => (
              <RadioButton
                key={option}
                label={option}
                selected={dateFilter === option}
                onPress={() =>
                  setDateFilter(dateFilter === option ? null : option)
                }
              />
            ))}
          </View>

          {/* Status Section */}
          <View className="mb-8">
            <Text className="text-[#2C3E50] text-[16px] font-semibold mb-3">
              Status
            </Text>
            {statusOptions.map((option) => (
              <RadioButton
                key={option}
                label={option}
                selected={statusFilter === option}
                onPress={() =>
                  setStatusFilter(statusFilter === option ? null : option)
                }
              />
            ))}
          </View>

          {/* Filter Button */}
          <TouchableOpacity
            onPress={onApply}
            className="bg-[#2C3E50] rounded-full py-4 items-center"
            style={{
              shadowColor: "#2C3E50",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text className="text-white text-[16px] font-semibold">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Section Header
const SectionHeader = ({
  title,
  onViewAll,
}: {
  title: string;
  onViewAll?: () => void;
}) => (
  <View className="flex-row items-center justify-between px-6 mb-4">
    <Text className="text-[#2C3E50] text-[20px] font-bold">{title}</Text>
    {onViewAll && (
      <TouchableOpacity onPress={onViewAll}>
        <Text className="text-[#2C3E50] text-[14px] font-medium">View All</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Status badge colors
const getStatusStyle = (status: JobStatus) => {
  switch (status) {
    case "Pending":
      return { bg: "bg-[#2C3E50]", text: "text-white" };
    case "Confirmed":
      return { bg: "bg-[#10B981]", text: "text-white" };
    case "Completed":
      return { bg: "bg-[#3B82F6]", text: "text-white" };
    case "Cancelled":
      return { bg: "bg-[#EF4444]", text: "text-white" };
    default:
      return { bg: "bg-[#2C3E50]", text: "text-white" };
  }
};

// Pending Job Card
const PendingJobCard = ({ job, isLast }: { job: (typeof allJobs)[0]; isLast?: boolean }) => {
  const statusStyle = getStatusStyle(job.status);

  return (
    <View
      className={`bg-white rounded-2xl p-4 shadow-sm ${isLast ? 'mr-6' : 'mr-4'}`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        width: 320,
      }}
    >
      {/* Header with Image and Info */}
      <View className="flex-row mb-4">
        {/* Job Image - Square with rounded corners */}
        <Image
          source={job.jobImage}
          className="w-[70px] h-[70px] mr-3"
          resizeMode="cover"
        />

        {/* Job Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[#2d3036] text-[15px] font-semibold">
              {job.date} • {job.time}
            </Text>
            <View className={`${statusStyle.bg} px-2 py-1 rounded-full`}>
              <Text className={`${statusStyle.text} text-[13px] font-medium`}>
                {job.status}
              </Text>
            </View>
          </View>
          <Text className="text-[#2C3E50] text-[20px] font-bold mb-1">
            {job.clientName}
          </Text>
          <Text className="text-[#616874] text-[16px]">{job.clientEmail}</Text>
        </View>
      </View>

      {/* Pending Quotes Section */}
      <View className="bg-gray-200 rounded-xl px-4 py-3 mb-3">
        <View className="flex-row items-center mb-1">
          <Image
            source={require("@/assets/images/icon-pending-quote.png")}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
          />
          <Text className="text-[#2C3E50] text-[17px] font-semibold">
            {job.pendingQuotes.title}
          </Text>
        </View>
        <Text className="text-gray-500 text-[15px] ml-1">
          {job.pendingQuotes.description}
        </Text>
      </View>

      {/* Pending Jobs Section */}
      <View className="bg-[#E8F4FD] rounded-xl px-4 py-3">
        <View className="flex-row items-center mb-1">
          <Image
            source={require("@/assets/images/icon-pending-job.png")}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
          />
          <Text className="text-[#2C3E50] text-[17px] font-semibold">
            {job.pendingJobs.title}
          </Text>
        </View>
        <Text className="text-gray-500 text-[15px] ml-1">
          {job.pendingJobs.description}
        </Text>
      </View>
    </View>
  );
};

// Calendar Component
const Calendar = () => {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Day");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today); // The date user selected
  const [viewingMonth, setViewingMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  ); // Month being viewed

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

  const getDaysInMonth = (viewDate: Date) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays: {
      day: number;
      isCurrentMonth: boolean;
      isSelected: boolean;
      hasEvent: boolean;
    }[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
        hasEvent: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const hasEvent = calendarEvents.some(
        (e) => e.date === i && e.month === month + 1 && e.year === year
      );
      // Check if this day is the selected date (same day, month, and year)
      const isSelected =
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isSelected,
        hasEvent,
      });
    }

    // Next month days
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
        isSelected: false,
        hasEvent: false,
      });
    }

    return calendarDays;
  };

  const calendarDays = getDaysInMonth(viewingMonth);

  const goToPrevMonth = () => {
    setViewingMonth(
      new Date(viewingMonth.getFullYear(), viewingMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setViewingMonth(
      new Date(viewingMonth.getFullYear(), viewingMonth.getMonth() + 1, 1)
    );
  };

  const selectDay = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDate(
        new Date(viewingMonth.getFullYear(), viewingMonth.getMonth(), day)
      );
    }
  };

  return (
    <View className="mx-6 mb-6">
      {/* View Mode Toggle */}
      <View className="flex-row bg-gray-200 rounded-full mb-4">
        {(["Day", "Week", "Month"] as const).map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => setViewMode(mode)}
            className={`flex-1 py-3 rounded-full ${
              viewMode === mode ? "bg-[#2C3E50]" : ""
            }`}
          >
            <Text
              className={`text-center text-[14px] ${
                viewMode === mode ? "text-white font-semibold" : "text-gray-500"
              }`}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Month Navigation */}
      <View className="flex-row items-center justify-between mb-4 bg-gray-200 rounded-xl p-2">
        <TouchableOpacity onPress={goToPrevMonth} className="p-2">
          <Text className="text-[#2C3E50] text-[28px] font-light leading-none">
            ‹
          </Text>
        </TouchableOpacity>
        <Text className="text-[#2C3E50] text-[16px] font-semibold">
          {selectedDate.getDate()} {months[viewingMonth.getMonth()]},{" "}
          {viewingMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} className="p-2">
          <Text className="text-[#2C3E50] text-[28px] font-light leading-none">
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Days Header */}
      <View className="flex-row mb-2">
        {days.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-gray-400 text-[11px]">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="flex-row flex-wrap">
        {calendarDays.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectDay(item.day, item.isCurrentMonth)}
            style={{
              width: "14.28%",
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.isSelected ? "#2C3E50" : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: item.isSelected ? "600" : "400",
                  color: item.isSelected
                    ? "#FFFFFF"
                    : item.isCurrentMonth
                    ? "#2C3E50"
                    : "#D1D5DB",
                }}
              >
                {item.day}
              </Text>
            </View>
            {item.hasEvent && !item.isSelected && (
              <View className="w-1 h-1 rounded-full bg-[#4ECDC4] mt-0.5" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Appointment Card
const AppointmentCard = ({
  appointment,
  onPress,
}: {
  appointment: (typeof upcomingAppointments)[0];
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="mx-6 bg-white rounded-2xl p-4 mb-3 border border-gray-100"
  >
    <View className="flex-row items-center">
      {/* Profile Image */}
      <Image
        source={appointment.clientAvatar}
        className="w-10 h-10 rounded-full mr-3"
        style={{ backgroundColor: "#ddd" }}
      />

      {/* Middle Content */}
      <View className="flex-1">
        <Text className="text-[#2C3E50] text-[16px] font-bold">
          {appointment.title}
        </Text>
        <Text className="text-[#68696b] text-[13px]">
          {appointment.subtitle}
        </Text>
      </View>

      {/* Video Call Button */}
      {appointment.hasVideoCall && (
        <View className="w-11 h-11 rounded-full bg-[#add0eb] items-center justify-center">
          <Image
            source={require("@/assets/images/icon-video.png")}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      )}
    </View>

    {/* Separator Line */}
    <View className="h-[1px] bg-gray-200 mt-3 mb-3" />

    {/* Date and Duration Row */}
    <View className="flex-row items-center justify-between ">
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/images/tab-diary.png")}
          className="w-5 h-5 mr-2"
          style={{ tintColor: "#6B7280" }}
          resizeMode="contain"
        />
        <Text className="text-[#313d49] text-[14px]">{"Today, Dec 8"}</Text>
      </View>

      <View className="flex-row items-center">
        <Image
          source={require("@/assets/images/icon-clock.png")}
          className="w-4 h-4 mr-2"
          style={{ tintColor: "#6B7280" }}
          resizeMode="contain"
        />
        <Text className="text-gray-500 text-[13px]">
          {appointment.duration}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Main Dashboard Screen
export default function DashboardScreen() {
  const router = useRouter();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter | null>("Upcoming");
  const [statusFilter, setStatusFilter] = useState<JobStatus | null>(null);

  // Filter jobs based on selected filters
  const filteredJobs = useMemo(() => {
    let jobs = [...allJobs];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Apply date filter
    if (dateFilter) {
      jobs = jobs.filter((job) => {
        const jobDate = new Date(job.rawDate);
        jobDate.setHours(0, 0, 0, 0);

        switch (dateFilter) {
          case "Today":
            return jobDate.getTime() === today.getTime();
          case "Upcoming":
            return jobDate.getTime() >= today.getTime();
          case "Past":
            return jobDate.getTime() < today.getTime();
          default:
            return true;
        }
      });
    }

    // Apply status filter
    if (statusFilter) {
      jobs = jobs.filter((job) => job.status === statusFilter);
    }

    return jobs;
  }, [dateFilter, statusFilter]);

  const handleApplyFilter = () => {
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-150" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header />

        {/* Location */}
        <LocationSelector />

        {/* Search */}
        <SearchBar onFilterPress={() => setFilterModalVisible(true)} />

        {/* Pending Jobs */}
        <SectionHeader
          title="Pending Jobs"
          onViewAll={() => router.push("/appointments")}
        />
        {filteredJobs.length > 0 ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingBottom: 8 }}
            className="mb-4"
          >
            {filteredJobs.slice(0, 5).map((job, index) => (
              <PendingJobCard 
                key={job.id} 
                job={job} 
                isLast={index === Math.min(filteredJobs.length, 5) - 1}
              />
            ))}
          </ScrollView>
        ) : (
          <View className="mx-6 bg-white rounded-2xl p-6 mb-4 items-center">
            <Text className="text-gray-400 text-[15px]">
              No jobs found matching your filters
            </Text>
          </View>
        )}

        {/* Calendar */}
        <Calendar />

        {/* Upcoming Appointments */}
        <SectionHeader
          title="Upcoming Appointments"
          onViewAll={() => router.push("/appointments")}
        />
        {upcomingAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onPress={() => router.push(`/booking-details?id=${appointment.id}`)}
          />
        ))}

        {/* Bottom Spacing for Tab Bar */}
        <View className="h-6" />
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onApply={handleApplyFilter}
      />
    </SafeAreaView>
  );
}
