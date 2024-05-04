import * as React from "react";
import { Card, Text, Button } from "react-native-paper";

export const SearchResultCard = ({ recipe }) => {
  const handlePress = () => {
    console.log(recipe.slug);
  };
  return (
    <Card>
      <Card.Title title={recipe.media.description} />
      <Card.Cover source={{ uri: recipe.media.url }} />
      <Card.Content>
        <Text>{recipe.rating_avg}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handlePress}>Gå till recept</Button>
      </Card.Actions>
    </Card>
  );
};
