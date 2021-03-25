import { Cards } from "../../components/Cards/cards";
import { TransactionsTable } from "../../components/TransactionsTable/transactionsTable";
import { Container } from "./styles";

export const Dashboard = () => {
    return (
        <Container>
            <Cards></Cards>
            <TransactionsTable />
        </Container>
    );
};
