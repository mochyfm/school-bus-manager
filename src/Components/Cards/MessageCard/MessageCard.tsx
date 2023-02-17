import { Message, MessageType } from "../../../Types/Types";
import "./MessageCard.css";

const MessageCard = (messages: Message) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { message, message_type, sended_at } = messages;

  const getStringedType = (type: MessageType): string => {
    switch (type) {
      case "confirm":
        return "Mensaje de Confirmación";
      case "serious":
        return "Nota Grave";
      case "warning":
        return "Nota Leve";
      case "info":
        return "Mensaje Informativo"
      case "custom":
        return "Mensaje Personalizado";    
      }
  };

  return (
    <div className={`messageCardBody ${message_type}Body`}>
        <h3>{getStringedType(message_type)}</h3>
      <div className="messageBody">
        <p>{message}</p>
      </div>
      {message_type === 'info' && <div></div>}
      <div>{sended_at ? sended_at : ''}</div>
    </div>
  );
};

export default MessageCard;
