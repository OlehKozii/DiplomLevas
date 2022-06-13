import React, { useState, useEffect } from 'react'
import { Container, Center, TableContainer, Table, Th, Image, Td, Tr, Thead, Tbody, Tfoot, TableCaption, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Button, Flex, Text, Spacer } from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons"
import NewProduct from '../components/admin/NewProduct'
import EditProduct from '../components/admin/EditProduct'
import AddProductType from '../components/admin/AddProductType'
import Users from '../components/admin/Users'
import Orders from '../components/admin/Orders'
import AddArticle from '../components/admin/AddArticle'
import EditArticle from '../components/admin/EditArticle'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../utils/axios'

const Admin = () => {
    const MAP = {
        'Продукти': 'good/getall',
        'Користувачі': 'user/allUsers',
        'Статті': 'user/articles',
        'Замовлення': 'user/getAllOrders',
    }

    const [page, setPage] = useState('Продукти')
    const [data, setData] = useState([])

    const { isOpen: isNewProductOpen, onOpen: onNewProductOpen, onClose: onNewProductClose } = useDisclosure()
    const { isOpen: isEditProductOpen, onOpen: onEditProductOpen, onClose: onEditProductClose } = useDisclosure()
    const { isOpen: isAddProductTypeOpen, onOpen: onAddProductTypeOpen, onClose: onAddProductTypeClose } = useDisclosure()
    const { isOpen: isUsersOpen, onOpen: onUsersOpen, onClose: onUsersClose } = useDisclosure()
    const { isOpen: isOrdersOpen, onOpen: onOrdersOpen, onClose: onOrdersClose } = useDisclosure()
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
                    <Button onClick={onAddProductTypeOpen} marginBottom="20px" >Добавити новий тип продукту</Button>

                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список продуктів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Зображення</Th>
                                    <Th>Назва</Th>
                                    <Th>Ціна</Th>
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
                                        <Td textAlign="center"><Button colorScheme="teal"><EditIcon /></Button></Td>
                                        <Td textAlign="center"><Button colorScheme="red" onClick={() => deleteProduct(product.id)}><DeleteIcon /></Button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Зображення</Th>
                                    <Th>Назва</Th>
                                    <Th>Ціна</Th>
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
                    <Button onClick={onUsersOpen} marginBottom="20px">Список користувачів</Button>

                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список усіх користувачів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ім'я</Th>
                                    <Th>Email</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(user => (
                                    <Tr>
                                        <Td>{user.id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ім'я</Th>
                                    <Th>Email</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </>
            }

            {
                page === 'Замовлення' &&
                <>
                    <Button onClick={onOrdersOpen} marginBottom="20px">Переглянути замовлення</Button>

                    <TableContainer>
                        <Table bg='gray.200' variant='striped' rounded={10}>
                            <TableCaption>Список усіх користувачів</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ціна</Th>
                                    <Th>Дата та час</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(order => (
                                    <Tr>
                                        <Td>{order.id}</Td>
                                        <Td>{order.price}₴</Td>
                                        <Td>{order.time}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Ідентифікатор</Th>
                                    <Th>Ціна</Th>
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
                    <Button onClick={onAddArticleOpen}>Добавити статтю</Button>
                    <Button onClick={onEditArticleOpen}>Редагувати статтю</Button>


                </>
            }

            <NewProduct
                isOpen={isNewProductOpen}
                onClose={onNewProductClose}
            />
            <EditProduct
                isOpen={isEditProductOpen}
                onClose={onEditProductClose} />
            <AddProductType
                isOpen={isAddProductTypeOpen}
                onClose={onAddProductTypeClose} />
            <Users
                isOpen={isUsersOpen}
                onClose={onUsersClose} />
            <Orders
                isOpen={isOrdersOpen}
                onClose={onOrdersClose} />
            <AddArticle
                isOpen={isAddArticleOpen}
                onClose={onAddArticleClose} />
            <EditArticle
                isOpen={isEditArticleOpen}
                onClose={onEditArticleClose} />

        </Container >


    )
}

export default Admin;