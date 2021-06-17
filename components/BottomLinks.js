import * as React from 'react';
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import StyleOf from '../assets/AppStyles';


export default function BottomLinks({active}) {
    const navigation = useNavigation(); 
    
  return (
    <View style={{justifyContent: 'flex-end',bottom:0}}>
        <View style={[StyleOf.flexIt,{paddingHorizontal:10, paddingVertical:0, backgroundColor:'#fff', alignItems: 'center'}]}>

            <View style={styles.myNav}>                  
                <TouchableOpacity style={StyleOf.itemCenter}  onPress={()=>navigation.navigate('MarchaHome')}>
                    <Entypo name="home" color={active==='home' ? '#FF3D57':'#C5C5C5'} size={24} />
                    <Text style={styles.myNavText,[active==='home' ? styles.myNavTextActive:styles.myNavText]}>HOME</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.myNav}>
                <TouchableOpacity style={StyleOf.itemCenter}  onPress={()=>navigation.navigate('ExploreProducts')}>
                    <Entypo name="compass" color={active==='explore' ? '#FF3D57':'#C5C5C5'} size={24} />
                    <Text style={styles.myNavText,[active==='explore' ? styles.myNavTextActive:styles.myNavText]}>EXPLORE</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.myNav}>            
                <TouchableOpacity style={StyleOf.itemCenter}  onPress={()=>navigation.navigate('MyProducts')}>
                    <Image  style={styles.imgNav}  source={require('../assets/tab_favicon.png')}  onPress={()=>navigation.navigate('MyProducts')} />  
                </TouchableOpacity>
            </View>
            <View style={styles.myNav}>
                <TouchableOpacity style={StyleOf.itemCenter}  onPress={()=>navigation.navigate('Chats')}>
                    <Entypo name="chat" color={active==='chats' ? '#FF3D57':'#C5C5C5'} size={24} />
                    <Text style={styles.myNavText,[active==='chats' ? styles.myNavTextActive:styles.myNavText]}>CHAT</Text>
                </TouchableOpacity>           
            </View>
            <View style={styles.myNav}>
                <TouchableOpacity style={StyleOf.itemCenter}  onPress={()=>navigation.navigate('AddProduct')}>
                    <Entypo name="circle-with-plus" color={active==='add' ? '#FF3D57':'#C5C5C5'} size={24} />
                    <Text style={styles.myNavText,[active==='add' ? styles.myNavTextActive:styles.myNavText]}>ADD PRODUCT</Text>
                </TouchableOpacity>                     
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    myNav:{
        width:'20%'
    },
    myNavText:{
        fontSize:11,
        color:'#C5C5C5'
    },
    myNavTextActive:{
        fontSize:11,
        color:'#FF3D57',
    },
    imgNav:{
        marginTop:-30,
        marginBottom:2,
    }
  });