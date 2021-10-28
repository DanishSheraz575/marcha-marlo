import * as React from "react";

//import { useNavigation } from "@react-navigation/native";
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
  //const navigation = useNavigation();

  const {requestBox,
    rbHeader,
    dropShadow,
    selfCenter,
    textGray,
    rbHeaderBold,
    rbBody,
    colContainerRow,
    col,
    col4,
    col5,
    mb5,
    col6,
    col10,
    f12,
    rbBodyImg,
    rbBodyDate,
    rbBodyProductTitle,
    rbBodyProductPrice,
    fwBold,
    rbBodyMarchaAgainstBox}=StyleOf;

  return (
    <View style={requestBox}>
      {(() => {
        if (showHeader == 1) {
          return (
            <View style={[rbHeader, dropShadow]}>
              <Text style={selfCenter}>
                <Text style={textGray}>Request sent to </Text>
                <Text style={rbHeaderBold}>
                  {item.requested_username}
                </Text>
              </Text>
            </View>
          );
        }
        return null;
      })()}

      <View style={[rbBody, dropShadow]}>
        <View style={colContainerRow}>
          <View style={[col, col4]}>
            <Image
              style={rbBodyImg}
              source={{ uri: item.requested_product_image }}
            />
            <Text style={rbBodyDate}>
              <Image source={require("../assets/clock-icon.png")} />
              {item.marcha_date}
            </Text>
          </View>

          <View style={[col, col6]}>
            <Text style={[rbBodyProductTitle, mb5]}>
              {item.requested_product_title}
            </Text>

            {(() => {
              if (marchaStatus > 0) {
                return (
                  <View style={[colContainerRow, mb5]}>
                    <View style={[col, col6]}>
                      <Text style={rbBodyProductPrice}>
                        Price: {item.requested_product_value}
                      </Text>
                    </View>
                    <View style={[col, col4]}>
                      <Image
                        style={{ alignSelf: "flex-end" }}
                        source={require("../assets/march_done_icon.png")}
                      />
                    </View>
                  </View>
                );
              } else {
                return (
                  <Text style={rbBodyProductPrice}>
                    Marcha Price: {item.requested_product_value}
                  </Text>
                );
              }
            })()}

            <View style={[colContainerRow, mb5]}>
              <View style={col10}>
                <Text style={[f12]}>
                  Location:{" "}
                  <Text style={[f12, fwBold]}>
                    <Image source={require("../assets/location-icon2.png")} />{" "}
                    {item.requested_product_location}
                  </Text>
                </Text>
              </View>
              <View style={col10}>
                <Text style={[f12]}>
                  Condition:{" "}
                  <Text style={[f12, fwBold]}>
                    {item.requested_product_condition}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={rbBodyMarchaAgainstBox}>
              <Text>Marcha against:</Text>
              <Text style={fwBold}>
                {item.marcha_against_product_title}
              </Text>
            </View>

            {(() => {
              if (requestType == "sent" || requestType == "doneRequestSent") {
                return <CancelMarchaBtn request_id={item.marcha_request_id} />;
              }
              return null;
            })()}

            {(() => {
              if (requestType == "doneRequestReseived") {
                return (
                  <View style={[colContainerRow, mb5]}>
                    <View style={[col5]}>
                      <AcceptMarchaDoneRequestBtn
                        request_id={item.marcha_request_id}
                      />
                    </View>
                    <View style={[col5]}>
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
                  <View style={[colContainerRow, mb5]}>
                    <View style={[col5]}>
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
                    <View style={[col5]}>
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
