import { Tabs } from 'expo-router';
import TabBar from '@/components/ui/TabBar';

export default function HomeLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Dashboard' }}
      />
      <Tabs.Screen 
        name="diary" 
        options={{ title: 'Diary' }}
      />
      <Tabs.Screen 
        name="message" 
        options={{ title: 'Message' }}
      />
      <Tabs.Screen 
        name="setting" 
        options={{ title: 'Setting' }}
      />
    </Tabs>
  );
}
