//import * as React from "react";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

export default function ProductsNotFound({ btnType }) {

  const navigation = useNavigation();
  
  var btnLabelText = "Back To Dashbaord";
  var gotoScreen = "Dashboard";


  if (btnType == "MyProductBtn") {
    var btnLabelText = "add product now!";
    var gotoScreen = "AddProduct";
  }

  if (btnType == "GoBackToMyProducts") {
    var btnLabelText = "Go Back To My Products List";
    var gotoScreen = "MyProducts";
  }

  if (btnType == "GoBackToExploreProducts") {
    var btnLabelText = "Go Back To Products List";
    var gotoScreen = "ExploreProducts";
  }

  if (btnType == "BackToDashboard") {
    var btnLabelText = "Back To Dashbaord";
    var gotoScreen = "Dashboard";
  }

  if (btnType == "Back") {
    var btnLabelText = "Go Back";
    var gotoScreen = "";
  }


  const {rowItemCenter, btn, dropShadow, bgEminence, btnLabel, containerInner, fullContainer}=StyleOf;

  return (
    <View style={[fullContainer]}>
    <View style={[containerInner, { marginBottom: 30}]}>
    <View style={[rowItemCenter]}>
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
          btn,
          dropShadow,
          bgEminence,
          { marginTop: "5%"},
        ]}
        onPress={ gotoScreen=='' ? () => navigation.goBack() : () => navigation.navigate(gotoScreen)}
      >
        <Text style={btnLabel}>{btnLabelText}</Text>
      </TouchableOpacity>
    </View>
    </View>
    </View>
  );
}
