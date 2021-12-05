import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import StyleOf from "../assets/AppStyles";

export default function ScreenHeader({
  title,
  backbtn = 1,
  bgColor = StyleOf.bgEminence,
  bellbtn = 1,
}) {
  const navigation = useNavigation();

  const {flexIt, p20, itemCenter, iconBox}=StyleOf;

  return (
    <>
      <View style={[flexIt, p20, {alignItems: "center"},bgColor,]}>
        <View>          
          {backbtn == "1" && <TouchableOpacity
                                style={[itemCenter, iconBox]}
                                onPress={() => navigation.goBack()}
                              >
                                <Image source={require("../assets/arrow-left.png")} />
                              </TouchableOpacity>
          }
        </View>
        <View>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}>
            {title}
          </Text>
        </View>
        <View>
          {bellbtn == "1" && <TouchableOpacity
                                style={[itemCenter, iconBox]}
                                onPress={() => navigation.navigate("Notifications")}
                              >
                                <Image source={require("../assets/bell.png")} />
                              </TouchableOpacity>

          }
        </View>
      </View>
    </>
  );
}
