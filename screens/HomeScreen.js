import React from "react";
import { View, Text, Button } from "react-native";
import { Chips } from "../components/Chips";
import WebView from "react-native-webview";
import { Searchbar } from "react-native-paper";

export function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [url, setUrl] = React.useState("https://recept.se/sok");

  const handleSearch = (search) => {
    setSearchQuery(search);
    console.log(search);
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
    </View>
  );
}
