import React, { useState } from 'react';
import Swal from 'sweetalert2';

export const PatientUpdate = (patient) => {

    var [name, setName] = useState(patient.props.nombre_paciente);
    var [email, setEmail] = useState(patient.props.email_paciente);
    var [address, setAddress] = useState(patient.props.direccion_paciente);
    var [phone, setPhone] = useState(patient.props.tel_paciente);
    var [birth, setBirth] = useState(patient.props.fnac_paciente);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = patient.props.id_usuario;
        const updateUser = await fetch('http://localhost:8000/api/edit/paciente/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "nombre_paciente": name,
                "email_paciente": email,
                "direccion_paciente": address,
                "tel_paciente": phone,
                "fnac_paciente": birth
            })
        });
        const updateResponse = await updateUser.json();
        if(updateResponse !== "Error" || updateResponse !== null){
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: 'Patient: ' + updateResponse.nombre_paciente + ' was updated.',
                showCloseButton: true,
                showConfirmButton: true,
                focusCancel: false,
                focusConfirm: false,
                timer: 5000
            });
            console.log(updateResponse);
        }
    }

    return(
        <div>
            <form autoComplete="off" className="form-group ml-4 mt-4" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" placeholder={patient.props.nombre_paciente} id="txtName" onChange={e => setName(e.target.value)} value={name}/>
                    </div>
                    <div className="col-md-6">
                        <input className="mb-3" type="email" placeholder={patient.props.email_paciente} id="txtEmail" onChange={e => setEmail(e.target.value)} value={email}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" placeholder={patient.props.direccion_paciente} id="txtAddress" onChange={e => setAddress(e.target.value)} value={address}/>
                    </div>
                    <div className="col-md-6">
                        <input className="mb-3" type="number" placeholder={patient.props.tel_paciente} id="txtPhone" onChange={e => setPhone(e.target.value)} value={phone}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input className="mb-3" type="date" placeholder={patient.props.fnac_paciente} id="txtBirth" onChange={e => setBirth(e.target.value)} value={birth}/>
                    </div>
                    <div className="col-md-6">
                        <button id="btnUpdate">Update</button>
                   </div>
                </div>
            </form>
        </div>
    )
}