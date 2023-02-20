import { useNavigate, useParams } from "react-router-dom";
import "./RouteForm.css";
import { useState } from "react";
import { RouteType, RouteTypeValue } from "../../Types/Types";
import Select, { SingleValue } from "react-select";
import { newRoute } from "../../Services/main.services";
import RouteEdition from "../../Components/RouteEdition/RouteEdition";

const DEFAULT_MESSAGES: RouteType[] = [
  {
    value: "op_def",
    type: "default",
    label: "Tipo de ruta...",
  },
  {
    value: "op_1",
    type: "one_way_trip",
    label: "Ruta de Ida al Colegio",
  },
  {
    value: "op_2",
    type: "return_trip",
    label: "Ruta de salida del Colegio",
  },
];

const RouteForm = (props: { isLoaded: boolean }) => {
  const { isLoaded } = props;
  const { id } = useParams();
  const [selectType, setSelectType] = useState<SingleValue<RouteType>>(
    DEFAULT_MESSAGES[0]
  );
  const navigate = useNavigate();

  const [label, setLabel] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setLabel(target.value);
    console.log(label);
  };

  const handleChange = (newValue: SingleValue<RouteType>) => {
    console.log(newValue);
    newValue && setSelectType(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const createRoute = async (route: {
      label: string;
      route_type: RouteTypeValue;
    }) => {
      await newRoute(route);
    };

    e.preventDefault();
    if (label.trim() !== "" && selectType && selectType.type !== "default") {
      createRoute({ label: label, route_type: selectType.type });
      navigate("/routes");
      window.location.reload();
    }
  };

  return (
    <div className="formRouteBody">
      {id ? (
        id && <RouteEdition id={parseInt(id)} isLoaded={isLoaded} />
      ) : (
        <form className="createRouteBlock" onSubmit={handleSubmit}>
          <div className="routeLabelBlock">
            <label htmlFor="label">Identificador de la Ruta</label>
            <input
              name="label"
              id="label"
              maxLength={3}
              size={2}
              onChange={handleInput}
            />
          </div>
          <div className="routeSelectBlock">
            <Select
              className="routeTypeSelect"
              value={selectType}
              required
              onChange={handleChange}
              options={DEFAULT_MESSAGES}
              name={selectType?.value}
            />
          </div>
          <button className="submitRouteButton">Guardar</button>
        </form>
      )}
    </div>
  );
};

export default RouteForm;
