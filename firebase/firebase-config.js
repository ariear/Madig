import { initializeApp } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';
import config from "../config";

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID
};

const app = initializeApp(firebaseConfig);

export const DbFirestore = getFirestore()
export const collContent = collection(DbFirestore, 'content')

export const storage = getStorage()

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
  });