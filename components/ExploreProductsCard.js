import React, { useCallback } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import StyleOf from "../assets/AppStyles";
import ProductsNotFound from "./ProductsNotFound";

const numColumns = 2;

function formatData(dataList, numColumns) {
  const totalRows = Math.floor(dataList.length / numColumns);
  let totalLastRow = dataList.length - totalRows * numColumns;
  while (totalLastRow !== 0 && totalLastRow !== numColumns) {
     dataList.push({ key: "blank", empty: true });
    totalLastRow++;
  }
  return dataList;
}

export default function ExploreProductsCard({ data, refresh, onRefresh, url })
{
  const navigation = useNavigation();

  //const [isChecked, setChecked] = useState(0);

  const filterItem = (productId) => {
    const newdata = data.filter(function (item) {
      return item.product_id == productId;
    });
    return newdata[0];
  };

  function viewThisProduct(product_id = 0, value) {
    global.comingFrom = "exploreProducts";
    global.marcha_product_id = product_id;
    global.marcha_product_value = value;
    const productDetails = filterItem(product_id);
    navigation.navigate("ViewProduct", { productDetails: productDetails });
    //setChecked(id);
  }

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 100,
      offset: 100 * index,
      index,
    }),
    []
  );

  const renderProductCard = useCallback(({ item }) => {
    

    const { product_id, value, images, condition, title, location } = item;

    const {
      productCard,
      itemInvisible,
      productImageContainer,
      productImage,
      productPrice,
      productTitle,
      productLocation,
      productLocationMarker,
    } = StyleOf;

    if (item.empty){

      return <View style={[productCard, itemInvisible]} />;

    } else {
      
      //let pimages = images.split(",");
      //let img = product_images_base_url + pimages[0];

      let img = global.product_images_base_url + images;

      if (condition == "New") {
      
        var conditionRibbon = require("../assets/new.png");
      
      } else {
      
        var conditionRibbon = require("../assets/old.png");
      
      }


      return (
        <View style={productCard}>
          <TouchableOpacity onPress={() => viewThisProduct(product_id, value)}>
            <View style={[productImageContainer]}>
              <Image
                style={{
                  alignSelf: "flex-start",
                  marginTop: -18,
                  marginLeft: -18,
                }}
                source={conditionRibbon}
              />
              <Image
                resizeMode="contain"
                resizeMethod="auto"
                style={productImage}
                source={{ uri: img }}
                loadingIndicatorSource={{
                  uri: "https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif",
                }}
              />
            </View>
          </TouchableOpacity>
          <Text style={productPrice}>Rs. {value}</Text>
          <Text style={productTitle}>{title}</Text>
          <Text style={productLocation}>
            <Image
              style={productLocationMarker}
              source={require("../assets/location-icon.png")}
            />
            {location}
          </Text>
        </View>
      );

    }
  }, []);

  return (
    <FlatList
      //data={formatData(dataList, numColumns)}
      data={formatData(data, numColumns)}
      renderItem={renderProductCard}
      keyExtractor={(item, index) => index.toString()}
      //keyExtractor={(item) => product_id}
      numColumns={numColumns}
      ListEmptyComponent={<ProductsNotFound btnType="BackToDashboard" />}
      refreshing={refresh}
      onRefresh={onRefresh}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      getItemLayout={getItemLayout}
    />
  );
}
