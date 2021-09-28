import React, { useEffect, useState } from "react";

import { View, FlatList, TouchableOpacity, Text } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaRequestCard from "../components/MarchaRequestCard";

export default function MarchaRequestReceived({}) {
  const [currentScreen, setCurrentScreenState] = useState("received");

  const [receivedDataState, setReceivedDataState] = useState(0);
  const [receivedDataList, setReceivedDataList] = useState(false);

  const [sentDataState, setSentDataState] = useState(0);
  const [sentDataList, setSentDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };

  useEffect(() => {
    fetch(global.api + "get_marcha_requests_received", {
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

          console.log(RDataList);
          setReceivedDataList(RDataList);
          setReceivedDataState(2);
        } else {
          setReceivedDataState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(global.api + "get_marcha_requests_sent", {
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
          setSentDataState(2);
        } else {
          setSentDataState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function renderRequestReceivedCard({ item }) {
    return (
      <MarchaRequestCard item={item} requestType="doneRequestReseived" showHeader="0" />
    );
  }
  function renderRequestSentCard({ item }) {
    return (
      <MarchaRequestCard item={item} requestType="doneRequestSent" showHeader="0" />
    );
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Marcha Requests" />

      {(() => {
        if (currentScreen == "received") {
          return (
            <View
              style={[
                StyleOf.dropShadow,
                { padding: 5, backgroundColor: "#ffffff" },
              ]}
            >
              <View style={[StyleOf.colContainerRow]}>
                <View style={[StyleOf.col5]}>
                  <TouchableOpacity
                    style={[StyleOf.rbBodyBtnRed, { margin: 5 }]}
                  >
                    <Text
                      style={[
                        StyleOf.selfCenter,
                        StyleOf.textWhite,
                        { textAlign: "center" },
                      ]}
                    >
                      <Text>Received</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[StyleOf.col5]}>
                  <TouchableOpacity
                    onPress={() => setCurrentScreenState("sent")}
                    style={[StyleOf.rbBodyBtnLight, { margin: 5 }]}
                  >
                    <Text
                      style={[
                        StyleOf.selfCenter,
                        StyleOf.textWhite,
                        { textAlign: "center" },
                      ]}
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
                StyleOf.dropShadow,
                { padding: 5, backgroundColor: "#ffffff" },
              ]}
            >
              <View style={[StyleOf.colContainerRow]}>
                <View style={[StyleOf.col5]}>
                  <TouchableOpacity
                    onPress={() => setCurrentScreenState("received")}
                    style={[StyleOf.rbBodyBtnLight, { margin: 5 }]}
                  >
                    <Text
                      style={[
                        StyleOf.selfCenter,
                        StyleOf.textWhite,
                        { textAlign: "center" },
                      ]}
                    >
                      <Text>Received</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[StyleOf.col5]}>
                  <TouchableOpacity
                    style={[StyleOf.rbBodyBtnRed, { margin: 5 }]}
                  >
                    <Text
                      style={[
                        StyleOf.selfCenter,
                        StyleOf.textWhite,
                        { textAlign: "center" },
                      ]}
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
            <View style={[StyleOf.containerInner]}>
              {(() => {
                if (receivedDataState == 0) {
                  return <MarchaSpinner size={70} />;
                }
                return null;
              })()}

              {(() => {
                if (receivedDataState == 1) {
                  return (
                    <RequestsNotFound
                      btnType="BackToDashboard"
                      message="You have not received any Marcha Done Requests yet."
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
            <View style={[StyleOf.containerInner]}>
              {(() => {
                if (sentDataState == 0) {
                  return <MarchaSpinner size={70} />;
                }
                return null;
              })()}

              {(() => {
                if (sentDataState == 1) {
                  return (
                    <RequestsNotFound
                      btnType="BackToDashboard"
                      message="You have not sent any Marcha Done Requests yet."
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
