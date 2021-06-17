import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Load Screens
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import MarchaHome from './screens/MarchaHome';
import ExploreProducts from './screens/ExploreProducts';
import MyProducts from './screens/MyProducts';
import Chats from './screens/Chats';
import AddProduct from './screens/AddProduct';




const Stack = createStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{headerShown: false}}
        />   


        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{headerShown: false}}
        />   

        <Stack.Screen 
          name="SignUp" 
          component={SignUp}
          options={{headerShown: false}}
        />   

        <Stack.Screen 
          name="MarchaHome" 
          component={MarchaHome}
          options={{headerShown: false}}
        />   


        <Stack.Screen 
          name="ExploreProducts" 
          component={ExploreProducts}
          options={{headerShown: false}}
        />   

        <Stack.Screen 
          name="MyProducts" 
          component={MyProducts}
          options={{headerShown: false}}
        />   

        <Stack.Screen 
          name="Chats" 
          component={Chats}
          options={{headerShown: false}}
        />   

        <Stack.Screen 
          name="AddProduct" 
          component={AddProduct}
          options={{headerShown: false}}
        />   


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;