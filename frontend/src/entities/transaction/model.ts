export interface Transaction {
    id?: string;

    dateTime: Date;

    author: string;

    sum: number;

    category: TransactionCategory;

    comment: string;
}

export type TransactionCategory = "internet" | "gas" | "electricity";
