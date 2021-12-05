import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import StripLoader from "../components/StripLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import TimeAgo from "../components/TimeAgo";

export default function Chats({}) {
  const navigation = useNavigation();


  const {rowStrip,rowStripBottomBorder,colContainerRow,col2,rowStripImage,col8,textBlack,f14,fwBold,textGray,f12,fwNormal,fullContainer,containerInner}=StyleOf;

  const [newMessage, setNewMessage] = useState(0);

  const [messageState, setMessageState] = useState(0);

  const [dataList, setDataList] = useState([]);

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
        if (status == "success" && json.result.length > 0) {
          var messagesData = json.result;
          var title = "Message";

          const dataList = messagesData.map((item) => {
            const { added_by } = item;
            if (added_by?.image != "") {
              var img = global.user_image_base_url + added_by?.image;
            } else {
              var img = "";
            }
            if (item?.added_by?.user_id == global.uid) {
              title = item?.requested_product.title;
              var images = item?.requested_product?.images.split(",");
              var img = item?.product_images_base_url + images[0];
            } else {
              title = item?.requester_product.title;
              var images = item?.requester_product?.images?.split(",");
              var img = item?.product_images_base_url + images[0];
            }
            var last_msg = "";
            if (item.last_chat && item?.last_chat?.length > 0) {
              last_msg = item?.last_chat?.msg;
            }
            return {
              request_id: item?.request_id,
              title,
              image: added_by?.image
                ? global.user_image_base_url + added_by?.image
                : "",
              message: last_msg,
              type: item?.type,
              ago: item?.added_on,
              my_product_id: item?.requested_product_id,
              marcha_product_id: item?.requester_product_id,

              requester_id: added_by?.user_id,
              requester_name: added_by?.full_name,
              requester_email: added_by?.email,
              requester_image: img,
            };
          });
          setDataList(dataList);
          setMessageState(2);
        } else {
          setMessageState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return () => {
      // This is its cleanup.
    };
  }, []);

  const navigateToChat = (item) => {
    navigation.navigate("Chat", {
      request_id: item.request_id,
      requester_id: item.requester_id,
      requester_name: item.requester_name,
      requester_email: item.requester_email,
      requester_image: item.requester_image,
      my_product_id: item.my_product_id,
      marcha_product_id: item.marcha_product_id,
    });
  };

  function renderNotiSlot({ item }) {
    //alert(item.image);
    return (
      <TouchableOpacity onPress={() => navigateToChat(item)}>
        <View style={[rowStrip, rowStripBottomBorder]}>
          <View style={[colContainerRow]}>
            <View style={col2}>
              <Image
                style={rowStripImage}
                resizeMode="contain"
                source={{ uri: item.image }}
              />
            </View>
            <View style={col8}>
              <View style={{ marginLeft: 10 }}>
                <View style={colContainerRow}>
                  <View style={col8}>
                    <Text
                      style={[textBlack, f14, fwBold]}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <View style={col2}>
                    <TimeAgo dated={item.ago} />
                  </View>
                </View>
                <Text style={[textGray, f12, fwNormal]}>
                  {item.message}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Messages" />

      <View style={[containerInner]}>
        {messageState == 0 && <StripLoader size={70} />}

        {messageState == 1 && (
          <RequestsNotFound
            btnType="NotificationBackToDashboardBtn"
            message="There are no more notifications here."
          />
        )}

        {messageState == 2 && (
          <>
            <View style={[textGray, { padding: 20 }]}>
              <View style={colContainerRow}>
                <View style={col8}>
                  <Text>You have {newMessage} new message(s)</Text>
                </View>
                <View style={[col2]}>
                  <Image
                    style={{ alignSelf: "center" }}
                    source={require("../assets/message_bubble.png")}
                  />
                  <Text style={{ alignSelf: "center", position: "absolute" }}>
                    {newMessage}
                  </Text>
                </View>
              </View>
            </View>

            <FlatList
              data={dataList}
              renderItem={renderNotiSlot}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
      </View>
      <BottomLinks active="" />
    </View>
  );
}
