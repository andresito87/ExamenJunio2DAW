<?php
/*
   DNI: 26813999r
   NOMBRE y APELLIDOS: PODADERA GONZALEZ ANDRÉS SAMUEL
*/

//Datos de especies y razas a utilizar
$especies_y_razas = [
    'Perro' => ['Labrador Retriever', 'Bulldog', 'Golden Retriever', 'Chihuahua'],
    'Gato' => ['Siamés', 'Persa', 'Maine Coon', 'British Shorthair'],
    'Pájaro' => ['Canario', 'Periquito', 'Cotorra', 'Agapornis']
];

// arranco la sesion
session_start();

// compruebo si me ha pulsado resetear
if (isset($_POST['accion']) && $_POST['accion'] == "resetear") {
    //session_destroy();
    unset($_SESSION['especies']);
    //header("./index.php");
}

// compruebo si la especie no esta en la sesion
// muestro el formulario
if (!isset($_SESSION['especies']) || empty($_SESSION['especies'])) {

?>

    <!--Ejemplo de formulario (no hay información en la sesión) -->
    <form action="" method="post">
        <label>Seleccione la especie:
            <select name="especie">
                <?php foreach ($especies_y_razas as $key => $value) : ?>
                    <option value=<?php echo $key ?>><?php echo $key ?></option>
                <?php endforeach ?>
            </select>
        </label><BR>
        <input type="submit" value="Seleccionar especie!">
    </form>


    <?php
    // si envio la raza en la sesion, lo añado a la sesion y le muestro las lista de espicies se esa raza
    if (isset($_POST['especie']) && array_key_exists($_POST['especie'], $especies_y_razas)) {
        $_SESSION['especies'] = $_POST['especie'];
    ?>
        <!--Ejemplo de listado (si hay información en la sesión) -->
        <BR><BR>
        Listado de razas de <?php echo $_POST['especie'] . ":" ?>
        <UL>
            <?php foreach ($especies_y_razas as $key => $values) : ?>
                <?php foreach ($values as $raza) : ?>
                    <LI><?php echo $raza ?></LI>
                <?php endforeach ?>
            <?php endforeach ?>
        </UL>
    <?php
    }
    // si ya esta en la sesion le muestro la lista de razas de la especie almacenada en la sesion
} else {
    ?>
    <BR><BR>
    Listado de razas de <?php echo $_SESSION['especies'] . ":" ?>
    <UL>
        <?php foreach ($especies_y_razas[$_SESSION['especies']] as $raza) : ?>
            <LI><?php echo $raza ?></LI>
        <?php endforeach ?>
    </UL>
<?php
}


?>
<form action="" method="post">
    <input type="hidden" name="accion" value="resetear">
    <input type="submit" value="Resetear!">
</form>