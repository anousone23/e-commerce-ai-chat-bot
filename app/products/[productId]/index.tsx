import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { getProductById } from "@/libs/data";
import { IProduct } from "@/types";
import { router, useLocalSearchParams } from "expo-router";

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();

  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    function fetchProduct() {
      const p = getProductById(productId as string);

      setProduct(p);
    }

    fetchProduct();
  }, [productId]);

  function handleBackIconPress() {
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={handleBackIconPress}
        >
          <Ionicons name="arrow-back-outline" size={20} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.separater}></View>

      <Text style={styles.name}>
        {product?.brand} {product?.name}
      </Text>

      <View style={styles.separater}></View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>รายละเอียด</Text>
        <Text style={styles.description}>{product?.description}</Text>
      </View>

      <View style={styles.buyButtonContainer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>ซื้อสินค้า</Text>
          <Text style={styles.buyButtonText}>฿{product?.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },
  separater: {
    height: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 340,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  backIconContainer: {
    backgroundColor: colors.background,
    position: "absolute",
    padding: 8,
    borderRadius: 999,
    top: 8,
    left: 8,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 8,
  },
  description: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  buyButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    right: 128,
  },
  buyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    gap: 8,
  },
  buyButtonText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
});
