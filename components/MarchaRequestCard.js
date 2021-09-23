import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import StyleOf from "../assets/AppStyles";

export default function MarchaRequestCard({
  item,
  showHeader = 1,
  requestType = "",
  marchaStatus = 0,
}) {
  const navigation = useNavigation();

  function cancelMarchaRequest(id) {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: id,
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

  function acceptMarchaRequest(id) {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: id,
      status:1
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
    <View style={StyleOf.requestBox}>
      {(() => {
        if (showHeader == 1) {
          return (
            <View style={StyleOf.rbHeader}>
              <Text style={StyleOf.selfCenter}>
                <Text style={StyleOf.textGray}>Request sent to </Text>
                <Text style={StyleOf.rbHeaderBold}>
                  {item.requested_username}
                </Text>
              </Text>
            </View>
          );
        }
        return null;
      })()}

      <View style={StyleOf.rbBody}>
        <View style={StyleOf.colContainerRow}>
          <View style={[StyleOf.col, StyleOf.col4]}>
            <Image
              style={StyleOf.rbBodyImg}
              source={{ uri: item.requested_product_image }}
            />
            <Text style={StyleOf.rbBodyDate}>
              <Image source={require("../assets/clock-icon.png")} />
              {item.marcha_date}
            </Text>
          </View>

          <View style={[StyleOf.col, StyleOf.col6]}>
            <Text style={[StyleOf.rbBodyProductTitle]}>
              {item.requested_product_title}
            </Text>

            {(() => {
              if (marchaStatus > 0) {
                return (
                  <View style={[StyleOf.colContainerRow, StyleOf.mb5]}>
                    <View style={[StyleOf.col, StyleOf.col6]}>
                      <Text style={StyleOf.rbBodyProductPrice}>
                        Price: {item.requested_product_value}
                      </Text>
                    </View>
                    <View style={[StyleOf.col, StyleOf.col4]}>
                      <Image
                        style={{ alignSelf: "flex-end" }}
                        source={require("../assets/march_done_icon.png")}
                      />
                    </View>
                  </View>
                );
              } else {
                return (
                  <Text style={StyleOf.rbBodyProductPrice}>
                    Marcha Price: {item.requested_product_value}
                  </Text>
                );
              }
            })()}

            <View style={[StyleOf.colContainerRow, StyleOf.mb5]}>
              <View style={StyleOf.col5}>
                <Text>
                  <Image source={require("../assets/location-icon2.png")} />{" "}
                  {item.requested_product_location}
                </Text>
              </View>
              <View style={StyleOf.col5}>
                <Text>Condition: {item.requested_product_condition}</Text>
              </View>
            </View>
            <View style={StyleOf.rbBodyMarchaAgainstBox}>
              <Text>Marcha against:</Text>
              <Text style={StyleOf.fwBold}>
                {item.marcha_against_product_title}
              </Text>
            </View>

            {(() => {
              if (requestType == "sent") {
                return (
                  <TouchableOpacity
                    onPress={() => cancelMarchaRequest(item.marcha_request_id)}
                    style={StyleOf.rbBodyBtnLight}
                  >
                    <Text style={[StyleOf.selfCenter, StyleOf.textWhite]}>
                      <Image source={require("../assets/cross-icon.png")} />
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })()}

            {(() => {
              if (requestType == "reseived") {
                return (
                  <View style={[StyleOf.colContainerRow, StyleOf.mb5]}>
                    <View style={[StyleOf.col, StyleOf.col5]}>
                      <TouchableOpacity
                        onPress={() =>
                          acceptMarchaRequest(item.marcha_request_id)
                        }
                        style={StyleOf.rbBodyBtnRed}
                      >
                        <Text style={[StyleOf.selfCenter ,StyleOf.textWhite]}>
                          ACCEPT
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[StyleOf.col, StyleOf.col5]}>
                      <TouchableOpacity
                        onPress={() =>
                          cancelMarchaRequest(item.marcha_request_id)
                        }
                        style={StyleOf.rbBodyBtnLight}
                      >
                        <Text style={[StyleOf.selfCenter, StyleOf.textWhite]}>
                          DECLINE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
              return null;
            })()}
          </View>
        </View>
      </View>
    </View>
  );
}
