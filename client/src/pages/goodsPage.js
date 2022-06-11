import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Container, Box, Image, SimpleGrid, Heading, Button, Flex, Text, Spacer, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import axios from "axios";

const Good = observer(() => {
    const { good } = useContext(Context);
    const [data, setData] = useState({
        name: 'Test name',
        image: 'http://res.cloudinary.com/hsu9dlm7f/image/upload/v1654894371/avatar/ftdwzmh5tdbei3rkupgb.jpg'
    });

    async function getData() {
        const response = await axios.get(`https://mydiplomlevas.herokuapp.com/good/${good.id}`);
        console.log(response.data);
        if (response.status === 200) {
            setData(response.data[0]);
            console.log(response.data[0]);
            console.log(data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container p={30} maxWidth={1080}>
            <Box bg="whiteAlpha.500" rounded={10} p={15}>
                <Heading>{data.name}</Heading>
                <SimpleGrid templateColumns="1fr 1fr">
                    <Box>
                        <Image src={data.image} rounded={3} w="100%" h="auto" objectFit="cover" />
                    </Box>
                    <Box display='flex' flexDirection="column" justifyContent="flex-end">
                        <Box>
                        </Box>
                        <Box borderWidth='1px' borderColor="gray.500" rounded={10} p="15px" mx="40px">
                            <Flex marginBottom="10px" justifyContent="space-between" alignItems="end">
                                <Text fontSize="35px">123$</Text>
                                <Flex fontSize="18px">
                                    Кількість:
                                    <NumberInput marginLeft="10px" size='xs' maxW={14} defaultValue={1} min={1}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                            </Flex>
                            <Button width="100%" colorScheme="teal">Купити</Button>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>
            <Box bg="whiteAlpha.500" rounded={10} p={15} my='20px'>
                <Heading>Характеристики</Heading>
            </Box>
        </Container >
    )
})

export default Good;