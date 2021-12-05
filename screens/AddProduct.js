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
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import StyleOf from "../assets/AppStyles";
import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";

import Loader from "../components/Loader";
import { Picker } from "../services/ImagePicker";

export default function AddProduct({}) {
  const {
    fullContainer,
    containerInner,
    p30,
    mb30,
    labelLight,
    labelDark,
    addProductInput,
    smallText,
    flexIt,
    productTypeButton,
    productTypeButtonLabelActive,
    productTypeButtonLabel,
    textArea,
    checkboxContainer,
    selfCenter,
    m5,
    textRadicalRed,
    mb40,
    hCenter,
    btn,
    dropShadow,
    bgRadicalRed,
    btnLabel
  } = StyleOf;

  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigation();
  let [productImage1, setProductImage1] = useState("");
  let [productImage2, setProductImage2] = useState("");
  let [productImage3, setProductImage3] = useState("");
  let [productImage4, setProductImage4] = useState("");

  let openImagePickerAsync = async (type, setImage) => {
    try {
      const pickerResult = await Picker[
        type == "camera" ? "openCamera" : "openImagePicker"
      ]();
      if (pickerResult?.status) setImage(pickerResult?.image?.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = (setImage) => {
    Alert.alert("Image Picker", "choose or take image", [
      { text: "Cancel", onPress: () => null },
      {
        text: "Open gallery",
        onPress: () => openImagePickerAsync("", setImage),
      },
      {
        text: "Open Camera",
        onPress: () => openImagePickerAsync("camera", setImage),
        style: "cancel",
      },
    ]);
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
        var status = json.status.toLowerCase();
        if (status == "success") {
          setLocations(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
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
        var status = json.status.toLowerCase();
        if (status == "success") {
          setCategories(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  function upload_product() {
    var data = new FormData();

    let category_id = 0;
    if (productCategory) {
      category_id = productCategory.category_id;
    }

    if (!productTitle) {
      alert("Please enter product title.");
      return false;
    }

    if (!productCondition) {
      alert("Please select your product condition.");
      return false;
    }

    if (!productCondition) {
      alert("Please select your product condition.");
      return false;
    }

    if (!productDescription) {
      alert("Please enter detail about product.");
      return false;
    }

    if (!productCustomCategory && category_id < 1) {
      alert("Please select product category.");
      return false;
    }

    if (!productLocation) {
      alert("Please select product location.");
      return false;
    }

    if (!productValue) {
      alert("Please enter product price.");
      return false;
    }

    if (!productImage1 && !productImage2 && !productImage3 && !productImage4) {
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
    //    data.append("images", "");

    if (productImage1) {
      data.append("images[]", {
        uri: productImage1,
        name: "image1",
        type: "image/jpg",
      });
    }
    if (productImage2) {
      data.append("images[]", {
        uri: productImage2,
        name: "image2",
        type: "image/jpg",
      });
    }
    if (productImage3) {
      data.append("images[]", {
        uri: productImage3,
        name: "image3",
        type: "image/jpg",
      });
    }
    if (productImage4) {
      data.append("images[]", {
        uri: productImage4,
        name: "image4",
        type: "image/jpg",
      });
    }

    if (
      productImage1 == "" &&
      productImage2 == "" &&
      productImage3 == "" &&
      productImage4 == ""
    ) {
      data.append("images[]", "");
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
        setShowLoader(false);
        var status = json.status.toLowerCase();
        if (status == "success") {
          alert(json.result);
          navigation.navigate("Dashboard");
        } else {
          alert(json.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Add Product" />

      <View style={[containerInner, p30]}>
        <ScrollView>
          <View style={[mb30]}>
            <Text style={[labelLight]}>Add Product Title</Text>
            <Text style={[labelDark]}>Add Title</Text>
            <TextInput
              style={[addProductInput]}
              onChangeText={(productTitle) => setProductTitle(productTitle)}
            />
            <Text style={[smallText]}>
              Mention the key features of your item (e.g. brand, model, make,
              type)
            </Text>
          </View>

          <View style={[mb30]}>
            <Text style={[labelLight]}>Product Condition</Text>
            <Text style={[labelDark]}>Select Condition*</Text>

            <View style={flexIt}>
              <TouchableOpacity
                onPress={(productCondition) => setProductCondition("New")}
                style={[productTypeButton]}
              >
                {productCondition == "New" ? (
                  <Text style={[productTypeButtonLabelActive]}>New</Text>
                ) : (
                  <Text style={[productTypeButtonLabel]}>New</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={(productCondition) => setProductCondition("Used")}
                style={[productTypeButton, { productCondition }]}
              >
                {productCondition == "Used" ? (
                  <Text style={[productTypeButtonLabelActive]}>Used</Text>
                ) : (
                  <Text style={[productTypeButtonLabel]}>Used</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={[mb30]}>
            <Text style={[labelLight]}>Product Information</Text>
            <Text style={[labelDark]}>Describe what you are selling</Text>
            <TextInput
              style={[textArea]}
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              onChangeText={(productDescription) =>
                setProductDescription(productDescription)
              }
            />
            <Text style={[smallText]}>
              Include condition, features and other information about the
              product
            </Text>
          </View>

          <View style={[mb30]}>
            {productCustomCategory ? (
              <View>
                <Text style={[labelLight]}>Custom Category</Text>
                <Text style={[labelDark]}>Add Your Custom Category</Text>
                <TextInput
                  style={[addProductInput]}
                  onChangeText={(productCustomCategory) =>
                    setProductCustomCategory(productCustomCategory)
                  }
                />
              </View>
            ) : (
              <View>
                <Text style={[labelLight]}>Product Category</Text>
                <Text style={[labelDark]}>Select Category</Text>
                <SelectDropdown
                  buttonStyle={addProductInput}
                  buttonTextStyle={[{ textAlign: "left" }]}
                  buttonTextStyleAfterSelection={[{ color: "#000000" }]}
                  data={categories}
                  onSelect={(productCategory) =>
                    setProductCategory(productCategory)
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.title;
                  }}
                />
              </View>
            )}
            <View style={checkboxContainer}>
              <CheckBox
                value={productCustomCategory}
                onValueChange={setProductCustomCategory}
                style={selfCenter}
              />
              <Text style={m5}>I want to add custom category</Text>
            </View>
          </View>

          <View style={[mb30]}>
            <Text style={[labelLight]}>location</Text>
            <Text style={[labelDark]}>Select Location</Text>
            <SelectDropdown
              buttonStyle={addProductInput}
              buttonTextStyle={[{ textAlign: "left" }]}
              buttonTextStyleAfterSelection={[{ color: "#000000" }]}
              data={locations}
              onSelect={(productLocation) =>
                setProductLocation(productLocation)
              }
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          <View style={[mb30]}>
            <Text style={[labelLight]}>
              Select The Best Price of Your Product
            </Text>
            <Text style={[labelDark]}>Product Price in PKR</Text>
            <TextInput
              style={[addProductInput]}
              placeholder="Rs."
              keyboardType="numeric"
              onChangeText={(productValue) => setProductValue(productValue)}
            />
          </View>

          <View style={[mb30]}>
            <Text style={[labelLight]}>Manage Your Product Gallery</Text>
            <Text style={[labelDark]}>Product Image(s)</Text>

            <View style={styles.galleryImagesContainer}>
              <TouchableOpacity onPress={() => showAlert(setProductImage1)}>
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

              <TouchableOpacity onPress={() => showAlert(setProductImage2)}>
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

              <TouchableOpacity onPress={() => showAlert(setProductImage3)}>
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

              <TouchableOpacity onPress={() => showAlert(setProductImage4)}>
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

            <Text style={[smallText, textRadicalRed]}>
              You can upload up to 4 images only.
            </Text>
          </View>

          <View style={[mb40, hCenter]}>
            <TouchableOpacity
              onPress={upload_product}
              style={[btn, dropShadow, bgRadicalRed, hCenter]}
            >
              <Text style={btnLabel}>Upload NOW!</Text>
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
