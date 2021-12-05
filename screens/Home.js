
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';

import StyleOf from '../assets/AppStyles';

import Logo from '../components/Logo';
import SocialBtns from '../components/SocialBtns';

const image =  require('../assets/homebg.png');

export default function Home({ navigation }) {

  const {fullContainer,bgImage,containerInner,rowItemCenter,f26,fwBold,btn,dropShadow,bgRadicalRed,btnLabel,moveToBottom,bgEminence}=StyleOf;

  return (
    <View style={fullContainer}>
      <ImageBackground source={image} style={bgImage}>
        <View style={containerInner}>    
          <View style={rowItemCenter} >
            <Logo />   
          </View>
          <View style={rowItemCenter} >
            <Text style={[f26,fwBold, {marginTop:40,marginBottom:40,textAlign:'center'}]}>
              Be together, 
              {'\n'}
              anytime, everywhere
            </Text>                             
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[btn, dropShadow, bgRadicalRed]}>
              <Text style={btnLabel}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={[btn, dropShadow, bgEminence]}>
              <Text style={btnLabel}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={rowItemCenter} >
            <View style={moveToBottom}>
              <SocialBtns />
            </View>
          </View>
        </View>      
      </ImageBackground>
    </View>
  );
}
