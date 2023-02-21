import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BusRoute, Student } from "../../Types/Types";
import { getAllRoutes, getStudentById } from "../../Services/main.services";
import "./AssignRoute.css";
import StopOption from "../../Components/StopOption";

const AssignRoute = () => {
  const { id } = useParams();

  const [student, setStudent] = useState<Student>();
  const [allRoutes, setAllRoutes] = useState<BusRoute[]>();
  const [routeIdToAssing, setRouteIdToAssign] = useState<number>(-1);

  const assignRoute = (id: number) => {
    if (id !== routeIdToAssing) {
      setRouteIdToAssign(id);
    } else {
      setRouteIdToAssign(-1);
    }
  };

  const submitRoute = (route_id:number, stop_id:number) =>{
    
    const submitRouteAsigned = async () => {

    }

    route_id && stop_id && submitRouteAsigned();
  }

  useEffect(() => {
    const getStudent = async (studentId: number) => {
      const studentData = await getStudentById(studentId);
      studentData && setStudent(studentData);
    };

    const getRoutes = async () => {
      const routes = await getAllRoutes();
      routes && setAllRoutes(routes);
    };

    id && getStudent(parseInt(id));
    getRoutes();
  }, [id]);

  return (
    <>
      <div className="assignRouteTitle">
        <h1>
          Asignar ruta al estudiante "{student?.student_name}" una de las
          siguientes rutas:
        </h1>
      </div>
      <div className="assignRouteBlock">
        <div className="assignRoutesBlock">
          {allRoutes &&
            allRoutes.map(({ label, route_id, stops }) => {
              return (
                <div style={{ padding: 20 }}>
                  <div className="routeToAssign">
                    <h2>
                      Ruta: {label} - (Nº de Paradas {stops?.length})
                    </h2>
                    <div className="buttonPanel">
                      <Link
                        className="link assignRouteButton"
                        to={`/routes/editRoute/${route_id}`}
                      >
                        View Route
                      </Link>
                      {routeIdToAssing !== route_id ? (
                        <button
                          className="assignRouteButton"
                          onClick={() => route_id && assignRoute(route_id)}
                        >
                          Asignar Ruta
                        </button>
                      ) : (
                        <button
                          className="assignRouteButton"
                          onClick={() => route_id && assignRoute(route_id)}
                        >
                          Deseleccionar Ruta
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="stopCardGroup">
                    {stops &&
                      stops.map(({ stop_id, lat, lng }, index) => {
                        return (
                          <div className="stopCardToAssign">
                            {index + 1}º -{" "}
                            <StopOption
                              position={{ lat: lat, lng: lng }}
                              key={index}
                            />
                            {routeIdToAssing === route_id && (
                              <button className="stopCardToAssignButton" onClick={() => stop_id && submitRoute(route_id, stop_id)}>
                                Asignar Parada
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AssignRoute;
