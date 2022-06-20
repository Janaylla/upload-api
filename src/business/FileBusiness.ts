import { FileData } from "../data/FileData"
import { File } from "../entities/Fille"
import { Authenticator } from "../services/Autenticator"
import { IdGenerator } from "../services/IdGenerator"

export class FileBusiness {
  constructor(
    private fileData: FileData,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) { }
  public async post(fileMulter: Express.Multer.File, token: string): Promise<File> {
    const id = this.idGenerator.generate()
    if (!token) {
      throw new Error("Token não enviadado")
    }

    const user = this.authenticator.getData(token)

    if (!fileMulter) {
      throw new Error("Arquivo não enviado")
    }

    const { originalname, filename } = fileMulter
    const file = new File(id,
      originalname,
      filename,
      filename,
      Date.now(),
      user.id
    )
    await this.fileData.insert(file)
    return file
  }
  public async getByUser(token: string): Promise<File[]> {
    if (!token) {
      throw new Error("Token não enviadado")
    }
    const user = this.authenticator.getData(token)
    const files = await this.fileData.selectByUserId(user.id)
    return files
  }
}
