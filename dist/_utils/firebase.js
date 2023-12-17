"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToStorage = exports.storage = exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const config = {
    apiKey: "AIzaSyDU2AzQSzciR85gy4nZEoQm0g_apBiaQDU",
    authDomain: "supervised-c4183.firebaseapp.com",
    projectId: "supervised-c4183",
    storageBucket: "supervised-c4183.appspot.com",
    messagingSenderId: "48985799089",
    appId: "1:48985799089:web:5bddf764cad9bdf8b92590"
};
exports.app = (0, app_1.initializeApp)(config);
const db = (0, firestore_1.getFirestore)(exports.app);
exports.db = db;
const storage = (0, storage_1.getStorage)(exports.app);
exports.storage = storage;
const uploadFileToStorage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const storageRef = (0, storage_1.ref)(storage, `images/${file.filename}`);
    try {
        const snapshot = yield (0, storage_1.uploadBytes)(storageRef, file);
        console.log("Uploaded a blob or file!", snapshot);
        return snapshot;
    }
    catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
});
exports.uploadFileToStorage = uploadFileToStorage;
//# sourceMappingURL=firebase.js.map