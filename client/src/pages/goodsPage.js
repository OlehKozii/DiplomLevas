import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import axios from "axios";
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
    Tooltip
} from '@chakra-ui/react'

const Good = observer(() => {
    const { good, user } = useContext(Context);
    const [data, setData] = useState({});
    const [commentText, setCommentText] = useState('');
    const [sliderValue, setSliderValue] = useState(50)
    const [showTooltip, setShowTooltip] = useState(false)

    function getSliderColor(value) {
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
        const response = await axios.get(`https://mydiplomlevas.herokuapp.com/good/getone/${good.id}`);
        if (response.status === 200) {
            setData(response.data);
            console.log(response.data);
        }
    }

    async function addComment() {
        const newComment = { name: 'username', text: commentText, time: new Date(), grade: sliderValue }
        setData({ ...data, comments: [newComment, ...data.comments] });
        const response = await axios.post(`https://mydiplomlevas.herokuapp.com/good/addComment/${good.id}`, newComment);
        setCommentText('');
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
                        <Image src={data?.image} rounded={5} w="100%" h="auto" objectFit="cover" />
                    </Box>
                    <Box display='flex' flexDirection="column" justifyContent="flex-end">
                        <Box>
                        </Box>
                        <Box borderWidth='1px' borderColor="gray.300" rounded={10} p="15px">
                            <Flex marginBottom="10px" justifyContent="space-between" alignItems="end">
                                <Text fontSize="45px">{data?.price}₴</Text>
                                <Box>
                                    <Text fontSize="16px" fontWeight="500" marginBottom="10px" color={COLOR_MAP[data.state]}>{data.state}</Text>
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
                                </Box>
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
                                    <Td ><b>{param.title}</b></Td>
                                    <Td >{param.description}</Td>
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
                            colorScheme={getSliderColor(sliderValue)}
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
                                bg={getSliderColor(sliderValue)}
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
                <VStack spacing="35px">
                    {data?.comments?.map((props, i) => <Comment key={i} {...props} />)}
                </VStack>
            </Box>
        </Container >
    )
})

export default Good;