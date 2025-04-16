import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = () => {
  return (
    <TouchableOpacity>
      <View className="bg-red-500 text-white py-2 px-3 rounded-md">
        <Text className="text-white">Klik Saya</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
