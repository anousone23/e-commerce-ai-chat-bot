import { colors } from "@/constants/colors";
import { ChatProvider } from "@/contexts/ChatContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSansThaiRegular: require("../assets/fonts/NotoSansThai-Regular.ttf"),
    NotoSansThaiMedium: require("../assets/fonts/NotoSansThai-Medium.ttf"),
    NotoSansThaiSemiBold: require("../assets/fonts/NotoSansThai-SemiBold.ttf"),
    NotoSansThaiBold: require("../assets/fonts/NotoSansThai-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <ChatProvider>
        <Stack>
          <Stack.Screen name="products" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <StatusBar
          backgroundColor={colors.primary}
          barStyle={"light-content"}
        />
      </ChatProvider>
    </>
  );
}
