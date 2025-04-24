import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Property } from "@/types/Property";
import images from "@/constants/images";

const Location = ({ property }: Property) => {
  return (
    <View className="flex flex-col gap-2 ">
      <Text className="text-xl text-black-300 font-rubik-bold">Location</Text>

      <View className="flex flex-row flex-wrap items-start w-full">
        <View className="flex flex-row items-center gap-5 mt-2">
          <View className="flex flex-row items-center gap-2 py-3 pr-2">
            <Image source={icons.location} className="size-6" />
            <Text className="text-base text-black-200 font-rubik-medium">
              {property?.address}
            </Text>
          </View>
        </View>

        <View className="gap-5 mt-2">
          <Image
            source={images.map}
            className="rounded-lg size-[340px] h-[200px]"
          />
        </View>
      </View>
    </View>
  );
};

export default Location;
