import React from "react";
import { AuthContext } from "./context";
import { View, Text, Button } from "react-native";
export const Explore = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>You're logged in</Text>
      <Button title="SignOut" onPress={() => signOut()}></Button>
    </View>
  );
};
