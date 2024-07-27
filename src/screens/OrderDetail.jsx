import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity
 } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGetOrderByIdQuery } from '../services/shopServices';
import OrderItemDetail from '../components/OrderItemDetail';

const OrderDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { orderId } = route.params;
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>There was an error fetching the order details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Text style={styles.backButtonText}>Volver</Text>
    </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nº Order: {order.orderNumber}</Text>
        <Text style={styles.headerText}>Total: ${order.total}</Text>
        <Text style={styles.headerText}>Fecha: {new Date(order.createdAt).toLocaleString()}</Text>
      </View>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItemDetail item={item} />}
      />
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  backButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
});
