import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";
import { Property } from "@/types/Property";

const Agent = ({ property }: Property) => {
  if (!property?.agent) return null;

  return (
    <View className="w-full mt-5 border-t border-primary-200 pt-7">
      <Text className="text-xl text-black-300 font-rubik-bold">Agent</Text>

      <View className="flex flex-row items-center justify-between mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: property?.agent.avatar }}
            className="rounded-full size-14"
          />

          <View className="flex flex-col items-start justify-center ml-3">
            <Text className="text-lg text-black-300 text-start font-rubik-bold">
              {property?.agent.name}
            </Text>
            <Text className="text-sm text-black-200 text-start font-rubik-medium">
              {property?.agent.email}
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center gap-3">
          <Image source={icons.chat} className="size-7" />
          <Image source={icons.phone} className="size-7" />
        </View>
      </View>
    </View>
  );
};

export default Agent;
