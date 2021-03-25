import React, { useState } from "react";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { Header } from "./components/Header/header";
import { ModalComponent } from "./components/Modal/Modal";
import { TransactionProvider } from "./hooks/useTransactions";

export const App = () => {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
        false
    );

    function handleOpenNewTransactionModal() {
        return setIsNewTransactionModalOpen(true);
    }
    function handleCloseNewTransactionModal() {
        return setIsNewTransactionModalOpen(false);
    }
    return (
        <TransactionProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <Dashboard />

            <ModalComponent
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            ></ModalComponent>
        </TransactionProvider>
    );
};
