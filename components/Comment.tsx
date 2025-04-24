import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import { FlashList } from "@shopify/flash-list";
import icons from "@/constants/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Comment = ({ reviews }: { reviews: Models.Document[] }) => {
  return (
    <View>
      <FlashList
        data={reviews}
        estimatedItemSize={100}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.$id}
        className="h-48"
        renderItem={({ item }) => (
          <View className="gap-4 p-4 my-3 mr-4 bg-white rounded-lg shadow-sm w-72 shadow-black-100/50">
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: item.avatar }}
                className="rounded-full w-14 h-14"
              />
              <Text className="ml-3 text-base text-black-300 text-start font-rubik-bold">
                {item.name}
              </Text>
            </View>
            <Text className="mt-2 text-base text-black-200 font-rubik">
              {item.review}
            </Text>
            <View className="flex flex-row items-center justify-between w-full mt-2">
              <View className="flex flex-row items-center">
                <Image
                  source={icons.heart}
                  className="w-5 h-5"
                  tintColor={"#0061FF"}
                />
                <Text className="ml-2 text-sm text-black-300 font-rubik-medium">
                  120
                </Text>
              </View>
              <Text className="text-sm text-black-100 font-rubik">
                {dayjs(item.$createdAt).fromNow()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Comment;
