import React, { useState, useEffect } from 'react'
import { Container, VStack, Flex, Text, Image, Button } from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons";
import axios from '../utils/axios';

const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    async function getBasket() {
        const response = await axios.get('basket/get', {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        });

        if (response.status === 200) {
            setBasket(response.data)
            const total = response.data.reduce((total, item) => total + item.price * item.count, 0);
            setTotalPrice(total);
        }
    }

    async function deleteGood(id) {
        await axios.delete(`basket/${id}`);
    }

    useEffect(() => {
        getBasket()

    }, []);

    return (
        <Container maxWidth={1080} paddingBottom="200px">
            <VStack>
                {basket &&
                    basket.map((item, i) => {
                            return (
                                <Flex key={i} w="100%" h="150px" rounded={10} bg="gray.200" m={4} p="15px 20px 15px 20px" justifyContent="space-between">
                                    <Flex>
                                        <Image h="100%" w="auto" rounded={5} src={item.image}/>
                                        <Text mx={4} fontSize="35px" color="gray.800">{item.name}</Text>
                                    </Flex>
                                    <Flex>X{item.count}</Flex>
                                    <Flex flexDir="column" justifyContent="space-between" alignItems="flex-end">
                                        <Button w="40px" h="40px" colorScheme="red" onClick={() => deleteGood(item.id)}>
                                            <DeleteIcon>
                                                
                                            </DeleteIcon>
                                        </Button>
                                        <Text mx={4} fontSize="30px" m="0" color="gray.600">{item.price}₴</Text>
                                    </Flex>
                                </Flex>
                            )}
                    )
                }
                <Flex alignItems="center" alignSelf="end" borderWidth="2px" borderColor="green.300" rounded={5} bg="green.100" p="20px">
                    <Text fontSize="30px" marginRight="30px" color="gray.600">{totalPrice}₴</Text>
                    <Button colorScheme="green">Купити</Button>
                </Flex>
            </VStack>
            
        </Container>
    )
}

export default Basket; 