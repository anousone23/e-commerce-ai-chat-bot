import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";

import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { getPrompt } from "@/constants/prompt";
import { useChat } from "@/contexts/ChatContext";
import { products } from "@/libs/data";
import ai from "@/libs/gemini";
import { IMessage } from "@/types";
import { Type } from "@google/genai";

type ListFooterProps = {
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  scrollToEnd: () => void;
};

export default function ListFooterInput({
  setMessages,
  scrollToEnd,
}: ListFooterProps) {
  const { messages } = useChat();
  const [message, setMessage] = useState("");

  async function handleSendMessage() {
    if (!message.trim()) return;

    // add user message to messages
    const userMessage: IMessage = {
      id: uuid.v4(),
      text: message,
      sender: "user",
    };

    setMessage("");

    setMessages((prev) => [...prev, userMessage]);

    scrollToEnd();

    try {
      // add loading indicator
      const loadingMessage: IMessage = {
        id: "loading",
        text: "...",
        sender: "ai",
      };
      setMessages((prev) => [...prev, loadingMessage]);
      scrollToEnd();

      // send req to gemini
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage.text,
        config: {
          systemInstruction: getPrompt(products, messages),
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              products: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    brand: { type: Type.STRING },
                    name: { type: Type.STRING },
                    image: { type: Type.STRING },
                    description: { type: Type.STRING },
                    count: { type: Type.NUMBER },
                    price: { type: Type.NUMBER },
                    sold: { type: Type.NUMBER },
                  },
                  required: [
                    "id",
                    "brand",
                    "name",
                    "image",
                    "description",
                    "count",
                    "price",
                    "sold",
                  ],
                },
              },
              sender: {
                type: Type.STRING,
                enum: ["ai"],
              },
            },
            required: ["id", "text", "sender"],
          },
        },
      });

      // remove loading indicator after receive a response
      setMessages((prev) => prev.filter((message) => message.id !== "loading"));

      //  add AI message to messges
      const aiMessage: IMessage = JSON.parse(response.text as string);
      setMessages((prev) => [...prev, aiMessage]);
      scrollToEnd();
    } catch (error) {
      console.error("❌ AI error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "ขออภัย ระบบไม่สามารถให้คำแนะนำได้ในขณะนี้",
          sender: "ai",
        },
      ]);
    }

    setMessage("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ถามเกี่ยวกับสินค้า"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity onPress={handleSendMessage}>
        <Ionicons name="send" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontFamily: fonts.medium,
    color: colors.black,
    flex: 1,
  },
});
