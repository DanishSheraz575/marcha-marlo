import React from "react";
import { View, Text, StyleSheet,SectionList } from "react-native";

import StyleOf from "../assets/AppStyles";

import ScreenHeader from '../components/ScreenHeader';
import BottomLinks from "../components/BottomLinks";

export default function Notifications({}) {


  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

  return (
    <View style={StyleOf.fullContainer}>
      <ScreenHeader title="Notifications" />
      <View style={[StyleOf.containerInner]}>
        
        
        



      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}p</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>






      </View>
      <BottomLinks active="" />
    </View>
  );
}
