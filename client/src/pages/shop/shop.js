import React, { useContext, useEffect, useState } from 'react'
import OneProduct from "../../components/goodsList/oneProduct";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./shop.module.scss";
import axios from 'axios';
import { Grid, Container, GridItem, Select, SimpleGrid, DrawerHeader, DrawerBody, Input, Checkbox, DrawerFooter, Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";

const is = ["В наявності", "Закінчується", "Закінчився", "Очікується"]

const Shop = () => {
    // const { good } = useContext(Context)
    const [typeID, setTypeID] = useState("")
    const [state, setState] = useState("")
    const [discount, setDiscount] = useState(false)
    const [goodsList, setGoods] = useState([]);
    const [typesList, setTypes] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const getGoods = async () => {
        const response = await axios.get('https://mydiplomlevas.herokuapp.com/good/getAll', { typeID, state, discount });
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
    useEffect(() => {
        getTypes();
        getGoods();
        console.log(goodsList);
    }, [typeID, state, discount]);

    return (
        <>
            <Container p="30px" maxWidth="1500px">
                <Button ref={btnRef} colorScheme='teal' onClick={onOpen} marginBottom="15px">
                    Фільтри
                </Button>
                <SimpleGrid justifyItems="center" minChildWidth='250px' spacing='20px'>
                    {goodsList.map((good) => (
                        <OneProduct key={good.id} param={good} />
                    ))}
                </SimpleGrid>
            </Container>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Select marginBottom="5px" placeholder='Виберіть тип'>
                            {typesList.map((filter) =>
                                <option key={filter.id} onChange={() => setTypeID(filter.id)}>{filter.name}</option>
                            )}
                        </Select>
                        <Select color="black" placeholder='Наявність'>
                            {is.map((isfilter) =>
                                <option key={isfilter} onChange={(e) => setState(e.target.value)}>{isfilter}</option>
                            )}
                        </Select>
                        <Checkbox onChange={() => setDiscount(!discount)}>Акційний товар</Checkbox>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Скасувати
                        </Button>
                        <Button colorScheme='blue' onClick={getGoods}>Підтвердити</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Shop;