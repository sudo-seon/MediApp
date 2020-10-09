<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Cita extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('citas', function (Blueprint $table) {
            $table->bigIncrements('id_cita');
            $table->date('fecha_cita');
            $table->string('jvpm'); //Relación
            $table->unsignedBigInteger('id_paciente'); //Relación
            $table->time('hora_cita');
            $table->string('status', 1);

            $table->foreign('id_paciente')
            ->references('id_paciente')->on('pacientes')->index('paciente_id_fkc');

            $table->foreign('jvpm')
            ->references('jvpm')->on('medicos')->index('jvpm_fkc');
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
