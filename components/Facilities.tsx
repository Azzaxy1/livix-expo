import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";
import { facilities } from "@/constants/data";

interface Props {
  property: Models.Document | null;
}

const Facilities = ({ property }: Props) => {
  console.log(property, "property facilities");
  if (!property) return null;

  return (
    <View className="flex flex-col gap-2 mt-5">
      <Text className="text-xl font-rubik-bold text-black-300">Facilities</Text>

      {property?.facilities.length > 0 && (
        <View className="flex flex-row flex-wrap items-start gap-10 ">
          {property.facilities.map((item: string, index: number) => {
            const facility = facilities.find(
              (facility) => facility.title === item
            );
            return (
              <View key={index} className="flex flex-row items-center gap-5">
                <View className="flex flex-col items-center gap-2 ">
                  <View className="px-3 py-3 rounded-full bg-primary-100 w-fit">
                    <Image
                      source={facility ? facility.icon : icons.info}
                      className="size-9"
                    />
                  </View>
                  <Text className="text-sm font-rubik-medium text-black-300">
                    {facility ? facility.title : "Unknown"}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Facilities;
