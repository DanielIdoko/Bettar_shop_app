import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/ui/CustomButton";
import { colors } from "@/constants/colors";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Welcome = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/onboard1.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.highlight}>Bettar Shop</Text>
        </Text>
        <Text style={styles.subtitle}>
          Discover happiness in every deal — shop smarter, faster, and better.
        </Text>
      </View>

      {/* Action Button */}
      <CustomButton
        title="Get Started"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => onComplete()}
      />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  imageContainer: {
    width: width - 20,
    height: height * 0.55,
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.textDark,
    textAlign: "center",
  },
  highlight: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  buttonText: {
    color: colors.backgroundLight,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
