import * as React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const RecipeComponentRecepten = ({ recipe }) => (
  <Card>
    {recipe && (
      <>
        <Card.Title title={recipe.title || ""} />
        {recipe.firstImage && (
          <Card.Cover source={{ uri: recipe.firstImage }} />
        )}
        <Card.Content>
          <Text style={styles.sectionTitle}>Ingredienser:</Text>
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                {ingredient}
              </Text>
            ))}
          <Text style={styles.sectionTitle}>Instruktioner:</Text>
          {recipe.instructions &&
            recipe.instructions.map((instruction, index) => (
              <Text key={index} style={styles.instruction}>
                {`${index + 1}. ${instruction}`}
              </Text>
            ))}
        </Card.Content>
      </>
    )}
  </Card>
);
// <Card>
//   <Card.Title title={recipe.title} />
//   <Card.Cover source={{ uri: recipe.firstImage }} />
//   <Card.Content>
//     <Text style={styles.sectionTitle}>Ingredienser:</Text>
//     {recipe.ingredients.map((ingredient, index) => (
//       <Text key={index} style={styles.ingredient}>
//         {ingredient}
//       </Text>
//     ))}
//     <Text style={styles.sectionTitle}>Instruktioner:</Text>
//     {recipe.instructions.map((instruction, index) => (
//       <Text key={index} style={styles.instruction}>
//         {`${index + 1}. ${instruction}`}
//       </Text>
//     ))}
//   </Card.Content>
// </Card>

const styles = StyleSheet.create({
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
