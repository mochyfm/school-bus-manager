import { useState } from "react";

import ClientCard from "../../Components/Cards/ClientCard";
import "./ClientsPage.css";
import { ClientData } from "../../Types/Types";
import { example } from "../../Utils/Testing";

const UsersPage = () => {

  const [clients, setClients] = useState<ClientData[]>([example]);

  return (
    <div className="usersBlock">
      {clients ? (
        clients.map((element, index) => {
          return (
            <ClientCard
              key={index}
              name={element.name}
              studentsAssigned={element.studentsAssigned}
              service={element.service}
            />
          );
        })
      ) : (
        <p>No hay valores todavía</p>
      )}
    </div>
  );
};

export default UsersPage;
