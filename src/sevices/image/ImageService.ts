import { storage } from "../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import MESSAGES from "../../data/message.json";

export const uploadImage = (imageFile: any, url: string, prefix: string) => {
  return new Promise((resolve, reject) => {
    var name = prefix + Date.now();
    const storageRef = ref(storage, url + name);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject({ error: error.message });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL.toString());
        });
      }
    );
  });
};

export const deleteImage = (imageURL: string) => {
  const imageRef = ref(storage, imageURL);
  deleteObject(imageRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(MESSAGES.ERROR_IN_DELETING_IMAGE + error);
      return { error: error.message };
    });
};
