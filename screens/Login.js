//import React from 'react';
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Pressable
} from "react-native";

import StyleOf from "../assets/AppStyles";
import SocialBtns from "../components/SocialBtns";

export default function Login({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [password_recover_email, setPasswordRecoverEmail] = useState("");
  const [email, setEmail] = useState("mhaneef05@gmail.com");
  const [password, setPassword] = useState("asd123");


  const data = { api_token: global.token};

  fetch(global.api + "get_config", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status == "Success") {
        const config=json.result;

        global.product_images_base_url=config.product_images_base_url;
        global.chat_attachments_base_url=config.chat_attachments_base_url;
        global.user_image_base_url=config.user_image_base_url;

      } else {
        alert(json.result);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });


  function get_me_login() {
    
    const data = { api_token: global.token, email: email, password: password };

    fetch(global.api + "login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "Success") {
          const uinfo=json.result;
          global.uid=uinfo.user_id;
          global.ufull_name=uinfo.full_name;
          global.uemail=uinfo.email;

          if(uinfo.image!=''){
            global.uimage=global.user_image_base_url+uinfo.image;
          }

          global.ugender=uinfo.gender;
          global.ucountry=uinfo.country;
          global.ucity=uinfo.city;
          global.ucontact_number=uinfo.contact_number;
          global.ustatus=uinfo.status;

          navigation.navigate("Dashboard");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function reset_my_password() {
    const data = { api_token: global.token, email: password_recover_email };
    fetch(global.api + "forget_password", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "Success") {
          alert(json.result);
          setModalVisible(false);
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <View style={[StyleOf.fullContainer, StyleOf.bgWhite]}>
      <View style={StyleOf.rowItemCenter}>
        <Text style={[StyleOf.f26, StyleOf.fwBold, StyleOf.textRadicalRed]}>
          Welcome back,
        </Text>
        <Text style={[StyleOf.f14, StyleOf.fwBold, StyleOf.textCodGray]}>
          Log in with your account
        </Text>
      </View>

      <View style={StyleOf.rowItemCenter}>
        <TextInput
          keyboardType ="email-address"
          style={StyleOf.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          onPress={get_me_login}
          style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgRadicalRed]}
        >
          <Text style={StyleOf.btnLabel}>Login</Text>
        </TouchableOpacity>

        <Text onPress={() => setModalVisible(true)} style={{ marginTop: 20 }}>
          Forgot password?
        </Text>
      </View>

      <View style={StyleOf.rowItemCenter}>
        <View style={StyleOf.moveToBottom}>
          <SocialBtns />

          <Text style={{ marginTop: 30, marginBottom: 10 }}>
            Don’t have an account?
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={[StyleOf.textRadicalRed, StyleOf.fwBold]}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={StyleOf.centeredView}>
          <View style={StyleOf.modalView}>
            <Text style={[StyleOf.modalHeading, StyleOf.textRadicalRed]}>
              Recover Your Password
            </Text>

            <TextInput
              style={[StyleOf.input,{width:"100%"}]}
              placeholder="Enter Email"
              onChangeText={(password_recover_email) =>
                setPasswordRecoverEmail(password_recover_email)
              }
            />
            <Pressable
              style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgEminence]}
              onPress={reset_my_password}
            >
              <Text style={StyleOf.btnLabel}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
