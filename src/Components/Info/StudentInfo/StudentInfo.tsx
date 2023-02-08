import { Link } from "react-router-dom";
import { Student } from "../../../Types/Types"
import './StudentInfo.css';

const StudentInfo = (props: Student) => {

    const { id, name, service } = props;

  return (
    <div className="student">
        <div className="studentTitle">Estudiante</div>
        <div className="studentInfo">
            <span className="studentDataLabel"><span className="studentLabel">Nombre</span> {name}</span>
            <span className="studentDataLabel"><span className="studentLabel">Ruta asignada</span> {service.type}</span>
        </div>
        <Link to={`/studentInfo/${id}`} className="link viewButton">Ver Estudiante</Link>
    </div>
  )
}

export default StudentInfo