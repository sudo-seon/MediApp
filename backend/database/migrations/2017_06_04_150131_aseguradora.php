<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Aseguradora extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aseguradoras', function (Blueprint $table) {
            $table->bigIncrements('id_aseguradora');
            $table->string('nombre_aseguradora', 50);
            $table->string('email_aseguradora', 50);
            $table->string('direccion_aseguradora', 100);
            $table->string('tel_aseguradora', 10);
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
