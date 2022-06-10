import React, { useState, useContext, useEffect } from "react";
import styles from "./Forms.module.scss";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { SIGN_UP } from "../../routes/const";
import { Link } from "react-router-dom";

const SignInForm = observer(() => {
    const { user } = useContext(Context);
    const navigator = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("Token");
        console.log(token);
        if (token) {
            navigator('/')
        }
    }, []);

    const submit = async () => {
        const response = await axios.post('https://mydiplomlevas.herokuapp.com/user/login', { email, password });
        if (response.status === 200) {
            user.setUser(true)
            user.setIsAuth(true)
            localStorage.setItem("Token", "Bearer " + response.data.token);
            navigator('/');
        };
    }

    return (
        <div id={styles.form}>
            <h2>Увійти</h2>
            <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={submit}>Увійти</button>
            <Link to={SIGN_UP}>Реєстрація</Link>
        </div >
    );
})

export default SignInForm;
