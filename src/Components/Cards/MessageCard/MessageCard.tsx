import { Message } from "../../../Types/Types"

const MessageCard = (messages: Message) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { message_id, message, message_type, student_id, client_id } = messages;

  const getStringedType = (type : 'serious' | 'warning' | 'confirm') : string => {
    switch(type) {
      case 'confirm':
        return 'Mensaje de Confirmación'
      case 'serious':
        return 'Mensaje de Aviso'
      case 'warning':
        return 'Mensaje de Nota Grave'
    }
  }

  return (
    <div className={`cardBody ${message_type}Body`}>
      <h3>{getStringedType(message_type)}</h3>
      <p>{message}</p>
    </div>
  )
}

export default MessageCard