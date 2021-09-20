import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
//import { TextInput } from "react-native-gesture-handler";
/*
const dataList = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "7" },
  { key: "8" },
  { key: "9" },
  { key: "10" },
];
*/
const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function MyProducts({ navigation }) {


  const [myProductsState, setMyProductsState] = useState(0);
  //formatData = (dataList, numColumns) => {
  function formatData(dataList, numColumns){
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return dataList;
  };

  //renderProductCard = ({ item, index }) => {
  function renderProductCard({ item, index }){
    if (item.empty) {
      return <View style={[Styles.productCard, Styles.itemInvisible]} />;
    }
    return (
      <View style={Styles.productCard}>
        <View style={Styles.productImageContainer}>
          <Image  style={Styles.productImage} source={{uri:item.image}} />
          {/* <Image  style={Styles.productImage} source={{uri:'https://www.marchamarlo.com/product_images/163183568819.jpg'}} /> */}
        </View>
        <Text  style={Styles.productPrice}>Rs. {item.value}</Text>
        <Text style={Styles.productTitle}>
          {item.title}
        </Text>
        <Text style={Styles.productLocation}>
          <Image style={Styles.productLocationMarker} source={require('../assets/location-icon.png')} />
          {item.location}
          </Text>
      </View>
    );
  };


  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    fetch(global.api + "my_products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "Success") {
          let myProductList=[];

          json.products.forEach(item => {

            let images = item.images.split(",");
            let img=item.product_images_base_url+images[0];
            myProductList.push(
              {
                'id':item.product_id,
                'image':img,
                'value':item.value,
                'title':item.title,
                'location':item.location
              }
            );
          });

          setDataList(myProductList);
          setMyProductsState(2);
        } else {
          setMyProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="My Products" />
      <View style={[StyleOf.containerInner, { paddingBottom: 80 }]}>
        {(() => {
          if (myProductsState == 0) {
            return (
              <View style={StyleOf.rowItemCenter}>
                <MarchaSpinner size={70} />
              </View>
            );
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 1) {
            return (
              <View style={StyleOf.rowItemCenter}>
                <Text
                  style={{
                    fontSize: 42,
                    fontWeight: "bold",
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  AWW !!
                </Text>
                <Image source={require("../assets/oh.png")} />
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    marginVertical: 20,
                    textAlign: "center",
                  }}
                >
                  No products found
                </Text>

                <TouchableOpacity
                  style={[
                    StyleOf.btn,
                    StyleOf.dropShadow,
                    StyleOf.bgEminence,
                    { marginTop: 40 },
                  ]}
                  onPress={() => navigation.navigate("AddProduct")}
                >
                  <Text style={StyleOf.btnLabel}>add product now!</Text>
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
            return (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    padding: 10,
                    backgroundColor: "#ffffff",
                  }}
                >
                  Select product to start Marcha
                </Text>

                <FlatList
                  //data={formatData(dataList, numColumns)}
                  data={formatData(dataList, numColumns)}
                  renderItem={renderProductCard}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={numColumns}
                />
                
              </View>
            );
          }
          return null;
        })()}
      </View>
      <BottomLinks active="BottomLinks" />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productCard: {
    //alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 10,
    //height: WIDTH / numColumns,
  },
  productImageContainer:{
    backgroundColor:'#ffffff',
    justifyContent:'center',
    padding:20,
    borderRadius:10,
    marginBottom:6,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage:{
    width:130,
    height:130,
  },
  productPrice:{
    color:'#000000',
    textAlign:'left',
    fontSize:16,
    marginBottom:6
  },
  productTitle:{
    color:'#9F9F9F',
    fontSize:13,
    marginBottom:6,
    height:30,

  },
  productLocation:{
    color:'#9F9F9F',
    textAlign:'left',
    marginBottom:6,
  },
  productLocationMarker:{
    marginRight:10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
