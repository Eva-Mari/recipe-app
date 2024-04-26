import React from 'react';
import { View, Text, Button } from 'react-native';
import { Chips } from '../components/Chips'

export function HomeScreen({ navigation }) {

    const data = ["vegetarian", "potatoes", "beans", "banana", "strawberry", "chicken", "pear"]
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Recipes')}
          title="Go to Recipes"
        />
        <Chips data={data} />
      </View>
    );
  }
  