import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { memo, useState } from "react";
import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

const Filters = memo(() => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          className={`px-4 py-2 mr-3 rounded-full ${
            selectedCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-100 "
          }`}
        >
          <Text
            className={`text-sm font-rubik-medium mt-0.5 ${
              selectedCategory === item.category
                ? "text-white font-rubik-bold"
                : "text-black-300"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
});

export default Filters;
