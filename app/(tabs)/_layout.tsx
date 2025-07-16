import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';
import CustomNavBar from '@/components/CustomNavbar';

export default function TabLayout() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF2DF"
        translucent={false}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomNavBar {...props} />}
      />
    </>
  );
}
