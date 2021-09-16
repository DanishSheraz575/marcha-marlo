import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import * as ImagePicker from "expo-image-picker";

import StyleOf from "../assets/AppStyles";
import ScreenHeader from "../components/ScreenHeader";

export default function MyProfile({}) {
  const genders = ["Male", "Female"];

  const [name, setName] = useState(global.ufull_name);
  const [nameError, setNameError] = useState(false);

  //const [email, setEmail] = useState("");
  //const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  //const [passwordError, setPasswordError] = useState(false);

  const [contact, setContact] = useState(global.ucontact_number);
  const [contactError, setContactError] = useState(false);

  const [gender, setGender] = useState(global.ugender);
  const [city, setCity] = useState(global.ucity);



  let [profileImage, setProfileImage] = useState(global.uimage);
  let [newProfileImage, setNewProfileImage] = useState("");

  let openImagePickerAsync = async () => {
    //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      //base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let img = { localUri: pickerResult.uri };
    setNewProfileImage(img.localUri);
    setProfileImage(img.localUri);
  };


  function update_profile() {
    
    if (name === "") {
      setNameError(true);
      return false;
    }
    if (contact === "") {
      setContactError(true);
      return false;
    }


    var data = new FormData();  
    data.append('image', {  
      uri: newProfileImage,
      name: 'file',
      type: 'image/jpg'
    });
    data.append('api_token', global.token);
    data.append('user_id', global.uid);
    data.append('password', password);
    data.append('full_name', name);
    data.append('gender', gender);
    data.append('contact_number', contact);
    data.append('city', city);
    /*
    const asdata = {
      api_token: global.token,
      user_id: global.uid,
      image: newProfileImage,
      password: password,
      full_name: name,
      gender: gender,
      contact_number: contact,
      city: city,
    };
    */
    fetch(global.api + "update_profile", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Content-Type': 'multipart/form-data'
      },
      //body: JSON.stringify(data),
      body: data,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "Success") {
          global.ufull_name = name;
          global.ugender = gender;
          global.ucity = city;
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
            <Text
              style={[
                StyleOf.f26,
                StyleOf.fwBold,
                StyleOf.textBlack,
                { marginTop: 10 },
              ]}
            >
              Edit Your Profile,
            </Text>
            <View style={styles.profileImageContainer}>
              {/* <Image style={styles.profileImage} source={global.uimage} /> */}
              {profileImage == "" ? (
                <Image
                  source={require("../assets/user_profile.png")}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              )}

              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={[{ elevation: 3,height:35,width:35,marginLeft:90,marginTop:-30 }]}
              >
                {/* <Image style={[StyleOf.editIcon,{marginTop:-36,marginLeft:100,zIndex:2}]} source={require('../assets/camera_icon.png')} />*/}
                <Image
                  style={[{marginLeft:3,marginTop:3}]}
                  source={require("../assets/camera_icon.png")}
                /> 
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                StyleOf.input,
                nameError ? { borderColor: global.borderDanger } : "",
              ]}
              placeholder="Enter Name"
              value={name}
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
              style={[
                StyleOf.input,
                contactError ? { borderColor: global.borderDanger } : "",
              ]}
              placeholder="Enter Contact"
              value={contact}
              onChangeText={(contact) => setContact(contact)}
              onFocus={() => setContactError(false)}
            />

            <SelectDropdown
              buttonStyle={StyleOf.input}
              buttonTextStyle={[{ textAlign: "left", color: "#000000" }]}
              buttonTextStyleAfterSelection={[{ color: "#000000" }]}
              defaultButtonText={gender}
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
              style={StyleOf.input}
              placeholder="City"
              value={city}
              onChangeText={(city) => setCity(city)}
            />

            <TouchableOpacity
              onPress={update_profile}
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgEminence,
                { marginBottom: 40 },
              ]}
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
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: "#ffffff",
    /*
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    zIndex: 1,
    */
    position:"relative"
  },
  profileImageContainer: {
    marginTop: 20,
    marginBottom: 30,
    width: 120,
    height: 130,
  },
});
