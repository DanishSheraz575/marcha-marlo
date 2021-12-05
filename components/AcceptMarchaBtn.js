import * as React from "react";
import { TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

export default function AcceptMarchaBtn({ request_id = 0, requester_id = 0, requester_name="User", requester_email='', requester_image='', my_product_id=0, marcha_product_id=0  }) {
  const navigation = useNavigation();


  const {rbBodyBtnRed, m5, selfCenter, textWhite, rbBtnLable}=StyleOf;

  function acceptMarchaRequest(request_id) {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: request_id,
      status: 1,
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
          
          navigation.navigate("Chat", {
            request_id: request_id,
            requester_id: requester_id,
            requester_name: requester_name,
            requester_email: requester_email,
            requester_image: requester_image,
            my_product_id: my_product_id,
            marcha_product_id: marcha_product_id,
          })

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
      onPress={acceptMarchaRequest(request_id)}
      style={[rbBodyBtnRed,m5]}
    >
      <Text style={[selfCenter, textWhite, rbBtnLable]}>ACCEPT</Text>
    </TouchableOpacity>
  );
}
