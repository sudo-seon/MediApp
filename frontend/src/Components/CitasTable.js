import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Redirect } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Sidebar } from './Sidebar';

var citasRes = null;

class CitasTable extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            citasData: [],
            patientData: []
        }
    }

    componentDidMount() {

        if(localStorage.usertoken){

            //Sidebar Toggle Button Script
            document.getElementById('menu-toggle').addEventListener('click', function (e) {
                e.preventDefault();
                const nav = document.querySelector('#content-wrapper');
                nav.classList.toggle('toggled');
            });

            const getCitas = async () => {
                const citasReq = await fetch('http://localhost:8000/api/index/citas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'appliation/json'
                    }
                });
                citasRes = await citasReq.json();
                this.setState({
                    citasData: citasRes
                });
            }

            getCitas();

        }

    }

    render() {

        const columns = [
            { Header: "#", accessor: "id_cita", width: 50, maxwidth: 50, minwidth: 50 },
            { Header: "Appointment Date", accessor: "fecha_cita", width: 150, maxwidth: 150, minwidth: 150 },
            { Header: "JVPM", accessor: "jvpm", width: 100, maxwidth: 100, minwidth: 100 },
            { Header: "Appointment Time", accessor: "hora_cita", width: 150, maxwidth: 150, minwidth: 150 },
            { Header: "Patient", accessor: "id_paciente", width: 90, maxwidth: 90, minwidth: 90 }
        ]

        return (
            <div>
                {
                    localStorage.usertoken &&
                    <div className="d-flex" id="content-wrapper">
                    {/* Sidebar */}
                    <Sidebar/>

                    {/* Page Content */}
                    <div id="page-content-wrapper" className="w-100 bg-light-blue">
                    <Navigation/>
                    <div id="content" className="container-fluid p-5">
                        <section className="py-3">
                        <ReactTable
                            columns={columns}
                            data={this.state.citasData}
                            defaultPageSize={5}
                            showPaginationTop
                            noDataText={"Loading Data..."}
                        />
                        </section>
                    </div>
                    </div>
                    {/* End Page Content */}
                    </div>
                }
                {
                    !localStorage.usertoken &&
                        <Redirect to='/login' />
                }
            </div>
        )
    }
}

export default CitasTable;