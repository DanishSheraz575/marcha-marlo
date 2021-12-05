import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { Alert } from "react-native";

export class Picker {
  static openCamera = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission) {
          const response = await ImagePicker.launchCameraAsync({
            mediaTypes: "Images",
            allowsEditing: true,
          });

          if (!response?.cancelled) {
            delete response?.cancelled;
            const image = await this.compressImage(response);
            resolve({ status: true, image });
          } else resolve({ status: false });
        } else {
          Alert.alert("Permission to access camera roll is required!");
          resolve({ status: false });
        }
      } catch (error) {
        reject({ status: false, error });
      }
    });
  };

  static compressImage = (image) => {
    return new Promise(async (resolve, reject) => {
      try {
        const manipResult = await manipulateAsync(
          image.localUri || image.uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.4, format: SaveFormat.JPEG }
        );
        resolve(manipResult);
      } catch (error) {
        console.log(error);
        reject("compress error");
      }
    });
  };

  static openImagePicker = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission) {
          const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsMultipleSelection: false,
            allowsEditing:true
          });

          if (!response?.cancelled) {
            delete response?.cancelled;
            const image = await this.compressImage(response);
            resolve({ status: true, image });
          } else resolve({ status: false });
        } else {
          Alert.alert("Permission to access camera roll is required!");
          resolve({ status: false });
        }
      } catch (error) {
        reject({ status: false, error });
      }
    });
  };
}
