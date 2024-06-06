<div>
    <h1>Lista de Videojuegos Filtrados</h1>
    <ul>
        <?php $__currentLoopData = $videojuegos; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $videojuego): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li><?php echo e($videojuego['nombre']); ?> - <?php echo e($videojuego['anyo_lanzamiento']); ?></li>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </ul>

</div>
<?php /**PATH C:\xampp\htdocs\ExamenJunio\proyecto_base_SIMULACRO_2023-2024\proyecto_base\ej4\resources\views/filtrado.blade.php ENDPATH**/ ?>