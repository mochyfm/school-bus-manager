import React, { useState } from 'react'
import { Client } from '../../Types/Types';
import './ClientForm.css';

const ClientForm = () => {

  const [client, setClient] = useState<Client>({
    client_name: ''
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setClient({
      ...client,
      [target.name]: target.value
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setClient({
        client_name: ''
      })
  }

  return (
    <div className='formBody'>
      <form onSubmit={handleSubmit}>
        <input required placeholder='Nombre del cliente' onChange={handleInput} name='client_name' value={client.client_name}/>
        <button>Crear Usuario</button>
      </form>
    </div>
  )
}

export default ClientForm