import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/components/SplashScreen';
import LoginScreen from './src/components/LoginScreen';
import SignupScreen from './src/components/SignupScreen';
import HomeScreen from './src/components/HomeScreen';
import StudentScreen from './src/components/StudentScreen';
import ParentsInfoScreen from './src/components/ParentsInfoScreen';
import FinalInfoScreen from './src/components/FinalInfoScreen';
import CompleteScreen from './src/components/CompleteScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
        <StatusBar 
            barStyle="light-content"
            backgroundColor="#4A90E2"
        />    
        <NavigationContainer>
            <Stack.Navigator initialRouteNames="Splash">
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Student" component={StudentScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ParentsInfo" component={ParentsInfoScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="FinalInfo" component={FinalInfoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Complete" component={CompleteScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
