import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import Pgna1 from './screens/Pgna1';
import SignupScreen from './screens/SignupScreen'; 
import usuarioPerfil from './screens/usuarioPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Pgna1" 
          component={Pgna1}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="usuarioPerfil" 
          component={usuarioPerfil}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}