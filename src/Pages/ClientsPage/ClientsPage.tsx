import { useEffect, useState } from "react";

import ClientCard from "../../Components/Cards/ClientCard";
import "./ClientsPage.css";
import { Client } from "../../Types/Types";
import { Link } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { getAllClients } from "../../Services/main.services";

const UsersPage = () => {

  const [clients, setClients] = useState<Client[]>();

  useEffect(() => {
    
    const getClients = async () => {
      setClients(await getAllClients());
    }

    getClients();

  }, [])
  

  return (
    <div className="usersPage">
      <div className="usersBlock">
        {clients ? (
          clients.map((element, index) => {
            return (
              <ClientCard
                key={index}
                client_id={element.client_id}
                client_name={element.client_name}
                students={element.students}
              />
            );
          })
        ) : (
          <p>No hay usuarios todavía</p>
        )}
      </div>
      <Link className="addClient_ButtonPanel" to={'/newClient'}>
        <IoPersonAddSharp/>
      </Link>
    </div>
  );
};

export default UsersPage;
