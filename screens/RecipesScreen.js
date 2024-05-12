import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { fetchRecipe, fetchRecipeDetails } from "../services/fetchData";
import { useFocusEffect } from "@react-navigation/native";

import { RecipeComponent } from "../components/CardComponentRecipe";
import { RecipeComponentRecepten } from "../components/CardComponentReceptenDetail";
import { LoadingComponent } from "../components/LoadingComponent";
import { LottieComponent } from "../components/LottieComponent";

export const RecipesScreen = ({ route }) => {
  const [scrapedData, setScrapedData] = useState(null);
  const [url, setUrl] = useState(
    "https://recept.se/recept/kalljast-tomatbrod-med-brodkryddor-och-solrosfron"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [method, setMethod] = useState(route.params.fetchDataMet);

  console.log("hello recipes");

  useEffect(() => {
    setUrl(route.params.url);
    setError(false);
    console.log("Recipe url set to ", route.params.url);
    console.log(url);
  }, [route.params.url]);

  useEffect(() => {
    setMethod(route.params.fetchDataMet);
    setError(false);

    console.log("this is method: ", method);
    console.log("route params: ", route.params);
  }, [route.params.fetchDataMet]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          setLoading(true);
          let scriptData = [];

          console.log("This is the method ", method);

          if (method === "recept.se") {
            console.log("Fetching data for url:", url);
            scriptData = await fetchRecipe(url);
          } else if (method === "recepten.se") {
            console.log(method, "not yet implemented");
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

  // return (
  //   <ScrollView>
  //     {loading ? (
  //       <LoadingComponent loadingText="Laddar recept" visible={loading} />
  //     ) : (
  //       scrapedData && <RecipeComponent recipe_json={scrapedData} />
  //     )}
  //   </ScrollView>
  // );

  console.log(scrapedData);
  return (
    <ScrollView>
      {loading ? (
        <LoadingComponent loadingText="Laddar recept" visible={loading} />
      ) : method === "recept.se" ? (
        scrapedData && <RecipeComponent recipe_json={scrapedData} />
      ) : (
        // Rendera en annan komponent för en annan metod
        <RecipeComponentRecepten recipe={scrapedData}></RecipeComponentRecepten>
      )}
    </ScrollView>
  );
};
