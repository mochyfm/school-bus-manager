import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MessageForm.css";
import {
  Message,
  MessageType,
  PredefinedMessage,
  Student,
} from "../../Types/Types";
import { getStudentById, sendMessage } from "../../Services/main.services";

import Select, { SingleValue } from "react-select";
import { Store } from "react-notifications-component";

const DEFAULT_MESSAGES: PredefinedMessage[] = [
  {
    value: "msg_1",
    type: "serious",
    label: "No se ha presentado en la parada",
  },
  {
    value: "msg_2",
    type: "serious",
    label: "No ha mantenido una actitud correcta en el vehículo",
  },
  { value: "msg_3", type: "serious", label: "Ha llegado tarde" },
  {
    value: "msg_4",
    type: "serious",
    label: "No se ha presentado con el uniforme",
  },
  {
    value: "msg_5",
    type: "serious",
    label: "Ha retrasado el horario previsto de la ruta a propósito",
  },
  {
    value: "msg_6",
    type: "confirm",
    label: "Ha llegado al centro correctamente",
  },
  {
    value: "custom_msg",
    type: "custom",
    label: "Personalizado...",
  },
];

const MessageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student>();

  const [messageToSend, setMessage] = useState<Message>();

  const [selectMessage, setSelectMessage] =
    useState<SingleValue<PredefinedMessage>>();

  useEffect(() => {
    const getStudent = async (studentId: number) => {
      const student = await getStudentById(studentId);
      student && setStudent(student);
    };

    id && getStudent(parseInt(id));
  }, [id]);

  const setMessageContent = (customMessage?: string) => {
    console.log(customMessage);
    setMessage({ ...(messageToSend as Message), message: customMessage });
  };

  const handleInput = ({
    target,
  }: {
    target: EventTarget & HTMLInputElement;
  }) => {
    setMessageContent(target.value.trim() !== "" ? target.value : undefined);
  };

  const handleChange = (newValue: SingleValue<PredefinedMessage>) => {
    console.log(newValue);
    newValue &&
      student &&
      setMessage({
        message_type: newValue.type as MessageType,
        message: newValue.type !== "custom" ? newValue.label : undefined,
        client_id: student?.client_id ? student?.client_id : 0,
        student_id: student?.student_id,
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitMessage = async (message: Message) => {
      try {
        await sendMessage(message);
        Store.addNotification({
          title: "¡Hecho!",
          message:
            'Enviado el mensaje "' +
            message.message +
            '" al alumno ' +
            student?.student_name,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        setSelectMessage(null);
        navigate(`/clients`);
      } catch (error) {
        console.log(error);
      }
    };
    messageToSend &&
      messageToSend?.message !== undefined &&
      id &&
      submitMessage(messageToSend);
    console.log(messageToSend);
    if (
      messageToSend?.message_type === undefined ||
      (messageToSend.message_type === "custom" &&
        messageToSend.message === undefined)
    ) {
      Store.addNotification({
        title: "AVISO",
        message: `Debe ${
          messageToSend && messageToSend.message_type === "custom"
            ? " escribir el mensaje personalizado "
            : " seleccionar el mensaje "
        }  que quiere enviar al alumno.`,
        type: "warning",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2500,
          onScreen: true,
        },
      });
    }
  };

  return (
    <div className="messageFormBody">
      <form className="messageForm" onSubmit={handleSubmit}>
        <div className="messageRow">
          <span>ID del estudiante: </span>
          <input
            disabled={true}
            name="student_id"
            value={
              student
                ? student.student_id
                : `No existe un estudiante con el id ${id}`
            }
            onChange={handleInput}
          />
        </div>
        <div className="messageRow">
          <span>Nombre del estudiante: </span>
          <input
            disabled
            name="student_name"
            value={
              student
                ? student.student_name
                : `No existe un estudiante con el id ${id}`
            }
          />
        </div>
        <div className="messageRow">
          <span>Seleccionar Mensaje</span>
          <Select
            className="select"
            value={selectMessage}
            required
            onChange={handleChange}
            options={DEFAULT_MESSAGES}
            name={selectMessage?.value}
          />
          {messageToSend?.message_type === "custom" && <input onChange={handleInput} maxLength={100}/>}
        </div>
        <div className={`messageRow`}>
          <button
            className={`${
              selectMessage?.type === "custom" &&
              messageToSend?.message === undefined &&
              "disabled"
            }`}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
