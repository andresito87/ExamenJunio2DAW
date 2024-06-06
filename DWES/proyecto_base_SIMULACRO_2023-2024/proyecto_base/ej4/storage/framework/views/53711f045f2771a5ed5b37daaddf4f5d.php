<div>
    <h1>Formulario de Filtrado</h1>
    <form action="<?php echo e(route('filtrar')); ?>" method="POST">
        <?php echo csrf_field(); ?>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre">
        <label for="anyo_lanzamiento">Año de lanzamiento:</label>
        <input type="number" name="anyo_lanzamiento" id="anyo_lanzamiento">
        <button type="submit">Filtrar</button>
    </form>
</div>
<?php /**PATH C:\xampp\htdocs\ExamenJunio\proyecto_base_SIMULACRO_2023-2024\proyecto_base\ej4\resources\views/filtrar.blade.php ENDPATH**/ ?>