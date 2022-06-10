import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Container, Heading, Button, Flex, Text, Spacer } from '@chakra-ui/react'

const Good = observer(() => {
    const { good } = useContext(Context);

    useEffect(() => {
        console.log('ID: ', good.id)
    }, []);

    return (
        <div>Good Page</div>
    )
})

export default Good;