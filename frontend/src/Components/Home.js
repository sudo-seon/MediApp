import React from 'react';
import '../index.css';
import indexImg from '../img/indexImg.svg';
import { Navigation } from './Navigation';

export const Home = () => {

    return(
        <div>
            <Navigation/>
            <div className="p-5">
                <div className="row">
                    <div className="col-sm-6">
                        <h1><i className="icon ion-md-medkit" /> MediApp</h1>
                        <p className="big-text">Scientific Technical Project 2020</p>
                        <p>
                            MediApp is a project that aims to improve the system of clinics, to speed up processes, reduce costs in clinics such as: Stationery, ink, etc. In turn, it aims to improve communication between multi-specialist physicians within the same clinic and improve the process of sharing information about patients visiting the clinic.
                        </p>
                    </div>
                    <div className="col-sm-6" id="index-image">
                        <img src={indexImg} alt="indexImage" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    )

}