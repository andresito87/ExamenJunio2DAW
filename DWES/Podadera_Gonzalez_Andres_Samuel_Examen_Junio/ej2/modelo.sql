-- Ejemplo de script de implementación de BBDD ('modelo.sql')
-- Creamos y empezamos a usar la BBDD

DROP DATABASE IF EXISTS examen_dwes_bbdd;
CREATE DATABASE examen_dwes_bbdd;
USE examen_dwes_bbdd;

DROP TABLE IF EXISTS mascotas;
DROP TABLE IF EXISTS propietarios;

-- Implementación en SQL del modelo de base de datos

CREATE TABLE propietarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT,
    fecha_alta DATE NOT NULL
);

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50),
    raza VARCHAR(50),
    id_propietario INT DEFAULT NULL,
    FOREIGN KEY (id_propietario) REFERENCES propietarios(id) ON DELETE SET NULL
);

-- Inserciones de ejemplo

INSERT INTO propietarios (id, nombre, edad, fecha_alta) VALUES
(1, 'Clínica Veterinaria', 10, '2014-01-01');

INSERT INTO propietarios (nombre, edad, fecha_alta) VALUES
('Ana Torres', 34, '2020-05-12'),
('Luis Navarro', 28, '2018-07-23'),
('Sofía Giménez', 45, '2016-02-15'),
('Miguel Ángel López', 60, '2019-11-30'),
('Carmen Ruiz', 53, '2017-04-09'),
('Fernando Casado', 39, '2021-03-21'),
('Laura Esquivel', 30, '2022-08-16'),
('Diego Martín', 25, '2018-06-01'),
('Patricia Conde', 47, '2020-01-20');

INSERT INTO mascotas (nombre, especie, raza, id_propietario) VALUES
('Max', 'Perro', 'Labrador', 1),
('Daisy', 'Gato', 'Persa', 1),
('Bella', 'Perro', 'Husky', 1),
('Zoe', 'Gato', 'Siames', 1),
('Charlie', 'Perro', 'Golden Retriever', 1),
('Oliver', 'Gato', 'Maine Coon', 1),
('Lucy', 'Perro', 'Beagle', 1),
('Toby', 'Gato', 'Bengalí', 1),
('Luna', 'Perro', 'Border Collie', 1),
('Chloe', 'Gato', 'Sphynx', 1),
('Cooper', 'Perro', 'Boxer', 1),
('Penny', 'Gato', 'Ragdoll', 1),
('Rocky', 'Perro', 'Pitbull', 1),
('Loki', 'Gato', 'British Shorthair', 1),
('Sadie', 'Perro', 'Dachshund', 1),
('Winston', 'Gato', 'Abyssinian', 1),
('Molly', 'Perro', 'Poodle', 1),
('Koda', 'Gato', 'Scottish Fold', 1),
('Bailey', 'Perro', 'Cocker Spaniel', 1),
('Ruby', 'Gato', 'American Shorthair', 1);
