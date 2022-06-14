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
        <Accordion defaultIndex={[0]} allowMultiple>
          {orders.map((order) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Flex flex="1" justifyContent="space-between">
                    <Text>{order.time}</Text>
                    <Text>{order.price}₴</Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {order.basket.map((item) => 
                    <Box>
                        <Text>{item.id}</Text>
                        <Text>{item.count}</Text>
                    </Box> 
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