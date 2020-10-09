<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Paciente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pacientes', function(Blueprint $table){
            $table->bigIncrements('id_paciente');
            $table->unsignedBigInteger('id_usuario'); //relaciones
            $table->string('nombre_paciente', 50); 
            $table->string('email_paciente', 50); 
            $table->string('direccion_paciente', 100);
            $table->string('tel_paciente', 10);
            $table->date('fnac_paciente'); //Fecha de nacimiento
            $table->unsignedBigInteger('id_aseguradora'); //relaciones

            $table->foreign('id_usuario')
            ->references('id_usuario')->on('users')->index('user_id_fkp');

            $table->foreign('id_aseguradora')
            ->references('id_aseguradora')->on('aseguradoras')->index('as_id_fkp');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
