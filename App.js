import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as SecureStore from 'expo-secure-store';

// Load Screens
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import MarchaHome from './screens/MarchaHome';
import ExploreProducts from './screens/ExploreProducts';
import MyProducts from './screens/MyProducts';
import Chats from './screens/Chats';
import AddProduct from './screens/AddProduct';


/*
const getArticlesFromApi = async () => {

  let response = await fetch('https://www.marchamarlo.com/api/get_config', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'api_token': '3154f2a10b4aecaa9ae8c10468cd8227'
    })

  });
};
*/
/*
const getArticlesFromApi = async () => {
  let response = await fetch(
    'https://www.marchamarlo.com/api/get_config',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'api_token': '3154f2a10b4aecaa9ae8c10468cd8227'
      })
    }
  );
  let result = await response.json();
  if(result.status=='Success'){
    await SecureStore.setItemAsync('product_images_base_url', result.result.product_images_base_url);
    await SecureStore.setItemAsync('chat_attachments_base_url', result.result.chat_attachments_base_url);
    await SecureStore.setItemAsync('user_image_base_url', result.result.user_image_base_url);
    await SecureStore.setItemAsync('marcha_request_statuses', result.result.marcha_request_statuses);
    await SecureStore.setItemAsync('marcha_done_request_statuses', result.result.marcha_done_request_statuses);
  }
  //return json.result.product_images_base_url;
}
*/

const data = { api_token: '3154f2a10b4aecaa9ae8c10468cd8227' };
fetch('https://www.marchamarlo.com/api/get_config', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then((json) =>  {
  var data=json.result[0];
  //console.log(data);


  //var chat_attachments_base_url=data.chat_attachments_base_url;
  //var product_images_base_url=data.product_images_base_url;
  //var user_image_base_url=data.user_image_base_url;
  //var marcha_request_statuses=data.marcha_request_statuses;

  //console.log(marcha_request_statuses[0][0]);

  //console.log(chat_attachments_base_url);
  //console.log(product_images_base_url);
  //console.log(user_image_base_url);

  //SecureStore.setItemAsync('product_images_base_url', product_images_base_url);
  //SecureStore.setItemAsync('chat_attachments_base_url', data.result.chat_attachments_base_url);
  //SecureStore.setItemAsync('user_image_base_url', data.result.user_image_base_url);
  //SecureStore.setItemAsync('marcha_request_statuses', data.result.marcha_request_statuses);
  //SecureStore.setItemAsync('marcha_done_request_statuses', data.result.marcha_done_request_statuses);

})
.catch((error) => {
  console.error('Error:', error);
});




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