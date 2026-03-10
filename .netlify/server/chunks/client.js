import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const config = {
  apiKey: "AIzaSyAF9HiAoAcodlKc44zFo9-7deniT7jV-LY",
  authDomain: "social-network-1773170117.firebaseapp.com",
  projectId: "social-network-1773170117",
  storageBucket: "social-network-1773170117.firebasestorage.app",
  messagingSenderId: "82293689339",
  appId: "1:82293689339:web:7f67c345d36c8c04fb595e"
};
const hasFirebaseConfig = Object.values(config).every(Boolean);
export {
  hasFirebaseConfig as h
};
