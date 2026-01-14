import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import {
  getServiceDetailsById,
  ServiceDetails,
  AvailabilitySlot,
} from "@/data/dummyData";

// Shadow style constant
const cardShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
};

// Hero Image Header Component
const HeroImageHeader = ({
  image,
  onBack,
  onAction,
}: {
  image: any;
  onBack: () => void;
  onAction: () => void;
}) => {
  return (
    <View className="relative">
      <Image
        source={image}
        className="w-full"
        style={{ height: 220 }}
        resizeMode="cover"
      />
    </View>
  );
};

// Rating Stars Component
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Text key={`full-${i}`} className="text-[#FFC107] text-[14px]">
          ★
        </Text>
      ))}
      {hasHalfStar && <Text className="text-[#FFC107] text-[14px]">★</Text>}
      {[...Array(emptyStars)].map((_, i) => (
        <Text key={`empty-${i}`} className="text-[#D1D5DB] text-[14px]">
          ★
        </Text>
      ))}
      <Text className="text-[#68696b] text-[14px] ml-1">{rating}</Text>
    </View>
  );
};

// Price Badge Component
const PriceBadge = ({ price }: { price: number }) => (
  <View className="bg-[#10B981] px-3 py-1.5 rounded-full">
    <Text className="text-white text-[14px] font-bold">£{price}</Text>
  </View>
);

// Service Info Card Component
const ServiceInfoCard = ({ service }: { service: ServiceDetails }) => {
  return (
    <View className="px-6 pt-5 pb-4 -mt-8" style={{ marginTop: 8 }}>
      {/* Rating and Price Row */}
      <View className="flex-row items-center justify-between mb-3">
        <RatingStars rating={service.rating} />
        <PriceBadge price={service.price} />
      </View>

      {/* Service Name */}
      <Text className="text-[#313d49] text-[26px] font-bold mb-2">
        {service.name}
      </Text>

      {/* Description */}
      <Text className="text-[#313d49] text-[16px] leading-5 mb-4">
        {service.description}
      </Text>

      {/* Location and Duration Row */}
      <View className="flex-row items-center">
        <View className="flex-row items-center mr-6 ">
          <View className=" rounded-full bg-[#add0eb] items-center justify-center p-1">
            <Image
              source={require("@/assets/images/icon-location.png")}
              className="w-4 h-4 "
              resizeMode="contain"
            />
          </View>

          <Text className="text-[#313d49] text-[13px] ml-2">{service.location}</Text>
        </View>
        <View className="flex-row items-center">
          <View className=" rounded-full bg-[#add0eb] items-center justify-center p-1">
            <Image
              source={require("@/assets/images/icon-clock-service.png")}
              className="w-4 h-4 "
              resizeMode="contain"
            />
          </View>
          <Text className="text-[#313d49] text-[13px] ml-2">{service.duration}</Text>
        </View>
      </View>
    </View>
  );
};

// Icon Circle Component
const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <View
    className="w-10 h-10 rounded-full items-center justify-center mr-3"
    style={{ backgroundColor: "#add0eb" }}
  >
    {children}
  </View>
);

