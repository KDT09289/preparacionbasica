document.addEventListener('DOMContentLoaded', function() {
    // Cargar contador desde localStorage
    let count = localStorage.getItem('downloadCount') || 0;
    document.getElementById('downloadCount').textContent = count;

    // Configurar el evento de descarga
    document.getElementById('downloadLink').addEventListener('click', function() {
        // Incrementar contador
        count++;
        document.getElementById('downloadCount').textContent = count;
        localStorage.setItem('downloadCount', count);
        
        // Opcional: enviar datos a un servicio si necesitas persistencia
        // fetch('https://tu-servicio.com/track-download', { method: 'POST' });
    });
});
