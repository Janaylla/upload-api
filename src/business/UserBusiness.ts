import { UserData } from "../data/UserData";
import { User } from "../entities/User";
import { Authenticator } from "../services/Autenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserCredentials, UserInputDTO } from "../types/User";

export class UserBusiness {
    constructor(
        private userData: UserData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ){}
    public async signUp(input: UserInputDTO): Promise<{
        token: string,
        nickname: string
    }> {
        try {
            const { nickname, email, password } = input;

            if (!nickname || !email || !password) {
                throw new Error(
                    'Preencha todos os campos: "nickname", "email" e "password"'
                );
            }

            const id = this.idGenerator.generate();

            const hashPassword = await this.hashManager.hash(password);


            const user = new User(id, nickname, email, hashPassword);

            const userEmail = await this.userData.selectBy("email", user.getEmail())
            if (userEmail) {
                throw new Error("Já existe usuario com esse e-mail")
            }

            const userNickname = await this.userData.selectBy("nickname", user.getNickname())
            if (userNickname) {
                throw new Error("Já existe usuario com esse nickname")
            }
            await this.userData.insert(user);

            const token = this.authenticator.generateToken({
                id,
            });

            return {
                token,
                nickname: user.getNickname()
            };
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    public async login(input: UserCredentials): Promise<{
        token: string,
        nickname: string
    }> {
        try {

            const { email, password } = input;

            if (!email || !password) {
                throw new Error(
                    'Preencha todos os campos'
                );
            }

            const user = await this.userData.selectBy("email", email)
            if (!user) {
                throw new Error(
                    'Email ou senha incorreta, tente novamente'
                );
            }
            const passwordIsEqual = await this.hashManager.compare(password, user.getPassword())

            if (!passwordIsEqual) {
                throw new Error(    
                    'Email ou senha incorreta, tente novamente'
                );
            }
            
            const token = this.authenticator.generateToken({
                id: user.getId(),
            });

            return {
                token,
                nickname: user.getNickname()
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
