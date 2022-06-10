import React, { useContext, useEffect, useState } from 'react'
import OneProduct from "../../components/goodsList/oneProduct";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./shop.module.scss";
import axios from 'axios';
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

const Shop = () => {
    // const { good } = useContext(Context)
    const [goodsList, setGoods] = useState([]);
    const [typesList, setTypes] = useState([]);

    const getGoods = async () => {
        const response = await axios.get('https://mydiplomlevas.herokuapp.com/good/getAll');
        console.log(response.data);
        if (response.status === 200) setGoods(response.data);
    }

    const getTypes = async () => {
        const response = await axios.get('https://mydiplomlevas.herokuapp.com/type/getAll');
        console.log(response.data);
        if (response.status === 200) setTypes(response.data);
    }

    useEffect(() => {
        getTypes();
        getGoods();
        console.log(goodsList);
    }, []);

    return (
        <Grid p="30px" templateColumns="200px 1fr">
            <GridItem id={styles.filters}>
                {typesList.map(filter =>
                    <button key={filter.id} id={styles.filterBtn} onClick={() => console.log("Вибрано " + filter)}>{filter.name}</button>)}
            </GridItem>
            <GridItem id={styles.container}>
                <SimpleGrid minChildWidth='175px' spacing='20px'>
                    {goodsList.map((good) => (
                        <OneProduct key={good.id} param={good} />
                    ))}
                </SimpleGrid>
            </GridItem>
        </Grid>
    )
}

export default Shop;