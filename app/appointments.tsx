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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  allAppointments,
  AppointmentStatus,
  DateFilter,
} from "@/data/dummyData";

// Header Component
const Header = ({ onBack }: { onBack: () => void }) => (
  <View className="flex-row items-center justify-between px-6 py-4">
    <TouchableOpacity
      onPress={onBack}
      className="w-10 h-10 items-center justify-center"
    >
      <Text className="text-[#2C3E50] text-[24px]">←</Text>
    </TouchableOpacity>
    <Text className="text-[#2C3E50] text-[18px] font-bold">Appointments</Text>
    <View className="w-10" />
  </View>
);

// Search Bar Component
const SearchBar = ({ onFilterPress }: { onFilterPress: () => void }) => (
  <View className="px-6 mb-4 mt-4">
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

// View Toggle Component
const ViewToggle = ({
  activeView,
  onViewChange,
}: {
  activeView: "list" | "calendar";
  onViewChange: (view: "list" | "calendar") => void;
}) => (
  <View className="flex-row mx-6 mb-6 bg-gray-100 rounded-full">
    <TouchableOpacity
      onPress={() => onViewChange("list")}
      className={`flex-1 py-3 rounded-full ${
        activeView === "list" ? "bg-[#2C3E50]" : ""
      }`}
    >
      <Text
        className={`text-center text-[14px] font-medium ${
          activeView === "list" ? "text-white" : "text-gray-500"
        }`}
      >
        List view
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onViewChange("calendar")}
      className={`flex-1 py-3 rounded-full ${
        activeView === "calendar" ? "bg-[#2C3E50]" : ""
      }`}
    >
      <Text
        className={`text-center text-[14px] font-medium ${
          activeView === "calendar" ? "text-white" : "text-gray-500"
        }`}
      >
        Calendar view
      </Text>
    </TouchableOpacity>
  </View>
);

// Section Header Component (for List View)
const SectionHeader = ({
  title,
  isExpanded,
  onToggle,
  dotColor = "#10B981",
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  dotColor?: string;
}) => (
  <TouchableOpacity
    onPress={onToggle}
    className="flex-row items-center justify-between px-6 mb-4"
  >
    {/* Left title */}
    <View className="flex-row items-center">
      <View
        className="w-2 h-2 rounded-full mr-2"
        style={{
          backgroundColor: `${title === "Upcoming" ? "#add0eb" : "#10B981"}`,
        }}
      />
      <Text className="text-[#2C3E50] text-[16px] font-semibold">{title}</Text>
    </View>

    {/* Right side */}
    <View className="flex-row items-center ml-3" style={{ flex: 1 }}>
      {/* Dashed line */}
      <View
        style={{
          flex: 1,
          height: 1,
          borderTopWidth: 1,
          borderTopColor: "#999",
          borderStyle: "dashed",
        }}
      />

      {/* Arrow */}
      <View className="ml-3 w-8 h-8 items-center justify-center rounded-full border border-gray-300 bg-white">
        <Text
          className="text-[16px] font-bold text-[#313d49]"
          style={{ marginBottom: isExpanded ? -4 : 2 }}
        >
          {isExpanded ? "⌃" : "⌄"}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
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

// Action Menu Component
const ActionMenu = ({
  visible,
  onClose,
  onReschedule,
  onMarkComplete,
  onCancel,
}: {
  visible: boolean;
  onClose: () => void;
  onReschedule: () => void;
  onMarkComplete: () => void;
  onCancel: () => void;
}) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 bg-black/20 justify-center items-center"
        onPress={onClose}
      >
        <View
          className="bg-white rounded-2xl py-2 mx-6 min-w-[200px]"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Reschedule */}
          <TouchableOpacity
            onPress={onReschedule}
            className="flex-row items-center px-4 py-3 bg-[#2C3E50] mx-2 rounded-full mb-1"
          >
            <Image
              source={require("@/assets/images/icon-reschedule.png")}
              className="w-5 h-5 mr-3"
              resizeMode="contain"
            />
            <Text className="text-white text-[15px] font-medium">
              Reschedule
            </Text>
          </TouchableOpacity>

          {/* Mark Complete */}
          <TouchableOpacity
            onPress={onMarkComplete}
            className="flex-row items-center px-4 py-3 mx-2 rounded-full"
          >
            <Image
              source={require("@/assets/images/icon-mark-complete.png")}
              className="w-5 h-5 mr-3"
              resizeMode="contain"
            />
            <Text className="text-[#2C3E50] text-[15px]">Mark Complete</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity
            onPress={onCancel}
            className="flex-row items-center px-4 py-3 mx-2 rounded-full"
          >
            <Image
              source={require("@/assets/images/icon-cancel.png")}
              className="w-5 h-5 mr-3"
              resizeMode="contain"
            />
            <Text className="text-[#2C3E50] text-[15px]">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

