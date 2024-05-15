import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { fetchRecipe, fetchRecipeDetails } from "../services/fetchData";
import { useFocusEffect } from "@react-navigation/native";

import { RecipeComponentReceptSE } from "../components/CardComponentRecipe";
import { RecipeComponentRecepten } from "../components/CardComponentReceptenDetail";
import { LoadingComponent } from "../components/LoadingComponent";
import { LottieComponent } from "../components/LottieComponent";

export const RecipesScreen = ({ route }) => {
  const [scrapedData, setScrapedData] = useState(null);
  const [url, setUrl] = useState(route.params.url);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [method, setMethod] = useState(route.params.fetchDataMet);

  useEffect(() => {
    setUrl(route.params.url);
    setMethod(route.params.fetchDataMet);
    setError(false);
  }, [route.params.url, route.params.fetchDataMet]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          setLoading(true);
          let scriptData = [];

          if (method === "recept.se") {
            scriptData = await fetchRecipe(url);
          } else if (method === "recepten.se") {
            scriptData = await fetchRecipeDetails(url);
          }

          if (isActive) {
            setScrapedData(scriptData);
          }
        } catch (error) {
          console.error("Recipe screen error when fetching data:", error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [url, method])
  );

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieComponent text="Fel uppstod vid hämtning av receptet"></LottieComponent>
      </View>
    );
  }

  return (
    <ScrollView>
      {loading ? (
        <LoadingComponent loadingText="Laddar recept" visible={loading} />
      ) : method === "recept.se" ? (
        scrapedData && <RecipeComponentReceptSE recipe_json={scrapedData} />
      ) : (
        // Rendera en annan komponent för en annan metod
        <RecipeComponentRecepten recipe={scrapedData}></RecipeComponentRecepten>
      )}
    </ScrollView>
  );
};
