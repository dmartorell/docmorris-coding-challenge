import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartItem } from '../features/cart/data/models';

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

// 3. Define Stack Parameter Lists
//    - Each type corresponds to a createNativeStackNavigator
//    - The keys are the screen names (from SCREENS object)
//    - The values are the parameters that screen can receive

export type HomeStackParamList = {
  [SCREENS.HOME_SCREEN]: undefined;
  [SCREENS.PRODUCT_LIST_SCREEN]: undefined;
  [SCREENS.PRODUCT_DETAIL_SCREEN]: { productId: string };
};

export type CategoriesStackParamList = {
  [SCREENS.CATEGORIES_SCREEN]: undefined;
  [SCREENS.MEDICATIONS_PRODUCT_LIST_SCREEN]: { categoryId: string };
  [SCREENS.PRODUCT_DETAIL_SCREEN]: { productId: string };
};

export type ExploreStackParamList = {
  [SCREENS.EXPLORE_SCREEN]: undefined;
  [SCREENS.PRODUCT_LIST_SCREEN]: undefined;
  [SCREENS.PRODUCT_DETAIL_SCREEN]: { productId: string };
};

export type CartStackParamList = {
  [SCREENS.CART_SCREEN]: undefined;
  [SCREENS.CHECKOUT_SCREEN]: { cartItems: CartItem[] };
  [SCREENS.ORDER_CONFIRMATION_SCREEN]: undefined;
};

export type UserStackParamList = {
  [SCREENS.USER_SCREEN]: undefined;
  [SCREENS.USER_SETTINGS_SCREEN]: undefined;
};

// 4. Define the Bottom Tab Navigator Parameter List
//    - Maps tab names (from SCREENS object) to their internal stack parameter lists
export type BottomTabParamList = {
  [SCREENS.HOME_TAB]: NavigatorScreenParams<HomeStackParamList>;
  [SCREENS.CATEGORIES_TAB]: NavigatorScreenParams<CategoriesStackParamList>;
  [SCREENS.EXPLORE_TAB]: NavigatorScreenParams<ExploreStackParamList>;
  [SCREENS.CART_TAB]: NavigatorScreenParams<CartStackParamList>;
  [SCREENS.USER_TAB]: NavigatorScreenParams<UserStackParamList>;
};

// 5. Define Individual Screen Navigation Props (for useNavigation hook)
//    - This ensures type safety when using navigation.navigate() or navigation.push()

// Home Stack Navigation Props
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  typeof SCREENS.HOME_SCREEN
>;
export type HomeProductListScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  typeof SCREENS.PRODUCT_LIST_SCREEN
>;

// Categories Stack Navigation Props
export type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  typeof SCREENS.CATEGORIES_SCREEN
>;
export type MedicationsProductListScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  typeof SCREENS.MEDICATIONS_PRODUCT_LIST_SCREEN
>;

// Explore Stack Navigation Props
export type ExploreScreenNavigationProp = NativeStackNavigationProp<
  ExploreStackParamList,
  typeof SCREENS.EXPLORE_SCREEN
>;
export type ExploreProductListScreenNavigationProp = NativeStackNavigationProp<
  ExploreStackParamList,
  typeof SCREENS.PRODUCT_LIST_SCREEN
>;

// Cart Stack Navigation Props (all part of the same flow)
export type CartScreenNavigationProp = NativeStackNavigationProp<
  CartStackParamList,
  typeof SCREENS.CART_SCREEN
>;
export type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  CartStackParamList,
  typeof SCREENS.CHECKOUT_SCREEN
>;
export type OrderConfirmationScreenNavigationProp = NativeStackNavigationProp<
  CartStackParamList,
  typeof SCREENS.ORDER_CONFIRMATION_SCREEN
>;

// User Stack Navigation Props
export type UserScreenNavigationProp = NativeStackNavigationProp<
  UserStackParamList,
  typeof SCREENS.USER_SCREEN
>;
export type UserSettingsScreenNavigationProp = NativeStackNavigationProp<
  UserStackParamList,
  typeof SCREENS.USER_SETTINGS_SCREEN
>;

// 6. Optional: Generic Screen Navigation & Route Props (for screens used in multiple stacks)
//    These help when a single component (like ProductDetailScreen) can be reached from various places.

export type ProductDetailScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList & CategoriesStackParamList & ExploreStackParamList,
  typeof SCREENS.PRODUCT_DETAIL_SCREEN
>;
export type ProductDetailScreenRouteProp = RouteProp<
  HomeStackParamList | CategoriesStackParamList | ExploreStackParamList,
  typeof SCREENS.PRODUCT_DETAIL_SCREEN
>;
