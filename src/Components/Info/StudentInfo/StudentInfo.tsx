import { Link } from "react-router-dom";
import { Student } from "../../../Types/Types"
import './StudentInfo.css';

const StudentInfo = (props: Student) => {

    const { id, name, service } = props;

  return (
    <div className="student">
        <div className="studentTitle">Estudiante</div>
      <div className="studentInfoGroup">
        <div className="studentInfo">
            <span className="studentDataLabel"><span className="studentLabel">Nombre:</span> {name}</span>
            <span className="studentDataLabel"><span className="studentLabel">Ruta asignada:</span> {service.type}</span>
        </div>
        <Link to={`/studentInfo/${id}`} className="link viewButton">Ver Estudiante</Link>
        <div className="studentFooter"/>
      </div>
    </div>
  )
}

export default StudentInfo