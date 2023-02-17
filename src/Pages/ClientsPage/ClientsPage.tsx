import { useEffect, useState } from "react";

import ClientCard from "../../Components/Cards/ClientCard";
import "./ClientsPage.css";
import { Client } from "../../Types/Types";
import { Link } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { deleteClientById, getAllClients } from "../../Services/main.services";
import { confirmAlert } from "react-confirm-alert";
import EmptyList from "../../Components/EmptyList/EmptyList";

const UsersPage = () => {
  const [clients, setClients] = useState<Client[]>();

  useEffect(() => {
    const getClients = async () => {
      setClients(await getAllClients());
    };

    getClients();
  }, []);

  const handleDelete = (client_id: number, client_name: string) => {
    console.log(client_id);

    const deleteClient = async () => {
      await deleteClientById(client_id);
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className="custom-ui"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Borrar a "{client_name}"</h1>
            <h3 style={{ marginBottom: 10, fontWeight: "normal" }}>
              ¿Quieres borrar a este cliente?
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <button
                style={{ paddingRight: 10, paddingLeft: 10 }}
                onClick={() => {
                  deleteClient();
                  setClients(
                    clients?.filter((element) => {
                      return element.client_id !== client_id;
                    })
                  );
                  onClose();
                }}
              >
                Confirmar
              </button>
              <button
                style={{ paddingRight: 10, paddingLeft: 10, marginLeft: 10 }}
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="usersPage">
      {clients && clients?.length !== 0 ? (
        <div className="usersBlock">
          {clients.map((element, index) => {
            return (
              <ClientCard
                key={index}
                client_id={element.client_id}
                client_name={element.client_name}
                students={element.students}
                deleteButton={true}
                deleteClientFunction={handleDelete}
              />
            );
          })}
        </div>
      ) : (
        <EmptyList
          title="¡Vaya que fallo!"
          text="Esta lista está vacía, prueba a añadir un cliente nuevo para ver más cosas aqui"
        />
      )}  
      <Link className="addClient_ButtonPanel" to={"/newClient"}>
        <IoPersonAddSharp />
      </Link>
    </div>
  );
};

export default UsersPage;
