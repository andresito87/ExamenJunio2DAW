<?php
/*
   DNI:
   NOMBRE y APELLIDOS:
*/
//Incluye el archivo mascotas.php
?>
<!DOCTYPE html>
<html>

<head>
    <title>Veterinario</title>
</head>

<body>
    <h1>Mascotas</h1>
    <form method='POST'>
        <label for='edad'>¿Qué edad de la mascota quieres filtrar?</label>
        <select name='edad' id='edad'>
            <option value=''>Mostrar todos</option>
            <?php /* Mostrar rango de edades, desde la edad mínima a la máxima de todas las mascotas*/?>
            <option value='...'>...</option>                        
            <option value='...'>...</option>            
            <option value='...'>...</option>            
        </select>
        <br>
        <br>
        <input style='color: #003366; background-color: #99CCFF' type='submit' value='Filtrar'>
        <a href='index.php'>Reiniciar</a>
    </form>
    <br>
    <table border='1'>
        <tr style='background-color: #99CCFF'>
            <th>ID</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Sexo</th>
        </tr>
        <?php /* Listar aquí las mascotas filtradas o todas las mascotas en función de los datos $_POST */ ?>
            <tr>
                <td>... id de mascota ...</td>
                <td>... especie de la mascota ...</td>
                <td>... raza de las mascota ...</td>
                <td style='text-align:center'>... edad de la mascota ...</td>
                <td>... sexo de la mascota ...</td>
            </tr>
    </table>
</body>

</html>