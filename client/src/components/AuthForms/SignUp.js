import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import styles from "./Forms.module.scss";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { SIGN_IN } from "../../routes/const";
import { Link } from "react-router-dom";

const SignUpForm = observer(() => {
    const { user } = useContext(Context);
    const navigator = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        const response = await axios.post('https://mydiplomlevas.herokuapp.com/user/registration', { name, email, password });

        if (response.status === 200) {
            user.setUser(true)
            user.setIsAuth(true)
            localStorage.setItem("Token", "Bearer " + response.data.token);
            navigator('/');
        };
    }

    return (
        <div id={styles.form}>
            <h2>Реєстрація</h2>
            <input type='text' placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} />
            <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={submit}>Зареєструватись</button>
            <Link to={SIGN_IN}>Увійти</Link>
        </div >
    );
})

export default SignUpForm;
