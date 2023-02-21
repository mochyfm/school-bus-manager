import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getClientById,
  getRoutesFromStudent,
  getStudentById,
} from "../../Services/main.services";
import { BusRoute, BusStop, Client, Student } from "../../Types/Types";
import MessageCard from "../../Components/Cards/MessageCard/MessageCard";

import "./StudentPage.css";
import Map from "../../Components/Map/Map";
import Loading from "../../Components/Loading/Loading";
import StopOption from "../../Components/StopOption";

const StudentPage = ({ isLoaded }: { isLoaded: boolean }) => {
  const { id } = useParams();

  const [student, setStudent] = useState<Student>();
  const [studentRoutes, setStudentRoutes] = useState<BusRoute[]>();
  const [studentClient, setStudentClient] = useState<Client>();

  const [busStops, setBusRoutes] = useState<any>([]);

  useEffect(() => {
    const getStudent = async (studentId: number) => {
      const studentData = await getStudentById(studentId);
      studentData && setStudent(studentData);
      studentData && getStopsAssigned(studentId);
    };

    const getStopsAssigned = async (studentId: number) => {
      const localRoutes = await getRoutesFromStudent(studentId);
      localRoutes && setStudentRoutes(localRoutes);
      console.log("PRUEBA PARA UN ARRAY:", );
      setBusRoutes(localRoutes.flatMap((route) => route.stops && route.stops.map((stopData) => ({...stopData, label: route.label}))));
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
          <Link
            className="darkLink"
            to={`/editClient/${studentClient?.client_id}`}
          >
            {studentClient?.client_name} {studentRoutes && studentRoutes?.length !== 0 && `- Pertenece a ${studentRoutes?.length} rutas.`}
          </Link>
        </span>
      </h1>
      {student && student.messages?.length !== 0 && (
        <h1 className="messgListTitle">Lista de mensajes</h1>
      )}
      {student && student.messages && student.messages?.length !== 0 && (
        <div className="studentMessageList">
          {student.messages.map(
            (
              {
                client_id,
                student_id,
                message_id,
                message,
                message_type,
                sended_at,
              },
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
                  sended_at={sended_at}
                />
              );
            }
          )}
        </div>
      )}
      {student && student.messages && student.messages?.length !== 0 && (
        <div className="mapSpliter" />
      )}
      <div className="routeSection">
        {isLoaded ? (
          <Map busStops={busStops} mapTopLefMenu={false} streetViewOption={false} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default StudentPage;
