import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import StyleOf from '../assets/AppStyles';


export default function ScreenHeader({title }) {
    const navigation = useNavigation(); 
  return (
    <View>
        <View style={[StyleOf.flexIt,{paddingHorizontal:10, paddingVertical:15, backgroundColor:'#662D91', marginTop:25,alignItems: 'center',}]}>
            <View>                
                <TouchableOpacity style={StyleOf.itemCenter} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrow-left.png')} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{color:'#FFFFFF',fontSize: 20,fontWeight:'bold', }}>{title}</Text>
            </View>
            <View>
                <Image source={require('../assets/bell.png')}  />
            </View>
        </View>
    </View>
  );
}