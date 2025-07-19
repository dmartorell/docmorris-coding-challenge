import React from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../../ui/components/Button';
import { Text } from '../../../../ui/components/Text';
import { useTheme } from '../../../../ui/theme/ThemeContext';

export const HomeScreen = () => {
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.colors.background }}>
      <View className="flex-1 justify-center items-center gap-12">
        <Text variant="title1" weight="bold">Welcome to Heim Apo!</Text>
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
    </SafeAreaView>
  );
};
