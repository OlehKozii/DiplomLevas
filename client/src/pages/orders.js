import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "../utils/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  async function getBasket() {
    const response = await axios.get("user/getOrders");

    if (response.status === 200) {
      setOrders(response.data);
    }
  }

  useEffect(() => {
    getBasket();
  }, []);

  return (
    <Container maxWidth={1080} paddingBottom="200px">
      {orders.length ? (
        <Accordion defaultIndex={[0]} allowMultiple m="50px">
          {orders.map((order) => {
            const date = new Date(order.time);
            return (
              <AccordionItem bg="gray.100">
                <h2>
                  <AccordionButton>
                    <Flex flex="1" justifyContent="space-between">
                      <Text>{order.price}₴</Text>
                      <Text>{order.state}</Text>
                      <Text>{`${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg="gray.100">
                  {order.basket.map((item) =>
                    <Flex m="7px 30px 0 60px" border="dashed 1px" justifyContent="space-between" alignItems="center">
                      <Image src={item.image} h="80px" />
                      <Text>Кількість: {item.count}</Text>
                      <Text>{item.priceWithDiscount ?? item.price}₴</Text>
                    </Flex>
                  )}
                </AccordionPanel>
              </AccordionItem>
            )
          }

          )}
        </Accordion>
      ) : (
        <Box position="absolute" top="calc(50% - 84px)" left="calc(50% - 30px)">
          <Text fontSize="40px">Пусто</Text>
        </Box>
      )}
    </Container>
  );
};

export default Orders;
