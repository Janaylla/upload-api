import { File } from '../entities/Fille';
import { BaseData } from './BaseData'
import { UserData } from './UserData';

export class FileData extends BaseData {
    private static TABLE_NAME = 'file';

    public async insert(file: File) {
        try {
            await this.getConnection().insert(file).into(FileData.TABLE_NAME);
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async selectByUserId(userId: string): Promise<File[]> {
        try {
            const result = await this
                .getConnection()
                .select("*")
                .from(FileData.TABLE_NAME)
                .where("userId", userId)
                .orderBy("createdAt", "desc")
            return result.map(res => File.toFileModel(res))
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}