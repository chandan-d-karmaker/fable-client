import React from "react";
import { TextField, InputGroup, Select, ListBox, Checkbox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function BooksFilters({
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedSort,
    setSelectedSort
}) {
    return (
        <div className="flex flex-col gap-4 bg-background p-6 rounded-none border border-foreground/80 max-w-7xl mx-auto mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                {/* 1. Search Text Field - Span 5 columns */}
                <div className="md:col-span-5">
                    <TextField
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
                        className="w-full"
                    >
                        <span className="text-sm font-medium text-foreground/80 block mb-2">Search Ebooks</span>
                        <InputGroup className="bg-background border border-foreground focus-within:border-purple-500 rounded-none transition-all">
                            <InputGroup.Prefix className="pl-3 text-foreground/80">
                                <Magnifier className="w-4 h-4" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Title, company, or keywords..."
                                className="bg-transparent text-foreground placeholder-foreground/50 text-sm py-2.5 px-3 outline-none w-full"
                            />
                        </InputGroup>
                    </TextField>
                </div>

                {/* genre */}
                <div className="md:col-span-3">
                    <span className="text-sm font-medium text-foreground/80 block mb-2">Genre</span>
                    <Select
                        selectedKey={selectedGenre}
                        onSelectionChange={(key) => setSelectedGenre(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between bg-background/80 text-foreground border border-foreground/70 hover:border-foreground/60 rounded-none py-2.5 px-4 text-sm font-normal transition-all">
                            <Select.Value>{selectedGenre === "all" ? "All Types" : selectedGenre.replace("-", " ")}</Select.Value>
                            <Select.Indicator>
                                <ChevronDown className="w-4 h-4 text-foreground/40" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-background/70 backdrop-blur-sm border border-foreground-700 rounded-none shadow-xl mt-1 overflow-hidden z-50">
                            <ListBox className="p-1">
                                <ListBox.Item id="all" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>All Types</span>
                                </ListBox.Item>
                                <ListBox.Item id="Fiction" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Fiction</span>
                                </ListBox.Item>
                                <ListBox.Item id="Mystery" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Mystery</span>
                                </ListBox.Item>
                                <ListBox.Item id="Romance" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Romance</span>
                                </ListBox.Item>
                                <ListBox.Item id="Sci-Fi" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Sci-Fi</span>
                                </ListBox.Item>
                                <ListBox.Item id="Fantasy" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Fantasy</span>
                                </ListBox.Item>
                                <ListBox.Item id="Classic" className="flex items-center justify-between text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Classic</span>
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 3. sort Filter - Span 3 columns */}
                <div className="md:col-span-3">
                    <span className="text-sm font-medium text-foreground/80 block mb-2">Sort</span>
                    <Select
                        selectedKey={selectedSort}
                        onSelectionChange={(key) => setSelectedSort(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between bg-background text-foreground border border-foreground/70 hover:border-foreground/60 rounded-none py-2.5 px-4 text-sm font-normal transition-all">
                            <Select.Value>{selectedSort === "all" ? "All Categories" : selectedSort}</Select.Value>
                            <Select.Indicator>
                                <ChevronDown className="w-4 h-4 text-foreground/80" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-background/70 backdrop-blur-sm border border-foreground-700 rounded-none shadow-xl mt-1 overflow-hidden z-50">
                            <ListBox className="p-1">
                                <ListBox.Item id="all" className="text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>All Categories</span>
                                </ListBox.Item>
                                <ListBox.Item id="new" className="text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Newst First</span>
                                </ListBox.Item>
                                <ListBox.Item id="old" className="text-foreground/80 hover:bg-purple-600 hover:text-foreground rounded-none px-3 py-2 text-sm cursor-pointer capitalize">
                                    <span>Oldest First</span>
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

            </div>
        </div>
    );
}