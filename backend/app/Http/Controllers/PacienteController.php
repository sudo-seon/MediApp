<?php
namespace App\Http\Controllers;

use App\Paciente;
use App\User;
use App\Aseguradora;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PacienteController extends Controller
{
    //mostrar
    public function index(Request $request){
        return Paciente::all();
       // return Aseguradora::all();
    }

    public function getPatient($id){
        $paciente = Paciente::where('id_usuario', $id)->first();
        return response()->json($paciente);
    }

    public function getPatientP($id){
        $paciente = Paciente::where('id_paciente', $id)->first();
        return response()->json($paciente);
    }

    //Agregar a tabla Aseguradora 
    public function AddAseguradora(Request $request){
        
        $paciente=request()->all();
        Aseguradora::insert($paciente);

        return response()->json($paciente);
    
    }

    //Obtener datos de la tabla Aseguradora 
    public function GetAseguradora(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'nombre_aseguradora' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $aseguradora = Aseguradora::select()->where('nombre_aseguradora', $request->json()->get('nombre_aseguradora'))->first();

        return response()->json(compact('aseguradora'), 201);
    
    }
 
    //Agrega a tabla Paciente 
    public function AddPaciente(Request $request){
        
        $validator = Validator::make($request->json()->all(), [
            'id_usuario' => 'required',
            'nombre_paciente' => 'required|string',
            'email_paciente' => 'required|string',
            'direccion_paciente' => 'required|string',
            'tel_paciente' => 'required|string',
            'fnac_paciente' => 'required',
            'id_aseguradora' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $paciente = Paciente::create([
            'id_usuario' => $request->json()->get('id_usuario'),
            'nombre_paciente' => $request->json()->get('nombre_paciente'),
            'email_paciente' => $request->json()->get('email_paciente'),
            'direccion_paciente' => $request->json()->get('direccion_paciente'),
            'tel_paciente' => $request->json()->get('tel_paciente'),
            'fnac_paciente' => $request->json()->get('fnac_paciente'),
            'id_aseguradora' => Aseguradora::where('nombre_aseguradora', $request->json()->get('id_aseguradora'))->value('id_aseguradora')
        ]);

        return response()->json(compact('paciente'), 201);
    
    }

    // Actualizar a Paciente 
    public function editPaciente(Request $request, $id){

        $validator = Validator::make($request->json()->all(), [
            'nombre_paciente' => 'required|string',
            'email_paciente' => 'required|string',
            'direccion_paciente' => 'required|string',
            'tel_paciente' => 'required|string',
            'fnac_paciente' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $paciente = Paciente::where('id_usuario', $id)->first();

        $paciente->nombre_paciente = $request->json()->get('nombre_paciente');
        $paciente->email_paciente = $request->json()->get('email_paciente');
        $paciente->direccion_paciente = $request->json()->get('direccion_paciente');
        $paciente->tel_paciente = $request->json()->get('tel_paciente');
        $paciente->fnac_paciente = $request->json()->get('fnac_paciente');

        $paciente->save();

        return response()->json($paciente);
        
    }

     //Eliminar paciente
    public function deletePaciente($id){

        $paciente = Paciente::where('id_usuario', $id)->first();

        if($paciente !== null){
            if($paciente->delete()){
                $user = User::where('id_usuario', $id)->first();
                if($user !== null){
                    if($user->delete()){
                        return response()->json($paciente);
                    }
                }
            }
        }
        
        return response()->json('Error');
    }

    public function getNamePatient($name){
        $paciente = Paciente::where('nombre_paciente', $name)->first();

        if($paciente !== null){
            return response()->json($paciente);
        }

        return response()->json('Error');
    }

}
