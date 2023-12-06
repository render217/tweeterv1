require("dotenv").config({ path: "./config/.env" });
const app = require("./src/app");
const connectDB = require("./src/config/database");
const port = process.env.PORT || 3500;

//
const start = async () => {
    try {
        await connectDB();
        app.listen(port, (req, res) => {
            console.log(`server is on ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
