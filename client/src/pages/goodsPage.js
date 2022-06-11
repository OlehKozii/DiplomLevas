import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import axios from "axios";
import Comment from "../components/good/comment";
import {
    Textarea,
    TableCaption,
    TableContainer,
    Table,
    Thead,
    Tfoot,
    Tr,
    Th,
    Td,
    Tbody,
    Container,
    Box,
    Image,
    SimpleGrid,
    Heading,
    Button,
    Flex,
    Text,
    VStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'

const Good = observer(() => {
    const { good, user } = useContext(Context);
    const [data, setData] = useState({});
    const [commentText, setCommentText] = useState('');

    async function getData() {
        const response = await axios.get(`https://mydiplomlevas.herokuapp.com/good/${good.id}`);
        if (response.status === 200) {
            setData(response.data);
        }
    }

    async function addComment() {
        const newComment = { name: 'username', text: commentText, date: new Date() }
        setData({ ...data, comments: [newComment, ...data.comments] });
        const response = await axios.post(`https://mydiplomlevas.herokuapp.com/good/addComment/${good.id}`, newComment);
        console.log(response);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container p={30} maxWidth={1080}>
            <Box bg="whiteAlpha.500" rounded={10} p='10px 20px'>

                <Text marginBottom="10px" fontSize='4xl'>{data?.name}</Text>
                <SimpleGrid minChildWidth='350px' spacing="25px">
                    <Box>
                        <Image src={data?.image} rounded={3} w="100%" h="auto" objectFit="cover" />
                    </Box>
                    <Box display='flex' flexDirection="column" justifyContent="flex-end">
                        <Box>
                        </Box>
                        <Box borderWidth='1px' borderColor="gray.300" rounded={10} p="15px">
                            <Flex marginBottom="10px" justifyContent="space-between" alignItems="end">
                                <Text fontSize="35px">{data?.price}₴</Text>
                                <Flex fontSize="18px">
                                    Кількість:
                                    <NumberInput marginLeft="10px" size='xs' maxW={14} defaultValue={1} min={1}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                            </Flex>
                            <Button width="100%" colorScheme="teal">Купити</Button>
                        </Box>
                    </Box>
                </SimpleGrid>

            </Box>
            <Box bg="whiteAlpha.500" rounded={10} p={15} my='20px' display="flex" flexDir='column'>
                <Text m='0 10px 10px 10px' fontSize="24px" alignSelf="center">Характеристики</Text>
                <TableContainer>
                    <Table bg='gray.200' variant='striped' rounded={10}>
                        <Tbody>
                            {data?.params?.map(param => (
                                <Tr>
                                    <Td><b>{param.title}</b></Td>
                                    <Td>{param.description}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Box bg="whiteAlpha.500" rounded={10} p={15} my='20px' display="flex" flexDir='column'>
                <Text m='0 10px 10px 10px' fontSize="24px" alignSelf="center">Залиште відгук</Text>
                {user.isAuth ?
                    <>
                        <Textarea
                            rows={5}
                            resize='none'
                            placeholder="Напишіть щось..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}

                        />
                        <Button onClick={addComment} colorScheme='teal' my='10px' isDisabled={!commentText}>
                            Опублікувати
                        </Button>
                    </>
                    :
                    <Textarea
                        rows={5}
                        resize='none'
                        isDisabled
                        placeholder="Увійдіть або зареєструйтесь, щоб залишити відгук."

                    />
                }
            </Box>

            <Box bg="whiteAlpha.500" rounded={10} p={15} my='20px' display="flex" flexDir='column'>
                <VStack spacing="35px">
                    {data?.comments?.map((props) => <Comment {...props} />)}
                </VStack>
            </Box>
        </Container >
    )
})

export default Good;