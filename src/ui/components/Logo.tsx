import React from 'react';
import { Image, ImageSourcePropType, View, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../theme/ThemeContext';

const StyledView = cssInterop(View, { className: 'style' });
const StyledImage = cssInterop(Image, { className: 'style' });

interface LogoProps {
  source?: ImageSourcePropType;
  className?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export const Logo: React.FC<LogoProps> = ({
  source,
  className = '',
  style,
  accessibilityLabel = 'Brand Logo',
}) => {
  const { currentTheme } = useTheme();
  const finalSource = source || currentTheme.logo;
  if (!finalSource) {
    return null;
  }
  return (
    <StyledView className={`justify-center items-center ${className}`} style={style}>
      <StyledImage
        source={finalSource}
        className="w-full h-full"
        style={{ resizeMode: 'contain' }}
        accessibilityLabel={accessibilityLabel}
      />
    </StyledView>
  );
};
