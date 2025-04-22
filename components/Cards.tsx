import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({
  onPress,
  item: { image, rating, name, price, address },
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex flex-col bg-white rounded-lg items-star w-60 h-80"
    >
      <Image source={{ uri: image }} className="rounded-2xl size-full" />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 size-full rounded-2xl"
      />

      <View className="absolute gap-1 flex flex-row items-center px-[10px] py-1 rounded-full top-5 right-5 bg-white/90">
        <Image source={icons.star} className="size-5" />
        <Text className="text-primary-300 font-rubik-bold">{rating}</Text>
      </View>

      <View className="absolute left-0 flex flex-col items-start px-5 py-3 bottom-3 gap">
        <Text
          className="text-xl text-white font-rubik-extrabold"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-base text-white font-rubik">{address}</Text>
        <View className="flex flex-row items-center justify-between w-full gap-2 mt-1">
          <Text className="text-xl text-white font-rubik-extrabold">
            Rp. {price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({
  item: { image, rating, name, price, address },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      className="relative flex-1 w-full px-4 py-4 mt-5 bg-white rounded-lg shadow-sm shadow-black-100/50"
      onPress={onPress}
    >
      <View className="absolute z-50 flex flex-row items-center p-1 px-2 rounded-full top-5 right-5 bg-white/90">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-primary-300 font-rubik-bold ml-0.5">
          {rating}
        </Text>
      </View>

      <Image source={{ uri: image }} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base text-black-300 font-rubik-bold">{name}</Text>
        <Text className="text-xs font-rubik text-black-300">{address}</Text>
        <View className="flex flex-row items-center justify-between w-full gap-2 mt-1">
          <Text className="text-base font-rubik-bold text-primary-300">
            Rp. {price}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
