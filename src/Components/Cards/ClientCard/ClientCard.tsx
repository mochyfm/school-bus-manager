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
          <span className="clientInfoTag center clientListTag">
            {" "}
            · Estudiantes a cargo ·{" "}
          </span>
          <div className="client studentsList">
            {studentsAssigned &&
              studentsAssigned.map((element, index) => {
                return (
                  <div className="client studentListCard">
                    <div className="client studentListCard_Header">
                      {element.name}
                      <Link className="" to={`/studentInfo/${element.id}`}>
                        
                      </Link>
                    </div>
                    <p>
                      <span>- Servicio Asignado: </span>
                    </p>
                  </div>
                );
              })}
          </div>
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
