import * as React from "react";
import { Text } from "react-native";

export default function ScreenSubTitleHeader({ title = "Marcha Marlo" }) {
  return (
    <Text
      style={{
        fontSize: 20,
        textAlign: "center",
        padding: 10,
        backgroundColor: "#ffffff",
      }}
    >
      {title}
    </Text>
  );
}
