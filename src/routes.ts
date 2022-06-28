import { Router } from "express";
import bodyParser from "body-parser";
import UserController from "./controllers/user_controller";

const jsonParser = bodyParser.json()

const router = Router();

router.post('/user', jsonParser ,UserController.addUser)

export default router