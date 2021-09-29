import * as React from "react";
import { TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

export default function AcceptMarchaDoneRequestBtn({ request_id }) {
  const navigation = useNavigation();

  function acceptMarchaDoneRequest(request_id) {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: request_id,
      status: 1,
    };
    fetch(global.api + "accept_marcha_done_request", {
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
      onPress={() => acceptMarchaDoneRequest(request_id)}
      style={[StyleOf.rbBodyBtnRed,StyleOf.m5]}
    >
      <Text style={[StyleOf.selfCenter, StyleOf.textWhite, StyleOf.rbBtnLable]}>ACCEPT</Text>
    </TouchableOpacity>
  );
}
