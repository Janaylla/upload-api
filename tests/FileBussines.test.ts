import { FileBusiness } from "../src/business/FileBusiness";
import { File as FileUploaded } from "../src/entities/Fille";

const fileDataBase = {
    insert: jest.fn(async (file: File): Promise<void> => {

        FileUploaded.toFileModel({
            id: "123", name: "file", key: "123-file", url: "123-file.png", createdAt: 1232
        })
    }),
    selectByUserId: jest.fn(async (userId: string): Promise<FileUploaded[]> => {
        return [
            FileUploaded.toFileModel({
                id: "123", name: "file", key: "123-file", url: "123-file.png", createdAt: 1232
            })]
    })
}

const authenticator = {
    generateToken: jest.fn(async (input: { id: string }) => "tokenBonito"),
    getData: jest.fn((token: string) => {
        return { id: "1" }
    })
}

const idGenerator = {
    generate: jest.fn(() => "1234567")
}



const fileBusiness = new FileBusiness(
    fileDataBase as any,
    authenticator as any,
    idGenerator as any
)

describe("SignUpTestFlow", () => {
    test("Show success", async () => {
        const file: Express.Multer.File = {
            buffer: new Buffer(''),
            destination: "",
            fieldname: "",
            filename: "",
            mimetype: "",
            originalname: "nome-original",
            path: "",
            size: 21321
        } as Express.Multer.File
            await fileBusiness.post(file, "token")
        
    })
    test("Show return error when there is already a user with that email", async () => {
        expect.assertions(1)
        try {
            await fileBusiness.post({} as Express.Multer.File, "")
        } catch (error: any) {
            expect(error.message).toBe('Token não enviadado')
        }
    })
})


describe("GetIdTestFlow", () => {
    test("Show success", async () => {
        try {
            await fileBusiness.getByUser("tokenBonitoaa")
        } catch (error: any) {
            expect(error.message).toBe('Preencha todos os campos')
        }
    })
    test("Show return error when token not send", async () => {
        expect.assertions(1)
        try {
            await fileBusiness.getByUser("")
        } catch (error: any) {
            expect(error.message).toBe('Token não enviadado')
        }
    })
})