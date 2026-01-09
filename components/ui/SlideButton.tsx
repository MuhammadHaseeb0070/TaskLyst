import React, { useRef, useCallback, useMemo, useState } from 'react';
import { View, Text, Animated, PanResponder, LayoutChangeEvent } from 'react-native';
import { useFocusEffect } from 'expo-router';

interface SlideButtonProps {
  onSlideComplete: () => void;
  text?: string;
}

export default function SlideButton({ onSlideComplete, text = "Get Started" }: SlideButtonProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  
  const BUTTON_WIDTH = containerWidth;
  const SLIDER_WIDTH = BUTTON_WIDTH > 0 ? (BUTTON_WIDTH - 8) / 2 : 0;
  
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const hasCompleted = useRef(false);

  // Reset slider when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset the slider position and state
      translateX.setValue(0);
      hasCompleted.current = false;
    }, [translateX])
  );

  const panResponder = useMemo(() => 
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (hasCompleted.current) return;
        
        const maxX = BUTTON_WIDTH - SLIDER_WIDTH - 8;
        const newX = Math.max(0, Math.min(gestureState.dx, maxX));
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (hasCompleted.current) return;

        const threshold = BUTTON_WIDTH - SLIDER_WIDTH - 8;
        if (gestureState.dx >= threshold * 0.9) {
          hasCompleted.current = true;
          Animated.spring(translateX, {
            toValue: threshold,
            useNativeDriver: true,
          }).start(() => {
            onSlideComplete();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    }), [BUTTON_WIDTH, SLIDER_WIDTH, translateX, onSlideComplete]
  );

  return (
    <View className="w-full">
      {/* Track */}
      <View 
        className="h-14 rounded-full bg-gray-200 justify-center"
        onLayout={onLayout}
      >
        {/* Slider thumb - only render after layout measurement */}
        {SLIDER_WIDTH > 0 && (
          <Animated.View
            {...panResponder.panHandlers}
            style={{
              transform: [{ translateX }],
              width: SLIDER_WIDTH,
              marginLeft: 4,
            }}
            className="h-12 rounded-full bg-[#2C3E50] flex-row items-center justify-center"
          >
            <Text className="text-white font-semibold text-[15px] mr-2">{text}</Text>
            <View className="flex-row items-center">
              <Text className="text-white/50 text-base">›</Text>
              <Text className="text-white/70 text-base -ml-0.5">›</Text>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
