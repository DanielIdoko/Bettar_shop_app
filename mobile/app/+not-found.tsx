import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/constants/colors";

const NotFoundPage = () => {
  return (
    <View>
      <Text>You're all caught up!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderCurve: "circular",
    padding: 10,
    backgroundColor: colors.cardBG,
    height: 100,
  },
  text: {
    fontSize: 14,
    color: colors.textPrimary,
  },
});

export default NotFoundPage;
