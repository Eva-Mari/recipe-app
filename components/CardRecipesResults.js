import * as React from "react";
import { Card, Text, Button } from "react-native-paper";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export const SearchResultCard = ({ recipe, retrieveSlugValue }) => {
  const handlePress = () => {
    retrieveSlugValue(recipe.slug);
  };
  return (
    <Card>
      <Card.Title title={recipe.media.description} />
      <Card.Cover source={{ uri: recipe.media.url }} />
      <Card.Content>
        <StarRatingDisplay rating={recipe.rating_avg} />
      </Card.Content>
      <Card.Actions>
        <Button onPress={handlePress}>Gå till recept</Button>
      </Card.Actions>
    </Card>
  );
};
