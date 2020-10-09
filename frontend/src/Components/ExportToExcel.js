import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ExportToExcel extends Component{

    render(){
        return(
            <div style={{marginRight: '25px'}}>
                <br/>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export"
                    table="table-to-xls"
                    filename="tabla_de_consultas"
                    sheet="tablexls"
                    buttonText="Export to Excel"
                    />
                <table hidden="true" id="table-to-xls">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>JVPM</th>
                        <th>Physical Exam</th>
                        <th>Previous Exams</th>
                        <th>Diagnosis</th>
                        <th>Prescription</th>
                        <th>Next Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.posts.map(post => {
                            return(

                                <tr key={post.id_consulta}>
                                    <td>{post.fecha_consulta}</td>
                                    <td>{post.id_paciente}</td>
                                    <td>{post.jvpm}</td>
                                    <td>{post.rx}</td>
                                    <td>{post.examen}</td>
                                    <td>{post.diagnostico}</td>
                                    <td>{post.receta}</td>
                                    <td>{post.fprox_consulta}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

            </div>
        )
    }
}
export default ExportToExcel;