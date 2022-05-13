import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
	apiKey: "AIzaSyCMwO0O0M4OHDL0fhXg_RpXxkWLVpfhyWs",
	authDomain: "task-manager-bd4a2.firebaseapp.com",
	projectId: "task-manager-bd4a2",
	storageBucket: "task-manager-bd4a2.appspot.com",
	messagingSenderId: "216341950267",
	appId: "1:216341950267:web:be5e9b8b5e681876bfd11e",
	measurementId: "G-HF1XZVPWSH"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore };