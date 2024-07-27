import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';

import { Entypo } from "@expo/vector-icons";
import { colors } from '../global/colors';
import { removeCartItem } from "../features/Cart/CartSlice";

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const handleRemoveItem = (itemId) => {
   dispatch(removeCartItem(itemId));
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {cartItem.title} x {cartItem.quantity}
        </Text>
        <Text>{cartItem.brand}</Text>
        <Text>${cartItem.price}</Text>
      </View>
    <Entypo name="trash" size={30} color="black" onPress={() => handleRemoveItem(cartItem.id)}/>
    </View>
  );
}

export default CartItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.gray100,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 19,
    color: "black",
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 14,
    color: colors.green900,
  },
});
