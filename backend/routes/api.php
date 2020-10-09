<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Ruta para obtener toda la informacion de la tabla Users
Route::get('user/all', 'UserController@index');

//Rutas de autentificacion y creacion de usuarios
Route::post('user/create', 'UserController@store');
Route::post('user/login', 'UserController@login');
Route::get('user/auth', 'UserController@getAuthenticatedUser');

Route::middleware('auth:api')->get('/user', function(Request $request){
    return $request->user();
});

//Ruta para actualizar un usuario
Route::put('user/update/{id}', 'UserController@update');

//Medicos
//show
Route::get('index/medicos','MedicosController@index');
//insert especialedades'
Route::post('create/especialidad','MedicosController@AddEspecialidades');
//obtener datos especialedades'
Route::post('obtener/especialidad','MedicosController@GetEspecialidad');
//insert medicos
Route::post('create/medico','MedicosController@AddMedicos');
//update a medicos
Route::put('Medicos/edit/{id_usuario}','MedicosController@edit');
//delete a medicos
Route::delete('delete/medico/{id_usuario}','MedicosController@deleteMedico');
//get medico by id
Route::get('get/medico/{jvpm}','MedicosController@getMedico');

//Pacientes
//show
Route::get('index/paciente','PacienteController@index');
//show one patient
Route::get('get/paciente/{id_paciente}','PacienteController@getPatient');
Route::get('by/paciente/{id_paciente}','PacienteController@getPatientP');
//insert aseguradora
Route::post('create/aseguradora','PacienteController@AddAseguradora');
//get aseguradora
Route::post('details/aseguradora','PacienteController@GetAseguradora');
//insert a paciente
Route::post('create/paciente','PacienteController@AddPaciente');
//update a paciente
Route::put('edit/paciente/{id_paciente}','PacienteController@editPaciente');
//delete a paciente
Route::delete('delete/paciente/{id_paciente}','PacienteController@deletePaciente');
Route::get('get/paciente/name/{name}','PacienteController@getNamePatient');

//Consultas
Route::post('create/consulta', 'ConsultaController@createConsulta');
Route::get('index/consultas', 'ConsultaController@index');

//Citas
Route::post('create/citas', 'CitasController@AddCitas');
Route::get('index/citas', 'CitasController@index');

