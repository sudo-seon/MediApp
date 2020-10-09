import Reat, { useState } from 'react';
import '../modal-style.css';

function PatientModal(){

    const [modalState, setModalState] = useState(false);

    const manageState = () => {
        setModalState(!modalState);
    }

    return(
        <div className="modalBackground">
            modal
        </div>
    )
}

export default PatientModal;