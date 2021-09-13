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


  function get_me_signup() {

    if (name === "") { setNameError(true); }
    if (email === "") { setEmailError(true); }
    if (password === "") { setPasswordError(true); }
    if (conpassword === "") { setConfirmPasswordError(true); }
    if (contact === "") { setContactError(true); }

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
            style={[StyleOf.input, nameError ? { borderColor: global.borderDanger} : '']}
            placeholder="Your Name"
            onChangeText={(name) => setName(name)}
            onFocus={() => setNameError(false)}
          />

          <TextInput
            keyboardType ="email-address"
            style={[StyleOf.input, emailError ? { borderColor: global.borderDanger} : '']}
            placeholder="Your Email"
            autoCompleteType="email"
            onChangeText={(email) => setEmail(email)}
            onFocus={() => setEmailError(false)}
          />
          <TextInput
            style={[StyleOf.input, passwordError ? { borderColor: global.borderDanger} : '']}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            onFocus={() => setPasswordError(false)}
          />
          <TextInput
            style={[StyleOf.input, conpasswordError ? { borderColor: global.borderDanger} : '']}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(conpassword) => setConfirmPassword(conpassword)}
            onFocus={() => setConfirmPasswordError(false)}
          />


          <TextInput
            style={[StyleOf.input, contactError ? { borderColor: global.borderDanger} : '']}
            placeholder="Contact"
            keyboardType="phone-pad"
            onChangeText={(contact) => setContact(contact)}
            onFocus={() => setContactError(false)}
          />



<SelectDropdown 
  buttonStyle={StyleOf.input}
  buttonTextStyle={[{textAlign:'left'}]}
  buttonTextStyleAfterSelection={[{color:'#000000'}]}
  defaultButtonText={"Gender"}
	data={genders}
	onSelect={(gender) => setGender(gender)}
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
