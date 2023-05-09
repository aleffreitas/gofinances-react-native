import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { DashBoard } from "../pages/Dashboard";
import { Register } from "../pages/Register";
import { useTheme } from "styled-components/native";
import { Platform } from "react-native";
import { Resume } from "../pages/Resume";

export type AppRoutesParamList = {
  Listagem: undefined,
  Cadastrar: undefined,
  Resumo: undefined,
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();


export function AppRoutes(){
  const theme = useTheme();

  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name="Listagem"
        component={DashBoard}
        options={{
          tabBarIcon: (({ size, color}) =>
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color}) =>
            <MaterialIcons
              name="attach-money"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: (({ size, color}) =>
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  );
}