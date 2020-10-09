import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Redirect } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Sidebar } from './Sidebar';
import ExportToExcel from "./ExportToExcel"

class ConsultasTable extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            consultasData: []
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
                const consultaReq = await fetch('http://localhost:8000/api/index/consultas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'appliation/json'
                    }
                });
                const consultaRes = await consultaReq.json();
                console.log(consultaRes);
                this.setState({
                    consultasData: consultaRes
                });
            }

            getCitas();

        }

    }

    render() {

        const columns = [
            { Header: "#", accessor: "id_consulta", width: 50, maxwidth: 50, minwidth: 50 },
            { Header: "Date", accessor: "fecha_consulta", width: 100, maxwidth: 100, minwidth: 100 },
            { Header: "Patient", accessor: "id_paciente", width: 60, maxwidth: 60, minwidth: 60 },
            { Header: "JVPM", accessor: "jvpm", width: 100, maxwidth: 100, minwidth: 100 },
            { Header: "Physical Exam", accessor: "rx", width: 150, maxwidth: 150, minwidth: 150 },
            { Header: "Previous Exams", accessor: "examen", width: 150, maxwidth: 150, minwidth: 150 },
            { Header: "Diagnosis", accessor: "diagnostico", width: 150, maxwidth: 150, minwidth: 150 },
            { Header: "Prescription", accessor: "receta", width: 150, maxwidth: 150, minwidth: 150 },
            { Header: "Next Date", accessor: "fprox_consulta", width: 100, maxwidth: 100, minwidth: 100 }
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
                                data={this.state.consultasData}
                                defaultPageSize={5}
                                showPaginationTop
                                noDataText={"Loading Data..."}
                            >
                            {(state, makeTable, instance) => {
                                this.reactTable = state.pageRows.map(modem => {return modem._original});
                                return(
                                    <div>
                                        { makeTable() }
                                        <ExportToExcel posts={this.reactTable}/>
                                    </div>
                                )
                            }}
                            </ReactTable>
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

export default ConsultasTable;