import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native'

import CartItem from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';
import { clearCart } from "../features/Cart/CartSlice";
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const {items: CartData, total} = useSelector((state) => state.cart.value)
  const [triggerPostOrder, result] = usePostOrderMutation()
  const userEmail = useSelector((state) => state.auth.value.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const onConfirmOrder = async () => {
    try {
      const orderNumber = generateOrderNumber();
      const orderData = {
        orderNumber,
        items: CartData,
        user: userEmail,
        total,
        createdAt: new Date().toISOString(),
      };
      await triggerPostOrder(orderData).unwrap();
      // Mostrar mensaje de éxito
      Alert.alert("Éxito", "Tu orden fue generada con éxito!");
      // Limpiar el carrito
      dispatch(clearCart());
      // Redirigir al screen de categorías
      navigation.navigate('Home');
    } catch (error) {
      // Manejar error si es necesario
      Alert.alert("Error", "Hubo un error al procesar la orden.");
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
        keyExtractor={(producto) => producto.id}
      />

      <View style={styles.totalContainer}>
        <Pressable style={styles.confirmButton} onPress={onConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirmar Orden</Text>
        </Pressable>
        <Text style={styles.totalText}>Total: $ {total}</Text>
      </View>
    </View>
  );
}

export default Cart

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 5,
    padding: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#f8320f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
