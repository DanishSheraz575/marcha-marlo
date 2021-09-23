import { StyleSheet, StatusBar } from "react-native";
import { color } from "react-native-reanimated";

//const AppStyles = StyleSheet.create({
export default StyleSheet.create({
  /* Color Scheme
        #C5C5C5 = Silver
        #EA2647 = Amaranth
        #FF3D57 = Radical Red
        #1A1A1A = Cod Gray
        #F1F1F1 = Seashell
        #FFFFFF = White
        #F7B402 = Selective Yellow
        #662D91 = Eminence
    */

  // BACKGROUND RELATED STYLES
  bgWhite: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
  },
  bgSeashell: {
    backgroundColor: "#F1F1F1",
  },
  bgRadicalRed: {
    backgroundColor: "#FF3D57",
    color: "#FFFFFF",
  },
  bgSelectiveYellow: {
    backgroundColor: "#F7B402",
    color: "#FFFFFF",
  },
  bgEminence: {
    backgroundColor: "#662D91",
    color: "#FFFFFF",
  },

  // TEXT RELATED STYLES - color
  textWhite: {
    color: "#FFFFFF",
  },
  textBlack: {
    color: "#000000",
  },
  textCodGray: {
    color: "#1A1A1A",
  },
  textGray: {
    color: "#818181",
  },
  textRadicalRed: {
    color: "#FF3D57",
  },
  textEminence: {
    color: "#662D91",
  },
  textWelcome: {
    color: "#D49BFF",
  },

  // TEXT RELATED STYLES - size
  f12: {
    fontSize: 12,
  },
  f14: {
    fontSize: 14,
  },
  f16: {
    fontSize: 16,
  },
  f18: {
    fontSize: 18,
  },
  f20: {
    fontSize: 20,
  },
  textLgMd: {
    fontSize: 20,
  },
  f26: {
    fontSize: 26,
  },
  fwBold: {
    fontWeight: "bold",
  },

  // PADDING STYLE
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  p20: {
    padding: 20,
  },
  p30: {
    padding: 30,
  },
  px10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  px20: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  py10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  pt10: {
    paddingTop: 10,
  },
  pb10: {
    paddingBottom: 10,
  },

  // MARGIN STYLE
  m5: {
    margin: 5,
  },
  m10: {
    margin: 10,
  },
  m20: {
    margin: 20,
  },
  m30: {
    margin: 30,
  },
  m40: {
    margin: 40,
  },
  mx20: {
    marginLeft: 20,
    marginRight: 20,
  },
  my10: {
    marginTop: 10,
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mb40: {
    marginBottom: 40,
  },

  // ICON STYLES
  editIcon: {},

  // BOX SHADOW STYLES - size
  dropShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  // INPUT STYLES - size
  input: {
    height: 45,
    width: "85%",
    marginBottom: 15,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    lineHeight: 25,
    backgroundColor: "#FFFFFF",
    borderColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    textAlign: "left",
    // textTransform: "uppercase",
  },

  labelLight: {
    color: "#9A9A9A",
    marginBottom: 0,
  },
  labelDark: {
    color: "#000000",
    fontSize: 18,
  },
  addProductInput: {
    lineHeight: 45,
    height: 45,
    width: "100%",
    color: "#000000",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
  },
  smallText: {
    fontSize: 12,
    color: "#9A9A9A",
    marginTop: 6,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    //borderColor:"#B1B1B1",
    //borderWidth:1,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#E9E9E9",
    borderColor: "#F3F3F3",
    color: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },

  productTypeButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: "40%",
    backgroundColor: "#ffffff",
    margin: 20,
    //height:45
  },

  productTypeButtonLabel: {
    fontSize: 16,
    textAlign: "center",
    //color:"#919191",
    color: "#cccccc",
  },

  productTypeButtonLabelActive: {
    fontSize: 16,
    textAlign: "center",
    color: "#000000",
    borderColor: "#000000",
  },

  // BUTTON STYLES - size
  btn: {
    width: "85%",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },

  btnLabel: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 14,
    textTransform: "uppercase",
  },

  justifyContent: {
    justifyContent: "center",
  },

  // CONTAINER STYLES - size
  flexIt: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  fullContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: StatusBar.currentHeight,
  },

  /*
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  bgImageContainer: {
    flex: 1,
    flexDirection: "column",
  },
*/
  containerInner: {
    flex: 1,
    flexDirection: "column",
  },

  itemCenter: {
    alignItems: "center",
  },

  iconBox: {
    width: 30,
    height: 30,
    justifyContent: "center",
  },

  hCenter: {
    //alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  vCenter: {
    justifyContent: "center",
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  rowItemCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  dashboardContainer: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    paddingTop: 35,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#f9f1ff",
    marginTop: 10,
    flexDirection: "column",
  },
  dashboardRow: {
    flexDirection: "row",
    flex: 1,
  },
  dashboardBox: {
    flex: 0.5,
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
    borderRadius: 3,
  },
  dashboardBoxLabel: {
    fontSize: 11,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dashboardBoxImg: {
    width: 50,
    height: 50,
    marginBottom: "8%",
    marginTop: "3%",
  },
  dashboardBoxGreen: {
    borderColor: "#5ad170",
    backgroundColor: "#4cbb60",
  },
  dashboardBoxBlue: {
    borderColor: "#1f74be",
    backgroundColor: "#1963a3",
  },
  dashboardBoxYellow: {
    borderColor: "#f8c234",
    backgroundColor: "#f3b101",
  },
  dashboardBoxRed: {
    borderColor: "#f86074",
    backgroundColor: "#fa3b54",
  },
  dashboardBoxGray: {
    borderColor: "#bbbbbb",
    backgroundColor: "#848484",
  },
  dashboardBoxMagenta: {
    borderColor: "#bd85e7",
    backgroundColor: "#662d91",
  },

  checkboxContainer: {
    flexDirection: "row",
  },
  selfCenter: {
    alignSelf: "center",
  },

  moveToBottom: {
    bottom: 0,
    position: "absolute",
    marginBottom: 20,
  },

  socialBtn: {
    margin: 5,
    width: 78,
    height: 28,
    alignItems: "center",
    padding: 6,
    borderRadius: 50,
  },
  facebookButton: {
    backgroundColor: "#475993",
  },
  twitterButton: {
    backgroundColor: "#76A9EA",
  },

  // MODAL STYLES - size
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // GRID SYSTEM - starting
  colContainerRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  col:{
    padding:"1%"
  },
  col4:{
    width: "40%"
  },
  col5:{
    width: "50%"
  },
  col6:{
    width: "60%"
  },
  // GRID SYSTEM - ending

  // REQUEST BOX STYLES - starting
  requestBox: {
    margin: 20,
  },
  rbHeader: {
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#EBEBEB",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  rbHeaderBold: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 22,
  },
  rbBody: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  rbBodyImg: {
    height: 100,
    width: "100%",
    borderColor: "#EFEFEF",
    borderWidth: 2,
    marginBottom: 10,
  },
  rbBodyDate: {
    padding: 5,
    fontSize: 9,
    backgroundColor: "#EBEBEB",
    alignSelf: "center",
  },
  rbBodyProductTitle: {
    fontSize: 18,
    fontWeight:"bold",
    lineHeight:18,
  },
  rbBodyProductPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rbBodyMarchaAgainstBox: {
    padding: 10,
    backgroundColor: "#EBEBEB",
    marginBottom: 10,
    borderRadius: 6,
  },
  rbBodyBtnLight: {
    padding: 6,
    backgroundColor: "#C5C5C5",
    borderRadius: 6,
  },
  rbBodyBtnRed: {
    padding: 6,
    backgroundColor: "#FF3D57",
    borderRadius: 6,
  },
  // REQUEST BOX STYLES - ending



// PRODUCT CARD STYLES - starting
productCard: {
  //alignItems: "center",
  justifyContent: "center",
  flex: 1,
  margin: 10,
  //height: WIDTH / numColumns,
},
productImageContainer: {
  backgroundColor: "#ffffff",
  borderWidth: 2,
  borderColor: "#ffffff",
  justifyContent: "center",
  padding: 20,
  borderRadius: 10,
  marginBottom: 6,
  alignItems: "center",
  justifyContent: "center",
},
selectedProduct: {
  borderColor: "red",
},
checkbox: {
  alignSelf: "flex-start",
  position: "relative",
  elevation: 4,
},
productImage: {
  width: 130,
  height: 130,
  alignSelf: "center",
},
productPrice: {
  color: "#000000",
  textAlign: "left",
  fontSize: 16,
  marginBottom: 6,
},
productTitle: {
  color: "#9F9F9F",
  fontSize: 13,
  marginBottom: 6,
  height: 15,
},
productLocation: {
  color: "#9F9F9F",
  textAlign: "left",
  marginBottom: 6,
},
productLocationMarker: {
  marginRight: 10,
},
itemInvisible: {
  backgroundColor: "transparent",
},
// PRODUCT CARD STYLES - ending










});
//export default AppStyles;
