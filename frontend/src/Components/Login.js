import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../login-style.css';
import wave from '../img/original.png';
import loginImg from '../img/login.svg';
import avatar from '../img/avatar.svg';
import Swal from 'sweetalert2'

const API = process.env.REACT_APP_API;

export const Login = () => {

    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const loginSubmit = async (e) => {

        e.preventDefault();

        const res = await fetch(`${API}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await res.json();
        if(data.token){

            console.log(data.token);
            localStorage.setItem('usertoken', data.token);
            history.push('/dashboard');

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid User!',
                showCloseButton: true,
                showConfirmButton: false,
                text: 'Please create an account.',
                timer: 5000
            });
        }
    }

    window.onload = () => {
        const inputs = document.querySelectorAll(".input");


        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
        
        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value === ""){
                parent.classList.remove("focus");
            }
        }
        
        
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });        
    };

    return(
        <div>
            <img className="wave" src={wave} alt="waveImg"/>
            <div className="container">
                <div className="img">
                    <img src={loginImg} alt="loginImg"/>
                </div>
                <div className="login-content">
                    <form onSubmit={loginSubmit} style={{width: "360px"}}>
                        <img src={avatar} alt="avatarImg" />
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fa fa-user" />
                            </div>
                            <div className="div">
                            <input type="text" className="input" onChange={e => setName(e.target.value)} value={username} placeholder="Username" required autoFocus/>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i"> 
                            <i className="fa fa-lock" />
                            </div>
                            <div className="div">
                            <input type="password" className="input" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" required/>
                            </div>
                        </div>
                        <br/>
                        <input type="submit" className="button" defaultValue="Login" value="Sign In"/>
                    </form>
                </div>
            </div>
      </div>
    )

}