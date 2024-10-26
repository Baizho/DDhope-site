import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl8hwY87qBP-zXSMTqIDKUe5JurstaFZU",
  authDomain: "ddhope-dc58b.firebaseapp.com",
  projectId: "ddhope-dc58b",
  storageBucket: "ddhope-dc58b.appspot.com",
  messagingSenderId: "164549426262",
  appId: "1:164549426262:web:a3975962d79470543a0ff7",
  measurementId: "G-Q8EGGXKXDE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); // Make sure to use this if needed

// Export the services you want to use
export { auth, storage, analytics };
