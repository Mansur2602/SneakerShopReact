import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

const Login = ({setUser}) =>
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("login/", { username, password });

      localStorage.setItem( "user", JSON.stringify({ username: response.data.user.username }));
      setUser({ username: response.data.user.username });
      console.log("Успешный вход:", response.data);
      navigate("/"); 
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Неверный логин или пароль");
    }
  };

    return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={HandleSubmit}>
        <h1 className="loginTitle">Вход</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} className="loginInput" type="text" placeholder="Логин"/>
        <input value={password} onChange={e => setPassword(e.target.value)} className="loginInput" type="password" placeholder="Пароль" />
        <button className="loginButton" type="submit"> Войти </button>
        <p>Или</p>
        <Link className="login" to="/register">Зарегистрироваться</Link>
      </form>
    </div>
  )
}
export default Login;