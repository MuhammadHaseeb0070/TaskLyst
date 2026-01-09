import { useEffect } from 'react';
import { View, Text ,Image} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#3D4F5F]">
     <Image source={require('@/assets/images/Splash.png')} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}
