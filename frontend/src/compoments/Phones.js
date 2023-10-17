import React, { useState, useEffect } from 'react';

function CreateDetails(props) {
  function handleDeleteDetail() {
    fetch(`http://localhost/api/contacts/${props.contactId}/phones/${props.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        props.setPhones(phones => phones.filter(phone => phone.id !== props.id));
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.number}</td>
      <td>
        <button className="button2" onClick={handleDeleteDetail}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function Phones(props) {
  const [phones, setPhones] = useState([]);
  const [newNum, setNumber] = useState('');
  const [newType, setType] = useState('');
  useEffect(() => {
    // Clear the existing phones before fetching new data
    setPhones([]);
    fetch(`http://localhost/api/contacts/${props.contactId}/phones`)
      .then(response => response.json())
      .then(data => {
        // Append the new phones to the existing phones
        setPhones(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [props.contactId]);

  const handleAddDetail = () => {
    fetch(`http://localhost/api/contacts/${props.contactId}/phones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: newType, number: newNum, contactId: props.contactId })
    })
      .then(response => response.json())
      .then(data => {
        // Update the parent component's state with the new phone
        setPhones([...phones, data]);
      })
      .catch(error => console.error('Error:', error));

    setType('');
    setNumber('');
  };

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleNumberChange(event) {
    setNumber(event.target.value);
  }

  return (
    <div>
      <h3>{props.name}</h3>
      <input
        type="text"
        placeholder="Type:"
        onChange={handleTypeChange}
        value={newType}
      />
      <input
        type="text"
        placeholder="Number:"
        value={newNum}
        onChange={handleNumberChange}
      />
      <button className="button1" onClick={handleAddDetail}>
        Add
      </button>

      <table>
        <thead>
          <tr>
            <th>
              <h4>Type</h4>
            </th>
            <th>
              <h4>Number</h4>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {phones.map(phone => (
            <CreateDetails
              key={phone.id}  // Added a key prop
              setPhones={setPhones}
              contactId={props.contactId}
              id={phone.id}
              type={phone.type}
              number={phone.number}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Phones;
