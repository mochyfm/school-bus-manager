import React from "react";
import missingLogo from "./assets/emptyUserList.jpg";
import './EmptyList.css';

const EmptyList = (props: { title: string; text: string }) => {
    const { text, title } = props;

  return (
    <div className="emptyBlockBody">
      <h2>{title}</h2>
      <p>{text}</p>
      <img className="emptyImage" src={missingLogo} alt="Lista de Clientes vacía" />
    </div>
  );
};

export default EmptyList;
