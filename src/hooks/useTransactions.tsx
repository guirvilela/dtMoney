import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
} from "react";
import api from "../service/api";

interface Transaction {
    id: string;
    title: string;
    type: string;
    category: string;
    amount: number;
    createdAt: Date;
}

type TransactionType = Omit<Transaction, "id" | "createdAt">;

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionType) => void;
}

const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const transactionStorage = localStorage.getItem("@dtmoney");

        if (transactionStorage) {
            return JSON.parse(transactionStorage);
        } else {
            return [];
        }
    });

    useEffect(() => {
        api.get("transactions").then((response) =>
            setTransactions(response.data.transactions)
        );
    }, []);

    useEffect(() => {
        localStorage.setItem("@dtmoney", JSON.stringify(transactions));
    }, [transactions]);

    async function createTransaction(transactionInput: TransactionType) {
        const response = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context;
}
