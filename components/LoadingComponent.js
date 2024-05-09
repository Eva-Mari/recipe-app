import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export const LoadingComponent = ({ visible, loadingText }) => {
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255, 255, 255, 0.75)"
        animationStyle={styles.loader}
        speed={1}
      >
        <Text>{loadingText}</Text>
      </AnimatedLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 100,
    height: 100,
  },
});

export default LoadingComponent;
