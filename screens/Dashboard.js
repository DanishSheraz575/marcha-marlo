//import React from "react";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity,ImageBackground } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";


//import Logo from "../components/Logo";

export default function Dashboard({navigation}) {
  const image =  require('../assets/dashboardbg.png');




/*
  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    global.myProductSelectedId =0;
    fetch(global.api + "my_products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase() ;
        if (status == "success" && json.result.length>0) {
          let myProductList = [];

          json.result.forEach((item) => {
            let images = item.images.split(",");
            let img = item.product_images_base_url + images[0];
            myProductList.push({
              id: item.product_id,
              image: img,
              condition: item.condition,
              value: item.value,
              title: item.title,
              location: item.location,
            });
          });

          //console.log(myProductList);

          global.myProductList =myProductList.reverse();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      return () => {
        // Anything in here is fired on component unmount.
      }
  }, []);
*/




  return (
    <View style={[StyleOf.fullContainer]}>
      <ImageBackground source={image} style={StyleOf.bgImage}>
        <ScreenHeader title="Dashboard" backbtn="0" bgColor='' />

        <View style={[StyleOf.containerInner]}>
          
          <View style={[StyleOf.px20, StyleOf.pb10]}>
            <Text style={[StyleOf.f12, StyleOf.textWelcome]}>welcome,</Text>
            <Text style={[StyleOf.textLgMd, StyleOf.textWhite]}>
              {global.ufull_name} 
{/*               
              <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                <Image source={require('../assets/edit_icon.png')} />
              </TouchableOpacity> */}

            </Text>
            <Text style={[StyleOf.f12, StyleOf.textWhite]}>{global.uemail}</Text>
          </View>
          




          <View style={[StyleOf.dashboardContainer]}>
            <View style={StyleOf.dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaRequestReceived')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxGreen]}
              >
                <Image
                        resizeMethod="scale" 
                        resizeMode="center"
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_requests.png")}
                />
                {/* <Text style={StyleOf.dashboardBoxLabel}>My products</Text> 
                <Text style={StyleOf.dashboardBoxLabel}>NUMBER OF MARCHA'S REQUESTS</Text>*/}
                <Text style={StyleOf.dashboardBoxLabel}>MARCHA'S REQUESTS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyProducts')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxBlue]}
              >
                <Image
                        resizeMethod="auto" 
                        resizeMode="center"
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/explore_products.png")}
                />
                {/* <Text style={StyleOf.dashboardBoxLabel}>Explore Products</Text> */}
                <Text style={StyleOf.dashboardBoxLabel}>MY PRODUCTS</Text>
              </TouchableOpacity>
            </View>

            <View style={StyleOf.dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaDone')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxYellow]}
              >
                <Image
                        resizeMethod="auto" 
                        resizeMode="center"
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/marcha_done.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  {/* Marcha Done list */}
                  NUMBER OF MARCHA'S DONE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaPendingRequests')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxRed]}
              >
                <Image
                        resizeMethod="auto" 
                        resizeMode="center"
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/pending_requests.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  {/* Marcha Request received */}
                  PENDING REQUESTS
                </Text>
              </TouchableOpacity>
            </View>



            <View style={StyleOf.dashboardRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MarchaDoneRequests')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxGray]}
              >
                <Image
                  style={StyleOf.dashboardBoxImg}
                  resizeMethod="auto" 
                  resizeMode="center"
                  source={require("../assets/marcha_requests.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  {/* Marcha Request sent */}
                  MARCHA DONE REQUESTS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => navigation.navigate('MyProfile')}
                style={[StyleOf.dashboardBox, StyleOf.dashboardBoxMagenta]}
              >
                <Image
                  resizeMethod="auto" 
                  resizeMode="center"
                  style={StyleOf.dashboardBoxImg}
                  source={require("../assets/user_profile.png")}
                />
                <Text style={StyleOf.dashboardBoxLabel}>
                  {/* Marcha Done Requests */}
                  USER PROFILE
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>

        <BottomLinks active="home" />
      </ImageBackground>
    </View>
  );
}
