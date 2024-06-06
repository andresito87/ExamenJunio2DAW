<?php
/* 
   DNI:
   NOMBRE y APELLIDOS: 
*/
require_once './connect_db.php';

$SQL = 'SELECT * from smartphones';

$stmt = $dbh->prepare($SQL);
$stmt->execute();
$telefonos = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' lang='es'>

<head>
  <meta charset='utf-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=2.0' />
  <style>
    body {
      max-width: 210mm;
      margin: 0 auto;
      padding: 0 1em;
      font-family: 'Segoe UI', 'Open Sans', sans-serif
    }

    a {
      text-decoration: none;
      color: blue
    }

    h1 {
      text-align: center;
      margin-top: 0
    }

    nav,
    footer {
      text-align: center
    }
  </style>
  <title>Smartphones</title>
</head>

<body>
  <h1>Smartphones</h1>

  <nav><a href='index.php'>Inicio</a> | Ver | <a href='filtrar_1.php'>Filtrar</a></nav>

  <h2>Ver</h2>

  <!-- Completa aquí el código -->
  <table border="1">
    <tr>
      <th>ID</th>
      <th>Marca</th>
      <th>Modelo</th>
      <th>Memoria Ram</th>
      <th>Almacenamiento</th>
    </tr>
    <?php foreach ($telefonos as $telefono) : ?>
      <tr>
        <td><?= $telefono['id'] ?></td>
        <td><?= $telefono['marca'] ?></td>
        <td><?= $telefono['modelo'] ?></td>
        <td><?= $telefono['memoria_ram'] ?></td>
        <td><?= $telefono['almacenamiento'] ?></td>
      </tr>
    <?php endforeach; ?>
  </table>

  <footer>
    <p>Examen de febrero - Desarrollo Web en Entorno Servidor a distancia - 2023-2024.</p>
  </footer>

</body>

</html>