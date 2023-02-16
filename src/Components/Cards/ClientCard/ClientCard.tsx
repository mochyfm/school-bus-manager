import { Link } from "react-router-dom";
import { ClientCardType } from "../../../Types/Types";
import "./ClientCard.css";
import StudentInfo from "../../Info/StudentInfo";

const ClientCard = (props: ClientCardType) => {
  const { client_id, client_name, students, editButton = true, createStudentsButton = true } = props;

  return (
    <div className="clientCard">
      <div className="client cardTitle">
        <span className="clientInfoTag">
          ID: <span className="clientInfo">{client_id}</span>
        </span>
        {client_name}
      </div>
      <div className="client cardBody"></div>
      <div className={`${students && students.length !== 0 ? 'studentGroup' : "createStudentGroup"}`}>
        {((students && students.length) !== 0) ? <div className="studentsList">
            {students && students.map(({ student_name, student_id, messages }, index) => {
              return (
                <StudentInfo
                  key={index}
                  client_id={client_id}
                  student_name={student_name}
                  student_id={student_id}
                  messages={messages}
                />
              );
            })}
        </div> : createStudentsButton && <Link to={`/newStudent/${client_id}`} className="link client createStudentButton">Añadir Estudiantes</Link>}
      </div>
      <div className="client buttonPanel">
        {editButton && (
          <Link to={`/editClient/${client_id}`} className="link client button">
            Editar Usuario
          </Link>
        )}
        <Link to={`/newStudent/${client_id}`} className="link client button">
          Añadir Estudiante
        </Link>
      </div>
    </div>
  );
};

export default ClientCard;
