import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const BookCard = ({ book }) => {
    return (
        <Card className="relative overflow-hidden w-full h-100 rounded-[32px] border-none flex flex-col">
            
            {/* Background image */}
            <Image
                alt={book.bookName || "Book Cover"}
                src={book.image}
                fill
                className="object-cover z-0 transition-transform duration-500 hover:scale-105"
            />

            {/* Dark Gradient Overlay for Text Legibility (Bottom 70%) */}
            <div className="absolute bottom-0 left-0 w-full h-[70%] bg-linear-to-t from-black/95 via-black/60 to-transparent z-0 pointer-events-none" />

            {/* Top Section: Tags (Glassmorphism effect) */}
            {book.tags && book.tags.length > 0 && (
                <div className="relative z-10 flex gap-2 p-5 pointer-events-none">
                    {book.tags.slice(0, 2).map((tag, index) => (
                        <span 
                            key={index} 
                            className="font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Header (Pushed to bottom with mt-auto) */}
            <Card.Header className="relative z-10 mt-auto flex flex-col items-start px-6 pb-2 border-none">
                <Card.Title className="text-xl font-bold text-white mb-1 line-clamp-2 text-left leading-tight">
                    {book.bookName}
                </Card.Title>
                <Card.Description className="text-sm font-medium text-zinc-300">
                    {book.author}
                </Card.Description>
            </Card.Header>

            {/* Footer */}
            <Card.Footer className="relative z-10 px-6 pb-6 pt-3 flex items-center justify-between border-none w-full">
                <Button 
                    size="sm" 
                    className="w-full rounded-full bg-white text-zinc-900 font-bold text-sm shadow-sm hover:bg-zinc-200 transition-colors"
                >
                    View Ebook
                </Button>
            </Card.Footer>
            
        </Card>
    );
};

export default BookCard;