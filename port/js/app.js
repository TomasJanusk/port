import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFUzB26xYpC735MLaYNhnNc7uxnldiNxU",
    authDomain: "musudatabaseprojektas.firebaseapp.com",
    databaseURL: "https://musudatabaseprojektas-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "musudatabaseprojektas",
    storageBucket: "musudatabaseprojektas.appspot.com",
    messagingSenderId: "996181232561",
    appId: "1:996181232561:web:a722c10aaefaabb864cb90"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

document.querySelector('#registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                password: password,
                role: 'simple user'
            })
                .then(() => {
                    alert('User created and data saved to database!');
                })
                .catch((databaseError) => {
                    console.error('Error saving user data:', databaseError);
                    alert('User created but failed to save user data.');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error creating user:', errorCode, errorMessage);
            alert(errorMessage);
        });
});
