//import * as React from "react";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import StyleOf from "../assets/AppStyles";

export default function RequestsNotFound({ btnType='', message='Sorry! Nothing found here.' }) {
  const navigation = useNavigation();
  const {fullContainer, containerInner, rowItemCenter}=StyleOf;
  return (
    <View style={[fullContainer]}>
      <View style={[containerInner]}>
        <View style={[rowItemCenter,{marginBottom:30}]}>
          <Image source={require("../assets/empy_device.png")} />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Nothing here !!!
          </Text>
          <Text>{message}</Text>
          {btnType == "BackToDashboardBtn" && <TouchableOpacity
                                                style={[
                                                  StyleOf.btn,
                                                  StyleOf.dropShadow,
                                                  StyleOf.bgEminence,
                                                  { marginTop: 20 },
                                                ]}
                                                onPress={() => navigation.navigate("Dashboard")}
                                              >
                                                <Text style={StyleOf.btnLabel}>Back To Dashbaord</Text>
                                              </TouchableOpacity>

          }

          {btnType == "NotificationBackToDashboardBtn" && <TouchableOpacity
                                                            style={[
                                                              StyleOf.btn,
                                                              StyleOf.dropShadow,
                                                              StyleOf.bgSelectiveYellow,
                                                              { marginTop: 20 },
                                                            ]}
                                                            onPress={() => navigation.navigate("Dashboard")}
                                                          >
                                                            <Text style={StyleOf.btnLabel}>Back To Dashbaord</Text>
                                                          </TouchableOpacity>

          }
        </View>
      </View>
    </View>
  );
}
