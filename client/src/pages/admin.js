import React, { useState } from 'react'
import { Container, Center, Heading, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Button, Flex, Text, Spacer } from '@chakra-ui/react'
import NewProduct from '../components/admin/NewProduct'
import EditProduct from '../components/admin/EditProduct'
import AddProductType from '../components/admin/AddProductType'
import Users from '../components/admin/Users'
import Orders from '../components/admin/Orders'
import AddArticle from '../components/admin/AddArticle'
import EditArticle from '../components/admin/EditArticle'

const Admin = () => {
    // const [addGmodal, setAddGmodal] = useState(false)
    const { isOpen: isNewProductOpen, onOpen: onNewProductOpen, onClose: onNewProductClose } = useDisclosure()
    const { isOpen: isEditProductOpen, onOpen: onEditProductOpen, onClose: onEditProductClose } = useDisclosure()
    const { isOpen: isAddProductTypeOpen, onOpen: onAddProductTypeOpen, onClose: onAddProductTypeClose } = useDisclosure()
    const { isOpen: isUsersOpen, onOpen: onUsersOpen, onClose: onUsersClose } = useDisclosure()
    const { isOpen: isOrdersOpen, onOpen: onOrdersOpen, onClose: onOrdersClose } = useDisclosure()
    const { isOpen: isAddArticleOpen, onOpen: onAddArticleOpen, onClose: onAddArticleClose } = useDisclosure()
    const { isOpen: isEditArticleOpen, onOpen: onEditArticleOpen, onClose: onEditArticleClose } = useDisclosure()

    return (
        <Container display="flex" flexDirection="column" alignItems="center" p="30px">
            <Menu >
                <MenuButton width='70px' as={Button} >
                    ...
                </MenuButton>
                <Center>
                    <MenuList>
                        <MenuItem>Продукти</MenuItem>
                        <MenuItem>Типи</MenuItem>
                        <MenuItem>Користувачі</MenuItem>
                        <MenuItem>Замовлення</MenuItem>
                    </MenuList>
                </Center>
            </Menu>

            <Button onClick={onNewProductOpen}>Добавити новий продукт</Button>
            <Button onClick={onEditProductOpen}>Редагувати продукт</Button>
            <Button onClick={onAddProductTypeOpen} >Добавити новий тип продукту</Button>
            <Button onClick={onUsersOpen}>Список користувачів</Button>
            <Button onClick={onOrdersOpen}>Переглянути замовлення</Button>
            <Button onClick={onAddArticleOpen}>Добавити статтю</Button>
            <Button onClick={onEditArticleOpen}>Редагувати статтю</Button>

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