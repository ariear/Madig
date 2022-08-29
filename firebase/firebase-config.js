import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
  });