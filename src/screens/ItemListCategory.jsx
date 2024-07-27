import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../global/colors";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem.jsx";
import { useGetProductsByCategoryQuery } from "../services/shopServices.js";

const ItemListCategory = ({ navigation, route }) => {
  const [keyWord, setKeyword] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [error, setError] = useState("");

  const { category: categorySelected } = route.params;
  const {data: productsFetched, error: errorFetched, isLoading} = useGetProductsByCategoryQuery(categorySelected);
  useEffect(() => {
    const regexDigits = /\d/;
    const hasDigits = regexDigits.test(keyWord);
    if (hasDigits) {
      setError("Don't use digits");
      return;
    }

    const regexThreeOrMoreCharacters = /[a-zA-Z]{3,}/;
    const hasThreeOrMoreChar = regexThreeOrMoreCharacters.test(keyWord);

    if (!hasThreeOrMoreChar && keyWord.length) {
      setError("Escribe al menos 3 carácteres");
      return;
    }

    if(!isLoading){
    const productsFiter = productsFetched.filter((product) =>
      product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    );
    setProductsFiltered(productsFiter);
    setError("");
    }

  }, [keyWord, categorySelected, productsFetched, isLoading]);

  return (
    <View style={styles.flatListContainer}>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />
      {productsFiltered.length === 0 && !isLoading ? (
        <Text style={styles.noProductsText}>No se encontraron productos</Text>
        ) : (
          <FlatList
            data={productsFiltered}
            renderItem={({ item }) => (
              <ProductItem product={item} navigation={navigation} />
            )}
            keyExtractor={(producto) => producto.id}
          />
        )}
    </View>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.grey300,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  noProductsText: {
    fontSize: 18,
    color: colors.black,
    textAlign: "center",
    marginTop: 20,
  },
});
