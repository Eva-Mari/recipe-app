import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { fetchRecipe } from "../services/fetchData";
import { RecipeComponent } from "../components/CardComponentRecipe";

export const RecipesScreen = () => {
  const [scrapedData, setScrapedData] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const scriptData = await fetchRecipe(
          "https://recept.se/recept/kalljast-tomatbrod-med-brodkryddor-och-solrosfron"
        );
        setScrapedData(scriptData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndSetData();
  }, []);

  return (
    <ScrollView>
      {scrapedData && <RecipeComponent recipe_json={scrapedData} />}
    </ScrollView>
  );
};
