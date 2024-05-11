import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Keyboard } from "react-native";
import { Chips } from "../components/Chips";
import { Searchbar } from "react-native-paper";

export function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [url, setUrl] = React.useState("https://recept.se/sok"); //vad ska skickas till annan sida om flera hemsidor skrapas?

  useEffect(() => {
    const encodedQuery = encodeURI(searchQuery);
    setUrl(`https://recept.se/sok?q=${encodedQuery}`);
  }, [searchQuery]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setSearchQuery("");
      Keyboard.dismiss();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearch = () => {
    navigation.navigate("SearchResultScreen", { url });
  };

  const changeQuery = (value) => {
    setUrl("https://recept.se/sok?" + value);
    navigation.navigate("SearchResultScreen", { url });
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
        onPress={() => navigation.navigate("SearchResultScreen", { url })}
        title="Sök"
      />
    </View>
  );
}
