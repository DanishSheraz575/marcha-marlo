import * as React from "react";

import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";

import CancelMarchaBtn from "../components/CancelMarchaBtn";
import AcceptMarchaBtn from "../components/AcceptMarchaBtn";
import AcceptMarchaDoneRequestBtn from "../components/AcceptMarchaDoneRequestBtn";
import DeclineMarchaBtn from "../components/DeclineMarchaBtn";

import StyleOf from "../assets/AppStyles";

export default function MarchaRequestCard({
  item,
  showHeader = 1,
  requestType = "",
  marchaStatus = 0,
}) {
  const navigation = useNavigation();

  const {requested_username, request_id, dated}=item;
  const {requested_product}=item;
  const {requester_product}=item;


  console.log(requested_username);
  console.log(request_id);
  console.log(dated);
  console.log(requested_product);
  console.log(requester_product);

  return (
    <View style={StyleOf.requestBox}>
      {(() => {
        if (showHeader == 1) {
          return (
            <View style={[StyleOf.rbHeader,StyleOf.dropShadow]}>
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

      <View style={[StyleOf.rbBody,StyleOf.dropShadow]}>
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
            <Text style={[StyleOf.rbBodyProductTitle,StyleOf.mb5]}>
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
              <View style={StyleOf.col10}>
                <Text style={[StyleOf.f12]}>
                  Location: {" "}
                  <Text style={[StyleOf.f12,StyleOf.fwBold]}>
                    <Image source={require("../assets/location-icon2.png")} />{" "}
                    {item.requested_product_location}
                  </Text>
                </Text>
              </View>
              <View style={StyleOf.col10}>
                <Text style={[StyleOf.f12]}>
                  Condition: {" "}
                  <Text style={[StyleOf.f12,StyleOf.fwBold]}>
                    {item.requested_product_condition}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={StyleOf.rbBodyMarchaAgainstBox}>
              <Text>Marcha against:</Text>
              <Text style={StyleOf.fwBold}>
                {item.marcha_against_product_title}
              </Text>
            </View>

            {(() => {
              if (requestType == "sent" || requestType == "doneRequestSent" ) {
                return (
                  <CancelMarchaBtn request_id={item.marcha_request_id} />
                );
              }
              return null;
            })()}

{(() => {
              if (requestType == "doneRequestReseived") {
                return (
                  <View style={[StyleOf.colContainerRow, StyleOf.mb5]}>
                    <View style={[StyleOf.col5]}>
                      <AcceptMarchaDoneRequestBtn 
                        request_id={item.marcha_request_id}
                      />
                    </View>
                    <View style={[StyleOf.col5]}>
                      <DeclineMarchaBtn request_id={item.marcha_request_id} />
                    </View>
                  </View>
                );
              }
              return null;
            })()}

            {(() => {
              if (requestType == "reseived") {
                return (
                  <View style={[StyleOf.colContainerRow, StyleOf.mb5]}>
                    <View style={[StyleOf.col5]}>
                      <AcceptMarchaBtn 
                        request_id={item.marcha_request_id}
                        requester_id={item.requester_id}
                        requester_name={item.requester_name}
                        requester_email={item.requester_email}
                        requester_image={item.requester_image} 
                        my_product_id={item.my_product_id}
                        marcha_product_id={item.marcha_product_id}
                      />
                    </View>
                    <View style={[StyleOf.col5]}>
                      <DeclineMarchaBtn request_id={item.marcha_request_id} />
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
