import express from "express";
import Routes from "./app/routes";
import Middleware from "./app/routes/middleware";

const app = new express();
const PORT = process.env.PORT || 5000;

Middleware(app);
Routes(app);

(async () => {
    app.listen(PORT, (err) => {
        if (err) console.log(`Error occurred connecting to port`);
        console.log(`App connected on port ${PORT}`)
    })
})();