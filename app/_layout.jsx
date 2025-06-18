import { Stack } from 'expo-router';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ✅ Correct relative paths based on "app" folder
import { CourseProvider } from './context/CourseContext';
import { UserDetailProvider } from './context/UserDetailContext';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <UserDetailProvider>
        <CourseProvider>
          <Stack
            screenOptions={{ headerShown: false }}
          />
        </CourseProvider>
      </UserDetailProvider>
    </SafeAreaProvider>
  );
}
