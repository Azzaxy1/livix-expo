import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import { ExploreCard } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import Filters from "@/components/Filters";
import { useAppwrite } from "@/libs/useAppwrite";
import { getProperties } from "@/libs/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import NoResults from "@/components/NoResults";
import images from "@/constants/images";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [refreshing, setRefreshing] = useState(false);
  console.log("params", params);

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) =>
    router.push({ pathname: "/(root)/(tabs)/profile", params: { id } });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlashList
        data={properties}
        renderItem={({ item }) => (
          <View className="flex gap-5 mx-4 my-2">
            <ExploreCard
              item={item}
              onPress={() => handleCardPress(item.$id)}
            />
          </View>
        )}
        estimatedItemSize={100}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponentStyle={{ display: "flex", gap: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center justify-between w-full ">
                <TouchableOpacity
                  className="p-2 rounded-full bg-primary-200"
                  onPress={() => router.back()}
                >
                  <Image source={icons.backArrow} className="size-6" />
                </TouchableOpacity>
                <Text className="text-xl font-rubik-medium text-black-300">
                  Search for Your Ideal Home
                </Text>
                <Image source={icons.bell} className="size-6" />
              </View>
            </View>
            <Search />

            <View className="my-5 ">
              <Filters />
            </View>
            <View>
              <Text className="text-xl font-rubik-bold text-black-300">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
