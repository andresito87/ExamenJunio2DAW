<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' lang='es'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=2.0' />
    <style>body{max-width:210mm;margin:0 auto;padding:0 1em;font-family:'Segoe UI','Open Sans',sans-serif}a{text-decoration:none;color:blue}h1{text-align:center;margin-top:0}nav,footer{text-align:center}</style>
    <title>Clínica veterinaria</title>
  </head>

  <body>
    <h1>Clínica veterinaria</h1>

    <nav><a href='index.php'>Inicio</a> | <a href='ver_propietarios.php'>Propietarios</a> | <a href='ver_mascotas.php'>Mascotas</a> | Asociar</nav>

    <h2>Asociar</h2>

    <form action='procesar_asociacion.php' method='post'>
      ID de la mascota: <input type='number' name='mascota_id' min='1' step='1' required='required' />
      <br/>
      ID del nuevo propietario: <input type='number' name='nuevo_propietario_id' min='1' step='1' required='required' />
      <br/><br/>
      <input type='submit' value='Asociar' />
    </form>

    <footer><p>Examen de junio - Desarrollo Web en Entorno Servidor a distancia - 2023-2024.</p></footer>

  </body>
</html>
