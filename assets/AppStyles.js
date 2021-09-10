import { StyleSheet, StatusBar } from "react-native";

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
  textCodGray: {
    color: "#1A1A1A",
  },
  textRadicalRed: {
    color: "#FF3D57",
  },
  textEminence: {
    color: "#662D91",
  },
  // TEXT RELATED STYLES - size
  f26: {
    fontSize: 26,
  },
  textLgMd: {
    fontSize: 20,
  },
  f14: {
    fontSize: 14,
  },
  f12: {
    fontSize: 12,
  },
  fwBold: {
    fontWeight: "bold",
  },

  // PADDING STYLE
  p10:{
    padding:10
  },
  p20:{
    padding:20
  },
  p30:{
    padding:30
  },
  px20:{
    paddingLeft:20,
    paddingRight:20
  },
  py10:{
    paddingTop:10,
    paddingBottom:10
  },

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
    height: 40,
    width: 260,
    marginBottom: 15,
    borderWidth: 0,
    padding: 10,
    borderRadius: 50,
    lineHeight: 40,
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
    textTransform: "uppercase",
  },


  // BUTTON STYLES - size
  btn: {
    width: 260,
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


  justifyContent:{
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
  },
/*
  itemCenter: {
    alignItems: "center",
  },
*/
  hCenter: {
    alignItems: "center",
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



});
//export default AppStyles;
