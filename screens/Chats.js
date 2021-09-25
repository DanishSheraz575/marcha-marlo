import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import TimeAgo from "../components/TimeAgo";

export default function Chats({}) {

  const [newMessage, setNewMessage] = useState(0);
  
  const [messageState, setMessageState] = useState(0);
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
          var messagesData = json.result;
          let myProductList = [];
          var title = "Message";
          var img = "product_placeholder.png";
          messagesData.forEach((item) => {
            if (item.added_by.user_id == global.uid) {
              title = item.requested_product.title;
              var images = item.requested_product.images.split(",");
              var img = item.product_images_base_url + images[0];
            } else {
              title = item.requester_product.title;
              var images = item.requester_product.images.split(",");
              var img = item.product_images_base_url + images[0];
            }
            myProductList.push({
              title: title,
              image: img,
              message: item.last_chat.msg,
              type: item.type,
              ago: item.added_on,
            });
          });
          setDataList(myProductList);
          setMessageState(2);
        } else {
          setMessageState(1);
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
            <Image
                 style={StyleOf.rowStripImage}
                 resizeMode="contain"
                source={{ uri: item.image }}
              />
          </View>
          <View style={StyleOf.col8}>
            <View style={{ marginLeft: 10 }}>
              <View style={StyleOf.colContainerRow}>
                <View style={StyleOf.col8}>
                  <Text
                    style={[StyleOf.textBlack, StyleOf.f14, StyleOf.fwBold]}
                  >
                    {item.title}
                  </Text>
                </View>
                <View style={StyleOf.col2}>
                  <TimeAgo dated={item.ago} />
                </View>
              </View>
              <Text style={[StyleOf.textGray, StyleOf.f12, StyleOf.fwNormal]}>
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
          if (messageState == 0) {
            return <MarchaSpinner size={70} />;
          }
          return null;
        })()}

        {(() => {
          if (messageState == 1) {
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
          if (messageState == 2) {
            return (
              <View>
                <View style={[StyleOf.textGray, { padding: 20 }]}>
                  <View style={StyleOf.colContainerRow}>
                    <View style={StyleOf.col8}>
                      <Text>You have {newMessage} new message</Text>
                    </View>
                    <View style={[StyleOf.col2]}>
                      <Image style={{alignSelf:"center"}} source={require("../assets/message_bubble.png")} />
                      <Text  style={{alignSelf:"center",position:"absolute"}}>{newMessage}</Text>
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
