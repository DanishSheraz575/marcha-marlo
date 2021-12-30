import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardLoader from "../components/CardLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaRequestReceivedCard from "../components/MarchaRequestReceivedCard";

export default function MarchaRequestReceived() {

  const {fullContainer, containerInner}=StyleOf;

  const [dataState, setDataState] = useState(false);
  const [dataList, setDataList] = useState([]);

  const data = { api_token: global.token, user_id: global.uid, is_mobile:true };
  useEffect(() => getData(), []);

  const renderRequestCard = useCallback(
    ({ item }) => (
      <MarchaRequestReceivedCard item={item} />
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
          setDataList(json.result);
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
