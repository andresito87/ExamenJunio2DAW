<?php

use App\Http\Controllers\MascotaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get(
    '/crear-mascota',
    [MascotaController::class, 'create']
)->name('formulario');
Route::post(
    '/crear-mascota',
    [MascotaController::class, 'store']
)->name('procesar');
