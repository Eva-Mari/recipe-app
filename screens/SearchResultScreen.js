import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { fetchSearchResults, fetchRecipesResults } from "../services/fetchData";
import {
  ReceptSEResultCard,
  ReceptenResultCard,
} from "../components/CardRecipesResults";
import { LoadingComponent } from "../components/LoadingComponent";
import { LottieComponent } from "../components/LottieComponent";

export function SearchResultScreen({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [secondSearchResults, setSecondSearchResults] = useState([]);
  const [receptSeUrl, setReceptSeUrl] = useState(route.params.receptSeUrl);
  const [receptenUrl, setReceptenUrl] = useState(route.params.receptenUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setReceptSeUrl(route.params.receptSeUrl);
    setReceptenUrl(route.params.receptenUrl);
  }, [route.params.receptSeUrl, route.params.receptenUrl]);

  console.log(route.params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await fetchSearchResults(receptSeUrl);
        setSearchResults(results);
      } catch (error) {
        console.error("Search result error when loading data:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [receptSeUrl]);

  useEffect(() => {
    const fetchSecondData = async () => {
      try {
        setLoading(true);
        const secondResults = await fetchRecipesResults(receptenUrl);
        setSecondSearchResults(secondResults);
      } catch (error) {
        console.error("Search result error when loading second data:", error);
        setSecondSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSecondData();
  }, [receptenUrl]);

  const retrieveSlugValue = (value) => {
    const newUrl = "https://recept.se/recept/" + value;
    navigation.navigate("Recipes", {
      url: newUrl,
      fetchDataMet: "recept.se",
    });
  };

  const retrieveLink = (value) => {
    console.log(value);
    navigation.navigate("Recipes", { url: value, fetchDataMet: "recepten.se" });
  };

  if (
    !loading &&
    searchResults &&
    searchResults.recipes &&
    searchResults.recipes.result === null &&
    secondSearchResults.length === 0
  ) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieComponent text="Inga recept hittades"></LottieComponent>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <LoadingComponent loadingText="Laddar recept" visible={loading} />
      ) : (
        <>
          {searchResults &&
            searchResults.recipes &&
            searchResults.recipes.result && (
              <>
                {searchResults.recipes.result.map((item) => (
                  <ReceptSEResultCard
                    key={item.id}
                    recipe={item}
                    retrieveSlugValue={retrieveSlugValue}
                  />
                ))}
              </>
            )}
          {secondSearchResults.length > 0 && (
            <>
              {secondSearchResults.map((item, index) => (
                <ReceptenResultCard
                  key={index}
                  recipe={item}
                  retrieveLink={retrieveLink}
                />
              ))}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}
