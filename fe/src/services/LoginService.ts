import { IRegister } from "../interfaces";
import { api } from "../providers"

const loginUser = (data : IRegister) => api.post("/login", data);

export const LoginService = {
    loginUser
};