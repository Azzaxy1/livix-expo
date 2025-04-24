import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Property } from "@/types/Property";
import Comment from "./Comment";

const Rating = ({ property }: Property) => {
  return (
    <View className="flex flex-col mt-5">
      {property?.reviews.length > 0 && (
        <>
          <View className="flex flex-row justify-between w-full">
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-6" />
              <Text className="text-xl font-rubik-semibold text-black-300">
                {property?.rating}
              </Text>
              <Text className="text-xl font-rubik-semibold text-black-300">
                ({property?.reviews.length} reviews)
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-xl font-rubik-semibold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <Comment reviews={property?.reviews} />
        </>
      )}
    </View>
  );
};

export default Rating;
