//import * as React from "react";
import React, { useState } from "react";
import { TouchableOpacity, Text,Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

export default function DeclineMarchaBtn({request_id=0}) {

    const navigation = useNavigation();
    const {rbBodyBtnLight,m5,selfCenter,textWhite,rbBtnLable}=StyleOf;


    const [showBox, setShowBox] = useState(true);
    const showConfirmDialog = (request_id) => {
      return Alert.alert(
        "Are your sure?",
        "you want to decline this request?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              setShowBox(false);
              declineMarchaRequest(request_id);
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    };


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
      onPress={() => showConfirmDialog(request_id)}
      style={[rbBodyBtnLight,m5]}
    >
      <Text style={[selfCenter, textWhite,rbBtnLable,{textAlign:"center"}]}>
        DECLINE
      </Text>
    </TouchableOpacity>
  );
}
