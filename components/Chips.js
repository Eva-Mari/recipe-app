import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip, withTheme, lightColors } from '@rneui/themed';



export const Chips = ({ data }) => {
  const handlePress = (item) => {
    console.log(`${item} chip was pressed!`);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.contentView}>
          <View style={{ alignItems: 'center' }}>
            {data.map((item, index) => (
              <Chip
                key={index}
                title={item}
                icon={{
                    type: 'font-awesome',
                    size: 20,
                  }}
                  iconRight
                  type="outline"
                  containerStyle={{ marginVertical: 15 }}
                onPress={() => handlePress(item)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    marginTop: 20,
  },
});


