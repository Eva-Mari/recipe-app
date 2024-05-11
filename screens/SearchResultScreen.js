import { View, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { fetchSearchResults, fetchRecipesResults } from "../services/fetchData";
import {
  SearchResultCard,
  ReceptenResultCard,
} from "../components/CardRecipesResults";
import { LoadingComponent } from "../components/LoadingComponent";
import { LottieComponent } from "../components/LottieComponent";

export function SearchResultScreen({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [secondSearchResults, setSecondSearchResults] = useState([]);
  const [url, setUrl] = useState("https://recept.se/sok");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
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
          console.log("Search result screen Fetching data for url:", url);
          const results = await fetchSearchResults(url);
          const res = await fetchRecipesResults(
            "https://www.recepten.se/pages/search.xhtml?q=choklad"
          );

          if (isActive) {
            setSearchResults(results);
            setSecondSearchResults(res);

            //console.log(res);
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

  const retrieveLink = (value) => {
    console.log(value);
  };

  if (
    //Hur visa om inga recept har hittats på ett modulärt sätt? ||
    // !searchResults ||
    // !searchResults.recipes ||
    // !searchResults.recipes.result
    error
  ) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieComponent text="Inga recept hittades"></LottieComponent>
      </View>
    );
  }

  // return (
  //   <View style={{ flex: 1 }}>
  //     {loading ? (
  //       <LoadingComponent loadingText="Laddar recept" visible={loading} />
  //     ) : (
  //       searchResults.recipes && (
  //         <FlatList
  //           data={searchResults.recipes.result}
  //           renderItem={({ item }) => (
  //             <SearchResultCard
  //               recipe={item}
  //               retrieveSlugValue={retrieveSlugValue}
  //             />
  //           )}
  //           keyExtractor={(item) => item.id.toString()}
  //         />
  //       )
  //     )}
  //   </View>
  // );
  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <LoadingComponent loadingText="Laddar recept" visible={loading} />
      ) : (
        <>
          {searchResults.recipes && (
            <>
              {searchResults.recipes.result.map((item) => (
                <SearchResultCard
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
