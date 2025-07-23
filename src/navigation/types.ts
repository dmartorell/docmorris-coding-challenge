import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const TAB_ROUTES_NAMES = {
  HOME: 'tab_home',
  CATEGORIES: 'tab_categories',
  EXPLORE: 'tab_explore',
  CART: 'tab_cart',
  USER: 'tab_user',
} as const;

export const SCREENS = {
  MAIN_TABS: 'MainTabs',
  HOME_TAB: 'HomeTab',
  CATEGORIES_TAB: 'CategoriesTab',
  EXPLORE_TAB: 'ExploreTab',
  CART_TAB: 'CartTab',
  USER_TAB: 'UserTab',
  HOME_SCREEN: 'HomeScreen',
  PRODUCT_LIST_SCREEN: 'ProductListScreen',
  PRODUCT_DETAIL_SCREEN: 'ProductDetailScreen',
  CATEGORIES_SCREEN: 'CategoriesScreen',
  MEDICATIONS_PRODUCT_LIST_SCREEN: 'MedicationsProductListScreen',
  EXPLORE_SCREEN: 'ExploreScreen',
  CART_SCREEN: 'CartScreen',
  CHECKOUT_SCREEN: 'CheckoutScreen',
  ORDER_CONFIRMATION_SCREEN: 'OrderConfirmationScreen',
  USER_SCREEN: 'UserScreen',
  USER_SETTINGS_SCREEN: 'UserSettingsScreen',
} as const;

export type HomeStackParamList = {
  [SCREENS.HOME_SCREEN]: undefined;
};

export type CategoriesStackParamList = {
  [SCREENS.CATEGORIES_SCREEN]: undefined;
};

export type ExploreStackParamList = {
  [SCREENS.EXPLORE_SCREEN]: undefined;
};

export type CartStackParamList = {
  [SCREENS.CART_SCREEN]: undefined;
  [SCREENS.CHECKOUT_SCREEN]: undefined;
};

export type UserStackParamList = {
  [SCREENS.USER_SCREEN]: undefined;
};

export type BottomTabParamList = {
  [SCREENS.HOME_TAB]: NavigatorScreenParams<HomeStackParamList>;
  [SCREENS.CATEGORIES_TAB]: NavigatorScreenParams<CategoriesStackParamList>;
  [SCREENS.EXPLORE_TAB]: NavigatorScreenParams<ExploreStackParamList>;
  [SCREENS.CART_TAB]: NavigatorScreenParams<CartStackParamList>;
  [SCREENS.USER_TAB]: NavigatorScreenParams<UserStackParamList>;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  typeof SCREENS.HOME_SCREEN
>;

export type CartScreenNavigationProp = NativeStackNavigationProp<
  CartStackParamList,
  typeof SCREENS.CART_SCREEN
>;
export type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  CartStackParamList,
  typeof SCREENS.CHECKOUT_SCREEN
>;
