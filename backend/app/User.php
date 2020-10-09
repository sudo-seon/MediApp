<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticable implements JWTSubject
{
    protected $table = "users";
    protected $primaryKey = 'id_usuario';
    protected $fillable = ["tipo_usuario", "username", "password"];
    public $timestamps = false;

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }
}
