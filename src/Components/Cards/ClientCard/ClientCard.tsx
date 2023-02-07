import { getAddressFrom } from "../../../Services/Services";
import { ClientData, Service, Student } from "../../../Types/Types";
import ServiceCard from "../ServiceCard";
import "./ClientCard.css";

const ClientCard = (props: ClientData) => {
  const { name, studentsAssigned, service } = props;

  return (
    <div className="cardBody">
      <h2 className="cardTitle">{name}</h2>
      <h3 className="cardSubtitle">Con correspondencia a: </h3>
      <div>
        <>
          {studentsAssigned &&
            studentsAssigned.map((element, index) => {
              const { name, service }: Student = element;
              return (
                <div key={index}>
                  <h5>{name}</h5>
                  <div>
                    <ServiceCard
                      route={service.route}
                      type={`${service.type}`}
                    />
                  </div>
                </div>
              );
            })}
        </>
      </div>
    </div>
  );
};

export default ClientCard;
