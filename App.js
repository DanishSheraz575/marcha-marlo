import "react-native-gesture-handler";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import AppLoading from "expo-app-loading";

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
import "./global";

const Stack = createStackNavigator();

const checkLoginCredentials = async () => {
  await getConfig();
  //createTable();

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
};

function App() {
  const [appReady, setAppReady] = useState(false);
  const updateAppReady = () => setAppReady(true);
  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={updateAppReady}
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
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen name="MyProfile" component={MyProfile} />

        <Stack.Screen name="ExploreProducts" component={ExploreProducts} />

        <Stack.Screen name="ViewProduct" component={ViewProduct} />

        <Stack.Screen name="MyProducts" component={MyProducts} />

        <Stack.Screen
          name="MyProductsForMarchaFromExpolore"
          component={MyProductsForMarchaFromExpolore}
        />

        <Stack.Screen name="Chats" component={Chats} />

        <Stack.Screen name="Chat" component={Chat} />

        <Stack.Screen name="AddProduct" component={AddProduct} />

        <Stack.Screen name="EditProduct" component={EditProduct} />

        <Stack.Screen name="Notifications" component={Notifications} />

        <Stack.Screen name="MarchaDone" component={MarchaDone} />

        <Stack.Screen
          name="MarchaRequestReceived"
          component={MarchaRequestReceived}
        />

        {/* <Stack.Screen
          name="MarchaRequestSent"
          component={MarchaRequestSent}
        /> */}

        <Stack.Screen
          name="MarchaDoneRequests"
          component={MarchaDoneRequests}
        />
        <Stack.Screen name="GoForMarcha" component={GoForMarcha} />
        <Stack.Screen
          name="MarchaPendingRequests"
          component={MarchaPendingRequests}
        />
        <Stack.Screen name="PayTheDifference" component={PayTheDifference} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
