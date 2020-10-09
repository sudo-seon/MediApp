<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{

    protected $table = "pacientes";
    protected $primaryKey="id_paciente";
    protected $fillable = ["id_usuario","nombre_paciente","email_paciente",	"direccion_paciente","tel_paciente","fnac_paciente","id_aseguradora"];
    public $timestamps = false;

    public function aseguradora(){
        return $this->belongsTo(Aseguradora::class);
    }

}
