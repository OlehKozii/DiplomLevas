import React, { useEffect, useState } from 'react'
import OneProduct from "../components/goodsList/oneProduct";
import axios from '../utils/axios';
import { Box, FormLabel, Container, Select, SimpleGrid, DrawerHeader, DrawerBody, Checkbox, DrawerFooter, Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Flex } from "@chakra-ui/react";

const is = ["В наявності", "Закінчується", "Закінчився", "Очікується"]

const Shop = () => {
    const [typeID, setTypeID] = useState([])
    const [state, setState] = useState("")
    const [discount, setDiscount] = useState(false)
    const [goodsList, setGoods] = useState([]);
    const [typesList, setTypes] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const getGoods = async () => {
        let typeurl = [];
        typeID.forEach((id) => typeurl.push(`typeID=${id}`));
        const response = await axios.get(`good/getall?${typeurl.join("&")}&state=${state}&discount=${discount}`);
        console.log(response.data);
        if (response.status === 200) setGoods(response.data);
    }

    const getTypes = async () => {
        const response = await axios.get('type/getAll');
        console.log(response.data);
        if (response.status === 200) setTypes(response.data);
    }

    const check = (checked, filter) => {
        if (checked) {
            setTypeID([...typeID, filter]);
        }
        else {
            setTypeID([...typeID.filter((id) => filter !== id)])
        }


    }

    const toDefaults = () => {
        setState("");
        setTypeID([]);
        setDiscount(false);
        getGoods();

    }

    useEffect(() => {
        getTypes();
        getGoods();
        console.log(goodsList);
    }, []);


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
                    <DrawerHeader>Фільтер</DrawerHeader>

                    <DrawerBody>
                        <Box>
                            <Select color="black" placeholder='Наявність'>
                                {is.map((isfilter) =>
                                    <option key={isfilter} onClick={() => { setState(isfilter); }}>{isfilter}</option>
                                )}
                            </Select>
                        </Box>
                        <Flex flexDir="column">
                            {typesList.map((filter) =>

                                <Checkbox my="5px" key={filter.id} onChange={(e) => { check(e.target.checked, filter.id); }}>{filter.name}</Checkbox>

                            )}
                        </Flex>
                        <Box>
                            <FormLabel>Гарячі пропозиції</FormLabel>
                            <Checkbox onClick={() => { setDiscount(!discount); }}>Акційний товар</Checkbox>
                        </Box>
                        <Button variant='outline' mr={3} marginTop="7px" onClick={() => { toDefaults(); }}>
                            Скинути фільтри
                        </Button>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Скасувати
                        </Button>
                        <Button colorScheme='blue' onClick={() => { getGoods(); }}>Підтвердити</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </>
    )
}

export default Shop;