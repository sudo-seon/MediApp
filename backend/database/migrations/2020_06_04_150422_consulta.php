<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Consulta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultas', function (Blueprint $table) {
            $table->bigIncrements('id_consulta');
            $table->date('fecha_consulta');
            $table->unsignedBigInteger('id_paciente'); //Relación
            $table->string('jvpm'); //Relación
            $table->text('rx');
            $table->text('examen');
            $table->text('diagnostico');
            $table->text('receta');
            $table->date('fprox_consulta'); //Fecha proxima consulta

            $table->foreign('id_paciente')
            ->references('id_paciente')->on('pacientes')->index('paciente_id_fkconsul');

            $table->foreign('jvpm')
            ->references('jvpm')->on('medicos')->index('jvpm_fkconsul');
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