// Appointment Card Component (for List View)
const AppointmentCard = ({
  appointment,
  onPress,
  onMenuPress,
}: {
  appointment: (typeof allAppointments)[0];
  onPress: () => void;
  onMenuPress: () => void;
}) => {
  const getStatusStyle = (status: AppointmentStatus) => {
    switch (status) {
      case "Pending":
        return { bg: "#FEF3C7", text: "#D97706" };
      case "Confirmed":
        return { bg: "#DBEAFE", text: "#2563EB" };
      case "Completed":
        return { bg: "#D1FAE5", text: "#059669" };
      case "Cancelled":
        return { bg: "#FEE2E2", text: "#DC2626" };
      default:
        return { bg: "#E5E7EB", text: "#6B7280" };
    }
  };

  const statusStyle = getStatusStyle(appointment.status);

  return (
    <View className="flex-row mb-6">
      {/* Date Column with Timeline */}
      <View className="items-center mt-5">

        <Text className="text-[#313d49] text-[14px] font-semibold align-start w-full px-3">
          {appointment.month}
        </Text>

        {/* Date Circle with Horizontal Connector */}
        <View className="flex-row items-center mt-1 px-2">
          <View
            className={`w-8 h-8 rounded-full ${
              appointment.status === "Completed"
                ? "bg-[#00a63e]"
                : "bg-[#add0eb]"
            } items-center justify-center z-10`}
          >
            <Text
              className={` ${
                appointment.status === "Completed"
                  ? "text-[#ffffff]"
                  : "text-[#2C3E50]"
              } text-[15px] font-bold`}
            >
              {appointment.day}
            </Text>
          </View>

          {/* Horizontal Line - connects circle to card */}
          <View
            className={`h-[2px] ${
              appointment.status === "Completed"
                ? "bg-[#00a63e]"
                : "bg-[#add0eb]"
            }`}
            style={{ width: 10, marginLeft: 4, marginRight: 4 }}
          />
        </View>

        {/* Vertical Line */}
        <View className="flex-1">
          <View
            className={`w-0.5 mt-2 ${
              appointment.status === "Completed"
                ? "bg-[#00a63e]"
                : "bg-[#add0eb]"
            } min-h-[180px] h-[90%]` }
            style={{ marginLeft: -8 }}
          />
        </View>
      </View>

      {/* Card Content - Clickable */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="flex-1 bg-white rounded-2xl p-4 mr-4 my-5"
        style={{
          marginLeft: -4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {/* Top Section */}
        <View className="flex-row mb-4">
          <Image
            source={appointment.serviceImage}
            className="w-16 h-16 rounded-full mr-3"
            resizeMode="cover"
          />
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <View
                className={` rounded-full text-[11px] font-semibold ${
                  appointment.status !== "Completed"
                    ? "text-[#ffffff] bg-[#2C3E50]"
                    : ""
                }`}
                style={{ backgroundColor: statusStyle.bg }}
              >
                <Text
                  className={`text-[11px] px-3 py-1  rounded-full font-semibold ${
                    appointment.status !== "Completed"
                      ? "text-[#ffffff] bg-[#2C3E50]"
                      : ""
                  }`}
                >
                  {appointment.status}
                </Text>
              </View>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  onMenuPress();
                }}
                className="p-2"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-gray-400 text-[18px]">⋮</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[#2C3E50] text-[16px] font-bold mt-1">
              {appointment.serviceName}
            </Text>
            <Text className="text-[#2C3E50] text-[15px] font-semibold">
              £{appointment.price.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Client Info */}
        <Text className="text-[#2C3E50] text-[15px] font-semibold mb-3">
          {appointment.clientName}
        </Text>

        {/* Contact Details */}
        <View className="w-full">
          <View className="flex-row items-center mb-2">
            <View className=" items-center justify-center mr-2 bg-[#e8eaeb] rounded-full p-2">
              <Image
                source={require("@/assets/images/icon-mail-appointment.png")}
                className="w-4 h-4 "
                resizeMode="contain"
              />
              
            </View>
            <Text className="text-gray-500 text-[13px]">
              {appointment.clientEmail}{"dasdjhkajksdhajksh"}
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <View className=" items-center justify-center mr-2 bg-[#e2f0fb] rounded-full p-2">
            <Image
              source={require("@/assets/images/icon-location-appointment.png")}
              className="w-4 h-4 "
              resizeMode="contain"
            />
            </View>
            <Text className="text-gray-500 text-[13px]">
              {appointment.location}
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <View className=" items-center justify-center mr-2 bg-[#f0fdf4] rounded-full p-2">
            <Image
              source={require("@/assets/images/icon-phone-appointment.png")}
              className="w-4 h-4 "
              resizeMode="contain"
            />
            </View>
            <Text className="text-gray-500 text-[13px]">
              {appointment.clientPhone}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className=" items-center justify-center mr-2 bg-[#fbf8ef] rounded-full p-2">
            <Image
              source={require("@/assets/images/icon-clock-appointment.png")}
              className="w-4 h-4 "
              resizeMode="contain"
            />
            </View>
            <Text className="text-gray-500 text-[13px]">
              {appointment.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Calendar View Component
const CalendarView = ({
  appointments,
  onAppointmentPress,
}: {
  appointments: typeof allAppointments;
  onAppointmentPress: (id: string) => void;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays: {
      day: number;
      isCurrentMonth: boolean;
      appointments: typeof allAppointments;
    }[] = [];

    // Previous month days (empty placeholders)
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({
        day: 0,
        isCurrentMonth: false,
        appointments: [],
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayAppointments = appointments.filter((apt) => {
        const aptDate = new Date(apt.rawDate);
        return (
          aptDate.getDate() === i &&
          aptDate.getMonth() === month &&
          aptDate.getFullYear() === year
        );
      });

      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        appointments: dayAppointments,
      });
    }

    return calendarDays;
  };

  const calendarDays = getDaysInMonth(currentDate);

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getStatusBgColor = (status: AppointmentStatus) => {
    switch (status) {
      case "Pending":
        return { bg: "#fbf8ef", badgeBg: "#F59E0B", text: "#92400E" }; // Warm cream/yellow
      case "Confirmed":
        return { bg: "#e2f0fb", badgeBg: "#3B82F6", text: "#1E40AF" }; // Light blue
      case "Completed":
        return { bg: "#f0fdf4", badgeBg: "#10B981", text: "#065F46" }; // Light green
      case "Cancelled":
        return { bg: "#FEE2E2", badgeBg: "#EF4444", text: "#991B1B" }; // Light red
      default:
        return { bg: "#e8eaeb", badgeBg: "#6B7280", text: "#374151" };
    }
  };

  // Group calendar days into weeks (rows of 7)
  const weeks: (typeof calendarDays)[] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <View className="mx-4">
      {/* Month Navigation */}
      <View className="flex-row items-center justify-between mb-4 bg-gray-200 rounded-lg p-2">
        <TouchableOpacity onPress={goToPrevMonth} className="p-2">
          <Text className="text-[#2C3E50] text-[28px] font-light leading-none">
            ‹
          </Text>
        </TouchableOpacity>
        <Text className="text-[#2C3E50] text-[16px] font-semibold">
          {currentDate.getDate()} {months[currentDate.getMonth()]},{" "}
          {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} className="p-2">
          <Text className="text-[#2C3E50] text-[28px] font-light leading-none">
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Grid */}
      {weeks.map((week, weekIndex) => {
        return (
          <View key={weekIndex} className="flex-row mb-2 items-start">
            {week.map((dayItem, dayIndex) => {
              const hasAppointment = dayItem.appointments.length > 0;
              const firstAppointment = dayItem.appointments[0];
              const statusColors = hasAppointment
                ? getStatusBgColor(firstAppointment.status)
                : null;

              // Days with appointments get more flex, others shrink
              const flexValue = hasAppointment ? 2.5 : 1;

              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={{
                    flex: dayItem.isCurrentMonth ? flexValue : 1,
                    minHeight: hasAppointment ? 100 : 40,
                    marginRight: 4,
                    backgroundColor: hasAppointment
                      ? statusColors?.bg
                      : "transparent",
                    borderRadius: hasAppointment ? 12 : 0,
                    padding: hasAppointment ? 8 : 0,
                  }}
                  disabled={!hasAppointment}
                  onPress={() =>
                    hasAppointment && onAppointmentPress(firstAppointment.id)
                  }
                >
                  {dayItem.isCurrentMonth && dayItem.day > 0 ? (
                    <View className="items-center">
                      {/* Day Number */}
                      <Text
                        className={`text-[13px] font-semibold mb-1 ${
                          hasAppointment ? "text-[#2C3E50]" : "text-gray-400"
                        }`}
                      >
                        {dayItem.day}
                      </Text>

                      {/* Appointment Info */}
                      {hasAppointment && (
                        <View className="w-full items-start mt-1">
                          {/* Name in white rounded pill */}
                          <View className="bg-white rounded-full px-2 py-1.5 mb-2">
                            <Text
                              className="text-[12px] text-[#2C3E50] font-medium text-center"
                              numberOfLines={1}
                            >
                              {firstAppointment.serviceProviderName}
                            </Text>
                          </View>

                          {/* Status Badge */}
                          <View
                            className="px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: statusColors?.badgeBg,
                            }}
                          >
                            <Text className="text-[12px] font-semibold text-white">
                              {firstAppointment.status}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View style={{ flex: 1 }} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

// Filter Modal Component - Same as Home Screen (4 status options)
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
  statusFilter: AppointmentStatus | null;
  setStatusFilter: (filter: AppointmentStatus | null) => void;
  onApply: () => void;
}) => {
  const dateOptions: DateFilter[] = ["Today", "Upcoming", "Past"];
  const statusOptions: AppointmentStatus[] = [
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
            <TouchableOpacity onPress={onClose}>
              <View
                className="bg-[#add0eb] w-8 h-8  rounded-full items-center justify-center overflow-hidden"
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

// Main Appointments Screen
export default function AppointmentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [upcomingExpanded, setUpcomingExpanded] = useState(true);
  const [finishedExpanded, setFinishedExpanded] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | null>(
    null
  );

  // Action menu state
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    let appointments = [...allAppointments];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Apply date filter
    if (dateFilter) {
      appointments = appointments.filter((apt) => {
        const aptDate = new Date(apt.rawDate);
        aptDate.setHours(0, 0, 0, 0);

        switch (dateFilter) {
          case "Today":
            return aptDate.getTime() === today.getTime();
          case "Upcoming":
            return aptDate.getTime() >= today.getTime();
          case "Past":
            return aptDate.getTime() < today.getTime();
          default:
            return true;
        }
      });
    }

    // Apply status filter
    if (statusFilter) {
      appointments = appointments.filter((apt) => apt.status === statusFilter);
    }

    return appointments;
  }, [dateFilter, statusFilter]);

  // Separate upcoming and finished
  const upcomingAppointmentsList = useMemo(() => {
    return filteredAppointments.filter((apt) => apt.isUpcoming);
  }, [filteredAppointments]);

  const finishedAppointmentsList = useMemo(() => {
    return filteredAppointments.filter((apt) => !apt.isUpcoming);
  }, [filteredAppointments]);

  const handleAppointmentPress = (id: string) => {
    router.push(`/booking-details?id=${id}`);
  };

  const handleMenuPress = (id: string) => {
    setSelectedAppointmentId(id);
    setActionMenuVisible(true);
  };

  const handleReschedule = () => {
    setActionMenuVisible(false);
    if (selectedAppointmentId) {
      // Navigate to reschedule screen with appointment data
      router.push(`/reschedule?id=${selectedAppointmentId}`);
    }
  };

  const handleMarkComplete = () => {
    setActionMenuVisible(false);
    // In a real app, update the appointment status
    console.log("Mark complete:", selectedAppointmentId);
  };

  const handleCancelAppointment = () => {
    setActionMenuVisible(false);
    // In a real app, cancel the appointment
    console.log("Cancel appointment:", selectedAppointmentId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header */}
      <Header onBack={() => router.back()} />

      {/* Search Bar */}
      <SearchBar onFilterPress={() => setFilterModalVisible(true)} />

      {/* View Toggle */}
      <ViewToggle activeView={activeView} onViewChange={setActiveView} />

      {/* Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {activeView === "list" ? (
          <>
            {/* Upcoming Section */}
            <SectionHeader
              title="Upcoming"
              isExpanded={upcomingExpanded}
              onToggle={() => setUpcomingExpanded(!upcomingExpanded)}
              dotColor="#10B981"
            />
            {upcomingExpanded && (
              <View className="pl-6">
                {upcomingAppointmentsList.length > 0 ? (
                  upcomingAppointmentsList.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onPress={() => handleAppointmentPress(appointment.id)}
                      onMenuPress={() => handleMenuPress(appointment.id)}
                    />
                  ))
                ) : (
                  <View className="mr-6 bg-white rounded-2xl p-6 mb-4 items-center">
                    <Text className="text-gray-400 text-[14px]">
                      No upcoming appointments
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Finish Section */}
            <SectionHeader
              title="Finish"
              isExpanded={finishedExpanded}
              onToggle={() => setFinishedExpanded(!finishedExpanded)}
              dotColor="#10B981"
            />
            {finishedExpanded && (
              <View className="pl-6">
                {finishedAppointmentsList.length > 0 ? (
                  finishedAppointmentsList.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onPress={() => handleAppointmentPress(appointment.id)}
                      onMenuPress={() => handleMenuPress(appointment.id)}
                    />
                  ))
                ) : (
                  <View className="mr-6 bg-white rounded-2xl p-6 mb-4 items-center">
                    <Text className="text-gray-400 text-[14px]">
                      No finished appointments
                    </Text>
                  </View>
                )}
              </View>
            )}
          </>
        ) : (
          <CalendarView
            appointments={filteredAppointments}
            onAppointmentPress={handleAppointmentPress}
          />
        )}
      </ScrollView>

      {/* New Booking Button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-6 pt-4 bg-gray-50"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={() => router.push("/new-booking")}
          className="bg-[#2C3E50] rounded-full py-4 items-center"
          style={{
            shadowColor: "#2C3E50",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text className="text-white text-[16px] font-semibold">
            New Booking
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onApply={() => setFilterModalVisible(false)}
      />

      {/* Action Menu */}
      <ActionMenu
        visible={actionMenuVisible}
        onClose={() => setActionMenuVisible(false)}
        onReschedule={handleReschedule}
        onMarkComplete={handleMarkComplete}
        onCancel={handleCancelAppointment}
      />
    </SafeAreaView>
  );
}
