import React from 'react';
import 'react-router-dom';
import Swal from 'sweetalert2'

export const EditUserTable = (props) => {

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.value) {
                const request = await fetch('http://localhost:8000/api/delete/paciente/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'appliation/json'
                    }
                });
                const response = await request.json();
                console.log(response);
                if(response === null){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        showCloseButton: true,
                        showConfirmButton: false,
                        text: 'Sorry right now we are experiencing problems.',
                        timer: 5000
                    });
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully',
                        text: 'Patient: ' + response.nombre_paciente + ' was deleted.',
                        showCloseButton: true,
                        showConfirmButton: true,
                        focusCancel: false,
                        focusConfirm: false,
                        timer: 5000
                    });
                }
            }
          })
    }

    return(
        <div>
            <table className="table table-responsive" id="PatientTable">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id='tableBodyP'>
                    {
                        props.data.map(rows => (
                            <tr>
                                <td scope="row">{rows.id_paciente}</td>
                                <td>{rows.nombre_paciente}</td>
                                <td>{rows.email_paciente}</td>
                                <td>{rows.direccion_paciente}</td>
                                <td>{rows.tel_paciente}</td>
                                <td>{rows.fnac_paciente}</td>
                                <td><button style={{backgroundColor: "#02e0c3", border: "1px solid #02e0c3"}}>Edit</button></td>
                                <td><button onClick={() => deleteUser(rows.id_usuario)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}