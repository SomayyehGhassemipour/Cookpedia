import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = (imageFile: any) => {
  return new Promise((resolve, reject) => {
    var name = "recipe_" + Date.now();
    const storageRef = ref(storage, "/images/recipes/" + name);

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
