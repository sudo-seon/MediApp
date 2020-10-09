<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Citas;
use Illuminate\Support\Facades\Validator;

class CitasController extends Controller
{

    public function index(Request $request) {
        return Citas::all();
    }

    public function AddCitas(Request $request){
        
        $validator = Validator::make($request->json()->all(), [
            'fecha_cita' => 'required',
            'jvpm' => 'required',
            'id_paciente' => 'required',
            'hora_cita' => 'required',
            'status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $citas = Citas::create([
            'fecha_cita' => $request->json()->get('fecha_cita'),
            'jvpm' => $request->json()->get('jvpm'),
            'id_paciente' => $request->json()->get('id_paciente'),
            'hora_cita' => $request->json()->get('hora_cita'),
            'status' => $request->json()->get('status'),
        ]);

        return response()->json(compact('citas'), 201);
    
    }
}
