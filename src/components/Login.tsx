"use client";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import "../styles/components/loginModal.css";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GrClose } from "react-icons/gr";
import { URL } from "@/utilities/envariables";
import { encryptData } from "@/utilities/functions/CryptoFunctions";
export default function LoginModal({
  isLogin,
  onClickKillThis,
  setUI,
}: {
  isLogin: boolean;
  onClickKillThis: Function;
  setUI: Function,
}) {
  const [isLoginS, setLoginState] = useState(isLogin);
  const [username, setUsername] = useState("");
  const regex: RegExp = /^[a-zA-Z4-9]*$/;
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const buttonRef = useRef(null)
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);
  function onSucess(res: AxiosResponse) {
    if (!window) return
    console.log(res)
    const encrypted = encryptData(JSON.stringify(res.data))
    window.localStorage.setItem('UVC_3.0_DATA-LOGIN', encrypted)
    document.body.style.overflowY = "visible";
    setUI()
    onClickKillThis()
  }
  function HandleSubmit(event: any) {
    //@ts-ignore
    buttonRef.current.disabled = true
    event.preventDefault();
    const route = isLoginS ? "api/login" : "api/user";
    axios.post(URL + route, {
        username,
        password,
      })
      .then((Response) => onSucess(Response))
      .catch((err) => {
        //@ts-ignore
        buttonRef.current.disabled = false
        if (err.response) {
          if (err.response.data.message) return setError(err.response.data.message)
          setError(err.response.data)
        } else {
          setError('Algo deu errado.')
        }
      });
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
        <h5 className="error" style={{ textAlign: "center" }}>{error && 'Erro:'} {error}</h5>
        <form>
          <label htmlFor="username">Usuário:</label>
          <input
            onBlur={({ target }) => {
              const regex = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{3,}$/;
              if (!regex.test(target.value)) {
                if (target.value.length <= 3) {
                  setError("O usuário deve ter pelo menos 3 caracteres");
                } else {
                  setError("Utilize apenas letras e números no usuário");
                }
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
            onBlur={({target}) => { if (target.value.length < 3) {setError('A senha deve ter pelo menos 3 caracteres')} }}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            required
          />
          <button disabled={!(error === '')} ref={buttonRef} id="button" onClick={(e) => HandleSubmit(e)} type="submit">
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
