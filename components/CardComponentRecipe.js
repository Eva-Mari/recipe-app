import * as React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export const RecipeComponentReceptSE = ({ recipe_json }) => (
  <Card>
    <Card.Title title={recipe_json.name} subtitle={recipe_json.author.name} />
    <Card.Cover source={{ uri: recipe_json.image }} />
    <Card.Content>
      {
        // Not all recepies has a rating
        recipe_json.aggregateRating &&
          recipe_json.aggregateRating.ratingValue && (
            <StarRatingDisplay
              rating={recipe_json.aggregateRating.ratingValue}
            />
          )
      }
      <Text style={styles.description}>{recipe_json.description}</Text>
      <Text style={styles.sectionTitle}>Ingredienser:</Text>
      {recipe_json.recipeIngredient.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instruktioner:</Text>
      {recipe_json.recipeInstructions.map((instruction, index) => (
        <Text key={index} style={styles.instruction}>
          {`${index + 1}. ${instruction.text}`}
        </Text>
      ))}
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
});
