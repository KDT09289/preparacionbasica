// Configura Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    databaseURL: "https://TU_PROYECTO.firebaseio.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Contador
document.addEventListener('DOMContentLoaded', function() {
    const countRef = database.ref('downloadCount');
    
    countRef.on('value', (snapshot) => {
        const count = snapshot.val() || 0;
        document.getElementById('downloadCount').textContent = count;
    });

    document.getElementById('downloadLink').addEventListener('click', function() {
        countRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        });
    });
});
