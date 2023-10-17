import React, { useState, useEffect } from 'react';
import CreateContact from './CreateContact';

function Add(props) {
  
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetch('http://localhost/api/contacts')
    .then(response => response.json())
    .then(data => setContacts(data))
    .catch((error) => {
    console.error('Error:', error);
    });
}, []);
  

  const handleAddContact = () => {
    const newContact = {
      name: newName
    };

    //call apis
    fetch('http://localhost/api/contacts', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(newContact)
			})
			.then(response => response.json())
			.then(data => {
			  setContacts(contacts => [...contacts, data]);
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
    setNewName('');
  };

  function handleInputChange(event) {
    setNewName(event.target.value);
  };

  function handleDeleteDetail(id) {
    fetch(`http://localhost/api/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setContacts(contacts => contacts.filter(contact => contact.id !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <div>
      <div style={{ borderBottom: 'solid white', padding: '10px', backgroundColor: '#7D7C7C' }}>
        <h2>{props.heading}</h2>
        <input type="text" 
               placeholder="Name" 
               value = {newName}
               onChange={handleInputChange}
               
        />
        <br /><br />
        <button
          className="button1"
          onClick={handleAddContact}
        >
          <p>Create Contact</p>
        </button>
      </div>
      
      {contacts.map((contact) => (
        <div key={contact.id} className='CreateContact'>
            <CreateContact setPhones = {setContacts}
                           phones = {contact.phones}
                           contactId = {contact.id} 
                           name={contact.name}/>
            <button className="button2" 
                    style={{ width: "30%"}} 
                    onClick={() => {
                      console.log('Contact ID:', contact.id);
                      handleDeleteDetail(contact.id);}}>Delete Contact</button>
        </div>
      ))}
    </div>
  );
}

export default Add;
