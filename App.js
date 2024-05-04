import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "./screens/HomeScreen";
import { RecipesScreen } from "./screens/RecipesScreen";
import { SearchResultScreen } from "./screens/SearchResultScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
        />
        <Drawer.Screen name="Recipes" component={RecipesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
