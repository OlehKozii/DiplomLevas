import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ProductCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import { Image, Flex, Text, useMediaQuery } from "@chakra-ui/react";

const good = {
    comments: [],
    id: "abdd5906-cf61-4b0d-8e41-e198878168c9",
    image: "http://res.cloudinary.com/hsu9dlm7f/image/upload/v1655313994/avatar/qgn1rsjbtaocvspcimvv.jpg",
    name: "qwerty",
    params: [],
    price: 1,
    state: "Очікується",
    typeID: "Вода"
}

const Main = () => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    const [isLargerThan950] = useMediaQuery('(min-width: 950px)')
    const [isLargerThan650] = useMediaQuery('(min-width: 650px)')

    let settings1 = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: isLargerThan1280 ? 4 : (isLargerThan950 ? 3 : (isLargerThan650 ? 2 : 1)),
        slidesToScroll: 1,
        dots: true
    };

    return (
        <Flex flexDir="column" justifyContent="space-between" alignItems="center">
            <Image src="assets/banners/3.png" h="auto" objectFit="cover" w="100%" />
            <Slider {...settings1} style={{ width: isLargerThan650 ? "70%" : "90%", marginTop: "50px", }}>
                <Image src="assets/banners/a.png" objectFit="cover" />
                <Image src="assets/banners/b.png" objectFit="cover" />
            </Slider>
            <Text fontSize="35px" paddingTop="50px">Акційні товари</Text>
            <Slider {...settings} style={{ width: "80%" }}>
                <ProductCard param={good} />
                <ProductCard param={good} />
                <ProductCard param={good} />
                <ProductCard param={good} />
                <ProductCard param={good} />
                <ProductCard param={good} />
                <ProductCard param={good} />
            </Slider>
        </Flex>
    )
}

export default Main;