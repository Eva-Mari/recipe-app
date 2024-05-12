import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "./screens/HomeScreen";
import { RecipesScreen } from "./screens/RecipesScreen";
import { SearchResultScreen } from "./screens/SearchResultScreen";

//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
        />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
