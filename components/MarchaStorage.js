
import React from 'react';
import * as SecureStore from 'expo-secure-store';


export default function MarchaStorage(action, key, value) {


alert('action '+action);
alert('key '+key);

    let output=false;

  async function getFromLocal(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

async function saveToLocal(key, value) {
    await SecureStore.setItemAsync(key, value);
}


if(action='get' && key!==''){
    output=getFromLocal(key);
}


if(action='set' && key!=='' && value!==''){
    saveToLocal(key, value);
}

return (output);


}
