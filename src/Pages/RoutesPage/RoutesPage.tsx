/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../Components/Loading";
import Map from "../../Components/Map";
import { useState } from "react";
import { BusRoute } from "../../Types/Types";
import "./RoutesPage.css";
import RoutesPanel from "../../Components/RoutesPanel/RoutesPanel";
import EmptyList from "../../Components/EmptyList/EmptyList";

import { GoDiffAdded } from "react-icons/go";
import { CgPlayListRemove } from "react-icons/cg";
import { deleteRouteById, getAllRoutes } from "../../Services/main.services";

const RoutesPage = (props: { isLoaded: Boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoaded } = props;

  const [routesToDisplay, setRoutesToDisplay] = useState<BusRoute[]>();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    
    const deleteRoute = async () => {
      await deleteRouteById(id);
    };

    if (id) {
      deleteRoute();
      setRoutesToDisplay(
        routesToDisplay?.filter((element) => {
          return element.route_id !== id;
        })
      );
    }
  };

  useEffect(() => {

    const fetchRoutes = async () => {
      const fetchedRoutes = await getAllRoutes();
      setRoutesToDisplay(fetchedRoutes);
    };

    fetchRoutes();
  }, []);

  return (
    <div className="routesContainer">
      <div className="routesBlock">
        {routesToDisplay ? (
          <RoutesPanel routes={routesToDisplay} deleteMode={deleteMode} deleteFunction={handleDelete}/>
        ) : (
          <EmptyList
            title="¡Vaya que despiste!"
            text="Parece que no hay rutas creadas todavía, empieza por añadir algunas con los paneles de abajo"
          />
        )}
        <div className="routesButtonPanel">
          <button className="routePageButton" onClick={() => navigate('/routes/newRoute')}>
            <GoDiffAdded />
          </button>
          {routesToDisplay && (
            <button className="routePageButton" >
              <CgPlayListRemove onClick={() => setDeleteMode(!deleteMode)}/>
            </button>
          )}
        </div>
      </div>
      {id && (
        <div className="mapBlock">
          {isLoaded ? (
            <Map
              mapTopLefMenu={false}
              streetViewOption={false}
              mode={deleteMode ? `delete` : `none`}
            />
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};

export default RoutesPage;
