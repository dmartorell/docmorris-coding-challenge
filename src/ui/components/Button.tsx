import React from 'react';
import { Pressable, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

const StyledPressable = cssInterop(Pressable, { className: 'style' });

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'link';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  textClassName = '',
  style,
  textStyle = {},
  size = 'md',
}) => {
  const { currentTheme } = useTheme();

  let height = 40;
  let paddingVertical = currentTheme.spacing.sm;

  if (size === 'sm') {
    height = 32;
    paddingVertical = currentTheme.spacing.xs;
  } else if (size === 'lg') {
    height = 52;
    paddingVertical = currentTheme.spacing.md;
  }

  const baseButtonClasses = `
    flex-row items-center justify-center
    px-${currentTheme.spacing.md}
    rounded-md
  `;
  let buttonStyles: ViewStyle = {};
  const buttonOpacity = disabled || loading ? 0.6 : 1;
  let spinnerColor = currentTheme.colors.surface;

  switch (variant) {
  case 'primary':
    buttonStyles = {
      backgroundColor: currentTheme.colors.secondary,
      borderRadius: currentTheme.borderRadius.md,
      height,
      paddingVertical,
      alignItems: 'center',
      justifyContent: 'center',
    };
    spinnerColor = currentTheme.colors.surface;
    break;
  case 'secondary':
    buttonStyles = {
      backgroundColor: currentTheme.colors.surface,
      borderColor: currentTheme.colors.primary,
      borderRadius: currentTheme.borderRadius.md,
      height,
      paddingVertical,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    };
    spinnerColor = currentTheme.colors.primary;
    break;
  case 'link':
    buttonStyles = {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      paddingVertical: 0,
    };
    spinnerColor = currentTheme.colors.primary;
    break;
  }
  const combinedButtonStyles = [
    { opacity: buttonOpacity },
    buttonStyles,
    style,
  ];

  let defaultTextColor;
  if (variant === 'primary') {
    defaultTextColor = currentTheme.colors.surface;
  } else if (variant === 'secondary') {
    defaultTextColor = currentTheme.colors.primary;
  } else if (variant === 'link') {
    defaultTextColor = currentTheme.colors.primary;
  }

  return (
    <StyledPressable
      testID="button"
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseButtonClasses} ${className}`}
      style={combinedButtonStyles}
    >
      {loading
        ? (
          <ActivityIndicator size="small" color={spinnerColor} />
        )
        : (
          <Text
            variant={variant === 'link' ? 'buttonLink' : 'buttonMedium'}
            weight="medium"
            className={textClassName}
            style={{ color: defaultTextColor, ...textStyle }}
          >
            {children}
          </Text>
        )}
    </StyledPressable>
  );
};
