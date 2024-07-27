import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderItemDetail = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Producto: {item.title}</Text>
      <Text style={styles.itemText}>Marca: {item.brand}</Text>
      <Text style={styles.itemText}>Cantidad: {item.quantity}</Text>
      <Text style={styles.itemText}>Precio: ${item.price}</Text>
    </View>
  );
};

export default OrderItemDetail;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});
