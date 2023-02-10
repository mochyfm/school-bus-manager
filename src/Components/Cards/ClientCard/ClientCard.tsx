import { Link } from "react-router-dom";
import { ClientData } from "../../../Types/Types";
import "./ClientCard.css";
import StudentInfo from "../../Info/StudentInfo";

const ClientCard = (props: ClientData) => {
  const { id, name, studentsAssigned } = props;

  return (
    <div className="clientCard">
      <div className="client cardTitle">
        <span className="clientInfoTag">
          ID: <span className="clientInfo">{id}</span>
        </span>
        {name}
      </div>
      <div className="client cardBody"></div>
      <div className="studentGroup">
        <div className="studentsList">
          {studentsAssigned &&
            studentsAssigned.map(({ name, id }, index) => {
              return (
                <StudentInfo
                  key={index}
                  name={name}
                  id={id}
                />
              );
            })}
        </div>
      </div>
      <div className="client buttonPanel">
        <Link to={`/message/${id}`} className="link client button">
          Enviar Mensaje
        </Link>
        <Link to={`/editClient/${id}`} className="link client button">
          Editar Usuario
        </Link>
      </div>
    </div>
  );
};

export default ClientCard;
