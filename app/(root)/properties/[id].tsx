import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import React from "react";
import { useAppwrite } from "@/libs/useAppwrite";
import { getPropertyById } from "@/libs/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";
import Agent from "@/components/Agent";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Rating from "@/components/Rating";
import { convertToRupiah } from "@/libs/utils";

const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: { id },
  });

  const windowHeight = Dimensions.get("window").height;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white ">
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 z-40 w-full "
          />
          <View
            className="absolute z-50 inset-x-7"
            style={{ top: Platform.OS === "ios" ? 70 : 20 }}
          >
            <View className="flex flex-row items-center justify-between w-full ">
              <TouchableOpacity onPress={() => router.back()}>
                <Image source={icons.backArrow} className="size-7" />
              </TouchableOpacity>
              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor="#191d31"
                />
                <Image
                  source={icons.send}
                  className="size-7"
                  tintColor="#191d31"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex gap-2 px-5 mt-5">
          <Text className="text-2xl font-rubik-bold text-black-300">
            {property?.name}
          </Text>

          <View className="flex flex-row items-center gap-2 mt-2">
            <View className="px-3 py-2 rounded-full bg-primary-100 w-fit">
              <Text className="text-primary-300 font-rubik-bold">
                {property?.type}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-1">
              <Image source={icons.star} />
              <Text className="text-base text-black-200 font-rubik-medium">
                {property?.rating}
              </Text>
              <Text className="text-base text-black-200 font-rubik-medium">
                ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-5 mt-2">
            <View className="flex flex-row items-center gap-2">
              <View className="px-3 py-3 rounded-full bg-primary-100 w-fit">
                <Image source={icons.bed} className="size-5" />
              </View>
              <Text className="text-base font-rubik-semibold text-black-300">
                {property?.bedrooms} Beds
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <View className="px-3 py-3 rounded-full bg-primary-100 w-fit">
                <Image source={icons.bath} className="size-5" />
              </View>
              <Text className="text-base font-rubik-semibold text-black-300">
                {property?.bathrooms} Bath
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <View className="px-3 py-3 rounded-full bg-primary-100 w-fit">
                <Image source={icons.area} className="size-5" />
              </View>
              <Text className="text-base font-rubik-semibold text-black-300">
                {property?.area} sq ft
              </Text>
            </View>
          </View>

          <View>
            <Agent property={property} />
          </View>

          <View className="flex flex-col gap-2 mt-5">
            <Text className="text-xl font-rubik-bold text-black-300">
              Description
            </Text>
            <Text className="text-base text-black-200 font-rubik">
              {property?.description}
            </Text>
          </View>

          <Facilities property={property} />

          <Gallery property={property} />

          <Location property={property} />

          <Rating property={property} />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 z-50 flex flex-row items-center justify-between w-full px-5 h-[110px] bg-white border-t border-l border-r border-primary-200 rounded-t-[36px]">
        <View className="flex flex-col">
          <Text className="text-base tracking-[2px] uppercase text-black-200 font-rubik-medium">
            Price
          </Text>
          <Text className="text-2xl text-primary-300 font-rubik-semibold">
            {convertToRupiah(property?.price)}
          </Text>
        </View>
        <TouchableOpacity className="items-center px-12 py-4 rounded-full bg-primary-300">
          <Text className="text-lg text-white font-rubik-bold">
            Booking Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Property;
