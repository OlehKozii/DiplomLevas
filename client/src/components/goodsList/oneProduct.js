import React, { useContext } from "react";
import styles from "./oneProduct.module.scss";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { Box, Flex, Image, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GOOD_ROUTE } from "../../routes/const";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import axios from '../../utils/axios';

const cyrillicToTranslit = new CyrillicToTranslit();

const OneProduct = observer(({ param }) => {
    const navigator = useNavigate();
    const { good, user } = useContext(Context);
    const COLOR_MAP = {
        "В наявності": "green.300",
        "Закінчується": "yellow.400",
        "Закінчився": "red.500",
        "Очікується": "teal.400"
    }
    const goToGoodPage = () => {
        const name = cyrillicToTranslit.transform(param.name, '-').toLowerCase();
        good.setId(param.id);
        navigator(GOOD_ROUTE + `/${name}`)
    };


    const addToCart = async (e) => {
        e.stopPropagation();
        const response = await axios.post('basket/add', { goodId: param.id }, {
            headers: {
                'Authorization': localStorage.getItem("Token")
            }
        });

        if (response.status === 200) {

        };
    }


    return (
        <Box layerStyle="card" onClick={goToGoodPage}>
            <Image w="100%" objectFit="cover" src={param.image} alt="" />
            <Text noOfLines={1} textOverflow="ellipsis" fontSize='20px' my="10px" maxHeight={24} overflow="hidden" alignSelf="start">{param.name}</Text>
            <Text noOfLines={1} textOverflow="ellipsis" fontSize='20px' my="10px" maxHeight={24} overflow="hidden" alignSelf="start" color={COLOR_MAP[param.state]} >{param.state}</Text>
            <Flex justifyContent="space-between" w="80%">
                <div className="Price"><p style={{ fontSize: "24px" }}>{param.price}₴</p></div>
                <div className="Cart">
                    <Button colorScheme="teal" h="30px" isDisabled={!user.isAuth} onClick={(e) => addToCart(e)}>
                        Кошик
                        {/* <ShoppingCartIcon></ShoppingCartIcon> */}
                    </Button>
                    </div>
            </Flex>

        </Box>
    );
})

export default OneProduct;