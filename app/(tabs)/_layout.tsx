import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Saved',
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      /> */}
    </Tabs>
  );
}
