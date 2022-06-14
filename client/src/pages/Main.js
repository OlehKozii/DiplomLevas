import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Image, Box, Flex, Text } from "@chakra-ui/react";
import SwiperCore, { Autoplay } from 'swiper';
import { Pagination } from "swiper";

const Main = () => {
    SwiperCore.use([Autoplay])

    return (
        <Flex flexDir="column" alignItems="center">
            <Image src="assets/banners/2 (1).jpg" h="auto" objectFit="cover" w="100%" />
            
            <Box m="50px">
                <Swiper
                    style={{maxWidth: '1200px'}}
                    autoplay={{delay: 1000}}
                >
                    <SwiperSlide style={{maxWidth: '1200px'}}>
                        <Image src="assets/banners/22.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide style={{maxWidth: '1200px', width: 'auto'}}>
                        <Image src="assets/banners/1.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide style={{maxWidth: '1200px'}}>
                        <Image src="assets/banners/33.jpg"/>
                    </SwiperSlide>
                </Swiper>
            </Box>

            <Flex flexDir="column" alignItems="center" w="100%" h="100vh" p="30px" maxWidth="1080px">
                <Text fontSize="35px">Акційні товари</Text>
                <Swiper
                    slidesPerView={3}
                    spaceBetween="10px"
                    pagination={{
                        clickable: true,
                      }}
                    modules={[Pagination]}
                >
                    <SwiperSlide style={{width: "260px"}}>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide style={{width: "260px"}}>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide style={{width: "260px"}}>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide style={{width: "260px"}}>
                        <ProductCard />
                    </SwiperSlide><SwiperSlide style={{width: "260px"}}>
                        <ProductCard />
                    </SwiperSlide>
                </Swiper>
            </Flex>
            <Footer />
        </Flex>
    )
}

export default Main;