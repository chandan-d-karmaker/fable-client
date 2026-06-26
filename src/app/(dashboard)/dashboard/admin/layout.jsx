import { requireRole } from '@/lib/core/session';
import React from 'react';

const ReaderLayout = async({children}) => {
    await requireRole('admin');
    return children;
};

export default ReaderLayout;