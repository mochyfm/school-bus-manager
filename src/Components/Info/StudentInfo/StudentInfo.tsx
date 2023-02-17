import { Link } from "react-router-dom";
import { StudentCard } from "../../../Types/Types"
import './StudentInfo.css';
import { AiFillDelete } from "react-icons/ai";

const StudentInfo = (props: StudentCard) => {

    const { student_id, student_name, messages, deleteEnabled = false, deleteFunction } = props;

  const handleDelete = () => {
    deleteFunction && deleteFunction(student_id, student_name)
  }

  return (
    <div className="student">
        <div className="studentTitle">
          Estudiante
          {deleteEnabled && <button className="deleteStudentButton" onClick={handleDelete}>Delete Student{" "}<AiFillDelete/></button>}
        </div>
      <div className="studentInfoGroup">
        <div className="studentInfo">
            <span className="studentDataLabel"><span className="studentLabel">Nombre:</span>{student_name}</span>
            {(messages && messages.length !== 0) && <span className="studentDataLabel"><span className="studentLabel">Cantidad de mensajes</span> {messages.length} mensajes</span>}
            <span className="studentDataLabel"><span className="studentLabel">Número de rutas asignadas</span> X </span>
        </div>
        <Link to={`/studentInfo/${student_id}`} className="link viewButton">Ver Información Estudiante</Link>
        <Link to={`/message/${student_id}`} className="link viewButton">Enviar mensaje</Link>
        <div className="studentFooter"/>
      </div>
    </div>
  )
}

export default StudentInfo