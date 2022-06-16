import React, { useState, useEffect } from 'react'
import { Text, Box } from '@chakra-ui/react';
import NewsItem from '../components/news/newsitem';
import axios from '../utils/axios';

const News = () => {

    const [news, setNews] = useState()

    async function getNews() {
        const response = await axios.get('user/articles');
        if (response.status === 200) {
            setNews(response.data)
        }
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <Box p="60px">
            {news ?
                news.map((item) => (
                    <NewsItem
                        header={item.header}
                        text={item.text}
                        time={item.time}
                    />))
                :
                <Box position="absolute" top="calc(50% - 84px)" left="calc(50% - 30px)">
                    <Text fontSize="40px">Пусто</Text>
                </Box>
            }
        </Box>
    )
}

export default News;