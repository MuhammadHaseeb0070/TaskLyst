import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { clientsData, clientStats, Client } from "@/data/dummyData";

// Header Component (same as other screens)
const Header = () => {
  return (
    <View className="px-6 py-8">
      <View className="flex-row items-center relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center mr-4 z-10"
          activeOpacity={0.7}
        >
          <Text className="text-[#313d49] text-[24px] font-extrabold">←</Text>
        </TouchableOpacity>
        <View className="absolute left-0 right-0 items-center justify-center">
          <Text className="text-[#313d49] text-[24px] font-bold text-center">
            Client Management
          </Text>
        </View>
      </View>
    </View>
  );
};

// Stat Card Component
const StatCard = ({
  value,
  label,
  sublabel,
  iconBgColor,
  iconContent,
  isLarge = false,
}: {
  value: string;
  label: string;
  sublabel?: string;
  iconBgColor: string;
  iconContent: React.ReactNode;
  isLarge?: boolean;
}) => {
  return (
    <View
      className="flex-1 bg-white rounded-2xl p-4"
      style={{
        backgroundColor:
          label == "Total"
            ? "#e8eaeb"
            : label == "This"
            ? "#f0fdf4"
            : label == "Response"
            ? "#e2f0fb"
            : label == "Avg."
            ? "#fbf8ef"
            : "",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 3,
        minHeight: 100,
      }}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text
            style={{
              color:
                label == "Total"
                  ? "#313d49"
                  : label == "This"
                  ? "#00a63e"
                  : label == "Response"
                  ? "#313d49"
                  : label == "Avg."
                  ? "#f7ce45"
                  : "",
            }}
            className={`text-[#313d49] font-bold ${
              isLarge ? "text-[24px]" : "text-[24px]"
            }`}
          >
            {value}
          </Text>
          <Text className="text-[#313d49] text-[18px] mt-1">{label}</Text>
          {sublabel && (
            <Text className="text-[#313d49] text-[18 px]">{sublabel}</Text>
          )}
        </View>
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{
            backgroundColor:
              label == "Total"
                ? "#313d49"
                : label == "This"
                ? "#00a63e"
                : label == "Response"
                ? "#313d49"
                : label == "Avg."
                ? "#f7ce45"
                : "",
          }}
        >
          {iconContent}
        </View>
      </View>
    </View>
  );
};

// Stats Grid Component
const StatsGrid = () => {
  return (
    <View className="mb-6">
      {/* First Row */}
      <View className="flex-row mb-3" style={{ gap: 12 }}>
        <StatCard
          value={clientStats.totalClients.toString()}
          label="Total"
          sublabel="Clients"
          iconBgColor="#E8EAED"
          iconContent={
            <Image
              source={require("@/assets/images/icon-teams.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
          }
        />
        <StatCard
          value={`£${clientStats.thisMonthRevenue.toFixed(2)}`}
          label="This"
          sublabel="Month"
          iconBgColor="#D1FAE5"
          iconContent={
            <Image
              source={require("@/assets/images/icon-dollar.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
          }
          isLarge
        />
      </View>

      {/* Second Row */}
      <View className="flex-row" style={{ gap: 12 }}>
        <StatCard
          value={`${clientStats.responseOnTimeRate}%`}
          label="Response"
          sublabel="On-Time Rate"
          iconBgColor="#E8EAED"
          iconContent={
            <Image
              source={require("@/assets/images/icon-response.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
          }
        />
        <StatCard
          value={`${clientStats.avgRating}/${clientStats.maxRating}`}
          label="Avg."
          sublabel="Rating"
          iconBgColor="#FEF9C3"
          iconContent={
            <Image
              source={require("@/assets/images/icon-star.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
          }
        />
      </View>
    </View>
  );
};

// Client Card Component
const ClientCard = ({ client }: { client: Client }) => {
  const handleCallNow = () => {
    Linking.openURL(`tel:${client.phone}`);
  };

  return (
    <View
      className="mb-4 bg-white rounded-2xl px-5 py-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View className="flex-row">
        {/* Avatar */}
        <View className=" h-full overflow-hidden ">
          <Image
            source={require("@/assets/images/pending-job-image.jpeg")}
            style={{ width: 120, height: 120 ,borderRadius: 10}}
            resizeMode="cover"
          />
        </View>
        {/* Client Info */}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-[#313d49] text-[18px] font-bold">
                {client.name}
              </Text>
              <Text className="text-[#68696b] text-[14px] mt-0.5">
                {client.email}
              </Text>
              <Text className="text-[16px] font-medium mt-0.5">
                <Text className="italic">{client.totalBookings}</Text> Bookings
              </Text>
            </View>
            <Text style={{ color: "#00a63e" }} className="text-[18px] font-bold">
              £{client.totalSpent.toFixed(2)}
            </Text>
          </View>

          {/* Call Now Button */}
          <TouchableOpacity
            onPress={handleCallNow}
            activeOpacity={0.7}
            className="bg-[#313d49] flex-row items-center justify-center py-3 px-6 rounded-full mt-3 w-full"
          >
            <Image
              source={require("@/assets/images/icon-phone-white.png")}
              className="w-4 h-4 mr-2"
              resizeMode="contain"
            />
            <Text className="text-white text-[14px] font-semibold">
              Call Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Main Client Management Screen
export default function ClientManagementScreen() {
  const [clients] = useState(clientsData);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <StatsGrid />

        {/* Recent Clients Section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#313d49] text-[20px] font-bold">
            Recent Clients
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[#68696b] text-[14px]">View All</Text>
          </TouchableOpacity>
        </View>

        {/* Clients List */}
        <View>
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
