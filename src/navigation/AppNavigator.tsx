import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Alert } from 'react-native';
import { Button } from '../ui/components/Button';
import { Text } from '../ui/components/Text';

const Stack = createStackNavigator();

export const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 }}>
    <Text variant="title2" weight="bold">Welcome to Heim Apo!</Text>
    <Text variant="body2" weight="regular" colorVariant="textSecondary">
      This is your home screen. Try pressing the button below.
    </Text>
    <Button
      onPress={() => Alert.alert('Button pressed!')}
      variant="primary"
      className="px-6 py-3"
    >
      Press Me
    </Button>
    <Button
      onPress={() => Alert.alert('Secondary pressed!')}
      variant="secondary"
      className="px-6 py-3"
    >
      Secondary Action
    </Button>
    <Button
      onPress={() => Alert.alert('Link pressed!')}
      variant="link"
      className="px-6 py-3"
    >
      Learn More
    </Button>
  </View>
);

export const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
