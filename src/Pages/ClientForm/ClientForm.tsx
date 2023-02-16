import { useEffect, useState } from "react";
import { Client } from "../../Types/Types";
import "./ClientForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { createNewClient, getClientById } from "../../Services/main.services";
import ClientCard from "../../Components/Cards/ClientCard/ClientCard";
import { Store } from "react-notifications-component";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getClientData = async (client_id: number) => {
      const clientData = await getClientById(client_id);
      setClient(clientData);
      setOldClientName(clientData.client_name);
    };

    id && getClientData(parseInt(id));
  }, [id]);

  const [client, setClient] = useState<Client>({
    client_id: 0,
    client_name: "",
  });
  const [oldClientName, setOldClientName] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setClient({
      ...client,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createClient = async (client: Client) => {
      try {
        await createNewClient(client);
        setClient({
          client_id: 0,
          client_name: "",
        });
        Store.addNotification({
          title: "¡Hecho!",
          message: "Creado al cliente \"" + client.client_name + "\"",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        setTimeout(() => navigate('/clients'), 3000);
      } catch (err) {
        Store.addNotification({
          title: "ERROR",
          message: "No se ha podido crear al cliente \"" + client.client_name + "\"",
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        console.log(err);
      }
    };

    const editClient = (client: Client) => {
      try {
        // await editExistingClient(client);
        console.log(client);
        Store.addNotification({
          title: "¡Hecho!",
          message: "Se ha modificado el nombre del cliente \"" + oldClientName + "\" ahora se llama \"" + client.client_name + "\"",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        setTimeout(() => navigate('/clients'), 3000);
      } catch (err) {
        console.log(err);
      }
    };

    if (
      client.client_name !== oldClientName &&
      client.client_name.trim().length !== 0
    ) {
      id && editClient(client);
      !id && createClient(client);
    }
  };

  return (
    <div className="formBody">
      {id && (
        <div className="formClientCard">
          <ClientCard
            client_id={client.client_id}
            client_name={oldClientName}
            students={client.students}
            editButton={false}
            createStudentsButton={true}
          />
        </div>
      )}
      <div className={`formClient`}>
        <form className={`formEdit ${!id && "formCreateClient"}`} onSubmit={handleSubmit}>
          <input
            required
            className='formClientNameInput'
            placeholder="Nombre del cliente"
            onChange={handleInput}
            name="client_name"
            value={client.client_name}
          />
          <button type="submit" className='formButton'>
            {id ? "Editar" : "Crear"} Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
