import React from 'react';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';
import { Logo } from '../../../../ui/components/Logo';

export const ExploreScreen = () => {
  const { currentTheme } = useTheme();

  return (
    <ScreenTemplate className="items-center">
      <Logo source={currentTheme.logoMuted} className="w-40" />
    </ScreenTemplate>
  );
};
