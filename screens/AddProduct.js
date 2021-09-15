import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, CheckBox, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function AddProduct({ }) {

  const [product_type, setProductType] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(false);
  const data = { api_token: global.token };  
  useEffect(() => {
    fetch(global.api + "locations", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "Success") {
          setLocations(json.result)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);



  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(0);
  useEffect(() => {
    fetch(global.api + "categories", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == "Success") {
          setCategories(json.result)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);  



  const [customCategory, setCustomCategory] = useState(false);
  /*
  function set_product_type(t){
    setProductType(t);
  }
  */

  function upload_product() {
    alert(product_type);
    if(category){
      alert(category.category_id);
    }else{
      alert("Please select category");
    }
  }

  return (
    
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Add Product" />

        <View style={[StyleOf.containerInner,StyleOf.p30]}>



          <ScrollView>

            <View style={[StyleOf.mb30]}>
              <Text style={[StyleOf.labelLight]}>Add Product Title</Text>
              <Text style={[StyleOf.labelDark]}>Add Title</Text>
              <TextInput
                style={[StyleOf.addProductInput]}
              />
              <Text style={[StyleOf.smallText]}>
                Mention the key features of your item (e.g. brand, model, make, type)
              </Text>
            </View>
      


            <View style={[StyleOf.mb30]}>
              <Text style={[StyleOf.labelLight]}>Product Condition</Text>
              <Text style={[StyleOf.labelDark]}>Select Condition*</Text>

              <View style={StyleOf.flexIt}>
                <TouchableOpacity 
                  onPress={(product_type) => setProductType('New')} 
                  style={[StyleOf.productTypeButton]}
                >
                  {
                  product_type=='New'
                  ?
                    <Text style={[StyleOf.productTypeButtonLabelActive]}>New</Text>
                  :
                    <Text style={[StyleOf.productTypeButtonLabel]}>New</Text>
                  }
                </TouchableOpacity>       

                <TouchableOpacity 
                  onPress={(product_type) => setProductType('Used')} 
                  style={[StyleOf.productTypeButton,{product_type}]}
                >
                  {
                  product_type=='Used'
                  ?
                    <Text style={[StyleOf.productTypeButtonLabelActive]}>Used</Text>
                  :
                    <Text style={[StyleOf.productTypeButtonLabel]}>Used</Text>
                  }

                </TouchableOpacity>      
              </View>
            </View>



            <View style={[StyleOf.mb30]}>
              <Text style={[StyleOf.labelLight]}>Product Information</Text>
              <Text style={[StyleOf.labelDark]}>Describe what you are selling</Text>
              <TextInput
                style={[StyleOf.textArea]}
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
              />
              <Text style={[StyleOf.smallText]}>
                Include condition, features and other information about the product
              </Text>
            </View>        



            <View style={[StyleOf.mb30]}>              
              {
              customCategory 
              ? 
                <View>
                  <Text style={[StyleOf.labelLight]}>Custom Category</Text>
                  <Text style={[StyleOf.labelDark]}>Add Your Custom Category</Text>
                  <TextInput style={[StyleOf.addProductInput]} />
                </View>
              : 
                <View>
                  <Text style={[StyleOf.labelLight]}>Product Category</Text>
                  <Text style={[StyleOf.labelDark]}>Select Category</Text>
                  <SelectDropdown 
                    buttonStyle={StyleOf.addProductInput}
                    buttonTextStyle={[{textAlign:'left'}]}
                    buttonTextStyleAfterSelection={[{color:'#000000'}]}
                    data={categories}
                    onSelect={(category) => setCategory(category)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.title;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.title;
                    }}
                  />
                </View>
              }                 
                <View  style={StyleOf.checkboxContainer}>
                  <CheckBox
                    value={customCategory}
                    onValueChange={setCustomCategory}
                    style={StyleOf.checkbox}
                  />
                  <Text style={StyleOf.m5}>Do you like React Native?</Text>
                </View>
            </View> 





            <View style={[StyleOf.mb30]}>  
                <Text style={[StyleOf.labelLight]}>location</Text>
                <Text style={[StyleOf.labelDark]}>Select Location</Text>
                <SelectDropdown 
                  buttonStyle={StyleOf.addProductInput}
                  buttonTextStyle={[{textAlign:'left'}]}
                  buttonTextStyleAfterSelection={[{color:'#000000'}]}
                  data={locations}
                  onSelect={(location) => setLocation(location)}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                />
            </View>



            <View style={[StyleOf.mb30]}>  
              <Text style={[StyleOf.labelLight]}>Select The Best Price of Your Product</Text>
              <Text style={[StyleOf.labelDark]}>Product Price in PKR</Text>
              <TextInput 
                style={[StyleOf.addProductInput]} 
                placeholder="Rs."
              />
            </View>


            <View style={[StyleOf.mb30]}>  
              <Text style={[StyleOf.labelLight]}>Manage Your Product Gallery</Text>
              <Text style={[StyleOf.labelDark]}>Product Image(s)</Text>
              



              <Text style={[StyleOf.smallText, StyleOf.textRadicalRed]}>
                You can upload up to 4 images only.
              </Text>
            </View>

            <View style={[StyleOf.mb40,StyleOf.hCenter]}>
              <TouchableOpacity 
                onPress={upload_product}
                style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgRadicalRed, StyleOf.hCenter]}>
                <Text style={StyleOf.btnLabel}>Upload NOW!</Text>
              </TouchableOpacity>
            </View>

            
          </ScrollView>



        </View>

      <BottomLinks active="add" />
    </View>
    
  );
}

