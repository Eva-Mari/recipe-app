import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Chip } from "@rneui/themed";

export const Chips = ({
  data,
  setSelectedCategory,
  selectedChips,
  setSelectedChips,
}) => {
  const handlePress = (item) => {
    const isSelected = selectedChips.includes(item.value);
    if (isSelected) {
      setSelectedChips(selectedChips.filter((chip) => chip !== item.value));
    } else {
      setSelectedChips([...selectedChips, item.value]);
    }
    setSelectedCategory(item.value);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contentView}>
        {data.map((item, index) => (
          <Chip
            key={item.value}
            title={item.label}
            icon={{
              type: "font-awesome",
              size: 20,
            }}
            iconRight
            type={selectedChips.includes(item.value) ? "solid" : "outline"}
            containerStyle={[
              styles.chipContainer,
              index % 2 === 0 ? styles.evenChip : styles.oddChip,
              selectedChips.includes(item.value) && styles.selectedChip,
            ]}
            onPress={() => handlePress(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "center",
  },
  contentView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  chipContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  evenChip: {
    marginRight: "auto",
  },
  oddChip: {
    marginLeft: "auto",
  },
  selectedChip: {
    backgroundColor: "lightblue",
  },
});
