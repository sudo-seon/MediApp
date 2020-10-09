import React, { useState } from 'react';
import Swal from 'sweetalert2';

export const DoctorUpdate = (doctor) => {

    var [name, setName] = useState(doctor.props.nombre_medico);
    var [email, setEmail] = useState(doctor.props.email_medico);
    var [phone, setPhone] = useState(doctor.props.tel_medico);
    var [payment, setPayment] = useState(doctor.props.tarifa);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = doctor.props.id_usuario;
        const updateUser = await fetch('http://localhost:8000/api/Medicos/edit/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "nombre_medico": name,
                "email_medico": email,
                "tel_medico": phone,
                "tarifa": payment
            })
        });
        const updateResponse = await updateUser.json();
        if(updateResponse !== "Error" || updateResponse !== null){
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: 'Doctor: ' + updateResponse.nombre_medico + ' was updated.',
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
                        <input type="text" placeholder={doctor.props.nombre_medico} id="txtName" onChange={e => setName(e.target.value)} value={name} />
                    </div>
                    <div className="col-md-6">
                        <input className="mb-3" type="email" placeholder={doctor.props.email_medico} id="txtEmail" onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input type="number" placeholder={doctor.props.tel_medico} id="txtAddress" onChange={e => setPhone(e.target.value)} value={phone} />
                    </div>
                    <div className="col-md-6">
                        <input className="mb-3" type="number" placeholder={doctor.props.tarifa} id="txtPhone" onChange={e => setPayment(e.target.value)} value={payment} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button id="btnUpdate">Update</button>
                   </div>
                </div>
            </form>
        </div>
    )
}