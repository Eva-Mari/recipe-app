import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from './screens/HomeScreen'
import { RecipesScreen } from './screens/RecipesScreen'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Recipes" component={RecipesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}