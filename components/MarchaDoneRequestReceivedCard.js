import * as React from "react";

//import { useNavigation } from "@react-navigation/native";
import { View, Text, Image } from "react-native";

import AcceptMarchaDoneRequestBtn from "../components/AcceptMarchaDoneRequestBtn";
import DeclineMarchaBtn from "../components/DeclineMarchaBtn";
import StyleOf from "../assets/AppStyles";

export default function MarchaDoneRequestReceivedCard({item})
{


  console.log(item);

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
    rbBodyMarchaAgainstBox,
  } = StyleOf;

  return (
    <View style={requestBox}>
      <View style={[rbHeader, dropShadow]}>
        <Text style={selfCenter}>
          <Text style={textGray}>Request received from </Text>
          <Text style={rbHeaderBold}>{item.requester_name}</Text>
        </Text>
      </View>

      <View style={[rbBody, dropShadow]}>
        <View style={colContainerRow}>
          <View style={[col, col4]}>
            <Image
              style={rbBodyImg}
              source={{
                uri:
                  global.product_images_base_url + item.requester_product_image
              }}
            />
            <Text style={rbBodyDate}>
              <Image source={require("../assets/clock-icon.png")} />
              {item.request_date}
            </Text>
          </View>

          <View style={[col, col6]}>
            <Text style={[rbBodyProductTitle, mb5]}>
              {item.requester_product_title}
            </Text>

            <Text style={rbBodyProductPrice}>
                {" "}
                Marcha Price: {item.requester_product_value}
            </Text>

            <View style={[colContainerRow, mb5]}>
              <View style={col10}>
                <Text style={[f12]}>
                  Location:{" "}
                  <Text style={[f12, fwBold]}>
                    <Image source={require("../assets/location-icon2.png")} />{" "}
                    {item.requester_product_location}
                  </Text>
                </Text>
              </View>
              <View style={col10}>
                <Text style={[f12]}>
                  Condition:{" "}
                  <Text style={[f12, fwBold]}>
                    {item.requester_product_condition}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={rbBodyMarchaAgainstBox}>
              <Text>Marcha against:</Text>
              <Text style={fwBold}>{item.requested_product_title}</Text>
            </View>

            <View style={[colContainerRow, mb5]}>
              <View style={[col5]}>
                <AcceptMarchaDoneRequestBtn
                  request_id={item.request_id}
                />
              </View>
              <View style={[col5]}>
                <DeclineMarchaBtn request_id={item.request_id} />
              </View>
            </View>



          </View>
        </View>
      </View>
    </View>
  );
}
