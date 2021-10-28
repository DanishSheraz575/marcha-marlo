import React, { useEffect, useState } from "react";

import { View, FlatList } from "react-native";

import * as SecureStore from "expo-secure-store";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import MarchaSpinner from "../components/MarchaSpinner";
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
  
  console.log(data);
  
  
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


        console.log(json);

        const status = json.status.toLowerCase();
        
        if (status == "success" && json.result.length > 0) {
          setDataList(json.result.reverse());
          setDataState(2);
        }else{
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
            return <MarchaSpinner size={70} />;
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
