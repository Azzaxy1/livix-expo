import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import icons from "@/constants/icons";

interface TabIconProps {
  icon: any;
  title: string;
  focused: boolean;
}

const TabIcon = ({ icon, title, focused }: TabIconProps) => {
  return (
    <View className="flex-col items-center justify-center flex-1 mt-3">
      <Image
        source={icon}
        className="size-6"
        tintColor={focused ? "#0061ff" : "#666876"}
        resizeMode="contain"
      />
      <View>
        <Text
          className={`${
            focused
              ? "text-primary-300 font-rubik-medium "
              : "text-black-200 font-rubik  w-full text-center mt-1"
          } text-xs w-full text-center mt-1`}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
