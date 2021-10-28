import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";

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
import MyProductsForMarchaFromExpolore from "./screens/MyProductsForMarchaFromExpolore";
import ViewProduct from "./screens/ViewProduct";
import MyProducts from "./screens/MyProducts";
import GoForMarcha from "./screens/GoForMarcha";
import Chats from "./screens/Chats";
import Chat from "./screens/Chat";
import AddProduct from "./screens/AddProduct";
import EditProduct from "./screens/EditProduct";
import Notifications from "./screens/Notifications";

import MarchaDone from "./screens/MarchaDone";
import MarchaRequestReceived from "./screens/MarchaRequestReceived";

import MarchaDoneRequests from "./screens/MarchaDoneRequests";
import MarchaPendingRequests from "./screens/MarchaPendingRequests";
import PayTheDifference from "./screens/PayTheDifference";

import AppLoading from "expo-app-loading";

global.setLocal = async function saveToLocal(key, value) {
  await SecureStore.setItemAsync(key, value);
};
global.getLocal = async function getFromLocal(key) {

  await SecureStore.getItemAsync(key)
    .then((result) => {
      if (result !== null) {
        return result;
      } else {
        return 0;
      }
    })
    .catch((error) => console.log(error));
};

global.getConfig = async function getFromLocal(key) {
  const data = { api_token: global.token };
  await fetch(global.api + "get_config", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      var status = json.status.toLowerCase();
      if (status == "success") {
        const config = json.result;

        setLocal("product_images_base_url", config.product_images_base_url);
        setLocal("chat_attachments_base_url", config.chat_attachments_base_url);
        setLocal("user_image_base_url", config.user_image_base_url);

        global.product_images_base_url=config.product_images_base_url;
        global.chat_attachments_base_url=config.chat_attachments_base_url;
        global.user_image_base_url=config.user_image_base_url;

      } else {
        alert(json.result);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    }, []);
};


global.getOut = async function getLOgOut() {
  SecureStore.deleteItemAsync("marchaUserInfo");
};
//getOut();

setLocal('token', "3154f2a10b4aecaa9ae8c10468cd8227");
setLocal('api', "https://www.marchamarlo.com/api/");

global.token = "3154f2a10b4aecaa9ae8c10468cd8227";
global.api = "https://www.marchamarlo.com/api/";

global.comingFrom = "myProducts";

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
global.myProductList = [];
global.exploreProductList = [];

const Stack = createStackNavigator();


function App() {
  const [appReady, setAppReady] = useState(false);

  async function checkLoginCredentials() {


    await getConfig();

    await SecureStore.getItemAsync("marchaUserInfo")
      .then((result) => {
        if (result !== null) {
          result = JSON.parse(result);
          const {
            user_id,
            full_name,
            email,
            image,
            gender,
            country,
            city,
            contact_number,
            added_on,
            modified_on,
            status,
          } = result;
          global.uid = user_id;
          global.ufull_name = full_name;
          global.uemail = email;
          global.uimage = image;
          global.ugender = gender;
          global.ucountry = country;
          global.ucity = city;
          global.ucontact_number = contact_number;
          global.ustatus = status;
          global.mainScreen = "Dashboard";

        } else {
          global.uid = 0;
          global.mainScreen = "Home";
        }
      })
      .catch((error) => console.log(error));
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={() => checkLoginCredentials()}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          global.mainScreen == "Dashboard" ? "Dashboard" : "Home"
        }
      >
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
          name="ViewProduct"
          component={ViewProduct}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyProducts"
          component={MyProducts}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyProductsForMarchaFromExpolore"
          component={MyProductsForMarchaFromExpolore}
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
          name="EditProduct"
          component={EditProduct}
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
