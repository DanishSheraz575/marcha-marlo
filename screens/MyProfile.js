import React, { useState } from "react";
import { View, Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';


import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';

export default function MyProfile({ }) {

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState(false);



  const genders = ["Male", "Female"];

  //const [name, setName] = useState(false);
  //const [email, setEmail] = useState(false);
  //const [image, setImage] = global.uimage;
  //const [password, setPassword] = useState(false);
  //const [contact, setPhone] = useState(false);
  const [gender, setGender] = useState(false);
  const [city, setCity] = useState(false);

  function update_profile() {

    if (name === "") { setNameError(true); }
    if (contact === "") { setContactError(true); }

    const data = {
      api_token: global.token,
      user_id: global.uid,
      password: password,
      gender: gender,
      contact_number: contact,
      city: city,
    };
    fetch(global.api + "update_profile", {
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
    <View style={StyleOf.fullContainer}>

      <ScreenHeader title="My Account" />

      <View style={[StyleOf.containerInner]}>
        
      <ScrollView>

      <View style={StyleOf.rowItemCenter}>
        <Text style={[StyleOf.f26, StyleOf.fwBold, StyleOf.textBlack,{marginTop:10}]}>
          Edit Your Profile,
        </Text>

        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={global.uimage} />
          <TouchableOpacity style={[{elevation:3}]} >
            <Image style={[StyleOf.editIcon,{marginTop:-36,marginLeft:100,zIndex:2,position:"relative",elevation:3}]} source={require('../assets/camera_icon.png')} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={[StyleOf.input, nameError ? { borderColor: global.borderDanger} : '']}
          placeholder="Enter Name"
          value={global.ufull_name}
          onChangeText={(name) => setName(name)}
          onFocus={() => setNameError(false)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Enter Email"
          value={global.uemail}
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Change Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />


        <TextInput
          style={[StyleOf.input, contactError ? { borderColor: global.borderDanger} : '']}
          placeholder="Enter Contact"
          value={global.ucontact_number}
          onChangeText={(contact) => setPassword(contact)}
          onFocus={() => setContactError(false)}
        />

<SelectDropdown 
  buttonStyle={StyleOf.input}
  buttonTextStyle={[{textAlign:'left',color:'#000000'}]}
  buttonTextStyleAfterSelection={[{color:'#000000'}]}
  defaultButtonText={global.ugender}
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
            value={global.ucity}
            onChangeText={(city) => setCity(city)}
          />

        <TouchableOpacity
          onPress={update_profile}
          style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgEminence,{marginBottom:40}]}
        >
          <Text style={StyleOf.btnLabel}>Update</Text>
        </TouchableOpacity>

      </View>


      </ScrollView>


      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({
  profileImage: {
    width:120,
    height:120,
    borderRadius: 100,
    borderWidth: 8,
    borderColor:"#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    zIndex:1,
  },
  profileImageContainer:{
    marginTop:20,
    marginBottom:30,
  }
});