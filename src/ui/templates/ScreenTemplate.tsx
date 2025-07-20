import React from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../theme/ThemeContext';

const StyledView = cssInterop(View, { className: 'style' });

interface ScreenTemplateProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  isLoading?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  gap?: string;
  backgroundColor?: string;
}

export const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  className = '',
  style,
  isLoading = false,
  justifyContent = 'center',
  alignItems = 'stretch',
  gap = 'lg',
  backgroundColor,
}) => {
  const { currentTheme } = useTheme();
  const justifyClass = `justify-${justifyContent}`;
  const alignClass = `items-${alignItems}`;
  const gapClass = `gap-${String(gap)}`;
  const bgColor = backgroundColor || currentTheme.colors.background;
  return (
    <StyledView
      className={`flex-1 ${justifyClass} ${alignClass} ${gapClass} ${className}`}
      style={{ ...(style || {}), backgroundColor: bgColor }}
    >
      {isLoading
        ? (
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        )
        : (
          children
        )}
    </StyledView>
  );
};
