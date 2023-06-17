"use client";
import { useEffect, useState } from "react";
import "../styles/components/loginModal.css";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { URL } from "@/utilities/envariables";
export default function LoginModal({
  isLogin,
  onClickKillThis,
}: {
  isLogin: boolean;
  onClickKillThis: Function;
}) {
  const [isLoginS, setLoginState] = useState(isLogin);
  const [username, setUsername] = useState("");
  const regex: RegExp = /^[a-zA-Z0-9]*$/;
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  function onSucess(res: object) {
    // quando deu login ou register
  }
  function HandleSubmit(event: any) {
    event.preventDefault();
    const route = isLoginS ? "login" : "user";
    axios.post(URL + route, {
        username,
        password,
      })
      .then((Response) => onSucess(Response))
      .catch((err) => setError(err.response.data.message));
  }
  useEffect(() => setError(""), [password, username,isLoginS]);
  return (
    <div className="background">
      <div id="loginModal">
        <GrClose
          onClick={() => onClickKillThis()}
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
            cursor: "pointer",
            fontSize: "24px",
          }}
        />
        <h3>{isLoginS ? "LOGIN" : "REGISTRAR"}</h3>
        <h5 style={{ textAlign: "center" }}>{error && 'Erro:'} ‎  {error}</h5>
        <form>
          <label htmlFor="username">Usuário:</label>
          <input
            onBlur={({ target }) => {
              const valid = regex.test(target.value);
              if (!valid) {
                setError("Utilize apenas letras e números no usuário");
              }
            }}
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            required
          />
          <button id="button" onClick={(e) => HandleSubmit(e)} type="submit">
            Entrar
          </button>
          <u onClick={() => setLoginState(!isLoginS)}>
            {isLoginS
              ? "Não tem uma conta? Crie uma."
              : "Já tem uma conta? Entre com ela"}
          </u>
        </form>
      </div>
    </div>
  );
}
