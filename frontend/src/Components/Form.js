import React, { useState } from 'react';
import 'react-router-dom';
import '../register-style.css';
import Swal from 'sweetalert2'

const API = process.env.REACT_APP_API;

export const Form = () => {

    //Patient data
    const [pname, setPName] = useState('');
    const [pusername, setPUsername] = useState('');
    const [paddress, setPAddress] = useState('');
    const [pphone, setPPhone] = useState('');
    const [pdate, setPDate] = useState('');
    const [pemail, setPEmail] = useState('');

    //Patient data
    const [dname, setDName] = useState('');
    const [dusername, setDUsername] = useState('');
    const [dphone, setDPhone] = useState('');
    const [demail, setDEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [payment, setPayment] = useState('');
    const [jvpm, setJvpm] = useState('');

    //Both
    const password = '12345678';

    //Insurance data
    var [iname, setIName] = useState('');
    const [iaddress, setIAddress] = useState('');
    const [iphone, setIPhone] = useState('');
    const [iemail, setIEmail] = useState('');

    const cleanPatientForm = () => {
        document.getElementById('txt1').value = '';
        document.getElementById('txt2').value = '';
        document.getElementById('txt3').value = '';
        document.getElementById('txt4').value = '';
        document.getElementById('txt5').value = '';
        document.getElementById('txt6').value = '';
        document.getElementById('i1').value = '';
        document.getElementById('i2').value = '';
        document.getElementById('i3').value = '';
        document.getElementById('i4').value = '';
    }

    const cleanDoctorForm = () => {
        document.getElementById('d1').value = '';
        document.getElementById('d2').value = '';
        document.getElementById('d3').value = '';
        document.getElementById('d4').value = '';
        document.getElementById('d5').value = '';
        document.getElementById('d6').value = '';
        document.getElementById('d7').value = '';
    }


    const patientSubmit = async (e) => {

        e.preventDefault();

        //Falta validar que no hayan dos usuarios con el mismo username
        const user = await fetch(`${API}/api/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tipo_usuario": 'P',
                "username": pusername,
                "password": password
            })
        });
        const userData = await user.json();
        console.log(userData);

        const btnToggle = document.getElementById('toggle-btn');

        //Hacel falta solucionar el problema del usuario que no esta asegurado. Fixed CREO
        if (btnToggle.className === "toggle-btn active") {

            const aseguradoraVal = await fetch(`${API}/api/details/aseguradora`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombre_aseguradora": "uninsured"
                })
            });
            const valData = await aseguradoraVal.json();
            console.log(valData);

            if (valData.aseguradora !== null) {
                console.log('aseguradora existente');
                console.log(aseguradoraVal);
                iname = valData.aseguradora.nombre_aseguradora;
            } else{
                const insurance = await fetch(`${API}/api/create/aseguradora`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "nombre_aseguradora": 'uninsured',
                        "email_aseguradora": 'uninsured',
                        "direccion_aseguradora": 'uninsured',
                        "tel_aseguradora": 'uninsured'
                    })
                });
                const resul = await insurance.json();
                console.log(resul);
                iname = resul.nombre_aseguradora
            }

        } else {
            const aseguradoraVal = await fetch(`${API}/api/details/aseguradora`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombre_aseguradora": iname
                })
            });
            const valData = await aseguradoraVal.json();

            if (valData.aseguradora !== null) {
                console.log('aseguradora existente');
            } else {
                const insurance = await fetch(`${API}/api/create/aseguradora`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "nombre_aseguradora": iname,
                        "email_aseguradora": iemail,
                        "direccion_aseguradora": iaddress,
                        "tel_aseguradora": iphone
                    })
                });
                const AseguradoraData = await insurance.json();
                console.log(AseguradoraData);
            }
        }
        
        const patient = await fetch(`${API}/api/create/paciente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_usuario": userData.user.id_usuario,
                "nombre_paciente": pname,
                "email_paciente": pemail,
                "direccion_paciente": paddress,
                "tel_paciente": pphone,
                "fnac_paciente": pdate,
                "id_aseguradora": iname
            })
        });
        const patientData = await patient.json();
        console.log(patientData);

        if(patientData.paciente){
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: 'Patient: ' + patientData.paciente.nombre_paciente + ' was created.',
                showCloseButton: true,
                showConfirmButton: true,
                focusCancel: false,
                focusConfirm: false,
                timer: 5000
              }).then(() => {
                    cleanPatientForm();
              })
        }
    }

    const patientBlur = async (e) => {
        e.preventDefault();

        const aseguradoraVal = await fetch(`${API}/api/details/aseguradora`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre_aseguradora": iname
            })
        });
        const valData = await aseguradoraVal.json();

        if(valData.aseguradora){
            document.getElementById('i2').value = valData.aseguradora.direccion_aseguradora;
            document.getElementById('i3').value = valData.aseguradora.tel_aseguradora;
            document.getElementById('i4').value = valData.aseguradora.email_aseguradora;
        }else if(valData === null){

        }
    }

    const doctorSubmit = async (e) => {

        e.preventDefault();

        const user = await fetch(`${API}/api/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tipo_usuario": 'M',
                "username": dusername,
                "password": password
            })
        });
        const userData = await user.json();
        console.log(userData);

        const espVal = await fetch(`${API}/api/obtener/especialidad`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre_especialidad": specialty
            })
        });
        const valData = await espVal.json();

        if (valData.especialidad !== null) {
            console.log('especialidad existente');
        } else {
            const especialidad = await fetch(`${API}/api/create/especialidad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombre_especialidad": specialty
                })
            });
            const EspData = await especialidad.json();
            console.log(EspData);
        }

        const doctor = await fetch(`${API}/api/create/medico`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jvpm": jvpm,
                "id_usuario": userData.user.id_usuario,
                "id_especialidad": specialty,
                "nombre_medico": dname,
                "email_medico": demail,
                "tel_medico": dphone,
                "tarifa": payment
            })
        });
        const docData = await doctor.json();
        console.log(docData);

        if(docData.medico){
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: 'Doctor: ' + docData.medico.nombre_medico + ' was created.',
                showCloseButton: true,
                showConfirmButton: true,
                focusCancel: false,
                focusConfirm: false,
                timer: 5000
              }).then(() => {
                    cleanDoctorForm();
              })
        }

    }

    return(
        <div className="ctn" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={doctorSubmit} autoComplete="off">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" placeholder="Doctor's Name" required onChange={e => setDName(e.target.value)} value={dname} id="d1" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="Username" className="mb-3" required onChange={e => setDUsername(e.target.value)} value={dusername} id="d2" />
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="email" placeholder="Email" required onChange={e => setDEmail(e.target.value)} value={demail} id="d3" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="Specialty" className="mb-3" required onChange={e => setSpecialty(e.target.value)} value={specialty} id="d4" />
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="number" placeholder="Phone" required onChange={e => setDPhone(e.target.value)} value={dphone} id="d5" />
                        </div>
                        <div className="col-md-6">
                            <input type="number" placeholder="Payment" className="mb-3" required onChange={e => setPayment(e.target.value)} value={payment} id="d6" />
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="number" placeholder="JVPM" className="mb-4" required onChange={e => setJvpm(e.target.value)} value={jvpm} id="d7" />
                        </div>
                        <div className="col-md-6"/>
                    </div>
                    <button type="submit" className="ml-4" style={{backgroundColor: "#02e0c3", border: "1px solid #02e0c3"}}>Register Doctor</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={patientSubmit} autoComplete="off" id="patientForm">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" placeholder="Patient's Name" className="ml-4 mb-3" onChange={e => setPName(e.target.value)} value={pname} id="txt1" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="Username" className="mb-3" onChange={e => setPUsername(e.target.value)} value={pusername} id="txt2" required/>
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" placeholder="Address" className="ml-4 mb-3" onChange={e => setPAddress(e.target.value)} value={paddress} id="txt3" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="number" placeholder="Phone" className="mb-3" onChange={e=> setPPhone(e.target.value)} value={pphone} id="txt4" required/>
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="date" placeholder="Birth Date" className="ml-4 mb-3" onChange={e => setPDate(e.target.value)} value={pdate} id="txt5" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="email" placeholder="Email" className="mb-3" onChange={e => setPEmail(e.target.value)} value={pemail} id="txt6" required/>
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" placeholder="Insurance Name" className="ml-4 mb-3" id="i1" onChange={e => setIName(e.target.value)} value={iname} onBlur={patientBlur} required/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="Insurence Address" className="mb-3" id="i2" onChange={e => setIAddress(e.target.value)} value={iaddress} required/>
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="number" placeholder="Insurance Phone" className="ml-4 mb-3" id="i3" onChange={e => setIPhone(e.target.value)} value={iphone} required/>
                        </div>
                        <div className="col-md-6">
                            <input type="emai" placeholder="Insurence Email" className="mb-3" id="i4" onChange={e => setIEmail(e.target.value)} value={iemail} required/>
                        </div>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <p style={{marginLeft: '-35px'}}>Uninsured:</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <div className="toggle-btn" id="toggle-btn">
                                    <div className="inner-circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 offset-md-2">
                            <button type="submit" className="btn-block" style={{backgroundColor: "#02e0c3", border: "1px solid #02e0c3"}}>Register Patient</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 style={{color: 'white'}}>Doctor Form</h1>
                        <p>Enter the doctor's personal data to add it to the record.</p>
                        <button className="ghost" id="signIn">Patient</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 style={{color: 'white'}}>Patient Form</h1>
                        <p>Enter the patient's personal data to add to the record.</p>
                        <button className="ghost" id="signUp">Doctor</button>
                    </div>
                </div>
            </div>
        </div>
    );
}