import React, { useContext, useState } from "react";
import SignUpForm from "../../components/AuthForms/SignUp";
import { observer } from "mobx-react-lite";
import styles from "./Auth.module.scss";

const SignUp = observer(() => {
    return <div id={styles.wrapper}>
        <SignUpForm />
    </div>;
});

export default SignUp;
