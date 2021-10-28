import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from "../components/ScreenHeader";
import ScreenSubTitleHeader from "../components/ScreenSubTitleHeader";
import BottomLinks from "../components/BottomLinks";
import MarchaSpinner from "../components/MarchaSpinner";
import CardContentLoader from "../components/CardContentLoader";
import ProductsNotFound from "../components/ProductsNotFound";
import ExploreProductsCard from "../components/ExploreProductsCard";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function ExploreProducts({ navigation }) {
  const textInputRef = useRef();

  const [keyword, setKeyword] = useState("");
  const [productsState, setProductsState] = useState(0);
  const [dataList, setDataList] = useState(false);
  const [itemsList, setItemsList] = useState(false);

  const data = { api_token: global.token, user_id: global.uid };
  useEffect(() => {
    fetch(global.api + "explore_products", {
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
          setDataList(json.result.reverse());
          setItemsList(json.result.reverse());
          setProductsState(2);
        } else {
          setProductsState(1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  function clearFilter() {
    textInputRef.current.clear();
    setKeyword('');
    setDataList(itemsList);
  }

  function applyFilter() {
    if (keyword == "" || keyword == null) {
      //
      alert("Please enter keyword to filter");
    } else {
      const newdata = itemsList.filter(function (item) {
        var search = keyword.toLowerCase();
        var title = item.title.toLowerCase();
        var price = item.value.toLowerCase();
        var location = item.location.toLowerCase();
        if (
          title.includes(search) ||
          price == search ||
          location.includes(search)
        ) {
          return item;
        }
      });

      if (!newdata.length) {
        alert("Sorry! no records found.");
      }
      setDataList(newdata);
    }
  }

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Explore Products" />
      <View style={[StyleOf.containerInner]}>
        {(() => {
          if (productsState == 0) {
            return <CardContentLoader />;
          }
          return null;
        })()}

        {(() => {
          if (productsState == 1) {
            return <ProductsNotFound btnType="BackToDashboard" />;
          }
          return null;
        })()}

        {(() => {
          if (productsState == 2) {
            return (
              <>
                <View style={[{ marginTop: -10, paddingHorizontal: 10 }]}>
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: "85%",
                      padding: 5,
                      height: 42,
                      borderRadius: 5,
                    }}
                  >
                    <TextInput
                      style={{
                        marginBottom: 0,
                        width: "90%",
                        alignSelf: "flex-start",
                        position: "absolute",
                        lineHeight: 42,
                        height: 42,
                        paddingHorizontal: 10,
                      }}
                      ref={textInputRef}
                      placeholder="Search by title, price, location"
                      onChangeText={(keyword) => setKeyword(keyword)}
                    />

                    {(() => {
                      if (keyword !== "") {
                        return (
                          <TouchableOpacity
                            style={{
                              position: "absolute",
                              marginRight: 10,
                              right: 0,
                              padding: 5,
                              marginTop: 5,
                            }}
                            onPress={() => clearFilter()}
                          >
                            <Image
                              source={require("../assets/cross-icon-black.png")}
                            />
                          </TouchableOpacity>
                        );
                      }
                      return null;
                    })()}
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      marginRight: 10,
                      right: 0,
                    }}
                    onPress={() => applyFilter()}
                  >
                    <Image source={require("../assets/filterIcon.png")} />
                  </TouchableOpacity>
                </View>
                <View>
                  <ExploreProductsCard data={dataList} />
                </View>
              </>
            );
          }
          return null;
        })()}
      </View>
      <BottomLinks active="explore" />
    </View>
  );
}
