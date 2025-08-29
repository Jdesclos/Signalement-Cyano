import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ReportForm from '../screens/ReportForm';
import SignalementsList from '../screens/SignalementsList';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ReportForm: undefined;
  SignalementsList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#e0f7fa' },
          headerTintColor: '#00796b',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Accueil',
            headerLeft: () => null, // Pas de bouton retour sur l'accueil
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            title: 'Connexion',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 20 }}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignalementsList')}>
                  <Text style={{ fontSize: 20 }}>📋</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ReportForm"
          component={ReportForm}
          options={({ navigation }) => ({
            title: 'Nouveau signalement',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 20 }}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignalementsList')}>
                  <Text style={{ fontSize: 20 }}>📋</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SignalementsList"
          component={SignalementsList}
          options={({ navigation }) => ({
            title: 'Signalements',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 20 }}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignalementsList')}>
                  <Text style={{ fontSize: 20 }}>📋</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
