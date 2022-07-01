import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import { Enviroment } from "../enviroment/enviroment";
import UserController from "./controllers/user_controller"

const PORT = Enviroment.PORT || 3800

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.post('/user',UserController.addUser);
app.post('/login',UserController.login);

const database_url = `mongodb+srv://admin:${Enviroment.ADMIN_PASSWORD}@cluster0.g8pmu7c.mongodb.net/Forex?retryWrites=true&w=majority`;

mongoose.connect(database_url).catch(
    (err)=>{
        console.log("database connection refused, err:"+err);
    }
)

app.listen(PORT,()=>{
    console.log(`server started on port ${{PORT}}`)
})

export { app }