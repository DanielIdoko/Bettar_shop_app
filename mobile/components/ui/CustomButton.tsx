import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/types/type";
import { colors } from "@/constants/colors";

const CustomButton = ({
  onPress,
  title,
  style,
  textStyle,
  rightIcon,
  isLoading = false,
  ...props 
}: CustomButtonProps & { [key: string]: any }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          padding: 10,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              ...textStyle,
            }}
          >
            {title}
          </Text>
        )}
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
