import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import axios from '../utils/axios';
import Comment from "../components/good/comment";
import {
    Textarea,
    TableContainer,
    Table,
    Tr,
    Td,
    Tbody,
    Container,
    Box,
    Image,
    SimpleGrid,
    Button,
    Flex,
    Text,
    VStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    SliderMark,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip,
    Spacer,
    Link
} from '@chakra-ui/react'

const Good = observer(() => {
    const { good, user } = useContext(Context);
    const [data, setData] = useState({});
    const [count, setCount] = useState(1);
    const [commentText, setCommentText] = useState('');
    const [sliderValue, setSliderValue] = useState(50);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isLoading, setLoading] = useState(false);

    function getColor(value) {
        switch (true) {
            case (value >= 75):
                return 'green';
            case (value >= 50):
                return 'teal';
            case (value >= 25):
                return 'yellow';
            case (value >= 0):
                return 'red';
            default:
                return 'teal';
        }
    }

    const COLOR_MAP = {
        "В наявності": "green.300",
        "Закінчується": "yellow.400",
        "Закінчився": "red.500",
        "Очікується": "teal.400"
    }

    async function getData() {
        const response = await axios.get(`good/getone/${good.id}`);

        if (response.status === 200) {
            setData(response.data);
            console.log(response.data);
        }
    }

    async function addToBasket() {
        const response = await axios.post('basket/addMany', { goodId: good.id, count });
        setLoading(true);
        if (response) {
            setLoading(false);
        };
    }

    async function addComment() {
        const newComment = { name: user.user.name, text: commentText, time: new Date(), grade: sliderValue }
        const newData = { ...data, comments: [newComment, ...data.comments] };
        const newGrade = newData.comments.reduce((r, c) => r + c.grade, 0) / newData.comments.length;
        newData.grade = newGrade;
        setData(newData);
        const response = await axios.post(`good/addComment/${good.id}`, newComment);
        setCommentText('');
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container p={30} maxWidth={1080}>
            {data && <>
                <Box bg="whiteAlpha.500" rounded={10} p='10px 30px 40px 30px'>
                    <SimpleGrid minChildWidth='350px' spacing="25px">
                        <Box p="10px">
                            <Image src={data.image} rounded={5} w="100%" h="auto" objectFit="cover" />
                        </Box>
                        <Box display='flex' flexDirection="column" justifyContent="space-between">
                            <Text marginBottom="30px" fontSize='4xl'>{data.name}</Text>

                            {data?.comments?.length ?
                                <>
                                    <Box>
                                        <Flex>
                                            <Text fontSize='30px' color="gray.500">Рейтинг товару: </Text>
                                            <Spacer />
                                            <Text as="span" color={getColor(data.grade)} fontSize='45px' lineHeight="40px" mx="10px">
                                                {data.grade}%
                                            </Text>
                                        </Flex>
                                        <Flex fontSize='30px' color="gray.500" my="20px">
                                            <Text fontSize='30px' color="gray.500">Кількість відгуків: </Text>
                                            <Spacer />
                                            <Text as="span" fontSize='35px' mx="10px">
                                                <Link href="#comments">{data?.comments?.length}</Link>
                                            </Text>
                                        </Flex>
                                    </Box>
                                </>
                                :
                                <Flex justifyContent="center" m="10px 0 30px 0">
                                    <Text fontSize='30px' color="gray.500">Ще немає відгуків</Text>
                                </Flex>
                            }
                            <Box borderWidth='1px' borderColor="gray.300" rounded={10} p="15px">
                                <Flex marginBottom="30px" justifyContent="space-between" alignItems="end">
                                    <Text fontSize="50px">{data.priceWithDiscount ?? data.price}₴</Text>
                                    <Box>
                                        <Text fontSize="16px" fontWeight="500" marginBottom="10px" color={COLOR_MAP[data.state]}>{data.state}</Text>
                                        <Flex fontSize="18px">
                                            Кількість:
                                            <NumberInput marginLeft="10px" size='xs' value={count} onChange={(value) => setCount(value)} maxW={14} min={1}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Button width="100%" colorScheme="teal" onClick={() => addToBasket()} isDisabled={isLoading}>Додати в кошик</Button>
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
                            <Text marginTop="20px" fontSize="18px" alignSelf="center" color="gray.500">Оцініть цей продукт</Text>
                            <Slider
                                isDisabled={!commentText}
                                my="20px"
                                defaultValue={50}
                                min={0}
                                max={100}
                                onChange={(v) => setSliderValue(v)}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                colorScheme={getColor(sliderValue)}
                            >
                                <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                                    25%
                                </SliderMark>
                                <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                                    50%
                                </SliderMark>
                                <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                                    75%
                                </SliderMark>
                                <SliderTrack colorScheme='red'>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg={getColor(sliderValue)}
                                    color='white'
                                    placement='top'
                                    isOpen={showTooltip}
                                    label={`${sliderValue}%`}
                                >
                                    <SliderThumb colorScheme='red' />
                                </Tooltip>
                            </Slider>
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
                    <VStack spacing="35px" id="comments">
                        {data?.comments?.map((props, i) => <Comment key={i} {...props} />)}
                    </VStack>
                </Box>
            </>}
        </Container >
    )
})

export default Good;