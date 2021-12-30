//import * as React from "react";
import React, { useState } from "react";
import { Image, TouchableOpacity, Text, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

export default function CancelMarchaBtn({ request_id = 0, title = "CANCEL REQUEST" }) {
  const navigation = useNavigation();

  const { rbBodyBtnLight, selfCenter, f11, textWhite } = StyleOf;
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = (request_id) => {
    return Alert.alert("Are your sure?", "you want to cancel this request?", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          setShowBox(false);
          cancelMarchaRequest(request_id);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

  function cancelMarchaRequest(request_id) {    
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: request_id,
    };

    fetch(global.api + "cancel_marcha", {
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
          navigation.navigate("Dashboard");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <TouchableOpacity
      onPress={() => showConfirmDialog(request_id)}
      style={[rbBodyBtnLight, { margin: 5 }]}
    >
      <Text style={[selfCenter, textWhite, f11, { textAlign: "center" }]}>
        <Image source={require("../assets/cross-icon.png")} />
        {title}
      </Text>
    </TouchableOpacity>
  );
}
