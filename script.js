// Configuración Firebase (te paso los detalles si quieres migrar)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    databaseURL: "https://TU_PROYECTO.firebaseio.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const counterRef = ref(db, 'globalDownloads');

// Mostrar contador en tiempo real
onValue(counterRef, (snapshot) => {
    downloadCount.textContent = snapshot.val() || 0;
});

// Actualizar al descargar
downloadLink.addEventListener('click', (e) => {
    e.preventDefault();
    runTransaction(counterRef, (count) => (count || 0) + 1);
    window.location.href = downloadLink.href;
});
