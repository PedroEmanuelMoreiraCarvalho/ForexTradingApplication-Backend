import { NextFunction, Request, Response } from "express";
import User, { UserType } from "../models/user";
import {v4 as uuidv4} from "uuid";

const FieldAreEmpty = (field: String): Boolean => {
    return (field.trim() === "" || field === undefined) ? true : false
}

const createUserOndDatabase = async(new_user: UserType) => {
    return await User.create(new_user);
}

const getUserByName = async(name: String) => {
    return await User.find({name: name})
}

const userAlreadyExists = async(name: String) => {
    let user_already_exist = await getUserByName(name);
    return user_already_exist.length ? true : false;
}

const addUser = async(req: Request, res: Response, next: NextFunction):Promise<Response> => {
    try{
        let { name, password } = req.body;
        
        if(FieldAreEmpty(name)){
            return res.json({
                success: false,
                message: "name field not defined"
            });
        };

        if(FieldAreEmpty(password)){
            return res.json({
                success: false,
                message: "password field not defined"
            });
        };

        if(await userAlreadyExists(name)){
            return res.json({
                success: false,
                message: "user already exists"
            });
        };

        let new_user: UserType = {
            name: name,
            password: password,
            current_token: uuidv4(),
            cash: 0,
            transactions: []
        };
        
        createUserOndDatabase(new_user);
        
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

const login = async(req: Request, res: Response, next: NextFunction):Promise<Response> => {
    try{
        let { name, password } = req.body;
        
        if(FieldAreEmpty(name)){
            return res.json({
                success: false,
                message: "name field not defined"
            });
        };

        if(FieldAreEmpty(password)){
            return res.json({
                success: false,
                message: "password field not defined"
            });
        };

        if(! await userAlreadyExists(name)){
            return res.json({
                success: false,
                message: "user doesn't exists"
            });
        };

        let user = await getUserByName(name);
        let to_login_user = user.shift();

        if(password !== to_login_user?.password){
            return res.json({
                success: false,
                message: "incorrect password"
            });
        };

        let login_res = {
            success: true,
            name: to_login_user?.name,
            current_token: to_login_user?.current_token,
            cash: to_login_user?.cash
        }

        return res.json(login_res);
    }catch(err){
        return res.send(err);
    }
}

const deposit = async(req: Request, res: Response, next: NextFunction):Promise<Response> => {
    try{
        let { name, current_token, deposit_value } = req.body;
        
        if(FieldAreEmpty(name)){
            return res.json({
                success: false,
                message: "name field not defined"
            });
        };

        if(FieldAreEmpty(current_token)){
            return res.json({
                success: false,
                message: "current token field not defined"
            });
        };

        if(! await userAlreadyExists(name)){
            return res.json({
                success: false,
                message: "user already exists"
            });
        };

        let user = await getUserByName(name);
        let deposit_user = user.shift();

        if(current_token !== deposit_user?.current_token){
            return res.json({
                success: false,
                message: "invalid token"
            });
        };
        
        let new_cash = deposit_user?.cash + deposit_value
        let user_update = {
            cash: new_cash
        }

        await User.findByIdAndUpdate(deposit_user?._id, user_update, {new: true})
        
        let user_res = {
            success: true,
            new_cash: new_cash,
        };

        return res.json(user_res);
    }catch(err){
        return res.send(err);
    }
}

export default { 
    addUser,
    FieldAreEmpty,
    createUserOndDatabase,
    getUserByName,
    userAlreadyExists,
    deposit,
    login
}