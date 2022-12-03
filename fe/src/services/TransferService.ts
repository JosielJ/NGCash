import { ITransfer } from "../interfaces";
import { api } from "../providers"

const transferData = (data : ITransfer) => api.post("/transaction", data);

export const TransferService = {
    transferData
};