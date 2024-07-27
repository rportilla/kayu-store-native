import React, { useEffect, useState } from "react";

import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";


import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";


const ItemDetail = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");
  const [messageVisible, setMessageVisible] = useState(false);
  const { productoId: idSelected } = route.params;

  const dispatch = useDispatch()
  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected);

  // Landscape: Horisontal
  // Portraint: Vertical
  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const handleAddCart = () => {
    // agregar al carrito
    dispatch(addCartItem({...product, quantity: 1}));
    // Mostrar mensaje de confirmación
    setMessageVisible(true);
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
      setMessageVisible(false);
    }, 4000);
  }

    return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
            resizeMode="cover"
          />
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddCart}
            >
              <Text style={styles.buttonText}>Agregar al carro</Text>
            </TouchableOpacity>
            {messageVisible && (
              <Text style={styles.confirmationMessage}>
                Producto agregado al carrito
              </Text>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },

  textContainer: {
    flexDirection: "column",
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22
  },
  description:{
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
  confirmationMessage: {
    color: "blue",
    fontSize: 16,
    marginTop: 10,
    alignItems: "center",
  },
});
