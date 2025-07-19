// src/ui/components/RemoveButton.tsx

import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

const StyledPressable = cssInterop(Pressable, { className: 'style' });

interface RemoveButtonProps {
  onPress: () => void;
  label: string;
  className?: string;
  style?: ViewStyle;
  iconSize?: number;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  onPress,
  className = '',
  style,
  label,
  iconSize = 12,
}) => {
  const { currentTheme } = useTheme();

  return (
    <StyledPressable
      onPress={onPress}
      className={`flex-row items-center gap-1 ${className}`}
      style={style}
    >
      <MaterialIcons name="delete-outline" size={iconSize} color={currentTheme.colors.textMuted} />
      <Text variant="caption2" weight="medium" colorVariant="textMuted">
        {label}
      </Text>
    </StyledPressable>
  );
};
