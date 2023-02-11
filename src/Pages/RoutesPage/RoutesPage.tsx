/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import Loading from "../../Components/Loading";
import Map from "../../Components/MapComponents/Map";
import { useState } from "react";
import { BusRoute, BusStop } from "../../Types/Types";
import "./RoutesPage.css";
import RouteCard from "../../Components/Cards/RouteCard";
import RoutesPanel from "../../Components/RoutesPanel";
import { AiOutlineDelete } from "react-icons/ai";
import { CgAdd } from "react-icons/cg";

const RoutesPage = (props: { isLoaded: Boolean }) => {
  const { isLoaded } = props;
  const { id } = useParams();

  const [routeToDisplay, setRouteToDisplay] = useState<BusRoute>();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  return (
    <div className="routesContainer">
      <div className="routesBlock">
        <div className="routesInfoDisplay">
          {/* {id ? (
            <>
              <RouteCard
                routeInfo={}
                showRoute={setRouteToDisplay}
                onDeleteClick={() => console.log("Borrar")}
              />
            </>
          ) : (
            <>
              <RoutesPanel
                routesList={}
                showDelete={deleteMode}
                showRoute={setRouteToDisplay}
                onDelete={}
              />
            </>
          )} */}
        </div>
        {!id && (
          <div className="routesButtonPanel">
            <button className="routesButton">
              <CgAdd />
            </button>
            <button
              className="routesButton"
              onClick={() => setDeleteMode(!deleteMode)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        )}
      </div>
      <div className="mapBlock">
        {isLoaded ? (
          <Map
            busStops={routeToDisplay && routeToDisplay.stops}
            mapTopLefMenu={false}
            streetViewOption={false}
            mode={deleteMode ? `delete` : `none`}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default RoutesPage;
