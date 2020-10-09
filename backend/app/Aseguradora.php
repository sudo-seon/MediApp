<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aseguradora extends Model
{
    protected $table = "aseguradoras";
    protected $primaryKey="id_aseguradora";
    protected $fillable = ["nombre_aseguradora","email_aseguradora","direccion_aseguradora","tel_aseguradora"];

    public function patients(){
        return $this->hasMany(Paciente::class);
    }

}
