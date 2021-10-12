import "react-native-gesture-handler";

import * as React from "react";

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
///import MarchaRequestSent from './screens/MarchaRequestSent';
import MarchaDoneRequests from "./screens/MarchaDoneRequests";
import MarchaPendingRequests from "./screens/MarchaPendingRequests";
import PayTheDifference from "./screens/PayTheDifference";

//let noImage = '../assets/user_profile.png';

global.token = "3154f2a10b4aecaa9ae8c10468cd8227";
global.api = "https://www.marchamarlo.com/api/";
global.uid = 0;
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
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
