import { Request, Response } from 'express';
import { FileBusiness } from '../business/FileBusiness';
import { FileData } from '../data/FileData';
import { Authenticator } from '../services/Autenticator';
import { IdGenerator } from '../services/IdGenerator';

export class FileController {
    public async post(req: Request, res: Response): Promise<void> {
        try {
            const file = await new FileBusiness(
                new FileData(),
                new Authenticator(),
                new IdGenerator()).post(req.file as Express.Multer.File,
                req.headers.authorization as string)
            res.send(file)
        } catch (error) {
            res.send(error).status(400)
        }
    }
    public async getByUser(req: Request, res: Response): Promise<void> {
        try {
            const files = await new FileBusiness(
                new FileData(),
                new Authenticator(),
                new IdGenerator()
            ).getByUser(req.headers.authorization as string)
            res.send(files)
        } catch (error: any) {
            res.send(error.message).status(400)
        }
    }
}
