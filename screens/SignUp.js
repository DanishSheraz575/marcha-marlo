//import React from 'react';
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";

import Loader from "../components/Loader";

import SelectDropdown from "react-native-select-dropdown";
import StyleOf from "../assets/AppStyles";

// import SocialBtns from "../components/SocialBtns";

export default function SignUp({ navigation }) {

  const {fullContainer, rowItemCenter, f26, fwBold, textEminence, f14, textCodGray, input, btn, dropShadow,bgEminence, btnLabel }=StyleOf;

  const genders = ["Male", "Female"];

  const [showLoader, setShowLoader] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [conpassword, setConfirmPassword] = useState("");
  const [conpasswordError, setConfirmPasswordError] = useState(false);

  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState(false);

  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  function getMeSignup() {
    if (name === "") {
      setNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (conpassword === "") {
      setConfirmPasswordError(true);
    }
    if (contact === "") {
      setContactError(true);
    }
   
    const data = {
      api_token: global.token,
      full_name: name,
      email: email,
      password: password,
      gender: gender,
      contact_number: contact,
      city: city,
    };

    NetInfo.fetch().then((isConnected) => {
      if (isConnected) {
        setShowLoader(true);
        fetch(global.api + "register", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((json) => {
            setShowLoader(false);
            alert(json.result);
            var status = json.status.toLowerCase();
            if (status == "success") {
              alert(json.result);
              navigation.navigate('Login');
            } else {
              alert(json.result);
            }
          })
          .catch((error) => {
            setShowLoader(false);
            alert(error);
          });
      }else{
        setShowLoader(false);
        alert("Not connected");
      }
    });
  }

  return (
    <ScrollView>
      <View style={[fullContainer]}>
        <View style={rowItemCenter}>
          <Text
            style={[
              f26,
              fwBold,
              textEminence,
              { marginTop: 30 },
            ]}
          >
            Sign up
          </Text>
          <Text
            style={[
              f14,
              fwBold,
              textCodGray,
              { marginBottom: 30 },
            ]}
          >
            Please sign up to enter in a app.
          </Text>

          <TextInput
            style={[
              input,
              nameError ? { borderColor: global.borderDanger } : "",
            ]}
            placeholder="Your Name"
            onChangeText={(name) => setName(name)}
            onFocus={() => setNameError(false)}
          />

          <TextInput
            keyboardType="email-address"
            style={[
              input,
              emailError ? { borderColor: global.borderDanger } : "",
            ]}
            placeholder="Your Email"
            autoCompleteType="email"
            onChangeText={(email) => setEmail(email)}
            onFocus={() => setEmailError(false)}
          />
          <TextInput
            style={[
              input,
              passwordError ? { borderColor: global.borderDanger } : "",
            ]}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            onFocus={() => setPasswordError(false)}
          />
          <TextInput
            style={[
              input,
              conpasswordError ? { borderColor: global.borderDanger } : "",
            ]}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(conpassword) => setConfirmPassword(conpassword)}
            onFocus={() => setConfirmPasswordError(false)}
          />

          <TextInput
            style={[
              input,
              contactError ? { borderColor: global.borderDanger } : "",
            ]}
            placeholder="Contact"
            keyboardType="phone-pad"
            onChangeText={(contact) => setContact(contact)}
            onFocus={() => setContactError(false)}
          />

          <SelectDropdown
            buttonStyle={input}
            buttonTextStyle={[{ textAlign: "left" }]}
            buttonTextStyleAfterSelection={[{ color: "#000000" }]}
            defaultButtonText={"Gender"}
            data={genders}
            onSelect={(gender) => setGender(gender)}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected ,color:"#afafaf",
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          <TextInput
            style={input}
            placeholder="City"
            onChangeText={(city) => setCity(city)}
          />

          <TouchableOpacity
            onPress={()=>getMeSignup()}
            style={[
              btn,
              dropShadow,
              bgEminence,
              { marginTop: 20, marginBottom: 35 },
            ]}
          >
            <Text style={btnLabel}>sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader showit={showLoader} />
    </ScrollView>
  );
}
