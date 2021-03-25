import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { GlobalStyled } from "./styles/global";
import { App } from "./App";

createServer({
    models: {
        transaction: Model,
    },

    seeds(server) {
        const storageTransactions = localStorage.getItem("@dtmoney");
        server.db.loadData({
            transactions: storageTransactions
                ? JSON.parse(storageTransactions)
                : [],
        });
    },

    routes() {
        this.namespace = "api";

        this.get("/transactions", () => {
            return this.schema.all("transaction");
        });

        this.post("/transactions", (schema, request) => {
            const data = JSON.parse(request.requestBody);

            return schema.create("transaction", data);
        });
    },
});

ReactDOM.render(
    <React.StrictMode>
        <App />
        <GlobalStyled />
    </React.StrictMode>,
    document.getElementById("root")
);
