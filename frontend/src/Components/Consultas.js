import React from 'react';
import 'react-router-dom';
import { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Sidebar } from './Sidebar'
import ConsultaForm from './ConsultaForm';

class Consultas extends Component {

    componentDidMount() {

        if(localStorage.usertoken){

            //Sidebar Toggle Button Script
            document.getElementById('menu-toggle').addEventListener('click', function (e) {
                e.preventDefault();
                const nav = document.querySelector('#content-wrapper');
                nav.classList.toggle('toggled');
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
                            <ConsultaForm/>
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

export default Consultas