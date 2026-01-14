import "../global.css";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="role-selection" />
        <Stack.Screen name="create-account" />
        <Stack.Screen name="signup-email" />
        <Stack.Screen name="signup-phone" />
        <Stack.Screen name="signup-phone-form" />
        <Stack.Screen name="signup-form" />
        <Stack.Screen name="verify-otp" />
        <Stack.Screen 
          name="signup-success" 
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="login" />
        <Stack.Screen name="login-email" />
        <Stack.Screen name="login-phone" />
        <Stack.Screen 
          name="login-success" 
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="check-inbox" />
        <Stack.Screen name="appointments" />
        <Stack.Screen name="booking-details" />
        <Stack.Screen name="reschedule" />
        <Stack.Screen name="new-booking" />
        <Stack.Screen name="new-booking-customer" />
        <Stack.Screen name="new-booking-payment" />
        <Stack.Screen name="services" />
        <Stack.Screen name="service-details" />
        <Stack.Screen name="create-service" />
        <Stack.Screen name="create-service-step2" />
        <Stack.Screen name="create-service-step3" />
        <Stack.Screen 
          name="create-service-success" 
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="booking-success" 
          options={{
            animation: 'fade',
            presentation: 'transparentModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="(home)" 
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
