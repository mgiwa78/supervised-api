import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { UploadResult, getStorage, ref, uploadBytes } from "firebase/storage";

const config = {
  apiKey: "AIzaSyDU2AzQSzciR85gy4nZEoQm0g_apBiaQDU",
  authDomain: "supervised-c4183.firebaseapp.com",
  projectId: "supervised-c4183",
  storageBucket: "supervised-c4183.appspot.com",
  messagingSenderId: "48985799089",
  appId: "1:48985799089:web:5bddf764cad9bdf8b92590"
};

export const app = initializeApp(config);

const db = getFirestore(app);

const storage = getStorage(app);

const uploadFileToStorage = async (file: any): Promise<UploadResult> => {
  const storageRef = ref(storage, `images/${file.filename}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!", snapshot);
    return snapshot;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export { db, storage, uploadFileToStorage };
