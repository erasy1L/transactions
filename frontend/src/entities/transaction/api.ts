import apiInstance from "@/shared/api/instance";
import { Transaction } from "./model";

export const addTransaction = (transaction: Transaction) =>
    apiInstance.post("/transactions", transaction);

export const listTransactions = (
    sortOrder = "DESC",
    sortBy = "dateTime",
    offset = "0",
    limit = "50"
) =>
    apiInstance.get(
        `/transactions?sortOrder=${sortOrder}&sortBy=${sortBy}&offset=${offset}&limit=${limit}`
    );

export const getTransaction = (id: string) =>
    apiInstance.get(`/transactions/${id}`);

export const updateTransaction = (id: string, data: Partial<Transaction>) =>
    apiInstance.patch(`/transactions/${id}`, data);

export const deleteTransaction = (id: string) =>
    apiInstance.delete(`/transactions/${id}`);
