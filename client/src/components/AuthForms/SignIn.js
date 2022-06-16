import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios';
import { observer } from "mobx-react-lite";
import { SIGN_UP } from "../../routes/const";
import { Link } from "react-router-dom";
import { Button, Input, Heading, FormControl, Box, FormErrorMessage } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import signInSchema from "../../validation/singin";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const SignInForm = observer(() => {
    const { user } = useContext(Context);
    const navigator = useNavigate();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema),
    });


    useEffect(() => {
        const token = localStorage.getItem("Token");
        console.log(token);
        if (token) {
            navigator('/')
        }
    }, []);

    const submit = async (values) => {
        if (values) {
            const response = await axios.post('user/login', { email: values.email, password: values.password });
            if (response.status === 200) {
                var decode = jwtDecode(response.data.token)
                user.setUser({
                    id: decode.id,
                    name: decode.name,
                    email: decode.email,
                    role: decode.role
                })
                if (user.user.role === "admin") {
                    user.setIsAdmin(true)
                }
                user.setIsAuth(true)
                localStorage.setItem("Token", "Bearer " + response.data.token);
                navigator('/');
            };
        }
        window.location.reload()
    }

    return (
        <Box w='500px' bg='gray.100' rounded={10} p="20px" display='flex' flexDirection="column" alignItems="center">
            <Heading my="20px">Увійти</Heading>
            <FormControl
                my="10px"
                px="40px"
                isInvalid={!!errors?.email?.message}
                errortext={errors?.email?.message}
            >
                <Input bg='gray.100' type='email' placeholder="Email"  {...register("email")} />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
                my="10px"
                px="40px"
                isInvalid={!!errors?.password?.message}
                errortext={errors?.password?.message}
            >
                <Input bg='gray.100' type='password' placeholder="Пароль" {...register("password")} />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button w="80%" my="10px" colorScheme="teal" onClick={handleSubmit(submit)}>Увійти</Button>
            <Link to={SIGN_UP}>Реєстрація</Link>
        </Box>
    );
})

export default SignInForm;
