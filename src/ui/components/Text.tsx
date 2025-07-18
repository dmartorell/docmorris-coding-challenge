import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../theme/ThemeContext';
import { ColorPalette, TypographyPalette } from '../theme/themes';

const StyledText = cssInterop(RNText, { className: 'style' });

interface TextProps {
  children: React.ReactNode;
  variant?: keyof TypographyPalette['sizes'];
  weight?: keyof TypographyPalette['weights'];
  colorVariant?: keyof ColorPalette;
  className?: string;
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  weight = 'regular',
  colorVariant = 'textPrimary',
  className = '',
  style,
}) => {
  const { currentTheme } = useTheme();

  const fontSize = currentTheme.typography.sizes[variant]?.fontSize || currentTheme.typography.sizes.body1.fontSize;
  const lineHeight = currentTheme.typography.sizes[variant]?.lineHeight ||
    currentTheme.typography.sizes.body1.lineHeight;
  const fontFamily = currentTheme.typography.weights[weight] || currentTheme.typography.weights.regular;
  const textColor = currentTheme.colors[colorVariant] || currentTheme.colors.textPrimary;

  const combinedStyles: TextStyle = {
    fontFamily,
    fontSize,
    lineHeight: typeof lineHeight === 'number' ? lineHeight : undefined,
    color: textColor,
  };

  return (
    <StyledText
      className={className}
      style={[combinedStyles, style]}
    >
      {children}
    </StyledText>
  );
};
