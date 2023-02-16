import { useEffect, useState } from "react";
import { Client } from "../../Types/Types";
import "./ClientForm.css";
import { useParams } from "react-router-dom";
import { createNewClient, getClientById } from "../../Services/main.services";
import ClientCard from "../../Components/Cards/ClientCard/ClientCard";
import { Store } from "react-notifications-component";

const ClientForm = () => {
  const { id } = useParams();

  useEffect(() => {
    const getClientData = async (client_id: number) => {
      const clientData = await getClientById(client_id);
      setClient(clientData);
      setOldClientName(clientData.client_name);
    };

    id && getClientData(parseInt(id));
  }, [id]);

  const [client, setClient] = useState<Client>({
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
        Store.addNotification({
          title: `Cliente ${id ? "editado" : "creado"} exitosamente`,
          message: `Se ha ${
            id ? `editado` : "creado"
          } el cliente correctamente`,
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        setClient({
          client_name: "",
        });
        setTimeout(() => window.location.reload(), 3000);
      } catch (err) {
        console.log(err);
        Store.addNotification({
          title: "ERROR AL CREAR EL CLIENTE",
          message: `No se ha podido crear el cliente ${client.client_name}`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 0,
            onScreen: true,
          },
        });
      }
    };

    (client.client_name.trim() !== "")
      ? createClient(client)
      : Store.addNotification({
          title: "ERROR AL CREAR EL CLIENTE",
          message: `No se ha podido crear el cliente ${client.client_name}`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 0,
            onScreen: true,
          },
        });
  };

  return (
    <div className="formBody">
      {id && (
        <div className="formClientCard">
          <ClientCard
            client_id={client.client_id}
            client_name={client.client_name}
            students={client.students}
            editButton={false}
            createStudentsButton={true}
          />
        </div>
      )}
      <div className={`formEditClient ${!id && "formEditClientCard"}`}>
        <form className="formEdit" onSubmit={handleSubmit}>
          <input
            required
            className="formClientNameInput"
            placeholder="Nombre del cliente"
            onChange={handleInput}
            name="client_name"
            value={client.client_name}
          />
          <button className="formButton">
            {id ? "Editar" : "Crear"} Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
