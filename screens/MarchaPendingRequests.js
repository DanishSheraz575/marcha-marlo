import React, { useEffect, useState } from "react";

import { View, FlatList } from "react-native";

import * as SecureStore from "expo-secure-store";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardLoader from "../components/CardLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaRequestCard from "../components/MarchaRequestCard";

export default function MarchaPendingRequests({}) {
  global.product_ids = 0;
  global.product_value = 0;
  global.marcha_product_id = 0;
  global.marcha_product_value = 0;

  const [dataState, setDataState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };

  useEffect(() => {
    fetch(global.api + "get_marcha_requests_sent", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase();

        if (status == "success" && json.result.length > 0) {
          //setDataList(json.result.reverse());
          //setDataState(2);

          let myProductList = [];
          json.result.forEach((item) => {
            if (
              item.requester_product_id > 0 &&
              item.requested_product_id > 0
            ) {
              let images = item.requested_product.images.split(",");
              let img = global.product_images_base_url + images[0];
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
            }
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
    };
  }, []);

  function renderRequestCard({ item }) {
    return <MarchaRequestCard item={item} requestType="sent" />;
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Marcha Pending Requests" />

      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (dataState == 0) {
            return <CardLoader />;
          }
          return null;
        })()}

        {(() => {
          if (dataState == 1) {
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
          if (dataState == 2) {
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
