import { useEffect, useState } from "react";
import { Client } from "../../Types/Types";
import "./ClientForm.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewClient,
  deleteStudentById,
  editExistingClient,
  getClientById,
} from "../../Services/main.services";
import ClientCard from "../../Components/Cards/ClientCard/ClientCard";
import { Store } from "react-notifications-component";
import { confirmAlert } from "react-confirm-alert";

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

    
  const handleRename = (client: Client) => {

    const editClientById = async () => {
      await editExistingClient(client);
      
    };

    if (client) {
      editClientById();
      setClient(client)
    }
    
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setClient({
      ...client,
      [target.name]: target.value,
    });
  };

  const deleteStudent = (studentId: number, studentName: string) => {
    const removeStudent = async (student_id: number) => {
      await deleteStudentById(student_id);
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
            <h1>Borrar a "{studentName}"</h1>
            <h3 style={{ marginBottom: 10, fontWeight: "normal" }}>
              ¿Quieres borrar a este estudiante?
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
                  removeStudent(studentId);
                  setClient({
                    ...client,
                    students:
                      client.students &&
                      client.students.filter(({ student_id }) => {
                        return student_id !== studentId;
                      }),
                  });
                  
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
          message: 'Creado al cliente "' + client.client_name + '"',
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
        navigate("/clients");
      } catch (err) {
        Store.addNotification({
          title: "ERROR",
          message:
            'No se ha podido crear al cliente "' + client.client_name + '"',
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

    const editClient = () => {

      try {
        handleRename(client); 
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    if (
      client.client_name !== oldClientName &&
      client.client_name.trim().length !== 0
    ) {
      id && editClient();
      !id && createClient(client);
    } else {
      Store.addNotification({
        title: "ERROR",
        message:
          `Debes escribir un nombre${id ? ' nuevo.' : '.'}`,
        type: 'danger',
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
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
            enableDeleteStudents={true}
            deleteStudentFunction={deleteStudent}
          />
        </div>
      )}
      <div className={`formClient`}>
        <form
          className={`formEdit ${!id && "formCreateClient"}`}
          onSubmit={handleSubmit}
        >
          <input
            required
            className="formClientNameInput"
            placeholder="Nombre del cliente"
            onChange={handleInput}
            maxLength={30}
            name="client_name"
            value={client.client_name}
          />
          <button type="submit" className="formButton">
            {id ? "Editar" : "Crear"} Cliente
          </button>
        </form>
      </div>
      <h1 className="infoHelp">
        {`${id ? "Editar el nombre" : "Crear un nuevo cliente"}`}:{" "}
      </h1>
    </div>
  );
};

export default ClientForm;
