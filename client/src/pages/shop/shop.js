import React from 'react'
import OneProduct from "../../components/goodsList/oneProduct";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./shop.module.scss";

const Shop = observer(() => {

    return (
        <div id={styles.wrapper}>
            <div id={styles.filters}>
                Filter
                checkb
            </div>
            <div id={styles.container}>
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
                <OneProduct />
            </div>
        </div>
    )
})

export default Shop;