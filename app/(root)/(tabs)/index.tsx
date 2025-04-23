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

import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/libs/global-provider";
import Filters from "@/components/Filters";
import { useAppwrite } from "@/libs/useAppwrite";
import { getLatestProperties, getProperties } from "@/libs/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import NoResults from "@/components/NoResults";

const Index = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [refreshing, setRefreshing] = useState(false);

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

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
          <View className="flex gap-5 mx-4">
            <Card item={item} onPress={() => handleCardPress(item.$id)} />
          </View>
        )}
        estimatedItemSize={100}
        numColumns={2}
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
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlashList
                  data={latestProperties}
                  horizontal
                  estimatedItemSize={200}
                  keyExtractor={(item) => item.$id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                  className="gap-5"
                  renderItem={({ item }) => (
                    <View className="flex gap-10 mr-5">
                      <FeaturedCard
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                      />
                    </View>
                  )}
                />
              )}
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
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Index;

