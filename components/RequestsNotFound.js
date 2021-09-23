//import * as React from "react";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

export default function RequestsNotFound({ btnType }) {
  const navigation = useNavigation();
  return (
    <View style={StyleOf.rowItemCenter}>
      
      <Image source={require("../assets/empy_device.png")} />
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Nothing here !!!
      </Text>
      <Text>
        You have not received any Marcha requests yet.
        </Text>

      
    {(() => {
        if (btnType == "BackToDashboard") {
          return (
            <TouchableOpacity
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgEminence,
                { marginTop: 20 },
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
