<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Medico extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicos', function(Blueprint $table){
            $table->string('jvpm')->primary();
            $table->unsignedBigInteger('id_usuario'); //Relaciones
            $table->unsignedBigInteger('id_especialidad'); //Relaciones
            $table->string('nombre_medico', 50);
            $table->string('email_medico', 50);
            $table->string('tel_medico', 10);
            $table->float('tarifa', 40,2);

            $table->foreign('id_especialidad')
            ->references('id_especialidad')->on('especialidades')->index('esp_id_fkm');

            $table->foreign('id_usuario')
            ->references('id_usuario')->on('users')->index('user_id_fkm');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medicos');
    }
}
