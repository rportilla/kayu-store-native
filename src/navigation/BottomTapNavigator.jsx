import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import MyProfileStackNavigator from "./MyProfileStackNavigator";

import Header from '../components/Header'
import { colors } from '../global/colors'
import { useSelector } from 'react-redux';

import { FontAwesome5 } from "@expo/vector-icons";


const Tab = createBottomTabNavigator()

const BottomTapNavigator = () => {
  const cartItems = useSelector((state) => state.cart.value.items);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'green',
      })}
    >
      <Tab.Screen
        name="Categorías"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? "red" : colors.lightBlack}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Carro"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="shopping-cart"
                  size={24}
                  color={focused ? "red" : colors.lightBlack}
                />
                {getTotalItems() > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Órdenes"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="receipt"
                  size={24}
                  color={focused ? "red" : colors.lightBlack}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi cuenta"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="user-alt"
                  size={24}
                  color={focused ? "red" : colors.lightBlack}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTapNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 60
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#f8320f',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
})
