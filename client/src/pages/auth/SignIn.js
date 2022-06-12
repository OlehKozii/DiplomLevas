import React from "react";
import SignInForm from "../../components/AuthForms/SignIn";
import { observer } from "mobx-react-lite";
import styles from "./Auth.module.scss";

const SignUp = observer(() => {
    return <div id={styles.wrapper}>
        <SignInForm />
    </div>;
});

export default SignUp;
