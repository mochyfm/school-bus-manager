import { Link } from "react-router-dom";
import { getAddressFrom } from "../../../Services/Services";
import { ClientData, Service, Student } from "../../../Types/Types";
import ServiceCard from "../ServiceCard";
import "./ClientCard.css";

const ClientCard = (props: ClientData) => {
  const { id, name, studentsAssigned } = props;

  return (
    <div className="clientCard">
      <div className="client cardTitle">{name}</div>
      <div className="client cardBody">
        <div className="clientDescription">
          <span className="clientInfoTag">
            Id: <span className="clientInfo">{id}</span>{" "}
          </span>
          <span className="clientInfoTag">
            Nombre: <span className="clientInfo">{name}</span>{" "}
          </span>
          <span className="clientInfoTag center"> · Estudiantes a cargo ·</span>
          <>
            {studentsAssigned &&
              studentsAssigned.map((element, index) => {
                return (
                  <p>
                    Alumno {index + 1}:{" "}
                    <Link to={`/studentInfo/${element.id}`}>
                      {element.name}
                    </Link>
                  </p>
                );
              })}
          </>
          <span className="clientInfoTag">Servicios Contratados:</span>
        </div>
      </div>
      <div className="client buttonPanel">
        <Link to={`/message/${id}`} className="link client button">
          Send Message
        </Link>
        <Link to={`/editClient/${id}`} className="link client button">
          Edit User
        </Link>
      </div>
    </div>
  );
};

export default ClientCard;
