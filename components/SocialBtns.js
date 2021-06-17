import * as React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const facebookIcon =  require('../assets/facebook-icon.png');
const twitterIcon =  require('../assets/twitter-icon.png');

export default function SocialBtns() {
  return (
    <View>
        <Text style={styleOf.enterWithSocial}>Enter via social networks</Text>
        <View style={styleOf.flexIt}>
            <TouchableOpacity style={[styleOf.socialBtn, styleOf.btn, styleOf.twitterButton]}>
                <Image source={twitterIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styleOf.socialBtn, styleOf.btn, styleOf.facebookButton]}>
                <Image source={facebookIcon} />
            </TouchableOpacity>
        </View>
    </View>
  );
}


const styleOf = StyleSheet.create({
    enterWithSocial:{
        color:'#1A1A1A',
        fontSize: 14,
        marginBottom:20,
        textAlign:'center',
        fontWeight:'bold',  
    },
    flexIt:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn:{
        alignItems: "center",
        padding:6,
        borderRadius:50,
    },
    socialBtn:{
        margin:5,
        width:78,
        height:28,
        alignItems: "center",
    },
    facebookButton:{            
        backgroundColor: "#475993",
    },
    twitterButton:{
        backgroundColor: "#76A9EA", 
    },
  });