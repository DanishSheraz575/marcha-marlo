
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';

import StyleOf from '../assets/AppStyles';

import Logo from '../components/Logo';
import SocialBtns from '../components/SocialBtns';

const image =  require('../assets/homebg.png');

export default function Home({ navigation }) {
  return (
    <View style={StyleOf.fullContainer}>

      {/* <ImageBackground source={image} style={StyleOf.bgImage}> */}
      
        <View style={StyleOf.containerInner}>    

          <View style={StyleOf.rowItemCenter} >
            <Logo />   
          </View>

          <View style={StyleOf.rowItemCenter} >

            <Text style={[StyleOf.textLg, {marginTop:50,marginBottom:50,textAlign:'center'}]}>
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
        
      {/* </ImageBackground> */}

    </View>
  );
}
