import React, { useContext } from "react";
import styles from "./oneProduct.module.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { Box, Flex, Image, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GOOD_ROUTE } from "../../routes/const";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";


const cyrillicToTranslit = new CyrillicToTranslit();

const OneProduct = observer(({ param }) => {
    const navigator = useNavigate();
    const { good } = useContext(Context);

    const goToGoodPage = () => {
        const name = cyrillicToTranslit.transform(param.name, '-').toLowerCase();
        good.setId(param.id);
        navigator(GOOD_ROUTE + `/${name}`)
    };

    return (
        <Box layerStyle="card" onClick={goToGoodPage}>
            <div>
                <div className="state"></div>
                <Image minHeight="220px" w="100%" objectFit="cover" src={param.image} alt="" />
            </div>
            <Text noOfLines={1} isTruncated fontSize='20px' my="10px" maxHeight={24} overflow="hidden" alignSelf="start">{param.name}</Text>
            <Flex justifyContent="space-between" w="80%">
                <div className="Price"><p style={{ fontSize: "24px" }}>{param.price}₴</p></div>
                <div className="Cart">
                    <Button colorScheme="teal" h="30px" onClick={() => console.log("Added to the cart")}><ShoppingCartIcon></ShoppingCartIcon></Button>
                </div>
            </Flex>

        </Box>
    );
})

export default OneProduct;