import { NavigationContainer } from '@react-navigation/native';
import { Private } from '../screens/Private';
import { Public } from '../screens/Public';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type tabList = {
  public: undefined;
  private: undefined;
};

const BottomTab = createBottomTabNavigator<tabList>();

export const Navigation = () => (
  <NavigationContainer>
    <BottomTab.Navigator
      initialRouteName="public"
      screenOptions={{
        tabBarStyle: [{ display: 'flex' }, null],
        tabBarLabelStyle: { fontSize: 16 },
      }}
    >
      <BottomTab.Screen
        name="public"
        component={Public}
        options={{
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="private"
        component={Private}
        options={{
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  </NavigationContainer>
);
