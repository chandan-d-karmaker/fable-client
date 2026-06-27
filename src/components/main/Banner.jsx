"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react"
import { useSession } from "@/lib/auth-client";



const slides = [
    {
        id: 1,
        title: "Discover & Read Original Ebooks",
        description:
            "Explore a vast collection of ebooks across all genres, curated for book lovers and avid readers.",
        image: "https://i.ibb.co.com/VpmkGTrq/slider1.jpg",
    },
    {
        id: 2,
        title: "Share Your Stories with the World",
        description:
            "Join a thriving community of authors and readers. Publish your own ebooks or share your favorite recommendations.",
        image: "https://i.ibb.co.com/xtnjYQrs/slider2.jpg",
    },
    {
        id: 3,
        title: "Your Personal Library, Anywhere",
        description:
            "Build your digital collection and enjoy seamless reading across all your devices, whenever inspiration strikes.",
        image: "https://i.ibb.co.com/Ft7gjMK/slider3.jpg",
    },
];

const Banner = () => {

    const { data } = useSession();
    // console.log(data);
    const role = data?.user?.role;
    // console.log(role)

    return (
        <section className="py-6">
            <div className="max-w-7xl mx-auto">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop
                    className="overflow-hidden"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="relative h-112.5 md:h-137.5"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60" />

                                {/* Content */}
                                <motion.div className="absolute inset-0 flex items-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}>
                                    <div className="max-w-3xl px-8 md:px-16 text-white">
                                        <span className="inline-block border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-sm backdrop-blur-md">
                                            Ebook Sharing Platform
                                        </span>

                                        <h1 className="mt-4 text-3xl md:text-6xl font-bold leading-tight">
                                            {slide.title}
                                        </h1>

                                        <p className="mt-4 text-md text-slate-200 max-w-2xl">
                                            {slide.description}
                                        </p>

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <Link
                                                href="/ebooks"
                                                className="bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition"
                                            >
                                                Explore Ebooks
                                            </Link>

                                            {role === 'writer' && <Link
                                                href="/add-ebook"
                                                className="border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur-md hover:bg-white/20 transition"
                                            >
                                                Submit Your Ebook
                                            </Link>}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Banner;