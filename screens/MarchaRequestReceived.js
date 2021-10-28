import React, { useEffect, useState } from "react";

import {
  View,
  FlatList,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardLoader from "../components/CardLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaRequestCard from "../components/MarchaRequestCard";

export default function MarchaRequestReceived({}) {
  
  const [dataState, setDataState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    fetch(global.api + "get_marcha_requests_received", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase();
        if (status == "success" && json.result.length>0) {
          
          let myProductList = [];
          
          json.result.forEach((item) => {


            var requester=item.added_by;

            if(requester.image!=''){
              var img=global.user_image_base_url+requester.image;
            }else{
              var img='';
            }

            let images = item.requester_product.images.split(",");
            let pimg = global.product_images_base_url + images[0];
            myProductList.push({
              requested_username: item.requested_username,
              requested_product_title: item.requester_product.title,
              requested_product_value: item.requester_product.value,
              requested_product_location: item.requester_product.location,
              requested_product_condition: item.requester_product.condition,
              requested_product_image: pimg,
              marcha_against_product_title: item.requested_product.title,
              marcha_request_id: item.request_id,

              my_product_id:item.requested_product_id,
              marcha_product_id:item.requester_product_id,

              requester_id:requester.user_id,
              requester_name:requester.full_name,
              requester_email:requester.email,
              requester_image:img,

              marcha_date: item.dated,
            });
          });
          setDataList(myProductList);
          
          setDataState(2);
        } else {
          setDataState(1);
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
    return (
          <MarchaRequestCard item={item} requestType="reseived" showHeader="0" />
    );
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Marcha Requests" />

      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (dataState == 0) {
            return <CardLoader />;
          }
          return null;
        })()}

        {(() => {
          if (dataState == 1) {
            return <RequestsNotFound btnType="BackToDashboard" message="No request received yet." />;
          }
          return null;
        })()}

        {(() => {
          if (dataState == 2) {
            return <FlatList data={dataList} renderItem={renderRequestCard} keyExtractor={(item, index) => index.toString()} />
          }
          return null;
        })()}
      </View>

      <BottomLinks active="" />
    </View>
  );
}
