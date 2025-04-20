import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { featuredCards, cards } from "@/constants/data";
import { FlashList } from "@shopify/flash-list";

import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/libs/global-provider";
import Filters from "@/components/Filters";

const Index = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlashList
        data={cards}
        renderItem={({ item }) => (
          <View className="flex gap-5 mx-2">
            <Card {...item} />
          </View>
        )}
        estimatedItemSize={100}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponentStyle={{ display: "flex", gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center justify-between w-full">
                <View className="flex-row items-center ">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="rounded-full size-12"
                  />
                  <View className="flex-col items-start ml-3">
                    <Text className="text-black-100">Good Morning</Text>
                    <Text className="text-lg font-rubik-medium">
                      {user?.name}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image source={icons.bell} className="size-6" />
                </View>
              </View>
            </View>
            <Search />

            {/* Featured Section */}
            <View className="my-5 ">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base text-primary-300 font-rubik-bold">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Our Recommendation */}
            <View className="flex-row items-center justify-between gap-5">
              <FlashList
                data={featuredCards}
                horizontal
                estimatedItemSize={200}
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
                className="gap-5"
                renderItem={({ item }) => (
                  <View className="flex gap-10 mr-5">
                    <FeaturedCard {...item} />
                  </View>
                )}
              />
            </View>

            <View className="my-5 ">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base text-primary-300 font-rubik-bold">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>

            {/* <FlashList
          data={cards}
          estimatedItemSize={200}
          renderItem={({ item }) => (
            <View className="gap-10 mr-5">
            </View>
          )}
        /> */}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Index;

