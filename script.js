// Configuración con TUS DATOS
const BIN_ID = "680f02d18561e97a5009169e";
const API_KEY = "$2a$10$o8ZR4AU8Gb577fXn2kCNaOVV9yWUU7QQg25rbN3Yn9oSjxmG2G1DO";

// Elementos HTML
const downloadLink = document.getElementById('downloadLink');
const downloadCount = document.getElementById('downloadCount');

// Función para obtener el contador actual desde JSONBin.io
async function getDownloadCount() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const data = await response.json();
        return data.record.count || 0;
    } catch (error) {
        console.error("Error al obtener contador:", error);
        return 0;
    }
}

// Función para actualizar el contador
async function updateDownloadCount(newCount) {
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ count: newCount })
        });
    } catch (error) {
        console.error("Error al actualizar contador:", error);
    }
}

// Inicializar la página
window.addEventListener('DOMContentLoaded', async () => {
    const count = await getDownloadCount();
    downloadCount.textContent = count;
});

// Manejar clic en el botón de descarga
downloadLink.addEventListener('click', async (e) => {
    e.preventDefault(); // Detenemos la descarga momentáneamente
    
    const currentCount = parseInt(downloadCount.textContent);
    const newCount = currentCount + 1;
    
    await updateDownloadCount(newCount); // Actualizamos el contador
    downloadCount.textContent = newCount;
    
    // Iniciamos la descarga después de actualizar
    window.location.href = downloadLink.href;
});
