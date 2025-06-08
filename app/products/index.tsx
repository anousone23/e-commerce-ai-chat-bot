import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ListFooterInput from "@/components/ListFooterInput";
import MessageItem from "@/components/MessageItem";
import ProductItem from "@/components/ProductItem";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { useChat } from "@/contexts/ChatContext";
import { products } from "@/libs/data";

export default function ProductsScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetFlatListRef = useRef<BottomSheetFlatListMethods>(null);

  const { messages, setMessages } = useChat();

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // filter product by search
  let displayedProduct = products;

  displayedProduct = search
    ? displayedProduct.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  // handle open & close bottom sheet
  function scrollToEnd() {
    setTimeout(() => {
      bottomSheetFlatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
    setIsOpen(true);

    scrollToEnd();
  }

  function handleCloseBottomSheet() {
    setIsOpen(false);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.textInputContainer}>
        <Feather
          name="search"
          size={20}
          color={colors.black}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="ค้นหา..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={displayedProduct}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} />}
        contentContainerStyle={{ rowGap: 8 }}
        columnWrapperStyle={{ columnGap: 8 }}
        style={styles.flatList}
        numColumns={2}
      />

      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["75%"]}
          index={0}
          enableDynamicSizing={false}
          onClose={handleCloseBottomSheet}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
              opacity={0.2}
            />
          )}
        >
          <BottomSheetFlatList
            ref={bottomSheetFlatListRef}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 20,
              rowGap: 20,
            }}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageItem message={item} />}
            ListFooterComponent={() => (
              <View style={{ marginBottom: 40 }}></View>
            )}
          />

          <View style={{ marginBottom: 20 }}>
            <ListFooterInput
              setMessages={setMessages}
              scrollToEnd={scrollToEnd}
            />
          </View>
        </BottomSheet>
      )}

      {!isOpen && (
        <TouchableOpacity
          style={styles.chatIconContainer}
          onPress={handleOpenBottomSheet}
        >
          <MaterialCommunityIcons
            name="robot-excited-outline"
            size={32}
            color={colors.primary}
          />
        </TouchableOpacity>
      )}

      {/* <TouchableOpacity
        style={styles.endChatContainer}
        onPress={handleCloseBottomSheet}
      >
        <Text style={styles.endChatText}>สิ้นสุดการสนทนา</Text>
      </TouchableOpacity> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    position: "relative",
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    position: "relative",
    paddingVertical: 28,
  },
  textInput: {
    fontFamily: fonts.medium,
    color: colors.black,
    width: "90%",
    paddingHorizontal: 8,
    elevation: 3,
    borderRadius: 4,
    backgroundColor: colors.background,
    paddingRight: 40,
  },
  searchIcon: {
    position: "absolute",
    right: 28,
    bottom: 40,
    zIndex: 1,
  },
  flatList: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  chatIconContainer: {
    backgroundColor: "#f8fafc",
    padding: 8,
    borderRadius: 999,
    elevation: 3,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  endChatContainer: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    elevation: 3,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  endChatText: {
    fontFamily: fonts.medium,
    color: colors.white,
  },

  // bottom sheet styles
});
