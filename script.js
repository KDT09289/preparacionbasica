// Contador persistente (usa localStorage)
let downloadCount = localStorage.getItem('downloadCount') || 0;

document.getElementById('download-count').textContent = downloadCount;

function downloadFile(filename) {
    // Simular descarga (reemplaza con tu lógica real)
    console.log(`Descargando ${filename}...`);
    
    // Incrementar contador
    downloadCount++;
    localStorage.setItem('downloadCount', downloadCount);
    document.getElementById('download-count').textContent = downloadCount;

    // Redirigir al archivo (asegúrate de tener el PDF en tu repositorio)
    window.location.href = filename;
}
