import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";

import PagerView from "react-native-pager-view";

import StyleOf from "../assets/AppStyles";

export default function ProductPager({ data }) {

  return (
      <PagerView style={styles.viewPager} initialPage={0}>
        {data.map((p, index) => (
          <View style={styles.page} key={index}>
            <ImageBackground 
            source={{
                uri: p.images_base_url+p.images,
              }}
              style={styles.image}
            >
              <Text>{p.title}</Text>
              <Text>{p.product_id}</Text>
              <Text>Swipe ➡️</Text>
            </ImageBackground>
          </View>
        ))}

        {/* <View style={styles.page} key="1">
          <Text>First page </Text>
          <Text>Swipe ➡️</Text>
        </View>

        <View style={styles.page} key="2">
          <Text>Second page </Text>
        </View>

        <View style={styles.page} key="3">
          <Text>Third page </Text>
        </View> */}
      </PagerView>    
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width:"100%",
    height:"100%"
  },
  page: {
    //flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //width:"100%",
    //height:"100%"
  },
});
