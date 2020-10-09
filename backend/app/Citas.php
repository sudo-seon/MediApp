<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Citas extends Model
{
    protected $table = "citas";
    protected $primaryKey = 'id_cita';
    protected $fillable = ['fecha_cita', 'jvpm', 'id_paciente', 'hora_cita', 'status'];
    public $timestamps = false;
}
