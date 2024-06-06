<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Formulario</title>
</head>

<body>

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

    <h1>Formulario</h1>
    <form action="<?php echo e(route('crearLibro')); ?>" method="POST">
        <?php echo csrf_field(); ?> <!-- Token de seguridad QUE NO SE OLVIDE-->
        <label for="titulo">Titulo</label>
        <input type="text" name="titulo" id="titulo">
        <br>
        <label for="year">Año</label>
        <input type="text" name="year" id="year">
        <br>
        <label for="autor">Autor</label>
        <input type="text" name="autor" id="autor">
        <br>
        <input type="submit" value="Enviar">
    </form>

</body>

</html>
<?php /**PATH C:\xampp\htdocs\ExamenJunio\LaravelEjercicioRepaso\resources\views/libro/nuevo.blade.php ENDPATH**/ ?>