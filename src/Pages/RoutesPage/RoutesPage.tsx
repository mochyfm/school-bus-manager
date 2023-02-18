/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
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
import { getAllRoutes } from "../../Services/main.services";

const RoutesPage = (props: { isLoaded: Boolean }) => {
  const { id } = useParams();
  const { isLoaded } = props;

  const [routesToDisplay, setRoutesToDisplay] = useState<BusRoute[]>();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      const fetchedRoutes = await getAllRoutes();
      setRoutesToDisplay(fetchedRoutes);
    };

    fetchRoutes();
  }, []);
  console.log(routesToDisplay);
  return (
    <div className="routesContainer">
      <div className="routesBlock">
        {routesToDisplay ? (
          <RoutesPanel routes={routesToDisplay} />
        ) : (
          <EmptyList
            title="¡Vaya que despiste!"
            text="Parece que no hay rutas creadas todavía, empieza por añadir algunas con los paneles de abajo"
          />
        )}
        <div className="routesButtonPanel">
          <button className="routePageButton">
            <GoDiffAdded />
          </button>
          {routesToDisplay && (
            <button className="routePageButton">
              <CgPlayListRemove />
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
