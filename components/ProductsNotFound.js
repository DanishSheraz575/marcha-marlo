//import * as React from "react";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

export default function ProductsNotFound({ btnType }) {
  const navigation = useNavigation();
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

      {(() => {
        if (btnType == "MyProductBtn") {
          return (
            <TouchableOpacity
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgEminence,
                { marginTop: "5%" },
              ]}
              onPress={() => navigation.navigate("AddProduct")}
            >
              <Text style={StyleOf.btnLabel}>add product now!</Text>
            </TouchableOpacity>
          );
        }
      })()}

      {(() => {
        if (btnType == "GoBackToMyProducts") {
          return (
            <TouchableOpacity
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgEminence,
                { marginTop: "5%" },
              ]}
              onPress={() => navigation.navigate("MyProducts")}
            >
              <Text style={StyleOf.btnLabel}>Go Back To My Products List</Text>
            </TouchableOpacity>
          );
        }
      })()}

      {(() => {
        if (btnType == "GoBackToExploreProducts") {
          return (
            <TouchableOpacity
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgEminence,
                { marginTop: "5%" },
              ]}
              onPress={() => navigation.navigate("ExploreProducts")}
            >
              <Text style={StyleOf.btnLabel}>Go Back To Products List</Text>
            </TouchableOpacity>
          );
        }
      })()}

      {(() => {
        if (btnType == "BackToDashboard") {
          return (
            <TouchableOpacity
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgEminence,
                { marginTop: "5%" },
              ]}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={StyleOf.btnLabel}>Back To Dashbaord</Text>
            </TouchableOpacity>
          );
        }
      })()}
    </View>
  );
}
