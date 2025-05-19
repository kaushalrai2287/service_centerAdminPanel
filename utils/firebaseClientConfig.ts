// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// // Firebase config (this will only be executed on the client side)
// const firebaseConfig = {
//   apiKey: "AIzaSyCKih28VR01VaJMSZ3ADaxiHXLQOXNH0eU",
//   authDomain: "chofor-9c477.firebaseapp.com",
//   projectId: "chofor-9c477",
//   storageBucket: "chofor-9c477.firebasestorage.app",
//   messagingSenderId: "570718560766",
//   appId: "1:570718560766:web:1da3433e2c069626f9a0af",
//   measurementId: "G-9G09S291LZ"
// };

// // Initialize Firebase (client-side only)
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export { messaging, getToken, onMessage };
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKih28VR01VaJMSZ3ADaxiHXLQOXNH0eU",
  authDomain: "chofor-9c477.firebaseapp.com",
  projectId: "chofor-9c477",
  storageBucket: "chofor-9c477.firebasestorage.app",
  messagingSenderId: "570718560766",
  appId: "1:570718560766:web:1da3433e2c069626f9a0af",
  measurementId: "G-9G09S291LZ",
};

// Ensure Firebase runs only on the client
let messaging: ReturnType<typeof getMessaging> | null = null;
let app: ReturnType<typeof initializeApp> | null = null;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging, getToken, onMessage };
