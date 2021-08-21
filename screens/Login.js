//import React from 'react';
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';

import StyleOf from '../assets/AppStyles';
import SocialBtns from '../components/SocialBtns';



export default function Login({navigation}) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function get_me_login(){
    alert(email);
    alert(password);

    const data = { api_token: '3154f2a10b4aecaa9ae8c10468cd8227',email:email,password:password };
    fetch('https://www.marchamarlo.com/api/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then((json) =>  {
      
      if(json.status=='Success'){

      }else{
        console.log(json.result.email);
      }
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }
  

  return (
    <View style={[StyleOf.container, StyleOf.bgWhite]}>
      
      <View style={StyleOf.rowItemCenter} >
          <Text style={[StyleOf.textLg, StyleOf.textRadicalRed]}>Welcome back,</Text>                 
          <Text style={[StyleOf.textMd, StyleOf.textCodGray]}>Log in with your account</Text>     
      </View>



      <View style={StyleOf.rowItemCenter} >

        <TextInput
          style={StyleOf.input}
          placeholder="Enter Email"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity onPress={get_me_login} style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgRadicalRed]}>
            <Text style={StyleOf.btnLabel}>Login</Text>
        </TouchableOpacity>

        <Text  style={{marginTop:20}}>
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