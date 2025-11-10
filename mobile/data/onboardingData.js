import { Image } from "react-native";

const onboardingData = [
  {
    title: "Welcome to Bettar Shop",
    subtitle: "Discover amazing products and exclusive deals.",
    backgroundColor: "#fff",
    image: <Image source={require("../assets/images/onboard1.jpg")} />,
  },
  {
    title: "Easy Shopping Experience",
    subtitle: "Browse categories, add to cart, and checkout seamlessly.",
    backgroundColor: "#fff",
    image: <Image source={require("../assets/images/onboard2.jpg")} />,
  },
  {
    title: "Personalized Recommendations",
    subtitle: "Get product suggestions tailored to your preferences.",
    backgroundColor: "#fff",
    image: <Image source={require("../assets/images/onboard3.jpg")} />,
  },
];

export default onboardingData;
