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
