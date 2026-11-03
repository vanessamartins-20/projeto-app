
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/routes/AppStack.js";

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

