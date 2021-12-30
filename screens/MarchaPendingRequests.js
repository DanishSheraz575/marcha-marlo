import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardLoader from "../components/CardLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaPendingRequestsCard from "../components/MarchaPendingRequestsCard";

export default function MarchaPendingRequests() {

  const {fullContainer, containerInner}=StyleOf;

  global.product_ids = 0;
  global.product_value = 0;
  global.marcha_product_id = 0;
  global.marcha_product_value = 0;

  const [dataState, setDataState] = useState(0);
  const [dataList, setDataList] = useState([]);

  const data = { api_token: global.token, user_id: global.uid, is_mobile:true };


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
          setDataList(json.result);
          setDataState(2);
        } else {
          setDataState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function renderRequestCard({ item }) {
    return <MarchaPendingRequestsCard item={item} />;
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Pending Requests" />
      <View style={[containerInner]}>
        {dataState == 0 && <CardLoader />}
        <FlatList
          data={dataList}
          renderItem={renderRequestCard}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <RequestsNotFound
              btnType="BackToDashboardBtn"
              message="You have not have any pending Marcha requests."
            />
          }
        />
      </View>
      <BottomLinks active="" />
    </View>
  );
}
