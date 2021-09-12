import React, { useState } from "react";
import { View, Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Image } from 'react-native';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';

export default function MyProfile({ }) {

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


  //const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  //const [image, setImage] = global.uimage;
  const [password, setPassword] = useState(false);
  const [contact, setPhone] = useState(false);
  const [gender, setGender] = useState(false);
  const [city, setCity] = useState(false);


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
          style={StyleOf.input}
          placeholder="Enter Name"
          value={global.ufull_name}
          onChangeText={(name) => setEmail(name)}
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
          style={StyleOf.input}
          placeholder="Enter Contact"
          value={global.ucontact_number}
          onChangeText={(contact) => setPassword(contact)}
        />

        <TextInput
            style={StyleOf.input}
            placeholder="Gender"
            value={global.ugender}
            onChangeText={(gender) => setGender(gender)}
          />

        <TextInput
            style={StyleOf.input}
            placeholder="City"
            value={global.ucity}
            onChangeText={(city) => setCity(city)}
          />

        <TouchableOpacity
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