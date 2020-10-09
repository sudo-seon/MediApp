<?php

namespace App\Http\Controllers;

use App\Medicos;
use App\Especialidades;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicosController extends Controller
{
    //mostrar
    public function index(Request $request){
        
        return Medicos::all();
       //return Especialidades::all();
    }

    //Agregar a tabla Especialidades
    public function AddEspecialidades(Request $request){
        
        $medicos=request()->all();
        Especialidades::insert($medicos);

        return response()->json( $medicos);
    
    }

    //Obtener datos de la tabla Especialidades 
    public function GetEspecialidad(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'nombre_especialidad' => 'required|string'
        ]);
    
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
    
        $especialidad = Especialidades::select()->where('nombre_especialidad', $request->json()->get('nombre_especialidad'))->first();
    
        return response()->json(compact('especialidad'), 201);
        
    }

     //Agrega a tabla Medicos
    public function AddMedicos(Request $request){
        
        $validator = Validator::make($request->json()->all(), [
            'jvpm' => 'required',
            'id_usuario' => 'required',
            'id_especialidad' => 'required',
            'nombre_medico' => 'required|string',
            'email_medico' => 'required|string',
            'tel_medico' => 'required|string',
            'tarifa' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $medico = Medicos::create([
            'jvpm' => $request->json()->get('jvpm'),
            'id_usuario' => $request->json()->get('id_usuario'),
            'id_especialidad' => Especialidades::where('nombre_especialidad', $request->json()->get('id_especialidad'))->value('id_especialidad'),
            'nombre_medico' => $request->json()->get('nombre_medico'),
            'email_medico' => $request->json()->get('email_medico'),
            'tel_medico' => $request->json()->get('tel_medico'),
            'tarifa' => $request->json()->get('tarifa')
        ]);

        return response()->json(compact('medico'), 201);
    
    }

    // Actualizar a Medicos
    public function edit(Request $request,$id){
    
        $validator = Validator::make($request->json()->all(), [
            'nombre_medico' => 'required|string',
            'email_medico' => 'required|string',
            'tel_medico' => 'required|string',
            'tarifa' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $medico = Medicos::where('id_usuario', $id)->first();

        $medico->nombre_medico = $request->json()->get('nombre_medico');
        $medico->email_medico = $request->json()->get('email_medico');
        $medico->tel_medico = $request->json()->get('tel_medico');
        $medico->tarifa = $request->json()->get('tarifa');

        $medico->save();

        return response()->json($medico);
    }

    //Eliminar medicos
    public function deleteMedico($id){
        $medico = Medicos::where('id_usuario', $id)->first();

        if($medico !== null){
            if($medico->delete()){
                $user = User::where('id_usuario', $id)->first();
                if($user !== null){
                    if($user->delete()){
                        return response()->json($medico);
                    }
                }
            }
        }
        
        return response()->json('Error');
    }

    public function getMedico($jvpm){
        $medico = Medicos::where('jvpm', $jvpm)->first();

        if($medico !== null){
            return response()->json($medico);
        }

        return response()->json('Error');
    }

}