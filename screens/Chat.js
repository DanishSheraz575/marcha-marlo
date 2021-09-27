import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import MarchaSpinner from "../components/MarchaSpinner";
import TimeAgo from "../components/TimeAgo";

import CancelMarchaBtn from "../components/CancelMarchaBtn";

import StyleOf from "../assets/AppStyles";

export default function Chat({ route }) {
  const navigation = useNavigation();

  //const flatListRef = React.useRef<FlatList>(null);

  const { request_id } = route.params;
  const { my_product_id } = route.params;
  const { marcha_product_id } = route.params;

  const { requester_id } = route.params;
  const { requester_name } = route.params;
  const { requester_email } = route.params;
  const { requester_image } = route.params;

  const [requestId, setRequestId] = useState(request_id);
  const [myProductId, setMyProductId] = useState(my_product_id);
  const [marchaProductId, setMarchaProductId] = useState(marcha_product_id);
  const [message, setMessage] = useState(false);
  const [messagesState, setMessagesState] = useState(0);
  const [dataList, setDataList] = useState(false);

  useEffect(() => {
    getChatHistory();
  }, []);

  function getChatHistory() {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: requestId,
    };

    fetch(global.api + "chat_history", {
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
          setDataList(messagesData);
          setMessagesState(2);
        } else {
          setMessagesState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function renderChat({ item }) {
    return (
      <View style={styles.speachBubbleContainer}>
        {(() => {
          if (item.from_product_id == myProductId) {
            return (
              // Sent
              <View>
                <View style={StyleOf.colContainerRow}>
                  <View style={[StyleOf.col10]}>
                    <View
                      style={[styles.speachBubble, styles.sentSpeachBubble]}
                    >
                      <Text style={StyleOf.textWhite}>{item.msg}</Text>
                    </View>
                  </View>
                  <View style={[StyleOf.col10]}>
                    <Text style={[styles.sentDate, StyleOf.f11]}>
                      <TimeAgo dated={item.added_on} />
                    </Text>
                  </View>
                </View>
              </View>
            );
          } else {
            return (
              // Received
              <View>
                <View style={StyleOf.colContainerRow}>
                  <View style={[StyleOf.col10]}>
                    <View style={[styles.speachBubble]}>
                      <Text>{item.msg}</Text>
                    </View>
                  </View>
                  <View style={[StyleOf.col10]}>
                    <Text style={[styles.receivedDate, StyleOf.f11]}>
                      <TimeAgo dated={item.added_on} />
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
        })()}
      </View>
    );
  }

  function sendMessage() {
    if (message != "") {
      const data = {
        api_token: global.token,
        user_id: global.uid,
        request_id: requestId,
        my_product_id: myProductId,
        marcha_product_id: marchaProductId,
        message: message,
        attachments: "",
      };

      fetch(global.api + "send_message", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          getChatHistory();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }


  function sendMarchaDoneRequest() {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: request_id,
    };
    fetch(global.api + "send_marcha_done_request", {
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
          alert(json.result);
          navigation.navigate("Dashboard");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <View style={StyleOf.fullContainer}>
      <View style={[StyleOf.containerInner]}>
        <View
          style={[
            StyleOf.flexIt,
            StyleOf.p15,
            { alignItems: "center" },
            StyleOf.bgEminence,
          ]}
        >
          <View style={[StyleOf.colContainerRow]}>
            <View style={[StyleOf.col2]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={[StyleOf.itemCenter, StyleOf.iconBox]}
                  onPress={() => navigation.navigate("Chats")}
                >
                  <Image source={require("../assets/arrow-left.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                StyleOf.col8,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              {(() => {
                if (requester_image != "") {
                  return (
                    <Image
                      style={styles.profileImg}
                      source={{ uri: requester_image }}
                    />
                  );
                }
                return (
                  <Image
                    style={styles.profileImg}
                    source={require("../assets/user_profile.png")}
                  />
                );
              })()}
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: "bold",
                  flexDirection: "row",
                  textAlign: "left",
                  marginLeft: 10,
                }}
              >
                {requester_name}
                {"\n"}
                <Text style={[StyleOf.textWelcome, { fontSize: 12 }]}>
                  Online
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={{ padding: 5 }}>
          <View style={[StyleOf.colContainerRow]}>
            <View style={[StyleOf.col5]}>
                <TouchableOpacity
                  onPress={() => sendMarchaDoneRequest(request_id)}
                  style={[StyleOf.rbBodyBtnRed,{margin:5}]}
                >
                  <Text style={[StyleOf.selfCenter, StyleOf.textWhite,{textAlign:"center"}]}>
                    <Text>Send Marcha Done Request</Text>
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={[StyleOf.col5]}>
              <CancelMarchaBtn request_id={request_id} title="Send Marcha Cancel Request" />
            </View>
          </View>
        </View>

        <View
          style={[
            StyleOf.containerInner,
            { paddingHorizontal: 20, paddingVertical: 10 },
          ]}
        >
          {(() => {
            if (messagesState == 0) {
              return <MarchaSpinner size={70} />;
            }
            return null;
          })()}

          {(() => {
            if (messagesState == 1) {
              return (
                <View style={StyleOf.rowItemCenter}>
                  <Text style={[StyleOf.f18, StyleOf.textGray]}>Say Hi!</Text>
                </View>
              );
            }
            return null;
          })()}

          {(() => {
            if (messagesState == 2) {
              return (
                <FlatList
                  data={dataList}
                  inverted={true}
                  renderItem={renderChat}
                  keyExtractor={(item, index) => index.toString()}
                />
              );
            }
            return null;
          })()}
        </View>

        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 15,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <TextInput
            onChangeText={(message) => setMessage(message)}
            style={{
              lineHeight: 0,
              paddingHorizontal: 8,
              paddingVertical: 3,
              alignSelf: "flex-start",
              width: "90%",
            }}
            placeholder="Type something ..."
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{ height: 35, justifyContent: "center", width: 35 }}
          >
            <Image
              style={{ alignSelf: "center" }}
              source={require("../assets/send_message_icon.png")}
            />
          </TouchableOpacity>
        </View>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  speachBubbleContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  speachBubble: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#EAECF2",
    margin: 5,
    padding: 10,
    width: "80%",
  },
  sentSpeachBubble: {
    backgroundColor: "#FF3D57",
    alignSelf: "flex-end",
  },
  receivedDate: {
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  sentDate: {
    alignSelf: "flex-end",
    paddingRight: 20,
  },
});
