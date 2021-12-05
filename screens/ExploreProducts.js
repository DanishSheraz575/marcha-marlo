import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import BottomLinks from "../components/BottomLinks";
import CardContentLoader from "../components/CardContentLoader";
import ExploreProductsCard from "../components/ExploreProductsCard";
import StyleOf from "../assets/AppStyles";

class ExploreProducts extends PureComponent {
  
  state = { itemsList: [], productsState: true, keyword: "", dataList: [] };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({ productsState: true });
    getExploreProducts()
      .then((res) => {
        this.setState({ dataList: res, productsState: false });
      })
      .catch((err) => this.setState({ productsState: false }));
  };
  render() {
    const { dataList, keyword, productsState } = this.state;
    const {fullContainer, containerInner}=StyleOf;
    return (
      <View style={fullContainer}>
        <ScreenHeader title="Explore Products" />
        <View style={[containerInner]}>
          {productsState ? (
            <CardContentLoader />
          ) : (
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
                    placeholder="Search by title, price, location"
                    onChangeText={(val) => this.setState({ keyword: val })}
                    value={keyword}
                  />
                  {keyword ? (
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        marginRight: 10,
                        right: 0,
                        padding: 5,
                        marginTop: 5,
                      }}
                      onPress={this.clearFilter}
                    >
                      <Image
                        source={require("../assets/cross-icon-black.png")}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    marginRight: 10,
                    right: 0,
                  }}
                  onPress={this.applyFilter}
                >
                  <Image source={require("../assets/filterIcon.png")} />
                </TouchableOpacity>
              </View>
              <ExploreProductsCard
                data={dataList}
                refresh={productsState}
                onRefresh={this.getData}
              />
            </>
          )}
        </View>
        <BottomLinks active="explore" />
      </View>
    );
  }

  applyFilter = () => {
    const { keyword, dataList } = this.state;
    if (keyword == "" || keyword == null) {
      //
      alert("Please enter keyword to filter");
    } else {
      const newdata = dataList.filter(function (item) {
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
      this.setState({ itemsList: newdata });
    }
  };

  clearFilter = () =>
    this.setState({ keyword: "", itemsList: this.state.itemsList });
}
export default ExploreProducts;