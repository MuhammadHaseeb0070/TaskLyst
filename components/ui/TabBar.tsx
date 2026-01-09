import React from 'react';
import { View, Text, TouchableOpacity, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android (standard React Native feature)
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // 1. Helper to get the correct image source based on focus state
  const getIconSource = (routeName: string, isFocused: boolean) => {
    // Exact paths from your previous code
    switch (routeName.toLowerCase()) {
      case 'index':
      case 'dashboard':
        return isFocused 
          ? require('@/assets/images/tab-dashboard-active.png') 
          : require('@/assets/images/tab-dashboard.png');
      case 'diary':
        return isFocused 
          ? require('@/assets/images/tab-diary-active.png') 
          : require('@/assets/images/tab-diary.png');
      case 'message':
        return isFocused 
          ? require('@/assets/images/tab-message-active.png') 
          : require('@/assets/images/tab-message.png');
      case 'setting':
      case 'settings': // Handle both singular/plural just in case
        return isFocused 
          ? require('@/assets/images/tab-setting-active.png') 
          : require('@/assets/images/tab-setting.png');
      default:
        return require('@/assets/images/tab-dashboard.png');
    }
  };

  // 2. Helper for Labels
  const getLabel = (routeName: string) => {
    switch (routeName.toLowerCase()) {
      case 'index':
      case 'dashboard': return 'Dashboard';
      case 'diary': return 'Diary';
      case 'message': return 'Message';
      case 'setting': return 'Setting';
      default: return 'Tab';
    }
  };

  return (
    <View 
      className="bg-white border-t border-gray-100 px-5 pt-3 shadow-sm"
      style={{ paddingBottom: insets.bottom + 10 }} // Dynamic safe area padding
    >
      <View className="flex-row items-center justify-between  rounded-3xl p-5">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // Smoothly animate the "pill" expansion
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              className={`flex-row items-center justify-center rounded-full py-2 px-3 ${
                isFocused ? 'bg-slate-800' : 'bg-transparent'
              }`}
            >
              <Image 
                source={getIconSource(route.name, isFocused)}
                className="w-6 h-6"
                resizeMode="contain"
               style={isFocused ? { tintColor: 'white' } : undefined} 
              />

              {isFocused && (
                <Text 
                  className="text-white font-semibold ml-2 text-[16px]"
                  numberOfLines={1}
                >
                  {getLabel(route.name)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}