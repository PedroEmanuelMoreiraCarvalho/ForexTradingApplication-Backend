import { NextFunction, Request, Response } from "express";
import User, { UserType } from "../models/user";
import {v4 as uuidv4} from "uuid";

const FieldAreEmpty = (field: String):Boolean => {
    return (field.trim() === "" || field === undefined) ? true : false
}

const addUser = async(req: Request, res: Response, next: NextFunction):Promise<Response> => {
    try{
        let { name, password } = req.body;
        
        if(FieldAreEmpty(name)){
            return res.json({
                success: false,
                message: "name field not defined"
            });
        }

        if(FieldAreEmpty(password)){
            return res.json({
                success: false,
                message: "password field not defined"
            });
        }

        let new_user: UserType = {
            name: name,
            password: password,
            current_token: uuidv4(),
            cash: 0,
            transactions: []
        };
        
        await User.create(new_user);
        
        let user_res = {
            success: true,
            name: new_user.name,
            current_token: new_user.current_token,
            cash: new_user.cash
        };

        return res.json(user_res);
    }catch(err){
        return res.send(err);
    }
}

export default { addUser, FieldAreEmpty }