import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Flex,
  Text,
  Image,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  NumberInput,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "../utils/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  async function getBasket() {
    const response = await axios.get("user/getOrders");

    console.log(response.data);

    if (response.status === 200) {
      setOrders(response.data);
      // const total = response.data.reduce((total, item) => total + item.price * item.count, 0);
      // setTotalPrice(total);
    }
  }

  // async function deleteGood({ id, itemPrice }) {
  //     const response = await axios.delete(`basket/${id}`);
  //     if (response.status === 200) {
  //         setBasket(basket.filter(item => item.id !== id));
  //         setTotalPrice(totalPrice - itemPrice)
  //     }
  // }

  // function recalculate() {
  //     const total = basket.reduce((total, item) => total + item.price * item.count, 0);
  //     setTotalPrice(total);
  // }

  useEffect(() => {
    getBasket();
  }, []);

  return (
    <Container maxWidth={1080} paddingBottom="200px">
      {orders.length ? (
        <Accordion defaultIndex={[0]} allowMultiple m="50px">
          {orders.map((order) => (
            <AccordionItem bg="gray.100">
              <h2>
                <AccordionButton>
                  <Flex flex="1" justifyContent="space-between">
                    <Text>{order.time}</Text>
                    <Text>{order.state}</Text>
                    <Text>{order.price}₴</Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg="gray.100">
                {order.basket.map((item) => 
                    <Flex m="0 30px 0 60px" justifyContent="space-between" alignItems="center">
                        <Image src={item.image} h="80px" />
                        <Text>Кількість: {item.count}</Text>
                        <Text>{item.price}₴</Text>
                    </Flex> 
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Box position="fixed" top="50%" left="calc(50% - 30px)">
          <Text fontSize="40px">Пусто</Text>
        </Box>
      )}
    </Container>
  );
};

export default Orders;
