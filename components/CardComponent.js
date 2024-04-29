import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStar;

  return (
    <View style={styles.starRating}>
      {[...Array(filledStars)].map((_, index) => (
        <Icon key={index} name="star" size={20} color="gold" />
      ))}
      {halfStar === 1 && <Icon name="star-half-full" size={20} color="gold" />}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} name="star-o" size={20} color="gold" />
      ))}
    </View>
  );
};

export const RecipeComponent = ({ recipe_json }) => (
  <Card>
    <Card.Title title={recipe_json.name} subtitle={recipe_json.author.name} />
    <Card.Content>
      <Image
        source={{ uri: recipe_json.image }}
        style={{ width: 200, height: 200 }}
      />
      {recipe_json.aggregateRating &&
        recipe_json.aggregateRating.ratingValue && (
          <StarRating rating={recipe_json.aggregateRating.ratingValue} />
        )}
      <Text style={styles.description}>{recipe_json.description}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe_json.recipeIngredient.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe_json.recipeInstructions.map((instruction, index) => (
        <Text key={index} style={styles.instruction}>
          {`${index + 1}. ${instruction.text}`}
        </Text>
      ))}
      {console.log(recipe_json)}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  ingredient: {
    marginBottom: 5,
  },
  instruction: {
    marginBottom: 5,
    marginLeft: 10,
  },
  starRating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
