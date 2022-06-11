import React, { useState, useEffect } from 'react'
import { Container, TableContainer, Th, Tr, Thead, TableCaption, Table, Tbody, Tfoot } from '@chakra-ui/react'
import axios from 'axios';

const Basket = () => {
    const [basket, setBasket] = useState([]);

    async function getBasket() {
        const response = await axios.get('https://mydiplomlevas.herokuapp.com/basket/get', {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        });
    }

    useEffect(() => {
        getBasket()

    }, []);

    return (
        <Container>
            {console.log(basket)}
        </Container>
    )
}

export default Basket;