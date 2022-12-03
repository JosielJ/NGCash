import { IAccount } from "../interfaces";
import { api } from "../providers"

const accountData = (data : IAccount) => api.post("/accountid", data);

export const AccountService = {
    accountData
};