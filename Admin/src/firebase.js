import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCMwVd3mJ05cf-gve60VXGjQ-6MaRYPvis",
  authDomain: "starlight-193c0.firebaseapp.com",
  projectId: "starlight-193c0",
  storageBucket: "starlight-193c0.firebasestorage.app",
  messagingSenderId: "888431397856",
  appId: "1:888431397856:web:ea5985df619afc3d5b7985"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);  // ✅ This initializes Firebase Storage
export default storage;