import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { fetchSearchResults } from "../services/fetchData";
import { SearchResultCard } from "../components/CardRecipesResults";
import { LoadingComponent } from "../components/LoadingComponent";

export function SearchResultScreen({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [url, setUrl] = useState("https://recept.se/sok");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchResults([]);
    setUrl(route.params.url);
    console.log("search result url set to ", route.params.url);
  }, [route.params.url]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setSearchResults([]);

      const fetchData = async () => {
        try {
          setLoading(true);
          setSearchResults([]);
          console.log("Fetching data for url:", url);
          const results = await fetchSearchResults(url);

          if (isActive) {
            setSearchResults(results);
          }
        } catch (error) {
          console.error("FETCH DATA ERROR!:", error);
          // set some error component
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
