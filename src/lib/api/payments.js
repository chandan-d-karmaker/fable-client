import { serverQuery } from "../core/server"

export const getPurchaseHistory = async (id) =>{
    return serverQuery(`/api/purchase/${id}`);
}