import React from 'react';
import {Alert, View, Text, TouchableOpacity, TextInput } from 'react-native';

import StyleOf from '../assets/AppStyles';
import SocialBtns from '../components/SocialBtns';




export default function Login({navigation}) {


  let product_img_url = SecureStore.getItemAsync('product_images_base_url');

  const alertit = () =>
  Alert.alert(
    "Alert Title",
    product_img_url,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  

  return (
    <View style={[StyleOf.container, StyleOf.bgWhite]}>
      
      <View style={StyleOf.rowItemCenter} >
          <Text style={[StyleOf.textLg, StyleOf.textRadicalRed]}>Welcome back,</Text>                 
          <Text style={[StyleOf.textMd, StyleOf.textCodGray]}>Log in with your account</Text>     
      </View>



      <View style={StyleOf.rowItemCenter} >

        <TextInput
          style={StyleOf.input}
          placeholder="YOUR NAME"
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Enter Password"
        />

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgRadicalRed]}>
            <Text style={StyleOf.btnLabel}>Login</Text>
        </TouchableOpacity>

        <Text  onPress={alertit} style={{marginTop:20}}>
          Forgot password?
        </Text>

      </View>


      <View style={StyleOf.rowItemCenter} >

        <View style={StyleOf.moveToBottom}>
          <SocialBtns />

          <Text style={{marginTop:30,marginBottom:10}}>
            Don’t have an account? 
            <Text onPress={()=>navigation.navigate('SignUp')} style={[StyleOf.textRadicalRed, StyleOf.fwBold]}> Sign Up</Text>
          </Text> 

        </View>
      </View>
            
    </View>
  );
}