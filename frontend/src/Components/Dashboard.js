import React, { Component } from 'react';
import '../index.css'
import { Redirect } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Sidebar } from './Sidebar'
import 'bootstrap/dist/js/bootstrap.min.js' 

class Dashboard extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
            
        if(localStorage.usertoken){

            document.getElementById('menu-toggle').addEventListener('click', function (e) {
                e.preventDefault();
                const nav = document.querySelector('#content-wrapper');
                nav.classList.toggle('toggled');
            });

            const ApiFetch = async () => {
                const userData = await fetch('http://localhost:8000/api/user/auth', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.usertoken}`
                    }
                })
                const data = await userData.json();
                this.setState({
                    username: data.user.username,
                    password: data.user.password
                });
                console.log(data);
            }
            ApiFetch();   
        }    
    }

    render(){
        return(
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
                        {/* Highlights */}
                        <div className="row">
                            <div className="col-xl-3 col-lg-6">
                            <div className="card mb-5 shadow-sm border-0 shadow-hover">
                                <div className="card-body d-flex">
                                <div>
                                    <div className="circle rounded-circle bg-light align-self-center d-flex mr-3">
                                    <i className="icon ion-md-trending-up text-primary align-self-center mx-auto lead" />
                                    </div>
                                </div>
                                <div className="align-self-center">
                                    <h5 className="mb-0">3200</h5>
                                    <small className="text-muted">Ventas totales</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                            <div className="card mb-5 shadow-sm border-0 shadow-hover">
                                <div className="card-body d-flex">
                                <div>
                                    <div className="circle rounded-circle bg-light align-self-center d-flex mr-3">
                                    <i className="icon ion-md-stats text-primary align-self-center mx-auto lead" />
                                    </div>
                                </div>
                                <div className="align-self-center">
                                    <h5 className="mb-0">13,200</h5>
                                    <small className="text-muted">Visitas al sitio</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                            <div className="card mb-5 shadow-sm border-0 shadow-hover">
                                <div className="card-body d-flex">
                                <div>
                                    <div className="circle rounded-circle bg-light align-self-center d-flex mr-3">
                                    <i className="icon ion-md-people text-primary align-self-center mx-auto lead" />
                                    </div>
                                </div>
                                <div className="align-self-center">
                                    <h5 className="mb-0">1345</h5>
                                    <small className="text-muted">Usuarios nuevos</small>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                            <div className="card mb-5 shadow-sm border-0 shadow-hover">
                                <div className="card-body d-flex">
                                <div>
                                    <div className="circle rounded-circle bg-light align-self-center d-flex mr-3">
                                    <i className="icon ion-md-cash text-primary align-self-center mx-auto lead" />
                                    </div>
                                </div>
                                <div className="align-self-center">
                                    <h5 className="mb-0">$22,150</h5>
                                    <small className="text-muted">Ingresos</small>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* Fin highlights */}
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

export default Dashboard;