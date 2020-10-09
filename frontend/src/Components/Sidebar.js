import React, { Component } from 'react';
import { Link} from 'react-router-dom'

export class Sidebar extends Component {

  constructor(){
    super();
    this.state = {
        userType: ''
    }
  }

  componentDidMount() {
    const getUser = async () => {
      const userData = await fetch('http://localhost:8000/api/user/auth', {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${localStorage.usertoken}`
          }
      })
      const data = await userData.json();
      this.setState({
        userType: data.user.tipo_usuario
      });
    }

    getUser();
  }

  render(){

    if(this.state.userType === 'S'){
      return(
        <div id="sidebar-container" className="bg-light border-right">
          <div className="logo">
            <h4 className="font-weight-bold mb-0">MediApp</h4>
          </div>
          <div className="menu list-group-flush">
            <Link to='/dashboard' className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-home lead mr-2" /> Home</Link>
            <Link to="/register" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-add-circle lead mr-2" /> Add User</Link>
            <Link to="/usertable" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-create lead mr-2" /> Edit User</Link>
          </div>
        </div>
      );
    }else if(this.state.userType === 'M'){
      return(
        <div id="sidebar-container" className="bg-light border-right">
          <div className="logo">
            <h4 className="font-weight-bold mb-0">MediApp</h4>
          </div>
          <div className="menu list-group-flush">
            <Link to='/dashboard' className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-home lead mr-2" /> Home</Link>
            <Link to="/citas" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-bookmarks lead mr-2" /> Appointments</Link>
            <Link to="/consultas" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-people lead mr-2" /> Medical Record</Link>
            <Link to="/citas/history" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-filing lead mr-2" /> Appointment History</Link>
            <Link to="/consultas/history" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-document lead mr-2" /> Consultation History</Link>
            {/*<a href="#" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"><i className="icon ion-md-person lead mr-2" /> Profile</a>
            <a href="#" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0"> <i className="icon ion-md-settings lead mr-2" /> Settings</a>
            */}
            </div>
        </div>
      );
    }else if(this.state.userType === 'P'){
      return (
        <div id="sidebar-container" className="bg-light border-right">
          <div className="logo">
            <h4 className="font-weight-bold mb-0">MediApp</h4>
          </div>
          <div className="menu list-group-flush">
            <a href="#" className="list-group-item list-group-item-action text-muted bg-light p-3 border-0">Paciente</a>
          </div>
        </div>
      )
    }else{
      return(
        <div id="sidebar-container" className="bg-light border-right">
          <div className="logo">
            <h4 className="font-weight-bold mb-0">MediApp</h4>
          </div>
          <div className="menu list-group-flush">
            <p className="ml-3">loading...</p>
          </div>
        </div>
      )
    }
  }
}