import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DoctorTable from './DoctorTable'
import { Navigation } from './Navigation'
import { Sidebar } from './Sidebar'
import PatientTable from './PatientTable';
import 'bootstrap/dist/js/bootstrap.min.js'
import '../index.css'
import '../modal-style.css';

class EditUser extends Component {
    
    constructor() {
        super();
        this.state = {
            fillData: [],
            doctorData: []
        }
    }

    componentDidMount() {

        if(localStorage.usertoken){

            const doctorTable = document.getElementById('doctorTable');
            doctorTable.style.display = "none";

            //Sidebar Toggle Button Script
            document.getElementById('menu-toggle').addEventListener('click', function (e) {
                e.preventDefault();
                const nav = document.querySelector('#content-wrapper');
                nav.classList.toggle('toggled');
            });

            //Doctor Table Toggle Button Script
            document.getElementById('toggle-btn').addEventListener('click', function (e) {
                e.preventDefault();
                const btnToggle = document.getElementById('toggle-btn');
                btnToggle.classList.toggle('active');

                if(btnToggle.className === "toggle-btn active"){
                    const PatientTable = document.getElementById('PatientTable');
                    PatientTable.style.display = 'none';
                    doctorTable.style.display = "inline";
                }else{
                    const PatientTable = document.getElementById('PatientTable');
                    PatientTable.style.display = 'inline';
                    doctorTable.style.display = "none";
                }

            });

        }
    }

    render() {

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
                                {/* Users Table */}
                                <div className="row">
                                    <div className="col-md-2">
                                        <p className="mr-1">Dotor Table:</p>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="toggle-btn" id="toggle-btn">
                                            <div className="inner-circle"/>
                                        </div>
                                    </div>
                                </div>
                                <PatientTable/>
                                <DoctorTable/>
                            </section>
                        </div>
                    </div>
                    {/* End Page Content */}
                    </div>
                }
                {
                    //Si el usuario no tiene una sesión activa, este es redireccionado al Login.
                    !localStorage.usertoken && <Redirect to='/login' />
                }
            </div>
        )
    }
}

export default EditUser;