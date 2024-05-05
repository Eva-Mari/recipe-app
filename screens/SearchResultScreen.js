import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { fetchSearchResults } from "../services/fetchData";
import { SearchResultCard } from "../components/CardRecipesResults";

export function SearchResultScreen({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [url, setUrl] = useState("https://recept.se/sok");

  useEffect(() => {
    setUrl(route.params.url);
    console.log("search result url set to ", route.params.url);
  }, [route.params.url]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          console.log("Fetching data for url:", url);
          const results = await fetchSearchResults(url);

          if (isActive) {
            setSearchResults(results);
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

  const retrieveSlugValue = (value) => {
    const newUrl = "https://recept.se/recept/" + value;
    navigation.navigate("Recipes", { url: newUrl });
  };

  return (
    <View style={{ flex: 1 }}>
      {searchResults.recipes && searchResults.recipes.result && (
        <FlatList
          data={searchResults.recipes.result}
          renderItem={({ item }) => {
            return (
              <SearchResultCard
                recipe={item}
                retrieveSlugValue={retrieveSlugValue}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
