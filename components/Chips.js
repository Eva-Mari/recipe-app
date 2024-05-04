import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Chip } from "@rneui/themed";

export const Chips = ({ data }) => {
  const handlePress = (item) => {
    console.log(`${item} chip was pressed!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contentView}>
        {data.map((item, index) => (
          <Chip
            key={index}
            title={item}
            icon={{
              type: "font-awesome",
              size: 20,
            }}
            iconRight
            type="outline"
            containerStyle={[
              styles.chipContainer,
              index % 2 === 0 ? styles.evenChip : styles.oddChip,
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
    marginRight: "auto", // Aligns even chips to the left
  },
  oddChip: {
    marginLeft: "auto", // Aligns odd chips to the right
  },
});

//https://reactnativeelements.com/docs/components/chip
//https://github.com/callstack/react-native-paper/issues/1154
