import React, { useState, useEffect } from 'react'
import { Text } from '@chakra-ui/react';
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
        <div>
            {news ?
                news.map((item) => (
                    <NewsItem 
                        header={item.header} 
                        text={item.text}
                        time={item.time}
                    />))
                :
                <Text>
                    Пусто
                </Text>
            }
        </div>
    )
}

export default News;