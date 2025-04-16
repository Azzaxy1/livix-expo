import Button from "@/components/Button";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="items-center justify-center flex-1">
      <Button />
      <Text className="my-10 text-2xl text-red-500 font-rubik">
        Welcome to ReState
      </Text>
      <Text className="my-10 text-2xl font-bold text-primary-300">
        Welcome to ReState
      </Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}

