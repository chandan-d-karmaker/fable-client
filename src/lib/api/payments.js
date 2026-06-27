import { protectedServerQuery, serverQuery } from "../core/server"

export const getPurchaseHistory = async (id) =>{
    return protectedServerQuery(`/api/purchase/${id}`);
}
export const getAllPurcheseHistory = async () =>{
    return protectedServerQuery('/api/admin/all-purchases');
}

export const fetchRevenue = async (writerId) => {
    const res = await protectedServerQuery(`/api/revenue/${writerId}`);
    const data = res.totalRevenue;
    return data;
}

export const totalRevenue = async () =>{
    const res = await protectedServerQuery('/api/admin/total-revenue');
    const data = res.totalRevenue;
    return data;
}