<?php if($errors->any()): ?>
    <h2>Errores</h2>
    <div class="alert alert-danger">
        <ul>
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    </div>
<?php endif; ?>

<table>
    <thead>
        <tr>
            <th>Titulo</th>
            <th>Año</th>
            <th>Autor</th>
        </tr>
    </thead>
    <tbody>
        <?php $__currentLoopData = $libros; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $libro): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr>
                <td><?php echo e($libro->titulo); ?></td>
                <td><?php echo e($libro->year); ?></td>
                <td><?php echo e($libro->autor); ?></td>
            </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </tbody>
</table>
<?php /**PATH C:\xampp\htdocs\ExamenJunio\LaravelEjercicioRepaso\resources\views/libro/listado.blade.php ENDPATH**/ ?>