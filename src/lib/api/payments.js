import { serverQuery } from "../core/server"

export const getPurchaseHistory = async (id) =>{
    return serverQuery(`/api/purchase/${id}`);
}

export const fetchRevenue = async (writerId) => {
    const res = await serverQuery(`/api/revenue/${writerId}`);
    const data = res.totalRevenue;
    return data; 
}