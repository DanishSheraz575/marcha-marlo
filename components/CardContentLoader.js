import * as React from "react";
import { View, Image, Dimensions } from "react-native";

import StyleOf from "../assets/AppStyles";

const dimensions = Dimensions.get("window");
const win = Dimensions.get('window');
const ratio = win.width/2;

export default function CardContentLoader() {
  const {colContainerRow, p5, col5, p20, loadingContentImg } = StyleOf;

  var rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <View key={i} style={colContainerRow}>
        <View style={col5}>
        <Image
            style={[loadingContentImg,{height:200,resizeMode:"stretch"}]}
            resizeMode="cover"
            source={require("../assets/content_loading_card.gif")}
          />
        </View>
        <View style={col5}>
        <Image
            style={[loadingContentImg,{height:200,resizeMode:"stretch"}]}
            resizeMode="cover"
            source={require("../assets/content_loading_card.gif")}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={p20}>{rows}</View>
    </>
  );
}
