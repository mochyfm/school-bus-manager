import { useState } from "react";

import ClientCard from "../../Components/Cards/ClientCard";
import "./ClientsPage.css";
import { ClientData } from "../../Types/Types";
import { example, example2, example3 } from "../../Utils/Testing";

const UsersPage = () => {

  const [clients, setClients] = useState<ClientData[]>([example, example2, example3]);

  return (
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
        <p>No hay valores todavía</p>
      )}
    </div>
  );
};

export default UsersPage;
