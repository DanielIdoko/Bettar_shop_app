import { Redirect, Tabs } from "expo-router";
import { View, Text } from "react-native";
import cn from "clsx";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react-native"; // vector icons
import { colors } from "@/constants/colors";
import { TabBarIconProps } from "@/types/type";
import { useAuthStore } from "@/store/authStore";

// TabBarIcon Component
const TabBarIcon = ({ focused, title, Icon }: TabBarIconProps) => (
  <View className="items-center justify-center space-y-1">
    <Icon
      size={24}
      strokeWidth={focused ? 2.5 : 2}
      color={focused ? colors.primary : colors.muted}
    />
    <Text
      className={cn(
        "text-xs font-poppins-medium",
        focused ? "text-primary" : "text-gray-400"
      )}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  // Protect routes — redirect if not logged in
  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 25,
          borderTopWidth: 1,
          borderTopColor: "#333",
          borderTopRightRadius: 25,
          marginHorizontal: 20,
          marginBottom: 25,
          height: 75,
          position: "absolute",
          backgroundColor: "#ffffff",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" Icon={Home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" Icon={Search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" Icon={ShoppingBag} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Wishlist" Icon={Heart} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" Icon={User} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
