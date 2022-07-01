import supertest from "supertest";
import { app } from "..";
import user_controller from "./user_controller";

describe('should not accept empty fields on body',()=>{
    it('return true if an field are empty',()=>{
        expect(user_controller.FieldAreEmpty("")).toBe(true);
        expect(user_controller.FieldAreEmpty(" ")).toBe(true);
    });
    it('return false if an field are not empty',()=>{
        expect(user_controller.FieldAreEmpty("not_empty")).toBe(false);
    });
});

describe('api should return 200 status',()=>{
    it('user post return 200 status', async()=>{
        await supertest(app).post('/user').expect(200);
    });
    it('user post return 200 status', async()=>{
        await supertest(app).post('/login').expect(200);
    });
});

describe('api services should be working', ()=>{
    it('get user by name', async()=>{
        expect(await user_controller.getUserByName("exists")).not.toEqual([]);
    });
    it('return true if user already exists', async()=>{
        expect(await user_controller.userAlreadyExists("exists")).toBe(true);
    });
});

describe('login api services should be working', ()=>{
    it('login does not success if user does not exists', async()=>{
        let response = await supertest(app).post('/login').send({name: "", password: ""}).expect(200);
        expect(response.body.success).toBe(false);
    });
    it('login does not success if password is incorrect', async()=>{
        let response = await supertest(app).post('/login').send({name: "exists", password: "incorrect_password"}).expect(200);
        expect(response.body.success).toBe(false);
    });
})