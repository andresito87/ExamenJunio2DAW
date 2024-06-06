<?php

define('ARCHIVO_DATOS_JSON',__DIR__.DIRECTORY_SEPARATOR.'datos'.DIRECTORY_SEPARATOR.'datos.json');
define('ARCHIVO_DATOS_JSON_ORIGINAL',__DIR__.DIRECTORY_SEPARATOR.'datos'.DIRECTORY_SEPARATOR.'datos_original.json');
header('Content-type: application/json');    
$datos=json_decode(file_get_contents(ARCHIVO_DATOS_JSON),true);
$guardar=false;

if ($_SERVER['REQUEST_METHOD']==='GET')
{    
    if (isset($_GET['id']) && !empty($_GET['id']))
    {
        $pos=array_search($_GET['id'],array_combine(array_keys($datos),array_column($datos,'id')));        
        if ($pos!==false)
            echo json_encode($datos[$pos],JSON_PRETTY_PRINT);
        else
            echo json_encode(['ERROR'=>"Mascota con id \"{$_GET['id']}\" NO encontrada."]);
    }
    else
            echo json_encode(['ERROR'=>'No se ha enviado id de mascota']);
}
elseif ($_SERVER['REQUEST_METHOD']==='DELETE')
{
    $peticion=json_decode(file_get_contents("php://input"),true); 
    if ($peticion!==null && is_numeric($peticion['id']))
    {
        $pos=array_search($peticion['id'],array_combine(array_keys($datos),array_column($datos,'id')));        
        if ($pos!==false)
        {
            if (isset($datos[$pos])) {
                $mascotaeliminada=$datos[$pos];
                unset($datos[$pos]);
                $guardar=true;
                echo json_encode(['RESULTADO'=>"Mascota con id id={$peticion['id']} borrada.",'DATOS'=>$mascotaeliminada],JSON_PRETTY_PRINT);
            }
            else
            {
                echo json_encode(['ERROR'=>"No existe INDEX $pos en los datos.",'DATOS'=>$datos],JSON_PRETTY_PRINT);
            }
        }
        else
            echo json_encode(['ERROR'=>"No se puede eliminar. Mascota con id={$peticion['id']} NO encontrada."]);                        
    }
    else
        echo json_encode(['ERROR'=>'Datos JSON no válidos']);
}
elseif ($_SERVER['REQUEST_METHOD']==='POST')
{
    if (isset($_POST['restaurar']) && $_POST['restaurar']==='si')
    {
        unlink(ARCHIVO_DATOS_JSON);
        copy(ARCHIVO_DATOS_JSON_ORIGINAL,ARCHIVO_DATOS_JSON);
        echo json_encode(['RESULTADO'=>"Listado de mascotas restaurado."]);
    }
    else
        echo json_encode(['ERROR'=>'Datos POST no válidos']);
}
else
{
    echo json_encode(['ERROR'=>'Método no implementado']);
}

if ($guardar)
{
    file_put_contents(ARCHIVO_DATOS_JSON,json_encode(array_values($datos),JSON_PRETTY_PRINT));
}