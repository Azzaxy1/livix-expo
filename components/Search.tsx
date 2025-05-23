import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import icons from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";

const Search = () => {
  const params = useLocalSearchParams<{ query: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = useCallback(
    (text: string) => {
      setSearch(text);
      debouncedSearch(text);
    },
    [debouncedSearch]
  );

  return (
    <View className="flex flex-row items-center justify-between w-full py-2 mt-5 border rounded-lg bg-accent-100 border-primary-100 ">
      <View className="z-50 flex flex-row items-center justify-between flex-1 w-full px-3">
        <View className="flex flex-row gap-2">
          <Image source={icons.search} className="size-5" />
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search for anything"
            placeholderTextColor="#00000040"
            className="w-[90%] text-sm font-rubik text-black-300"
          />
        </View>
        {search ? (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Text className="size-5 text-black-200">X</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Image source={icons.filter} className="size-5 " />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Search;
