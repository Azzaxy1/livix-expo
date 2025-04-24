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
          <FlashList
            data={property?.gallery}
            renderItem={({ item }: { item: { image: string } }) => (
              <View className="flex flex-row items-center gap-5 mt-2">
                <View className="py-3 pr-4">
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
        )}
      </View>
    </View>
  );
};

export default Gallery;
