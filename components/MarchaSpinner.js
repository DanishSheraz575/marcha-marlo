import * as React from "react";
import {View, Animated, Easing } from "react-native";
import StyleOf from "../assets/AppStyles";

export default function MarchaSpinner({ size = 70 }) {
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });
  startImageRotateFunction();
  return (
    <View style={StyleOf.rowItemCenter}>
      <Animated.Image
        style={{
          width: size,
          height: size,
          transform: [{ rotate: rotateData }],
        }}
        source={require("../assets/marcha_loader.png")}
      />
    </View>
  );
}
