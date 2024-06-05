// scripts.js

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el modal y los elementos necesarios dentro del modal
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');

    // Agregar un evento de clic a cada miniatura de imagen
    document.querySelectorAll('.thumbnail').forEach(img => {
        img.addEventListener('click', () => {
            // Al hacer clic en una miniatura, mostrar el modal
            modal.style.display = 'flex';
            // Establecer la fuente de la imagen del modal a la fuente de la miniatura clicada
            modalImg.src = img.src;
        });
    });

    // Agregar un evento de clic al botón de cierre
    closeBtn.addEventListener('click', () => {
        // Al hacer clic en el botón de cierre, ocultar el modal
        modal.style.display = 'none';
    });

    // Agregar un evento de clic al área del modal
    modal.addEventListener('click', (e) => {
        // Si se hace clic fuera de la imagen (en el fondo del modal), ocultar el modal
        if (e.target !== modalImg) {
            modal.style.display = 'none';
        }
    });
});