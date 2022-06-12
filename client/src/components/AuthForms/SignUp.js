import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { SIGN_IN } from "../../routes/const";
import { Link } from "react-router-dom";
import { Button, Input, Heading, FormControl } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";


const SignUpForm = observer(() => {
    const { user } = useContext(Context);
    const navigator = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        const response = await axios.post('user/registration', { name, email, password });

        if (response.status === 200) {
            var decode = jwtDecode(response.data.token)
            user.setUser({
                id: decode.id,
                name: decode.name,
                email: decode.email,
                role: decode.role
            })
            user.setIsAuth(true)
            localStorage.setItem("Token", "Bearer " + response.data.token);
            navigator('/');
        };
    }

    return (
        <FormControl maxW='500px' bg='gray.200' rounded={10} p="20px" display='flex' flexDirection="column" alignItems="center">
            <Heading my="20px">Реєстрація</Heading>
            <Input bg='gray.100' w="80%" my="10px" type='text' placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} />
            <Input bg='gray.100' w="80%" my="10px" type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input bg='gray.100' w="80%" my="10px" type='password' placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button w="80%" my="10px" colorScheme="teal" onClick={submit}>Зареєструватись</Button>
            <Link to={SIGN_IN}>Увійти</Link>
        </FormControl>
    );
})

export default SignUpForm;
