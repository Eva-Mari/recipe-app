import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Chips } from "../components/Chips";
import WebView from "react-native-webview";
import { Searchbar } from "react-native-paper";

export function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [url, setUrl] = React.useState("https://recept.se/sok"); //vad ska skickas till annan sida om flera hemsidor skrapas?

  useEffect(() => {
    const encodedQuery = encodeURIComponent(searchQuery);
    setUrl(`https://recept.se/sok?q=${encodedQuery}`);
    //setSearchQuery(encodedQuery);
  }, [searchQuery]);

  const handleSearch = (search) => {
    //const encodedQuery = encodeURIComponent(search);
    //setSearchQuery(encodedQuery);
    //setUrl(`https://recept.se/sok?q=${encodedQuery}`);
    //console.log("this is encoded query: '", encodedQuery, "'!");
    console.log(search);
    console.log(typeof serach);
    console.log("this is the url: ", typeof url);
    console.log("this is new url ", url);
    navigation.navigate("SearchResultScreen", { url: url });
  };

  const changeQuery = (value) => {
    setUrl("https://recept.se/sok?" + value);
    console.log("homescreen url: ", url);
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
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <Chips data={data} changeQuery={changeQuery} />
      <Button
        onPress={() => navigation.navigate("SearchResultScreen", { url })}
        title="Sök"
      />
      <TextInput
        placeholder="Sök recept"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 300 }}
      />
      <Button onPress={() => handleSearch(searchQuery)} title="Testa nya sök" />
    </View>
  );
}
