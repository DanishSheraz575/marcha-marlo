import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import StripLoader from "../components/StripLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import TimeAgo from "../components/TimeAgo";

export default function Notifications({}) {

  const {rowStrip, rowStripBottomBorder, colContainerRow, col2, col8, textBlack, f18, fwBold, textGray, f14, fwNormal, fullContainer, containerInner   }=StyleOf;

  const [notificationState, setNotificationState] = useState(0);
  const [dataList, setDataList] = useState([]);

  const data = { api_token: global.token, user_id: global.uid, is_mobile:true };

  useEffect(() => {
    fetch(global.api + "get_notifications", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase();
        console.log(json.result);
        if (status == "success" && json.result.length>0 ) {
          setDataList(json.result);
          setNotificationState(2);
        } else {
          setNotificationState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      return () => {
        // Anything in here is fired on component unmount.
      }
  }, []);

  function renderNotiSlot({ item }) {
    console.log(global.user_image_base_url+item.user_image);
    return (
      <View style={[rowStrip,rowStripBottomBorder]}>
        <View style={colContainerRow}>
          <View style={col2}>
            {
              item.user_image 
              ?
                <Image style={{width:20,height:20}} source={{uri:global.user_image_base_url+item.user_image}} />
              :
                <Image source={require("../assets/notificationIcon.png")} />
            }
            
          </View>
          <View style={col8}>
            <View style={{marginLeft:10}}>
              <Text style={[textBlack, f18, fwBold]}>
                Notification
                <Text style={[textGray, f14, fwNormal]}> {item.message}</Text>
              </Text>
              <TimeAgo dated={item.ago} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Notifications" bellbtn="0" />

      <View style={[containerInner]}>
        {notificationState == 0 && <StripLoader size={70} />}
        {notificationState == 1 && <RequestsNotFound btnType="NotificationBackToDashboardBtn" message="There are no more notifications here." />}
        {notificationState == 2 && <FlatList data={dataList} renderItem={renderNotiSlot} keyExtractor={(item, index) => index.toString()} /> }
      </View>

      <BottomLinks active="" />
    </View>
  );
}
