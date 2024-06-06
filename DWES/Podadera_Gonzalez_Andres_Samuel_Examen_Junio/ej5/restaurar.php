<?php
define('ARCHIVO_DATOS_JSON',__DIR__.DIRECTORY_SEPARATOR.'datos'.DIRECTORY_SEPARATOR.'datos.json');

$datos = <<<'ENDDATA'
[
    {
        "id": 1,
        "nombre": "Max",
        "especie": "Perro",
        "raza": "Labrador Retriever"
    },
    {
        "id": 2,
        "nombre": "Luna",
        "especie": "Gato",
        "raza": "Siamés"
    },
    {
        "id": 3,
        "nombre": "Coco",
        "especie": "Pájaro",
        "raza": "Canario"
    },
    {
        "id": 4,
        "nombre": "Rocky",
        "especie": "Perro",
        "raza": "Bulldog"
    },
    {
        "id": 5,
        "nombre": "Bella",
        "especie": "Gato",
        "raza": "Persa"
    },
    {
        "id": 6,
        "nombre": "Kiwi",
        "especie": "Pájaro",
        "raza": "Periquito"
    }
]
ENDDATA;

file_put_contents(ARCHIVO_DATOS_JSON,$datos);
