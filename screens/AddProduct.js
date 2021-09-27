import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  StyleSheet,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";

import Loader from "../components/Loader";

export default function AddProduct({}) {


  const [showLoader, setShowLoader] = useState(false);

  const navigation = useNavigation(); 

  let [productImage1, setProductImage1] = useState("");
  let [productImage2, setProductImage2] = useState("");
  let [productImage3, setProductImage3] = useState("");
  let [productImage4, setProductImage4] = useState("");

  let openImagePickerAsync1 = async () => {
    //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      //base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let img = { localUri: pickerResult.uri };
    setProductImage1(img.localUri);
  };

  let openImagePickerAsync2 = async () => {
    //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      //base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let img = { localUri: pickerResult.uri };
    setProductImage2(img.localUri);
  };

  let openImagePickerAsync3 = async () => {
    //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      //base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let img = { localUri: pickerResult.uri };
    setProductImage3(img.localUri);
  };

  let openImagePickerAsync4 = async () => {
    //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      //base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let img = { localUri: pickerResult.uri };
    setProductImage4(img.localUri);
  };


  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [productTitle, setProductTitle] = useState();
  const [productCondition, setProductCondition] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productCustomCategory, setProductCustomCategory] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productValue, setProductValue] = useState();

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
        var status = json.status.toLowerCase() ;
        if (status == "success") {
          setLocations(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  
  
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
        var status = json.status.toLowerCase() ;
        if (status == "success") {
          setCategories(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  function upload_product() {

    
    var data = new FormData();

    let category_id=0;
    if(productCategory){
      category_id=productCategory.category_id;
    }

    if(!productTitle){
      alert("Please enter product title.");
      return false;
    }

    if(!productCondition){
      alert("Please select your product condition.");
      return false;
    }

    if(!productCondition){
      alert("Please select your product condition.");
      return false;
    }

    if(!productDescription){
      alert("Please enter detail about product.");
      return false;
    }

    if(!productCustomCategory && category_id<1){
      alert("Please select product category.");
      return false;
    }

    if(!productLocation){
      alert("Please select product location.");
      return false;
    }

    if(!productValue){
      alert("Please enter product price.");
      return false;
    }

    if(!productImage1 && !productImage2 && !productImage3 && !productImage4 ){
      alert("Please select product image.");
      return false;
    }

    data.append("api_token", global.token);
    data.append("user_id", global.uid);
    data.append("title", productTitle);
    data.append("condition", productCondition);
    data.append("description", productDescription);
    data.append("location", productLocation);
    data.append("value", productValue);
    data.append("category_id", category_id);
    data.append("category", productCustomCategory);
    data.append("images",'');

    if(productImage1){
      data.append('images[]', { uri: productImage1, name:'image1', type: 'image/jpg'});
    }
    if(productImage2){
      data.append('images[]', { uri: productImage2, name:'image2', type: 'image/jpg'});
    }
    if(productImage3){
      data.append('images[]', { uri: productImage3, name:'image3', type: 'image/jpg'});  
    }
    if(productImage4){
      data.append('images[]', { uri: productImage4, name:'image4', type: 'image/jpg'});
    }
    
    setShowLoader(true);
    fetch(global.api + "add_product", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
      },
      //body: JSON.stringify(data),
      body: data,
    })
      .then((response) => response.json())
      .then((json) => {
        var status = json.status.toLowerCase() ;
        if (status == "success") {
          setShowLoader(false);
          alert(json.result);
          navigation.navigate('Dashboard');
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Add Product" />

      <View style={[StyleOf.containerInner, StyleOf.p30]}>
        <ScrollView>
          <View style={[StyleOf.mb30]}>
            <Text style={[StyleOf.labelLight]}>Add Product Title</Text>
            <Text style={[StyleOf.labelDark]}>Add Title</Text>
            <TextInput 
              style={[StyleOf.addProductInput]} 
              onChangeText={(productTitle) => setProductTitle(productTitle)}
            />
            <Text style={[StyleOf.smallText]}>
              Mention the key features of your item (e.g. brand, model, make,
              type)
            </Text>
          </View>

          <View style={[StyleOf.mb30]}>
            <Text style={[StyleOf.labelLight]}>Product Condition</Text>
            <Text style={[StyleOf.labelDark]}>Select Condition*</Text>

            <View style={StyleOf.flexIt}>
              <TouchableOpacity
                onPress={(productCondition) => setProductCondition("New")}
                style={[StyleOf.productTypeButton]}
              >
                {productCondition == "New" ? (
                  <Text style={[StyleOf.productTypeButtonLabelActive]}>
                    New
                  </Text>
                ) : (
                  <Text style={[StyleOf.productTypeButtonLabel]}>New</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={(productCondition) => setProductCondition("Used")}
                style={[StyleOf.productTypeButton, { productCondition }]}
              >
                {productCondition == "Used" ? (
                  <Text style={[StyleOf.productTypeButtonLabelActive]}>
                    Used
                  </Text>
                ) : (
                  <Text style={[StyleOf.productTypeButtonLabel]}>Used</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={[StyleOf.mb30]}>
            <Text style={[StyleOf.labelLight]}>Product Information</Text>
            <Text style={[StyleOf.labelDark]}>
              Describe what you are selling
            </Text>
            <TextInput
              style={[StyleOf.textArea]}
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              onChangeText={(productDescription) => setProductDescription(productDescription)}
            />
            <Text style={[StyleOf.smallText]}>
              Include condition, features and other information about the
              product
            </Text>
          </View>

          <View style={[StyleOf.mb30]}>
            {productCustomCategory ? (
              <View>
                <Text style={[StyleOf.labelLight]}>Custom Category</Text>
                <Text style={[StyleOf.labelDark]}>
                  Add Your Custom Category
                </Text>
                <TextInput 
                  style={[StyleOf.addProductInput]} 
                  onChangeText={(productCustomCategory) => setProductCustomCategory(productCustomCategory)}
                />
              </View>
            ) : (
              <View>
                <Text style={[StyleOf.labelLight]}>Product Category</Text>
                <Text style={[StyleOf.labelDark]}>Select Category</Text>
                <SelectDropdown
                  buttonStyle={StyleOf.addProductInput}
                  buttonTextStyle={[{ textAlign: "left" }]}
                  buttonTextStyleAfterSelection={[{ color: "#000000" }]}
                  data={categories}
                  onSelect={(productCategory) => setProductCategory(productCategory)}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.title;
                  }}
                />
              </View>
            )}
            <View style={StyleOf.checkboxContainer}>
              <CheckBox
                value={productCustomCategory}
                onValueChange={setProductCustomCategory}
                style={StyleOf.selfCenter}
              />
              <Text style={StyleOf.m5}>Do you like React Native?</Text>
            </View>
          </View>

          <View style={[StyleOf.mb30]}>
            <Text style={[StyleOf.labelLight]}>location</Text>
            <Text style={[StyleOf.labelDark]}>Select Location</Text>
            <SelectDropdown
              buttonStyle={StyleOf.addProductInput}
              buttonTextStyle={[{ textAlign: "left" }]}
              buttonTextStyleAfterSelection={[{ color: "#000000" }]}
              data={locations}
              onSelect={(productLocation) => setProductLocation(productLocation)}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          <View style={[StyleOf.mb30]}>
            <Text style={[StyleOf.labelLight]}>
              Select The Best Price of Your Product
            </Text>
            <Text style={[StyleOf.labelDark]}>Product Price in PKR</Text>
            <TextInput 
              style={[StyleOf.addProductInput]} placeholder="Rs." 
              keyboardType="numeric"
              onChangeText={(productValue) => setProductValue(productValue)}
            />
          </View>

          <View style={[StyleOf.mb30]}>
            <Text style={[StyleOf.labelLight]}>
              Manage Your Product Gallery
            </Text>
            <Text style={[StyleOf.labelDark]}>Product Image(s)</Text>

            <View style={styles.galleryImagesContainer}>
              <TouchableOpacity onPress={openImagePickerAsync1}>
                {productImage1 == "" ? (
                  <Image
                    style={styles.imageBox}
                    source={require("../assets/product_image_placeholder.png")}
                  />
                ) : (
                  <Image
                    style={styles.imageBox}
                    source={{ uri: productImage1 }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={openImagePickerAsync2}>
                {productImage2 == "" ? (
                  <Image
                    style={styles.imageBox}
                    source={require("../assets/product_image_placeholder.png")}
                  />
                ) : (
                  <Image
                    style={styles.imageBox}
                    source={{ uri: productImage2 }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={openImagePickerAsync3}>
                {productImage3 == "" ? (
                  <Image
                    style={styles.imageBox}
                    source={require("../assets/product_image_placeholder.png")}
                  />
                ) : (
                  <Image
                    style={styles.imageBox}
                    source={{ uri: productImage3 }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={openImagePickerAsync4}>
                {productImage4 == "" ? (
                  <Image
                    style={styles.imageBox}
                    source={require("../assets/product_image_placeholder.png")}
                  />
                ) : (
                  <Image
                    style={styles.imageBox}
                    source={{ uri: productImage4 }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text style={[StyleOf.smallText, StyleOf.textRadicalRed]}>
              You can upload up to 4 images only.
            </Text>
          </View>

          <View style={[StyleOf.mb40, StyleOf.hCenter]}>
            <TouchableOpacity
              onPress={upload_product}
              style={[
                StyleOf.btn,
                StyleOf.dropShadow,
                StyleOf.bgRadicalRed,
                StyleOf.hCenter,
              ]}
            >
              <Text style={StyleOf.btnLabel}>Upload NOW!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <BottomLinks active="add" />
      <Loader showit={showLoader} />
    </View>
  );
}

const styles = StyleSheet.create({
  galleryImagesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  imageBox: {
    flex: 2.5,
    width: 70,
    height: 70,
    margin: 3,
  },
});
