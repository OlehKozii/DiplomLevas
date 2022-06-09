import React from "react";
// import { Context } from "../../index";
import styles from "./Forms.module.scss";

const SignUpForm = () => {

    return (
        <div id={styles.form}>
            <h2>Реєстрація</h2>
            <input type='text' placeholder="Ім'я" />
            <input type='email' placeholder="Прізвище" />
            <input type='password' placeholder="Пароль" />
            <button>Зареєструватись</button>
        </div >
    );
}

export default SignUpForm;
