import { Container, TableValues } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

export const TransactionsTable = () => {
    const { transactions } = useTransactions();
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => {
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>

                                <TableValues typeAmount={transaction.type}>
                                    {transaction.type === "withdraw" && (
                                        <span>-</span>
                                    )}
                                    {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(transaction.amount)}
                                </TableValues>
                                <td>{transaction.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat("pt-BR").format(
                                        new Date(transaction.createdAt)
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Container>
    );
};
