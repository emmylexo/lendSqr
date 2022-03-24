import express from "express";

const app = new express();
const PORT = process.env.PORT || 5000;


(async () => {

    app.listen(PORT, (err) => {
        if (err) console.log(`Error occurred connecting to port`);
        console.log(`App connected on port ${PORT}`)
    })
})();