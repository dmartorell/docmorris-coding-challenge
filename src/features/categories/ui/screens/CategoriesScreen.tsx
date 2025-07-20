import React from 'react';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { ScreenTemplate } from '../../../../ui/templates/ScreenTemplate';
import { Logo } from '../../../../ui/components/Logo';

export const CategoriesScreen = () => {
  const { currentTheme } = useTheme();
  return (
    <ScreenTemplate className="items-center">
      <Logo source={currentTheme.logoMuted} className="w-40" />
    </ScreenTemplate>
  );
};
