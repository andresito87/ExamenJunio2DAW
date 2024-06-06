<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mascota;
use Illuminate\Validation\ValidationException;

class MascotaController extends Controller
{
    public function create()
    {
        return view('insertar_mascota');
    }

    public function store(Request $request)
    {
        // No veo que se pida pero introduzco una validacion de los datos
        try {
            $request->validate([
                'nombre' => 'required|string|max:255',
                'especie' => 'required|string|max:255',
                'raza' => 'required|string|max:255',
            ]);
        } catch (ValidationException $e) {
            return redirect()->route('formulario')->withInput()->withErrors($e->validator);
        }

        $libro = new Mascota();
        $libro->nombre = $request->input('nombre');
        $libro->especie = $request->input('especie');
        $libro->raza = $request->input('raza');

        $libro->save();

        return view('exito');
    }
}
