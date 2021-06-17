import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import StyleOf from '../assets/AppStyles';
import SocialBtns from '../components/SocialBtns';


export default function SignUp({navigation}) {
  return (
    <View style={[StyleOf.container, StyleOf.bgWhite]}>
      
      <View style={StyleOf.rowItemCenter} >
          <Text style={[StyleOf.textLg, StyleOf.textEminence]}>Sign up</Text>                 
          <Text style={[StyleOf.textMd, StyleOf.textCodGray,{marginBottom:30}]}>Please sign up to enter in a app.</Text>     
      </View>



      <View style={StyleOf.rowItemCenter} >

        <TextInput
          style={StyleOf.input}
          placeholder="YOUR NAME"
        />

        <TextInput
          style={StyleOf.input}
          placeholder="YOUR EMAIL"
        />
        <TextInput
          style={StyleOf.input}
          placeholder="ENTER PASSWORD"
        />
        <TextInput
          style={StyleOf.input}
          placeholder="CONFIRM PASSWORD"
        />

        <TouchableOpacity onPress={() => navigation.navigate('MarchaHome')} style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgEminence,{marginTop:20}]}>
            <Text style={StyleOf.btnLabel}>sign up</Text>
        </TouchableOpacity>
        
      </View>




      <View style={StyleOf.rowItemCenter} >

        <View style={StyleOf.moveToBottom}>
          <SocialBtns />
        </View>

      </View>
            
    </View>
  );
}
