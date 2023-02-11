import { useState } from "react";

import ClientCard from "../../Components/Cards/ClientCard";
import "./ClientsPage.css";
import { Client } from "../../Types/Types";
import { Link } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";

const UsersPage = () => {

  const [clients, setClients] = useState<Client[]>();

  return (
    <div className="usersPage">
      <div className="usersBlock">
        {clients ? (
          clients.map((element, index) => {
            return (
              <ClientCard
                id={element.id}
                key={index}
                name={element.name}
                studentsAssigned={element.studentsAssigned}
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
