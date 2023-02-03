import { useNavigate } from "react-router-dom";
import "./OptionButton.css";
import { ReactElement } from "react";

import { BsMap } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsCoin } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';

import { BsFillBugFill } from 'react-icons/bs';

type ButtonProps = {
  text: string;
  to?: string;
  icon?: Icons;
  style?: React.CSSProperties;
};

type Icons = "Mapa" | "Usuarios" | "Servicios" | "Rutas" | "Guía" | "Ajustes";

const OptionButton = (props: ButtonProps) => {
  const { text, to, icon, style } = props;

  const navigate = useNavigate();

  function iconRenderer( icon: Icons | undefined ): ReactElement {
    switch (icon) {
        case 'Mapa':
            return <BsMap/>;
        case 'Usuarios':
            return <BsFillPersonFill/>
        case 'Servicios':
            return <BsCoin/>;
        case 'Rutas':
            return <GiPathDistance/>;
        case 'Guía':
            return <AiOutlinePaperClip/>;
        case 'Ajustes':
            return <IoSettingsSharp/>;
        default:
            return <BsFillBugFill/>;
    }
  }

  return (
    <div className="optionBackground">
        <button
        style={style}
        className="optionButton"
        onClick={() => navigate(to || "./map")}
        >
        {iconRenderer(icon)}
        
        <span style={style}>{text}</span>
        </button>
    </div>
    
  );
};

export default OptionButton;
