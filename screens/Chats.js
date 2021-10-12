import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import TimeAgo from "../components/TimeAgo";

export default function Chats({}) {

  const navigation = useNavigation(); 

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
          if (status == "success" && json.result.length>0) {
            var messagesData = json.result;
            let dataList = [];
            var title = "Message";
            var img = "product_placeholder.png";
  
            var requester_id=0;
            var requester_name="User";          
            var requester_email="";
            var requester_image="";
            
  
            messagesData.forEach((item) => {
              var uinfo=item.added_by;
              if(uinfo.image!=''){
                var img=global.user_image_base_url+uinfo.image;
              }else{
                var img='';
              }
              if (item.added_by.user_id == global.uid) {
                title = item.requested_product.title;
                var images = item.requested_product.images.split(",");
                var img = item.product_images_base_url + images[0];
              } else {              
                title = item.requester_product.title;
                var images = item.requester_product.images.split(",");
                var img = item.product_images_base_url + images[0];
              }
              var last_msg='';
              if(item.last_chat && item.last_chat.length>0){
                last_msg=item.last_chat.msg;
              }
              dataList.push({              
                request_id: item.request_id,
                title: title,
                image: img,
                message: last_msg,
                type: item.type,
                ago: item.added_on,
                my_product_id:item.requested_product_id,
                marcha_product_id:item.requester_product_id,
  
                requester_id:uinfo.user_id,
                requester_name:uinfo.full_name,
                requester_email:uinfo.email,
                requester_image:img,
              });
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

  });

  function renderNotiSlot({ item }) {
    //alert(item.image);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            request_id: item.request_id,
            requester_id: item.requester_id,
            requester_name:item.requester_name,
            requester_email:item.requester_email,
            requester_image:item.requester_image,
            my_product_id:item.my_product_id,
            marcha_product_id:item.marcha_product_id,
          })
        }
      >
        <View style={[StyleOf.rowStrip,StyleOf.rowStripBottomBorder]}>
          
          <View style={[StyleOf.colContainerRow]}>
            
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
      </TouchableOpacity>
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
                      <Text>You have {newMessage} new message(s)</Text>
                    </View>
                    <View style={[StyleOf.col2]}>
                      <Image
                        style={{ alignSelf: "center" }}
                        source={require("../assets/message_bubble.png")}
                      />
                      <Text
                        style={{ alignSelf: "center", position: "absolute" }}
                      >
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
