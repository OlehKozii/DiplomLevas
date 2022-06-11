import React, { useContext } from "react";
import { Context } from "../../index";
import styles from "./NavBar.module.scss";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import { Link } from "react-router-dom";
import { SHOP_ROUTE, BASKET_ROUTE, MAIN_ROUTE, NEWS_ROUTE, SIGN_IN } from "../../routes/const";
import { SimpleGrid, Button, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, Text, Box, useMediaQuery } from "@chakra-ui/react";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const [isSmallerThan830] = useMediaQuery('(max-width: 830px)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigator = useNavigate();
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('Token')
    navigator("/")
  }

  return (
    <>
      <SimpleGrid templateColumns="1fr 1fr 1fr" color="gray.200" id={styles.nav} >
        {!isSmallerThan830 ?
          <Box display="flex" justifyContent="start" alignItems='center' px="20px">
            <Link style={{ marginRight: "10px" }} to={MAIN_ROUTE}>Головна</Link>
            <Link style={{ marginRight: "10px" }} to={SHOP_ROUTE}>Продукти</Link>
            <Link style={{ marginRight: "10px" }} to={NEWS_ROUTE}>Новини</Link>
          </Box >
          :
          <Box></Box>
        }
        <Box display="flex" justifyContent='center' className="Logo" ><Link to={MAIN_ROUTE}><Text fontSize='35px'>Levas</Text></Link></Box >
        {!isSmallerThan830 ?
          <Box display="flex" justifyContent='end' alignItems='center' px="20px">
            {user._isAuth ?
              <div>
                <Link to={BASKET_ROUTE}><ShoppingCartIcon></ShoppingCartIcon></Link>
                <Link to="/"><FilterFramesIcon></FilterFramesIcon></Link>
                <Link to="/" onClick={() => logOut()}>Вийти</Link>
              </div>
              :
              <div>
                <Link to={SIGN_IN}>Логін</Link>
              </div>
            }
          </Box>
          :
          <Box display="flex" justifyContent='end' alignItems='center' px="20px">
            <Button onClick={onOpen} bg='black.800' fontSize="36px">≡</Button>
          </Box>
        }
      </SimpleGrid>

      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody py="50px" display="flex" onClick={onClose} flexDir="column" alignItems="center">
            <Link style={{ marginRight: "10px" }} to={MAIN_ROUTE}><Text fontSize='4xl'>Головна</Text></Link>
            <Link style={{ marginRight: "10px" }} to={SHOP_ROUTE}><Text fontSize='4xl'>Продукти</Text></Link>
            <Link style={{ marginRight: "10px" }} to={NEWS_ROUTE}><Text fontSize='4xl'>Новини</Text></Link>
            {user._isAuth ?
              <>
                <Link to={BASKET_ROUTE} onClick={onClose}><Text fontSize='4xl'>Кошик</Text></Link>
                <Link to="/"><Text fontSize='4xl'>Мої замовлення</Text></Link>
                <Link to="/" onClick={() => logOut()}><Text fontSize='4xl'>Вийти</Text></Link>
              </>
              :
              <>
                <Link to={SIGN_IN}><Text fontSize='4xl'>Логін</Text></Link>
              </>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default NavBar;
