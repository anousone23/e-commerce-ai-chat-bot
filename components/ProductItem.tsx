import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { IProduct } from "@/types";
import { RelativePathString, router } from "expo-router";

export default function ProductItem({ product }: { product: IProduct }) {
  function handleProductPress() {
    router.push(`/products/${product.id}` as RelativePathString);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleProductPress}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>

      <View style={styles.footerContainer}>
        <Text style={styles.price}>{product.price}</Text>

        <Text style={styles.sold}>ขายแล้ว {product.sold}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 240,
    backgroundColor: colors.background,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  price: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  sold: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});
