import * as SecureStore from "expo-secure-store";

global.setLocal = saveToLocal = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

global.getLocal = async function getFromLocal(key) {
  await SecureStore.getItemAsync(key)
    .then((result) => {
      if (result !== null) {
        return result;
      } else {
        return 0;
      }
    })
    .catch((error) => console.log(error));
};

global.getConfig = async function getFromLocal(key) {
  const data = { api_token: global.token };
  await fetch(global.api + "get_config", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      var status = json.status.toLowerCase();
      if (status == "success") {
        const config = json.result;

        setLocal("product_images_base_url", config.product_images_base_url);
        setLocal("chat_attachments_base_url", config.chat_attachments_base_url);
        setLocal("user_image_base_url", config.user_image_base_url);

        global.product_images_base_url = config.product_images_base_url;
        global.chat_attachments_base_url = config.chat_attachments_base_url;
        global.user_image_base_url = config.user_image_base_url;
      } else {
        alert(json.result);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    }, []);
};

global.getOut = getLOgOut = () => SecureStore.deleteItemAsync("marchaUserInfo");
global.getProducts = getMyProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      global.myProductSelectedId = 0;
      const promise = await fetch(global.api + "my_products", {
        method: "POST", // or 'PUT'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_token: global.token, user_id: global.uid }),
      });
      if (promise.ok) {
        const { result } = await promise.json();
        resolve(result?.reverse());
      } else resolve([]);
    } catch (error) {
      reject("Unknow Error");
      console.log(error);
    }
  });
};
global.getExploreProducts = getExploreProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = await fetch(global.api + "explore_products", {
        method: "POST", // or 'PUT'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_token: global.token, user_id: global.uid }),
      });
      if (promise.ok) {
        const { result } = await promise.json();
        resolve(result?.reverse());
      } else resolve([]);
    } catch (error) {
      reject("Unknow Error");
      console.log(error);
    }
  });
};

 getOut();

setLocal("token", "3154f2a10b4aecaa9ae8c10468cd8227");
setLocal("api", "https://www.marchamarlo.com/api/");

global.token = "3154f2a10b4aecaa9ae8c10468cd8227";
global.api = "https://www.marchamarlo.com/api/";

global.comingFrom = "myProducts";

global.ufull_name = "Marcha Marlo User";
global.uemail = "";
//global.uimage=noImage;
global.uimage = "";
global.ugender = "";
global.ucountry = "";
global.ucity = "";
global.ucontact_number = "";
global.ulast_login = "09 Sep 2021";
global.ustatus = 1;
global.borderDanger = "#ffb2b2";

global.product_images_base_url = "";
global.chat_attachments_base_url = "";
global.user_image_base_url = "";
global.myProductList = [];
global.exploreProductList = [];
