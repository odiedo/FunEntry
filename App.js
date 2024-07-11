import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/components/SplashScreen';
import LoginScreen from './src/components/LoginScreen';
import SignupScreen from './src/components/SignupScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
        <StatusBar 
            barStyle="light-content"
            backgroundColor="#000"
        />    
        <NavigationContainer>
            <Stack.Navigator initialRouteNames="Splash">
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
