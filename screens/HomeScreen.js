import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Keyboard } from "react-native";
import { Chips } from "../components/Chips";
import { Searchbar } from "react-native-paper";

export function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [receptSeUrl, setreceptSeUrl] = React.useState("https://recept.se/sok"); //vad ska skickas till annan sida om flera hemsidor skrapas?
  const [receptenUrl, setreceptenUrl] = React.useState(
    "https://www.recepten.se/pages/search.xhtml?q="
  );

  useEffect(() => {
    const encodedQuery = encodeURI(searchQuery);
    setreceptSeUrl(`https://recept.se/sok?q=${encodedQuery}`);
    setreceptenUrl(
      `https://www.recepten.se/pages/search.xhtml?q=${encodedQuery}`
    );
  }, [searchQuery]);

  // useEffect(() => {
  //   if (selectedCategory) {
  //     setreceptSeUrl(
  //       `https://recept.se/sok?q=${searchQuery}&${selectedCategory}`
  //     );
  //   } else {
  //     setreceptSeUrl(`https://recept.se/sok?q=${searchQuery}`);
  //   }
  // }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setSearchQuery("");
      Keyboard.dismiss();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearch = () => {
    console.log("navigating handle search");
    navigation.navigate("SearchResultScreen", {
      urls: {
        receptSeUrl: receptSeUrl,
        receptenUrl: receptenUrl,
      },
    });
  };

  const changeQuery = (value) => {
    console.log("navigating change query");
    const updatedReceptSeUrl = `https://recept.se/sok?q=${searchQuery}&${value}`;
    setreceptSeUrl(updatedReceptSeUrl);
    navigation.navigate("SearchResultScreen", {
      receptSeUrl: receptSeUrl,
      receptenUrl: receptenUrl,
    });
  };

  const data = [
    { label: "Bak & dessert", value: "tags=huvudkategori:1" },
    { label: "Dryck", value: "tags=huvudkategori:2" },
    { label: "Kött", value: "tags=huvudkategori:58" },
    { label: "Kyckling", value: "tags=huvudkategori:59" },
    { label: "Fisk", value: "tags=huvudkategori:60" },
    { label: "Skaldjur", value: "tags=huvudkategori:61" },
    { label: "Vegetariskt", value: "tags=huvudkategori:5" },
    { label: "Veganskt", value: "tags=huvudkategori:62" },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Searchbar
        placeholder="Sök recept"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
      />
      <Chips data={data} changeQuery={changeQuery} />
      <Button
        onPress={() =>
          navigation.navigate("SearchResultScreen", {
            receptSeUrl: receptSeUrl,
            receptenUrl: receptenUrl,
          })
        }
        title="Sök"
      />
    </View>
  );
}
