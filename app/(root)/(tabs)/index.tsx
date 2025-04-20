import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/libs/global-provider";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center justify-between w-full">
            <View className="flex-row items-center ">
              <Image source={images.avatar} className="rounded-full size-12" />
              <View className="flex-col items-start ml-3">
                <Text className="text-black-100">Good Morning</Text>
                <Text className="text-lg font-rubik-medium">{user?.name}</Text>
              </View>
            </View>
            <View>
              <Image source={icons.bell} className="size-6" />
            </View>
          </View>
        </View>
        <Search />
        <View className="my-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            <Text className="text-base text-primary-300 font-rubik-bold">
              See All
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

