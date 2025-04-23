import { View, Text, Image } from "react-native";
import React from "react";
import { Property } from "@/types/Property";
import { FlashList } from "@shopify/flash-list";

const Gallery = ({ property }: Property) => {
  return (
    <View className="flex flex-col gap-2 mt-5">
      <Text className="text-xl text-black-300 font-rubik-bold">Gallery</Text>
      <View className="flex flex-row flex-wrap items-start w-full ">
        {property?.gallery.length > 0 && (
          <View className="mt-7">
            <FlashList
              data={property?.gallery}
              renderItem={({ item }: { item: { image: string } }) => (
                <View className="flex flex-row items-center gap-5 mt-2">
                  <View className="px-2 py-3 ">
                    <Image
                      source={{ uri: item?.image }}
                      className="rounded-lg size-[100px]"
                    />
                  </View>
                </View>
              )}
              estimatedItemSize={100}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Gallery;
