import { User } from '../entities/User';
import { BaseData } from './BaseData'

export class UserData extends BaseData {
    public static TABLE_NAME = 'user';

    public async insert(user: User) {
        try {
            await this.getConnection().insert(user).into(UserData.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async selectBy(column: "email" | "id" | "nickname",value: string): Promise<User | null> {
        try {
            const [result] = await this
                .getConnection()
                .select("*")
                .from(UserData.TABLE_NAME)
                .where({
                    [column]: value
                })
            if (!result) {
                return null
            }
            return User.toUserModel(result)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}