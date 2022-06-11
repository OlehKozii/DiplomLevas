import React, { useCallback } from 'react'
import SignInForm from '../components/AuthForms/SignIn';
import OneProduct from "../components/goodsList/oneProduct";
import NewsItem from '../components/news/newsitem';

const News = () => {
    return (
        <div>
            <NewsItem />
            <NewsItem />
        </div>
    )
}

export default News;