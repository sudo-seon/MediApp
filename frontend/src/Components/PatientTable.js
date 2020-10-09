import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import {PatientUpdate} from './PatientUpdateForm';

class PatientTable extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            patientData: [],
            modalState: false,
            getPatient: [],
            table: false
        }
    }

    componentDidMount() {
        const getPatients = async () => {
            const res = await fetch('http://localhost:8000/api/index/paciente', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            this.setState({
                patientData: data
            });
        }
        getPatients();
    }

    render() {

        const manageState = (data) => {
            this.setState({
                modalState: !this.state.modalState,
                getPatient: data
            });

            this.setState({
                table: !this.state.table
            });
        }

        /*const DeletePatient = (id) => {
            console.log("ID PACIENTE: ", id);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#02e0c3',
                cancelButtonColor: '#FF4B2B',
                confirmButtonText: 'Yes, delete it!'
            }).then( async (resul) => {
                if(resul.value){
                    const request = await fetch('http://localhost:8000/api/delete/paciente/' + id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const response = await request.json();

                    if(response !== "Error" || response !== null){
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully',
                            text: 'Patient: ' + response.nombre_paciente + ' was deleted.',
                            showCloseButton: true,
                            showConfirmButton: true,
                            focusCancel: false,
                            focusConfirm: false,
                            timer: 5000
                          }).then( async () => {
                            const res = await fetch('http://localhost:8000/api/index/paciente', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const data = await res.json();
                            this.setState({
                                patientData: data
                            });
                          })
                    }

                }else{
                    
                }
            });
        }*/

        const columns = [
            { Header: "#", accessor: "id_paciente", width: 50, maxwidth: 50, minwidth: 50},
            { Header: "Name ", accessor: "nombre_paciente" },
            { Header: "Email", accessor: "email_paciente" },
            { Header: "Address", accessor: "direccion_paciente" },
            { Header: "Phone", accessor: "tel_paciente", width: 90, maxwidth: 90, minwidth: 90 },
            { Header: "Birthday", accessor: "fnac_paciente", width: 100, maxwidth: 100, minwidth: 100 },
            {
                Header: "Edit", 
                Cell: props => { 
                    return(
                        <button className="btn btn-block" style={{backgroundColor: "#02e0c3", border: "1px solid #02e0c3", color: "#FFFFFF"}} onClick={() => manageState(props.original)}>Edit</button>
                    )
                }, 
                width: 100, 
                maxwidth: 100, 
                minwidth: 100 
            }/*,
            {
                Header: "Delete", 
                Cell: props => { 
                    return(
                        <button className="btn btn-block" style={{backgroundColor: "#FF4B2B", border: "1px solid #FF4B2B", color: "#FFFFFF"}} onClick={() => DeletePatient(props.original.id_usuario)}>Delete</button>
                    )
                }, 
                width: 100, 
                maxwidth: 100, 
                minwidth: 100 
            }*/
        ]

        return (
            <div id="PatientTable">
                <ReactTable
                    columns={columns}
                    data={this.state.patientData}
                    filterable
                    defaultPageSize={5}
                    showPaginationTop
                    noDataText={"Loading Data..."}
                />
                <div className={`modalBackground modalShowing-${this.state.modalState}`}>
                    <div className="modalInner">
                        <div className="modalForm">
                            <div className="row">
                                <div className="col-md-9">
                                    <h2  className="ml-4 mt-3" style={{color:"#22c39f", fontWeight:"bold"}}>Update Patient</h2>
                                    <p className="ml-4">Insert patient data to change.</p>
                                </div>
                                <div className="col-md-1">
                                    <button className="ml-4 ghost" style={{padding: "8px 40px", borderColor: "#FF4B2B"}} onClick={manageState}><i style={{color: "#FF4B2B", marginLeft: "-3px"}} className="icon ion-md-close"/></button>  
                                </div>
                            </div>
                            {
                                this.state.table &&
                                <PatientUpdate props={this.state.getPatient}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default PatientTable;