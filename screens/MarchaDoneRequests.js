import React, { useEffect, useState } from "react";

import { View, FlatList, TouchableOpacity, Text } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardLoader from "../components/CardLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaDoneRequestReceivedCard from "../components/MarchaDoneRequestReceivedCard";
import MarchaDoneRequestSentCard from "../components/MarchaDoneRequestSentCard";

export default function MarchaRequestReceived({}) {
  const {
    fullContainer,
    dropShadow,
    colContainerRow,
    col5,
    rbBodyBtnRed,
    selfCenter,
    textWhite,
    rbBodyBtnLight,
    containerInner
  } = StyleOf;

  const [currentScreen, setCurrentScreenState] = useState("received");

  const [receivedDataState, setReceivedDataState] = useState(0);
  const [receivedDataList, setReceivedDataList] = useState(false);

  const [sentDataState, setSentDataState] = useState(0);
  const [sentDataList, setSentDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid, is_mobile:true };

  useEffect(() => {
    fetch(global.api + "get_marcha_done_requests_received", {
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
          /*
          let RDataList = [];
          json.result.forEach((item) => {
            var requester = item.added_by;

            if (requester.image != "") {
              var img = global.user_image_base_url + requester.image;
            } else {
              var img = "";
            }

            let images = item.requester_product.images.split(",");
            let pimg = global.product_images_base_url + images[0];
            RDataList.push({
              requested_username: item.requested_username,
              requested_product_title: item.requester_product.title,
              requested_product_value: item.requester_product.value,
              requested_product_location: item.requester_product.location,
              requested_product_condition: item.requester_product.condition,
              requested_product_image: pimg,
              marcha_against_product_title: item.requested_product.title,
              marcha_request_id: item.request_id,

              my_product_id: item.requested_product_id,
              marcha_product_id: item.requester_product_id,

              requester_id: requester.user_id,
              requester_name: requester.full_name,
              requester_email: requester.email,
              requester_image: img,

              marcha_date: item.dated,
            });
          });
          setReceivedDataList(RDataList);
          */
          setReceivedDataList(json.result);
          setReceivedDataState(2);
        } else {
          setReceivedDataState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(global.api + "get_marcha_done_requests_sent", {
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
          /*
          let SDataList = [];

          json.result.forEach((item) => {
            var requester = item.added_by;

            if (requester.image != "") {
              var img = global.user_image_base_url + requester.image;
            } else {
              var img = "";
            }

            let images = item.requester_product.images.split(",");
            let pimg = global.product_images_base_url + images[0];
            SDataList.push({
              requested_username: item.requested_username,
              requested_product_title: item.requester_product.title,
              requested_product_value: item.requester_product.value,
              requested_product_location: item.requester_product.location,
              requested_product_condition: item.requester_product.condition,
              requested_product_image: pimg,
              marcha_against_product_title: item.requested_product.title,
              marcha_request_id: item.request_id,

              my_product_id: item.requested_product_id,
              marcha_product_id: item.requester_product_id,

              requester_id: requester.user_id,
              requester_name: requester.full_name,
              requester_email: requester.email,
              requester_image: img,

              marcha_date: item.dated,
            });
          });
          setSentDataList(SDataList);
          */
          setSentDataList(json.result);
          setSentDataState(2);
        } else {
          setSentDataState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  function renderRequestReceivedCard({ item }) {
    return (
      <MarchaDoneRequestReceivedCard
        item={item}
      />
    );
  }
  function renderRequestSentCard({ item }) {
    return (
      <MarchaDoneRequestSentCard
        item={item}
      />
    );
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Marcha Requests" />

      {(() => {
        if (currentScreen == "received") {
          return (
            <View
              style={[dropShadow, { padding: 5, backgroundColor: "#ffffff" }]}
            >
              <View style={[colContainerRow]}>
                <View style={[col5]}>
                  <TouchableOpacity style={[rbBodyBtnRed, { margin: 5 }]}>
                    <Text
                      style={[selfCenter, textWhite, { textAlign: "center" }]}
                    >
                      <Text>Received</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[col5]}>
                  <TouchableOpacity
                    onPress={() => setCurrentScreenState("sent")}
                    style={[rbBodyBtnLight, { margin: 5 }]}
                  >
                    <Text
                      style={[selfCenter, textWhite, { textAlign: "center" }]}
                    >
                      <Text>Sent</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        } else {
          return (
            <View
              style={[
                dropShadow,
                { padding: 5, backgroundColor: "#ffffff" },
              ]}
            >
              <View style={[colContainerRow]}>
                <View style={[col5]}>
                  <TouchableOpacity
                    onPress={() => setCurrentScreenState("received")}
                    style={[rbBodyBtnLight, { margin: 5 }]}
                  >
                    <Text
                      style={[selfCenter, textWhite, { textAlign: "center" }]}
                    >
                      <Text>Received</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[col5]}>
                  <TouchableOpacity style={[rbBodyBtnRed, { margin: 5 }]}>
                    <Text
                      style={[selfCenter, textWhite, { textAlign: "center" }]}
                    >
                      <Text>Sent</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }
      })()}

      {(() => {
        if (currentScreen == "received") {
          return (
            <View style={[containerInner]}>
              {(() => {
                if (receivedDataState == 0) {
                  return <CardLoader />;
                }
                return null;
              })()}

              {(() => {
                if (receivedDataState == 1) {
                  return (
                    <RequestsNotFound
                      btnType="BackToDashboard"
                      message="No Marcha Done Requests received yet."
                    />
                  );
                }
                return null;
              })()}

              {(() => {
                if (receivedDataState == 2) {
                  return (
                    <FlatList
                      data={receivedDataList}
                      renderItem={renderRequestReceivedCard}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  );
                }
                return null;
              })()}
            </View>
          );
        } else {
          return (
            <View style={[containerInner]}>
              {(() => {
                if (sentDataState == 0) {
                  return <CardLoader />;
                }
                return null;
              })()}

              {(() => {
                if (sentDataState == 1) {
                  return (
                    <RequestsNotFound
                      btnType="BackToDashboard"
                      message="Not Marcha Done Request send yet."
                    />
                  );
                }
                return null;
              })()}

              {(() => {
                if (sentDataState == 2) {
                  return (
                    <FlatList
                      data={sentDataList}
                      renderItem={renderRequestSentCard}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  );
                }
                return null;
              })()}
            </View>
          );
        }
      })()}

      <BottomLinks active="" />
    </View>
  );
}
