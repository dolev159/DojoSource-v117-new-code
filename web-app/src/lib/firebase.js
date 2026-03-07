import { initializeApp } from 'firebase/app';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

// Firebase configuration
// Replace these with your actual project values from the Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "dojosource-v117-new-code",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Data Connect
export const dataconnect = getDataConnect(app, connectorConfig);

// If you want to use the emulator locally:
if (import.meta.env.DEV) {
  connectDataConnectEmulator(dataconnect, 'localhost', 9399);
}
