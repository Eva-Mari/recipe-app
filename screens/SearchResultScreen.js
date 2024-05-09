import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { fetchSearchResults } from "../services/fetchData";
import { SearchResultCard } from "../components/CardRecipesResults";
import { LoadingComponent } from "../components/LoadingComponent";
import { LottieComponent } from "../components/LottieComponent";

export function SearchResultScreen({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [url, setUrl] = useState("https://recept.se/sok");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    setUrl(route.params.url);
    setError(false);
    console.log("search result url set to ", route.params.url);
  }, [route.params.url]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      //setSearchResults([]);

      const fetchData = async () => {
        try {
          setLoading(true);
          console.log("Fetching data for url:", url);
          const results = await fetchSearchResults(url);

          if (isActive) {
            setSearchResults(results);
          }
        } catch (error) {
          console.error("Search result error when loading data:", error);
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

  const retrieveSlugValue = (value) => {
    const newUrl = "https://recept.se/recept/" + value;
    navigation.navigate("Recipes", { url: newUrl });
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieComponent text="Fel uppstod"></LottieComponent>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <LoadingComponent loadingText="Laddar recept" visible={loading} />
      ) : (
        searchResults.recipes && (
          <FlatList
            data={searchResults.recipes.result}
            renderItem={({ item }) => (
              <SearchResultCard
                recipe={item}
                retrieveSlugValue={retrieveSlugValue}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      )}
    </View>
  );
}
