import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { IMessage } from "@/types";
import { router } from "expo-router";
import ProductItem from "./ProductItem";

export default function MessageItem({ message }: { message: IMessage }) {
  const content =
    message.sender === "ai" ? (
      <>
        <View style={styles.aiContainer}>
          <View style={styles.aiAvatarContainer}>
            <MaterialCommunityIcons
              name="robot-excited-outline"
              size={24}
              color={colors.primary}
            />
          </View>

          <View style={styles.aiMessageContainer}>
            <Text style={styles.aiMessage}>{message.text}</Text>

            {message.products && message.products.length > 0 && (
              <>
                {message.products.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    onPress={() => router.push(`/products/${product.id}`)}
                  >
                    <ProductItem product={product} />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>
      </>
    ) : (
      <View style={styles.userContainer}>
        <View style={styles.userMessageContainer}>
          <Text style={styles.userMessage}>{message.text}</Text>
        </View>

        <View style={styles.userAvatarContainer}>
          <Feather name="user" size={24} color={colors.white} />
        </View>
      </View>
    );

  return content;
}

const styles = StyleSheet.create({
  aiContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    width: "70%",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: 8,
  },
  aiAvatarContainer: {
    backgroundColor: colors.secondaryBackground,
    padding: 4,
    elevation: 1,
    borderRadius: 999,
  },
  userAvatarContainer: {
    backgroundColor: colors.primary,
    padding: 4,
    elevation: 1,
    borderRadius: 999,
  },
  aiMessageContainer: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  userMessageContainer: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  aiMessage: {
    fontFamily: fonts.regular,
    color: colors.black,
  },
  userMessage: {
    fontFamily: fonts.regular,
    color: colors.white,
  },
});
