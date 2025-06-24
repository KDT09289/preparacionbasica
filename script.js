// Contador persistente (usa localStorage)
let downloadCount = localStorage.getItem('downloadCount') || 0;

// Mostrar contador al cargar la página
document.getElementById('download-count').textContent = downloadCount;

function downloadFile(filename) {
    // 1. Crear enlace temporal para descargar
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename; // Fuerza la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Incrementar y guardar el contador
    downloadCount++;
    localStorage.setItem('downloadCount', downloadCount);
    document.getElementById('download-count').textContent = downloadCount;

    // (Opcional) Mensaje en consola para depuración
    console.log(`Archivo descargado: ${filename} | Total descargas: ${downloadCount}`);
}
