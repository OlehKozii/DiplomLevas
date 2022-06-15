import React, { useEffect, useState } from 'react'
import OneProduct from "../components/goodsList/oneProduct";
import ProductCard from '../components/ProductCard';
import axios from '../utils/axios';
import { useMediaQuery } from '@chakra-ui/react';
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

    const [isLargerThan1380] = useMediaQuery('(min-width: 1380px)')
    const [isLargerThan1130] = useMediaQuery('(min-width: 1130px)')
    const [isLargerThan855] = useMediaQuery('(min-width: 855px)')
    const [isLargerThan550] = useMediaQuery('(min-width: 550px)')

    const getColumns = () => {
        return isLargerThan1380 ? 5 : (isLargerThan1130 ? 4 : (isLargerThan855 ? 3 : (isLargerThan550 ? 2 : 1)));
    }

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
            <Container p="30px" maxWidth="1500px" display="flex" flexDir="column" alignItems="center">
                <Button ref={btnRef} colorScheme='teal' onClick={onOpen} marginBottom="15px" w="200px">
                    Фільтри
                </Button>
                <SimpleGrid templateColumns={`repeat(${getColumns()}, 250px)`} justifyItems="center" minChildWidth='250px' spacing='20px'>
                    {goodsList.map((good) => (
                        <ProductCard key={good.id} param={good} />
                    ))}
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
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