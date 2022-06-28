import Usercontroller from "./user_controller";

describe('test user api',()=>{
    it('If some field are empty',()=>{
        let field_empy = Usercontroller.FieldAreEmpty("");
        let field_not_empy = Usercontroller.FieldAreEmpty("field");
        expect(field_empy).toBe(true);
        expect(field_not_empy).toBe(false);
    })
})