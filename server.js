import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./src/db/db.js";


import movieRoute from "./src/routes/movie.route.js"


dotenv.config();
const app = express();


app.use(express.json());


app.use("/mba/api/v1/movies", movieRoute);









const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`server is running at port -> http://localhost:${PORT}`);
   await connectToDatabase();
})



