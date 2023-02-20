import { useParams } from "react-router-dom";

const RouteForm = (props: { isLoaded: boolean }) => {
  const { id } = useParams();

  return (
    <>
      {id ? (
        <div></div>
      ) : (
        <div>
          <label htmlFor="">Identificador de la Ruta</label>
          <input maxLength={3} size={3}/>
        </div>
      )}
    </>
  );
};

export default RouteForm;
