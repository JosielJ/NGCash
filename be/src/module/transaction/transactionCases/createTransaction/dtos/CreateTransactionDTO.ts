export interface CreateTransactionDTO {
    debitedAccountId: string;
    creditedAccountId: string;
    value: number;
};