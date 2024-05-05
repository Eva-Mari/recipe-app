import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { fetchRecipe } from "../services/fetchData";
import { useFocusEffect } from "@react-navigation/native";

import { RecipeComponent } from "../components/CardComponentRecipe";

export const RecipesScreen = ({ route }) => {
  const [scrapedData, setScrapedData] = useState(null);
  const [url, setUrl] = useState(
    "https://recept.se/recept/kalljast-tomatbrod-med-brodkryddor-och-solrosfron"
  );

  console.log("hello recipes");

  useEffect(() => {
    setUrl(route.params.url);
    console.log("Recipe url set to ", route.params.url);
    console.log(url);
  }, [route.params.url]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          console.log("Fetching data for url:", url);
          const scriptData = await fetchRecipe(url);

          if (isActive) {
            setScrapedData(scriptData);
          }
        } catch (error) {
          console.error("FETCH DATA ERROR!:", error);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [url])
  );

  return (
    <ScrollView>
      {scrapedData && <RecipeComponent recipe_json={scrapedData} />}
    </ScrollView>
  );
};
