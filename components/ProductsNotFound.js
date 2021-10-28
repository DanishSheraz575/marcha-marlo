//import * as React from "react";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

export default function ProductsNotFound({ btnType }) {
  const navigation = useNavigation();
  var btnLabel = "Back To Dashbaord";
  var gotoScreen = "Dashboard";

  if (btnType == "MyProductBtn") {
    var btnLabel = "add product now!";
    var gotoScreen = "AddProduct";
  }

  if (btnType == "GoBackToMyProducts") {
    var btnLabel = "Go Back To My Products List";
    var gotoScreen = "MyProducts";
  }

  if (btnType == "GoBackToExploreProducts") {
    var btnLabel = "Go Back To Products List";
    var gotoScreen = "ExploreProducts";
  }

  if (btnType == "BackToDashboard") {
    var btnLabel = "Back To Dashbaord";
    var gotoScreen = "Dashboard";
  }

  if (btnType == "Back") {
    var btnLabel = "Go Back";
    var gotoScreen = "";
  }

  return (
    <View style={StyleOf.rowItemCenter}>
      <Text
        style={{
          fontSize: 42,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        AWW !!
      </Text>
      <Image source={require("../assets/oh.png")} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        No products found
      </Text>
      <TouchableOpacity
        style={[
          StyleOf.btn,
          StyleOf.dropShadow,
          StyleOf.bgEminence,
          { marginTop: "5%" },
        ]}
        onPress={ gotoScreen=='' ? () => navigation.goBack() : () => navigation.navigate(gotoScreen)}
      >
        <Text style={StyleOf.btnLabel}>{btnLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
