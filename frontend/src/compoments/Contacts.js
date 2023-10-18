import React, { useState, useEffect } from 'react';
import Phones from './Phones';

function Contacts(props) {
  
  const [phones, setPhones] = useState([]);
  const [newName, setNewName] = useState('');

  const handleAddContact = () => {
    
    //call apis
    fetch('http://localhost/api/contacts', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: newName})
			})
			.then(response => response.json())
			.then(data => {
			  props.setContacts(contacts => [...contacts, data]);
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
    setNewName('');
  };

  function handleInputChange(event) {
    setNewName(event.target.value);
  };

  function deleteContact(id) {
    fetch(`http://localhost/api/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        props.setContacts(contacts => contacts.filter(contact => contact.id !== id));
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
      
      {props.contacts.map((contact) => (
  		<div key={`contact_${contact.id}`} className='CreateContact'>
    		<Phones setContacts={props.setContacts} 
					contactId={contact.id} 
					name={contact.name} />
          
    		<button
     			className="button2"
     			style={{ width: "30%" }}
      			onClick={() => {
        						console.log('Contact ID:', contact.id);
        						deleteContact(contact.id);
      			}}
    >
      Delete Contact
    </button>
  </div>
))}
    </div>
  );
}

export default Contacts;
