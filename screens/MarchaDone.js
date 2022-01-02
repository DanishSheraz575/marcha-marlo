import React, { useEffect, useState } from "react";

import { View, FlatList } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import CardContentLoader from "../components/CardContentLoader";
import RequestsNotFound from "../components/RequestsNotFound";
import BottomLinks from "../components/BottomLinks";
import MarchaDoneCard from "../components/MarchaDoneCard";

export default function MarchaDone({}) {

  const {fullContainer, containerInner}=StyleOf;

  const [myProductsState, setMyProductsState] = useState(0);
  const [dataList, setDataList] = useState([]);

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
          setDataList(json.result);
          setMyProductsState(2);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function renderRequestCard({ item }) {
    return <MarchaDoneCard item={item} />;
  }

  return (
    <View style={fullContainer}>
      <ScreenHeader title="Marcha Done" />

      <View style={[containerInner]}>
        <View style={{ marginTop: 20 }}>
          {myProductsState == 0 && <CardContentLoader />}
        </View>

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
