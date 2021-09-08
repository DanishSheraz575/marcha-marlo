import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import StyleOf from '../assets/AppStyles';
import SocialBtns from '../components/SocialBtns';


export default function SignUp({navigation}) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');


  function get_me_signup(){

    const data = { 
      api_token: '3154f2a10b4aecaa9ae8c10468cd8227',
      name:name,
      email:email,
      password:password, 
      gender:gender, 
      contact:contact, 
      city:city, 
    };
    fetch('https://www.marchamarlo.com/api/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then((json) =>  {
      
      if(json.status=='Success'){
        navigation.navigate('MarchaHome');
      }else{
        alert('Invalid user');
      }
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }





  return (
    <View style={[StyleOf.container, StyleOf.bgWhite]}>
      
      <View style={StyleOf.rowItemCenter} >
          <Text style={[StyleOf.textLg, StyleOf.textEminence]}>Sign up</Text>                 
          <Text style={[StyleOf.textMd, StyleOf.textCodGray,{marginBottom:30}]}>Please sign up to enter in a app.</Text>     
      </View>



      <View style={StyleOf.rowItemCenter} >

        <TextInput
          style={StyleOf.input}
          placeholder="Your Name"
          onChangeText={(name) => setName(name)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Your Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={StyleOf.input}
          placeholder="Enter Password"
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={StyleOf.input}
          placeholder="Confirm Password"
          onChangeText={(conpassword) => setConfirmPassword(conpassword)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Gender"
          onChangeText={(gender) => setGender(gender)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Contact"
          onChangeText={(contact) => setContact(contact)}
        />

        <TextInput
          style={StyleOf.input}
          placeholder="Contact"
          onChangeText={(city) => setCity(city)}
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
