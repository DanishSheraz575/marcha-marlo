import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardLoader from "../components/CardLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaRequestCard from "../components/MarchaRequestCard";

export default function MarchaRequestReceived() {

  const {fullContainer, containerInner}=StyleOf;

  const [dataState, setDataState] = useState(false);
  const [dataList, setDataList] = useState([]);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => getData(), []);

  const renderRequestCard = useCallback(
    ({ item }) => (
      <MarchaRequestCard item={item} requestType="reseived" showHeader="0" />
    ),
    []
  );

  const getData = () => {
    setDataState(true);
    fetch(global.api + "get_marcha_requests_received", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        const status = json.status.toLowerCase();
        if (status == "success" && json.result.length > 0) {
          const dataList = json.result.map((item) => {

            const { added_by, requester_product, requested_username } = item;
            const img = added_by?.image
              ? global.user_image_base_url + added_by.image
              : "";
            let images = requester_product?.images?.split(",");
            let pimg = images?.length
              ? global.product_images_base_url + images[0]
              : "";

            return {
              requested_username:added_by.full_name,
              requested_product_title: requester_product?.title,
              requested_product_value: requester_product?.value,
              requested_product_location: requester_product?.location,
              requested_product_condition: requester_product?.condition,
              requested_product_image: pimg,

              marcha_against_product_title: item?.requested_product?.title,
              marcha_request_id: item?.request_id,
              
              my_product_id: item?.requested_product_id,
              marcha_product_id: item?.requester_product_id,
              requester_id: added_by?.user_id,
              requester_name: added_by?.full_name,
              requester_email: added_by?.email,
              requester_image: img,
              marcha_date: item?.dated,
            };
          });
          setDataList(dataList);
          setDataState(true);
        } else {
          setDataState(false);
        }
      })
      .catch((error) => {
        setDataState(false);
      });
  };

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Marcha Requests" />

      <View style={[containerInner]}>
        {dataState && <CardLoader />}

        <FlatList
          data={dataList}
          renderItem={renderRequestCard}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <RequestsNotFound
              btnType="BackToDashboardBtn"
              message="No request received yet."
            />
          }
          refreshing={dataState}
          onRefresh={getData}
        />
      </View>
      <BottomLinks active="" />
    </View>
  );
}
