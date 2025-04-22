import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/libs/appwrite";
import { useGlobalContext } from "@/libs/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert(
        "Error",
        "Gagal Masuk. Silakan coba lagi atau periksa koneksi internet Anda."
      );
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-[65%]"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase text-black-200 font-rubik">
            Selamat Datang di Restate
          </Text>
          <Text className="mt-2 text-3xl text-center text-black-300 font-rubik-bold">
            Temukan Vila Impian Anda {"\n"}{" "}
            <Text className="text-primary-300">
              di Destinasi Terbaik Indonesia
            </Text>
          </Text>
          <View className="mt-8">
            <Text className="text-lg text-center font-rubik text-black-200">
              Masuk ke ReState dengan Google
            </Text>
            <TouchableOpacity
              className="w-full px-2 py-3 mt-5 text-center bg-white rounded-full shadow-md"
              onPress={handleLogin}
            >
              <View className="flex flex-row items-center justify-center">
                <Image source={icons.google} className="w-6 h-6" />
                <Text className="ml-2 text-lg font-rubik-medium text-black-300">
                  Lanjutkan dengan Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
