<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Facades\JWTException;
use Tymon\JWTAuth\Facades\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{

    public function index(){
        return User::all();
    }

    public function store(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'tipo_usuario' => 'required|string|max:1',
            'username' => 'required|string|max:30',
            'password' => 'required|string|min:6|max:20'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'tipo_usuario' => $request->json()->get('tipo_usuario'),
            'username' => $request->json()->get('username'),
            'password' => Hash::make($request->json()->get('password'))
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function login(Request $request){

        $credentials = $request->json()->all();
        
        try {
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json(['Error' => 'invalid user'], 418);
            }
        }catch (JWTException $e) {
            return response()->json(['Error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser(){

        try {
            if(!$user = JWTAuth::parseToken()->authenticate()){
                return resposne()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exception\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exception\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exception\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function update(Request $request, $id){

        $user = User::find($id);
        $user->tipo_usuario = $request->input('tipo_usuario');
        $user->username = $request->input('username');
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return $user;
    }
}
