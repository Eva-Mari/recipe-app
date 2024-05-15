import * as React from "react";
import { Card, Text, Button } from "react-native-paper";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Image, View } from "react-native";

export const ReceptSEResultCard = ({ recipe, retrieveSlugValue }) => {
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

export const ReceptenResultCard = ({ recipe, retrieveLink }) => {
  const handlePress = () => {
    retrieveLink(recipe.slug);
  };
  return (
    <View>
      <Image
        source={{
          uri: recipe.image,
        }}
      />
      <Card>
        <Card.Title title={recipe.title}></Card.Title>
        <Card.Cover source={{ uri: recipe.image }} />
        <Card.Content>
          <Text>{recipe.description}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handlePress}>Gå till recept</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
