import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import StyleOf from "../assets/AppStyles";

export default function ScreenHeader({ title, backbtn = 1, bgColor= StyleOf.bgEminence}) {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={[
          StyleOf.flexIt,StyleOf.p15, 
          {
            alignItems: "center",
          },
          bgColor
        ]}
      >
        <View>
          {(() => {
            if (backbtn == "1") {
              return (
                <TouchableOpacity
                  style={[StyleOf.itemCenter,StyleOf.iconBox]}
                  onPress={() => navigation.goBack()}
                >
                  <Image source={require("../assets/arrow-left.png")} />
                </TouchableOpacity>
              );
            }

            return null;
          })()}
        </View>
        <View>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}>
            {title}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Image source={require("../assets/bell.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
