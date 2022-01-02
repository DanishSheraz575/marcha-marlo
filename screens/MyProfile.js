import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";
import SelectDropdown from "react-native-select-dropdown";

// import * as ImagePicker from "expo-image-picker";

import Loader from "../components/Loader";

import StyleOf from "../assets/AppStyles";
import ScreenHeader from "../components/ScreenHeader";
import { Picker } from "../services/ImagePicker";

export default function MyProfile({}) {

  const {fullContainer, containerInner, rowItemCenter, f20, fwBold, textBlack, input, btn, dropShadow, bgEminence, btnLabel}=StyleOf;

  const genders = ["Male", "Female"];

  const [showLoader, setShowLoader] = useState(false);

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

  const [profileImage, setProfileImage] = useState(global.uimage);
  const [newProfileImage, setNewProfileImage] = useState("");

  let openImagePickerAsync = async (type) => {
    try {
      const pickerResult = await Picker[
        type == "camera" ? "openCamera" : "openImagePicker"
      ]();
      if (pickerResult?.status) {
        let img = { localUri: pickerResult?.image?.uri };
        setNewProfileImage(img.localUri);
        setProfileImage(img.localUri);
        global.uimage = img.localUri;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = () => {
    Alert.alert("Image Picker", "choose or take image", [
      { text: "Cancel", onPress: () => null },
      {
        text: "Open gallery",
        onPress: () => openImagePickerAsync(""),
      },
      {
        text: "Open Camera",
        onPress: () => openImagePickerAsync("camera"),
        style: "cancel",
      },
    ]);
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

    setShowLoader(true);
    var data = new FormData();

    if (newProfileImage != "") {
      data.append("image", {
        uri: newProfileImage,
        name: "file",
        type: "image/jpg",
      });
    } else {
      data.append("file", "");
    }

    data.append("api_token", global.token);
    data.append("user_id", global.uid);
    data.append("password", password);
    data.append("full_name", name);
    data.append("gender", gender);
    data.append("contact_number", contact);
    data.append("city", city);
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

    NetInfo.fetch().then((isConnected) => {
      if (isConnected) {
        fetch(global.api + "update_profile", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
          //body: JSON.stringify(data),
          body: data,
        })
          .then((response) => response.json())
          .then((json) => {
            setShowLoader(false);
            var status = json.status.toLowerCase();
            if (status == "success") {
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
      } else {
        setShowLoader(false);
        alert("not connected");
      }
    });
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="My Account" />

      <View style={[containerInner]}>
        <ScrollView>
          <View style={rowItemCenter}>
            <Text
              style={[
                f20,
                fwBold,
                textBlack,
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
                  style={[styles.profileImage]}
                  transition={false}
                />
              ) : (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              )}

              <TouchableOpacity
                onPress={showAlert}
                style={[
                  {
                    elevation: 3,
                    height: 35,
                    width: 35,
                    marginLeft: 90,
                    marginTop: -30,
                  },
                ]}
              >
                <Image
                  style={[{ marginLeft: 3, marginTop: 3 }]}
                  source={require("../assets/camera_icon.png")}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                input,
                nameError ? { borderColor: global.borderDanger } : "",
              ]}
              placeholder="Enter Name"
              value={name}
              onChangeText={(name) => setName(name)}
              onFocus={() => setNameError(false)}
            />

            <TextInput
              style={input}
              placeholder="Enter Email"
              value={global.uemail}
              onChangeText={(email) => setEmail(email)}
            />

            <TextInput
              style={input}
              placeholder="Change Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />

            <TextInput
              style={[
                input,
                contactError ? { borderColor: global.borderDanger } : "",
              ]}
              placeholder="Enter Contact"
              value={contact}
              onChangeText={(contact) => setContact(contact)}
              onFocus={() => setContactError(false)}
            />

            <SelectDropdown
              buttonStyle={input}
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
              style={input}
              placeholder="City"
              value={city}
              onChangeText={(city) => setCity(city)}
            />

            <TouchableOpacity
              onPress={update_profile}
              style={[
                btn,
                dropShadow,
                bgEminence,
                { marginBottom: 40 },
              ]}
            >
              <Text style={btnLabel}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Loader showit={showLoader} />
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
    
  },
  profileImageContainer: {
    marginTop: 10,
    marginBottom: 15,
    width: 120,
    height: 130
  },
});
