import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios';
import { observer } from "mobx-react-lite";
import { SIGN_UP } from "../../routes/const";
import { Link } from "react-router-dom";
import { Button, Input, Heading, FormControl } from "@chakra-ui/react";

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
        const response = await axios.post('user/login', { email, password });
        if (response.status === 200) {
            user.setUser(true)
            user.setIsAuth(true)
            localStorage.setItem("Token", "Bearer " + response.data.token);
            navigator('/');
        };
    }

    return (
        <FormControl maxW='500px' bg='gray.200' rounded={10} p="20px" display='flex' flexDirection="column" alignItems="center">
            <Heading my="20px">Увійти</Heading>
            <Input bg='gray.100' w="80%" my="10px" type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input bg='gray.100' w="80%" my="10px" type='password' placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button w="80%" my="10px" colorScheme="teal" onClick={submit}>Увійти</Button>
            <Link to={SIGN_UP}>Реєстрація</Link>
        </FormControl>
    );
})

export default SignInForm;
