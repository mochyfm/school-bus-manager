import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import loginLogo from "./assets/loginLogo.png";
import { useState } from "react";

const pattern = {
  username: "",
  password: "",
};

type User = typeof pattern;

const LoginPage = () => {
  
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User>(pattern);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    setUserData({ ...userData, [target.name]: target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (userData.username.trim() !== "" && userData.password.trim() !== "") {
      navigate("/");
      setUserData(pattern);
    }
  };

  return (
    <div className="loginBackground">
      <div className="loginWebpage">
        <form className="loginBlock" onSubmit={handleSubmit}>
          <img
            alt="Logo Transportes Salesianos La Cuesta"
            src={loginLogo}
            className="logo"
          />
          <div className="loginForm">
            <input
              value={userData.username}
              name="username"
              className="textInput"
              placeholder="Nombre de Usuario"
              type="text"
              onChange={handleInput}
            />
            <input
              value={userData.password}
              name="password"
              className="textInput"
              placeholder="Contraseña"
              type="password"
              onChange={handleInput}
            />
            <button className="logInButton " type="submit">
              Log In
            </button>
          </div>
          <p>
            <Link to="missing_pass" className="link">
              ¿Has olvidado la contraseña?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
