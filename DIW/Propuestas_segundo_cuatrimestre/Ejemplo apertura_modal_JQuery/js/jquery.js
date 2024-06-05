// jquery.js

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
$(document).ready(function() {
    // Obtener el modal y los elementos necesarios dentro del modal
    const $modal = $('#modal');
    const $modalImg = $('#modal-img');
    const $closeBtn = $('.close');

    // Agregar un evento de clic a cada miniatura de imagen
    $('.thumbnail').on('click', function() {
        // Al hacer clic en una miniatura, mostrar el modal
        $modal.css('display', 'flex');
        // Establecer la fuente de la imagen del modal a la fuente de la miniatura clicada
        $modalImg.attr('src', $(this).attr('src'));
    });

    // Agregar un evento de clic al botón de cierre
    $closeBtn.on('click', function() {
        // Al hacer clic en el botón de cierre, ocultar el modal
        $modal.css('display', 'none');
    });

    // Agregar un evento de clic al área del modal
    $modal.on('click', function(e) {
        // Si se hace clic fuera de la imagen (en el fondo del modal), ocultar el modal
        if (e.target !== $modalImg[0]) {
            $modal.css('display', 'none');
        }
    });
});