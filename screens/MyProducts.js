import React from 'react';
import { View, Text, Image,TouchableOpacity, ScrollView } from 'react-native';


import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function MyProducts({ }) {



  return (
    <View style={[StyleOf.fullContainer]}>

      <ScreenHeader title="My Products" />

      <View style={StyleOf.containerInner}>
        <View>
          <Text style={{fontSize:42,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>AWW !!</Text>
          <Image source={require('../assets/oh.png')} />
          <Text style={{fontSize:26,fontWeight:'bold',marginBottom:10,textAlign:'center'}}>No products found</Text>
        </View>

        <TouchableOpacity style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgEminence,{marginTop:20}]}>
            <Text style={StyleOf.btnLabel}>add product now!</Text>
        </TouchableOpacity>
        
      </View>
      





      <BottomLinks active="BottomLinks" />


    </View>
  );
}
