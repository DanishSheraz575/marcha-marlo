import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import StyleOf from '../assets/AppStyles';
import SocialBtns from '../components/SocialBtns';


export default function Login({navigation}) {
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

        <Text style={{marginTop:20}}>
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
