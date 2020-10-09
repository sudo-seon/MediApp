<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consulta extends Model{

    protected $table = "consultas";
    protected $primaryKey = 'id_consulta';
    protected $fillable = ['fecha_consulta', 'id_paciente', 'jvpm', 'rx', 'examen', 'diagnostico', 'receta', 'fprox_consulta'];
    public $timestamps = false;
}