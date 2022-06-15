import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { GOOD_ROUTE } from "../routes/const";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { observer } from "mobx-react-lite";
import { Box, Image, Text, Flex, Button } from "@chakra-ui/react";
import axios from '../utils/axios';

const cyrillicToTranslit = new CyrillicToTranslit();

const ProductCard = ({ param }) => {
  const navigator = useNavigate();
  const { good, user } = useContext(Context);
  const COLOR_MAP = {
    "В наявності": "green.300",
    "Закінчується": "yellow.400",
    "Закінчився": "red.500",
    "Очікується": "teal.400"
  }


  async function goToGoodPage() {
    const name = cyrillicToTranslit.transform(param.name, '-').toLowerCase();
    good.setId(param.id);
    navigator(GOOD_ROUTE + `/${name}`)
  };

  async function addToBasket(e) {
    e.stopPropagation();
    const response = await axios.post('basket/add', { goodId: param.id });

    if (response.status === 200) {

    };
  }

  return (
    <Box layerStyle="card" w="250px" m="20px" bg="gray.100" rounded="7px" onClick={goToGoodPage}>
      <Image w="100%" borderRadius="7px 7px 2px 2px" objectFit="cover" src={param.image} alt="" />
      <Box p="15px 10px 5px 10px">
        <Text noOfLines={1} textOverflow="ellipsis" fontSize='12px' maxHeight={24} overflow="hidden" alignSelf="start" color={COLOR_MAP[param.state]} >{param.state}</Text>
        <Text noOfLines={1} textOverflow="ellipsis" fontSize='16px' maxHeight={24} overflow="hidden" alignSelf="start" color="gray.600">{param.name}</Text>

        <Flex justifyContent="space-between" alignItems="center" w="100%" py="5px" px="5px">
          <div className="Price"><Text fontSize="24px" lineHeight="24px" as="del">{param.price}₴</Text></div>
          <div className="Cart">
            <Button isDisabled={!user.isAuth} colorScheme="teal" h="30px" onClick={(e) => addToBasket(e)}>
              Кошик
            </Button>
          </div>
        </Flex>
      </Box>
    </Box>
  )
}

export default ProductCard;