//import * as React from "react";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

export default function PayTheDifference({}) {
  const navigation = useNavigation();

  function marchaMarnaHy() {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      product_ids: global.product_ids,
      marcha_product_id: global.marcha_product_id,
    };

    fetch(global.api + "send_marcha_request", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase();
        if (status == "success") {
          alert(json.result);
          navigation.navigate("MarchaPendingRequests");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <View style={StyleOf.rowItemCenter}>
      <Image source={require("../assets/questionQ.png")} />

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
        }}
      >
        The value of selected product is more than your product value
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Do you want to pay the difference to make a Marcha?
      </Text>

      <TouchableOpacity
        style={[
          StyleOf.btn,
          StyleOf.dropShadow,
          StyleOf.bgEminence,
          { marginTop: "5%" },
        ]}
        onPress={() => marchaMarnaHy()}
      >
        <Text style={StyleOf.btnLabel}>yes I want to do the marcha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          StyleOf.btn,
          StyleOf.dropShadow,
          StyleOf.bgSelectiveYellow,
          { marginTop: "5%" },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={StyleOf.btnLabel}>no i'm not interested</Text>
      </TouchableOpacity>
    </View>
  );
}
