import React, { useContext } from "react";
import { Context } from "../../index";
import styles from "./NavBar.module.scss";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import { Link } from "react-router-dom";
import { SHOP_ROUTE, BASKET_ROUTE, MAIN_ROUTE, NEWS_ROUTE, SIGN_IN } from "../../routes/const";

const NavBar = observer(() => {
  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('Token')
  }

  return (
    <div id={styles.nav}>
      <div id={styles.leftSide}>
        <div className="Logo">Levas</div>
        <Link to={MAIN_ROUTE}>Головна</Link>
        <Link to={SHOP_ROUTE}>Продукти</Link>
        <Link to={NEWS_ROUTE}>Новини</Link>
      </div >
      <div id={styles.rightSide}>
        {user._isAuth ?
          <div>
            <Link to={BASKET_ROUTE}><ShoppingCartIcon></ShoppingCartIcon> </Link>
            <Link to="/"><FilterFramesIcon></FilterFramesIcon></Link>
            <Link to="/" onClick={() => logOut()}>Вийти</Link>
          </div>
          :
          <div>
            <Link to={SIGN_IN}>Логін</Link>
          </div>
        }
      </div>
    </div >
  );
});

export default NavBar;
