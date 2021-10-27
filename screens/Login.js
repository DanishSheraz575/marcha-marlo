//import React from 'react';
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import NetInfo from "@react-native-community/netinfo";

import Loader from "../components/Loader";
import SocialBtns from "../components/SocialBtns";

export default function Login({ navigation }) {
  const [showLoader, setShowLoader] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [password_recover_email, setPasswordRecoverEmail] = useState("");
  //const [email, setEmail] = useState("mhaneef05@gmail.com");
  //const [password, setPassword] = useState("asd123");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  function get_me_login() {
    if (email == "") {
      alert("Email is required");
      return false;
    }

    if (password == "") {
      alert("Password is required");
      return false;
    }

    NetInfo.fetch().then((isConnected) => {
      if (isConnected) {
        setShowLoader(true);
        const data = {
          api_token: global.token,
          email: email,
          password: password,
        };

        fetch(global.api + "login", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((json) => {
            setShowLoader(false);
            var status = json.status.toLowerCase();
            if (status == "success") {
              const uinfo = json.result;

              global.uid = uinfo.user_id;
              global.ufull_name = uinfo.full_name;
              global.uemail = uinfo.email;

              if (uinfo.image != "") {
                uinfo.image = global.user_image_base_url + uinfo.image;
                global.uimage = uinfo.image;
              }

              global.ugender = uinfo.gender;
              global.ucountry = uinfo.country;
              global.ucity = uinfo.city;
              global.ucontact_number = uinfo.contact_number;
              global.ustatus = uinfo.status;

              setLocal("marchaUserInfo", JSON.stringify(uinfo));

              navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
              });

              navigation.navigate("Dashboard");
            } else {
              alert(json.result);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        alert("not connected");
      }
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
        var status = json.status.toLowerCase();
        if (status == "success") {
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
          style={{ textTransform: "lowercase" }}
          keyboardType="email-address"
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
              style={[StyleOf.input, { width: "100%" }]}
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

      <Loader showit={showLoader} />
    </View>
  );
}
