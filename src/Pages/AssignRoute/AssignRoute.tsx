import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BusRoute, Student } from "../../Types/Types";
import {
  assignStopRouteToStudent,
  getNonAssignedRoutes,
  getStudentById,
} from "../../Services/main.services";
import "./AssignRoute.css";
import StopOption from "../../Components/StopOption";
import { Store } from "react-notifications-component";
import EmptyList from "../../Components/EmptyList/EmptyList";

const AssignRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const submitRoute = (
    route_id: number,
    stop_id: number,
    student_id: number,
    label: string
  ) => {
    const submitRouteAsigned = async () => {
      await assignStopRouteToStudent(route_id, stop_id, student_id);
      Store.addNotification({
        title: `Se ha asignado una ruta correctamente`,
        message: `La ruta ${label} asignada correctamente`,
        type: "info",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      navigate(`/studentInfo/${id}`);
    };

    route_id && stop_id && submitRouteAsigned();
  };

  useEffect(() => {
    const getStudent = async (studentId: number) => {
      const studentData = await getStudentById(studentId);
      studentData && setStudent(studentData);
    };

    const getRoutes = async (studentId: number) => {
      const routes = await getNonAssignedRoutes(studentId);
      routes && setAllRoutes(routes);
    };

    id && getStudent(parseInt(id));
    id && getRoutes(parseInt(id));
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
        {allRoutes?.length === 0 || allRoutes === undefined ? (
          <EmptyList
            title="Vaya, tienes todas las rutas asignadas."
            text="No hay ninguna ruta que te puedas asignar, las has escogido todas ya, o no hay ninguna disponible."
          />
        ) : (
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
                              <button
                                className="stopCardToAssignButton"
                                onClick={() => navigate(`/map/${stop_id}`)}
                              >
                                Ver Parada
                              </button>
                              {routeIdToAssing === route_id && (
                                <button
                                  className="stopCardToAssignButton"
                                  onClick={() =>
                                    stop_id &&
                                    id &&
                                    submitRoute(
                                      route_id,
                                      stop_id,
                                      parseInt(id),
                                      label
                                    )
                                  }
                                >
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
        )}
      </div>
    </>
  );
};

export default AssignRoute;
