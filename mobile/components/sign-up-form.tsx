import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { SocialConnections } from "@/components/social-connections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/ui/CustomButton";
import { colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);

  const onEmailSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };

  const onSubmit = () => {
    console.log("Sign up pressed");
    // TODO: handle signup logic or navigation here
  };

  return (
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          {/* Email Field */}
          <View style={styles.fieldGroup}>
            <Label style={styles.label}>Email</Label>
            <Input
              ref={emailInputRef}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={onEmailSubmitEditing}
              style={styles.input}
            />
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <Label style={styles.label}>Password</Label>
            <Input
              ref={passwordInputRef}
              placeholder="••••••••"
              secureTextEntry
              returnKeyType="done"
              style={styles.input}
            />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <SocialConnections />
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.backgroundLight || "#F8F9FB",
  },
  card: {
    borderRadius: 20,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textDark || "#111827",
    textAlign: "center",
  },
  content: {
    gap: 24,
  },
  fieldGroup: {
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    color: colors.textMuted || "#6B7280",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  buttonText: {
    color: colors.backgroundLight || "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  socialContainer: {
    marginTop: 20,
  },
});
