'use client';

import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card } from '@heroui/react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminCharts = ({ ebooks, sales }) => {

    // 1. Prepare Monthly Sales Data
    const monthlySales = useMemo(() => {
        const data = {};
        sales?.forEach(s => {
            const month = new Date(s.createdAt).toLocaleString('default', { month: 'short' });
            data[month] = (data[month] || 0) + parseFloat(s.ebookPrice);
        });
        return Object.keys(data).map(month => ({ name: month, revenue: data[month] }));
    }, [sales]);

    // 2. Prepare Genre Pie Chart Data
    const genreData = useMemo(() => {
        const data = {};
        ebooks?.forEach(b => {
            const genre = b.genre || "Uncategorized";
            data[genre] = (data[genre] || 0) + 1;
        });
        return Object.keys(data).map(genre => ({ name: genre, value: data[genre] }));
    }, [ebooks]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <Card className="w-full h-auto min-h-100 p-4 rounded-none border border-foreground">
                <h3 className="font-bold mb-4">Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={monthlySales}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card className="flex flex-col p-4 w-full h-auto min-h-100 rounded-none border border-foreground">
                <h3 className="font-bold mb-4">Ebooks by Genre</h3>

                {/* This container will grow/shrink dynamically */}
                <div className="w-full grow relative min-h-62.5">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={genreData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                            >
                                {genreData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* The Legend sits below and wraps naturally */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-[10px] sm:text-xs mx-auto">
                    {genreData?.map((entry, index) => (
                        <div key={entry.name} className="flex items-center justify-center gap-1">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span>{entry.name} ({entry.value})</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default AdminCharts;