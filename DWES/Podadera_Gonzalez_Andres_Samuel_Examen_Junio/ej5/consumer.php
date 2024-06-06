<?php
/*
   DNI: 26813999R
   NOMBRE y APELLIDOS: PODADERA GONZALEZ ANDRES SAMUEL
*/
//Puedes usar la siguiente constante como la URL para acceder a serve.php
define('SERVE_URL', 'http://' . $_SERVER['HTTP_HOST'] . str_replace(basename(__FILE__), 'serve.php', explode('?', $_SERVER['REQUEST_URI'])[0]));
require_once __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

use GuzzleHttp\Client;

$clienteHttp = new Client(['http_errors' => false]);

if (isset($_GET['mostrar'])) {
   // obtengo un numero random entre 1 y 10
   $id = rand(0, 10);
   $respuesta = $clienteHttp->request('GET', SERVE_URL . "/?id=" . $id);
   $datosMascotas = [];
   if ($respuesta) {
      $datosMascotas = $respuesta->getBody()->getContents();
      if ($datosMascotas)
         $datosMascotas = json_decode($datosMascotas, true);
   }
   var_dump($datosMascotas);
} else if (isset($_GET['borrar'])) {
   // obtengo un numero random entre 1 y 10
   $id = rand(0, 6);
   $respuesta = $clienteHttp->delete(
      SERVE_URL,
      [
         'json' => ['id' => $id]
      ]
   );
   $datosMascotas = [];
   if ($respuesta) {
      $resultado = $respuesta->getBody()->getContents();
      if ($resultado)
         $resultadoDecodificado = json_decode($resultado, true);
   }
   var_dump($resultadoDecodificado);
} else {
   echo "Funcionalidad no implementada";
}
