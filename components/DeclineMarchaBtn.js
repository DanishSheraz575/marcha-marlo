import * as React from "react";
import { Image, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

export default function CancelMarchaBtn({request_id=0}) {

    const navigation = useNavigation();

    function declineMarchaRequest(request_id) {
        const data = {
          api_token: global.token,
          user_id: global.uid,
          request_id: request_id,
          status: 0,
        };
        fetch(global.api + "accept_marcha_request", {
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
      onPress={() => declineMarchaRequest(request_id)}
      style={[StyleOf.rbBodyBtnLight,StyleOf.m5]}
    >
      <Text style={[StyleOf.selfCenter, StyleOf.textWhite,StyleOf.rbBtnLable,{textAlign:"center"}]}>
        DECLINE
      </Text>
    </TouchableOpacity>
  );
}
