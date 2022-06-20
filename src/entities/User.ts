export class User {
    constructor(
        private id: string,
        private nickname: string,
        private email: string,
        private password: string
    ) { }

    public getId() {
        return this.id;
    }
    public getNickname() {
        return this.nickname;
    }
    public getEmail() {
        return this.email;
    }
    public getPassword() {
        return this.password;
    }
    public static toUserModel(result: any): User {
        const {
            id,
            nickname,
            email,
            password
        } = result;

        const user = new User(
            id,
            nickname,
            email,
            password
        );

        return user;
    }
}
