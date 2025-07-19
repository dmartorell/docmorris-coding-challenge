import React from 'react';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { Logo } from '../../../../ui/components/Logo';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';

export const CartScreen = () => {
  const { currentTheme } = useTheme();

  return (
    <ScreenTemplate>
      <Logo source={currentTheme.logoMuted} className="w-40" />
    </ScreenTemplate>
  );
};
