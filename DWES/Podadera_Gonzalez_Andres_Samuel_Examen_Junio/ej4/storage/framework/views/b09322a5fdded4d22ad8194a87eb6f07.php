<form action="<?php echo e(route("procesar")); ?>" method="post">
    <?php echo csrf_field(); ?>
    Nombre:<input type="text" name="nombre">
    Especie:<input type="text" name="especie">
    Raza:<input type="text" name="raza">
    <input type="submit" value="enviar">
</form>

<?php if($errors->any()): ?>
    <div class="alert alert-danger">
        <ul>
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    </div>
<?php endif; ?>
<?php /**PATH C:\xampp\htdocs\proyecto_base\ej4\resources\views/insertar_mascota.blade.php ENDPATH**/ ?>