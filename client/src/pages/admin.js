import React, { useState, useEffect, useContext } from 'react'
import { Option, Select, Container, Center, TableContainer, Table, Th, Image, Td, Tr, Thead, Tbody, Tfoot, TableCaption, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Button, Flex, Text, Spacer } from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons"
import NewProduct from '../components/admin/NewProduct'
import EditProduct from '../components/admin/EditProduct'
import AddProductType from '../components/admin/AddProductType'
import DeleteProductType from '../components/admin/DeleteProductType'
import AddArticle from '../components/admin/AddArticle'
import EditArticle from '../components/admin/EditArticle'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../utils/axios'
import { observer } from 'mobx-react-lite'
import { Context } from "../index";

const Admin = observer(() => {
    const MAP = {
        'Продукти': 'good/getall',
        'Користувачі': 'user/allUsers',
        'Статті': 'user/articles',
        'Замовлення': 'user/getAllOrders',
    }

    const { good } = useContext(Context);

    const [page, setPage] = useState('Продукти')
    const [data, setData] = useState([])

    const { isOpen: isNewProductOpen, onOpen: onNewProductOpen, onClose: onNewProductClose } = useDisclosure()
    const { isOpen: isEditProductOpen, onOpen: onEditProductOpen, onClose: onEditProductClose } = useDisclosure()
    const { isOpen: isAddProductTypeOpen, onOpen: onAddProductTypeOpen, onClose: onAddProductTypeClose } = useDisclosure()
    const { isOpen: isDeleteProductTypeOpen, onOpen: onDeleteProductTypeOpen, onClose: onDeleteProductTypeClose } = useDisclosure()
    const { isOpen: isAddArticleOpen, onOpen: onAddArticleOpen, onClose: onAddArticleClose } = useDisclosure()
    const { isOpen: isEditArticleOpen, onOpen: onEditArticleOpen, onClose: onEditArticleClose } = useDisclosure()

    async function getData(route) {
        const response = await axios.get(route, {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        });
        if (response.status === 200) {
            setData(response.data);
        }
    }

    useEffect(() => {
        setData([]);
        getData(MAP[page]);
    }, [page]);

    async function deleteProduct(id) {
        const response = await axios.delete(`good/${id}`);

        if (response.status === 200) {
            setData(data.filter(item => item.id !== id))
        }
    }

    function onEditProduct({ id, name, typeID, image, price, state }) {
        good.setId(id);
        good.setName(name);
        good.setTypeID(typeID);
        good.setImage(image);
        good.setPrice(price);
        good.setState(state);
        onEditProductOpen();
    }

    async function editArticle(id) {
        const response = await axios.delete(`good/${id}`);

        if (response.status === 200) {
            setData(data.filter(item => item.id !== id))
        }
    }

    async function deleteArticle(id) {
        const response = await axios.delete(`user/deleteArticle/${id}`);

        if (response.status === 200) {
            setData(data.filter(item => item.id !== id));
        }
    }

    async function setRole(role, id) {
        const response = await axios.post(`user/setRole/${id}`, { role });
        if (response) {
            getData(MAP['Користувачі']);
        }
    }

    async function deleteUser(id) {
        const response = await axios.delete(`user/deleteUser/${id}`);
        if (response) {
            setData(data.filter(user => user.id !== id));
        }
    }

    async function setOrderState(state, id) {
        const response = await axios.put(`user/setOrderState/${id}`, { state });
        if (response) {
            getData(MAP['Замовлення']);
        }
    }

    return (
        <Container display="flex" flexDirection="column" alignItems="center" p="30px" maxW="1000px">
            <Menu >
                <MenuButton width='170px' mb="30px" as={Button} rightIcon={<ChevronDownIcon />}>
                    {page}
                </MenuButton>
                <Center>
                    <MenuList>
                        <MenuItem onClick={() => setPage('Продукти')}>Продукти</MenuItem>
                        <MenuItem onClick={() => setPage('Користувачі')}>Користувачі</MenuItem>
                        <MenuItem onClick={() => setPage('Замовлення')}>Замовлення</MenuItem>
                        <MenuItem onClick={() => setPage('Статті')}>Статті</MenuItem>
                    </MenuList>
                </Center>
            </Menu>

            {page === 'Продукти' &&
                <>
                    <Button onClick={onNewProductOpen}>Добавити новий продукт</Button>
                    <Button onClick={onAddProductTypeOpen} my="7px" >Добавити новий тип продукту</Button>
                    <Button onClick={onDeleteProductTypeOpen} marginBottom="20px" >Видалити типи продукту</Button>

                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список продуктів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Зображення</Th>
                                    <Th>Назва</Th>
                                    <Th>Ціна</Th>
                                    <Th>Стан</Th>
                                    <Th>Змінити</Th>
                                    <Th>Видалити</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(product => (
                                    <Tr>
                                        <Td><Image h="50px" src={product.image} rounded={5} /></Td>
                                        <Td>{product.name}</Td>
                                        <Td textAlign="center">{product.price}₴</Td>
                                        <Td textAlign="center">{product.state}</Td>
                                        <Td textAlign="center"><Button colorScheme="teal" onClick={() => onEditProduct(product)}><EditIcon /></Button></Td>
                                        <Td textAlign="center"><Button colorScheme="red" onClick={() => deleteProduct(product.id)}><DeleteIcon /></Button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Зображення</Th>
                                    <Th>Назва</Th>
                                    <Th>Ціна</Th>
                                    <Th>Стан</Th>
                                    <Th>Змінити</Th>
                                    <Th>Видалити</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </>
            }

            {
                page === 'Користувачі' &&
                <>
                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список усіх користувачів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ім'я</Th>
                                    <Th>Email</Th>
                                    <Th>Роль</Th>
                                    <Th>Видалити</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(user => (
                                    <Tr>
                                        <Td>{user.id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <Select value={user.role} onChange={(e) => setRole(e.target.value, user.id)}>
                                                <option>customer</option>
                                                <option>admin</option>
                                            </Select>
                                        </Td>
                                        <Td><Button colorScheme="red" onClick={() => deleteUser(user.id)}><DeleteIcon /></Button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ім'я</Th>
                                    <Th>Email</Th>
                                    <Th>Роль</Th>
                                    <Th>Видалити</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </>
            }

            {
                page === 'Замовлення' &&
                <>
                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список усіх користувачів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ціна</Th>
                                    <Th>Стан</Th>
                                    <Th>Дата та час</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(order => (
                                    <Tr>
                                        <Td>{order.id}</Td>
                                        <Td>{order.price}₴</Td>
                                        <Td>
                                            <Select value={order.state} onChange={(e) => setOrderState(e.target.value, order.id)}>
                                                <option>В обробці</option>
                                                <option>Очікує отримання</option>
                                                <option>Скасовано</option>
                                            </Select>
                                        </Td>
                                        <Td>{order.time}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ціна</Th>
                                    <Th>Стан</Th>
                                    <Th>Дата та час</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </>
            }

            {
                page === 'Статті' &&
                <>
                    <Button marginBottom="20px" onClick={onAddArticleOpen}>Добавити статтю</Button>

                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список усіх користувачів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Заголовок</Th>
                                    <Th>Уривок тексту</Th>
                                    <Th>Змінити</Th>
                                    <Th>Видалити</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(article => (
                                    <Tr>
                                        <Td>{article.id}</Td>
                                        <Td>{article.header}</Td>
                                        <Td>{article.text}</Td>
                                        <Td><Button colorScheme="teal" onClick={() => editArticle(article.id)}><EditIcon /></Button></Td>
                                        <Td><Button colorScheme="red" onClick={() => deleteArticle(article.id)}><DeleteIcon /></Button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Заголовок</Th>
                                    <Th>Уривок тексту</Th>
                                    <Th>Змінити</Th>
                                    <Th>Видалити</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </>
            }

            <NewProduct
                isOpen={isNewProductOpen}
                onClose={onNewProductClose}
                cb={() => getData(MAP['Продукти'])}
            />
            <EditProduct
                isOpen={isEditProductOpen}
                onClose={onEditProductClose}
                cb={() => getData(MAP['Продукти'])} />
            <AddProductType
                isOpen={isAddProductTypeOpen}
                onClose={onAddProductTypeClose} />
            <DeleteProductType
                isOpen={isDeleteProductTypeOpen}
                onClose={onDeleteProductTypeClose} />
            <AddArticle
                isOpen={isAddArticleOpen}
                onClose={onAddArticleClose}
                cb={() => getData(MAP['Статті'])} />
            <EditArticle
                isOpen={isEditArticleOpen}
                onClose={onEditArticleClose} />

        </Container >


    )
})

export default Admin;