import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import TimeAgo from "../components/TimeAgo";

export default function Chats({}) {
  const [notificationState, setNotificationState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };

  useEffect(() => {
    fetch(global.api + "chat_list", {
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
          let myProductList = [];
          json.result.forEach((item) => {
            myProductList.push({
              message: item.last_chat.msg,
              type: item.type,
              ago: item.added_on,
            });
          });
          setDataList(myProductList);
          setNotificationState(2);
        } else {
          setNotificationState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function renderNotiSlot({ item }) {
    return (
      <View style={StyleOf.rowStrip}>
        <View style={StyleOf.colContainerRow}>
          <View style={StyleOf.col2}>
            <Image source={require("../assets/marcha_icon.png")} />
          </View>
          <View style={StyleOf.col8}>
            <View style={{ marginLeft: 10 }}>
              <View style={StyleOf.colContainerRow}>
                <View style={StyleOf.col8}>
                  <Text
                    style={[StyleOf.textBlack, StyleOf.f18, StyleOf.fwBold]}
                  >
                    Messages
                  </Text>
                </View>
                <View style={StyleOf.col2}>
                  <TimeAgo dated={item.ago} />
                </View>
              </View>
              <Text style={[StyleOf.textGray, StyleOf.f14, StyleOf.fwNormal]}>
                {item.message}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Messages" />

      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (notificationState == 0) {
            return <MarchaSpinner size={70} />;
          }
          return null;
        })()}

        {(() => {
          if (notificationState == 1) {
            return (
              <RequestsNotFound
                btnType="NotificationBackToDashboardBtn"
                message="There are no more notifications here."
              />
            );
          }
          return null;
        })()}

        {(() => {
          if (notificationState == 2) {
            return (
              <View>
                <View style={[StyleOf.textGray, { padding: 20 }]}>
                  <View style={StyleOf.colContainerRow}>
                    <View style={StyleOf.col8}>
                      <Text>You have 1 new message</Text>
                    </View>
                    <View style={StyleOf.col2}>
                      <Image source={require("../assets/message_bubble.png")} />
                    </View>
                  </View>
                </View>

                <FlatList
                  data={dataList}
                  renderItem={renderNotiSlot}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            );
          }
          return null;
        })()}
      </View>

      <BottomLinks active="" />
    </View>
  );
}
