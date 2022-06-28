import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import { Enviroment } from "../enviroment/enviroment";
import router from "./routes";

const PORT = Enviroment.PORT || 8080;
const app = express();

app.use(cors())
app.use(router)

const database_url = `mongodb+srv://admin:${Enviroment.ADMIN_PASSWORD}@cluster0.g8pmu7c.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(database_url).then(
    ()=>{
        console.log("connected to database");
    }
).catch(
    (err)=>{
        console.log("database connection refused, err:"+err);
    }
)

app.listen(PORT,()=>{
    console.log(`started on port ${PORT}`);
});

export { app }