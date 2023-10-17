import { useState, useEffect } from 'react';  // import useEffect
import './App.css';
import Contacts from './compoments/Contacts';



function App() {
    //call Apis from backend
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        fetch('http://localhost/api/contacts')
        .then(response => response.json())
        .then(data => setContacts(data))
        .catch((error) => {
        console.error('Error:', error);
        });
    }, []);

    return (
        <div style={{backgroundColor: "#F1EFEF"}}>     
            <h1><b>CONTACTOR</b> </h1>
            <Contacts heading = "Contact" setContacts ={setContacts} contacts = {contacts}/>   
                 
        </div>
    );
}

export default App;