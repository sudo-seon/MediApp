<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Especialidades extends Model
{
    //Tabla de especialidades
    protected $table = "especialidades";
    protected $PrimaryKey = "id_especialidad";
    protected $fillable = ["nombre_especialidad"];
}
