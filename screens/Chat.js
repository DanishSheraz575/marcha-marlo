import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

import MarchaSpinner from "../components/MarchaSpinner";
import TimeAgo from "../components/TimeAgo";
import CancelMarchaBtn from "../components/CancelMarchaBtn";
import StyleOf from "../assets/AppStyles";

const Chat = ({ route, navigation }) => {
  const flatListRef = useRef();
  const {
    request_id,
    my_product_id,
    marcha_product_id,
    requester_name,
    requester_image,
  } = route.params;

  const [message, setMessage] = useState("");
  const [messagesState, setMessagesState] = useState(0);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const setInterValRef = setInterval(() => getChatHistory(), 5000);
    return () => clearInterval(setInterValRef);
    // getChatHistory();
  }, []);

  const getChatHistory = useCallback(() => {
    const data = {
      api_token: global.token,
      user_id: global.uid,
      request_id: request_id,
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
          const messagesData = json.result.map(
            ({ msg, added_by, added_on }) => ({ msg, added_by, added_on })
          );
          setDataList(messagesData);
          // setMessagesState(2);
        }
        setMessagesState(1);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const renderChat = useCallback(({ item }) => {
    return (
      <View style={styles.speachBubbleContainer}>
        {item?.added_by == global.uid ? (
          // Sent
          <>
            <View style={StyleOf.colContainerRow}>
              <View style={[StyleOf.col10]}>
                <View style={[styles.speachBubble, styles.sentSpeachBubble]}>
                  <Text style={StyleOf.textWhite}>{item?.msg}</Text>
                </View>
              </View>
              <View style={[StyleOf.col10]}>
                <Text style={[styles.sentDate, StyleOf.f11]}>
                  <TimeAgo dated={item?.added_on} />
                </Text>
              </View>
            </View>
          </>
        ) : (
          // Received
          <>
            <View style={StyleOf.colContainerRow}>
              <View style={[StyleOf.col10]}>
                <View style={[styles.speachBubble]}>
                  <Text style={StyleOf.textBlack}>{item?.msg}</Text>
                </View>
              </View>
              <View style={[StyleOf.col10]}>
                <Text style={[styles.receivedDate, StyleOf.f11]}>
                  <TimeAgo dated={item?.added_on} />
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }, []);

  const sendMessage = useCallback(() => {
    if (message) {
      const newMessage = { added_by: global.uid, msg: message, added_on: "" };
      setDataList((oldMessage) => [...oldMessage, newMessage]);
      setMessage("");
      const data = {
        api_token: global.token,
        user_id: global.uid,
        request_id: request_id,
        my_product_id: my_product_id,
        marcha_product_id: marcha_product_id,
        message: message,
        attachments: "",
      };

      sendChatToDb(data);
    }
  }, [message]);

  const sendChatToDb = useCallback((data) => {
    fetch(global.api + "send_message", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log("successfully sent "))
      .catch((error) => console.error("Error:", error));
  }, []);

  const sendMarchaDoneRequest = useCallback(() => {
    const data = { api_token: global.token, user_id: global.uid, request_id };
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
  }, []);

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
              {requester_image != "" ? (
                <Image
                  style={styles.profileImg}
                  source={{ uri: requester_image }}
                />
              ) : (
                <Image
                  style={styles.profileImg}
                  source={require("../assets/user_profile.png")}
                />
              )}
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

        <View
          style={[
            StyleOf.dropShadow,
            { padding: 5, backgroundColor: "#ffffff" },
          ]}
        >
          <View style={[StyleOf.colContainerRow]}>
            <View style={[StyleOf.col5]}>
              <TouchableOpacity
                onPress={sendMarchaDoneRequest}
                style={[StyleOf.rbBodyBtnRed, { margin: 5 }]}
              >
                <Text
                  style={[
                    StyleOf.selfCenter,
                    StyleOf.textWhite,
                    { textAlign: "center" },
                  ]}
                >
                  {/* <Text>Send Marcha Done Request</Text> */}
                  <Text>Done Marcha</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[StyleOf.col5]}>
              <CancelMarchaBtn request_id={request_id} title="Cancel Marcha" />
            </View>
          </View>
        </View>

        <View
          style={[
            StyleOf.containerInner,
            { paddingHorizontal: 20, paddingVertical: 10 },
          ]}
        >
          {messagesState == 0 && <MarchaSpinner size={70} />}

          {messagesState !== 0 && (
            <FlatList
              // inverted={1}
              data={dataList}
              ref={flatListRef}
              renderItem={renderChat}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View style={StyleOf.rowItemCenter}>
                  <Text style={[StyleOf.f18, StyleOf.textGray]}>Say Hi!</Text>
                </View>
              )}
              onContentSizeChange={() =>
                flatListRef.current.scrollToEnd({ animated: true })
              }
              onLayout={() =>
                flatListRef.current.scrollToEnd({ animated: true })
              }
            />
          )}
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
            onChangeText={setMessage}
            value={message}
            //onSubmitEditing={setMessage}
            style={{
              // lineHeight: 0,
              paddingHorizontal: 8,
              paddingVertical: 3,
              alignSelf: "flex-start",
              width: "90%",
            }}
            //value={defaultTextInputValue}
            // ref={textInputRef}
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
};

export default memo(Chat);

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
