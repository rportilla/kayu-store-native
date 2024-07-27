import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from "../screens/Order";
import OrderDetail from '../screens/OrderDetail';

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OrderScreen" component={Order} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

export default OrderStackNavigator;
