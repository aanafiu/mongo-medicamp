import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


import b1 from "../../../assets/b1.jpeg";
import b2 from "../../../assets/b2.jpeg";
import b3 from "../../../assets/b3.jpeg";
import b4 from "../../../assets/b4.jpeg";
import b5 from "../../../assets/b5.jpeg";

// Import your Lottie animation JSON
import loaderLottie from "../../../assets/banner.json";
import Lottie from 'lottie-react';

const Banner = () => {
    return (
        <div className="relative py-14 max-h-screen flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Lottie Animation Background */}
            <Lottie
                loop 
                animationData={loaderLottie} 
                play 
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Content Section */}
            <div className="relative z-10 w-full space-y-5 flex flex-col justify-center px-6">
                <h1 className="text-xl mx-auto sm:text-2xl md:text-4xl lg:text-6xl font-extrabold text-primary">
                    Your Health, Our Mission – Join MediCamp Today!
                </h1>
                <Link to="/user/login" className="w-fit flex items-center justify-center">
                    <Button className="text-base md:text-xl w-full">Join Now</Button>
                </Link>
            </div>

            {/* Swiper Section */}
            <div className="relative z-10 w-[50%]">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide><img src={b1} /></SwiperSlide>
                    <SwiperSlide><img src={b2} /></SwiperSlide>
                    <SwiperSlide><img src={b3} /></SwiperSlide>
                    <SwiperSlide><img src={b4} /></SwiperSlide>
                    <SwiperSlide><img src={b5} /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
