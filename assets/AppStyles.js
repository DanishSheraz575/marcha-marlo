import { StyleSheet } from 'react-native';

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

        bgWhite:{
            backgroundColor:'#FFFFFF',
            color:'#1A1A1A',
        },
        bgSeashell:{
            backgroundColor:'#F1F1F1',
        },
        bgRadicalRed:{
            backgroundColor:'#FF3D57',
            color:'#FFFFFF',
        },
        bgSelectiveYellow:{
            backgroundColor:'#F7B402',
            color:'#FFFFFF',
        },
        bgEminence:{
            backgroundColor:'#662D91',
            color:'#FFFFFF',
        },
        
        textWhite:{
            color:'#FFFFFF',
        },
        textCodGray:{
            color:'#1A1A1A',
        },
        textRadicalRed:{
            color:'#FF3D57'
        },
        textEminence:{
            color:'#662D91',
        },

        textLg:{
            fontSize: 26,
            fontWeight:'bold',    
        },
        textMd:{
            fontSize: 14,
            fontWeight:'bold',    
        },

        dropShadow:{
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 16,
        },


        input: {
            height: 40,
            width:260,
            marginBottom: 15,
            borderWidth: 0,
            padding: 10,
            borderRadius:50,
            lineHeight:40,
            backgroundColor:'#FFFFFF',
            borderColor:'#F3F3F3',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
            textTransform: 'uppercase'
          },

        btn:{
            width:260,
            alignItems: "center",    
            padding: 15,
            borderRadius:50,
            margin:10,
        },

        btnLabel:{
            fontWeight:'bold',
            color:'#FFFFFF',
            fontSize:14,
            textTransform: 'uppercase'
        },


        fwBold:{
            fontWeight:'bold',
        },

        flexIt:{
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

    
        fullContainer: {
            flex: 1,
            flexDirection: "column",
            
        },

        container: {
            flex: 1,
            flexDirection: "column",
            padding:20,
            
        },
        bgImageContainer: {
            flex: 1,
            flexDirection: "column",
        },

        containerInner: {
            flex: 1,    
            alignItems: 'center',
            justifyContent: 'center',
        },


        itemCenter:{
            alignItems: 'center',
        },

        bgImage: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
        },


        rowItemCenter: {
            flex: 1, 
            alignItems:'center',
            justifyContent: 'center',
        },

        moveToBottom:{
            bottom:0,
            position: 'absolute',
            marginBottom:20,
        },
        



        socialBtn:{
            margin:5,
            width:78,
            height:28,
            alignItems: "center",
            padding:6,
            borderRadius:50,
        },
        facebookButton:{            
            backgroundColor: "#475993",
        },
        twitterButton:{
            backgroundColor: "#76A9EA", 
        },



    });
//export default AppStyles;
