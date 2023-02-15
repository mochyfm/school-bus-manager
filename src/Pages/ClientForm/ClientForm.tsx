import { useEffect, useState } from "react";
import { Client } from "../../Types/Types";
import "./ClientForm.css";
import { useParams } from "react-router-dom";
import { getClientById } from "../../Services/main.services";
import ClientCard from "../../Components/Cards/ClientCard/ClientCard";

const ClientForm = () => {
  const { id } = useParams();

  useEffect(() => {
    const getClientData = async (client_id: number) => {
      const clientData = await getClientById(client_id);
      setClient(clientData);
    };

    id && getClientData(parseInt(id));
  }, [id]);

  const [client, setClient] = useState<Client>({
    client_name: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setClient({
      ...client,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClient({
      client_name: "",
    });
  };

  return (
    <div className="formBody">
      {id && <div className="formClientCard">
        <ClientCard
          client_id={client.client_id}
          client_name={client.client_name}
          students={client.students}
          editButton={false}
          createStudentsButton={false}
        />
      </div>}
      <div className="formEditClient">
        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="Nombre del cliente"
            onChange={handleInput}
            name="client_name"
            value={client.client_name}
          />
          <button>{id ? "Editar" : "Crear"} Cliente</button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
