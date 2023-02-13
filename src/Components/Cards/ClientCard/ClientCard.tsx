import { Link } from "react-router-dom";
import { Client } from "../../../Types/Types";
import "./ClientCard.css";
import StudentInfo from "../../Info/StudentInfo";

const ClientCard = (props: Client) => {
  const { client_id, client_name, students } = props;

  return (
    <div className="clientCard">
      <div className="client cardTitle">
        <span className="clientInfoTag">
          ID: <span className="clientInfo">{client_id}</span>
        </span>
        {client_name}
      </div>
      <div className="client cardBody"></div>
      <div className="studentGroup">
        <div className="studentsList">
          {students &&
            students.map(({ student_name, student_id, messages }, index) => {
              return (
                <StudentInfo
                  key={index}
                  student_name={student_name}
                  student_id={student_id}
                  messages={messages}
                />
              );
            })}
        </div>
      </div>
      <div className="client buttonPanel">
        <Link to={`/message/${client_id}`} className="link client button">
          Enviar Mensaje
        </Link>
        <Link to={`/editClient/${client_id}`} className="link client button">
          Editar Usuario
        </Link>
      </div>
    </div>
  );
};

export default ClientCard;
