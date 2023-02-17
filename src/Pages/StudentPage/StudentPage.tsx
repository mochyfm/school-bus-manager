import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClientById, getStudentById } from "../../Services/main.services";
import { Client, Student } from "../../Types/Types";
import MessageCard from "../../Components/Cards/MessageCard/MessageCard";

import "./StudentPage.css";
import Map from "../../Components/Map/Map";
import Loading from "../../Components/Loading/Loading";

const StudentPage = ({ isLoaded }: { isLoaded: boolean }) => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student>();
  const [studentClient, setStudentClient] = useState<Client>();

  useEffect(() => {
    const getStudent = async (studentId: number) => {
      const studentData = await getStudentById(studentId);
      studentData && setStudent(studentData);
    };

    const getClient = async (clientId: number) => {
      const clientData = await getClientById(clientId);
      clientData && setStudentClient(clientData);
    };

    id && getStudent(parseInt(id));
    student?.client_id && getClient(student.client_id);
  }, [id, student?.client_id]);

  return (
    <div className="sutdentProfile">
      <h1 className="studentNameTitle">
        Nombre del estudiante: {student?.student_name}
        <span>
          <span>(Padre / Madre / Tutor) asociado:</span>{" "}
          <Link to={`/editClient/${studentClient?.client_id}`}>
            {studentClient?.client_name}
          </Link>
        </span>
      </h1>
      <div className="routeSection">
        {isLoaded ? (
          <Map mapTopLefMenu={false} streetViewOption={false} />
        ) : (
          <Loading />
        )}
      </div>
      {student && student.messages?.length !== 0 && <h1 className="messgListTitle">Lista de mensajes</h1>}
      <div className="studentMessageList">
        {student &&
          student.messages &&
          student.messages.map(
            (
              { client_id, student_id, message_id, message, message_type },
              index
            ) => {
              return (
                <MessageCard
                  key={index}
                  client_id={client_id}
                  student_id={student_id}
                  message_id={message_id}
                  message={message}
                  message_type={message_type}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default StudentPage;
