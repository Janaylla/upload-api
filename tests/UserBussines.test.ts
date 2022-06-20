import { UserBusiness } from "../src/business/UserBusiness";
import { User } from "../src/entities/User";
import { UserInputDTO } from "../src/types/User";

const userDataBase = {
    insert: jest.fn(async (user: User) => {}),
    selectBy: jest.fn(async (column: "email" | "id" | "nickname", value: string): Promise<User | null> => {
        if(column !== "email" && value !== "email@gmail.com"){
            return null
        }
        return User.toUserModel({
            id:"1",
            nickname: "nickname", 
            email: "email@gmail.com",
            password: "password"
        })
    })
}

const authenticator = {
    generateToken: jest.fn(async(input: {id: string}) => "tokenBonito"),
    getToken: jest.fn((token: string) => {
        if(token !== "tokenBonito")
            return undefined
        return {id: "1"}
    })
}

const idGenerator = {
    generate: jest.fn(() => "1234567")
}

const hashMenage = {
    hash: jest.fn((password: string) => "Senha_bem_secreta"),
    compare: jest.fn((text: string, hash: string) => text === "123456" ? true : false)
}


const userBusiness = new UserBusiness(
    userDataBase as any,
    idGenerator as any,
    hashMenage as any,
    authenticator as any
)

describe("SignUpTestFlow", () => {
    test("Show return error when parameters not sent", async() => {
        expect.assertions(1)
        const user: UserInputDTO = {
            email: "",
            nickname: "teste",
            password: "123456",
        }
        try{
            await userBusiness.signUp(user)   
        }catch(error: any){
            expect(error.message).toBe('Preencha todos os campos: "nickname", "email" e "password"')
        }
    })    
    test("Show return error when there is already a user with that email", async() => {
        expect.assertions(1)
        const user: UserInputDTO = {
            email: "email@gmail.com",
            nickname: "teste",
            password: "123456",
        }
        try{
            await userBusiness.signUp(user)   
        }catch(error: any){
            expect(error.message).toBe('Já existe usuario com esse e-mail')
        }
    })
})