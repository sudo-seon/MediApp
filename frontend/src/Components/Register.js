import React, { Component } from 'react';
import '../index.css'
import { Redirect } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Sidebar } from './Sidebar'
import { Form } from './Form'

class Register extends Component {

    componentDidMount(){
        if(localStorage.usertoken){

            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container');

            document.getElementById('menu-toggle').addEventListener('click', function (e) {
                e.preventDefault();
                const nav = document.querySelector('#content-wrapper');
                nav.classList.toggle('toggled');
            });

            document.getElementById('toggle-btn').addEventListener('click', function (e) {
                e.preventDefault();
                const btnToggle = document.getElementById('toggle-btn');
                btnToggle.classList.toggle('active');
                if(btnToggle.className === "toggle-btn active"){
                    document.getElementById('i1').setAttribute('disabled', 'true');
                    document.getElementById('i2').setAttribute('disabled', 'true');
                    document.getElementById('i3').setAttribute('disabled', 'true');
                    document.getElementById('i4').setAttribute('disabled', 'true');
                }else{
                    document.getElementById('i1').removeAttribute('disabled', 'false');
                    document.getElementById('i2').removeAttribute('disabled', 'false');
                    document.getElementById('i3').removeAttribute('disabled', 'false');
                    document.getElementById('i4').removeAttribute('disabled', 'false');
                }
            });

            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });

            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            });
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
                            <div className="row">
                                <div className="col-md-12">
                                    <Form/>
                                </div>
                            </div>
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

export default Register;