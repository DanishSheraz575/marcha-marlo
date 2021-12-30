import * as React from "react";

import { View, Text, Image } from "react-native";
import CancelMarchaBtn from "./CancelMarchaBtn";
import StyleOf from "../assets/AppStyles";


export default function MarchaPendingRequestsCard({item})
  {

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
        f11,
        rbBodyImg,
        rbBodyDate,
        rbBodyProductTitle,
        rbBodyProductPrice,
        fwBold,
        rbBodyMarchaAgainstBox
    }=StyleOf;

    const {
        requested_username,
        requested_product_image,
        marcha_date,
        requested_product_title,
        requested_product_value,
        requested_product_location,
        requested_product_condition,
        requester_product_title,
        request_id
    }=item;


  return (
    <View style={requestBox}>
        <View style={[rbHeader, dropShadow]}>
            <Text style={selfCenter}>
            <Text style={textGray}>Request sent to </Text>
            <Text style={rbHeaderBold}>
                {requested_username}
            </Text>
            </Text>
        </View>

      <View style={[rbBody, dropShadow]}>
        <View style={colContainerRow}>
          <View style={[col, col4]}>
            <Image
              style={rbBodyImg}
              source={{ uri: global.product_images_base_url+requested_product_image}}
            />
            <Text style={rbBodyDate}>
              <Image source={require("../assets/clock-icon.png")} />
              {marcha_date}
            </Text>
          </View>

          <View style={[col, col6]}>
            <Text style={[rbBodyProductTitle, mb5]}>
              {requested_product_title}
            </Text>
            <Text style={rbBodyProductPrice}> Price: Rs. {requested_product_value}</Text>

            <View style={[colContainerRow, mb5]}>
              <View style={col10}>
                <Text style={[f12]}>
                  Location:{" "}
                  <Text style={[f12, fwBold]}>
                    <Image source={require("../assets/location-icon2.png")} />{" "}
                    {requested_product_location}
                  </Text>
                </Text>
              </View>
              <View style={col10}>
                <Text style={[f12]}>
                  Condition:{" "}
                  <Text style={[f12, fwBold]}>
                    {requested_product_condition}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={rbBodyMarchaAgainstBox}>
              <Text>Marcha against:</Text>
              <Text style={[fwBold,f11]}>
                {requester_product_title}
              </Text>
            </View>
            <CancelMarchaBtn request_id={request_id} />
          </View>
        </View>
      </View>
    </View>
  );
}
