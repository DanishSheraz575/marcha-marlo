import * as React from "react";
import { Image, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

export default function CancelMarchaBtn({request_id=0, title="CANCEL"}) {

    const navigation = useNavigation();

  function cancelMarchaRequest() {
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
      onPress={() => cancelMarchaRequest(request_id)}
      style={[StyleOf.rbBodyBtnLight,{margin:5}]}
    >
      <Text style={[StyleOf.selfCenter, StyleOf.textWhite,{textAlign:"center"}]}>
        <Image source={require("../assets/cross-icon.png")} />
        {title}
      </Text>
    </TouchableOpacity>
  );
}