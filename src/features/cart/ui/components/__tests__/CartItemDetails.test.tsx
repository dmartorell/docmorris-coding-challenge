import React from 'react';
import { render } from '@testing-library/react-native';
import { CartItemDetails } from '../CartItemDetails';

jest.mock('../../../../../ui/components/Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

describe('CartItemDetails', () => {
  it('renders brand and tagLine', () => {
    const { getByText } = render(
      <CartItemDetails brand="Bayer" tagLine="Pain Relief" />,
    );
    expect(getByText('Bayer')).toBeTruthy();
    expect(getByText('Pain Relief')).toBeTruthy();
  });

  it('renders volume when provided', () => {
    const { getByText } = render(
      <CartItemDetails brand="Bayer" tagLine="Pain Relief" volume="100ml" />,
    );
    expect(getByText('100ml')).toBeTruthy();
  });

  it('does not render volume when not provided', () => {
    const { queryByText } = render(
      <CartItemDetails brand="Bayer" tagLine="Pain Relief" />,
    );
    expect(queryByText('100ml')).toBeNull();
  });
});
