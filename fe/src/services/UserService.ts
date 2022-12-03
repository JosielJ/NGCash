import { IUser } from "../interfaces";
import { api } from "../providers"

const userData = (data : any) => api.post("/id", data);

export const UserService = {
    userData
};