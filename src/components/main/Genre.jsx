'use server'
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import Link from 'next/link';


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
        <section className="py-12 max-w-7xl mx-auto px-6 w-full">
            {/* Header Section */}
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Browse by Genre</h2>
                <p className="text-foreground-400 text-sm md:text-base">
                    Whatever you&apos;re in the mood for, there&apos;s a story waiting.
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {genres.map((genre) => (
                    <Link key={genre.name}  href={`/ebooks?genre=${genre.slug}`}>
                        <Card
                            isPressable
                            isHoverable
                            // Using HeroUI default colors for perfect dark/light mode compatibility
                            className="bg-content1 border border-default-200 hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <Card.Content className="flex items-center justify-center py-10 md:py-12">
                                <span className="text-lg font-medium text-foreground">
                                    {genre.name}
                                </span>
                            </Card.Content>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Genre;