import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/libs/global-provider";
import { logout } from "@/libs/appwrite";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  showArrow = true,
  textStyle,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View className="flex-row items-center justify-between mt-5">
          <View className="flex-row items-center gap-2">
            <Image source={icon} className="size-7" />
            <Text
              className={`text-lg text-black-200 font-rubik-medium ${textStyle}`}
            >
              {title}
            </Text>
          </View>
          {showArrow && <Image source={icons.rightArrow} className="size-5" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  console.log(user, "user profile");

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Logout", "Logout success");
      refetch();
    } else {
      Alert.alert("Logout", "Logout failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5 ">
          <View className="relative flex flex-col items-center mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="relative rounded-full size-44"
              resizeMode="center"
            />
            <TouchableOpacity className="absolute right-1 bottom-14">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="mt-2 text-2xl font-rubik-bold">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          {settings.slice(0, 2).map((item, index) => (
            <SettingsItem key={index} icon={item.icon} title={item.title} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Title"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
