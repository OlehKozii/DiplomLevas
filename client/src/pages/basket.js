import React, { useState, useEffect } from 'react'
import { Box, Container, VStack, Flex, Text, Image, Button, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, NumberInputField, NumberInput } from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons";
import axios from '../utils/axios';

const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    async function getBasket() {
        const response = await axios.get('basket/get');

        if (response.status === 200) {
            setBasket(response.data)
            const total = response.data.reduce((total, item) => total + item.price * item.count, 0);
            setTotalPrice(total);
        }
    }

    async function deleteGood({ id, itemPrice }) {
        const response = await axios.delete(`basket/${id}`);
        if (response.status === 200) {
            setBasket(basket.filter(item => item.id !== id));
            setTotalPrice(totalPrice - itemPrice)
        }
    }

    function recalculate() {
        const total = basket.reduce((total, item) => total + item.price * item.count, 0);
        setTotalPrice(total);
    }

    useEffect(() => {
        getBasket()
    }, []);

    return (
        <Container maxWidth={1080} paddingBottom="200px">
            {basket.length ?
                <VStack> 
                    {basket.map((item, i) => {
                            return (
                                <Flex key={i} w="100%" h="150px" rounded={10} bg="gray.200" m={4} p="15px 20px 15px 20px" justifyContent="space-between">
                                    <Flex>
                                        <Image h="100%" w="auto" rounded={5} src={item.image}/>
                                        <Flex mx={4} my={1} flexDirection="column" justifyContent="space-between">
                                            <Text fontSize="30px" color="gray.800" lineHeight="30px">{item.name}</Text>
                                            <NumberInput defaultValue={item.count} min={1} w="100px" bg="gray.100" rounded={2} onChange={(value) => {item.count = value; recalculate()}}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDir="column" justifyContent="space-between" alignItems="flex-end">
                                        <Button w="40px" h="40px" colorScheme="red" onClick={() => deleteGood({id: item.id, itemPrice: item.price * item.count})}>
                                            <DeleteIcon>
                                                
                                            </DeleteIcon>
                                        </Button>
                                        <Text mx={4} fontSize="30px" m="0" color="gray.600">{item.price}₴</Text>
                                    </Flex>
                                </Flex>
                            )}
                        )}
                    <Flex alignItems="center" alignSelf="end" borderWidth="2px" borderColor="green.300" rounded={5} bg="green.100" p="20px">
                        <Text fontSize="30px" marginRight="30px" color="gray.600">{totalPrice}₴</Text>
                        <Button colorScheme="green">Купити</Button>
                    </Flex>
            </VStack>
            :
            <Box position="fixed" top="50%" left="calc(50% - 30px)">
                <Text fontSize="40px">
                    Пусто
                </Text>
            </Box>
        }
        </Container>
    )
}

export default Basket; 