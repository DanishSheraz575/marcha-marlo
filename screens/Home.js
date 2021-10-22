
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';


import * as SecureStore from 'expo-secure-store';

import StyleOf from '../assets/AppStyles';

import Logo from '../components/Logo';
import SocialBtns from '../components/SocialBtns';

const image =  require('../assets/homebg.png');




export default function Home({ navigation }) {


  async function getFromLocal(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert(result);
    } else {
      alert('No values stored under that key.');
    }
  }

  getFromLocal('uid');

  /*  
  if (typeof global.uid !== 'undefined' && global.uid>0) {
    navigation.navigate('Dashboard');
  }else{
    navigation.navigate('Login');
  }
*/

  return (
    <View style={StyleOf.fullContainer}>

      <ImageBackground source={image} style={StyleOf.bgImage}>
      
        <View style={StyleOf.containerInner}>    

          <View style={StyleOf.rowItemCenter} >
            <Logo />   
          </View>

          <View style={StyleOf.rowItemCenter} >

            <Text style={[StyleOf.f26,StyleOf.fwBold, {marginTop:40,marginBottom:40,textAlign:'center'}]}>
              Be together, 
              {'\n'}
              anytime, everywhere
            </Text>                 
                              
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgRadicalRed]}>
              <Text style={StyleOf.btnLabel}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgEminence]}>
              <Text style={StyleOf.btnLabel}>Sign Up</Text>
            </TouchableOpacity>

          </View>

          <View style={StyleOf.rowItemCenter} >
            <View style={StyleOf.moveToBottom}>
              <SocialBtns />
            </View>
          </View>

        </View>
        
      </ImageBackground>

    </View>
  );
}
