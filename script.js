// Configuración con TUS DATOS
const BIN_ID = "680f02d18561e97a5009169e";
const API_KEY = "$2a$10$o8ZR4AU8Gb577fXn2kCNaOVV9yWUU7QQg25rbN3Yn9oSjxmG2G1DO";

// Elementos HTML
const downloadLink = document.getElementById('downloadLink');
const downloadCount = document.getElementById('downloadCount');

// Función mejorada para actualizar el contador
async function updateCounter() {
    try {
        // 1. Obtener el contador actual
        const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        
        if (!getResponse.ok) throw new Error("Error al obtener datos");
        
        const { record: { count = 0 } } = await getResponse.json();
        
        // 2. Incrementar y actualizar
        const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY,
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify({ count: count + 1 })
        });
        
        if (!putResponse.ok) throw new Error("Error al actualizar");
        
        // 3. Mostrar el nuevo valor
        const updatedData = await putResponse.json();
        downloadCount.textContent = updatedData.record.count;
        return true;
        
    } catch (error) {
        console.error("Error crítico:", error);
        return false;
    }
}

// Evento de clic mejorado
downloadLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const success = await updateCounter();
    if (success) {
        // Descargar después de actualizar
        const link = document.createElement('a');
        link.href = downloadLink.href;
        link.download = true;
        link.click();
    } else {
        alert("Error al actualizar el contador. Intenta nuevamente.");
    }
});

// Cargar contador al iniciar
(async () => {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const { record: { count = 0 } } = await response.json();
        downloadCount.textContent = count;
    } catch (error) {
        console.error("Error al cargar contador inicial:", error);
    }
})();
