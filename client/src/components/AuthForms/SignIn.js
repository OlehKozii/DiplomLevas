import React from "react";
import styles from "./Forms.module.scss";

const SignInForm = () => {

    return (
        <div id={styles.form}>
            <h2>Увійти</h2>
            <input type='email' placeholder="Прізвище" />
            <input type='password' placeholder="Пароль" />
            <button>Увійти</button>
        </div >
    );
}

export default SignInForm;
