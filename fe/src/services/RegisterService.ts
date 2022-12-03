import { IRegister } from "../interfaces";
import { api } from "../providers"

const registerUser = (data : IRegister) => api.post("/register", data);

export const RegisterService = {
    registerUser
};