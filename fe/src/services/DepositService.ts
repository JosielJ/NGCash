import { IDeposit } from "../interfaces";
import { api } from "../providers"

const depositData = (data : IDeposit) => api.post("/deposit", data);

export const DepositService = {
    depositData
};