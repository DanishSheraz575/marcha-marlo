//import React from 'react';
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

import SelectDropdown from 'react-native-select-dropdown';
import StyleOf from "../assets/AppStyles";

// import SocialBtns from "../components/SocialBtns";

export default function SignUp({ navigation }) {

  const genders = ["Male", "Female"];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  function get_me_signup() {
    alert(gender);
    return false;
    const data = {
      api_token: global.token,
      full_name: name,
      email: email,
      password: password,
      gender: gender,
      contact_number: contact,
      city: city,
    };
    fetch(global.api + "register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.result);
        if (json.status == "Success") {
          alert(json.result);
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <ScrollView>
      <View style={[StyleOf.fullContainer]}>
        <View style={StyleOf.rowItemCenter}>

          <Text
            style={[StyleOf.f26, StyleOf.fwBold, StyleOf.textEminence, { marginTop: 30 }]}
          >
            Sign up
          </Text>
          <Text
            style={[StyleOf.f14, StyleOf.fwBold, StyleOf.textCodGray, { marginBottom: 30 }]}
          >
            Please sign up to enter in a app.
          </Text>

          <TextInput
            style={StyleOf.input}
            placeholder="Your Name"
            onChangeText={(name) => setName(name)}
          />

          <TextInput
            style={StyleOf.input}
            placeholder="Your Email"
            autoCompleteType="email"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={StyleOf.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TextInput
            style={StyleOf.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(conpassword) => setConfirmPassword(conpassword)}
          />


          <TextInput
            style={StyleOf.input}
            placeholder="Contact"
            keyboardType="phone-pad"
            onChangeText={(contact) => setContact(contact)}
          />



<SelectDropdown 
  buttonStyle={StyleOf.input}
  buttonTextStyle={[{textAlign:'left'}]}
  buttonTextStyleAfterSelection={[{color:'#000000'}]}
  defaultButtonText={"Gender"}
	data={genders}
	onSelect={(gender) => setContact(gender)}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected ,color:"#afafaf",
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>


          <TextInput
            style={StyleOf.input}
            placeholder="City"
            onChangeText={(city) => setCity(city)}
          />

          <TouchableOpacity
            onPress={get_me_signup}
            style={[
              StyleOf.btn,
              StyleOf.dropShadow,
              StyleOf.bgEminence,
              { marginTop: 20, marginBottom: 35 },
            ]}
          >
            <Text style={StyleOf.btnLabel}>sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
