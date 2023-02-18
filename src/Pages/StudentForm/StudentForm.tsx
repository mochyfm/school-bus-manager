import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentSubmit } from "../../Types/Types";

import "./StudentForm.css";
import { createNewStudent } from "../../Services/main.services";
import { Store } from "react-notifications-component";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState<string>("");
  const [clientId, setClientId] = useState<number>(0);

  useEffect(() => {
    id && setClientId(parseInt(id));
  }, [id]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setStudentName(target.value);
  };

  const submitStudent = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const retrieveClient = async (student: StudentSubmit) => {
      try {
        await createNewStudent(student);
        setStudentName("");
        Store.addNotification({
          title: `Creado el estudiante "${studentName}"`,
          message: `Se ha creado el estudiante "${studentName}".`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2500,
            onScreen: true,
          },
        });
        navigate(`/clients`);
      } catch (error) {
        console.log(error);
      }
    };

    studentName.trim() !== "" &&
      clientId &&
      retrieveClient({ client_id: clientId, student_name: studentName });
  };

  return (
    <div className="newStudentForm">
      <form onSubmit={submitStudent}>
        <input
          required
          className="formStudentNameInput"
          placeholder="Nombre del estudiante"
          onChange={handleInput}
          name="student_name"
          value={studentName}
        />
        <button type="submit" className="formStudentNameButton">
          Crear estudiante
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
