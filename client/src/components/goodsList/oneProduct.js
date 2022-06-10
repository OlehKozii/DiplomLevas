import React from "react";
// import { Context } from "../../index";
import styles from "./oneProduct.module.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";


const OneProduct = ({ good }) => {
    return (
        <div id={styles.item}>
            <div>
                <div className="state"></div>
                <img id={styles.img} src={good.image} alt="" />
            </div>
            <div><p id={styles.name}>{good.name}</p></div>
            <div id={styles.price}>
                <div className="Price">{good.price}₴</div>
                <div className="Cart">
                    <button id={styles.cartBtn} onClick={() => console.log("Added to the cart")}><ShoppingCartIcon></ShoppingCartIcon></button>
                </div>
            </div>

        </div >
    );
}

export default OneProduct;