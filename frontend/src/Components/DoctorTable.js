import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Swal from 'sweetalert2';
import {DoctorUpdate} from './DoctorUpdateForm';

class DoctorTable extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            doctorData: [],
            modalState: false,
            getDoctor: [],
            table: false
        }
    }

    componentDidMount() {
        const getDoctors = async () => {
            const res = await fetch('http://localhost:8000/api/index/medicos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            this.setState({
                doctorData: data
            });
        }
        getDoctors();
    }

    render() {

        const DeleteDoctor = (id) => {
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
                    const request = await fetch('http://localhost:8000/api/delete/medico/' + id, {
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
                            text: 'Doctor: ' + response.nombre_medico + ' was deleted.',
                            showCloseButton: true,
                            showConfirmButton: true,
                            focusCancel: false,
                            focusConfirm: false,
                            timer: 5000
                          }).then( async () => {
                            const res = await fetch('http://localhost:8000/api/index/medicos', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const data = await res.json();
                            this.setState({
                                doctorData: data
                            });
                          })
                    }

                }else{
                    
                }
            });
        }

        const manageState = (data) => {
            this.setState({
                modalState: !this.state.modalState,
                getDoctor: data
            });

            this.setState({
                table: !this.state.table
            });
        }

        const columns = [
            { Header: "JVPM", accessor: "jvpm", width: 100, maxwidth: 100, minwidth: 100},
            { Header: "Name ", accessor: "nombre_medico" },
            { Header: "Email", accessor: "email_medico" },
            { Header: "Specialty", accessor: "id_especialidad", width: 100, maxwidth: 100, minwidth: 100 },
            { Header: "Phone", accessor: "tel_medico", width: 90, maxwidth: 90, minwidth: 90 },
            { Header: "Payment", accessor: "tarifa", width: 100, maxwidth: 100, minwidth: 100 },
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
            },
            {
                Header: "Delete", 
                Cell: props => { 
                    return(
                        <button className="btn btn-block" style={{backgroundColor: "#FF4B2B", border: "1px solid #FF4B2B", color: "#FFFFFF"}} onClick={() => DeleteDoctor(props.original.id_usuario)}>Delete</button>
                    )
                }, 
                width: 100, 
                maxwidth: 100, 
                minwidth: 100 
            }
        ]

        return (
            <div id="doctorTable">
                <ReactTable
                    columns={columns}
                    data={this.state.doctorData}
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
                                    <h2  className="ml-4 mt-3" style={{color:"#22c39f", fontWeight:"bold"}}>Update Doctor</h2>
                                    <p className="ml-4">Insert doctor data to change.</p>
                                </div>
                                <div className="col-md-1">
                                    <button className="ml-4 ghost" style={{padding: "8px 40px", borderColor: "#FF4B2B"}} onClick={manageState}><i style={{color: "#FF4B2B", marginLeft: "-3px"}} className="icon ion-md-close"/></button>  
                                </div>
                            </div>
                            {
                                this.state.table &&
                                <DoctorUpdate props={this.state.getDoctor}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default DoctorTable;