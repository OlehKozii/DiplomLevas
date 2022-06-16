import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios';
import { observer } from "mobx-react-lite";
import { SIGN_IN } from "../../routes/const";
import { Link } from "react-router-dom";
import { Button, Input, Heading, FormControl, FormErrorMessage, Box } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import signUpSchema from "../../validation/singup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


const SignUpForm = observer(() => {
    const { user } = useContext(Context);
    const navigator = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const submit = async (values) => {
        const { name, email, password } = values;
        const response = await axios.post('user/registration', { name, email, password });

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
        window.location.reload()
    }

    return (
        // <FormControl maxW='500px' bg='gray.200' rounded={10} p="20px" display='flex' flexDirection="column" alignItems="center">
        //     <Heading my="20px">Реєстрація</Heading>
        //     <Input bg='gray.100' w="80%" my="10px" type='text' placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} />
        //     <Input bg='gray.100' w="80%" my="10px" type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <Input bg='gray.100' w="80%" my="10px" type='password' placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <Button w="80%" my="10px" colorScheme="teal" onClick={submit}>Зареєструватись</Button>
        //     <Link to={SIGN_IN}>Увійти</Link>
        // </FormControl>
        <Box w='500px' bg='gray.100' rounded={10} p="20px" display='flex' flexDirection="column" alignItems="center">
            <Heading my="20px">Реєстрація</Heading>
            <FormControl
                my="10px"
                px="40px"
                isInvalid={!!errors?.name?.message}
                errortext={errors?.name?.message}
            >
                <Input bg='gray.100' placeholder="Name"  {...register("name")} />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
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
        </Box>
    );
})

export default SignUpForm;
