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
  const [url, setUrl] = useState("https://recept.se/sok?q=");
  const [url2, setUrl2] = useState(route.params.receptenUrl);
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(false);
  //const [error2, setError2] = useState(false);
  console.log("This are all params ", route.params, "!!");

  useEffect(() => {
    setLoading(true);
    console.log("this are the route paramas ", route.params);
    setUrl(route.params.receptSeUrl);
    setUrl2(route.params.receptenUrl);

    //setError(false);
    //setError2(false);
    console.log("search recept.se url set to ", route.params.receptSeUrl);
    console.log("search recepten.se url set to ", route.params.receptenUrl);
  }, [route.params.receptSeUrl, route.params.receptenUrl]);

  console.log(route.params);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let isActive = true;
  //     //setSearchResults([]);

  //     const fetchData = async () => {
  //       try {
  //         setLoading(true);
  //         console.log("Search result screen Fetching data for url:", url);
  //         const [results, res] = await Promise.all([
  //           fetchSearchResults(url),
  //           fetchRecipesResults(
  //             "https://www.recepten.se/pages/search.xhtml?q=choklad"
  //           ),
  //         ]);

  //         if (isActive) {
  //           setSearchResults(results);
  //           setSecondSearchResults(res);

  //           console.log(searchResults);
  //         }
  //       } catch (error) {
  //         console.error("Search result error when loading data:", error);
  //         setError(true);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();

  //     return () => {
  //       isActive = false;
  //     };
  //   }, [url])
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Search result screen Fetching data for url:", url);
        const results = await fetchSearchResults(url);
        setSearchResults(results);
      } catch (error) {
        console.log("problem url: ", url);
        console.error("Search result error when loading data:", error);
        setSearchResults([]);
        //setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const fetchSecondData = async () => {
      try {
        setLoading(true);
        const secondResults = await fetchRecipesResults(
          url2
          //"https://www.recepten.se/pages/search.xhtml?q=choklad"
        );
        setSecondSearchResults(secondResults);
      } catch (error) {
        console.error("Search result error when loading second data:", error);
        setSecondSearchResults([]);
        //setError2(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSecondData();
  }, [url2]);

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