// Collapsible Section Component
const CollapsibleSection = ({
  icon,
  title,
  children,
  defaultExpanded = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View
      className="bg-white rounded-2xl mb-4 mx-6 overflow-hidden"
      style={cardShadow}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
        className="flex-row items-center p-4"
      >
        <IconCircle>{icon}</IconCircle>
        <Text className="flex-1 text-[#313d49] text-[16px] font-bold">
          {title}
        </Text>
        <Image
          source={require("@/assets/images/icon-chevron-down.png")}
          className="w-5 h-5"
          resizeMode="contain"
          style={{
            tintColor: "#68696b",
            transform: [{ rotate: expanded ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>
      {expanded && <View className="px-4 pb-4">{children}</View>}
    </View>
  );
};

// Key Value Row Component (simple inline)
const KeyValueRow = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <View className="mb-3">
    <Text className="text-[#68696b] text-[13px] mb-1">{label}</Text>
    <Text
      className="text-[16px] font-medium"
      style={{ color: valueColor || "#313d49" }}
    >
      {value}
    </Text>
  </View>
);

// Info Card Component (card-based layout - vertical)
const InfoCard = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <View
    className="bg-white rounded-2xl p-4 mb-3"
    style={{
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
  >
    <Text className="text-[#313d49] text-[16px] font-bold mb-1">{label}</Text>
    <Text className="text-[15px]" style={{ color: valueColor || "#9CA3AF" }}>
      {value}
    </Text>
  </View>
);

// Info Card Row Component (card-based layout - horizontal)
const InfoCardRow = ({
  label,
  value,
  valueColor,
  isBadge = false,
}: {
  label: string;
  value: string;
  valueColor?: string;
  isBadge?: boolean;
}) => (
  <View
    className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between"
    style={{
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
  >
    <Text className="text-[#313d49] text-[16px] font-bold">{label}</Text>
    {isBadge ? (
      <View
        className="px-3 py-1 rounded-full"
        style={{
          backgroundColor: valueColor === "#10B981" ? "#D1FAE5" : "#FEE2E2",
        }}
      >
        <Text
          className="text-[14px] font-semibold"
          style={{ color: valueColor || "#10B981" }}
        >
          {value}
        </Text>
      </View>
    ) : (
      <Text className="text-[15px]" style={{ color: valueColor || "#9CA3AF" }}>
        {value}
      </Text>
    )}
  </View>
);

// Availability Schedule Component
const AvailabilitySchedule = ({
  availability,
}: {
  availability: AvailabilitySlot[];
}) => (
  <View>
    {availability.map((slot, index) => (
      <View
        key={index}
        className="flex-row bg-white rounded-r-2xl mb-3 overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        {/* Left Accent Bar */}
        <View className="w-1" style={{ backgroundColor: "#add0eb" }} />

        {/* Date Section */}
        <View className="px-4 justify-center items-center">
          <Text style={{ color: "#0EA5E9", fontSize: 22, fontWeight: "600" }}>
            {slot.dateRange.split(" ")[0]}
          </Text>
          <Text style={{ color: "#0EA5E9", fontSize: 12 }}>
            {slot.dateRange.split(" ")[1]}
          </Text>
        </View>

        {/* Vertical Divider */}
        <View style={{ width: 1, backgroundColor: "#E5E7EB" }} />

        {/* Right Content */}
        <View className="flex-1 justify-center">
          {/* Top */}
          <View className="px-4 pt-4">
            <Text className="text-[#313d49] text-[16px] font-semibold">
              {slot.day}
            </Text>
          </View>

          {/* Horizontal Divider (TOUCHES vertical + right border) */}
          <View
            style={{
              height: 1,
              backgroundColor: "#E5E7EB",
              marginTop: 8,
            }}
          />

          {/* Bottom */}
          <View className="px-4 pb-4 pt-2">
            <Text className="text-[#68696b] text-[14px] font-bold">
              {slot.hours}
            </Text>
          </View>
        </View>
      </View>
    ))}
  </View>
);


// Two Column Card Component
const TwoColumnCard = ({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
}: {
  leftTitle: string;
  leftContent: string;
  rightTitle: string;
  rightContent: string;
}) => (
  <View className="flex-row" style={{ gap: 12 }}>
    {/* Left Card - Cancellation Policy */}
    <View
      className="flex-1 bg-white rounded-2xl p-4"
      style={{
        borderWidth: 1,
        borderColor: "#E5E7EB",
      }}
    >
      {/* Icon Circle */}
      <View className="w-12 h-12 rounded-full bg-[#F3F4F6] items-center justify-center mb-3">
       <Image source={require("@/assets/images/policyiconservice.png")} className="w-5 h-5" resizeMode="contain" />
      </View>
      {/* Title */}
      <Text className="text-[#313d49] text-[16px] font-bold mb-2">
        {leftTitle}
      </Text>
      {/* Description */}
      <Text className="text-[#68696b] text-[14px] leading-5">
        {leftContent}
      </Text>
    </View>

    {/* Right Card - Terms & Conditions */}
    <View
      className="flex-1 bg-white rounded-2xl p-4"
      style={{
        borderWidth: 1,
        borderColor: "#E5E7EB",
      }}
    >
      {/* Icon Circle */}
      <View className="w-12 h-12 rounded-full bg-[#F3F4F6] items-center justify-center mb-3">
        <Image source={require("@/assets/images/termsservices.png")} className="w-5 h-5" resizeMode="contain" />
      </View>
      {/* Title */}
      <Text className="text-[#313d49] text-[16px] font-bold mb-2">
        {rightTitle}
      </Text>
      {/* Description */}
      <Text className="text-[#68696b] text-[14px] leading-5">
        {rightContent}
      </Text>
    </View>
  </View>
);

// Timeline Item Component (for Requirements & Equipment)
const TimelineItem = ({
  title,
  description,
  isLast = false,
}: {
  title: string;
  description: string;
  isLast?: boolean;
}) => (
  <View className="flex-row">
    {/* Left side - Circle and Line */}
    <View className="items-center mr-4">
      {/* Checkmark Circle */}
      <View className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center">
        <Text className="text-[#9CA3AF] text-[16px]">✓</Text>
      </View>
      {/* Vertical Line (if not last item) */}
      {!isLast && (
        <View
          className="w-[2px] flex-1 min-h-[40px]"
          style={{ backgroundColor: "#313d49" }}
        />
      )}
    </View>

    {/* Right side - Content */}
    <View className="flex-1 pb-6">
      <Text className="text-[#313d49] text-[16px] font-bold mb-1">{title}</Text>
      <Text className="text-[#68696b] text-[14px]">{description}</Text>
    </View>
  </View>
);

// Map Preview Component
const MapPreview = ({
  address,
  radius,
  latitude,
  longitude,
}: {
  address: string;
  radius: string;
  latitude: number;
  longitude: number;
}) => {
  // OpenStreetMap embed HTML
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(map);
          L.marker([${latitude}, ${longitude}]).addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View>
      {/* Real Map */}
      <View
        className="h-48 rounded-2xl mb-4 overflow-hidden"
        style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <WebView
          source={{ html: mapHtml }}
          style={{ flex: 1 }}
          scrollEnabled={false}
          nestedScrollEnabled={false}
        />
      </View>

      {/* Address Card */}
      <View
        className="rounded-2xl p-4 mb-4 flex-row items-start"
        style={{ backgroundColor: "#fffcef" }}
      >
        <Image
          source={require("@/assets/images/icon-location.png")}
          className="w-5 h-5 mt-0.5 mr-3"
          resizeMode="contain"
          style={{ tintColor: "#313d49" }}
        />
        <Text className="flex-1 text-[#313d49] text-[16px] font-medium leading-6">
          {address}
        </Text>
      </View>

      {/* Service Radius Row */}
      <View className="flex-row items-center justify-between px-1">
        <Text className="text-[#313d49] text-[16px] font-semibold">
          Service radius:
        </Text>
        <Text className="text-[#313d49] text-[16px] font-semibold">
          {radius}
        </Text>
      </View>
    </View>
  );
};

// Section Icons (all using Image elements with assets)
const AboutIcon = () => (
  <Image
    source={require("@/assets/images/service-icon-about.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const CalendarIcon = () => (
  <Image
    source={require("@/assets/images/service-clock.png")}
    className="w-5 h-5"
    resizeMode="contain"  
  />
);
const ToolsIcon = () => (
  <Image
    source={require("@/assets/images/requirementsandequipments.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const DocumentIcon = () => (
  <Image
    source={require("@/assets/images/policyicon.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const SettingsIcon = () => (
  <Image
    source={require("@/assets/images/booking-confirmation.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const PaymentIcon = () => (
  <Image
    source={require("@/assets/images/payment-services-icon.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const RecurringIcon = () => (
  <Image
    source={require("@/assets/images/recurring-service.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const StatusIcon = () => (
  <Image
    source={require("@/assets/images/service-status.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);
const LocationIcon = () => (
  <Image
    source={require("@/assets/images/service-location.png")}
    className="w-5 h-5"
    resizeMode="contain"
  />
);

// Main Screen Component
export default function ServiceDetailsScreen() {
  const { serviceId } = useLocalSearchParams();
  const service = getServiceDetailsById(serviceId as string);
  const insets = useSafeAreaInsets();

  // Fallback if service not found
  if (!service) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-[#68696b] text-[16px]">Service not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 bg-[#313d49] rounded-full"
        >
          <Text className="text-white text-[14px] font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleAction = () => {
    // Action button functionality
    console.log("Action pressed");
  };

  const handleBookNow = () => {
    // Navigate to booking flow
    console.log("Book Now pressed");
  };

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <HeroImageHeader
          image={service.image}
          onBack={handleBack}
          onAction={handleAction}
        />

        {/* Service Info Card */}
        <ServiceInfoCard service={service} />

        {/* Sections Container */}
        <View className="mt-4">
          {/* About this Service */}
          <CollapsibleSection
            icon={<AboutIcon />}
            title="About this Service"
            defaultExpanded
          >
            <Text className="text-[#68696b] text-[14px] leading-5">
              {service.aboutDescription}
            </Text>
          </CollapsibleSection>

          {/* Availability */}
          <CollapsibleSection icon={<CalendarIcon />} title="Availability">
            <AvailabilitySchedule availability={service.availability} />
          </CollapsibleSection>

          {/* Requirements & Equipment */}
          <CollapsibleSection
            icon={<ToolsIcon />}
            title="Requirements & Equipment"
          >
            {/* Horizontal separator */}
            <View
              className="h-[1px] mb-4"
              style={{ backgroundColor: "#E5E7EB" }}
            />

            <TimelineItem
              title="Requirements"
              description={service.requirements.join(", ")}
            />
            <TimelineItem
              title="Equipment Provided"
              description={service.equipmentProvided.join(", ")}
              isLast
            />
          </CollapsibleSection>

          {/* Policies & Terms */}
          <CollapsibleSection icon={<DocumentIcon />} title="Policies & Terms">
            <TwoColumnCard
              leftTitle="Cancellation Policy"
              leftContent={service.cancellationPolicy}
              rightTitle="Terms & Conditions"
              rightContent={service.termsConditions}
            />
          </CollapsibleSection>

          {/* Booking Configuration */}
          <CollapsibleSection
            icon={<SettingsIcon />}
            title="Booking Configuration"
          >
            <InfoCard label="Booking Mode" value={service.bookingMode} />
            <InfoCard
              label="Provider Approval"
              value={service.providerApproval}
            />
            <InfoCard
              label="Image Upload Required"
              value={service.imageUploadRequired ? "Yes" : "No"}
            />
          </CollapsibleSection>

          {/* Payment Settings */}
          <CollapsibleSection icon={<PaymentIcon />} title="Payment Settings">
            <InfoCard label="Payment Method" value={service.paymentMethod} />
            <InfoCard label="Hold Payment" value={service.holdPayment} />
          </CollapsibleSection>

          {/* Recurring Service */}
          <CollapsibleSection
            icon={<RecurringIcon />}
            title="Recurring Service"
          >
            <InfoCard label="Frequency" value={service.recurringFrequency} />
            <InfoCard
              label="Visits Per Day"
              value={service.visitsPerDay.toString()}
            />
            <InfoCard
              label="Auto-Generate Bookings"
              value={service.autoGenerateBookings ? "Enabled" : "Disabled"}
            />
          </CollapsibleSection>

          {/* Service Status */}
          <CollapsibleSection icon={<StatusIcon />} title="Service Status">
            <InfoCardRow
              label="Status"
              value={service.status}
              valueColor={service.status === "Active" ? "#10B981" : "#EF4444"}
              isBadge
            />
            <InfoCardRow label="Created" value={service.createdDate} />
            <InfoCardRow label="Last Updated" value={service.lastUpdated} />
          </CollapsibleSection>

          {/* Service Location */}
          <CollapsibleSection icon={<LocationIcon />} title="Service Location">
            <MapPreview
              address={service.address}
              radius={service.serviceRadius}
              latitude={service.latitude}
              longitude={service.longitude}
            />
          </CollapsibleSection>
        </View>

        {/* Bottom spacing */}
        <View className="h-28" />
      </ScrollView>

      {/* Fixed Bottom Book Button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-6 pt-4 bg-white"
        style={{
          paddingBottom: insets.bottom + 32,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <TouchableOpacity
          onPress={handleBookNow}
          activeOpacity={0.7}
          className="bg-[#313d49] py-4 rounded-full"
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Book Now- £{service.price}/hr
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
