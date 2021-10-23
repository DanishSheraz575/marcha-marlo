import "react-native-gesture-handler";

import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Load Screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

import MyProfile from "./screens/MyProfile";
import Dashboard from "./screens/Dashboard";
import ExploreProducts from "./screens/ExploreProducts";
import MyProducts from "./screens/MyProducts";
import GoForMarcha from "./screens/GoForMarcha";
import Chats from "./screens/Chats";
import Chat from "./screens/Chat";
import AddProduct from "./screens/AddProduct";
import Notifications from "./screens/Notifications";

import MarchaDone from "./screens/MarchaDone";
import MarchaRequestReceived from "./screens/MarchaRequestReceived";

import MarchaDoneRequests from "./screens/MarchaDoneRequests";
import MarchaPendingRequests from "./screens/MarchaPendingRequests";
import PayTheDifference from "./screens/PayTheDifference";

import AppLoading from 'expo-app-loading';



global.setLocal = async function saveToLocal(key, value) {
  await SecureStore.setItemAsync(key, value);
};
global.getLocal = async function getFromLocal(key) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return 0;
  }
};
/*
async function setHomeScreen() {
  let uid = await SecureStore.getItemAsync("uid");
  if (uid > 0) {
    global.mainScreen = "Dashboard";
    global.uid = uid;
  } else {
    global.uid = 0;
    global.mainScreen = "Home";
  }
}
setHomeScreen();
*/








global.token = "3154f2a10b4aecaa9ae8c10468cd8227";
global.api = "https://www.marchamarlo.com/api/";

global.ufull_name = "Marcha Marlo User";
global.uemail = "";
//global.uimage=noImage;
global.uimage = "";
global.ugender = "";
global.ucountry = "";
global.ucity = "";
global.ucontact_number = "";
global.ulast_login = "09 Sep 2021";
global.ustatus = 1;
global.borderDanger = "#ffb2b2";

global.product_images_base_url = "";
global.chat_attachments_base_url = "";
global.user_image_base_url = "";

const Stack = createStackNavigator();

//const uid = getLocal('uid').then(result).then(data));
//console.log('line 75 ');

/*
if (typeof global.uid !== 'undefined' && global.uid>0) {
  alert('in if');
  var mainPage='Dashboard';
  global.uid = global.uid;
  var marchaUid=global.uid;
}else{
  alert('in else');
  var mainPage='Home';
  global.uid = 0;
  var marchaUid='0';
}
*/

function App() {







  const [appReady, setAppReady]=useState(false);


  async function checkLoginCredentials() {
      await SecureStore.getItemAsync("uinfo")

/*
      .then((response) => response.json())
          .then((json) => {

          })
          */


      .then((result)=>{
        //console.log(result);
        //console.log(JSON.parse(result));
        result=JSON.parse(result);

        //const {user_id,full_name,email, image, gender, country, city, contact_number, added_on, modified_on, status}=result.json();
        

        //const {user_id,full_name,email,image,gender,city}=result;
        //[user_id]=result;

        //console.log('122 '+user_id);
        //console.log('i m hee');
        if(result!==null){
          
          const {user_id,full_name,email, image, gender, country, city, contact_number, added_on, modified_on, status}=result;

          global.uid = user_id;
          global.ufull_name = full_name;
          global.uemail = email;

          if (image != "") {
            global.uimage = global.user_image_base_url + image;
          }

          global.ugender = gender;
          global.ucountry = country;
          global.ucity = city;
          global.ucontact_number = contact_number;
          global.ustatus = status;
/*
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          });
          */
          global.mainScreen = "Dashboard";
        }else{
          global.uid = 0;
          global.mainScreen = "Home";
        }
      }
      )
      .catch(
        error=>console.log(error)
      );
    }

  if(!appReady){
    return(
      <AppLoading 
        startAsync={checkLoginCredentials}
        onFinish={()=>setAppReady(true)}
        onError={console.warn}
      />
    )
  }


/*
  async function setHomeScreen() {
    await SecureStore.getItemAsync("uid")
    .then((result)=>{
      console.log(result);
      if(result!==null && result>0){
        global.mainScreen = "Dashboard";
        global.uid = result;
      }else{
        global.uid = 0;
        global.mainScreen = "Home";
      }
    }
    )
    .catch(
      error=>console.log(error)
    );
  }
  setHomeScreen();
  */


/*
getRememberedUser = async () => {
    try {
      const uid = await SecureStore.getItemAsync('uid');
      if (uid !== null && uid>0) {
        // We have username!!
        global.uid=uid;
        global.mainScreen="Dashboard";
      }else{
        global.uid=0;
        global.mainScreen="Home";
      }
    } catch (error) {
      // Error retrieving data
    }
    };
*/



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={global.mainScreen=="Dashboard" ? "Dashboard" : "Home"}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ExploreProducts"
          component={ExploreProducts}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyProducts"
          component={MyProducts}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MarchaDone"
          component={MarchaDone}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MarchaRequestReceived"
          component={MarchaRequestReceived}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="MarchaRequestSent"
          component={MarchaRequestSent}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="MarchaDoneRequests"
          component={MarchaDoneRequests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoForMarcha"
          component={GoForMarcha}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MarchaPendingRequests"
          component={MarchaPendingRequests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PayTheDifference"
          component={PayTheDifference}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
