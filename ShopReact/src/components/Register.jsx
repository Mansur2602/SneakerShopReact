import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

const Register = ({setUser}) =>
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await apiClient.post("register/", { username, password });
    localStorage.setItem( "user", JSON.stringify({ username: response.data.user.username }));
    setUser({ username: response.data.user.username });
    console.log("Успешная регистрация:", response.data);
    navigate("/"); 
    }
    catch (error) {
        console.error("Ошибка при регистрации:", error);
        alert("Ошибка при регистрации");
    }
}


    return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={HandleSubmit}>
        <h1 className="loginTitle">Регистрация</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} className="loginInput" type="text" placeholder="Логин"/>
        <input value={password} onChange={e => setPassword(e.target.value)} className="loginInput" type="password" placeholder="Пароль" />
        <button className="loginButton" type="submit"> Зарегистрироваться </button>
        <p>Или</p>
        <Link className="login" to="/login">Войдите</Link>
      </form>
    </div>
  )
}
export default Register;