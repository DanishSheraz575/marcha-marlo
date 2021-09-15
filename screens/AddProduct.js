import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, CheckBox, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import StyleOf from '../assets/AppStyles';


import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from '../components/BottomLinks';

export default function AddProduct({ }) {
  
  const categories = ["Male", "Female"];
  const [customCategory, setCustomCategory] = useState(false);
  const [categor, setCategory] = useState("");
  
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
                <TouchableOpacity  style={[StyleOf.productTypeButton]}>
                <Text style={[StyleOf.productTypeButtonLabel]}>New</Text>
                </TouchableOpacity>       

                <TouchableOpacity  style={[StyleOf.productTypeButton]}>
                  <Text style={[StyleOf.productTypeButtonLabel]}>Used</Text>
                </TouchableOpacity>      
              </View>
            </View>



            <View style={[StyleOf.mb30]}>
              <Text style={[StyleOf.labelLight]}>Product Information</Text>
              <Text style={[StyleOf.labelDark]}>Describe what you are selling</Text>
              <TextInput
                style={[StyleOf.addProductInput]}
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
                    onSelect={(categor) => setCategory(categor)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
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
                  data={categories}
                  onSelect={(categor) => setCategory(categor)}
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
              <Text style={[StyleOf.labelDark]}>Product Price</Text>
              <TextInput style={[StyleOf.addProductInput]} />
            </View>


            <View style={[StyleOf.mb30]}>  
              <Text style={[StyleOf.labelLight]}>Manage Your Product Gallery</Text>
              <Text style={[StyleOf.labelDark]}>Product Image(s)</Text>
              



              <Text style={[StyleOf.smallText, StyleOf.textRadicalRed]}>
                You can upload up to 4 images only.
              </Text>
            </View>

            <TouchableOpacity style={[StyleOf.btn, StyleOf.dropShadow, StyleOf.bgRadicalRed]}>
              <Text style={StyleOf.btnLabel}>Upload</Text>
            </TouchableOpacity>

            
          </ScrollView>



        </View>

      <BottomLinks active="add" />
    </View>
    
  );
}

