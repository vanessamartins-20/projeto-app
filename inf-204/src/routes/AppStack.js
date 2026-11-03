

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabs from "./AppTabs";
import DetalhesUsuario from "../screens/DetalhesUsuario";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Principal"
        component={AppTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Detalhes"
        component={DetalhesUsuario}
      />
    </Stack.Navigator>
  );
}
