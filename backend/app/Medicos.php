<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicos extends Model
{
    //Tabla de Medicos
    protected $table = "medicos";
    protected $primaryKey="jvpm";
    protected $fillable = ["jvpm","id_usuario","id_especialidad","nombre_medico",
    "email_medico","tel_medico","tarifa"];
    public $timestamps = false;
}
