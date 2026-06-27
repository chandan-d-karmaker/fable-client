'use server'
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import Link from 'next/link';
import * as motion from "motion/react-client";


const genres = [
    { name: 'Fiction', slug: 'Fiction' },
    { name: 'Mystery', slug: 'Mystery' },
    { name: 'Romance', slug: 'Romance' },
    { name: 'Sci-Fi', slug: 'Sci-Fi' },
    { name: 'Fantasy', slug: 'Fantasy' },
    { name: 'Horror', slug: 'Horror' },
];

const Genre = async () => {
    return (
        <section className="py-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Browse by Genre</h2>
                <p className="text-foreground-400 text-sm md:text-base">
                    Dive into our curated collections and find your next unforgettable read.
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {genres.map((genre, index) => (
                    <Link key={genre.name} href={`/ebooks?genre=${genre.slug}`}>
                        <motion.div
                            ispressable='true'
                            ishoverable='true'
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.3,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="bg-content1 border border-default hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm"
                        >
                            <Card className='rounded-none'>
                                <Card.Content className="flex items-center justify-center py-10 md:py-12 ">
                                    <span className="text-lg font-medium text-foreground">
                                        {genre.name}
                                    </span>
                                </Card.Content>
                            </Card>

                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Genre;