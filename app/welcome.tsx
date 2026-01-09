import { View, Text, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SlideButton from "@/components/ui/SlideButton";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Grid Configuration: Max 6 columns for large squares
  const COLUMNS = 6;
  const SQUARE_SIZE = width / COLUMNS;
  const ROWS = Math.ceil(height / SQUARE_SIZE);

  return (
    <View className="flex-1 bg-white">
     

        <Image source={require("@/assets/images/welcomescreen.png")} className="w-full h-full" resizeMode="contain" />
          {/* Slide Button Container */}
          <View className="w-full items-center absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4"
          style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }}>
            <SlideButton
              onSlideComplete={() => router.push("/role-selection")}
              text="Get Started           "
            />
          </View>
    </View>
  );
}