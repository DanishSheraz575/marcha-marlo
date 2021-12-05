import React, { useEffect, useState } from "react";
import { View } from "react-native";

import PagerLoader from "../components/PagerLoader";
import ProductsNotFound from "../components/ProductsNotFound";
import ProductPager from "../components/ProductPager";

import StyleOf from "../assets/AppStyles";

export default function GoForMarcha() {

  const {fullContainer, containerInner}=StyleOf;

  const [productsState, setProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);

  const pid = global.myProductSelectedId;
  const data = {
    api_token: global.token,
    user_id: global.uid,
    product_ids: pid,
  };
  useEffect(() => {
    fetch(global.api + "go_for_marcha", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        var status = json.status.toLowerCase();
        if (status == "success" && json.result.length > 0) {
          setDataList(json.result);
          setProductsState(2);
        } else {
          setProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <View style={fullContainer}>
      <View style={[containerInner]}>
        {productsState == 0 && <PagerLoader />}

        {productsState == 1 && (
          <ProductsNotFound btnType="GoBackToMyProducts" />
        )}

        {productsState == 2 && <ProductPager data={dataList} />}
      </View>
    </View>
  );
}
