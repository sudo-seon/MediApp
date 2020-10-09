import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { css } from 'jquery';

const ConsultaForm = () => {

    const [rx, setRx] = useState('');
    const [exam, setExam] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [receta, setReceta] = useState('');
    var [date, setDate] = useState('');
    const [jvpm, setJvpm] = useState('');
    const [name, setName] = useState('');

    const valDate = new Date();

    let dayV = valDate.getDate();
    let month = valDate.getMonth() + 1;
    let year = valDate.getFullYear();

    var fnow = null;
    var nextDate = true;

    if(month < 10){
        fnow = `${year}-0${month}-${dayV}`;
      }else{
        fnow = `${year}-${month}-${dayV}`;
      }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(date === ""){
            date = fnow;
            nextDate = false;
        }
        console.log(date);

        const day = date.split('-');

        switch (nextDate) {
            case true:
                if(day[2] <= valDate.getDate() || day[1] < valDate.getMonth() || day[0] < valDate.getUTCFullYear()){
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Date!',
                        showCloseButton: true,
                        focusCancel: false,
                        focusConfirm: false,
                        showConfirmButton: false,
                        text: 'Please insert a valid date.',
                        timer: 5000
                    });
                }else{
                    const PatientReq = await fetch('http://localhost:8000/api/get/paciente/name/' + name, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const PatientData = await PatientReq.json();
                    console.log(PatientData);
        
                    const DoctorReq = await fetch('http://localhost:8000/api/get/medico/' + jvpm, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const DoctorData = await DoctorReq.json();
                    console.log(DoctorData);
        
                    if(DoctorData !== 'Error' && PatientData !== 'Error'){
                        const consultaReq = await fetch('http://localhost:8000/api/create/consulta', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'fecha_consulta': fnow,
                                'id_paciente': PatientData.id_paciente,
                                'jvpm': jvpm,
                                'rx': rx,
                                'examen': exam,
                                'diagnostico': diagnosis,
                                'receta': receta,
                                'fprox_consulta': date
                            })
                        });
                        const ConsulData = await consultaReq.json();
                        if(ConsulData !== null){
                            Swal.fire({
                                icon: 'success',
                                title: 'Consultation Created',
                                focusCancel: false,
                                focusConfirm: false,
                                showConfirmButton: true,
                                text: 'The consultation has been successfully created',
                                timer: 5000
                            }).then(() => {
                                document.getElementById('txtDate').value = "";
                                document.getElementById('txtJvpm').value = "";
                                document.getElementById('txtName').value = "";
                                document.getElementById('txtRx').value = "";
                                document.getElementById('txtExam').value = "";
                                document.getElementById('txtDiagnosis').value = "";
                                document.getElementById('txtReceta').value = "";
                            });
                        }
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Data!',
                            showCloseButton: true,
                            focusCancel: false,
                            focusConfirm: false,
                            showConfirmButton: false,
                            text: 'Invalid jvpm or patient name.',
                            timer: 5000
                        });
                    }
                }
            break;

            case false:
                const PatientReq = await fetch('http://localhost:8000/api/get/paciente/name/' + name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const PatientData = await PatientReq.json();
                console.log(PatientData);
    
                const DoctorReq = await fetch('http://localhost:8000/api/get/medico/' + jvpm, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const DoctorData = await DoctorReq.json();
                console.log(DoctorData);
    
                if(DoctorData !== 'Error' && PatientData !== 'Error'){
                    const consultaReq = await fetch('http://localhost:8000/api/create/consulta', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'fecha_consulta': fnow,
                            'id_paciente': PatientData.id_paciente,
                            'jvpm': jvpm,
                            'rx': rx,
                            'examen': exam,
                            'diagnostico': diagnosis,
                            'receta': receta,
                            'fprox_consulta': date
                        })
                    });
                    const ConsulData = await consultaReq.json();
                    if(ConsulData !== null){
                        Swal.fire({
                            icon: 'success',
                            title: 'Consultation Created',
                            focusCancel: false,
                            focusConfirm: false,
                            showConfirmButton: true,
                            text: 'The consultation has been successfully created',
                            timer: 5000
                        }).then(() => {
                            document.getElementById('txtDate').value = "";
                            document.getElementById('txtJvpm').value = "";
                            document.getElementById('txtName').value = "";
                            document.getElementById('txtRx').value = "";
                            document.getElementById('txtExam').value = "";
                            document.getElementById('txtDiagnosis').value = "";
                            document.getElementById('txtReceta').value = "";
                        });
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Data!',
                        showCloseButton: true,
                        focusCancel: false,
                        focusConfirm: false,
                        showConfirmButton: false,
                        text: 'Invalid jvpm or patient name.',
                        timer: 5000
                    });
                }
            break;
        
            default:
                console.log('Error');
            break;
        }
    }

    return(
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea
                            id="txtRx"
                            className="form-control" 
                            cols="30" 
                            rows="10" 
                            placeholder="Physical Examination"
                            onChange={e => setRx(e.target.value)}
                            value={rx}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <textarea
                            id="txtExam"
                            className="form-control mb-4" 
                            cols="30" 
                            rows="10" 
                            placeholder="Medical Exams"
                            onChange={e => setExam(e.target.value)}
                            value={exam}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea 
                            id="txtDiagnosis"
                            className="form-control" 
                            cols="30" 
                            rows="10" 
                            placeholder="Diagnosis"
                            onChange={e => setDiagnosis(e.target.value)}
                            value={diagnosis}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <textarea 
                            id="txtReceta"
                            className="form-control mb-4" 
                            cols="30" 
                            rows="10" 
                            placeholder="Prescription"
                            onChange={e => setReceta(e.target.value)}
                            value={receta}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Date of Next Appointment:</label>
                                        <input 
                                            id="txtDate"
                                            type="date"
                                            className="form-control" 
                                            placeholder="Date of Next Appointment"
                                            onChange={e => setDate(e.target.value)}
                                            value={date}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Doctor JVPM:</label>
                                        <input 
                                            id="txtJvpm"
                                            type="number"
                                            className="form-control mb-4" 
                                            placeholder="JVPM"
                                            onChange={e => setJvpm(e.target.value)}
                                            value={jvpm}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input 
                                            id="txtName"
                                            type="text" 
                                            className="form-control mb-4" 
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                            placeholder="Patient Name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 offset-md-2">                               
                                        <button type="submit" className="btn-block ml-4">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ConsultaForm;