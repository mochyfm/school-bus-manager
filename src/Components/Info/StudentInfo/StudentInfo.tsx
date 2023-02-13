import { Link } from "react-router-dom";
import { Student } from "../../../Types/Types"
import './StudentInfo.css';

const StudentInfo = (props: Student) => {

    const { student_id, student_name, messages } = props;

  return (
    <div className="student">
        <div className="studentTitle">Estudiante</div>
      <div className="studentInfoGroup">
        <div className="studentInfo">
            <span className="studentDataLabel"><span className="studentLabel">Nombre:</span> {student_name}</span>
            {(messages && messages.length !== 0) && <span className="studentDataLabel"><span className="studentLabel">Cantidad de mensajes:</span> {messages.length}</span>}
            <span className="studentDataLabel"><span className="studentLabel">Ruta asignada:</span> RUTA DE EJEMPLO </span>
        </div>
        <Link to={`/studentInfo/${student_id}`} className="link viewButton">Ver Estudiante</Link>
        <div className="studentFooter"/>
      </div>
    </div>
  )
}

export default StudentInfo