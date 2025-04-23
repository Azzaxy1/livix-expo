import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";
import { Property } from "@/types/Property";

const Agent = ({ property }: Property) => {
  if (!property?.agent) return null;

  return (
    <View className="px-5 py-4 mt-5 bg-white rounded-lg shadow-sm shadow-black-100/50">
      <Text className="text-xl font-rubik-semibold text-black-300">Agent</Text>
      <View className="flex flex-row items-center gap-3 mt-2">
        <Image
          source={{ uri: property?.agent?.avatar }}
          className="rounded-full size-[60px]"
        />

        <View>
          <Text className="text-lg font-rubik-semibold text-black-300">
            {property?.agent?.name}
          </Text>
          <Text className="text-base font-rubik text-black-200">
            {property?.agent?.email}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-3 ml-auto">
          <Image source={icons.chat} className="size-6" />
          <Image source={icons.phone} className="size-6" />
        </View>
      </View>
    </View>
  );
};

export default Agent;
