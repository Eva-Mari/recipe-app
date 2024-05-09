import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { fetchRecipe } from "../services/fetchData";
import { useFocusEffect } from "@react-navigation/native";

import { RecipeComponent } from "../components/CardComponentRecipe";
import { LoadingComponent } from "../components/LoadingComponent";
import { LottieComponent } from "../components/LottieComponent";

export const RecipesScreen = ({ route }) => {
  const [scrapedData, setScrapedData] = useState(null);
  const [url, setUrl] = useState(
    "https://recept.se/recept/kalljast-tomatbrod-med-brodkryddor-och-solrosfron"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log("hello recipes");

  useEffect(() => {
    //setScrapedData([]); ----> ha kvar?
    setUrl(route.params.url);
    setError(false);
    console.log("Recipe url set to ", route.params.url);
    console.log(url);
  }, [route.params.url]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          setLoading(true);
          console.log("Fetching data for url:", url);
          const scriptData = await fetchRecipe(url);

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
    }, [url])
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
      ) : (
        scrapedData && <RecipeComponent recipe_json={scrapedData} />
      )}
    </ScrollView>
  );
};
