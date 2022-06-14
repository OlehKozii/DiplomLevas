import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "react-slick";
import { Image, Flex, Text, useMediaQuery } from "@chakra-ui/react";

const Main = () => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const [isLargerThan500] = useMediaQuery('(min-width: 500px)')

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
        slidesToShow: isLargerThan1280 ? 3 : 2,
        slidesToScroll: 1,
        dots: true
    };
    return (
        <Flex flexDir="column" justifyContent="space-between" alignItems="center">
            <Image src="assets/banners/3.png" h="auto" objectFit="cover" w="100%" />
            <Slider {...settings1} style={{width: "80%", marginTop: "50px", }}>
                <Image src="assets/banners/a.png" w="1200px" objectFit="cover" />
                <Image src="assets/banners/b.png" w="1200px" objectFit="cover"/>
            </Slider>
            <Text fontSize="35px" paddingTop="50px">Акційні товари</Text>
            <Slider {...settings} style={{width: "80%"}}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </Slider>
            <Footer />
        </Flex>
    )
}

export default Main;