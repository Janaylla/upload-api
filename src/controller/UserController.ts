import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { UserData } from '../data/UserData';
import { Authenticator } from '../services/Autenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export class UserController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const informUser =await new UserBusiness(
                new UserData(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            )
                .login({ email, password })
            res.send(informUser)
        } catch (error: any) {
            if(error instanceof Error){
                res.status(400).send(error.message)
            }else{
                res.status(400).send("Erro inesperado, tente novamente")
            }
        }
    }
    public async singUp(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, nickname } = req.body
            const informUser = await new UserBusiness(
                new UserData(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            )
                .signUp({ email, password, nickname })

            res.send(informUser)
        } catch (error: any) {
            if(error instanceof Error){
                res.status(400).send(error.message)
            }else{
                res.status(400).send("Erro inesperado, tente novamente")
            }
        }

    }
}
