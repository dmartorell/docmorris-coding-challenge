import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const SCREENS = {
  // --- Tab Names ---
  HOME_TAB: 'HomeTab',
  CATEGORIES_TAB: 'CategoriesTab',
  EXPLORE_TAB: 'ExploreTab',
  CHART_TAB: 'ChartTab',
  USER_TAB: 'UserTab',
  // --- Screen Names  ---
  HOME: 'HomeScreen',
  PRODUCT_LIST: 'ProductListScreen',
  PRODUCT_DETAIL: 'ProductDetailScreen',
  CATEGORIES: 'CategoriesScreen',
  MEDICATIONS_PRODUCT_LIST: 'MedicationsProductListScreen',
  EXPLORE: 'ExploreScreen',
  CHART: 'ChartScreen',
  CHECKOUT: 'CheckoutScreen',
  ORDER_CONFIRMATION: 'OrderConfirmationScreen',
  USER: 'UserScreen',
  USER_SETTINGS: 'UserSettingsScreen',
} as const;

export type CategoriesStackParamList = {
  [SCREENS.CATEGORIES]: undefined;
  [SCREENS.MEDICATIONS_PRODUCT_LIST]: { categoryId: string };
  [SCREENS.PRODUCT_DETAIL]: { productId: string };
};

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
};

export type ExploreStackParamList = {
  [SCREENS.EXPLORE]: undefined;
};

export type ChartStackParamList = {
  [SCREENS.CHART]: undefined;
};

export type CheckoutStackParamList = {
  [SCREENS.CHECKOUT]: undefined;
};

export type OrderConfirmationStackParamList = {
  [SCREENS.ORDER_CONFIRMATION]: undefined;
};

export type UserStackParamList = {
  [SCREENS.USER]: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CategoriesTab: NavigatorScreenParams<CategoriesStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  ChartTab: NavigatorScreenParams<ChartStackParamList>;
  UserTab: NavigatorScreenParams<UserStackParamList>;
};
export type CategoriesScreenNavigationProp =
  NativeStackNavigationProp<
    CategoriesStackParamList,
    typeof SCREENS.CATEGORIES
  >;
export type MedicationsProductListScreenNavigationProp =
  NativeStackNavigationProp<
    CategoriesStackParamList,
    typeof SCREENS.MEDICATIONS_PRODUCT_LIST
  >;
export type ProductDetailScreenNavigationProp =
  NativeStackNavigationProp<
    CategoriesStackParamList,
    typeof SCREENS.PRODUCT_DETAIL
  >;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  typeof SCREENS.HOME
>;

export type ExploreScreenNavigationProp = NativeStackNavigationProp<
  ExploreStackParamList,
  typeof SCREENS.EXPLORE
>;

export type ChartScreenNavigationProp = NativeStackNavigationProp<
  ChartStackParamList,
  typeof SCREENS.CHART
>;

export type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  CheckoutStackParamList,
  typeof SCREENS.CHECKOUT
>;

export type OrderConfirmationScreenNavigationProp = NativeStackNavigationProp<
  OrderConfirmationStackParamList,
  typeof SCREENS.ORDER_CONFIRMATION
>;

export type UserScreenNavigationProp = NativeStackNavigationProp<
  UserStackParamList,
  typeof SCREENS.USER
>;
