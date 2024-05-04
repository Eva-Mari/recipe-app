import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { fetchSearchResults } from "../services/fetchData";
import { SearchResultCard } from "../components/CardRecipesResults";

export function SearchResultScreen() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = await fetchSearchResults("https://recept.se/sok?q=glass");
        setSearchResults(results);
      } catch (error) {
        console.error("FETCH DATA ERROR!:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>hello</Text>
      {searchResults.recipes && searchResults.recipes.result && (
        <FlatList
          data={searchResults.recipes.result}
          renderItem={({ item }) => {
            console.log("Rendering item:", item);
            return <SearchResultCard recipe={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
