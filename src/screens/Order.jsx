import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from "react-native";
import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import OrderItem from "../components/OrderItem";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const Order = () => {
  const userEmail = useSelector((state) => state.auth.value.user);
  console.log(userEmail);
  const { data: OrderData, isLoading, isError, refetch } = useGetOrdersByUserQuery(userEmail);
  const navigation = useNavigation();

  useFocusEffect(
      useCallback(() => {
        refetch();
      }, [refetch])
    );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>There was an error fetching the orders.</Text>
        </View>
      );
    }

  return (
    <View>
      <FlatList
        data={OrderData}
        keyExtractor={(orderItem, index) => String(index)}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}>
            <OrderItem order={item} />
          </Pressable>
        )}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});
