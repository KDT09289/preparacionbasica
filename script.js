// Configuración con TUS DATOS
const BIN_ID = "680f02d18561e97a5009169e";
const API_KEY = "$2a$10$o8ZR4AU8Gb577fXn2kCNaOVV9yWUU7QQg25rbN3Yn9oSjxmG2G1DO";

// Elementos HTML
const downloadLink = document.getElementById('downloadLink');
const downloadCount = document.getElementById('downloadCount');

// Función para actualizar el contador
async function updateCounter() {
    try {
        // 1. Obtener el contador actual
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await response.json();
        let currentCount = data.record.count || 0;

        // 2. Incrementar el contador
        currentCount++;
        
        // 3. Guardar el nuevo valor
        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ count: currentCount })
        });

        // 4. Mostrar el nuevo valor
        downloadCount.textContent = currentCount;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Inicializar la página
async function init() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await response.json();
        downloadCount.textContent = data.record.count || 0;
    } catch (error) {
        console.error("Error al cargar contador:", error);
    }
}

// Eventos
downloadLink.addEventListener('click', async (e) => {
    e.preventDefault(); // Detener la descarga momentáneamente
    await updateCounter(); // Actualizar contador
    window.location.href = downloadLink.href; // Iniciar descarga
});

// Iniciar
init();
