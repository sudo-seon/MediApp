<?php

namespace App\Http\Controllers;

use App\Consulta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultaController extends Controller {

    
    public function index(Request $request) {
        return Consulta::all();
    }

    public function createConsulta(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'fecha_consulta' => 'required',
            'id_paciente' => 'required',
            'jvpm' => 'required',
            'rx' => 'required',
            'examen' => 'required',
            'diagnostico' => 'required',
            'receta' => 'required',
            'fprox_consulta' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $consultas = Consulta::create([
            'fecha_consulta' => $request->json()->get('fecha_consulta'),
            'id_paciente' => $request->json()->get('id_paciente'),
            'jvpm' => $request->json()->get('jvpm'),
            'rx' => $request->json()->get('rx'),
            'examen' => $request->json()->get('examen'),
            'diagnostico' => $request->json()->get('diagnostico'),
            'receta' => $request->json()->get('receta'),
            'fprox_consulta' => $request->json()->get('fprox_consulta'),
        ]);

        return response()->json(compact('consultas'), 201);
    
    }
    

}