import React from 'react';
import { View, Text, Button } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Recipes')}
          title="Go to Recipes"
        />
      </View>
    );
  }
  