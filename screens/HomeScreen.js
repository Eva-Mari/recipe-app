import React, { useState, useEffect } from "react";
import { View, Button, Keyboard } from "react-native";
import { Chips } from "../components/Chips";
import { Searchbar } from "react-native-paper";

export function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [receptSeUrl, setreceptSeUrl] = React.useState("");
  const [receptenUrl, setreceptenUrl] = React.useState("");

  useEffect(() => {
    const encodedQuery = encodeURI(searchQuery);
    setreceptSeUrl(`https://recept.se/sok?q=${encodedQuery}`);
    if (selectedCategory) {
      setreceptSeUrl(
        `https://recept.se/sok?q=${searchQuery}&${selectedCategory}`
      );
    } else {
      setreceptSeUrl(`https://recept.se/sok?q=${searchQuery}`);
    }

    setreceptenUrl(
      `https://www.recepten.se/pages/search.xhtml?q=${encodedQuery}`
    );
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setSearchQuery("");
      setSelectedCategory("");
      resetChips();
      Keyboard.dismiss();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearch = () => {
    navigation.navigate("SearchResultScreen", {
      receptSeUrl: receptSeUrl,
      receptenUrl: receptenUrl,
    });
  };

  const resetChips = () => {
    setSelectedCategory("");
    setSelectedChips([]);
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
      <Chips
        data={data}
        setSelectedCategory={setSelectedCategory}
        resetChips={resetChips}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
      />
      <Button onPress={() => handleSearch()} title="Sök" />
    </View>
  );
}
