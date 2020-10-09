import React, { useState } from 'react';
import Swal from 'sweetalert2'

const CitasForm = () => {

    const [date, setDate] = useState('');
    const [jvpm, setJvpm] = useState('');
    const [name, setName] = useState('');


    const valDate = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const day = date.split('-');
        const hora = day[2].split('T');
        if(hora[0] <= valDate.getDate() || day[1] < valDate.getMonth() || day[0] < valDate.getUTCFullYear()){
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

            if(DoctorData !== "Error" && PatientData !== "Error"){
                const citaReq = await fetch('http://localhost:8000/api/create/citas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'fecha_cita': date,
                        'jvpm': jvpm,
                        'id_paciente': PatientData.id_paciente,
                        'hora_cita': hora[1],
                        'status': 1
                    })
                });
                const citaData = await citaReq.json();
                if(citaData !== null){
                    Swal.fire({
                        icon: 'success',
                        title: 'Appointment Created',
                        focusCancel: false,
                        focusConfirm: false,
                        showConfirmButton: true,
                        text: 'The appointment was successfully scheduled.',
                        timer: 5000
                    }).then(() => {
                        document.getElementById('txtDate').value = "";
                        document.getElementById('txtJvpm').value = "";
                        document.getElementById('txtName').value = "";
                    });
                }
            }
        }
    }

    return(
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="ml-4 card-body">
                        <h2 className="mb-3 text-dark">Create Appointment</h2>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-8">
                                        <input
                                            id="txtDate"
                                            type="datetime-local" 
                                            className="form-control" 
                                            onChange={e => setDate(e.target.value)}
                                            value={date}
                                            placeholder="Appointment Date"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            id="txtJvpm"
                                            type="text" 
                                            className="form-control mb-4" 
                                            onChange={e => setJvpm(e.target.value)}
                                            value={jvpm}
                                            placeholder="JVPM"
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
                                    <div className="col-md-12">
                                        <button type="submit" className="btn-block">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CitasForm;