import React from "react";
// import { Context } from "../../index";
import styles from "./oneProduct.module.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";


const OneProduct = () => {

    return (
        <div id={styles.item}>
            <div>
                <div className="state"></div>
                <img id={styles.img} src="https://src.zakaz.atbmarket.com/cache/photos/12375/catalog_product_gal_12375.jpg" alt="" />
            </div>
            <div><p id={styles.name}>Молоко 0,9 кг Своя Лінія ультрапастеризоване 1%</p></div>
            <div id={styles.price}>
                <div className="Price">32000$</div>
                <div className="Cart">
                    <button id={styles.cartBtn} onClick={() => console.log("Added to the cart")}><ShoppingCartIcon></ShoppingCartIcon></button>
                </div>
            </div>

        </div >
    );
}

export default OneProduct;