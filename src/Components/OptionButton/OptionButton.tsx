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
import { ButtonProps, Icons } from "../../Types/Types";

const OptionButton = (props: ButtonProps) => {
  const { text, to, icon, style } = props;

  const navigate = useNavigate();
  const ICON_SIZE = 100;

  function iconRenderer( icon: Icons = "Ajustes" ): ReactElement {
    switch (icon) {
        case 'Mapa':
            return <BsMap size={ICON_SIZE}/>;
        case 'Usuarios':
            return <BsFillPersonFill size={ICON_SIZE}/>
        case 'Servicios':
            return <BsCoin size={ICON_SIZE}/>;
        case 'Rutas':
            return <GiPathDistance size={ICON_SIZE}/>;
        case 'Guía':
            return <AiOutlinePaperClip size={ICON_SIZE}/>;
        case 'Ajustes':
            return <IoSettingsSharp size={ICON_SIZE}/>;
        default:
            return <BsFillBugFill size={ICON_SIZE}/>;
    }
  }

  return (
    <button className="optionButtonStyle" style={style} onClick={() => navigate(to || "./")}>
        {iconRenderer(icon)}
        <span>{text}</span>
    </button>
    
  );
};

export default OptionButton;
