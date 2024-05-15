import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "./screens/HomeScreen";
import { RecipesScreen } from "./screens/RecipesScreen";
import { SearchResultScreen } from "./screens/SearchResultScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Sök recept" }}
        />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          options={{ title: "Sökresultat" }}
        />
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ title: "Recept" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
