import * as React from "react";

//import { useNavigation } from "@react-navigation/native";
import { View, Text, Image } from "react-native";

import CancelMarchaBtn from "../components/CancelMarchaBtn";

import StyleOf from "../assets/AppStyles";

export default function MarchaDoneRequestSentCard({item})
{
  //const navigation = useNavigation();

  const {
    requestBox,
    rbHeader,
    dropShadow,
    selfCenter,
    textGray,
    rbHeaderBold,
    rbBody,
    colContainerRow,
    col,
    col4,
    mb5,
    col6,
    col10,
    f12,
    rbBodyImg,
    rbBodyDate,
    rbBodyProductTitle,
    rbBodyProductPrice,
    fwBold,
    rbBodyMarchaAgainstBox,
  } = StyleOf;

  return (
    <View style={requestBox}>
      <View style={[rbHeader, dropShadow]}>
        <Text style={selfCenter}>
          <Text style={textGray}>Request sent to </Text>
          <Text style={rbHeaderBold}>{item.requested_name}</Text>
        </Text>
      </View>

      <View style={[rbBody, dropShadow]}>
        <View style={colContainerRow}>
          <View style={[col, col4]}>
            <Image
              style={rbBodyImg}
              source={{
                uri:
                  global.product_images_base_url + item.requested_product_image
              }}
            />
            <Text style={rbBodyDate}>
              <Image source={require("../assets/clock-icon.png")} />
              {item.request_date}
            </Text>
          </View>

          <View style={[col, col6]}>
            <Text style={[rbBodyProductTitle, mb5]}>
              {item.requested_product_title}
            </Text>

            <Text style={rbBodyProductPrice}>
                {" "}
                Marcha Price: {item.requested_product_value}
            </Text>

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
              <Text style={fwBold}>{item.requester_product_title}</Text>
            </View>

            <CancelMarchaBtn request_id={item.request_id} /> 

          </View>
        </View>
      </View>
    </View>
  );
}
