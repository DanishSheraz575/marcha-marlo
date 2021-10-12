import React, { useEffect, useState } from "react";

import { View, FlatList } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaRequestCard from "../components/MarchaRequestCard";

export default function MarchaDone({}) {
  const [myProductsState, setMyProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    fetch(global.api + "get_marcha_done_list", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        setMyProductsState(1);
        const status = json.status.toLowerCase();
        if (status == "success" && json.result.length > 0) {
          let myProductList = [];
            json.result.forEach((item) => {
              if(item.requested_product.images != null){
                let images = item.requested_product.images.split(",");
                let img = global.product_images_base_url + images[0];
              }else{
                img='';
              }
              myProductList.push({
                requested_username: item.requested_username,
                requested_product_title: item.requested_product.title,
                requested_product_value: item.requested_product.value,
                requested_product_location: item.requested_product.location,
                requested_product_condition: item.requested_product.condition,
                requested_product_image: img,
                marcha_against_product_title: item.requester_product.title,
                marcha_request_id: item.request_id,
                marcha_date: item.dated,
              });
            });
            setDataList(myProductList);
            setMyProductsState(2);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      return () => {
        // Anything in here is fired on component unmount.
      }
  }, []);

  function renderRequestCard({ item }) {
    return <MarchaRequestCard item={item} showHeader="0" marchaStatus="1" />;
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Marcha Done" />

      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (myProductsState == 0) {
            return <MarchaSpinner size={70} />;
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 1) {
            return (
              <RequestsNotFound
                btnType="BackToDashboardBtn"
                message="You have not have any pending Marcha requests."
              />
            );
          }
          return null;
        })()}

        {(() => {
          if (myProductsState == 2) {
            return (
              <FlatList
                data={dataList}
                renderItem={renderRequestCard}
                keyExtractor={(item, index) => index.toString()}
              />
            );
          }
          return null;
        })()}
      </View>

      <BottomLinks active="" />
    </View>
  );
}
