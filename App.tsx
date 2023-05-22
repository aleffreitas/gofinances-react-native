import 'react-native-gesture-handler';
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider } from 'styled-components';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import { StatusBar } from 'react-native';
import { SignIn } from './src/pages/SignIn';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  // SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}